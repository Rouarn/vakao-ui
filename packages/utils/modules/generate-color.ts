import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 基础主题色定义
const themeColors = {
  primary: "#18a058",
  success: "#2080f0",
  warning: "#f0a020",
  danger: "#d03050",
  info: "#909399",
};

// 生成CSS变量映射
function generateCSSVariables(): string {
  let css = "/* 全局CSS变量 */\n:root {\n";

  // 主题色
  css += "  /* 主题色 */\n";
  css += "  --vk-color-primary: #{$color-primary};\n";
  css += "  --vk-color-success: #{$color-success};\n";
  css += "  --vk-color-warning: #{$color-warning};\n";
  css += "  --vk-color-danger: #{$color-danger};\n";
  css += "  --vk-color-info: #{$color-info};\n";
  css += "  --vk-color-white: #{$color-white};\n";
  css += "  --vk-color-black: #{$color-black};\n\n";

  // 透明度变量和深色变量
  Object.keys(themeColors).forEach((colorName) => {
    css += `  /* 透明度变量 - ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} */\n`;
    for (let i = 0; i <= 9; i++) {
      css += `  --vk-color-${colorName}-light-${i}: #{$color-${colorName}-light-${i}};\n`;
    }
    css += `  /* 深色变量 - ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} */\n`;
    for (let i = 1; i <= 9; i++) {
      css += `  --vk-color-${colorName}-dark-${i}: #{$color-${colorName}-dark-${i}};\n`;
    }
    css += "\n";
  });

  // 文本颜色
  css += "  /* 文本颜色 */\n";
  css += "  --vk-text-color-primary: #{$text-color-primary};\n";
  css += "  --vk-text-color-regular: #{$text-color-regular};\n";
  css += "  --vk-text-color-secondary: #{$text-color-secondary};\n";
  css += "  --vk-text-color-placeholder: #{$text-color-placeholder};\n";
  css += "  --vk-text-color-disabled: #{$text-color-disabled};\n\n";

  // 边框颜色
  css += "  /* 边框颜色 */\n";
  css += "  --vk-border-color: #{$border-color};\n";
  css += "  --vk-border-color-base: #{$border-color-base};\n";
  css += "  --vk-border-color-light: #{$border-color-light};\n";
  css += "  --vk-border-color-lighter: #{$border-color-lighter};\n";
  css += "  --vk-border-color-disabled: #{$border-color-disabled};\n";
  css += "  --vk-border-color-hover: #{$border-color-hover};\n";
  css += "  --vk-border-color-darker: #{$border-color-darker};\n\n";

  // 背景颜色
  css += "  /* 背景颜色 */\n";
  css += "  --vk-bg-color: #{$bg-color};\n";
  css += "  --vk-bg-color-page: #{$bg-color-page};\n";
  css += "  --vk-bg-color-disabled: #{$bg-color-disabled};\n";
  css += "  --vk-bg-color-overlay: #{$bg-color-overlay};\n\n";

  // 填充颜色
  css += "  /* 填充颜色 */\n";
  css += "  --vk-fill-color-light: #{$fill-color-light};\n";
  css += "  --vk-fill-color-lighter: #{$fill-color-lighter};\n";
  css += "  --vk-fill-color-extra-light: #{$fill-color-extra-light};\n";
  css += "  --vk-fill-color-dark: #{$fill-color-dark};\n";
  css += "  --vk-fill-color-darker: #{$fill-color-darker};\n";
  css += "  --vk-fill-color-blank: #{$fill-color-blank};\n\n";

  // 字体相关
  css += "  /* 字体相关 */\n";
  css += "  --vk-font-family: #{$font-family};\n";
  css += "  --vk-font-size-extra-small: #{$font-size-extra-small};\n";
  css += "  --vk-font-size-small: #{$font-size-small};\n";
  css += "  --vk-font-size-base: #{$font-size-base};\n";
  css += "  --vk-font-size-medium: #{$font-size-medium};\n";
  css += "  --vk-font-size-large: #{$font-size-large};\n";
  css += "  --vk-font-size-extra-large: #{$font-size-extra-large};\n";
  css += "  --vk-font-size-huge: #{$font-size-huge};\n\n";

  // 行高
  css += "  /* 行高 */\n";
  css += "  --vk-line-height-base: #{$line-height-base};\n";
  css += "  --vk-line-height-small: #{$line-height-small};\n";
  css += "  --vk-line-height-tight: #{$line-height-tight};\n";
  css += "  --vk-line-height-normal: #{$line-height-normal};\n";
  css += "  --vk-line-height-relaxed: #{$line-height-relaxed};\n";
  css += "  --vk-line-height-loose: #{$line-height-loose};\n";
  css += "  --vk-line-height-large: #{$line-height-large};\n\n";

  // 间距
  css += "  /* 间距 */\n";
  css += "  --vk-spacing-0: #{$spacing-0};\n";
  css += "  --vk-spacing-1: #{$spacing-1};\n";
  css += "  --vk-spacing-2: #{$spacing-2};\n";
  css += "  --vk-spacing-3: #{$spacing-3};\n";
  css += "  --vk-spacing-4: #{$spacing-4};\n";
  css += "  --vk-spacing-5: #{$spacing-5};\n";
  css += "  --vk-spacing-6: #{$spacing-6};\n";
  css += "  --vk-spacing-8: #{$spacing-8};\n";
  css += "  --vk-spacing-10: #{$spacing-10};\n";
  css += "  --vk-spacing-12: #{$spacing-12};\n";
  css += "  --vk-spacing-16: #{$spacing-16};\n\n";

  // 组件尺寸
  css += "  /* 组件尺寸 */\n";
  css += "  --vk-size-extra-extra-small: #{$size-extra-extra-small};\n";
  css += "  --vk-size-extra-small: #{$size-extra-small};\n";
  css += "  --vk-size-small: #{$size-small};\n";
  css += "  --vk-size-base: #{$size-base};\n";
  css += "  --vk-size-medium: #{$size-medium};\n";
  css += "  --vk-size-large: #{$size-large};\n";
  css += "  --vk-size-extra-large: #{$size-extra-large};\n";
  css += "  --vk-size-extra-extra-large: #{$size-extra-extra-large};\n";
  css += "  --vk-size-huge: #{$size-huge};\n";
  css += "  --vk-size-extra-huge: #{$size-extra-huge};\n";

  // 边框圆角
  css += "  /* 边框圆角 */\n";
  css += "  --vk-border-radius-none: #{$border-radius-none};\n";
  css += "  --vk-border-radius-small: #{$border-radius-small};\n";
  css += "  --vk-border-radius-base: #{$border-radius-base};\n";
  css += "  --vk-border-radius-medium: #{$border-radius-medium};\n";
  css += "  --vk-border-radius-large: #{$border-radius-large};\n";
  css += "  --vk-border-radius-extra-large: #{$border-radius-extra-large};\n";
  css += "  --vk-border-radius-extra-extra-large: #{$border-radius-extra-extra-large};\n";
  css += "  --vk-border-radius-full: #{$border-radius-full};\n";
  css += "  --vk-border-radius-circle: #{$border-radius-circle};\n";
  css += "  --vk-border-radius-round: #{$border-radius-round};\n\n";

  // 阴影
  css += "  /* 阴影 */\n";
  css += "  --vk-box-shadow-light: #{$box-shadow-light};\n";
  css += "  --vk-box-shadow-base: #{$box-shadow-base};\n";
  css += "  --vk-box-shadow-dark: #{$box-shadow-dark};\n";
  css += "  --vk-box-shadow-small: #{$box-shadow-small};\n";
  css += "  --vk-box-shadow-medium: #{$box-shadow-medium};\n";
  css += "  --vk-box-shadow-large: #{$box-shadow-large};\n";
  css += "  --vk-box-shadow-extra-large: #{$box-shadow-extra-large};\n";
  css += "  --vk-box-shadow-inner: #{$box-shadow-inner};\n\n";

  // 过渡
  css += "  /* 过渡 */\n";
  css += "  --vk-transition-duration: #{$transition-duration};\n";
  css += "  --vk-transition-duration-fast: #{$transition-duration-fast};\n";
  css += "  --vk-transition-duration-base: #{$transition-duration-base};\n";
  css += "  --vk-transition-duration-slow: #{$transition-duration-slow};\n";
  css += "  --vk-transition-function-ease-in-out-bezier: #{$transition-function-ease-in-out-bezier};\n";
  css += "  --vk-transition-function-ease-in-bezier: #{$transition-function-ease-in-bezier};\n";
  css += "  --vk-transition-function-ease-out-bezier: #{$transition-function-ease-out-bezier};\n";
  css += "  --vk-transition-function-ease-in-out: #{$transition-function-ease-in-out};\n";
  css += "  --vk-transition-function-fast-bezier: #{$transition-function-fast-bezier};\n";
  css += "  --vk-transition-function-linear: #{$transition-function-linear};\n";
  css += "  --vk-transition-timing-function: #{$transition-timing-function};\n";
  css += "  --vk-transition-timing-function-ease-in: #{$transition-timing-function-ease-in};\n";
  css += "  --vk-transition-timing-function-ease-out: #{$transition-timing-function-ease-out};\n";
  css += "  --vk-transition-timing-function-ease-in-out: #{$transition-timing-function-ease-in-out};\n\n";

  // 断点
  css += "  /* 断点 */\n";
  css += "  --vk-breakpoint-small: #{$small};\n";
  css += "  --vk-breakpoint-medium: #{$medium};\n";
  css += "  --vk-breakpoint-large: #{$large};\n";
  css += "  --vk-breakpoint-extra-large: #{$extra-large};\n\n";

  // Z-index
  css += "  /* Z-index层级 */\n";
  css += "  --vk-z-index-normal: #{$z-index-normal};\n";
  css += "  --vk-z-index-top: #{$z-index-top};\n";
  css += "  --vk-z-index-popper: #{$z-index-popper};\n";
  css += "  --vk-z-index-dropdown: #{$z-index-dropdown};\n";
  css += "  --vk-z-index-sticky: #{$z-index-sticky};\n";
  css += "  --vk-z-index-fixed: #{$z-index-fixed};\n";
  css += "  --vk-z-index-modal-backdrop: #{$z-index-modal-backdrop};\n";
  css += "  --vk-z-index-modal: #{$z-index-modal};\n";
  css += "  --vk-z-index-popover: #{$z-index-popover};\n";
  css += "  --vk-z-index-tooltip: #{$z-index-tooltip};\n\n";

  // 遮罩颜色
  css += "  /* 遮罩颜色 */\n";
  css += "  --vk-mask-color: #{$mask-color};\n\n";

  css += "}\n";
  return css;
}

