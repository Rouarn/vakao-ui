#!/usr/bin/env node

/**
 * 发布脚本
 * 用于构建并发布组件库到npm
 */

const { execSync } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const readline = require("readline");
const {
  log,
  separator,
  showBanner,
  showSuccess,
  handleError,
} = require("./utils");

// 工具标题
const TOOL_TITLE = "🚀 Vakao UI 发布工具 🚀";

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 执行命令并打印输出
function exec(command) {
  log(`执行命令: ${command}`, "command");
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    log(`命令执行失败: ${error}`, "error");
    process.exit(1);
  }
}

// 获取package.json
function getPackageJson() {
  const packagePath = path.resolve(__dirname, "../package.json");
  return JSON.parse(readFileSync(packagePath, "utf8"));
}

// 更新版本号
function updateVersion(version) {
  // 更新主 package.json
  const packagePath = path.resolve(__dirname, "../package.json");
  const packageJson = getPackageJson();
  packageJson.version = version;
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

  // 更新 packages/package.json
  const packagesPackagePath = path.resolve(
    __dirname,
    "../packages/package.json",
  );
  try {
    const packagesPackageJson = JSON.parse(
      readFileSync(packagesPackagePath, "utf8"),
    );
    packagesPackageJson.version = version;
    writeFileSync(
      packagesPackagePath,
      JSON.stringify(packagesPackageJson, null, 2),
    );
    log(`packages/package.json 版本已更新为: ${version}`, "success");
  } catch (error) {
    log(`无法更新 packages/package.json: ${error.message}`, "warning");
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
  const versionParts = currentVersion.split(".");
  if (versionParts.length === 3) {
    const [major, minor, patch] = versionParts;
    return `${major}.${minor}.${parseInt(patch) + 1}`;
  }
  return currentVersion;
}

// 递归询问版本号直到输入正确
function askForVersion(currentVersion, suggestedVersion) {
  return new Promise((resolve) => {
    rl.question(
      `请输入新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `,
      (version) => {
        const newVersion = version || suggestedVersion;

        // 验证版本号格式
        if (!isValidVersion(newVersion)) {
          log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
          // 递归重新询问
          askForVersion(currentVersion, suggestedVersion).then(resolve);
          return;
        }

        // 检查版本号是否比当前版本新
        if (newVersion <= currentVersion) {
          log("新版本号必须大于当前版本！", "error");
          // 递归重新询问
          askForVersion(currentVersion, suggestedVersion).then(resolve);
          return;
        }

        log("版本号验证通过", "success");
        resolve(newVersion);
      },
    );
  });
}

// 主函数
async function main() {
  // 显示 banner
  showBanner(TOOL_TITLE);

  // 检查是否为测试模式
  const isDryRun = process.argv.includes("--dry-run");

  const currentVersion = getPackageJson().version;
  const suggestedVersion = suggestNextVersion(currentVersion);
  log(`当前版本: ${currentVersion}`, "info");
  separator();

  try {
    // 使用新的版本号验证函数
    const newVersion = await askForVersion(currentVersion, suggestedVersion);

    // 更新版本号
    if (newVersion !== currentVersion) {
      updateVersion(newVersion);
      log(`版本已更新为: ${newVersion}`, "success");
    }

    separator();
    // 构建
    log("开始构建组件库...", "build");
    exec("pnpm build");

    separator();
    // 发布
    if (isDryRun) {
      log("测试模式：跳过实际发布到npm", "warning");
      log("检查发布文件...", "info");
      exec("npm pack --dry-run");
    } else {
      log("开始发布到npm...", "publish");
      exec("npm publish --access public --ignore-scripts");
    }

    showSuccess(`Vakao UI v${newVersion} ${isDryRun ? "测试" : "发布"}成功!`);
  } catch (error) {
    handleError("发布过程中出现错误", error);
  } finally {
    rl.close();
  }
}

// 运行主函数
main().catch((err) => {
  console.error("发布失败:", err);
  process.exit(1);
});
