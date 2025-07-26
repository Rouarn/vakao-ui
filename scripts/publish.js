#!/usr/bin/env node

/**
 * Vakao UI 统一发布系统
 *
 * 提供完整的包发布管理功能：
 * - 交互式包选择
 * - 批量发布支持
 * - 版本同步选项
 * - 测试模式支持
 * - 完整的错误处理和回滚
 * - 私有仓库支持
 *
 * 使用方法：
 * ```bash
 * # 交互式发布
 * node scripts/publish.js
 *
 * # 发布指定包
 * node scripts/publish.js --packages hooks,utils
 *
 * # 测试模式
 * node scripts/publish.js --dry-run
 *
 * # 同步版本号
 * node scripts/publish.js --sync-version
 *
 * # 发布单个包
 * node scripts/publish.js --package hooks
 * ```
 *
 * @version 2.0.0
 * @author Vakao UI Team
 */

const path = require("path");
const {
  log,
  separator,
  showBanner,
  showSuccess,
  handleError,
} = require("./utils/");
const PublishEngine = require("./core/publish-engine");
const Interactive = require("./core/interactive");
const DeploymentEngine = require("./core/deployment-engine");
const ExtensionManager = require("./core/extension-manager");
const { CONFIG } = require("./core/package-configs");

// ==================== 配置常量 ====================

/** 工具标题 */
const TOOL_TITLE = "📦 Vakao UI 统一发布系统 📦";

// ==================== 工具函数 ====================

/**
 * 解析命令行参数
 * @returns {Object} 解析后的参数
 */
function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    isDryRun: args.includes("--dry-run"),
    syncVersion: args.includes("--sync-version"),
    packages: null,
    singlePackage: null,
    help: args.includes("--help") || args.includes("-h"),
    // 部署相关选项
    deploy: args.includes("--deploy"),
    deployStrategy: null,
    deployOnly: args.includes("--deploy-only"),
    skipDeploy: args.includes("--skip-deploy"),
  };

  // 解析 --packages 参数（多个包）
  const packagesIndex = args.findIndex((arg) => arg.startsWith("--packages"));
  if (packagesIndex !== -1) {
    const packagesArg = args[packagesIndex];
    if (packagesArg.includes("=")) {
      const packagesList = packagesArg.split("=")[1];
      options.packages = packagesList.split(",").map((p) => p.trim());
    } else if (
      args[packagesIndex + 1] &&
      !args[packagesIndex + 1].startsWith("--")
    ) {
      options.packages = args[packagesIndex + 1]
        .split(",")
        .map((p) => p.trim());
    }
  }

  // 解析 --package 参数（单个包）
  const packageIndex = args.findIndex(
    (arg) => arg.startsWith("--package") && !arg.startsWith("--packages"),
  );
  if (packageIndex !== -1) {
    const packageArg = args[packageIndex];
    if (packageArg.includes("=")) {
      options.singlePackage = packageArg.split("=")[1].trim();
    } else if (
      args[packageIndex + 1] &&
      !args[packageIndex + 1].startsWith("--")
    ) {
      options.singlePackage = args[packageIndex + 1].trim();
    }
  }

  // 解析 --deploy-strategy 参数
  const deployStrategyIndex = args.findIndex((arg) => arg.startsWith("--deploy-strategy"));
  if (deployStrategyIndex !== -1) {
    const strategyArg = args[deployStrategyIndex];
    if (strategyArg.includes("=")) {
      options.deployStrategy = strategyArg.split("=")[1].trim();
    } else if (
      args[deployStrategyIndex + 1] &&
      !args[deployStrategyIndex + 1].startsWith("--")
    ) {
      options.deployStrategy = args[deployStrategyIndex + 1].trim();
    }
  }

  return options;
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(`\n${TOOL_TITLE}\n`);
  console.log("使用方法:");
  console.log("  node scripts/publish.js [选项]");
  console.log("\n发布选项:");
  console.log("  --help, -h           显示帮助信息");
  console.log("  --dry-run            测试模式，不实际发布");
  console.log("  --sync-version       同步所有包的版本号");
  console.log("  --packages <list>    发布指定的包（逗号分隔）");
  console.log("  --package <name>     发布单个包");
  console.log("\n部署选项:");
  console.log("  --deploy             发布后自动部署");
  console.log("  --deploy-only        仅执行部署，跳过发布");
  console.log("  --deploy-strategy <strategy>  指定部署策略");
  console.log("  --skip-deploy        跳过部署步骤");
  console.log("\n发布示例:");
  console.log("  node scripts/publish.js");
  console.log("  node scripts/publish.js --dry-run");
  console.log("  node scripts/publish.js --packages hooks,utils");
  console.log("  node scripts/publish.js --package hooks --dry-run");
  console.log("  node scripts/publish.js --sync-version");
  console.log("\n部署示例:");
  console.log("  node scripts/publish.js --deploy");
  console.log("  node scripts/publish.js --deploy-only --deploy-strategy docs");
  console.log("  node scripts/publish.js --package main --deploy --deploy-strategy github-pages");
  console.log("\n可用的包:");
  Object.entries(CONFIG.packages).forEach(([key, pkg]) => {
    console.log(`  ${key.padEnd(8)} ${pkg.icon} ${pkg.displayName}`);
  });
  console.log("\n可用的部署策略:");
  console.log("  docs                 📚 构建并部署文档站点");
  console.log("  github-pages         🌐 部署到 GitHub Pages");
  console.log("  static               📦 部署静态资源到 CDN");
}

