/**
 * 依赖切换脚本 - ESM版本
 * 用于在开发模式和部署模式之间切换 vakao-ui 依赖
 *
 * 开发模式: "vakao-ui": "0.0.1" (从私有npm仓库)
 * 部署模式: "vakao-ui": "workspace:*" (使用本地workspace)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

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
    console.error("❌ 读取 examples/package.json 失败:", error.message);
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
    console.error("❌ 写入 examples/package.json 失败:", error.message);
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
    console.log("✅ 已切换到开发模式: vakao-ui@0.0.1 (私有npm仓库)");
  } else {
    console.log("⚠️  未找到 vakao-ui 依赖");
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
    console.log("✅ 已切换到部署模式: vakao-ui@workspace:* (本地workspace)");
  } else {
    console.log("⚠️  未找到 vakao-ui 依赖");
  }
}

/**
 * 显示当前状态
 */
function showStatus() {
  const packageData = readPackageJson();
  const currentVersion = packageData.dependencies?.["vakao-ui"] || "未找到";

  console.log("📋 当前 vakao-ui 依赖状态:");
  console.log(`   版本: ${currentVersion}`);

  if (currentVersion === "0.0.1") {
    console.log("   模式: 🔧 开发模式 (私有npm仓库)");
  } else if (currentVersion === "workspace:*") {
    console.log("   模式: 🚀 部署模式 (本地workspace)");
  } else {
    console.log("   模式: ❓ 未知模式");
  }
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log("📖 依赖切换脚本使用说明:");
  console.log("");
  console.log("用法:");
  console.log("  node scripts/deps/switch-deps.js [命令]");
  console.log("");
  console.log("命令:");
  console.log("  dev     切换到开发模式 (vakao-ui@0.0.1)");
  console.log("  deploy  切换到部署模式 (vakao-ui@workspace:*)");
  console.log("  status  显示当前依赖状态");
  console.log("  help    显示此帮助信息");
  console.log("");
  console.log("示例:");
  console.log("  node scripts/deps/switch-deps.js dev");
  console.log("  node scripts/deps/switch-deps.js deploy");
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
        console.error(`❌ 未知命令: ${command}`);
        console.log("");
        showHelp();
        process.exit(1);
      }
  }
}

// 执行主函数
main();
