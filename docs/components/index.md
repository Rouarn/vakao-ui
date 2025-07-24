# 组件总览

Vakao UI 提供了一系列精心设计的 Vue 3 组件，这些组件具有现代化的设计风格、完善的类型支持和优秀的开发体验。

## 设计原则

- **一致性** - 统一的设计语言和交互模式
- **易用性** - 简洁的 API 设计，开箱即用
- **可定制** - 灵活的主题系统和样式定制
- **类型安全** - 完整的 TypeScript 类型支持
- **性能优化** - 按需加载，体积小巧

## 组件分类

### 基础组件

基础组件是构建用户界面的核心元素，提供最常用的交互功能。

- [Button 按钮](/components/button) - 用于触发操作的基础按钮组件

### 表单组件

表单组件用于收集、验证和提交用户输入的数据。

- [Input 输入框](/components/input) - 通过鼠标或键盘输入字符
- [Checkbox 多选框](/components/checkbox) - 在一组备选项中进行多选
- [Switch 开关](/components/switch) - 表示两种相互对立的状态间的切换

### 数据展示

_即将推出数据展示组件..._

### 导航组件

_即将推出导航组件..._

### 反馈组件

_即将推出反馈组件..._

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
import "vakao-ui/style.css";
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
import "vakao-ui/style.css";
</script>
```
