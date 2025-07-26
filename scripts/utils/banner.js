/**
 * 横幅显示模块
 * 
 * 提供 ASCII 艺术字横幅的创建和显示功能，用于美化脚本输出。
 * 支持自定义标题的横幅生成，为脚本执行提供视觉标识。
 * 
 * 主要特性：
 * - ASCII 艺术字：精美的 VAKAO UI 标志
 * - 动态标题：支持自定义横幅标题
 * - 彩色输出：使用颜色增强视觉效果
 * - 统一格式：保持横幅样式的一致性
 * 
 * @example
 * ```javascript
 * const { showBanner, createBanner } = require('./banner');
 * 
 * // 显示带标题的横幅
 * showBanner('项目构建');
 * 
 * // 创建自定义横幅
 * const customBanner = createBanner('自定义标题');
 * console.log(customBanner);
 * ```
 * 
 * @version 1.0.0
 * @author Vakao UI Team
 */

const { colors } = require('./colors');

/**
 * VAKAO UI ASCII 艺术字
 * 
 * 使用 ASCII 字符绘制的 VAKAO UI 标志，为脚本输出提供品牌标识。
 * 采用青色和加粗样式突出显示。
 */
const asciiArt = `
${colors.cyan}${colors.bright}
 _          __  _____  __    __  _   _  __    __  _       ___       _   _  
| |        / / /  _  \\ \\ \\  / / | | | | \\ \\  / / | |     /   |     | | | | 
| |  __   / /  | | | |  \\ \\/ /  | | | |  \\ \\/ /  | |    / /| |     | | | | 
| | /  | / /   | | | |   \\  /   | | | |   }  {   | |   / / | |  _  | | | | 
| |/   |/ /    | |_| |   / /    | |_| |  / /\\ \\  | |  / /  | | | |_| | | | 
|___/|___/     \\_____/  /_/     \\_____/ /_/  \\_\\ |_| /_/   |_| \\_____/ |_|    
${colors.reset}`;

/**
 * 创建带标题的横幅
 * 
 * 生成包含 ASCII 艺术字和自定义标题的完整横幅。
 * 标题会以品红色和加粗样式显示在艺术字下方。
 * 
 * @param {string} title - 横幅标题文本
 * 
 * @returns {string} 完整的横幅字符串，包含艺术字、标题和装饰线
 * 
 * @example
 * ```javascript
 * // 创建项目构建横幅
 * const banner = createBanner('项目构建');
 * console.log(banner);
 * 
 * // 创建发布横幅
 * const publishBanner = createBanner('包发布');
 * console.log(publishBanner);
 * ```
 */
function createBanner(title) {
  return `${asciiArt}
${colors.magenta}${colors.bright}                           ${title}${colors.reset}
${colors.dim}                        ═══════════════════════════════════${colors.reset}
`;
}

/**
 * 显示横幅
 * 
 * 直接在控制台输出带标题的横幅，是 createBanner 的便捷包装函数。
 * 适用于需要立即显示横幅的场景。
 * 
 * @param {string} title - 横幅标题文本
 * 
 * @example
 * ```javascript
 * // 在脚本开始时显示横幅
 * showBanner('Vakao UI 构建工具');
 * 
 * // 在不同阶段显示不同横幅
 * showBanner('开始构建');
 * // ... 构建过程 ...
 * showBanner('构建完成');
 * ```
 */
function showBanner(title) {
  console.log(createBanner(title));
}

module.exports = {
  asciiArt,
  createBanner,
  showBanner,
};