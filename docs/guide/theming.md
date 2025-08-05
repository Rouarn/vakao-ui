# 主题定制

Vakao UI 提供了灵活的主题定制系统，您可以轻松地自定义组件的外观以匹配您的品牌风格。

## 设计理念

- **CSS 变量** - 基于 CSS 自定义属性的主题系统
- **SCSS 变量** - 支持 SCSS 变量覆盖
- **深度定制** - 支持组件级别的样式定制
- **响应式** - 支持暗色模式和响应式主题

## CSS 变量定制

### 基础用法

Vakao UI 使用 CSS 变量来定义主题，您可以通过覆盖这些变量来自定义主题。

```css
:root {
  /* 主色调 */
  --vk-color-primary: #18a058;
  --vk-color-success: #18a058;
  --vk-color-warning: #f0a020;
  --vk-color-danger: #d03050;
  --vk-color-info: #2080f0;

  /* 基础颜色 */
  --vk-color-white: #ffffff;
  --vk-color-black: #000000;

  /* 文字颜色 */
  --vk-text-color-primary: #000000d9;
  --vk-text-color-regular: #000000e0;
  --vk-text-color-secondary: #00000099;
  --vk-text-color-placeholder: #00000059;
  --vk-text-color-disabled: #00000040;

  /* 背景色 */
  --vk-bg-color: #ffffff;
  --vk-bg-color-page: #f5f5f5;
  --vk-bg-color-disabled: #f5f7fa;
  --vk-bg-color-overlay: rgba(0, 0, 0, 0.05);

  /* 边框颜色 */
  --vk-border-color: #d9d9d9;
  --vk-border-color-base: #dcdfe6;
  --vk-border-color-light: #e5e5e5;
  --vk-border-color-lighter: #ebeef5;
  --vk-border-color-hover: #c0c4cc;

  /* 边框圆角 */
  --vk-border-radius-base: 4px;
  --vk-border-radius-sm: 2px;
  --vk-border-radius-md: 6px;
  --vk-border-radius-lg: 8px;
  --vk-border-radius-xl: 12px;

  /* 阴影 */
  --vk-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  --vk-box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  --vk-box-shadow-dark: 0 2px 16px 0 rgba(0, 0, 0, 0.18);

  /* 字体 */
  --vk-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  --vk-font-size-base: 14px;
  --vk-font-size-sm: 13px;
  --vk-font-size-lg: 16px;
  --vk-font-size-xl: 18px;
  --vk-font-size-small: 12px;
  --vk-font-size-large: 18px;

  /* 间距 */
  --vk-spacing-1: 4px;
  --vk-spacing-2: 8px;
  --vk-spacing-3: 12px;
  --vk-spacing-4: 16px;
  --vk-spacing-5: 20px;
  --vk-spacing-6: 24px;

  /* 组件尺寸 */
  --vk-component-size-small: 28px;
  --vk-component-size-base: 32px;
  --vk-component-size-large: 40px;
}
```

### 组件级别定制

每个组件都提供了专门的CSS变量，您可以针对特定组件进行精细化定制：

```css
/* 按钮组件变量 */
.vk-button {
  --vk-button-bg-default: var(--vk-fill-color-blank);
  --vk-button-bg-hover: var(--vk-fill-color-light);
  --vk-button-border-default: var(--vk-border-color);
  --vk-button-border-hover: var(--vk-color-primary);
  --vk-button-text-default: var(--vk-text-color-primary);
  --vk-button-text-disabled: var(--vk-text-color-disabled);
}

/* 输入框组件变量 */
.vk-input {
  --vk-input-bg-default: var(--vk-bg-color);
  --vk-input-bg-disabled: var(--vk-fill-color-light);
  --vk-input-border-default: var(--vk-border-color);
  --vk-input-border-hover: var(--vk-border-color-hover);
  --vk-input-border-focus: var(--vk-color-primary);
  --vk-input-text-default: var(--vk-text-color-regular);
  --vk-input-text-placeholder: var(--vk-text-color-placeholder);
}

/* 卡片组件变量 */
.vk-card {
  --vk-card-bg-default: var(--vk-bg-color);
  --vk-card-border-default: var(--vk-border-color-light);
  --vk-card-text-default: var(--vk-text-color-primary);
  --vk-card-shadow-base: var(--vk-box-shadow-light);
  --vk-card-shadow-hover: var(--vk-box-shadow-base);
}

/* 选择器组件变量 */
.vk-select {
  --vk-select-bg-default: var(--vk-bg-color);
  --vk-select-border-default: var(--vk-border-color);
  --vk-select-border-focus: var(--vk-color-primary);
  --vk-select-dropdown-bg: var(--vk-bg-color);
  --vk-select-dropdown-shadow: var(--vk-box-shadow-light);
}
```

