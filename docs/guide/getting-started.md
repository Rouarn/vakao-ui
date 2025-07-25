# 快速开始

本节将介绍如何在项目中快速上手 Vakao UI，包括安装、配置和基本使用方法。

## 环境要求

- Vue 3.0+
- TypeScript 4.0+ (推荐)
- Node.js 16+

## 安装

### 使用包管理器安装

```bash
# npm
npm install vakao-ui

# yarn
yarn add vakao-ui

# pnpm (推荐)
pnpm add vakao-ui
```

### CDN 引入

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/vakao-ui/dist/style.css" />

<!-- 引入组件库 -->
<script src="https://unpkg.com/vakao-ui/dist/vakao-ui.umd.js"></script>
```

::: tip 提示
Vakao UI 是一个独立的组件库，基于 Vue 3 和 TypeScript 构建，提供完整的类型支持和现代化的开发体验。
:::

## 使用

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from "vue";
import VakaoUI from "vakao-ui";
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(VakaoUI);
app.mount("#app");
```

#### 使用组件

```vue
<template>
  <div>
    <vk-button type="primary">主要按钮</vk-button>
    <vk-button type="success">成功按钮</vk-button>
  </div>
</template>
```

### 按需引入

按需引入可以减小打包体积，推荐在生产环境中使用。

#### 手动按需引入

```vue
<template>
  <div>
    <vk-button type="primary">Hello Vakao UI</vk-button>
  </div>
</template>

<script setup lang="ts">
import { VkButton } from "vakao-ui";
import "vakao-ui/style.css";
</script>
```

#### 自动按需引入 (推荐)

使用 `unplugin-vue-components` 和 `unplugin-auto-import` 实现自动按需引入。

##### 安装插件

```bash
pnpm add -D unplugin-vue-components unplugin-auto-import
```

##### 配置 Vite

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VakaoUIResolver } from "vakao-ui/resolver";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VakaoUIResolver()],
    }),
    Components({
      resolvers: [VakaoUIResolver()],
    }),
  ],
});
```

##### 配置 Webpack

```javascript
// webpack.config.js
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { VakaoUIResolver } = require("vakao-ui/resolver");

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [VakaoUIResolver()],
    }),
    Components({
      resolvers: [VakaoUIResolver()],
    }),
  ],
};
```

##### 使用组件

配置完成后，可以直接在模板中使用组件，无需手动导入：

```vue
<template>
  <div>
    <!-- 自动导入，无需手动 import -->
    <vk-button type="primary">主要按钮</vk-button>
    <vk-button-group>
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
    </vk-button-group>
  </div>
</template>

<script setup lang="ts">
// 自动导入 hooks
const [state, toggle] = useToggle();
</script>
```

## 示例

```vue
<template>
  <div>
    <vk-button type="primary" @click="handleClick">点击我</vk-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

const handleClick = () => {
  count.value++;
  console.log(`点击次数: ${count.value}`);
};
</script>
```

## TypeScript 支持

Vakao UI 使用 TypeScript 编写，提供完整的类型定义。

### 类型声明配置

为了获得更好的 TypeScript 类型提示，请在 `tsconfig.json` 中配置类型声明：

```json
{
  "compilerOptions": {
    "types": ["vakao-ui"]
  }
}
```

### 类型推断

```ts
import { VkButton } from "vakao-ui";

// 类型会被正确推断
const button: typeof VkButton = VkButton;
```
