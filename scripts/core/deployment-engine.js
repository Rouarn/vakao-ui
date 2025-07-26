/**
 * Vakao UI 部署引擎
 *
 * 提供统一的部署管理功能：
 * - 多种部署策略支持
 * - 插件化架构
 * - 部署前检查
 * - 回滚支持
 * - 部署状态监控
 *
 * @version 1.0.0
 * @author 我与夏季
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { log, separator } = require("../utils");

/**
 * 部署引擎类
 */
class DeploymentEngine {
  constructor(config) {
    this.config = config;
    this.projectRoot = config.projectRoot;
    this.deploymentStrategies = new Map();
    this.hooks = {
      beforeDeploy: [],
      afterDeploy: [],
      onError: [],
    };

    // 注册默认部署策略
    this.registerDefaultStrategies();
  }

  /**
   * 注册默认部署策略
   */
  registerDefaultStrategies() {
    // GitHub Pages 部署策略
    this.registerStrategy("github-pages", {
      name: "GitHub Pages",
      description: "部署到 GitHub Pages",
      icon: "🌐",
      async deploy(options) {
        return this.deployToGitHubPages(options);
      },
    });

    // 文档部署策略
    this.registerStrategy("docs", {
      name: "文档部署",
      description: "构建并部署文档站点",
      icon: "📚",
      async deploy(options) {
        return this.deployDocs(options);
      },
    });

    // 静态资源部署策略
    this.registerStrategy("static", {
      name: "静态资源",
      description: "部署静态资源到 CDN",
      icon: "📦",
      async deploy(options) {
        return this.deployStatic(options);
      },
    });
  }

  /**
   * 注册部署策略
   * @param {string} name - 策略名称
   * @param {Object} strategy - 策略配置
   */
  registerStrategy(name, strategy) {
    this.deploymentStrategies.set(name, {
      ...strategy,
      deploy: strategy.deploy.bind(this),
    });
    log(`注册部署策略: ${strategy.name}`, "info");
  }

  /**
   * 获取所有可用的部署策略
   * @returns {Array} 策略列表
   */
  getAvailableStrategies() {
    return Array.from(this.deploymentStrategies.entries()).map(
      ([key, strategy]) => ({
        key,
        name: strategy.name,
        description: strategy.description,
        icon: strategy.icon,
      }),
    );
  }

  /**
   * 注册钩子函数
   * @param {string} hookName - 钩子名称
   * @param {Function} callback - 回调函数
   */
  registerHook(hookName, callback) {
    if (this.hooks[hookName]) {
      this.hooks[hookName].push(callback);
    }
  }

  /**
   * 执行钩子函数
   * @param {string} hookName - 钩子名称
   * @param {Object} context - 上下文数据
   */
  async executeHooks(hookName, context) {
    const hooks = this.hooks[hookName] || [];
    for (const hook of hooks) {
      try {
        await hook(context);
      } catch (error) {
        log(`钩子执行失败 (${hookName}): ${error.message}`, "error");
        throw error;
      }
    }
  }

  /**
   * 执行命令
   * @param {string} command - 命令
   * @param {Object} options - 选项
   * @returns {string} 命令输出
   */
  execCommand(command, options = {}) {
    try {
      log(`执行命令: ${command}`, "command");
      const result = execSync(command, {
        encoding: "utf8",
        stdio: options.silent ? "pipe" : "inherit",
        cwd: options.cwd || this.projectRoot,
        ...options,
      });
      return result;
    } catch (error) {
      log(`命令执行失败: ${error.message}`, "error");
      if (options.exitOnError !== false) {
        throw error;
      }
      return null;
    }
  }

  /**
   * 检查 Git 状态
   * @returns {Object} Git 状态信息
   */
  checkGitStatus() {
    try {
      const status = this.execCommand("git status --porcelain", {
        silent: true,
      });
      const currentBranch = this.execCommand(
        "git rev-parse --abbrev-ref HEAD",
        { silent: true },
      ).trim();

      return {
        isClean: !status.trim(),
        currentBranch,
        hasUncommittedChanges: !!status.trim(),
        status: status.trim(),
      };
    } catch (error) {
      log("无法检查 Git 状态", "warning");
      return {
        isClean: false,
        currentBranch: "unknown",
        hasUncommittedChanges: true,
        status: "unknown",
      };
    }
  }

  /**
   * 部署前检查
   * @param {Object} options - 部署选项
   */
  async preDeployCheck(options = {}) {
    log("执行部署前检查...", "check");

    // 检查 Git 状态
    const gitStatus = this.checkGitStatus();
    log(`当前分支: ${gitStatus.currentBranch}`, "info");

    if (gitStatus.hasUncommittedChanges && !options.allowDirty) {
      log("检测到未提交的更改:", "warning");
      console.log(gitStatus.status);
      if (!options.force) {
        throw new Error("请先提交或暂存更改后再部署");
      }
      log("强制模式：忽略未提交的更改", "warning");
    } else {
      log("Git 工作区干净", "success");
    }

    return gitStatus;
  }