/**
 * 验证包名
 * @param {string[]} packageKeys - 包名列表
 * @returns {string[]} 有效的包名列表
 */
function validatePackages(packageKeys) {
  const validPackages = packageKeys.filter((key) => CONFIG.packages[key]);
  const invalidPackages = packageKeys.filter((key) => !CONFIG.packages[key]);

  if (invalidPackages.length > 0) {
    log(`无效的包名: ${invalidPackages.join(", ")}`, "error");
    log("可用的包:", "info");
    Object.keys(CONFIG.packages).forEach((key) => {
      log(`  ${key}`, "info");
    });
  }

  return validPackages;
}

/**
 * 处理仅部署模式
 * @param {Object} options - 命令行选项
 * @param {DeploymentEngine} deploymentEngine - 部署引擎
 * @param {Interactive} interactive - 交互界面
 */
async function handleDeployOnly(options, deploymentEngine, interactive) {
  log("仅部署模式", "deploy");
  separator();

  // 确定部署策略
  let strategy = options.deployStrategy;
  if (!strategy) {
    const strategies = deploymentEngine.getAvailableStrategies();
    const choices = strategies.map((s) => ({
      name: `${s.icon} ${s.name}`,
      value: s.key,
      description: s.description,
    }));

    const inquirer = require("inquirer");
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "strategy",
        message: "选择部署策略:",
        choices,
      },
    ]);
    strategy = answer.strategy;
  }

  // 执行部署
  try {
    const result = await deploymentEngine.deploy(strategy, {
      isDryRun: options.isDryRun,
    });

    separator();
    if (result.success) {
      showSuccess(result.message);
      if (result.url) {
        log(`🌐 访问地址: ${result.url}`, "info");
      }
    } else {
      log(`部署失败: ${result.message}`, "error");
      process.exit(1);
    }
  } catch (error) {
    handleError("部署失败", error.message);
  }
}

/**
 * 处理发布后部署
 * @param {Object} options - 命令行选项
 * @param {DeploymentEngine} deploymentEngine - 部署引擎
 * @param {Interactive} interactive - 交互界面
 * @param {Array} publishResults - 发布结果
 */
async function handleDeployment(options, deploymentEngine, interactive, publishResults) {
  separator();
  log("开始部署流程", "deploy");

  // 确定部署策略
  let strategy = options.deployStrategy || "docs"; // 默认部署文档

  try {
    const deployOptions = {
      isDryRun: options.isDryRun,
      publishResults,
    };

    // 根据发布结果调整部署选项
    const hasMainPackage = publishResults.some((r) => r.package === "main" && r.success);
    if (hasMainPackage && !options.deployStrategy) {
      // 如果发布了主包，默认部署到 GitHub Pages
      strategy = "github-pages";
    }

    const result = await deploymentEngine.deploy(strategy, deployOptions);

    separator();
    if (result.success) {
      showSuccess(`部署完成: ${result.message}`);
      if (result.url) {
        log(`🌐 访问地址: ${result.url}`, "info");
        log("⏰ 请等待几分钟让服务更新", "warning");
      }
    } else {
      log(`部署失败: ${result.message}`, "error");
    }
  } catch (error) {
    log(`部署过程中出现错误: ${error.message}`, "error");
    log("发布已完成，但部署失败", "warning");
  }
}

// ==================== 主函数 ====================

/**
 * 主发布流程
 */