// 生成SCSS颜色变量
function generateColorVariables(): string {
  let scss = "// 自动生成的颜色变量文件\n// 请勿手动修改，运行 pnpm run generate:colors 重新生成\n\n";

  // 添加必要的导入
  scss += "@use 'sass:color';\n@use 'sass:map';\n\n";

  // 基础颜色
  scss += "// 基础颜色\n";
  scss += "$color-white: #ffffff;\n";
  scss += "$color-black: #000000;\n\n";

  // 主题色
  scss += "// 主题色\n";
  Object.entries(themeColors).forEach(([_name, _color]) => {
    scss += `$color-${_name}: ${_color};\n`;
  });
  scss += "\n";

  // 生成透明度变量和深色变量
  scss += "// 透明度变量\n";
  Object.entries(themeColors).forEach(([_name, _color]) => {
    for (let i = 0; i <= 9; i++) {
      const alpha = i / 10;
      scss += `$color-${_name}-light-${i}: color.change(${_color}, $alpha: ${alpha});\n`;
    }
    scss += "\n";
  });

  // 生成深色变量
  scss += "// 深色变量\n";
  Object.entries(themeColors).forEach(([_name, _color]) => {
    for (let i = 1; i <= 9; i++) {
      const darkenAmount = i * 10; // 每级加深10%
      scss += `$color-${_name}-dark-${i}: color.adjust(${_color}, $lightness: -${darkenAmount}%);\n`;
    }
    scss += "\n";
  });

  // 文本颜色
  // 文本颜色
  scss += "// 文本颜色\n";
  scss += "$text-color-primary: #303133;\n";
  scss += "$text-color-regular: #000000;\n";
  scss += "$text-color-secondary: #909399;\n";
  scss += "$text-color-placeholder: #a8abb2;\n";
  scss += "$text-color-disabled: #c0c4cc;\n\n";

  // 边框颜色
  scss += "// 边框颜色\n";
  scss += "$border-color: #d9d9d9;\n";
  scss += "$border-color-base: #dcdfe6;\n";
  scss += "$border-color-light: #e5e5e5;\n";
  scss += "$border-color-lighter: #ebeef5;\n";
  scss += "$border-color-disabled: #e4e7ed;\n";
  scss += "$border-color-hover: #c0c4cc;\n";
  scss += "$border-color-darker: #a8abb2;\n\n";

  // 背景颜色
  scss += "// 背景颜色\n";
  scss += "$bg-color: #ffffff;\n";
  scss += "$bg-color-page: #f5f5f5;\n";
  scss += "$bg-color-disabled: #f5f7fa;\n";
  scss += "$bg-color-overlay: rgba(0, 0, 0, 0.05);\n\n";

  // 填充颜色
  scss += "// 填充颜色\n";
  scss += "$fill-color-light: #f5f5f5;\n";
  scss += "$fill-color-lighter: #fafafa;\n";
  scss += "$fill-color-extra-light: #fafcff;\n";
  scss += "$fill-color-dark: #ebeef5;\n";
  scss += "$fill-color-darker: #e4e7ed;\n";
  scss += "$fill-color-blank: #ffffff;\n\n";

  // 字体相关
  scss += "// 字体相关\n";
  scss +=
    "$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';\n";
  scss += "$font-size-extra-small: 12px;\n";
  scss += "$font-size-small: 13px;\n";
  scss += "$font-size-base: 14px;\n";
  scss += "$font-size-medium: 16px;\n";
  scss += "$font-size-large: 18px;\n";
  scss += "$font-size-extra-large: 20px;\n";
  scss += "$font-size-huge: 24px;\n\n";

  // 行高
  scss += "// 行高\n";
  scss += "$line-height-base: 1.5;\n";
  scss += "$line-height-small: 1.25;\n";
  scss += "$line-height-tight: 1.25;\n";
  scss += "$line-height-normal: 1.5;\n";
  scss += "$line-height-relaxed: 1.75;\n";
  scss += "$line-height-loose: 2;\n";
  scss += "$line-height-large: 1.6;\n\n";

  // 间距相关变量
  scss += "// 间距相关变量\n";
  scss += "$spacing-0: 0;\n";
  scss += "$spacing-1: 4px;\n";
  scss += "$spacing-2: 8px;\n";
  scss += "$spacing-3: 12px;\n";
  scss += "$spacing-4: 16px;\n";
  scss += "$spacing-5: 20px;\n";
  scss += "$spacing-6: 24px;\n";
  scss += "$spacing-8: 32px;\n";
  scss += "$spacing-10: 40px;\n";
  scss += "$spacing-12: 48px;\n";
  scss += "$spacing-16: 64px;\n";
  scss += "$spacing-mini: 4px;\n";
  scss += "$spacing-small: 8px;\n";
  scss += "$spacing-base: 12px;\n";
  scss += "$spacing-large: 16px;\n\n";

  // 组件尺寸相关变量
  scss += "// 组件尺寸相关变量\n";
  scss += "$size-extra-extra-small: 16px;\n";
  scss += "$size-extra-small: 20px;\n";
  scss += "$size-small: 24px;\n";
  scss += "$size-base: 28px;\n";
  scss += "$size-medium: 32px;\n";
  scss += "$size-large: 36px;\n";
  scss += "$size-extra-large: 40px;\n";
  scss += "$size-extra-extra-large: 48px;\n";
  scss += "$size-huge: 56px;\n";
  scss += "$size-extra-huge: 64px;\n\n";

  // 圆角
  scss += "// 圆角\n";
  scss += "$border-radius-none: 0;\n";
  scss += "$border-radius-small: 2px;\n";
  scss += "$border-radius-base: 4px;\n";
  scss += "$border-radius-medium: 6px;\n";
  scss += "$border-radius-large: 8px;\n";
  scss += "$border-radius-extra-large: 12px;\n";
  scss += "$border-radius-extra-extra-large: 16px;\n";
  scss += "$border-radius-full: 9999px;\n";
  scss += "$border-radius-circle: 50%;\n";
  scss += "$border-radius-round: 20px;\n\n";

  // 阴影
  scss += "// 阴影\n";
  scss += "$box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n";
  scss += "$box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);\n";
  scss += "$box-shadow-dark: 0 2px 16px 0 rgba(0, 0, 0, 0.18);\n";
  scss += "$box-shadow-small: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n";
  scss += "$box-shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n";
  scss += "$box-shadow-large: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n";
  scss += "$box-shadow-extra-large: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n";
  scss += "$box-shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);\n\n";

  // 过渡动画
  scss += "\n// 过渡动画\n";
  scss += "$transition-duration: 0.3s;\n";
  scss += "$transition-duration-fast: 150ms;\n";
  scss += "$transition-duration-base: 250ms;\n";
  scss += "$transition-duration-slow: 350ms;\n";
  scss += "$transition-function-ease-in-out-bezier: cubic-bezier(0.645, 0.045, 0.355, 1);\n";
  scss += "$transition-function-ease-in-bezier: cubic-bezier(0.55, 0, 1, 0.45);\n";
  scss += "$transition-function-ease-out-bezier: cubic-bezier(0, 0.55, 0.45, 1);\n";
  scss += "$transition-function-ease-in-out: ease-in-out;\n";
  scss += "$transition-function-fast-bezier: cubic-bezier(0.23, 1, 0.32, 1);\n";
  scss += "$transition-function-linear: linear;\n";
  scss += "$transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);\n";
  scss += "$transition-timing-function-ease-in: cubic-bezier(0.4, 0, 1, 1);\n";
  scss += "$transition-timing-function-ease-out: cubic-bezier(0, 0, 0.2, 1);\n";
  scss += "$transition-timing-function-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n\n";

  // 断点
  scss += "// 断点\n";
  scss += "$small: 768px;\n";
  scss += "$medium: 992px;\n";
  scss += "$large: 1200px;\n";
  scss += "$extra-large: 1920px;\n\n";

  // z-index
  scss += "// z-index\n";
  scss += "$z-index-normal: 1;\n";
  scss += "$z-index-top: 1000;\n";
  scss += "$z-index-popper: 2000;\n";
  scss += "$z-index-dropdown: 1000;\n";
  scss += "$z-index-sticky: 1020;\n";
  scss += "$z-index-fixed: 1030;\n";
  scss += "$z-index-modal-backdrop: 1040;\n";
  scss += "$z-index-modal: 1050;\n";
  scss += "$z-index-popover: 1060;\n";
  scss += "$z-index-tooltip: 1070;\n";

  // 遮罩颜色
  scss += "\n// mask color\n";
  scss += "$mask-color: rgba(0, 0, 0, 0.5);\n\n";

  return scss;
}

