#!/usr/bin/env node

/**
 * Vakao UI 包发布统一脚本
 *
 * 提供统一的包发布管理，支持单独发布或批量发布 hooks 和 utils 包
 *
 * 功能特性：
 * - 交互式包选择
 * - 批量发布支持
 * - 版本同步选项
 * - 测试模式支持
 * - 完整的错误处理和回滚
 *
 * 使用方法：
 * ```bash
 * # 交互式发布
 * node scripts/publish-packages.js
 *
 * # 发布指定包
 * node scripts/publish-packages.js --packages hooks,utils
 *
 * # 测试模式
 * node scripts/publish-packages.js --dry-run
 *
 * # 同步版本号
 * node scripts/publish-packages.js --sync-version
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

const { execSync, spawn } = require("child_process");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const path = require("path");
const readline = require("readline");
const { log, separator, showBanner, showSuccess, handleError } = require("../utils/");

// ==================== 配置常量 ====================

/** 工具标题 */
const TOOL_TITLE = "📦 Vakao UI 包发布管理器 📦";

/** 支持的包配置 */
const PACKAGES = {
  hooks: {
    name: "@vakao-ui/hooks",
    displayName: "Hooks (组合式函数)",
    script: "publish-hooks.js",
    path: "packages/hooks",
    icon: "🪝",
  },
  utils: {
    name: "@vakao-ui/utils",
    displayName: "Utils (工具函数)",
    script: "publish-utils.js",
    path: "packages/utils",
    icon: "🛠️",
  },
};

/** 项目根目录 */
const PROJECT_ROOT = path.resolve(__dirname, "..");

/** 默认 npm registry 配置 */
const DEFAULT_REGISTRY = "https://registry.npmjs.org/";

/** 私有制品仓库配置 */
const PRIVATE_REGISTRY = process.env.NPM_REGISTRY || DEFAULT_REGISTRY;

/** 是否使用私有仓库 */
const USE_PRIVATE_REGISTRY = PRIVATE_REGISTRY !== DEFAULT_REGISTRY;

// ==================== 工具函数 ====================

/**
 * 创建 readline 接口
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 获取包的 package.json
 *
 * @param {string} packageKey - 包标识符
 * @returns {Object} package.json 内容
 */
function getPackageJson(packageKey) {
  const packagePath = path.join(PROJECT_ROOT, PACKAGES[packageKey].path, "package.json");
  if (!existsSync(packagePath)) {
    throw new Error(`package.json 不存在: ${packagePath}`);
  }
  return JSON.parse(readFileSync(packagePath, "utf8"));
}

/**
 * 更新包的版本号
 *
 * @param {string} packageKey - 包标识符
 * @param {string} version - 新版本号
 */
function updatePackageVersion(packageKey, version) {
  const packagePath = path.join(PROJECT_ROOT, PACKAGES[packageKey].path, "package.json");
  const packageJson = getPackageJson(packageKey);
  packageJson.version = version;
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
  log(`${PACKAGES[packageKey].name} 版本已更新为: ${version}`, "success");
}

/**
 * 验证版本号格式
 *
 * @param {string} version - 版本号
 * @returns {boolean} 是否有效
 */
function isValidVersion(version) {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
}

/**
 * 计算建议的新版本号
 *
 * @param {string} currentVersion - 当前版本号
 * @returns {string} 建议的新版本号
 */
function suggestNextVersion(currentVersion) {
  const versionParts = currentVersion.split(".");
  if (versionParts.length === 3) {
    const [major, minor, patch] = versionParts;
    return `${major}.${minor}.${parseInt(patch) + 1}`;
  }
  return currentVersion;
}

/**
 * 询问要发布的包
 *
 * @returns {Promise<string[]>} 选择的包列表
 */
