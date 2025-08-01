/**
 * Vakao UI 包配置文件
 *
 * 定义所有可发布包的配置信息
 *
 * @version 2.0.0
 * @author 我与夏季
 */

const fs = require("fs");
const path = require("path");

// 项目根目录路径
const PROJECT_ROOT = path.resolve(__dirname, "../..");

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
 * 包依赖关系定义
 * 用于确定发布顺序，被依赖的包需要先发布
 */
const PACKAGE_DEPENDENCIES = {
  main: ["utils", "hooks"], // 主包依赖 utils 和 hooks 包
  hooks: [], // hooks 包无依赖
  utils: [], // utils 包无依赖
  docs: ["utils", "hooks"], // 文档包依赖 utils 和 hooks 包
};

/**
 * 动态读取包的package.json文件内容
 * @param {string} packagePath - 包的路径
 * @returns {Object|null} package.json内容或null
 */
function readPackageJson(packagePath) {
  try {
    const packageJsonPath = path.join(
      PROJECT_ROOT,
      packagePath,
      "package.json",
    );
    if (fs.existsSync(packageJsonPath)) {
      const content = fs.readFileSync(packageJsonPath, "utf8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn(`无法读取 ${packagePath}/package.json:`, error.message);
  }
  return null;
}

/**
 * 包配置定义
 * 现在从真实的package.json文件中读取信息，减少硬编码
 */
const PACKAGES = {
  main: {
    // 从根目录package.json读取基本信息
    get name() {
      const pkg = readPackageJson(".");
      return pkg?.name || "vakao-ui";
    },
    get description() {
      const pkg = readPackageJson(".");
      return pkg?.description || "Vue 3 组件库 - Vakao UI";
    },
    get keywords() {
      const pkg = readPackageJson(".");
      return (
        pkg?.keywords || [
          "vue3",
          "components",
          "ui-library",
          "typescript",
          "vakao-ui",
        ]
      );
    },
    get peerDependencies() {
      const pkg = readPackageJson(".");
      return pkg?.peerDependencies || { vue: "^3.3.0" };
    },
    get author() {
      const pkg = readPackageJson(".");
      return pkg?.author || "Vakao UI Team";
    },
    get license() {
      const pkg = readPackageJson(".");
      return pkg?.license || "MIT";
    },
    get homepage() {
      const pkg = readPackageJson(".");
      return pkg?.homepage;
    },
    get repository() {
      const pkg = readPackageJson(".");
      return pkg?.repository;
    },
    // 静态配置信息
    displayName: "Main (组件库主包)",
    path: ".",
    icon: "📦",
    buildCommand: "pnpm run build",
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
    // 从packages/hooks/package.json读取基本信息
    get name() {
      const pkg = readPackageJson("packages/hooks");
      return pkg?.name || "@vakao-ui/hooks";
    },
    get description() {
      const pkg = readPackageJson("packages/hooks");
      return pkg?.description || "Vue 3 组合式函数库 - Vakao UI Hooks";
    },
    get keywords() {
      const pkg = readPackageJson("packages/hooks");
      return (
        pkg?.keywords || [
          "vue3",
          "hooks",
          "composables",
          "ui-library",
          "typescript",
          "vakao-ui",
        ]
      );
    },
    get peerDependencies() {
      const pkg = readPackageJson("packages/hooks");
      return pkg?.peerDependencies || { vue: "^3.3.0" };
    },
    get author() {
      const pkg = readPackageJson("packages/hooks");
      return pkg?.author || "Vakao UI Team";
    },
    get license() {
      const pkg = readPackageJson("packages/hooks");
      return pkg?.license || "MIT";
    },
    get homepage() {
      const pkg = readPackageJson("packages/hooks");
      return pkg?.homepage;
    },
    get repository() {
      const pkg = readPackageJson("packages/hooks");
      return pkg?.repository;
    },
    // 静态配置信息
    displayName: "Hooks (组合式函数)",
    path: "packages/hooks",
    icon: "🪝",
    buildCommand: "pnpm run build",
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
    // 从packages/utils/package.json读取基本信息
    get name() {
      const pkg = readPackageJson("packages/utils");
      return pkg?.name || "@vakao-ui/utils";
    },
    get description() {
      const pkg = readPackageJson("packages/utils");
      return pkg?.description || "Vue 3 工具函数库 - Vakao UI Utils";
    },
    get keywords() {
      const pkg = readPackageJson("packages/utils");
      return (
        pkg?.keywords || [
          "vue3",
          "utils",
          "utilities",
          "helpers",
          "ui-library",
          "typescript",
          "vakao-ui",
        ]
      );
    },
    get peerDependencies() {
      const pkg = readPackageJson("packages/utils");
      return pkg?.peerDependencies || { vue: "^3.3.0" };
    },
    get author() {
      const pkg = readPackageJson("packages/utils");
      return pkg?.author || "Vakao UI Team";
    },
    get license() {
      const pkg = readPackageJson("packages/utils");
      return pkg?.license || "MIT";
    },
    get homepage() {
      const pkg = readPackageJson("packages/utils");
      return pkg?.homepage;
    },
    get repository() {
      const pkg = readPackageJson("packages/utils");
      return pkg?.repository;
    },
    // 静态配置信息
    displayName: "Utils (工具函数)",
    path: "packages/utils",
    icon: "🛠️",
    buildCommand: "pnpm run build",
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

  docs: {
    // 从docs/package.json读取基本信息
    get name() {
      const pkg = readPackageJson("docs");
      return pkg?.name || "@vakao-ui/docs";
    },
    get description() {
      const pkg = readPackageJson("docs");
      return pkg?.description || "Vakao UI 组件库文档站点";
    },
    get keywords() {
      const pkg = readPackageJson("docs");
      return (
        pkg?.keywords || [
          "vue3",
          "docs",
          "vitepress",
          "documentation",
          "vakao-ui",
        ]
      );
    },
    get author() {
      const pkg = readPackageJson("docs");
      return pkg?.author || "Vakao UI Team";
    },
    get license() {
      const pkg = readPackageJson("docs");
      return pkg?.license || "MIT";
    },
    get homepage() {
      const pkg = readPackageJson("docs");
      return pkg?.homepage;
    },
    get repository() {
      const pkg = readPackageJson("docs");
      return pkg?.repository;
    },
    // 静态配置信息
    displayName: "Docs (文档站点)",
    path: "docs",
    icon: "📚",
    buildCommand: "pnpm run build:docs",
    // 文档包不需要发布到npm，只需要部署
    skipPublish: true,
    // 文档包支持的部署策略
    supportedDeployStrategies: ["docs", "github-pages"],
    defaultReadme: `# Vakao UI 文档

Vakao UI 组件库的官方文档站点，基于 VitePress 构建。

## 本地开发

\`\`\`bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run docs:dev

# 构建文档
pnpm run build:docs
\`\`\`

## 部署

文档会自动部署到 GitHub Pages：
- 主分支推送时自动触发部署
- 手动部署：\`node scripts/publish.js --deploy-only --deploy-strategy docs\`

## 访问地址

- 生产环境：https://rouarn.github.io/vakao-ui/
- 开发环境：http://localhost:5173

## 文档结构

- \`guide/\`: 使用指南
- \`components/\`: 组件文档
- \`hooks/\`: Hooks 文档
- \`utils/\`: 工具函数文档
`,
  },
};

/**
 * 完整配置对象
 */
const CONFIG = {
  ...PROJECT_CONFIG,
  packages: PACKAGES,
  dependencies: PACKAGE_DEPENDENCIES,
  projectRoot: undefined, // 将在运行时设置
  buildRoot: undefined, // 将在运行时设置
};

module.exports = {
  PROJECT_CONFIG,
  PACKAGES,
  PACKAGE_DEPENDENCIES,
  CONFIG,
};
