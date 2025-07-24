---
layout: home

hero:
  name: Vakao UI
  text: 基于 Vue 3 和 TypeScript 的组件库
  tagline: 简洁、高效、类型安全的 Vue 3 组件库
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 组件
      link: /components/
    - theme: alt
      text: GitHub
      link: https://github.com/your-username/vakao-ui

features:
  - icon: 🛠️
    title: 基于 Vue 3
    details: 充分利用 Vue 3 的 Composition API 和响应式系统
  - icon: ⚡️
    title: 现代化构建
    details: 使用 Vite 构建，支持 Tree Shaking，提供最佳的开发体验
  - icon: 🔑
    title: TypeScript 支持
    details: 使用 TypeScript 编写，提供完整的类型定义
  - icon: 📦
    title: 按需引入
    details: 支持按需引入组件，减小打包体积
---

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
import "vakao-ui/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VakaoUI);
app.mount("#app");
```

### 按需引入

```ts
import { createApp } from "vue";
import { VkButton } from "vakao-ui";
// 重要：必须导入样式文件
import "vakao-ui/dist/index.css";
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