function askForPackages() {
  return new Promise((resolve) => {
    console.log("\n可用的包:");
    Object.entries(PACKAGES).forEach(([key, pkg], index) => {
      console.log(`  ${index + 1}. ${pkg.icon} ${pkg.displayName} (${pkg.name})`);
    });
    console.log(`  ${Object.keys(PACKAGES).length + 1}. 🚀 全部发布`);

    rl.question("\n请选择要发布的包 (输入数字，多个用逗号分隔): ", (answer) => {
      const choices = answer.split(",").map((s) => s.trim());
      const packageKeys = [];

      for (const choice of choices) {
        const index = parseInt(choice) - 1;
        const packageEntries = Object.entries(PACKAGES);

        if (index >= 0 && index < packageEntries.length) {
          packageKeys.push(packageEntries[index][0]);
        } else if (parseInt(choice) === packageEntries.length + 1) {
          // 选择全部
          packageKeys.push(...Object.keys(PACKAGES));
          break;
        }
      }

      if (packageKeys.length === 0) {
        log("无效选择，请重新选择", "error");
        askForPackages().then(resolve);
        return;
      }

      // 去重
      const uniquePackages = [...new Set(packageKeys)];
      resolve(uniquePackages);
    });
  });
}

/**
 * 询问版本号
 *
 * @param {string[]} packageKeys - 包列表
 * @param {boolean} syncVersion - 是否同步版本号
 * @returns {Promise<Object>} 版本号映射
 */
function askForVersions(packageKeys, syncVersion) {
  return new Promise(async (resolve) => {
    const versions = {};

    if (syncVersion && packageKeys.length > 1) {
      // 同步版本模式
      const firstPackage = packageKeys[0];
      const currentVersion = getPackageJson(firstPackage).version;
      const suggestedVersion = suggestNextVersion(currentVersion);

      log(`\n同步版本模式：所有包将使用相同版本号`, "info");
      log(`当前版本: ${currentVersion}`, "info");

      const version = await askForSingleVersion(currentVersion, suggestedVersion, "统一版本号");

      packageKeys.forEach((key) => {
        versions[key] = version;
      });
    } else {
      // 独立版本模式
      for (const packageKey of packageKeys) {
        const currentVersion = getPackageJson(packageKey).version;
        const suggestedVersion = suggestNextVersion(currentVersion);

        log(`\n${PACKAGES[packageKey].icon} ${PACKAGES[packageKey].displayName}`, "info");
        log(`当前版本: ${currentVersion}`, "info");

        const version = await askForSingleVersion(currentVersion, suggestedVersion, PACKAGES[packageKey].displayName);

        versions[packageKey] = version;
      }
    }

    resolve(versions);
  });
}

/**
 * 询问单个版本号
 *
 * @param {string} currentVersion - 当前版本号
 * @param {string} suggestedVersion - 建议版本号
 * @param {string} packageName - 包名称
 * @returns {Promise<string>} 新版本号
 */
function askForSingleVersion(currentVersion, suggestedVersion, packageName) {
  return new Promise((resolve) => {
    rl.question(`请输入 ${packageName} 的新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `, (version) => {
      const newVersion = version || suggestedVersion;

      if (!isValidVersion(newVersion)) {
        log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
        askForSingleVersion(currentVersion, suggestedVersion, packageName).then(resolve);
        return;
      }

      if (newVersion <= currentVersion) {
        log("新版本号必须大于当前版本！", "error");
        askForSingleVersion(currentVersion, suggestedVersion, packageName).then(resolve);
        return;
      }

      log(`${packageName} 版本号验证通过: ${newVersion}`, "success");
      resolve(newVersion);
    });
  });
}

/**
 * 执行包发布脚本
 *
 * @param {string} packageKey - 包标识符
 * @param {string} version - 版本号
 * @param {boolean} isDryRun - 是否为测试模式
 * @returns {Promise<boolean>} 是否成功
 */
function executePackagePublish(packageKey, version, isDryRun) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, PACKAGES[packageKey].script);
    const args = [];

    if (isDryRun) {
      args.push("--dry-run");
    }

    log(`\n${PACKAGES[packageKey].icon} 开始发布 ${PACKAGES[packageKey].displayName}...`, "publish");

    // 先更新版本号
    updatePackageVersion(packageKey, version);

    // 执行发布脚本
    const child = spawn("node", [scriptPath, ...args], {
      stdio: "inherit",
      cwd: PROJECT_ROOT,
    });

    child.on("close", (code) => {
      if (code === 0) {
        log(`${PACKAGES[packageKey].displayName} 发布成功`, "success");
        resolve(true);
      } else {
        log(`${PACKAGES[packageKey].displayName} 发布失败`, "error");
        reject(new Error(`发布失败，退出码: ${code}`));
      }
    });

    child.on("error", (error) => {
      log(`${PACKAGES[packageKey].displayName} 发布出错: ${error.message}`, "error");
      reject(error);
    });
  });
}

