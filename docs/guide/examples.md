# 使用示例

本页面提供了一些常见的使用示例，帮助你快速上手 Vakao UI。

## 基础示例

### 完整引入

这个示例展示了如何完整引入 Vakao UI 及其样式：

```ts
// main.ts
import { createApp } from "vue";
import VakaoUI from "vakao-ui";
// 重要：必须导入样式文件
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(VakaoUI);
app.mount("#app");
```

```vue
<!-- App.vue -->
<template>
  <div class="container">
    <h1>Vakao UI 示例</h1>
    <vk-button type="primary">主要按钮</vk-button>
    <vk-button type="success">成功按钮</vk-button>
    <vk-button type="warning">警告按钮</vk-button>
    <vk-button type="danger">危险按钮</vk-button>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

### 按需引入

这个示例展示了如何按需引入 Vakao UI 组件及其样式：

```ts
// main.ts
import { createApp } from "vue";
// 重要：必须导入样式文件
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

```vue
<!-- App.vue -->
<template>
  <div class="container">
    <h1>Vakao UI 按需引入示例</h1>
    <vk-button type="primary" @click="toggle"
      >切换状态: {{ state ? "开" : "关" }}</vk-button
    >
  </div>
</template>

<script setup lang="ts">
import { VKButton } from "vakao-ui";
import { useToggle } from "vakao-ui";

const { state, toggle } = useToggle(false);
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

### 使用自动导入

这个示例展示了如何使用自动导入插件：

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VakaoUIResolver } from "vakao-ui/resolver";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VakaoUIResolver()],
    }),
  ],
});
```

```ts
// main.ts
import { createApp } from "vue";
// 重要：即使使用自动导入，也必须手动导入样式文件
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

```vue
<!-- App.vue -->
<template>
  <div class="container">
    <h1>Vakao UI 自动导入示例</h1>
    <!-- 无需手动导入组件，自动导入插件会处理 -->
    <vk-button type="primary">主要按钮</vk-button>
  </div>
</template>

<script setup lang="ts">
// 无需手动导入组件
// 但仍需手动导入组合式 API
import { useToggle } from "vakao-ui";

const { state, toggle } = useToggle(false);
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
```

## 常见问题

### 组件没有样式

如果你发现组件没有样式，请检查是否已经导入了样式文件：

```ts
import "vakao-ui/style.css";
```

这个导入语句应该放在你的入口文件（如 `main.ts`）中，确保在应用启动时加载样式。

### 组件名称使用方式

在模板中使用组件时，支持多种命名方式：

1. kebab-case 格式（推荐）：

```html
<vk-button>按钮</vk-button>
```

2. PascalCase 格式：

```html
<VkButton>按钮</VkButton>
```

**注意**：不支持全大写格式如 `<VKBUTTON>`。推荐使用 kebab-case 格式以保持一致性。
