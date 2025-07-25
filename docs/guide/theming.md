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
  --vk-color-primary: #1890ff;
  --vk-color-primary-hover: #40a9ff;
  --vk-color-primary-active: #096dd9;

  /* 成功色 */
  --vk-color-success: #52c41a;
  --vk-color-success-hover: #73d13d;
  --vk-color-success-active: #389e0d;

  /* 警告色 */
  --vk-color-warning: #faad14;
  --vk-color-warning-hover: #ffc53d;
  --vk-color-warning-active: #d48806;

  /* 错误色 */
  --vk-color-error: #ff4d4f;
  --vk-color-error-hover: #ff7875;
  --vk-color-error-active: #d9363e;

  /* 文字颜色 */
  --vk-text-color-primary: #262626;
  --vk-text-color-secondary: #595959;
  --vk-text-color-disabled: #bfbfbf;

  /* 背景色 */
  --vk-background-color: #ffffff;
  --vk-background-color-secondary: #fafafa;

  /* 边框 */
  --vk-border-color: #d9d9d9;
  --vk-border-radius: 6px;

  /* 阴影 */
  --vk-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  /* 字体 */
  --vk-font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
  --vk-font-size-small: 12px;
  --vk-font-size-medium: 14px;
  --vk-font-size-large: 16px;
}
```

### 组件级别定制

您也可以针对特定组件进行定制：

```css
/* 自定义按钮样式 */
.vk-button {
  --vk-button-height-medium: 36px;
  --vk-button-padding-medium: 0 16px;
  --vk-button-font-size-medium: 14px;
  --vk-button-border-radius: 8px;
}

/* 自定义按钮组样式 */
.vk-button-group {
  --vk-button-group-border-radius: 8px;
}
```

## SCSS 变量定制

如果您的项目使用 SCSS，可以通过覆盖 SCSS 变量来定制主题。

### 创建主题文件

```scss
// theme.scss

// 颜色变量
$primary-color: #1890ff;
$success-color: #52c41a;
$warning-color: #faad14;
$error-color: #ff4d4f;

// 尺寸变量
$border-radius-base: 6px;
$border-radius-small: 4px;
$border-radius-large: 8px;

// 字体变量
$font-size-base: 14px;
$font-size-small: 12px;
$font-size-large: 16px;

// 间距变量
$spacing-small: 8px;
$spacing-medium: 16px;
$spacing-large: 24px;

// 导入组件库样式
@import "vakao-ui/styles/index.scss";
```

### 在项目中使用

```scss
// main.scss
@import "./theme.scss";
```

## 暗色模式

Vakao UI 支持暗色模式，您可以通过 CSS 变量来定义暗色主题。

```css
/* 暗色模式变量 */
[data-theme="dark"] {
  /* 主色调 */
  --vk-color-primary: #177ddc;
  --vk-color-primary-hover: #1890ff;
  --vk-color-primary-active: #0958d9;

  /* 文字颜色 */
  --vk-text-color-primary: #ffffff;
  --vk-text-color-secondary: #a6a6a6;
  --vk-text-color-disabled: #595959;

  /* 背景色 */
  --vk-background-color: #141414;
  --vk-background-color-secondary: #1f1f1f;

  /* 边框 */
  --vk-border-color: #434343;
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
  <vk-button
    customClass="my-custom-button"
    customStyle="background: linear-gradient(45deg, #ff6b6b, #4ecdc4)"
  >
    自定义按钮
  </vk-button>
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

## 响应式主题

您可以创建响应式的主题系统：

```css
:root {
  --vk-button-height: 32px;
  --vk-button-padding: 0 12px;
  --vk-font-size: 14px;
}

/* 平板设备 */
@media (min-width: 768px) {
  :root {
    --vk-button-height: 36px;
    --vk-button-padding: 0 16px;
    --vk-font-size: 16px;
  }
}

/* 桌面设备 */
@media (min-width: 1024px) {
  :root {
    --vk-button-height: 40px;
    --vk-button-padding: 0 20px;
    --vk-font-size: 16px;
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
  --vk-color-error: #cf1322;
  --vk-border-radius: 4px;
  --vk-font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
```

### 现代主题

```css
:root {
  --vk-color-primary: #722ed1;
  --vk-color-success: #13c2c2;
  --vk-color-warning: #fa8c16;
  --vk-color-error: #f5222d;
  --vk-border-radius: 8px;
  --vk-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

### 简约主题

```css
:root {
  --vk-color-primary: #000000;
  --vk-color-success: #52c41a;
  --vk-color-warning: #faad14;
  --vk-color-error: #ff4d4f;
  --vk-border-radius: 0;
  --vk-box-shadow: none;
  --vk-border-color: #000000;
}
```

## 最佳实践

1. **使用 CSS 变量** - 优先使用 CSS 变量进行主题定制，便于运行时切换
2. **保持一致性** - 确保自定义主题在所有组件中保持一致的视觉风格
3. **测试兼容性** - 在不同浏览器和设备上测试自定义主题
4. **性能考虑** - 避免过度使用复杂的 CSS 效果影响性能
5. **可访问性** - 确保自定义主题符合可访问性标准，特别是颜色对比度

## 注意事项

- CSS 变量不支持 IE 浏览器，如需兼容请使用 SCSS 变量
- 修改 CSS 变量后，某些组件可能需要刷新页面才能生效
- 自定义主题时请确保颜色对比度符合 WCAG 标准
- 建议在项目初期就确定主题方案，避免后期大量修改
