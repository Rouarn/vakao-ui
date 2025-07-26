/**
 * Vakao UI 包配置文件
 *
 * 定义所有可发布包的配置信息
 *
 * @version 2.0.0
 * @author 我与夏季
 */

/**
 * 项目基础配置
 */
const PROJECT_CONFIG = {
  author: "我与夏季",
  email: "woyuxiaji@foxmail.com",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Rouarn/vakao-ui",
  },
  homepage: "https://rouarn.github.io/vakao-ui/",
};

/**
 * 包配置定义
 */
const PACKAGES = {
  main: {
    name: "vakao-ui",
    displayName: "Main (组件库主包)",
    path: ".",
    icon: "📦",
    description: "Vue 3 组件库 - Vakao UI",
    keywords: ["vue3", "components", "ui-library", "typescript", "vakao-ui"],
    peerDependencies: {
      vue: "^3.3.0",
    },
    defaultReadme: `# Vakao UI

一个基于 Vue 3 + TypeScript 的现代化组件库。

## 特性

- 🎯 **Vue 3 原生支持**: 基于 Vue 3 Composition API 开发
- 🔧 **TypeScript**: 完整的类型定义支持
- 📦 **按需导入**: 支持 Tree Shaking，减小打包体积
- 🎨 **主题定制**: 支持深度主题定制
- 📱 **响应式设计**: 移动端友好
- ♿ **无障碍性**: 遵循 WAI-ARIA 标准

## 安装

\`\`\`bash
npm install vakao-ui
# 或
pnpm add vakao-ui
# 或
yarn add vakao-ui
\`\`\`

## 快速开始

### 完整引入

\`\`\`typescript
import { createApp } from 'vue';
import VakaoUI from 'vakao-ui';
import 'vakao-ui/style.css';
import App from './App.vue';

const app = createApp(App);
app.use(VakaoUI);
app.mount('#app');
\`\`\`

### 按需引入

\`\`\`typescript
import { VkButton, VkInput } from 'vakao-ui';
import 'vakao-ui/style.css';

export default {
  components: {
    VkButton,
    VkInput
  }
};
\`\`\`

### 自动导入（推荐）

使用 unplugin-vue-components 实现自动导入：

\`\`\`typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VakaoUIResolver } from 'vakao-ui/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VakaoUIResolver()]
    })
  ]
});
\`\`\`

## 组件

- **基础组件**: Button、Icon、Input 等
- **表单组件**: Checkbox、Radio、Select、Switch 等
- **反馈组件**: MessageBox 等

## 工具包

- **@vakao-ui/hooks**: Vue 3 组合式函数库
- **@vakao-ui/utils**: 通用工具函数库

## 文档

访问 [Vakao UI 文档](https://internal-docs.company.com/vakao-ui/) 查看完整的组件文档和使用指南。

## 许可证

私有
`,
  },

  hooks: {
    name: "@vakao-ui/hooks",
    displayName: "Hooks (组合式函数)",
    path: "packages/hooks",
    icon: "🪝",
    description: "Vue 3 组合式函数库 - Vakao UI Hooks",
    keywords: [
      "vue3",
      "hooks",
      "composables",
      "ui-library",
      "typescript",
      "vakao-ui",
    ],
    peerDependencies: {
      vue: "^3.3.0",
    },
    defaultReadme: `# @vakao-ui/hooks

Vue 3 组合式函数库，提供一系列可复用的 Hooks。

## 安装

\`\`\`bash
npm install @vakao-ui/hooks
# 或
pnpm add @vakao-ui/hooks
# 或
yarn add @vakao-ui/hooks
\`\`\`

## 使用

\`\`\`typescript
import { useToggle, useFetch, useLocalStorage } from '@vakao-ui/hooks';

// 布尔状态切换
const [isVisible, toggle] = useToggle(false);

// 数据获取
const [data, loading, error] = useFetch('/api/users');

// 本地存储
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

## 文档

访问 [Vakao UI 文档](https://internal-docs.company.com/vakao-ui/hooks/) 查看完整的 API 文档和使用示例。

## 许可证

私有
`,
  },

  utils: {
    name: "@vakao-ui/utils",
    displayName: "Utils (工具函数)",
    path: "packages/utils",
    icon: "🛠️",
    description: "Vue 3 工具函数库 - Vakao UI Utils",
    keywords: [
      "vue3",
      "utils",
      "utilities",
      "helpers",
      "ui-library",
      "typescript",
      "vakao-ui",
    ],
    peerDependencies: {
      vue: "^3.3.0",
    },
    defaultReadme: `# @vakao-ui/utils

Vue 3 工具函数库，提供一系列实用的工具函数。

## 安装

\`\`\`bash
npm install @vakao-ui/utils
# 或
pnpm add @vakao-ui/utils
# 或
yarn add @vakao-ui/utils
\`\`\`

## 使用

\`\`\`typescript
import { deepClone, isEqual, formatDate, withInstall } from '@vakao-ui/utils';

// 深度克隆
const cloned = deepClone(originalObject);

// 深度比较
const isEqual = isEqual(obj1, obj2);

// 日期格式化
const formatted = formatDate(new Date(), 'YYYY-MM-DD');

// 组件安装器
const MyComponent = withInstall(MyComponentImpl);
\`\`\`

## 文档

访问 [Vakao UI 文档](https://internal-docs.company.com/vakao-ui/utils/) 查看完整的 API 文档和使用示例。

## 许可证

私有
`,
  },
};

/**
 * 完整配置对象
 */
const CONFIG = {
  ...PROJECT_CONFIG,
  packages: PACKAGES,
  projectRoot: undefined, // 将在运行时设置
  buildRoot: undefined, // 将在运行时设置
};

module.exports = {
  PROJECT_CONFIG,
  PACKAGES,
  CONFIG,
};
