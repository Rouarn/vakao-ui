---
layout: home

hero:
  name: Vakao UI
  text: 基于 Vue 3 和 Naive UI 的组件库
  tagline: 简洁、高效、易用的 Vue 3 组件库
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
    title: 基于 Naive UI
    details: 在 Naive UI 的基础上进行二次封装，提供更加便捷的使用方式
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
import "vakao-ui/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VakaoUI);
app.mount("#app");
```

### 按需引入

```vue
<template>
  <vk-button type="primary">按钮</vk-button>
</template>

<script setup lang="ts">
import { VKButton } from "vakao-ui";
import "vakao-ui/dist/index.css";
</script>
```
