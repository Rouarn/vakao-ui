#!/usr/bin/env node

/**
 * 发布脚本
 * 用于构建并发布组件库到npm
 */

const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const readline = require('readline');

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 执行命令并打印输出
function exec(command) {
  console.log(`执行命令: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`命令执行失败: ${error}`);
    process.exit(1);
  }
}

// 获取package.json
function getPackageJson() {
  const packagePath = path.resolve(__dirname, '../package.json');
  return JSON.parse(readFileSync(packagePath, 'utf8'));
}

// 更新版本号
function updateVersion(version) {
  // 更新主 package.json
  const packagePath = path.resolve(__dirname, '../package.json');
  const packageJson = getPackageJson();
  packageJson.version = version;
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  
  // 更新 packages/package.json
  const packagesPackagePath = path.resolve(__dirname, '../packages/package.json');
  try {
    const packagesPackageJson = JSON.parse(readFileSync(packagesPackagePath, 'utf8'));
    packagesPackageJson.version = version;
    writeFileSync(packagesPackagePath, JSON.stringify(packagesPackageJson, null, 2));
    console.log(`packages/package.json 版本已更新为: ${version}`);
  } catch (error) {
    console.warn(`无法更新 packages/package.json: ${error.message}`);
  }
}

// 验证版本号格式
function isValidVersion(version) {
  // 检查是否符合 semver 格式 (x.y.z)
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
}

// 计算建议的新版本号（将小版本号加1）
function suggestNextVersion(currentVersion) {
  const versionParts = currentVersion.split('.');
  if (versionParts.length === 3) {
    const [major, minor, patch] = versionParts;
    return `${major}.${minor}.${parseInt(patch) + 1}`;
  }
  return currentVersion;
}

// 递归询问版本号直到输入正确
function askForVersion(currentVersion, suggestedVersion) {
  return new Promise((resolve) => {
    rl.question(`请输入新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `, (version) => {
      const newVersion = version || suggestedVersion;
      
      // 验证版本号格式
      if (!isValidVersion(newVersion)) {
        console.log('❌ 版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）');
        // 递归重新询问
        askForVersion(currentVersion, suggestedVersion).then(resolve);
        return;
      }
      
      // 检查版本号是否比当前版本新
      if (newVersion <= currentVersion) {
        console.log('❌ 新版本号必须大于当前版本！');
        // 递归重新询问
        askForVersion(currentVersion, suggestedVersion).then(resolve);
        return;
      }
      
      console.log('✅ 版本号验证通过');
      resolve(newVersion);
    });
  });
}

// 主函数
async function main() {
  // 检查是否为测试模式
  const isDryRun = process.argv.includes('--dry-run');
  
  const currentVersion = getPackageJson().version;
  const suggestedVersion = suggestNextVersion(currentVersion);
  console.log(`当前版本: ${currentVersion}`);
  
  try {
    // 使用新的版本号验证函数
    const newVersion = await askForVersion(currentVersion, suggestedVersion);
    
    // 更新版本号
    if (newVersion !== currentVersion) {
      updateVersion(newVersion);
      console.log(`版本已更新为: ${newVersion}`);
    }
    
    // 构建
    console.log('开始构建组件库...');
    exec('pnpm build');
    
    // 准备发布文件
    console.log('准备发布文件...');
    exec('node ./scripts/prepare-dist.js');
    
    // 发布
    if (isDryRun) {
      console.log('测试模式：跳过实际发布到npm');
      console.log('检查发布文件...');
      exec('npm pack --dry-run');
    } else {
      console.log('开始发布到npm...');
      exec('npm publish --access public --ignore-scripts');
    }
    
    console.log(`✨ Vakao UI v${newVersion} ${isDryRun ? '测试' : '发布'}成功!`);
  } catch (error) {
    console.error('发布过程中出现错误:', error);
  } finally {
    rl.close();
  }
}

// 运行主函数
main().catch(err => {
  console.error('发布失败:', err);
  process.exit(1);
});