# 组件总览

Vakao UI 提供了一系列精心设计的 Vue 3 组件，这些组件具有现代化的设计风格、完善的类型支持和优秀的开发体验。

## 设计原则

- **一致性** - 统一的设计语言和交互模式
- **易用性** - 简洁的 API 设计，开箱即用
- **可定制** - 灵活的主题系统和样式定制
- **类型安全** - 完整的 TypeScript 类型支持
- **性能优化** - 按需加载，体积小巧

## 图标使用最佳实践

:::tip 推荐方式
Vakao UI 组件推荐使用直接的图标属性来设置图标，而不是通过插槽使用 Icon 组件：

- Button 组件：使用 `icon` 属性
- Input 组件：使用 `prefix-icon` 和 `suffix-icon` 属性
- Switch 组件：使用 `active-icon` 和 `inactive-icon` 属性
- Icon 组件：使用 `icon` 属性

这种方式更简洁、性能更好，且提供更好的类型支持。
:::

## 组件分类

### 基础组件

基础组件是构建用户界面的核心元素，提供最常用的交互功能。

- [Button 按钮](/components/button) - 用于触发操作的基础按钮组件
- [Icon 图标](/components/icon) - 用于显示图标的组件，支持 Iconify 图标库

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

反馈组件用于向用户展示操作结果、系统状态或重要信息。

- [MessageBox 消息弹框](/components/message-box) - 模拟系统消息提示框的模态对话框组件

## 组件命名约定

Vakao UI 的组件命名遵循以下约定：

- 组件名称使用 PascalCase 命名法，例如 `VkButton`
- 组件前缀为 `Vk`，例如 `VkButton`
- 在模板中使用时，支持以下命名方式：
  - `<VkButton>` - PascalCase 格式
  - `<vk-button>` - kebab-case 格式（推荐）

**注意**：不支持全大写格式如 `<VKBUTTON>`。

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