async function main() {
  let publishEngine = null;
  let interactive = null;
  let deploymentEngine = null;
  let extensionManager = null;

  try {
    // 解析命令行参数
    const options = parseArguments();

    // 显示帮助信息
    if (options.help) {
      showHelp();
      return;
    }

    // 显示 banner
    showBanner(TOOL_TITLE);

    // 设置项目路径
    CONFIG.projectRoot = path.resolve(__dirname, "..");
    CONFIG.buildRoot = path.resolve(CONFIG.projectRoot, "dist");

    // 初始化扩展管理器
    extensionManager = new ExtensionManager(CONFIG);
    await extensionManager.initialize();

    // 初始化发布引擎
    publishEngine = new PublishEngine(CONFIG);

    // 初始化部署引擎
    deploymentEngine = new DeploymentEngine(CONFIG);

    // 初始化交互界面
    interactive = new Interactive(CONFIG.packages);

    // 显示配置信息
    log(`发布模式: ${options.isDryRun ? "测试模式" : "正式发布"}`, "info");
    log(
      `目标仓库: ${
        publishEngine.usePrivateRegistry
          ? `私有制品仓库 (${publishEngine.privateRegistry})`
          : "npm 官方仓库"
      }`,
      "info",
    );
    if (options.syncVersion) {
      log("版本同步: 启用", "info");
    }

    separator();

    // 处理仅部署模式
    if (options.deployOnly) {
      await handleDeployOnly(options, deploymentEngine, interactive);
      return;
    }

    // 确定要发布的包
    let packageKeys;
    if (options.singlePackage) {
      // 单个包模式
      const validPackages = validatePackages([options.singlePackage]);
      if (validPackages.length === 0) {
        throw new Error("指定的包不存在");
      }
      packageKeys = validPackages;
      log(`发布单个包: ${CONFIG.packages[packageKeys[0]].displayName}`, "info");
    } else if (options.packages) {
      // 指定包模式
      const validPackages = validatePackages(options.packages);
      if (validPackages.length === 0) {
        throw new Error("指定的包不存在");
      }
      packageKeys = validPackages;
      log(
        `指定发布包: ${packageKeys.map((key) => CONFIG.packages[key].displayName).join(", ")}`,
        "info",
      );
    } else {
      // 交互式选择
      packageKeys = await interactive.askForPackages();
    }

    separator();

    // 确定版本号
    const versions = await interactive.askForVersions(
      packageKeys,
      options.syncVersion,
      (key) => publishEngine.getPackageJson(key),
      (version) => publishEngine.suggestNextVersion(version),
    );

    separator();

    // 显示发布计划
    interactive.showPublishPlan(packageKeys, versions);

    separator();

    // 确认发布
    const confirmMessage = `确认${options.isDryRun ? "测试" : "发布"}以上包？`;
    const confirmPublish = await interactive.askForConfirmation(confirmMessage);

    if (!confirmPublish) {
      log("发布已取消", "warning");
      return;
    }

    separator();

    // 根据依赖关系对包进行排序
    let sortedPackageKeys = packageKeys;
    if (packageKeys.length > 1) {
      try {
        sortedPackageKeys =
          publishEngine.sortPackagesByDependencies(packageKeys);
        separator();
      } catch (error) {
        log(`依赖排序失败: ${error.message}`, "warning");
        log("将按原顺序发布", "warning");
        separator();
      }
    }

    // 执行发布
    const results = [];
    for (const packageKey of sortedPackageKeys) {
      try {
        const result = await publishEngine.publishSinglePackage(
          packageKey,
          versions[packageKey],
          options.isDryRun,
        );
        results.push({
          package: packageKey,
          ...result,
        });
      } catch (error) {
        results.push({
          package: packageKey,
          success: false,
          error: error.message,
        });
        log(
          `${CONFIG.packages[packageKey].displayName} 发布失败，继续处理其他包...`,
          "warning",
        );
      }
    }

    separator();

    // 显示发布结果
    const { successCount, failCount } = interactive.showPublishResults(
      results,
      options.isDryRun,
    );

    separator();

    // 显示最终结果
    if (failCount === 0) {
      showSuccess(
        `所有包${options.isDryRun ? "测试" : "发布"}成功！(${successCount}/${packageKeys.length})`,
      );

      // 执行部署（如果启用）
      if ((options.deploy || options.deployStrategy) && !options.skipDeploy) {
        await handleDeployment(options, deploymentEngine, interactive, results);
      }
    } else {
      log(`发布完成：${successCount} 成功，${failCount} 失败`, "warning");
      if (!options.skipDeploy && (options.deploy || options.deployStrategy)) {
        log("由于发布失败，跳过部署步骤", "warning");
      }
      process.exit(1);
    }
  } catch (error) {
    handleError("发布过程中出现错误", error);
  } finally {
    // 清理资源
    if (publishEngine) {
      publishEngine.close();
    }
    if (deploymentEngine) {
      deploymentEngine.close();
    }
    if (extensionManager) {
      await extensionManager.close();
    }
    if (interactive) {
      interactive.close();
    }
  }
}

// ==================== 程序入口 ====================

// 运行主函数
main().catch((err) => {
  console.error("发布失败:", err);
  process.exit(1);
});
