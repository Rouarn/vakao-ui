# 快速开始

本节将介绍如何在项目中使用 Vakao UI。

## 安装

### 安装 Vakao UI

```bash
# npm
npm install vakao-ui --save

# yarn
yarn add vakao-ui

# pnpm
pnpm add vakao-ui
```

::: warning 注意
Vakao UI 依赖于 Naive UI，因此需要同时安装 Naive UI。
:::

## 使用

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

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

如果你只希望引入部分组件，可以使用按需引入的方式。

```vue
<template>
  <vk-button type="primary">按钮</vk-button>
</template>

<script setup lang="ts">
import { VKButton } from "vakao-ui";
import "vakao-ui/dist/index.css";
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

```ts
import { VKButton } from "vakao-ui";

// 类型会被正确推断
const button: typeof VKButton = VKButton;
```