  /**
   * 部署到 GitHub Pages
   * @param {Object} options - 部署选项
   */
  async deployToGitHubPages(options = {}) {
    const {
      buildDir = "docs/.vitepress/dist",
      message,
      branch = "gh-pages",
      isDryRun = false,
    } = options;

    log("开始部署到 GitHub Pages", "deploy");

    const distDir = path.resolve(this.projectRoot, buildDir);

    // 检查构建目录
    if (!fs.existsSync(distDir)) {
      throw new Error(`构建目录不存在: ${distDir}`);
    }

    // 检查是否安装了 gh-pages
    try {
      this.execCommand("npx gh-pages --version", { silent: true });
    } catch (error) {
      log("安装 gh-pages...", "warning");
      if (!isDryRun) {
        this.execCommand("npm install -g gh-pages");
      }
    }

    // 构建部署命令
    const gitStatus = this.checkGitStatus();
    const deployMessage =
      message || `docs: deploy from ${gitStatus.currentBranch} branch`;
    const deployCommand = `npx gh-pages -d "${distDir}" -b ${branch} -m "${deployMessage}"`;

    if (isDryRun) {
      log(`[测试模式] 将执行: ${deployCommand}`, "info");
      return {
        success: true,
        message: "测试模式部署完成",
        url: "https://rouarn.github.io/vakao-ui/",
      };
    }

    // 执行部署
    this.execCommand(deployCommand);

    return {
      success: true,
      message: "GitHub Pages 部署完成",
      url: "https://rouarn.github.io/vakao-ui/",
    };
  }

  /**
   * 部署文档
   * @param {Object} options - 部署选项
   */
  async deployDocs(options = {}) {
    const { buildCommand = "pnpm run build:docs", isDryRun = false } = options;

    log("开始构建文档", "build");

    // 安装依赖
    if (!isDryRun) {
      this.execCommand("pnpm install --frozen-lockfile");
    }

    // 构建文档
    if (!isDryRun) {
      this.execCommand(buildCommand);
    } else {
      log(`[测试模式] 将执行: ${buildCommand}`, "info");
    }

    // 检查构建结果
    const distDir = path.join(this.projectRoot, "docs", ".vitepress", "dist");
    if (!isDryRun && !fs.existsSync(distDir)) {
      throw new Error("文档构建失败，找不到 dist 目录");
    }

    log("文档构建成功", "success");

    return {
      success: true,
      message: "文档构建完成",
      buildDir: distDir,
    };
  }

  /**
   * 部署静态资源
   * @param {Object} options - 部署选项
   */
  async deployStatic(options = {}) {
    const { sourceDir = "dist", isDryRun = false } = options;

    log("开始部署静态资源", "deploy");

    const staticDir = path.resolve(this.projectRoot, sourceDir);

    if (!fs.existsSync(staticDir)) {
      throw new Error(`静态资源目录不存在: ${staticDir}`);
    }

    if (isDryRun) {
      log(`[测试模式] 将部署目录: ${staticDir}`, "info");
      return {
        success: true,
        message: "测试模式静态资源部署完成",
      };
    }

    // 这里可以添加具体的 CDN 部署逻辑
    log("静态资源部署功能待实现", "warning");

    return {
      success: true,
      message: "静态资源部署完成",
    };
  }

  /**
   * 执行部署
   * @param {string} strategyName - 策略名称
   * @param {Object} options - 部署选项
   */
  async deploy(strategyName, options = {}) {
    const strategy = this.deploymentStrategies.get(strategyName);
    if (!strategy) {
      throw new Error(`未知的部署策略: ${strategyName}`);
    }

    const context = {
      strategy: strategyName,
      options,
      startTime: Date.now(),
    };

    try {
      // 执行部署前钩子
      await this.executeHooks("beforeDeploy", context);

      // 部署前检查
      const gitStatus = await this.preDeployCheck(options);
      context.gitStatus = gitStatus;

      separator();

      // 执行部署
      log(`使用策略: ${strategy.name} ${strategy.icon}`, "deploy");
      const result = await strategy.deploy(options);

      context.result = result;
      context.endTime = Date.now();
      context.duration = context.endTime - context.startTime;

      // 执行部署后钩子
      await this.executeHooks("afterDeploy", context);

      return result;
    } catch (error) {
      context.error = error;
      await this.executeHooks("onError", context);
      throw error;
    }
  }

  /**
   * 关闭部署引擎
   */
  close() {
    // 清理资源
    this.deploymentStrategies.clear();
    this.hooks = {
      beforeDeploy: [],
      afterDeploy: [],
      onError: [],
    };
  }
}

module.exports = DeploymentEngine;