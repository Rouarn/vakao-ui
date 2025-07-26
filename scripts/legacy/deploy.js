#!/usr/bin/env node

/**
 * 部署脚本 - 将文档部署到 GitHub Pages
 *
 * 注意：此脚本已迁移到统一发布系统中。
 * 推荐使用：node scripts/publish.js --deploy-only
 *
 * 使用方法：
 * - node scripts/deploy.js (兼容模式)
 * - node scripts/publish.js --deploy-only --deploy-strategy docs
 * - node scripts/publish.js --deploy-only --deploy-strategy github-pages
 */

const path = require("path");
const { log, showBanner, showSuccess, handleError } = require("../utils/");

// 工具标题
const TOOL_TITLE = "🚀 Vakao UI 部署工具 🚀 (兼容模式)";

/**
 * 兼容性部署函数
 * 调用新的统一发布系统
 */
async function deploy() {
  // 显示 banner
  showBanner(TOOL_TITLE);

  log("检测到使用传统部署脚本", "warning");
  log("正在重定向到统一发布系统...", "info");

  try {
    // 动态导入统一发布系统
    const { spawn } = require("child_process");

    // 调用统一发布系统的部署功能
    const args = [
      "scripts/publish.js",
      "--deploy-only",
      "--deploy-strategy",
      "docs",
    ];

    log("执行命令: node " + args.join(" "), "command");

    const child = spawn("node", args, {
      stdio: "inherit",
      cwd: path.resolve(__dirname, "..", ".."),
    });

    child.on("close", code => {
      if (code === 0) {
        showSuccess("部署完成！");
        log("📖 文档地址: https://rouarn.github.io/vakao-ui/", "info");
        log("⏰ 请等待几分钟让 GitHub Pages 更新", "warning");
        log(
          "\n💡 提示: 下次可以直接使用 'node scripts/publish.js --deploy-only'",
          "info"
        );
      } else {
        process.exit(code);
      }
    });

    child.on("error", error => {
      handleError("调用统一发布系统失败", error.message);
    });
  } catch (error) {
    handleError("部署失败", error.message);
  }
}

// 主函数
function main() {
  try {
    deploy();
  } catch (error) {
    handleError("部署失败", error.message);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { deploy };
