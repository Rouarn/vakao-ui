#!/usr/bin/env node

/**
 * 部署脚本 - 将文档部署到 GitHub Pages
 * 使用方法：node scripts/deploy.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 颜色输出
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
${colors.magenta}${colors.bright}                           🚀 Vakao UI 部署工具 🚀${colors.reset}
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
    command: '🔧',
    deploy: '🚀',
    check: '🔍'
  };
  
  const typeColors = {
    info: colors.blue,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
    command: colors.cyan,
    deploy: colors.magenta,
    check: colors.yellow
  };
  
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${icons[type] || '📝'} ${typeColors[type] || colors.blue}${message}${colors.reset}`);
}

// 分隔线
function separator(char = '─', length = 50) {
  console.log(`${colors.dim}${char.repeat(length)}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    log(`执行命令: ${command}`, 'command');
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
    return result;
  } catch (error) {
    log(`命令执行失败: ${error.message}`, 'error');
    if (options.exitOnError !== false) {
      process.exit(1);
    }
    throw error;
  }
}

function checkGitStatus() {
  try {
    const status = execCommand('git status --porcelain', { silent: true });
    if (status.trim()) {
      log('检测到未提交的更改:', 'warning');
      console.log(status);
      log('请先提交或暂存更改后再部署', 'warning');
      return false;
    }
    log('Git 工作区干净', 'success');
    return true;
  } catch (error) {
    log('无法检查 Git 状态', 'error');
    return false;
  }
}

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    return 'unknown';
  }
}

function deploy() {
  // 显示 banner
  console.log(banner);
  
  log('开始部署 Vakao UI 文档到 GitHub Pages', 'deploy');
  separator();
  
  // 检查当前目录
  const docsDir = path.join(process.cwd(), 'docs');
  const distDir = path.join(docsDir, '.vitepress', 'dist');
  
  if (!fs.existsSync(docsDir)) {
    log('错误: 找不到 docs 目录', 'error');
    process.exit(1);
  }
  
  // 检查 Git 状态
  log('检查 Git 状态...', 'check');
  const isClean = checkGitStatus();
  const currentBranch = getCurrentBranch();
  log(`当前分支: ${currentBranch}`, 'info');
  separator();
  
  // 安装依赖
  log('安装依赖...', 'info');
  execCommand('pnpm install --frozen-lockfile');
  
  separator();
  // 构建文档
  log('构建文档...', 'info');
  execCommand('pnpm run build', { cwd: docsDir });
  
  // 检查构建结果
  if (!fs.existsSync(distDir)) {
    log('错误: 构建失败，找不到 dist 目录', 'error');
    process.exit(1);
  }
  
  log('文档构建成功', 'success');
  
  separator();
  // 部署到 gh-pages
  log('部署到 GitHub Pages...', 'deploy');
  
  // 检查是否安装了 gh-pages
  try {
    execSync('npx gh-pages --version', { stdio: 'pipe' });
  } catch (error) {
    log('安装 gh-pages...', 'warning');
    execCommand('npm install -g gh-pages');
  }
  
  // 部署
  execCommand(`npx gh-pages -d "${distDir}" -m "docs: deploy from ${currentBranch} branch"`);
  
  separator('═');
  log('🎉 部署完成！🎉', 'success');
  log('📖 文档地址: https://rouarn.github.io/vakao-ui/', 'info');
  log('⏰ 请等待几分钟让 GitHub Pages 更新', 'warning');
  separator('═');
}

// 主函数
function main() {
  try {
    deploy();
  } catch (error) {
    log('部署失败:', 'error');
    log(error.message, 'error');
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { deploy };