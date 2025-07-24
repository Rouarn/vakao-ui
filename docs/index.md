---
layout: home

hero:
  name: "Vakao UI"
  text: "现代化的 Vue 3 组件库"
  tagline: "基于 Vue 3 和 TypeScript 构建的高质量组件库，提供完整的类型支持和优秀的开发体验"
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 组件总览
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/your-username/vakao-ui

features:
  - title: 🚀 现代化技术栈
    details: 基于 Vue 3 Composition API 和 TypeScript 构建，提供完整的类型支持和智能提示
  - title: 🎨 精美设计
    details: 遵循现代设计原则，提供多套主题预设，支持暗色模式和自定义主题
  - title: 📦 按需加载
    details: 支持 Tree Shaking 和按需导入，最小化打包体积，提升应用性能
  - title: 🛠️ 开发友好
    details: 简洁直观的 API 设计，完善的文档和丰富的示例，提升开发效率
  - title: 🔧 高度可定制
    details: 灵活的主题系统和样式定制，支持 CSS 变量和 SCSS 变量覆盖
  - title: 📱 移动端优化
    details: 响应式设计，移动端友好，支持触摸操作和手势交互
  - title: 🎯 TypeScript 优先
    details: 完整的类型定义，提供优秀的 IDE 支持和类型安全保障
  - title: 🧩 组合式设计
    details: 提供实用的 Hooks 和工具函数，支持逻辑复用和组合式开发
  - title: ⚡ 高性能
    details: 基于 Vue 3 响应式系统优化，提供出色的运行时性能
---

## 快速体验

```bash
# 安装
pnpm add vakao-ui

# 使用
import { createApp } from 'vue'
import VakaoUI from 'vakao-ui'
import 'vakao-ui/style.css'

const app = createApp(App)
app.use(VakaoUI)
```

## 安装

```bash
# npm
npm install vakao-ui --save

# yarn
yarn add vakao-ui

# pnpm
pnpm add vakao-ui
```

## 使用

### 完整引入

```ts
import { createApp } from "vue";
import VakaoUI from "vakao-ui";
// 重要：必须导入样式文件
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VakaoUI);
app.mount("#app");
```

#### TypeScript 支持

为了获得更好的 TypeScript 类型提示，请在 `tsconfig.json` 中配置类型声明：

```json
{
  "compilerOptions": {
    "types": ["vakao-ui"]
  }
}
```

### 按需引入

```ts
import { createApp } from "vue";
import { VkButton } from "vakao-ui";
// 重要：必须导入样式文件
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VkButton);
app.mount("#app");
```

### 在模板中使用

```vue
<template>
  <vk-button type="primary">主要按钮</vk-button>
  <vk-button type="success">成功按钮</vk-button>
</template>
```
