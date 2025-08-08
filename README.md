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
  <vk-button type="primary" size="large" :disabled="false" @click="handleClick"> 按钮 </vk-button>
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
  <vk-button customClass="my-button" customStyle="background: linear-gradient(45deg, #ff6b6b, #4ecdc4);"> 渐变按钮 </vk-button>

  <!-- 直接使用 class 和 style 属性 -->
  <vk-button class="shadow-button" style="box-shadow: 0 4px 8px rgba(0,0,0,0.2);"> 阴影按钮 </vk-button>
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

Vakao UI 提供了一系列实用的组合式 API，可以单独安装使用：

```bash
# npm
npm install @vakao-ui/hooks

# yarn
yarn add @vakao-ui/hooks

# pnpm
pnpm add @vakao-ui/hooks
```

包含多种实用钩子函数，如 `useToggle`、`useCounter`、`useFetch` 等。

详细文档请参考 [@vakao-ui/hooks 文档](./packages/hooks/README.md)

## 工具函数

Vakao UI 还提供了一系列工具函数，可以单独安装使用：

```bash
# npm
npm install @vakao-ui/utils

# yarn
yarn add @vakao-ui/utils

# pnpm
pnpm add @vakao-ui/utils
```

包含组件安装工具、CSS命名空间工具、数据处理工具等多种实用函数。

详细文档请参考 [@vakao-ui/utils 文档](./packages/utils/README.md)

## 开发

### 安装依赖

```bash
pnpm install
```

## 开发脚本命令

### 开发服务器

```bash
# 启动文档开发服务器
pnpm dev

# 启动示例项目开发服务器
pnpm dev:examples
```

### 构建命令

```bash
# 构建组件库（主包）
pnpm build

# 构建工具函数包
pnpm build:utils

# 构建组合式 API 包
pnpm build:hooks

# 构建文档
pnpm build:docs

# 构建依赖包（utils + hooks）
pnpm build:deps
```

### 代码质量

```bash
# 代码检查和自动修复
pnpm lint

# 代码格式化
pnpm format
```

### 工具命令

```bash
# 生成颜色配置文件
pnpm generate:colors

# 测试桌面通知功能
pnpm test:notification
```

### 部署文档

#### 自动部署（推荐）

项目已配置 GitHub Actions 自动部署，推送到 `main` 分支时会自动构建并部署文档到 GitHub Pages。

访问地址：https://rouarn.github.io/vakao-ui/

#### 手动部署命令

```bash
# 构建并部署文档到 GitHub Pages
pnpm deploy:docs

# 使用 GitHub Pages 策略部署
pnpm deploy:github-pages

# 仅部署（不发布包）
pnpm deploy:only

# 交互式部署
pnpm deploy:interactive

# 本地预览构建后的文档
pnpm deploy:preview
```

详细部署说明请参考 [DEPLOY.md](./scripts/docs/DEPLOY.md)

### 依赖管理

项目提供了智能的依赖切换功能，用于在开发和部署环境之间切换 `vakao-ui` 依赖：

```bash
# 切换到开发模式并重新安装依赖
# 使用私有 npm 仓库中的 vakao-ui@0.0.1
pnpm run deps:dev

# 切换到部署模式并重新安装依赖
# 使用本地 workspace 中的 vakao-ui@workspace:*
pnpm run deps:deploy

# 仅切换依赖配置（不重新安装依赖）
pnpm run deps:switch

# 查看当前依赖状态
pnpm run deps:status
```

**使用场景：**

- **开发模式** (`deps:dev`)：在本地开发时使用私有 npm 仓库中已发布的 `vakao-ui` 包
- **部署模式** (`deps:deploy`)：在 GitHub Actions 等 CI/CD 环境中使用本地 workspace 依赖

这种设计解决了 monorepo 项目中 `examples` 目录在不同环境下的依赖引用问题，确保开发和部署的一致性。

### 发布组件库

#### 基础发布命令

```bash
# 交互式发布（推荐）
pnpm publish

# 显示发布帮助信息
pnpm publish:help

# 测试发布流程（不会真正发布到 npm）
pnpm publish:dry-run
```

#### 单包发布

```bash
# 发布主组件包
pnpm publish:main
pnpm publish:main:dry-run

# 发布组合式 API 包
pnpm publish:hooks
pnpm publish:hooks:dry-run

# 发布工具函数包
pnpm publish:utils
pnpm publish:utils:dry-run
```

#### 批量发布

```bash
# 发布所有包（main, hooks, utils）
pnpm publish:all
pnpm publish:all:dry-run

# 同步所有包版本号
pnpm publish:sync
pnpm publish:sync:dry-run
```

发布过程会自动执行以下步骤：

1. 询问新版本号
2. 更新 package.json 中的版本号
3. 构建组件库
4. 准备发布文件
5. 发布到 npm
6. 发送桌面通知（成功/失败状态）

**智能通知功能：**

- 🖥️ 桌面通知：发布和部署完成时自动发送系统通知
- 📧 邮件通知：支持配置邮件通知（可选）
- 🔗 Webhook 通知：支持集成第三方服务（可选）

详细的发布和部署说明请参考 [DEPLOY.md](./scripts/docs/DEPLOY.md)

## 目录结构

```
├── .github              # GitHub 配置
│   └── workflows        # GitHub Actions 工作流
├── .vscode              # VS Code 配置
├── docs                 # 文档目录
│   ├── .vitepress       # VitePress 配置
│   ├── components       # 组件文档
│   ├── guide            # 指南文档
│   ├── hooks            # Hooks 文档
│   ├── utils            # 工具函数文档
│   └── public           # 静态资源
├── examples             # 示例项目
│   ├── src              # 示例源码
│   ├── public           # 示例静态资源
│   └── package.json     # 示例项目配置
├── packages             # 组件库源码
│   ├── components       # 组件目录
│   ├── hooks            # 组合式 API
│   ├── styles           # 样式文件
│   ├── types            # 类型定义
│   ├── utils            # 工具函数
│   └── package.json     # 主包配置
├── public               # 公共静态资源
├── scripts              # 构建和发布脚本
│   ├── core             # 核心发布引擎
│   ├── deps             # 依赖管理脚本
│   ├── docs             # 文档和说明
│   ├── extensions       # 扩展功能
│   ├── utils            # 工具函数
│   └── publish.js       # 命令行发布脚本
├── .env.example         # 环境变量示例
├── .gitignore           # Git 忽略文件
├── .npmrc               # npm 配置
├── .prettierrc          # Prettier 配置
├── eslint.config.js     # ESLint 配置
├── package.json         # 项目配置
├── pnpm-lock.yaml       # 依赖锁定文件
├── pnpm-workspace.yaml  # pnpm 工作空间配置
├── resolver.ts          # 组件解析器
├── tsconfig.json        # TypeScript 配置
└── LICENSE              # 许可证文件
```

## 许可证

[MIT](./LICENSE)
