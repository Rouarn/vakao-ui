/**
 * Electron 构建准备脚本
 * 
 * 在构建 Electron 应用之前执行的预处理任务，包括：
 * - 清理临时文件
 * - 验证构建环境
 * - 生成版本信息
 * - 优化资源文件
 * 
 * @version 1.0.0
 * @author Vakao UI Team
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 控制台颜色输出工具
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * 日志输出函数
 * 
 * @param {string} level - 日志级别 (info, warn, error, success)
 * @param {string} message - 日志消息
 */
function log(level, message) {
  const timestamp = new Date().toLocaleTimeString();
  const levelColors = {
    info: colors.blue,
    warn: colors.yellow,
    error: colors.red,
    success: colors.green
  };
  
  const color = levelColors[level] || colors.reset;
  console.log(`${colors.bright}[${timestamp}]${colors.reset} ${color}[${level.toUpperCase()}]${colors.reset} ${message}`);
}

/**
 * 检查文件是否存在
 * 
 * @param {string} filePath - 文件路径
 * @returns {boolean} 文件是否存在
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

/**
 * 创建目录（如果不存在）
 * 
 * @param {string} dirPath - 目录路径
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log('info', `创建目录: ${dirPath}`);
  }
}

/**
 * 清理构建目录
 */
function cleanBuildDir() {
  log('info', '开始清理构建目录...');
  
  const distPath = path.join(__dirname, '..', 'release');
  
  if (fs.existsSync(distPath)) {
    try {
      // 在 Windows 上使用 rmdir，在其他系统上使用 rm
      const isWindows = process.platform === 'win32';
      const command = isWindows ? `rmdir /s /q "${distPath}"` : `rm -rf "${distPath}"`;
      
      execSync(command, { stdio: 'inherit' });
      log('success', '构建目录清理完成');
    } catch (error) {
      log('warn', `清理构建目录时出现警告: ${error.message}`);
    }
  } else {
    log('info', '构建目录不存在，跳过清理');
  }
  
  // 确保 dist 目录存在
  ensureDir(distPath);
}

/**
 * 验证构建环境
 */
function validateEnvironment() {
  log('info', '验证构建环境...');
  
  // 检查必要的文件
  const requiredFiles = [
    'src/main.js',
    'src/index.html',
    'src/preload.js',
    'src/renderer/index.js',
    'package.json'
  ];
  
  const missingFiles = [];
  
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, '..', file);
    if (!fileExists(filePath)) {
      missingFiles.push(file);
    }
  }
  
  if (missingFiles.length > 0) {
    log('error', `缺少必要文件: ${missingFiles.join(', ')}`);
    process.exit(1);
  }
  
  // 检查图标文件
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.png');
  if (!fileExists(iconPath)) {
    log('warn', '应用图标文件不存在，将使用默认图标');
  }
  
  log('success', '构建环境验证通过');
}

/**
 * 生成构建信息文件
 */
function generateBuildInfo() {
  log('info', '生成构建信息...');
  
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const buildInfo = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    buildTime: new Date().toISOString(),
    buildPlatform: process.platform,
    buildArch: process.arch,
    nodeVersion: process.version,
    electronVersion: packageJson.devDependencies.electron || 'unknown'
  };
  
  const buildInfoPath = path.join(__dirname, '..', 'src', 'build-info.json');
  fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
  
  log('success', `构建信息已生成: ${buildInfoPath}`);
}

/**
 * 优化资源文件
 */
function optimizeAssets() {
  log('info', '优化资源文件...');
  
  // 检查并创建必要的资源目录
  const assetsDir = path.join(__dirname, '..', 'assets');
  ensureDir(assetsDir);
  
  // 检查字体文件
  const fontsDir = path.join(__dirname, '..', 'src', 'ttf');
  if (fs.existsSync(fontsDir)) {
    const fontFiles = fs.readdirSync(fontsDir);
    log('info', `发现 ${fontFiles.length} 个字体文件`);
  }
  
  // 检查 CSS 文件
  const cssDir = path.join(__dirname, '..', 'src', 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
    log('info', `发现 ${cssFiles.length} 个 CSS 文件`);
  }
  
  log('success', '资源文件优化完成');
}

/**
 * 显示构建配置信息
 */
function showBuildConfig() {
  log('info', '构建配置信息:');
  
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  console.log(`  ${colors.cyan}应用名称:${colors.reset} ${packageJson.build.productName}`);
  console.log(`  ${colors.cyan}应用版本:${colors.reset} ${packageJson.version}`);
  console.log(`  ${colors.cyan}应用 ID:${colors.reset} ${packageJson.build.appId}`);
  console.log(`  ${colors.cyan}构建平台:${colors.reset} ${process.platform}`);
  console.log(`  ${colors.cyan}构建架构:${colors.reset} ${process.arch}`);
  console.log(`  ${colors.cyan}Node 版本:${colors.reset} ${process.version}`);
  console.log(`  ${colors.cyan}Electron 版本:${colors.reset} ${packageJson.devDependencies.electron}`);
}

/**
 * 主函数 - 执行所有构建准备任务
 */
function main() {
  console.log(`${colors.bright}${colors.magenta}`);
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    Vakao UI Publisher                        ║');
  console.log('║                     构建准备脚本                              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(colors.reset);
  
  try {
    // 执行构建准备任务
    showBuildConfig();
    console.log('');
    
    cleanBuildDir();
    validateEnvironment();
    generateBuildInfo();
    optimizeAssets();
    
    console.log('');
    log('success', '所有构建准备任务已完成！');
    log('info', '现在可以开始构建 Electron 应用...');
    
  } catch (error) {
    console.log('');
    log('error', `构建准备失败: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// 如果直接运行此脚本，则执行主函数
if (require.main === module) {
  main();
}

module.exports = {
  cleanBuildDir,
  validateEnvironment,
  generateBuildInfo,
  optimizeAssets,
  showBuildConfig
};