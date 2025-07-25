# Vakao UI

基于 Vue 3 和 TypeScript 的现代化组件库

## 特性

- 🚀 基于 Vue 3 和 TypeScript，提供完整的类型支持
- 📦 按需引入，支持 Tree Shaking
- 🎨 可定制主题和样式
- 📚 详细的文档和示例
- 🔧 使用 Vite 构建，开发体验极佳
- ✨ 支持属性继承和类型安全
- 🛠️ 支持自动导入插件
- 🎯 基于 Iconify 的图标系统
- 🔗 完整的组合式 API 支持

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

### 按需引入

```ts
import { createApp } from "vue";
import { VKButton } from "vakao-ui";
// 重要：必须导入样式文件
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

// 全局注册
app.use(VKButton);

app.mount("#app");
```

### 在组件中使用

```vue
<template>
  <div>
    <vk-button type="primary">主要按钮</vk-button>
    <vk-button type="success">成功按钮</vk-button>
    <vk-input placeholder="请输入内容" />
    <vk-checkbox>选择项</vk-checkbox>
    <vk-switch v-model="switchValue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 如果使用了自动导入插件，无需手动导入组件
// 否则需要手动导入
// import { VkButton, VkInput, VkCheckbox, VkSwitch } from 'vakao-ui'

const switchValue = ref(false);
</script>
```

### 自动导入插件

推荐使用 `unplugin-vue-components` 实现自动导入：

```bash
npm install unplugin-vue-components -D
```

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

配置后可直接在模板中使用组件，无需手动导入。

## 类型安全

Vakao UI 使用 TypeScript 编写，提供完整的类型定义：

```vue
<template>
  <!-- 完整的类型支持和智能提示 -->
  <vk-button type="primary" size="large" :disabled="false" @click="handleClick">
    按钮
  </vk-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log("按钮被点击");
};
</script>
```

## 自定义样式

组件支持多种方式自定义样式：

```vue
<template>
  <!-- 使用 customClass 和 customStyle 属性 -->
  <vk-button
    customClass="my-button"
    customStyle="background: linear-gradient(45deg, #ff6b6b, #4ecdc4);"
  >
    渐变按钮
  </vk-button>

  <!-- 直接使用 class 和 style 属性 -->
  <vk-button
    class="shadow-button"
    style="box-shadow: 0 4px 8px rgba(0,0,0,0.2);"
  >
    阴影按钮
  </vk-button>
</template>
```

**重要提示：** 即使使用自动导入组件，也必须手动导入样式文件：

```ts
// main.ts
import "vakao-ui/style.css";
```

## 组件列表

### 基础组件

- **VkButton** - 按钮组件，支持多种类型和尺寸
- **VkIcon** - 图标组件，基于 Iconify 图标库

### 表单组件

- **VkInput** - 输入框组件，支持多种输入类型
- **VkCheckbox** - 复选框组件，支持单选和组合使用
- **VkSwitch** - 开关组件，用于切换状态

### 反馈组件

- **VkMessageBox** - 消息弹框组件，用于显示提示信息

## 组合式 API (Hooks)

Vakao UI 提供了一系列实用的组合式 API：

### useToggle

布尔值切换钩子，用于管理开关状态：

```vue
<template>
  <div>
    <vk-button @click="toggle">切换状态: {{ state ? "开" : "关" }}</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "vakao-ui";

const { state, toggle } = useToggle(false);
</script>
```

## 工具函数

Vakao UI 还提供了一系列工具函数：

- **install** - 组件安装工具
- **namespace** - 命名空间工具
- **url** - URL 处理工具

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动文档开发服务器

```bash
pnpm dev
```

### 构建组件库

```bash
pnpm build
```

### 构建文档

```bash
pnpm build:docs
```

### 部署文档

#### 自动部署（推荐）

项目已配置 GitHub Actions 自动部署，推送到 `main` 分支时会自动构建并部署文档到 GitHub Pages。

访问地址：https://rouarn.github.io/vakao-ui/

#### 手动部署

```bash
# 构建并部署文档到 GitHub Pages
pnpm deploy:docs

# 本地预览构建后的文档
pnpm deploy:preview
```

详细部署说明请参考 [DEPLOY.md](./DEPLOY.md)

### 发布组件库

```bash
# 测试发布流程（不会真正发布到 npm）
pnpm publish:dry-run

# 正式发布到 npm
pnpm publish
```

发布过程会自动执行以下步骤：

1. 询问新版本号
2. 更新 package.json 中的版本号
3. 构建组件库
4. 准备发布文件
5. 发布到 npm

## 目录结构

```
├── docs                  # 文档目录
│   ├── .vitepress       # VitePress 配置
│   ├── components       # 组件文档
│   ├── guide            # 指南文档
│   └── public           # 静态资源
├── packages             # 组件库源码
│   ├── components       # 组件目录
│   ├── hooks            # 组合式 API
│   ├── styles           # 样式文件
│   ├── types            # 类型定义
│   └── utils            # 工具函数
```

## 许可证

[MIT](./LICENSE)
