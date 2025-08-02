/**
 * 日志记录模块
 *
 * 提供美化的日志输出功能，支持不同类型的日志消息和格式化输出。
 * 集成图标、颜色和时间戳，提供一致的日志体验。
 *
 * 主要特性：
 * - 类型化日志：支持多种日志类型（info、success、warning、error 等）
 * - 时间戳：自动添加时间戳信息
 * - 图标支持：为不同类型添加对应图标
 * - 颜色编码：使用颜色区分不同类型的消息
 * - 换行控制：智能处理消息中的换行符
 *
 * @example
 * ```javascript
 * const { log } = require('./logger');
 *
 * // 基础日志输出
 * log('这是一条信息', 'info');
 * log('操作成功', 'success');
 * log('警告信息', 'warning');
 * log('错误信息', 'error');
 *
 * // 构建相关日志
 * log('开始构建项目', 'build');
 * log('正在部署应用', 'deploy');
 * log('发布包到 npm', 'publish');
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

import { colors, typeColors } from "./colors.js";
import { icons } from "./icons.js";

/**
 * 美化日志输出
 *
 * 输出格式化的日志消息，包含时间戳、图标、颜色和消息内容。
 * 支持智能换行处理，保持输出格式的整洁性。
 *
 * 输出格式：[时间戳] 图标 消息内容
 *
 * @param {string} message - 要输出的日志消息
 * @param {string} [type='info'] - 日志类型，决定图标和颜色
 *   可选值：'info', 'success', 'warning', 'error', 'command', 'build',
 *          'publish', 'deploy', 'check', 'copy', 'clean'
 *
 * @example
 * ```javascript
 * // 基础用法
 * log('应用启动成功', 'success');
 * // 输出：[14:30:25] ✅ 应用启动成功
 *
 * // 带换行符的消息
 * log('\n开始执行任务\n', 'info');
 * // 会在消息前后添加空行
 *
 * // 错误日志
 * log('文件不存在', 'error');
 * // 输出：[14:30:25] ❌ 文件不存在
 *
 * // 构建日志
 * log('正在编译 TypeScript 文件', 'build');
 * // 输出：[14:30:25] 🏗️ 正在编译 TypeScript 文件
 * ```
 */
function log(message, type = "info") {
  // 获取当前时间戳
  const timestamp = new Date().toLocaleTimeString();

  // 获取对应类型的图标和颜色
  const icon = icons[type] || icons.info;
  const color = typeColors[type] || typeColors.info;

  // 检查消息开头是否有换行符
  const startsWithNewline = message.startsWith("\n");
  // 检查消息结尾是否有换行符
  const endsWithNewline = message.endsWith("\n");

  // 移除消息中的换行符，由我们来控制换行
  const cleanMessage = message.replace(/^\n+|\n+$/g, "");

  // 如果开头有换行符，先打印换行
  if (startsWithNewline) {
    console.log("");
  }

  // 打印主要内容
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${icon} ${color}${cleanMessage}${colors.reset}`);

  // 如果结尾有换行符，后打印换行
  if (endsWithNewline) {
    console.log("");
  }
}

export { log };
