# Vakao UI

基于 Vue 3 和 TypeScript 的轻量级组件库

## 特性

- 🚀 基于 Vue 3 和 TypeScript，提供完整的类型支持
- 📦 按需引入，支持 Tree Shaking
- 🎨 可定制主题
- 📚 详细的文档和示例
- 🔧 使用 Vite 构建，开发体验极佳

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
import { createApp } from 'vue'
import VakaoUI from 'vakao-ui'
// 重要：必须导入样式文件
import 'vakao-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(VakaoUI)
app.mount('#app')
```

### 按需引入

```ts
import { createApp } from 'vue'
import { VKButton } from 'vakao-ui'
// 重要：必须导入样式文件
import 'vakao-ui/dist/style.css'
import App from './App.vue'

const app = createApp(App)

// 全局注册
app.use(VKButton)

app.mount('#app')
```

### 在组件中使用

```vue
<template>
  <div>
    <vkbutton type="primary">主要按钮</vkbutton>
    <vkbutton type="success">成功按钮</vkbutton>
  </div>
</template>

<script setup lang="ts">
// 如果使用了自动导入插件，无需手动导入组件
// 否则需要手动导入
// import { VKButton } from 'vakao-ui'
</script>
```

注意：组件在模板中使用时，标签名为全小写的 `vkbutton`。

### 自动导入

我们推荐使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 来实现自动导入组件。

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

// 导入 Vakao UI 组件解析器
// 可以从主包导入
import { VakaoUIResolver } from 'vakao-ui'
// 或者从专用路径导入
// import { VakaoUIResolver } from 'vakao-ui/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VakaoUIResolver(),
      ],
    }),
  ],
})
```

**重要提示：** 即使使用自动导入组件，也必须手动导入样式文件：

```ts
// main.ts
import 'vakao-ui/dist/style.css'
```

## 使用组合式 API

Vakao UI 提供了一系列的组合式 API，可以在 `setup` 中使用：

```vue
<template>
  <div>
    <vkbutton @click="toggle">切换状态: {{ state ? '开' : '关' }}</vkbutton>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from 'vakao-ui'

const { state, toggle } = useToggle(false)
</script>
```

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
4. 准备发布文件（将构建产物从 packages/dist 复制到根目录的 dist 目录）
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
