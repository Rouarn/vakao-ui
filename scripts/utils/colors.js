/**
 * 颜色和样式配置模块
 * 
 * 提供终端输出的颜色和样式常量，支持彩色文本输出。
 * 使用 ANSI 转义序列实现终端颜色控制。
 * 
 * 主要特性：
 * - 基础颜色：红、绿、黄、蓝、品红、青、白
 * - 样式控制：重置、加粗、暗淡
 * - 跨平台兼容：支持大多数现代终端
 * 
 * @example
 * ```javascript
 * const { colors } = require('./colors');
 * 
 * // 输出红色文本
 * console.log(`${colors.red}错误信息${colors.reset}`);
 * 
 * // 输出加粗绿色文本
 * console.log(`${colors.green}${colors.bright}成功${colors.reset}`);
 * ```
 * 
 * @version 1.0.0
 * @author Vakao UI Team
 */

/**
 * ANSI 颜色和样式代码配置
 * 
 * 包含终端文本颜色和样式的 ANSI 转义序列。
 * 这些代码可以组合使用来创建丰富的终端输出效果。
 */
const colors = {
  /** 重置所有样式和颜色 */
  reset: "\x1b[0m",
  
  /** 加粗/高亮文本 */
  bright: "\x1b[1m",
  
  /** 暗淡文本（降低亮度） */
  dim: "\x1b[2m",
  
  /** 红色文本 - 通常用于错误信息 */
  red: "\x1b[31m",
  
  /** 绿色文本 - 通常用于成功信息 */
  green: "\x1b[32m",
  
  /** 黄色文本 - 通常用于警告信息 */
  yellow: "\x1b[33m",
  
  /** 蓝色文本 - 通常用于信息提示 */
  blue: "\x1b[34m",
  
  /** 品红色文本 - 通常用于特殊标记 */
  magenta: "\x1b[35m",
  
  /** 青色文本 - 通常用于命令或链接 */
  cyan: "\x1b[36m",
  
  /** 白色文本 */
  white: "\x1b[37m",
};

/**
 * 日志类型对应的颜色映射
 * 
 * 为不同类型的日志消息定义标准颜色，确保输出的一致性。
 * 遵循通用的颜色语义约定。
 */
const typeColors = {
  /** 信息类型 - 蓝色 */
  info: colors.blue,
  
  /** 成功类型 - 绿色 */
  success: colors.green,
  
  /** 警告类型 - 黄色 */
  warning: colors.yellow,
  
  /** 错误类型 - 红色 */
  error: colors.red,
  
  /** 命令类型 - 青色 */
  command: colors.cyan,
  
  /** 构建类型 - 品红色 */
  build: colors.magenta,
  
  /** 发布类型 - 绿色 */
  publish: colors.green,
  
  /** 部署类型 - 品红色 */
  deploy: colors.magenta,
  
  /** 检查类型 - 黄色 */
  check: colors.yellow,
  
  /** 复制类型 - 青色 */
  copy: colors.cyan,
  
  /** 清理类型 - 品红色 */
  clean: colors.magenta,
};

module.exports = {
  colors,
  typeColors,
};