## SCSS 变量定制

如果您的项目使用 SCSS，可以通过覆盖 SCSS 变量来定制主题。

### 创建主题文件

```scss
// theme.scss

// 主题颜色变量
$color-primary: #18a058;
$color-success: #18a058;
$color-warning: #f0a020;
$color-danger: #d03050;
$color-info: #2080f0;

// 文本颜色变量
$text-color-primary: #000000d9;
$text-color-regular: #000000e0;
$text-color-secondary: #00000099;
$text-color-placeholder: #00000059;
$text-color-disabled: #00000040;

// 背景颜色变量
$bg-color: #ffffff;
$bg-color-page: #f5f5f5;
$bg-color-disabled: #f5f7fa;

// 边框变量
$border-color: #d9d9d9;
$border-color-base: #dcdfe6;
$border-color-light: #e5e5e5;
$border-color-hover: #c0c4cc;

// 圆角变量
$border-radius-base: 4px;
$border-radius-sm: 2px;
$border-radius-md: 6px;
$border-radius-lg: 8px;
$border-radius-xl: 12px;

// 字体变量
$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
$font-size-base: 14px;
$font-size-sm: 13px;
$font-size-lg: 16px;
$font-size-xl: 18px;

// 间距变量
$spacing-1: 4px;
$spacing-2: 8px;
$spacing-3: 12px;
$spacing-4: 16px;
$spacing-5: 20px;
$spacing-6: 24px;

// 组件尺寸变量
$component-size-small: 28px;
$component-size-base: 32px;
$component-size-large: 40px;

// 阴影变量
$box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
$box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
$box-shadow-dark: 0 2px 16px 0 rgba(0, 0, 0, 0.18);

// 导入组件库样式
@import "vakao-ui/styles/index.scss";
```

### 在项目中使用

```scss
// main.scss
@import "./theme.scss";
```

### SCSS 混入函数

Vakao UI 提供了丰富的 SCSS 混入函数，帮助您快速实现常见的样式效果：

```scss
// 导入混入函数
@use "vakao-ui/styles/mixins.scss" as *;

// 文本溢出省略号
.my-text {
  @include ellipsis;
}

// 多行文本溢出省略号
.my-multiline-text {
  @include multi-ellipsis(3); // 显示3行
}

// 居中定位
.my-centered-element {
  @include center;
}

// 响应式断点
.my-responsive-element {
  @include respond-to('md') {
    font-size: 18px;
  }
  
  @include respond-to('lg') {
    font-size: 20px;
  }
}

// 按钮样式混合器
.my-custom-button {
  @include button-variant(#ff6b6b, #ffffff, #ff6b6b);
  @include button-size(40px, 20px, 16px, 8px);
}

// 禁用文本选择
.my-no-select {
  @include no-select;
}

// 清除浮动
.my-clearfix {
  @include clearfix;
}
```

## 暗色模式

Vakao UI 支持暗色模式，您可以通过 CSS 变量来定义暗色主题。

```css
/* 暗色模式变量 */
[data-theme="dark"] {
  /* 主题色 - 深色模式调整 */
  --vk-color-primary: #409eff;
  --vk-color-success: #67c23a;
  --vk-color-warning: #e6a23c;
  --vk-color-danger: #f56c6c;
  --vk-color-info: #909399;

  /* 文字颜色 - 深色模式 */
  --vk-text-color-primary: #e5eaf3;
  --vk-text-color-regular: #cfd3dc;
  --vk-text-color-secondary: #a3a6ad;
  --vk-text-color-placeholder: #8d9095;
  --vk-text-color-disabled: #6c6e72;

  /* 边框颜色 - 深色模式 */
  --vk-border-color: #4c4d4f;
  --vk-border-color-base: #414243;
  --vk-border-color-light: #363637;
  --vk-border-color-lighter: #2d2d2f;
  --vk-border-color-hover: #58585b;

  /* 背景颜色 - 深色模式 */
  --vk-bg-color: #141414;
  --vk-bg-color-page: #0a0a0a;
  --vk-bg-color-disabled: #1d1e1f;
  --vk-bg-color-overlay: rgba(255, 255, 255, 0.05);

  /* 填充颜色 - 深色模式 */
  --vk-fill-color-light: #1d1e1f;
  --vk-fill-color-lighter: #262727;
  --vk-fill-color-extra-light: #2b2b2d;
  --vk-fill-color-dark: #18181a;
  --vk-fill-color-blank: #141414;

  /* 阴影 - 深色模式调整 */
  --vk-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  --vk-box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 6px rgba(0, 0, 0, 0.2);
  --vk-box-shadow-dark: 0 2px 16px 0 rgba(0, 0, 0, 0.6);

  /* 遮罩颜色 - 深色模式 */
  --vk-mask-color: rgba(0, 0, 0, 0.8);
}
```

