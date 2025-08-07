# 颜色生成工具

`generate-color` 是一个用于自动生成 Vakao UI 组件库颜色系统的工具函数。它可以生成 SCSS 变量和 CSS 变量，为组件库提供一致的颜色主题和样式基础。

## 功能特点

- 自动生成主题色及其透明度变体和深色变体
- 生成完整的 SCSS 变量文件 (`variables.scss`)
- 生成包含 CSS 变量的基础样式文件 (`base.scss`)
- 提供完整的设计系统变量，包括颜色、字体、间距、圆角等

## 基础主题色

Vakao UI 默认提供以下基础主题色：

```typescript
const themeColors = {
  primary: "#18a058", // 主要
  success: "#18a058", // 成功
  warning: "#f0a020", // 警告
  danger: "#d03050", // 危险
  info: "#2080f0", // 信息
};
```

## 生成的变量类型

该工具会生成以下几类设计系统变量：

### 颜色变量

- **主题色**：基础颜色定义
- **透明度变量**：每种主题色的 0-9 级透明度变体
- **深色变量**：每种主题色的 1-9 级深色变体
- **文本颜色**：主要文本、常规文本、次要文本等
- **边框颜色**：基础边框、浅色边框、深色边框等
- **背景颜色**：页面背景、禁用状态背景等
- **填充颜色**：轻度填充、深度填充等

### 排版变量

- **字体族**：默认字体族定义
- **字体大小**：从超小到超大的字体尺寸
- **行高**：紧凑、正常、宽松等行高

### 尺寸与间距

- **间距**：从 0 到 16 的间距尺寸
- **组件尺寸**：从超小到超大的组件尺寸
- **边框圆角**：从无圆角到圆形的圆角尺寸

### 其他设计变量

- **阴影**：从浅到深的阴影效果
- **过渡动画**：过渡时间、缓动函数等
- **断点**：响应式设计断点
- **Z-index**：层叠顺序管理

## 使用方法

该工具主要用于组件库开发过程中，通过 npm 脚本运行：

```bash
pnpm run generate:colors
```

执行后，工具会自动生成：

1. `packages/styles/variables.scss` - 包含所有 SCSS 变量
2. `packages/styles/base.scss` - 包含 CSS 变量映射和基础样式

## 输出示例

### SCSS 变量 (variables.scss)

```scss
// 自动生成的颜色变量文件
// 请勿手动修改，运行 pnpm run generate:colors 重新生成

@use "sass:color";
@use "sass:map";

// 基础颜色
$color-white: #ffffff;
$color-black: #000000;

// 主题色
$color-primary: #18a058;
$color-success: #18a058;
$color-warning: #f0a020;
$color-danger: #d03050;
$color-info: #2080f0;

// 透明度变量
$color-primary-light-0: color.change(#18a058, $alpha: 0);
$color-primary-light-1: color.change(#18a058, $alpha: 0.1);
// ...更多变量
```

### CSS 变量 (base.scss)

```scss
/* 全局CSS变量 */
:root {
  /* 主题色 */
  --vk-color-primary: #{$color-primary};
  --vk-color-success: #{$color-success};
  --vk-color-warning: #{$color-warning};
  --vk-color-danger: #{$color-danger};
  --vk-color-info: #{$color-info};
  --vk-color-white: #{$color-white};
  --vk-color-black: #{$color-black};

  /* 透明度变量 - Primary */
  --vk-color-primary-light-0: #{$color-primary-light-0};
  --vk-color-primary-light-1: #{$color-primary-light-1};
  // ...更多变量
}
```

## 自定义主题色

如需自定义主题色，可以修改 `generate-color.ts` 文件中的 `themeColors` 对象：

```typescript
// 基础主题色定义
const themeColors = {
  primary: "#你的主色",
  success: "#你的成功色",
  warning: "#你的警告色",
  danger: "#你的危险色",
  info: "#你的信息色",
};
```

修改后运行 `pnpm run generate:colors` 重新生成变量文件。

## 注意事项

- 生成的文件会覆盖现有的 `variables.scss` 和 `base.scss`，请勿直接修改这些文件
- 如需自定义变量，建议创建一个覆盖文件，而不是直接修改生成的文件
- 该工具需要 Node.js 环境和文件系统权限才能正常工作
