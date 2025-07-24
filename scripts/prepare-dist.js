#!/usr/bin/env node

/**
 * 准备发布脚本
 * 将 packages/dist 目录的内容复制到项目根目录下的 dist 目录中
 */

const fs = require("fs-extra");
const path = require("path");

// 颜色和样式
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// ASCII 艺术字
const banner = `
${colors.cyan}${colors.bright}
 _          __  _____  __    __  _   _  __    __  _       ___       _   _  
| |        / / /  _  \\ \\ \\  / / | | | | \\ \\  / / | |     /   |     | | | | 
| |  __   / /  | | | |  \\ \\/ /  | | | |  \\ \\/ /  | |    / /| |     | | | | 
| | /  | / /   | | | |   \\  /   | | | |   }  {   | |   / / | |  _  | | | | 
| |/   |/ /    | |_| |   / /    | |_| |  / /\\ \\  | |  / /  | | | |_| | | | 
|___/|___/     \\_____/  /_/     \\_____/ /_/  \\_\\ |_| /_/   |_| \\_____/ |_|    
${colors.reset}
${colors.magenta}${colors.bright}                         📦 Vakao UI 文件准备工具 📦${colors.reset}
${colors.dim}                        ═══════════════════════════════════${colors.reset}
`;

// 美化日志输出
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const icons = {
    info: '📝',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    copy: '📋',
    clean: '🧹'
  };
  
  const typeColors = {
    info: colors.blue,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
    copy: colors.cyan,
    clean: colors.magenta
  };
  
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${icons[type] || '📝'} ${typeColors[type] || colors.blue}${message}${colors.reset}`);
}

// 分隔线
function separator(char = '─', length = 50) {
  console.log(`${colors.dim}${char.repeat(length)}${colors.reset}`);
}

// 显示 banner
console.log(banner);

// 源目录和目标目录
const sourceDir = path.resolve(__dirname, "../packages/dist");
const targetDir = path.resolve(__dirname, "../dist");

log('开始准备发布文件...', 'info');
separator();

// 检查源目录是否存在
if (!fs.existsSync(sourceDir)) {
  log(`错误: 源目录不存在 ${sourceDir}`, 'error');
  log('请先运行构建命令生成 dist 文件', 'warning');
  process.exit(1);
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
  
  separator('═');
  log('🎉 文件准备完成！🎉', 'success');
  separator('═');
} catch (error) {
  log(`文件复制失败: ${error.message}`, 'error');
  process.exit(1);
}