### 切换暗色模式

```typescript
// 切换主题的工具函数
export function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// 初始化主题
export function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
}
```

### 在文档中测试深色模式

我们为您提供了专门的深色模式测试页面，您可以：

1. **访问测试页面**：前往 [深色模式测试](/guide/dark-mode-test) 页面
2. **实时切换主题**：使用页面右上角的主题切换按钮
3. **查看所有组件**：测试页面包含了所有组件在深色模式下的显示效果
4. **验证自定义样式**：确保您的自定义样式在深色模式下正常工作

每个组件演示区域都包含主题切换功能，您可以随时切换查看效果。

## 自定义组件样式

### 使用 CSS 类名

每个组件都提供了丰富的 CSS 类名，您可以通过这些类名来自定义样式：

```css
/* 自定义按钮样式 */
.vk-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.vk-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.vk-button--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.vk-button--large {
  font-weight: 600;
  letter-spacing: 0.5px;
}
```

### 使用 customClass 和 customStyle

组件支持通过 props 传入自定义样式：

```vue
<template>
  <vk-button customClass="my-custom-button" customStyle="background: linear-gradient(45deg, #ff6b6b, #4ecdc4)"> 自定义按钮 </vk-button>
</template>

<style>
.my-custom-button {
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.my-custom-button:hover {
  transform: scale(1.05);
}
</style>
```

## 高级主题特性

### 透明度变量

Vakao UI 为每种主题色提供了 10 个透明度级别（0-9），方便您创建渐变和半透明效果：

```css
:root {
  /* Primary 透明度变量 */
  --vk-color-primary-light-0: rgba(24, 160, 88, 0);    /* 完全透明 */
  --vk-color-primary-light-1: rgba(24, 160, 88, 0.1);  /* 10% 透明度 */
  --vk-color-primary-light-2: rgba(24, 160, 88, 0.2);  /* 20% 透明度 */
  --vk-color-primary-light-3: rgba(24, 160, 88, 0.3);  /* 30% 透明度 */
  /* ... 以此类推到 light-9 */
  
  /* Success、Warning、Danger、Info 同样提供透明度变量 */
}

/* 使用示例 */
.my-overlay {
  background-color: var(--vk-color-primary-light-2);
}

.my-hover-effect:hover {
  background-color: var(--vk-color-success-light-1);
}
```

### 深色变量

每种主题色还提供了 9 个深色级别（dark-1 到 dark-9），用于创建更深的色调：

```css
:root {
  /* Primary 深色变量 */
  --vk-color-primary-dark-1: #159947;  /* 10% 更深 */
  --vk-color-primary-dark-2: #127a3a;  /* 20% 更深 */
  --vk-color-primary-dark-3: #0f5b2d;  /* 30% 更深 */
  /* ... 以此类推到 dark-9 */
}

/* 使用示例 */
.my-button:active {
  background-color: var(--vk-color-primary-dark-2);
}

.my-border {
  border-color: var(--vk-color-danger-dark-1);
}
```

### Z-index 层级管理

Vakao UI 提供了标准化的 z-index 层级变量：

```css
:root {
  --vk-z-index-normal: 1;
  --vk-z-index-top: 1000;
  --vk-z-index-dropdown: 1000;
  --vk-z-index-sticky: 1020;
  --vk-z-index-fixed: 1030;
  --vk-z-index-modal-backdrop: 1040;
  --vk-z-index-modal: 1050;
  --vk-z-index-popover: 1060;
  --vk-z-index-tooltip: 1070;
}

/* 使用示例 */
.my-dropdown {
  z-index: var(--vk-z-index-dropdown);
}

.my-modal {
  z-index: var(--vk-z-index-modal);
}
```

