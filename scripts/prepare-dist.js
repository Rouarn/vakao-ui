#!/usr/bin/env node

/**
 * 准备发布脚本
 * 将 packages/dist 目录的内容复制到项目根目录下的 dist 目录中
 */

const fs = require("fs-extra");
const path = require("path");
const { log, separator, showBanner, showSuccess, handleError, colors } = require('./utils');

// 工具标题
const TOOL_TITLE = '📦 Vakao UI 文件准备工具 📦';

// 显示 banner
showBanner(TOOL_TITLE);

// 源目录和目标目录
const sourceDir = path.resolve(__dirname, "../packages/dist");
const targetDir = path.resolve(__dirname, "../dist");

log('开始准备发布文件...', 'info');
separator();

// 检查源目录是否存在
if (!fs.existsSync(sourceDir)) {
  handleError(`源目录不存在 ${sourceDir}`, '请先运行构建命令生成 dist 文件');
}

// 确保目标目录存在并清空
log('清理目标目录...', 'clean');
fs.emptyDirSync(targetDir);
log('目标目录已清理', 'success');

separator();
// 复制文件
log(`正在复制文件从 ${sourceDir} 到 ${targetDir}...`, 'copy');
try {
  fs.copySync(sourceDir, targetDir);
  log('文件复制成功', 'success');
  
  // 显示复制的文件信息
  const files = fs.readdirSync(targetDir);
  log(`共复制了 ${files.length} 个文件/目录:`, 'info');
  files.forEach(file => {
    console.log(`${colors.dim}  - ${file}${colors.reset}`);
  });
  
  showSuccess('文件准备完成！');
} catch (error) {
  handleError('文件复制失败', error.message);
}
