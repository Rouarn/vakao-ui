#!/usr/bin/env node

/**
 * 部署脚本 - 将文档部署到 GitHub Pages
 * 使用方法：node scripts/deploy.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    log(`执行命令: ${command}`, 'cyan');
    return execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      ...options 
    });
  } catch (error) {
    log(`命令执行失败: ${command}`, 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      log('警告: 工作目录有未提交的更改', 'yellow');
      log('建议先提交或暂存更改后再部署', 'yellow');
      return false;
    }
    return true;
  } catch (error) {
    log('无法检查 Git 状态', 'yellow');
    return true;
  }
}

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    return 'unknown';
  }
}

function deploy() {
  log('🚀 开始部署 Vakao UI 文档到 GitHub Pages', 'bright');
  
  // 检查当前目录
  const rootDir = process.cwd();
  const docsDir = path.join(rootDir, 'docs');
  const distDir = path.join(docsDir, '.vitepress', 'dist');
  
  if (!fs.existsSync(docsDir)) {
    log('错误: 找不到 docs 目录', 'red');
    process.exit(1);
  }
  
  // 检查 Git 状态
  log('\n📋 检查 Git 状态...', 'blue');
  const isClean = checkGitStatus();
  const currentBranch = getCurrentBranch();
  log(`当前分支: ${currentBranch}`, 'cyan');
  
  // 安装依赖
  log('\n📦 安装依赖...', 'blue');
  execCommand('pnpm install --frozen-lockfile');
  
  // 构建文档
  log('\n🔨 构建文档...', 'blue');
  execCommand('pnpm run build', { cwd: docsDir });
  
  // 检查构建结果
  if (!fs.existsSync(distDir)) {
    log('错误: 构建失败，找不到 dist 目录', 'red');
    process.exit(1);
  }
  
  log('✅ 文档构建成功', 'green');
  
  // 部署到 gh-pages
  log('\n🌐 部署到 GitHub Pages...', 'blue');
  
  // 检查是否安装了 gh-pages
  try {
    execSync('npx gh-pages --version', { stdio: 'pipe' });
  } catch (error) {
    log('安装 gh-pages...', 'yellow');
    execCommand('npm install -g gh-pages');
  }
  
  // 部署
  execCommand(`npx gh-pages -d "${distDir}" -m "docs: deploy from ${currentBranch} branch"`);
  
  log('\n🎉 部署完成！', 'green');
  log('📖 文档地址: https://rouarn.github.io/vakao-ui/', 'cyan');
  log('⏰ 请等待几分钟让 GitHub Pages 更新', 'yellow');
}

// 主函数
function main() {
  try {
    deploy();
  } catch (error) {
    log('部署失败:', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { deploy };