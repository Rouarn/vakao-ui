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

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, rmSync, readdirSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";
import { log } from "../utils/index.js";

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    this.privateRegistry = this.getRegistryConfig();
    this.usePrivateRegistry = this.privateRegistry !== this.defaultRegistry;

    // 创建 readline 接口
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * 获取 Registry 配置
   *
   * 优先级：
   * 1. NPM_REGISTRY 环境变量
   * 2. npm 全局配置的 registry
   * 3. 默认的 npm 官方仓库
   *
   * @returns {string} Registry URL
   */
  getRegistryConfig() {
    // 1. 优先使用环境变量
    if (process.env.NPM_REGISTRY) {
      log(`使用环境变量 NPM_REGISTRY: ${process.env.NPM_REGISTRY}`, "info");
      return process.env.NPM_REGISTRY;
    }

    // 2. 尝试读取 npm 全局配置
    try {
      const npmRegistry = execSync("npm config get registry", {
        encoding: "utf8",
        stdio: "pipe",
      }).trim();

      if (npmRegistry && npmRegistry !== "undefined" && npmRegistry !== this.defaultRegistry) {
        log(`使用 npm 全局配置的 registry: ${npmRegistry}`, "info");
        return npmRegistry;
      }
    } catch (error) {
      log(`读取 npm 配置失败，使用默认配置: ${error.message}`, "warning");
    }

    // 3. 使用默认配置
    log(`使用默认 npm 官方仓库: ${this.defaultRegistry}`, "info");
    return this.defaultRegistry;
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
    writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
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
   * 比较两个版本号
   * @param {string} version1 - 版本号1
   * @param {string} version2 - 版本号2
   * @returns {number} 1: version1 > version2, 0: 相等, -1: version1 < version2
   */
  compareVersions(version1, version2) {
    const v1Parts = version1.split(".").map(Number);
    const v2Parts = version2.split(".").map(Number);

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;

      if (v1Part > v2Part) return 1;
      if (v1Part < v2Part) return -1;
    }

    return 0;
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
      this.rl.question(`请输入 ${packageName} 的新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `, (version) => {
        const newVersion = version || suggestedVersion;

        if (!this.isValidVersion(newVersion)) {
          log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
          this.askForVersion(currentVersion, suggestedVersion, packageName).then(resolve);
          return;
        }

        if (this.compareVersions(newVersion, currentVersion) <= 0) {
          log("新版本号必须大于当前版本！", "error");
          this.askForVersion(currentVersion, suggestedVersion, packageName).then(resolve);
          return;
        }

        log(`${packageName} 版本号验证通过: ${newVersion}`, "success");
        resolve(newVersion);
      });
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

    // 对于主包，需要特殊处理
    if (packageKey === "main") {
      // 主包需要先执行构建命令，然后复制构建产物
      if (packageConfig.buildCommand) {
        this.exec(packageConfig.buildCommand, packageRoot);
      }

      // 复制主包的构建产物到发布目录
      const mainDistDir = path.join(this.projectRoot, "dist");
      if (existsSync(mainDistDir)) {
        // 复制所有构建产物，但排除子包目录
        const items = readdirSync(mainDistDir);
        items.forEach((item) => {
          const itemPath = path.join(mainDistDir, item);
          const targetPath = path.join(buildDir, item);
          const stat = statSync(itemPath);

          // 跳过子包目录（hooks, utils, main等）
          if (stat.isDirectory() && ["hooks", "utils", "main", "docs"].includes(item)) {
            return;
          }

          if (stat.isDirectory()) {
            this.copyDirectory(itemPath, targetPath);
          } else {
            copyFileSync(itemPath, targetPath);
          }
        });
      }
    } else {
      // 子包的构建逻辑
      if (packageConfig.buildCommand) {
        this.exec(packageConfig.buildCommand, packageRoot);

        // 子包直接使用各自package目录下的dist文件夹作为构建目录
        const subPackageDistDir = path.join(packageRoot, "dist");
        if (existsSync(subPackageDistDir)) {
          return subPackageDistDir;
        }
      } else {
        // 默认 TypeScript 构建
        const tsconfigPath = path.resolve(this.projectRoot, "tsconfig.json");
        this.exec(`npx tsc --project ${tsconfigPath} --outDir ${buildDir} --declaration --emitDeclarationOnly false`, packageRoot);
      }
    }

    log(`${packageConfig.displayName} 构建完成`, "success");
    return buildDir;
  }

  /**
   * 递归复制目录
   * @param {string} src - 源目录
   * @param {string} dest - 目标目录
   */
  copyDirectory(src, dest) {
    if (!existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }

    const items = readdirSync(src);
    items.forEach((item) => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = statSync(srcPath);

      if (stat.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    });
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
    let publishPackageJson;

    if (packageKey === "main") {
      // 主包使用特殊的配置
      publishPackageJson = {
        name: packageConfig.name,
        version,
        description: packageConfig.description,
        main: "vakao-ui.umd.js",
        module: "vakao-ui.es.js",
        types: "types/index.d.ts",
        exports: {
          ".": {
            types: "./types/index.d.ts",
            import: "./vakao-ui.es.js",
            require: "./vakao-ui.umd.js",
          },
          "./style.css": "./style.css",
          "./resolver": {
            types: "./types/resolver.d.ts",
            import: "./vakao-ui.es.js",
            require: "./vakao-ui.umd.js",
          },
        },
        files: ["vakao-ui.umd.js", "vakao-ui.es.js", "vakao-ui.umd.js.map", "vakao-ui.es.js.map", "style.css", "types", "README.md"],
        keywords: packageConfig.keywords || [],
        author: this.config.author || "Vakao UI Team",
        license: this.config.license || "私有",
        repository: this.config.repository,
        homepage: this.config.homepage,
        peerDependencies: packageConfig.peerDependencies || {},
        publishConfig: {
          access: "public",
          registry: this.privateRegistry,
        },
      };
    } else {
      // 子包使用默认配置
      publishPackageJson = {
        name: packageConfig.name,
        version,
        description: packageConfig.description,
        main: "index.js",
        module: "index.js",
        types: "index.d.ts",
        exports: {
          ".": {
            types: "./index.d.ts",
            import: "./index.js",
            require: "./index.js",
          },
        },
        files: ["*.js", "*.d.ts", "README.md"],
        keywords: packageConfig.keywords || [],
        author: this.config.author || "Vakao UI Team",
        license: this.config.license || "私有",
        repository: this.config.repository,
        homepage: this.config.homepage,
        peerDependencies: packageConfig.peerDependencies || {},
        publishConfig: {
          access: "public",
          registry: this.privateRegistry,
        },
      };
    }

    // 写入发布用的 package.json
    const publishPackageJsonPath = path.join(buildDir, "package.json");
    writeFileSync(publishPackageJsonPath, `${JSON.stringify(publishPackageJson, null, 2)}\n`);

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
      packageConfig.additionalFiles.forEach((file) => {
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
    const registryInfo = this.usePrivateRegistry ? `私有制品仓库 (${this.privateRegistry})` : "npm 官方仓库";

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
   * 根据依赖关系对包进行拓扑排序
   * @param {string[]} packageKeys - 要发布的包列表
   * @returns {string[]} 排序后的包列表
   */
  sortPackagesByDependencies(packageKeys) {
    const dependencies = this.config.dependencies || {};
    const visited = new Set();
    const visiting = new Set();
    const result = [];

    const visit = (packageKey) => {
      if (visiting.has(packageKey)) {
        throw new Error(`检测到循环依赖: ${packageKey}`);
      }
      if (visited.has(packageKey)) {
        return;
      }

      visiting.add(packageKey);

      // 先访问依赖的包
      const deps = dependencies[packageKey] || [];
      for (const dep of deps) {
        if (packageKeys.includes(dep)) {
          visit(dep);
        }
      }

      visiting.delete(packageKey);
      visited.add(packageKey);
      result.push(packageKey);
    };

    // 对所有包进行拓扑排序
    for (const packageKey of packageKeys) {
      visit(packageKey);
    }

    log(`包发布顺序: ${result.map((key) => this.config.packages[key].displayName).join(" → ")}`, "info");
    return result;
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

export default PublishEngine;
