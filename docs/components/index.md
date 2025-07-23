# 组件

Vakao UI 提供了一系列基于 Naive UI 的组件，这些组件经过二次封装，提供更加便捷的使用方式。

## 组件列表

### 基础组件

- [Button 按钮](/components/button) - 用于触发一个操作

### 其他组件

_即将推出_

## 组件命名约定

Vakao UI 的组件命名遵循以下约定：

- 组件名称使用 PascalCase 命名法，例如 `VKButton`
- 组件前缀为 `VK`，例如 `VKButton`
- 在模板中使用时，支持多种命名方式：
  - `<VKButton>` - 原始 PascalCase 格式
  - `<VkButton>` - 首字母小写的 k
  - `<vk-button>` - kebab-case 格式（推荐）

所有这些命名方式都会被正确识别和注册。

## 组件引入方式

### 全局引入

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