## 响应式主题

您可以创建响应式的主题系统，Vakao UI 提供了标准的断点变量：

```css
:root {
  /* 断点变量 */
  --vk-breakpoint-sm: 768px;
  --vk-breakpoint-md: 992px;
  --vk-breakpoint-lg: 1200px;
  --vk-breakpoint-xl: 1920px;
  
  /* 默认样式 */
  --vk-component-size-base: 32px;
  --vk-font-size-base: 14px;
  --vk-spacing-4: 16px;
}

/* 小屏设备 (≥768px) */
@media (min-width: 768px) {
  :root {
    --vk-component-size-base: 36px;
    --vk-font-size-base: 15px;
    --vk-spacing-4: 18px;
  }
}

/* 中等屏幕 (≥992px) */
@media (min-width: 992px) {
  :root {
    --vk-component-size-base: 40px;
    --vk-font-size-base: 16px;
    --vk-spacing-4: 20px;
  }
}

/* 大屏设备 (≥1200px) */
@media (min-width: 1200px) {
  :root {
    --vk-component-size-large: 48px;
    --vk-font-size-lg: 18px;
    --vk-spacing-6: 28px;
  }
}
```

### 使用 SCSS 响应式混入

```scss
@use "vakao-ui/styles/mixins.scss" as *;

.my-component {
  font-size: 14px;
  
  @include respond-to('sm') {
    font-size: 15px;
  }
  
  @include respond-to('md') {
    font-size: 16px;
  }
  
  @include respond-to('lg') {
    font-size: 18px;
  }
  
  @include respond-to('xl') {
    font-size: 20px;
  }
}
```

## 主题预设

Vakao UI 提供了一些预设主题供您快速使用：

### 商务主题

```css
:root {
  --vk-color-primary: #2f54eb;
  --vk-color-success: #389e0d;
  --vk-color-warning: #d48806;
  --vk-color-danger: #cf1322;
  --vk-color-info: #1890ff;
  --vk-border-radius-base: 2px;
  --vk-border-radius-md: 4px;
  --vk-border-radius-lg: 6px;
  --vk-font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --vk-box-shadow-base: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
```

### 现代主题

```css
:root {
  --vk-color-primary: #722ed1;
  --vk-color-success: #13c2c2;
  --vk-color-warning: #fa8c16;
  --vk-color-danger: #f5222d;
  --vk-color-info: #2f54eb;
  --vk-border-radius-base: 8px;
  --vk-border-radius-md: 12px;
  --vk-border-radius-lg: 16px;
  --vk-box-shadow-light: 0 4px 20px rgba(0, 0, 0, 0.1);
  --vk-box-shadow-base: 0 8px 30px rgba(0, 0, 0, 0.12);
  --vk-font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 简约主题

```css
:root {
  --vk-color-primary: #000000;
  --vk-color-success: #52c41a;
  --vk-color-warning: #faad14;
  --vk-color-danger: #ff4d4f;
  --vk-color-info: #1890ff;
  --vk-border-radius-base: 0;
  --vk-border-radius-md: 0;
  --vk-border-radius-lg: 0;
  --vk-box-shadow-light: none;
  --vk-box-shadow-base: none;
  --vk-border-color: #000000;
  --vk-border-color-light: #333333;
  --vk-font-family: "SF Mono", Monaco, "Cascadia Code", monospace;
}
```

### 彩色主题

```css
:root {
  --vk-color-primary: #ff6b6b;
  --vk-color-success: #51cf66;
  --vk-color-warning: #ffd43b;
  --vk-color-danger: #ff8787;
  --vk-color-info: #74c0fc;
  --vk-border-radius-base: 12px;
  --vk-border-radius-md: 16px;
  --vk-border-radius-lg: 20px;
  --vk-box-shadow-light: 0 4px 14px rgba(255, 107, 107, 0.15);
  --vk-box-shadow-base: 0 8px 25px rgba(255, 107, 107, 0.2);
}
```

## 最佳实践

### 主题设计原则

1. **使用 CSS 变量优先** - 优先使用 CSS 变量进行主题定制，便于运行时动态切换
2. **保持设计一致性** - 确保自定义主题在所有组件中保持一致的视觉风格和交互体验
3. **遵循设计系统** - 建立完整的设计令牌系统，包括颜色、字体、间距、圆角等
4. **渐进式定制** - 从基础变量开始，逐步深入到组件级别的精细化定制

### 性能优化

1. **避免过度嵌套** - 减少 CSS 选择器的嵌套层级，提高渲染性能
2. **合理使用阴影** - 避免过度使用复杂的 box-shadow 效果
3. **优化动画** - 使用 CSS 变量控制过渡动画，避免频繁的样式计算
4. **按需加载** - 只导入需要的组件样式，减少 CSS 文件大小

```scss
// 推荐：按需导入
@use "vakao-ui/styles/vk/vk-button.scss";
@use "vakao-ui/styles/vk/vk-input.scss";

