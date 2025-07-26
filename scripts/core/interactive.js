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
const { log } = require("../utils");

/**
 * 交互式界面类
 */
class Interactive {
  constructor(packages) {
    this.packages = packages;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /**
   * 询问要发布的包
   * @returns {Promise<string[]>} 选择的包列表
   */
  askForPackages() {
    return new Promise(resolve => {
      console.log("\n可用的包:");
      Object.entries(this.packages).forEach(([key, pkg], index) => {
        console.log(
          `  ${index + 1}. ${pkg.icon} ${pkg.displayName} (${pkg.name})`
        );
      });
      console.log(`  ${Object.keys(this.packages).length + 1}. 🚀 全部发布`);

      this.rl.question("\n请选择要发布的包 (输入数字，多个用逗号分隔): ", answer => {
        const choices = answer.split(",").map(s => s.trim());
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
      });
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
  async askForVersions(packageKeys, syncVersion, getPackageJson, suggestNextVersion) {
    const versions = {};

    if (syncVersion && packageKeys.length > 1) {
      // 同步版本模式
      const firstPackage = packageKeys[0];
      const currentVersion = getPackageJson(firstPackage).version;
      const suggestedVersion = suggestNextVersion(currentVersion);

      log(`\n同步版本模式：所有包将使用相同版本号`, "info");
      log(`当前版本: ${currentVersion}`, "info");

      const version = await this.askForSingleVersion(
        currentVersion,
        suggestedVersion,
        "统一版本号"
      );

      packageKeys.forEach(key => {
        versions[key] = version;
      });
    } else {
      // 独立版本模式
      for (const packageKey of packageKeys) {
        const currentVersion = getPackageJson(packageKey).version;
        const suggestedVersion = suggestNextVersion(currentVersion);

        log(
          `\n${this.packages[packageKey].icon} ${this.packages[packageKey].displayName}`,
          "info"
        );
        log(`当前版本: ${currentVersion}`, "info");

        const version = await this.askForSingleVersion(
          currentVersion,
          suggestedVersion,
          this.packages[packageKey].displayName
        );

        versions[packageKey] = version;
      }
    }

    return versions;
  }

  /**
   * 询问单个版本号
   * @param {string} currentVersion - 当前版本号
   * @param {string} suggestedVersion - 建议版本号
   * @param {string} packageName - 包名称
   * @returns {Promise<string>} 新版本号
   */
  askForSingleVersion(currentVersion, suggestedVersion, packageName) {
    return new Promise(resolve => {
      this.rl.question(
        `请输入 ${packageName} 的新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `,
        version => {
          const newVersion = version || suggestedVersion;

          // 验证版本号格式
          const semverRegex = /^\d+\.\d+\.\d+$/;
          if (!semverRegex.test(newVersion)) {
            log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
            this.askForSingleVersion(
              currentVersion,
              suggestedVersion,
              packageName
            ).then(resolve);
            return;
          }

          // 检查版本号是否比当前版本新
          if (newVersion <= currentVersion) {
            log("新版本号必须大于当前版本！", "error");
            this.askForSingleVersion(
              currentVersion,
              suggestedVersion,
              packageName
            ).then(resolve);
            return;
          }

          log(`${packageName} 版本号验证通过: ${newVersion}`, "success");
          resolve(newVersion);
        }
      );
    });
  }

  /**
   * 询问确认
   * @param {string} message - 确认消息
   * @returns {Promise<boolean>} 是否确认
   */
  askForConfirmation(message) {
    return new Promise(resolve => {
      this.rl.question(`${message} (y/N): `, answer => {
        resolve(
          answer.toLowerCase() === "y" || answer.toLowerCase() === "yes"
        );
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
    packageKeys.forEach(key => {
      log(
        `  ${this.packages[key].icon} ${this.packages[key].displayName}: v${versions[key]}`,
        "info"
      );
    });
  }

  /**
   * 显示发布结果
   * @param {Array} results - 发布结果列表
   * @param {boolean} isDryRun - 是否为测试模式
   */
  showPublishResults(results, isDryRun) {
    log("发布结果汇总:", "info");
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    results.forEach(result => {
      const pkg = this.packages[result.package];
      if (result.success) {
        log(
          `  ✅ ${pkg.icon} ${pkg.displayName} v${result.version} - 成功`,
          "success"
        );
      } else {
        log(
          `  ❌ ${pkg.icon} ${pkg.displayName} - 失败: ${result.error}`,
          "error"
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