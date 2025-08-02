/**
 * 脚本工具模块统一导出
 *
 * 提供统一的装饰、样式和日志功能，是脚本系统的核心工具库。
 * 整合了颜色配置、图标管理、横幅显示、日志记录和通用工具函数。
 *
 * 模块结构：
 * - colors.js: 颜色和样式配置
 * - icons.js: 图标配置
 * - banner.js: 横幅显示功能
 * - logger.js: 日志记录功能
 * - utils.js: 通用工具函数
 *
 * 主要特性：
 * - 🎨 丰富的颜色支持：支持多种终端颜色和样式
 * - 📝 类型化日志：不同类型的日志消息和图标
 * - 🎯 美化输出：ASCII 艺术字横幅和格式化输出
 * - 🛠️ 实用工具：分隔线、成功提示、错误处理
 * - 📦 模块化设计：功能分离，易于维护和扩展
 *
 * @example
 * ```javascript
 * const {
 *   log,
 *   showBanner,
 *   showSuccess,
 *   separator,
 *   colors,
 *   icons
 * } = require('./utils');
 *
 * // 显示项目横幅
 * showBanner('Vakao UI 构建工具');
 *
 * // 输出不同类型的日志
 * log('开始构建项目', 'build');
 * log('构建成功完成', 'success');
 *
 * // 显示分隔线
 * separator();
 *
 * // 显示成功消息
 * showSuccess('所有任务完成');
 *
 * // 自定义颜色输出
 * console.log(`${colors.green}成功${colors.reset}`);
 * ```
 *
 * @version 2.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** 颜色和样式配置 */
import { colors, typeColors } from "./colors.js";

/** 图标配置 */
import { icons } from "./icons.js";

/** 横幅显示功能 */
import { asciiArt, createBanner, showBanner } from "./banner.js";

/** 日志记录功能 */
import { log } from "./logger.js";

/** 通用工具函数 */
import { separator, showSuccess, handleError } from "./utils.js";

// ==================== 统一导出 ====================

/**
 * 导出所有工具函数和配置
 *
 * 保持与原有 API 的完全兼容性，确保现有代码无需修改。
 * 同时提供了更好的模块化结构，便于后续维护和扩展。
 */
// ==================== 颜色和样式 ====================
/**
 * ANSI 颜色代码配置
 * @type {Object}
 */
export { colors };

/**
 * 日志类型颜色映射
 * @type {Object}
 */
export { typeColors };

// ==================== 图标配置 ====================
/**
 * Emoji 图标配置
 * @type {Object}
 */
export { icons };

// ==================== 横幅功能 ====================
/**
 * ASCII 艺术字
 * @type {string}
 */
export { asciiArt };

/**
 * 创建带标题的横幅
 * @type {Function}
 */
export { createBanner };

/**
 * 显示横幅
 * @type {Function}
 */
export { showBanner };

// ==================== 日志功能 ====================
/**
 * 美化日志输出
 * @type {Function}
 */
export { log };

// ==================== 工具函数 ====================
/**
 * 显示分隔线
 * @type {Function}
 */
export { separator };

/**
 * 显示成功消息
 * @type {Function}
 */
export { showSuccess };

/**
 * 错误处理
 * @type {Function}
 */
export { handleError };
