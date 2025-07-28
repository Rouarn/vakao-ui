/**
 * Vakao UI 交互式界面模块
 *
 * 提供用户交互功能：
 * - 包选择
 * - 版本输入
 * - 确认操作
 *
 * @version 2.0.0
 * @author Vakao UI Team
 */

const readline = require("readline");
const { CONFIG } = require("./package-configs");
const { log } = require("../utils");
// inquirer will be imported dynamically when needed

/**
 * 交互式界面类
 */
class Interactive {
  constructor(packages) {
    this.packages = packages;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false, // 禁用终端模式，避免输入重复问题
      crlfDelay: Infinity, // 处理 Windows 换行符
    });
    
    // 检测是否在GUI环境中运行
    this.isGUIMode = this.detectGUIMode();
  }
  
  /**
   * 检测是否在GUI环境中运行
   * @returns {boolean} 是否为GUI模式
   */
  detectGUIMode() {
    // 检查是否从GUI启动（通过环境变量或进程参数）
    try {
      // 检查环境变量
      if (process.env.VAKAO_GUI_MODE === 'true') {
        return true;
      }
      
      // 检查是否在Electron环境中
      if (typeof process !== 'undefined' && 
          process.versions && 
          process.versions.electron) {
        return true;
      }
      
      // 检查父进程是否为Electron
      if (process.env.ELECTRON_RUN_AS_NODE) {
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * 询问要发布的包
   * @returns {Promise<string[]>} 选择的包列表
   */
  askForPackages() {
    return new Promise((resolve) => {
      log("\n可用的包:", "info");
      Object.entries(this.packages).forEach(([_key, pkg], index) => {
        log(
          `  ${index + 1}. ${pkg.icon} ${pkg.displayName} (${pkg.name})`,
          "info",
        );
      });
      log(`  ${Object.keys(this.packages).length + 1}. 🚀 全部发布`, "info");

      this.rl.question(
        "\n请选择要发布的包 (输入数字，多个用逗号分隔): ",
        (answer) => {
          const choices = answer.split(",").map((s) => s.trim());
          const packageKeys = [];

          for (const choice of choices) {
            const index = parseInt(choice) - 1;
            const packageEntries = Object.entries(this.packages);

            if (index >= 0 && index < packageEntries.length) {
              packageKeys.push(packageEntries[index][0]);
            } else if (parseInt(choice) === packageEntries.length + 1) {
              // 选择全部
              packageKeys.push(...Object.keys(this.packages));
              break;
            }
          }

          if (packageKeys.length === 0) {
            log("无效选择，请重新选择", "error");
            this.askForPackages().then(resolve);
            return;
          }

          // 去重
          const uniquePackages = [...new Set(packageKeys)];
          resolve(uniquePackages);
        },
      );
    });
  }

  /**
   * 询问版本号
   * @param {string[]} packageKeys - 包列表
   * @param {boolean} syncVersion - 是否同步版本号
   * @param {Function} getPackageJson - 获取包信息的函数
   * @param {Function} suggestNextVersion - 建议版本号的函数
   * @returns {Promise<Object>} 版本号映射
   */
  async askForVersions(
    packageKeys,
    syncVersion,
    getPackageJson,
    suggestNextVersion,
  ) {
    const versions = {};

    if (syncVersion && packageKeys.length > 1) {
      // 同步版本模式
      const firstPackage = packageKeys[0];
      const currentVersion = getPackageJson(firstPackage).version;
      const suggestedVersion = suggestNextVersion(currentVersion);

      log("\n同步版本模式：所有包将使用相同版本号", "info");
      log(`当前版本: ${currentVersion}`, "info");

      const version = await this.askForSingleVersion(
        currentVersion,
        suggestedVersion,
        "统一版本号",
      );

      packageKeys.forEach((key) => {
        versions[key] = version;
      });
    } else {
      // 独立版本模式
      for (const packageKey of packageKeys) {
        const currentVersion = getPackageJson(packageKey).version;
        const suggestedVersion = suggestNextVersion(currentVersion);

        log(
          `\n${this.packages[packageKey].icon} ${this.packages[packageKey].displayName}`,
          "info",
        );
        log(`当前版本: ${currentVersion}`, "info");

        const version = await this.askForSingleVersion(
          currentVersion,
          suggestedVersion,
          this.packages[packageKey].displayName,
        );

        versions[packageKey] = version;
      }
    }

    return versions;
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
   * 询问单个版本号
   * @param {string} currentVersion - 当前版本号
   * @param {string} suggestedVersion - 建议版本号
   * @param {string} packageName - 包名称
   * @returns {Promise<string>} 新版本号
   */
  askForSingleVersion(currentVersion, suggestedVersion, packageName) {
    if (this.isGUIMode) {
      return this.askForSingleVersionGUI(currentVersion, suggestedVersion, packageName);
    } else {
      return this.askForSingleVersionCLI(currentVersion, suggestedVersion, packageName);
    }
  }
  
  /**
   * GUI模式下询问单个版本号
   * @param {string} currentVersion - 当前版本号
   * @param {string} suggestedVersion - 建议版本号
   * @param {string} packageName - 包名称
   * @returns {Promise<string>} 新版本号
   */
  async askForSingleVersionGUI(currentVersion, suggestedVersion, packageName) {
    try {
      // 通过进程间通信请求用户输入
      const inputRequest = {
        title: '版本号输入',
        message: `请输入 ${packageName} 的新版本号`,
        type: 'text',
        defaultValue: suggestedVersion,
        required: false,
        validation: {
          pattern: '^\\d+\\.\\d+\\.\\d+$',
          patternMessage: '版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）'
        },
        helpText: `当前版本: ${currentVersion}，建议版本: ${suggestedVersion}，留空使用建议版本`
      };
      
      // 发送输入请求到主进程
      const result = await this.requestGUIInput(inputRequest);
      
      if (result.cancelled) {
        throw new Error('用户取消了版本号输入');
      }
      
      const newVersion = result.value || suggestedVersion;
      
      // 验证版本号格式
      const semverRegex = /^\d+\.\d+\.\d+$/;
      if (!semverRegex.test(newVersion)) {
        log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
        return this.askForSingleVersionGUI(currentVersion, suggestedVersion, packageName);
      }
      
      // 检查版本号是否比当前版本新
      if (this.compareVersions(newVersion, currentVersion) <= 0) {
        log("新版本号必须大于当前版本！", "error");
        return this.askForSingleVersionGUI(currentVersion, suggestedVersion, packageName);
      }
      
      log(`${packageName} 版本号验证通过: ${newVersion}`, "success");
      return newVersion;
      
    } catch (error) {
      log(`GUI输入失败，回退到命令行模式: ${error.message}`, "warning");
      return this.askForSingleVersionCLI(currentVersion, suggestedVersion, packageName);
    }
  }
  
  /**
   * 通过进程间通信请求GUI输入
   * @param {Object} inputRequest - 输入请求对象
   * @returns {Promise<Object>} 输入结果
   */
  requestGUIInput(inputRequest) {
    return new Promise((resolve, reject) => {
      try {
        // 生成唯一的请求ID
        const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        
        // 创建请求对象
        const request = {
          id: requestId,
          type: 'user-input-request',
          data: inputRequest
        };
        
        // 监听响应
        const responseHandler = (data) => {
          try {
            const response = JSON.parse(data.toString());
            if (response.id === requestId && response.type === 'user-input-response') {
              process.stdin.removeListener('data', responseHandler);
              resolve(response.data);
            }
          } catch (error) {
            // 忽略解析错误，可能是其他数据
          }
        };
        
        // 设置超时
        const timeout = setTimeout(() => {
          process.stdin.removeListener('data', responseHandler);
          reject(new Error('GUI输入请求超时'));
        }, 30000);
        
        // 监听标准输入
        process.stdin.on('data', responseHandler);
        
        // 发送请求到标准输出（主进程会捕获）
        process.stdout.write('\n__VAKAO_GUI_REQUEST__' + JSON.stringify(request) + '__VAKAO_GUI_REQUEST_END__\n');
        
        // 清理超时
        const originalResolve = resolve;
        resolve = (result) => {
          clearTimeout(timeout);
          originalResolve(result);
        };
        
      } catch (error) {
        reject(error);
      }
    });
  }
  
  /**
   * 命令行模式下询问单个版本号
   * @param {string} currentVersion - 当前版本号
   * @param {string} suggestedVersion - 建议版本号
   * @param {string} packageName - 包名称
   * @returns {Promise<string>} 新版本号
   */
  askForSingleVersionCLI(currentVersion, suggestedVersion, packageName) {
    return new Promise((resolve) => {
      this.rl.question(
        `请输入 ${packageName} 的新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `,
        (version) => {
          const newVersion = version || suggestedVersion;

          // 验证版本号格式
          const semverRegex = /^\d+\.\d+\.\d+$/;
          if (!semverRegex.test(newVersion)) {
            log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
            this.askForSingleVersionCLI(
              currentVersion,
              suggestedVersion,
              packageName,
            ).then(resolve);
            return;
          }

          // 检查版本号是否比当前版本新
          if (this.compareVersions(newVersion, currentVersion) <= 0) {
            log("新版本号必须大于当前版本！", "error");
            this.askForSingleVersionCLI(
              currentVersion,
              suggestedVersion,
              packageName,
            ).then(resolve);
            return;
          }

          log(`${packageName} 版本号验证通过: ${newVersion}`, "success");
          resolve(newVersion);
        },
      );
    });
  }

  /**
   * 根据选择的包获取支持的部署策略
   * @param {string[]} packageKeys - 选择的包列表
   * @returns {string[]} 支持的部署策略列表
   */
  getSupportedDeployStrategies(packageKeys) {
    // 如果选择了文档包，只返回文档相关的部署策略
    if (packageKeys.includes("docs")) {
      return (
        this.packages.docs.supportedDeployStrategies || ["docs", "github-pages"]
      );
    }

    // 如果选择了主包，支持所有部署策略
    if (packageKeys.includes("main")) {
      return ["docs", "github-pages", "static"];
    }

    // 其他包（hooks, utils）主要支持文档部署
    return ["docs", "github-pages"];
  }

  /**
   * 询问部署选项
   * @param {string[]} packageKeys - 选择的包列表（可选，用于智能过滤部署策略）
   * @returns {Promise<Object>} 部署配置
   */
  askForDeployment(packageKeys = []) {
    return new Promise((resolve) => {
      const supportedStrategies =
        this.getSupportedDeployStrategies(packageKeys);
      const isDocsOnly = packageKeys.length === 1 && packageKeys[0] === "docs";

      log("\n部署选项:", "info");

      // 根据选择的包显示不同的选项
      if (isDocsOnly) {
        log("  1. 📚 仅构建文档，不部署", "info");
        log("  2. 🌐 构建并部署文档到 GitHub Pages", "info");
        log("  3. 📋 仅部署文档站点（跳过构建）", "info");

        this.rl.question("请选择部署选项 (输入数字，默认为 2): ", (answer) => {
          const choice = parseInt(answer) || 2;

          switch (choice) {
            case 1:
              resolve({
                deploy: false,
                deployOnly: false,
                deployStrategy: null,
              });
              break;
            case 2:
              resolve({
                deploy: true,
                deployOnly: false,
                deployStrategy: "docs",
              });
              break;
            case 3:
              resolve({
                deploy: false,
                deployOnly: true,
                deployStrategy: "docs",
              });
              break;
            default:
              log("无效选择，使用默认选项（构建并部署文档）", "warning");
              resolve({
                deploy: true,
                deployOnly: false,
                deployStrategy: "docs",
              });
              break;
          }
        });
      } else {
        // 通用选项
        log("  1. 📚 仅发布包，不部署", "info");

        if (supportedStrategies.includes("docs")) {
          log("  2. 🌐 发布包并部署文档站点", "info");
        }

        if (supportedStrategies.includes("github-pages")) {
          log("  3. 📦 发布包并部署到 GitHub Pages", "info");
        }

        if (supportedStrategies.length > 1) {
          log("  4. 🚀 发布包并执行完整部署", "info");
        }

        log("  5. 📋 仅部署（跳过发布）", "info");

        this.rl.question("请选择部署选项 (输入数字，默认为 1): ", (answer) => {
          const choice = parseInt(answer) || 1;

          switch (choice) {
            case 1:
              resolve({
                deploy: false,
                deployOnly: false,
                deployStrategy: null,
              });
              break;
            case 2:
              if (supportedStrategies.includes("docs")) {
                resolve({
                  deploy: true,
                  deployOnly: false,
                  deployStrategy: "docs",
                });
              } else {
                log("该选项不可用，使用默认选项", "warning");
                resolve({
                  deploy: false,
                  deployOnly: false,
                  deployStrategy: null,
                });
              }
              break;
            case 3:
              if (supportedStrategies.includes("github-pages")) {
                resolve({
                  deploy: true,
                  deployOnly: false,
                  deployStrategy: "github-pages",
                });
              } else {
                log("该选项不可用，使用默认选项", "warning");
                resolve({
                  deploy: false,
                  deployOnly: false,
                  deployStrategy: null,
                });
              }
              break;
            case 4:
              if (supportedStrategies.length > 1) {
                resolve({
                  deploy: true,
                  deployOnly: false,
                  deployStrategy: null,
                });
              } else {
                log("该选项不可用，使用默认选项", "warning");
                resolve({
                  deploy: false,
                  deployOnly: false,
                  deployStrategy: null,
                });
              }
              break;
            case 5:
              // 智能选择部署策略
              const defaultStrategy = supportedStrategies.includes("docs")
                ? "docs"
                : supportedStrategies[0];
              resolve({
                deploy: false,
                deployOnly: true,
                deployStrategy: defaultStrategy,
              });
              break;
            default:
              log("无效选择，使用默认选项（仅发布包）", "warning");
              resolve({
                deploy: false,
                deployOnly: false,
                deployStrategy: null,
              });
              break;
          }
        });
      }
    });
  }

  /**
   * 询问确认
   * @param {string} message - 确认消息
   * @returns {Promise<boolean>} 是否确认
   */
  askForConfirmation(message) {
    return new Promise((resolve) => {
      this.rl.question(`${message} (y/N): `, (answer) => {
        resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
      });
    });
  }

  /**
   * 显示发布计划
   * @param {string[]} packageKeys - 包列表
   * @param {Object} versions - 版本映射
   */
  showPublishPlan(packageKeys, versions) {
    log("发布计划:", "info");
    packageKeys.forEach((key) => {
      log(
        `  ${this.packages[key].icon} ${this.packages[key].displayName}: v${versions[key]}`,
        "info",
      );
    });
  }

  /**
   * 显示发布结果
   * @param {Array} results - 发布结果列表
   * @param {boolean} isDryRun - 是否为测试模式
   */
  showPublishResults(results, _isDryRun) {
    log("发布结果汇总:", "info");
    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    results.forEach((result) => {
      const pkg = this.packages[result.package];
      if (result.success) {
        log(
          `  ✅ ${pkg.icon} ${pkg.displayName} v${result.version} - 成功`,
          "success",
        );
      } else {
        log(
          `  ❌ ${pkg.icon} ${pkg.displayName} - 失败: ${result.error}`,
          "error",
        );
      }
    });

    return { successCount, failCount };
  }

  /**
   * 关闭交互界面
   */
  close() {
    this.rl.close();
  }
}

module.exports = Interactive;