// 不推荐：全量导入
@use "vakao-ui/styles/index.scss";
```

### 可访问性考虑

1. **颜色对比度** - 确保文本与背景的对比度符合 WCAG 2.1 AA 标准（至少 4.5:1）
2. **焦点状态** - 为所有交互元素提供清晰的焦点指示器
3. **色彩语义** - 不要仅依赖颜色传达信息，结合图标或文字说明
4. **深色模式适配** - 确保深色模式下的可读性和可用性

```css
/* 确保足够的对比度 */
:root {
  --vk-text-color-primary: #000000d9; /* 对比度 > 4.5:1 */
}

[data-theme="dark"] {
  --vk-text-color-primary: #e5eaf3; /* 对比度 > 4.5:1 */
}

/* 清晰的焦点状态 */
.vk-button:focus-visible {
  outline: 2px solid var(--vk-color-primary);
  outline-offset: 2px;
}
```

### 兼容性测试

1. **浏览器兼容性** - 在主流浏览器中测试自定义主题效果
2. **设备适配** - 在不同屏幕尺寸和分辨率下验证主题表现
3. **系统主题** - 测试与操作系统深色/浅色模式的兼容性
4. **打印样式** - 考虑打印时的样式表现

### 维护和扩展

1. **文档化** - 为自定义主题编写详细的使用文档
2. **版本控制** - 使用语义化版本管理主题变更
3. **向后兼容** - 在更新主题时保持向后兼容性
4. **团队协作** - 建立主题设计规范，确保团队成员遵循统一标准

## 注意事项

### 浏览器兼容性

- **CSS 变量支持**：CSS 自定义属性在现代浏览器中得到良好支持，但不支持 IE 浏览器
- **降级方案**：如需兼容旧版浏览器，请使用 SCSS 变量作为降级方案
- **特性检测**：可以使用 `@supports` 规则进行特性检测

```css
/* 现代浏览器 */
@supports (--css: variables) {
  .vk-button {
    background-color: var(--vk-color-primary);
  }
}

/* 降级方案 */
@supports not (--css: variables) {
  .vk-button {
    background-color: #18a058;
  }
}
```

### 主题切换注意事项

- **实时生效**：CSS 变量修改会立即生效，无需刷新页面
- **状态保持**：使用 `localStorage` 或 `sessionStorage` 保存用户的主题偏好
- **系统主题**：考虑响应系统的深色/浅色模式偏好
- **过渡动画**：为主题切换添加平滑的过渡效果

```typescript
// 主题切换最佳实践
export function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  // 添加过渡类
  html.classList.add('theme-transition');
  
  // 切换主题
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  
  // 移除过渡类
  setTimeout(() => {
    html.classList.remove('theme-transition');
  }, 300);
}
```

### 性能考虑

- **变量数量**：避免定义过多未使用的 CSS 变量
- **计算复杂度**：减少 `calc()` 函数的嵌套使用
- **重绘优化**：避免频繁修改影响布局的 CSS 变量
- **缓存策略**：合理设置 CSS 文件的缓存策略

### 开发建议

- **早期规划**：建议在项目初期就确定主题架构，避免后期大量重构
- **设计令牌**：建立完整的设计令牌系统，确保设计与开发的一致性
- **测试覆盖**：为主题切换功能编写自动化测试
- **文档维护**：及时更新主题相关的开发文档

### 常见问题

1. **变量作用域**：CSS 变量遵循级联规则，子元素会继承父元素的变量值
2. **变量命名**：使用有意义的变量名，避免与第三方库冲突
3. **默认值**：为 CSS 变量提供合理的默认值，提高代码健壮性
4. **调试技巧**：使用浏览器开发者工具查看和调试 CSS 变量

```css
/* 提供默认值 */
.my-component {
  color: var(--vk-text-color-primary, #000000d9);
  background: var(--vk-bg-color, #ffffff);
}
```