/**
 * 解析命令行参数
 *
 * @returns {Object} 解析后的参数
 */
function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    isDryRun: args.includes("--dry-run"),
    syncVersion: args.includes("--sync-version"),
    packages: null,
  };

  // 解析 --packages 参数
  const packagesIndex = args.findIndex((arg) => arg.startsWith("--packages"));
  if (packagesIndex !== -1) {
    const packagesArg = args[packagesIndex];
    if (packagesArg.includes("=")) {
      const packagesList = packagesArg.split("=")[1];
      options.packages = packagesList.split(",").map((p) => p.trim());
    } else if (args[packagesIndex + 1] && !args[packagesIndex + 1].startsWith("--")) {
      options.packages = args[packagesIndex + 1].split(",").map((p) => p.trim());
    }
  }

  return options;
}

// ==================== 主函数 ====================

/**
 * 主发布流程
 */
async function main() {
  try {
    // 显示 banner
    showBanner(TOOL_TITLE);

    // 解析命令行参数
    const options = parseArguments();

    log(`发布模式: ${options.isDryRun ? "测试模式" : "正式发布"}`, "info");
    log(`目标仓库: ${USE_PRIVATE_REGISTRY ? `私有制品仓库 (${PRIVATE_REGISTRY})` : "npm 官方仓库"}`, "info");
    if (options.syncVersion) {
      log(`版本同步: 启用`, "info");
    }

    separator();

    // 确定要发布的包
    let packageKeys;
    if (options.packages) {
      packageKeys = options.packages.filter((key) => PACKAGES[key]);
      if (packageKeys.length === 0) {
        throw new Error("指定的包不存在");
      }
      log(`指定发布包: ${packageKeys.map((key) => PACKAGES[key].displayName).join(", ")}`, "info");
    } else {
      packageKeys = await askForPackages();
    }

    separator();

    // 确定版本号
    const versions = await askForVersions(packageKeys, options.syncVersion);

    separator();

    // 显示发布计划
    log("发布计划:", "info");
    packageKeys.forEach((key) => {
      log(`  ${PACKAGES[key].icon} ${PACKAGES[key].displayName}: v${versions[key]}`, "info");
    });

    separator();

    // 确认发布
    const confirmPublish = await new Promise((resolve) => {
      rl.question(`确认${options.isDryRun ? "测试" : "发布"}以上包？(y/N): `, (answer) => {
        resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
      });
    });

    if (!confirmPublish) {
      log("发布已取消", "warning");
      return;
    }

    separator();

    // 执行发布
    const results = [];
    for (const packageKey of packageKeys) {
      try {
        await executePackagePublish(packageKey, versions[packageKey], options.isDryRun);
        results.push({
          package: packageKey,
          success: true,
          version: versions[packageKey],
        });
      } catch (error) {
        results.push({
          package: packageKey,
          success: false,
          error: error.message,
        });
        log(`${PACKAGES[packageKey].displayName} 发布失败，继续处理其他包...`, "warning");
      }
    }

    separator();

    // 显示发布结果
    log("发布结果汇总:", "info");
    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    results.forEach((result) => {
      const pkg = PACKAGES[result.package];
      if (result.success) {
        log(`  ✅ ${pkg.icon} ${pkg.displayName} v${result.version} - 成功`, "success");
      } else {
        log(`  ❌ ${pkg.icon} ${pkg.displayName} - 失败: ${result.error}`, "error");
      }
    });

    separator();

    if (failCount === 0) {
      showSuccess(`所有包${options.isDryRun ? "测试" : "发布"}成功！(${successCount}/${packageKeys.length})`);
    } else {
      log(`发布完成：${successCount} 成功，${failCount} 失败`, "warning");
    }
  } catch (error) {
    handleError("包发布过程中出现错误", error);
  } finally {
    rl.close();
  }
}

// ==================== 程序入口 ====================

// 运行主函数
main().catch((err) => {
  console.error("包发布失败:", err);
  process.exit(1);
});