// 生成base.scss文件内容
function generateBaseScss(): string {
  let scss = "// 自动生成的颜色变量文件\n// 请勿手动修改，运行 pnpm run generate:colors 重新生成\n\n";
  scss += '@use "./variables.scss" as *;\n\n';
  scss += "/* 基础样式 */\n\n";
  scss += "/* 重置样式 */\n";
  scss += "*,\n*::before,\n*::after {\n";
  scss += "  box-sizing: border-box;\n";
  scss += "  margin: 0;\n";
  scss += "  padding: 0;\n";
  scss += "}\n\n";

  // 添加CSS变量
  scss += generateCSSVariables();

  scss += "\n/* 全局样式 */\n";
  scss += "html {\n";
  scss += "  font-size: var(--vk-font-size-base);\n";
  scss += "  line-height: var(--vk-line-height-base);\n";
  scss += "}\n\n";

  scss += ".vk-app {\n";
  scss += "  font-family: var(--vk-font-family);\n";
  scss += "  font-size: var(--vk-font-size-base);\n";
  scss += "  color: var(--vk-text-color-primary);\n";
  scss += "  background-color: var(--vk-bg-color-page);\n";
  scss += "  -webkit-font-smoothing: antialiased;\n";
  scss += "  -moz-osx-font-smoothing: grayscale;\n";
  scss += "}\n\n";

  scss += "/* 通用过渡效果 */\n";
  scss += ".vk-fade-enter-active,\n";
  scss += ".vk-fade-leave-active {\n";
  scss += "  transition: opacity var(--vk-transition-duration) var(--vk-transition-timing-function);\n";
  scss += "}\n\n";

  scss += ".vk-fade-enter-from,\n";
  scss += ".vk-fade-leave-to {\n";
  scss += "  opacity: 0;\n";
  scss += "}\n";

  return scss;
}

// 生成并写入文件
const scssContent = generateColorVariables();
const baseScssContent = generateBaseScss();
const variablesOutputPath = join(__dirname, "../../styles/variables.scss");
const baseOutputPath = join(__dirname, "../../styles/base.scss");

try {
  // 写入variables.scss
  writeFileSync(variablesOutputPath, scssContent, "utf8");
  console.log("✅ 颜色变量已成功生成到:", variablesOutputPath);

  // 写入base.scss
  writeFileSync(baseOutputPath, baseScssContent, "utf8");
  console.log("✅ 基础样式已成功生成到:", baseOutputPath);

  console.log("📝 生成的变量包括:");
  console.log("   - 基础颜色 (white, black)");
  console.log("   - 主题色 (primary, success, warning, danger, info)");
  console.log("   - 透明度变量 (0-9 级别)");
  console.log("   - 文本、边框、背景、填充颜色");
  console.log("   - 字体、行高、间距、组件尺寸");
  console.log("   - 边框圆角、阴影、过渡、断点、Z-index");
  console.log("   - CSS变量映射已自动生成到base.scss");
} catch (error) {
  console.error("❌ 生成文件时出错:", error);
  process.exit(1);
}
