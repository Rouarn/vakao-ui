/**
 * 传统部署扩展
 * 将原有的 deploy.js 功能整合到扩展系统中
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { log, separator, showSuccess } = require("../utils/");

class LegacyDeployExtension {
  constructor(config) {
    this.config = config;
    this.name = "legacy-deploy";
    this.version = "1.0.0";
    this.description = "传统部署功能的扩展实现";
  }

  /**
   * 初始化扩展
   * @param {ExtensionManager} extensionManager - 扩展管理器
   */
  async initialize() {
    // 注册自定义部署策略
    const deploymentEngine = this.getDeploymentEngine();
    if (deploymentEngine) {
      deploymentEngine.registerStrategy("legacy-docs", {
        name: "传统文档部署",
        description: "使用传统方式部署文档到 GitHub Pages",
        icon: "📚",
        async deploy(options) {
          return this.legacyDeploy(options);
        },
      });
    }

    log(`${this.name} 扩展已初始化`, "info");
  }

  /**
   * 获取部署引擎实例
   */
  getDeploymentEngine() {
    // 这里需要从全局或其他方式获取部署引擎实例
    // 在实际实现中，可以通过扩展管理器或依赖注入获取
    return null;
  }

  /**
   * 传统部署方法（从原 deploy.js 迁移）
   * @param {Object} options - 部署选项
   */
  async legacyDeploy(options = {}) {
    const { isDryRun = false } = options;

    log("开始传统部署流程", "deploy");
    separator();

    try {
      // 检查当前目录
      const docsDir = path.join(this.config.projectRoot, "docs");
      const distDir = path.join(docsDir, ".vitepress", "dist");

      if (!fs.existsSync(docsDir)) {
        throw new Error("找不到 docs 目录");
      }

      // 检查 Git 状态
      log("检查 Git 状态...", "check");
      const gitStatus = this.checkGitStatus();
      log(`当前分支: ${gitStatus.currentBranch}`, "info");
      separator();

      // 安装依赖
      if (!isDryRun) {
        log("安装依赖...", "info");
        this.execCommand("pnpm install --frozen-lockfile");
      } else {
        log("[测试模式] 跳过依赖安装", "info");
      }

      separator();

      // 构建文档
      log("构建文档...", "info");
      if (!isDryRun) {
        this.execCommand("pnpm run build", { cwd: docsDir });

        // 检查构建结果
        if (!fs.existsSync(distDir)) {
          throw new Error("构建失败，找不到 dist 目录");
        }
        log("文档构建成功", "success");
      } else {
        log("[测试模式] 跳过文档构建", "info");
      }

      separator();

      // 部署到 gh-pages
      log("部署到 GitHub Pages...", "deploy");

      if (!isDryRun) {
        // 检查是否安装了 gh-pages
        try {
          this.execCommand("npx gh-pages --version", { silent: true });
        } catch (error) {
          log("安装 gh-pages...", "warning");
          this.execCommand("npm install -g gh-pages");
        }

        // 部署
        const deployMessage = `docs: deploy from ${gitStatus.currentBranch} branch`;
        this.execCommand(`npx gh-pages -d "${distDir}" -m "${deployMessage}"`);
      } else {
        log("[测试模式] 跳过实际部署", "info");
      }

      const result = {
        success: true,
        message: "传统部署完成",
        url: "https://rouarn.github.io/vakao-ui/",
        buildDir: distDir,
      };

      if (!isDryRun) {
        showSuccess("部署完成！");
        log("📖 文档地址: https://rouarn.github.io/vakao-ui/", "info");
        log("⏰ 请等待几分钟让 GitHub Pages 更新", "warning");
      }

      return result;
    } catch (error) {
      throw new Error(`传统部署失败: ${error.message}`);
    }
  }

  /**
   * 执行命令
   * @param {string} command - 命令
   * @param {Object} options - 选项
   */
  execCommand(command, options = {}) {
    try {
      log(`执行命令: ${command}`, "command");
      const result = execSync(command, {
        encoding: "utf8",
        stdio: options.silent ? "pipe" : "inherit",
        cwd: options.cwd || this.config.projectRoot,
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
   */
  checkGitStatus() {
    try {
      const status = this.execCommand("git status --porcelain", {
        silent: true,
      });
      const currentBranch = this.execCommand(
        "git rev-parse --abbrev-ref HEAD",
        { silent: true }
      ).trim();

      const hasUncommittedChanges = !!status.trim();

      if (hasUncommittedChanges) {
        log("检测到未提交的更改:", "warning");
        console.log(status);
        log("请先提交或暂存更改后再部署", "warning");
      } else {
        log("Git 工作区干净", "success");
      }

      return {
        isClean: !hasUncommittedChanges,
        currentBranch,
        hasUncommittedChanges,
        status: status.trim(),
      };
    } catch (error) {
      log("无法检查 Git 状态", "error");
      return {
        isClean: false,
        currentBranch: "unknown",
        hasUncommittedChanges: true,
        status: "unknown",
      };
    }
  }

  /**
   * 独立部署方法（兼容原有调用方式）
   */
  async deploy() {
    return this.legacyDeploy();
  }

  /**
   * 清理资源
   */
  async destroy() {
    log(`${this.name} 扩展已清理`, "info");
  }
}

// 兼容原有的导出方式
const legacyExtension = new LegacyDeployExtension({
  projectRoot: path.resolve(__dirname, "../.."),
});

// 导出扩展类和兼容方法
module.exports = LegacyDeployExtension;
module.exports.deploy = legacyExtension.deploy.bind(legacyExtension);
