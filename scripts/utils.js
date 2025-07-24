/**
 * 脚本工具模块
 * 提供统一的装饰、样式和日志功能
 */

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
const asciiArt = `
${colors.cyan}${colors.bright}
 _          __  _____  __    __  _   _  __    __  _       ___       _   _  
| |        / / /  _  \\ \\ \\  / / | | | | \\ \\  / / | |     /   |     | | | | 
| |  __   / /  | | | |  \\ \\/ /  | | | |  \\ \\/ /  | |    / /| |     | | | | 
| | /  | / /   | | | |   \\  /   | | | |   }  {   | |   / / | |  _  | | | | 
| |/   |/ /    | |_| |   / /    | |_| |  / /\\ \\  | |  / /  | | | |_| | | | 
|___/|___/     \\_____/  /_/     \\_____/ /_/  \\_\\ |_| /_/   |_| \\_____/ |_|    
${colors.reset}`;

// 创建带标题的 banner
function createBanner(title) {
  return `${asciiArt}
${colors.magenta}${colors.bright}                           ${title}${colors.reset}
${colors.dim}                        ═══════════════════════════════════${colors.reset}
`;
}

// 图标配置
const icons = {
  info: '📝',
  success: '✅',
  warning: '⚠️',
  error: '❌',
  command: '🔧',
  build: '🏗️',
  publish: '📦',
  deploy: '🚀',
  check: '🔍',
  copy: '📋',
  clean: '🧹'
};

// 类型颜色配置
const typeColors = {
  info: colors.blue,
  success: colors.green,
  warning: colors.yellow,
  error: colors.red,
  command: colors.cyan,
  build: colors.magenta,
  publish: colors.green,
  deploy: colors.magenta,
  check: colors.yellow,
  copy: colors.cyan,
  clean: colors.magenta
};

// 美化日志输出
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const icon = icons[type] || icons.info;
  const color = typeColors[type] || typeColors.info;
  
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${icon} ${color}${message}${colors.reset}`);
}

// 分隔线
function separator(char = '─', length = 50) {
  console.log(`${colors.dim}${char.repeat(length)}${colors.reset}`);
}

// 显示 banner
function showBanner(title) {
  console.log(createBanner(title));
}

// 成功结束消息
function showSuccess(message) {
  separator('═');
  log(`🎉 ${message} 🎉`, 'success');
  separator('═');
}

// 错误处理
function handleError(message, error) {
  log(`${message}: ${error}`, 'error');
  process.exit(1);
}

module.exports = {
  colors,
  log,
  separator,
  showBanner,
  showSuccess,
  handleError,
  icons,
  typeColors
};