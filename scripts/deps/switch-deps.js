/**
 * 依赖切换脚本
 * 用于在开发模式和部署模式之间切换 vakao-ui 依赖
 *
 * 开发模式: "vakao-ui": "0.0.1" (从私有npm仓库)
 * 部署模式: "vakao-ui": "workspace:*" (使用本地workspace)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { log } from "../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取项目根目录
const projectRoot = resolve(__dirname, "../..");
const examplesPackageJsonPath = resolve(projectRoot, "examples/package.json");

/**
 * 读取并解析 package.json
 */
function readPackageJson() {
  try {
    const content = readFileSync(examplesPackageJsonPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    log(`读取 examples/package.json 失败: ${error.message}`, "error");
    process.exit(1);
  }
}

/**
 * 写入 package.json
 */
function writePackageJson(packageData) {
  try {
    const content = JSON.stringify(packageData, null, 2) + "\n";
    writeFileSync(examplesPackageJsonPath, content, "utf-8");
  } catch (error) {
    log(`写入 examples/package.json 失败: ${error.message}`, "error");
    process.exit(1);
  }
}

/**
 * 切换到开发模式
 */
function switchToDev() {
  const packageData = readPackageJson();

  if (packageData.dependencies && packageData.dependencies["vakao-ui"]) {
    packageData.dependencies["vakao-ui"] = "0.0.1";
    writePackageJson(packageData);
    log("已切换到开发模式: vakao-ui@0.0.1 (私有npm仓库)", "success");
  } else {
    log("未找到 vakao-ui 依赖", "warning");
  }
}

/**
 * 切换到部署模式
 */
function switchToDeploy() {
  const packageData = readPackageJson();

  if (packageData.dependencies && packageData.dependencies["vakao-ui"]) {
    packageData.dependencies["vakao-ui"] = "workspace:*";
    writePackageJson(packageData);
    log("已切换到部署模式: vakao-ui@workspace:* (本地workspace)", "success");
  } else {
    log("未找到 vakao-ui 依赖", "warning");
  }
}

/**
 * 显示当前状态
 */
function showStatus() {
  const packageData = readPackageJson();
  const currentVersion = packageData.dependencies?.["vakao-ui"] || "未找到";

  log("当前 vakao-ui 依赖状态:", "info");
  log(`   版本: ${currentVersion}`, "info");

  if (currentVersion === "0.0.1") {
    log("   模式: 🔧 开发模式 (私有npm仓库)", "info");
  } else if (currentVersion === "workspace:*") {
    log("   模式: 🚀 部署模式 (本地workspace)", "info");
  } else {
    log("   模式: ❓ 未知模式", "info");
  }
}

/**
 * 显示帮助信息
 */
function showHelp() {
  log("\n依赖切换脚本使用说明:", "info");
  log("", "info");
  log("用法:", "info");
  log("  node scripts/deps/switch-deps.js [命令]", "info");
  log("", "info");
  log("命令:", "info");
  log("  dev     切换到开发模式 (vakao-ui@0.0.1)", "info");
  log("  deploy  切换到部署模式 (vakao-ui@workspace:*)", "info");
  log("  status  显示当前依赖状态", "info");
  log("  help    显示此帮助信息", "info");
  log("", "info");
  log("示例:", "info");
  log("  node scripts/deps/switch-deps.js dev", "info");
  log("  node scripts/deps/switch-deps.js deploy", "info");
}

// 主函数
function main() {
  const command = process.argv[2];

  switch (command) {
    case "dev":
      switchToDev();
      break;
    case "deploy":
      switchToDeploy();
      break;
    case "status":
      showStatus();
      break;
    case "help":
    case "--help":
    case "-h":
      showHelp();
      break;
    default:
      if (!command) {
        showStatus();
      } else {
        log(`未知命令: ${command}`, "error");
        log("", "info");
        showHelp();
        process.exit(1);
      }
  }
}

// 执行主函数
main();
