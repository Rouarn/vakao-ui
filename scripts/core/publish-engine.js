#!/usr/bin/env node

/**
 * Vakao UI 发布引擎核心模块
 * 
 * 提供统一的包发布功能，支持：
 * - 多包管理
 * - 版本控制
 * - 构建流程
 * - 发布流程
 * - 私有仓库支持
 * - 测试模式
 * 
 * @version 2.0.0
 * @author Vakao UI Team
 */

const { execSync, spawn } = require("child_process");
const { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, rmSync } = require("fs");
const path = require("path");
const readline = require("readline");
const { log, separator, showBanner, showSuccess, handleError } = require("../utils");

/**
 * 发布引擎类
 */
class PublishEngine {
  constructor(config) {
    this.config = config;
    this.projectRoot = config.projectRoot || path.resolve(__dirname, "../..");
    this.buildRoot = config.buildRoot || path.resolve(this.projectRoot, "dist");
    
    // Registry 配置
    this.defaultRegistry = "https://registry.npmjs.org/";
    this.privateRegistry = process.env.NPM_REGISTRY || this.defaultRegistry;
    this.usePrivateRegistry = this.privateRegistry !== this.defaultRegistry;
    
    // 创建 readline 接口
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * 执行命令
   * @param {string} command - 命令
   * @param {string} cwd - 工作目录
   */
  exec(command, cwd = process.cwd()) {
    log(`执行命令: ${command}`, "command");
    try {
      execSync(command, { stdio: "inherit", cwd });
    } catch (error) {
      throw new Error(`命令执行失败: ${error.message}`);
    }
  }

  /**
   * 获取包的 package.json
   * @param {string} packageKey - 包标识符
   * @returns {Object} package.json 内容
   */
  getPackageJson(packageKey) {
    const packageConfig = this.config.packages[packageKey];
    if (!packageConfig) {
      throw new Error(`未找到包配置: ${packageKey}`);
    }
    
    const packagePath = path.join(this.projectRoot, packageConfig.path, "package.json");
    if (!existsSync(packagePath)) {
      throw new Error(`package.json 不存在: ${packagePath}`);
    }
    
    return JSON.parse(readFileSync(packagePath, "utf8"));
  }

  /**
   * 更新包版本号
   * @param {string} packageKey - 包标识符
   * @param {string} version - 新版本号
   */
  updatePackageVersion(packageKey, version) {
    const packageConfig = this.config.packages[packageKey];
    const packagePath = path.join(this.projectRoot, packageConfig.path, "package.json");
    const packageJson = this.getPackageJson(packageKey);
    
    packageJson.version = version;
    writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
    log(`${packageConfig.name} 版本已更新为: ${version}`, "success");
  }

  /**
   * 验证版本号格式
   * @param {string} version - 版本号
   * @returns {boolean} 是否有效
   */
  isValidVersion(version) {
    const semverRegex = /^\d+\.\d+\.\d+$/;
    return semverRegex.test(version);
  }

  /**
   * 计算建议的新版本号
   * @param {string} currentVersion - 当前版本号
   * @returns {string} 建议的新版本号
   */
  suggestNextVersion(currentVersion) {
    const versionParts = currentVersion.split(".");
    if (versionParts.length === 3) {
      const [major, minor, patch] = versionParts;
      return `${major}.${minor}.${parseInt(patch) + 1}`;
    }
    return currentVersion;
  }

  /**
   * 询问版本号
   * @param {string} currentVersion - 当前版本号
   * @param {string} suggestedVersion - 建议版本号
   * @param {string} packageName - 包名称
   * @returns {Promise<string>} 新版本号
   */
  askForVersion(currentVersion, suggestedVersion, packageName) {
    return new Promise((resolve) => {
      this.rl.question(
        `请输入 ${packageName} 的新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `,
        (version) => {
          const newVersion = version || suggestedVersion;

          if (!this.isValidVersion(newVersion)) {
            log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
            this.askForVersion(currentVersion, suggestedVersion, packageName).then(resolve);
            return;
          }

          if (newVersion <= currentVersion) {
            log("新版本号必须大于当前版本！", "error");
            this.askForVersion(currentVersion, suggestedVersion, packageName).then(resolve);
            return;
          }

          log(`${packageName} 版本号验证通过: ${newVersion}`, "success");
          resolve(newVersion);
        }
      );
    });
  }

  /**
   * 构建包
   * @param {string} packageKey - 包标识符
   */
  buildPackage(packageKey) {
    const packageConfig = this.config.packages[packageKey];
    const packageRoot = path.join(this.projectRoot, packageConfig.path);
    const buildDir = path.join(this.buildRoot, packageKey);
    
    log(`开始构建 ${packageConfig.displayName}...`, "build");
    
    // 确保构建目录存在
    if (!existsSync(buildDir)) {
      mkdirSync(buildDir, { recursive: true });
    }
    
    // 清理旧的构建文件
    if (existsSync(buildDir)) {
      rmSync(buildDir, { recursive: true, force: true });
      mkdirSync(buildDir, { recursive: true });
    }
    
    // 执行构建命令
    if (packageConfig.buildCommand) {
      this.exec(packageConfig.buildCommand, packageRoot);
    } else {
      // 默认 TypeScript 构建
      const tsconfigPath = path.resolve(this.projectRoot, "tsconfig.json");
      this.exec(
        `npx tsc --project ${tsconfigPath} --outDir ${buildDir} --declaration --emitDeclarationOnly false`,
        packageRoot
      );
    }
    
    log(`${packageConfig.displayName} 构建完成`, "success");
    return buildDir;
  }

  /**
   * 准备发布文件
   * @param {string} packageKey - 包标识符
   * @param {string} version - 版本号
   * @param {string} buildDir - 构建目录
   */
  preparePublishFiles(packageKey, version, buildDir) {
    const packageConfig = this.config.packages[packageKey];
    const packageRoot = path.join(this.projectRoot, packageConfig.path);
    
    log("准备发布文件...", "copy");
    
    // 创建发布用的 package.json
    const publishPackageJson = {
      name: packageConfig.name,
      version: version,
      description: packageConfig.description,
      main: "index.js",
      module: "index.js",
      types: "index.d.ts",
      exports: {
        ".": {
          "import": "./index.js",
          "require": "./index.js",
          "types": "./index.d.ts"
        }
      },
      files: [
        "*.js",
        "*.d.ts",
        "README.md"
      ],
      keywords: packageConfig.keywords || [],
      author: this.config.author || "Vakao UI Team",
      license: this.config.license || "私有",
      repository: this.config.repository,
      homepage: this.config.homepage,
      peerDependencies: packageConfig.peerDependencies || {},
      publishConfig: {
        access: "public",
        registry: this.privateRegistry
      }
    };
    
    // 写入发布用的 package.json
    const publishPackageJsonPath = path.join(buildDir, "package.json");
    writeFileSync(publishPackageJsonPath, JSON.stringify(publishPackageJson, null, 2) + "\n");
    
    // 复制 README.md
    const readmePath = path.join(packageRoot, "README.md");
    const publishReadmePath = path.join(buildDir, "README.md");
    
    if (existsSync(readmePath)) {
      copyFileSync(readmePath, publishReadmePath);
    } else if (packageConfig.defaultReadme) {
      writeFileSync(publishReadmePath, packageConfig.defaultReadme);
    }
    
    // 复制其他文件
    if (packageConfig.additionalFiles) {
      packageConfig.additionalFiles.forEach(file => {
        const sourcePath = path.join(packageRoot, file);
        const targetPath = path.join(buildDir, file);
        if (existsSync(sourcePath)) {
          copyFileSync(sourcePath, targetPath);
        }
      });
    }
    
    log("发布文件准备完成", "success");
  }

  /**
   * 发布到 npm
   * @param {string} packageKey - 包标识符
   * @param {string} buildDir - 构建目录
   * @param {boolean} isDryRun - 是否为测试模式
   */
  publishToNpm(packageKey, buildDir, isDryRun) {
    const packageConfig = this.config.packages[packageKey];
    const registryInfo = this.usePrivateRegistry 
      ? `私有制品仓库 (${this.privateRegistry})` 
      : "npm 官方仓库";
    
    if (isDryRun) {
      log(`测试模式：跳过实际发布 ${packageConfig.displayName} 到 ${registryInfo}`, "warning");
      log("检查发布文件...", "check");
      this.exec(`npm pack --dry-run --registry ${this.privateRegistry}`, buildDir);
    } else {
      log(`开始发布 ${packageConfig.displayName} 到 ${registryInfo}...`, "publish");
      this.exec(`npm publish --access public --registry ${this.privateRegistry}`, buildDir);
    }
  }

  /**
   * 发布单个包
   * @param {string} packageKey - 包标识符
   * @param {string} version - 版本号
   * @param {boolean} isDryRun - 是否为测试模式
   */
  async publishSinglePackage(packageKey, version, isDryRun) {
    const packageConfig = this.config.packages[packageKey];
    
    try {
      log(`\n${packageConfig.icon} 开始处理 ${packageConfig.displayName}...`, "info");
      
      // 更新版本号
      this.updatePackageVersion(packageKey, version);
      
      // 构建包
      const buildDir = this.buildPackage(packageKey);
      
      // 准备发布文件
      this.preparePublishFiles(packageKey, version, buildDir);
      
      // 发布
      this.publishToNpm(packageKey, buildDir, isDryRun);
      
      log(`${packageConfig.displayName} 处理完成`, "success");
      return { success: true, version };
      
    } catch (error) {
      log(`${packageConfig.displayName} 处理失败: ${error.message}`, "error");
      return { success: false, error: error.message };
    }
  }

  /**
   * 关闭 readline 接口
   */
  close() {
    this.rl.close();
  }
}

module.exports = PublishEngine;