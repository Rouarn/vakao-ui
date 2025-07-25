# Vakao UI 项目规则

## 1. 项目概述

Vakao UI 是一个基于 Vue 3 + TypeScript 的现代化组件库，致力于提供高质量、易用性强的 UI 组件。项目采用 Monorepo 架构，使用 pnpm workspace 管理多包依赖，支持按需导入和 Tree Shaking。

### 1.1 技术栈

- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **包管理**：pnpm workspace
- **样式**：SCSS + CSS Variables
- **图标**：Iconify
- **文档**：VitePress
- **代码规范**：ESLint + Prettier

### 1.2 项目结构

```
vakao-ui/
├── docs/                 # 文档站点
├── packages/             # 核心包
│   ├── components/       # 组件库
│   ├── hooks/           # 组合式函数
│   ├── utils/           # 工具函数
│   ├── styles/          # 样式文件
│   └── types/           # 类型定义
├── scripts/             # 构建脚本
└── .trae/              # 项目规则
```

## 2. 代码规范

### 2.1 命名规范

#### 组件命名

- 组件名使用 PascalCase，以 `Vk` 前缀开头
- 示例：`VkButton`、`VkInput`、`VkMessageBox`
- 组件文件夹结构：`VkComponentName/src/index.vue`

#### 文件命名

- Vue 组件文件：`index.vue`
- 类型定义文件：`types.ts`
- 样式文件：`vk-component-name.scss`
- 测试文件：`component-name.test.ts`

#### 变量命名

- 使用 camelCase
- Props 使用 camelCase
- 事件名使用 kebab-case
- CSS 类名使用 BEM 规范：`vk-component__element--modifier`

### 2.2 TypeScript 规范

#### Props 定义

```typescript
// 统一使用 defineProps 和常量定义
export const componentProps = {
  size: {
    type: String as PropType<ComponentSize>,
    default: "medium",
  },
} as const;

// 导出类型
export type ComponentProps = ExtractPropTypes<typeof componentProps>;
```

#### Emits 定义

```typescript
// 统一使用常量定义
export const componentEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
  change: (value: string) => typeof value === "string",
} as const;

// 导出类型
export type ComponentEmits = ExtractPublicPropTypes<typeof componentEmits>;
```

### 2.3 Vue 组件规范

#### 组件结构

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 1. 导入
import { computed, ref } from "vue";
import { componentProps, componentEmits } from "./types";

// 2. Props 和 Emits
const props = defineProps(componentProps);
const emit = defineEmits(componentEmits);

// 3. 响应式数据
const state = ref();

// 4. 计算属性
const computedValue = computed(() => {});

// 5. 方法
const handleClick = () => {};

// 6. 生命周期
// 7. 暴露给父组件的方法
defineExpose({
  focus: () => {},
});
</script>

<style lang="scss">
@use "../../../styles/mixins.scss" as *;
@use "../../../styles/variables.scss" as *;

.vk-component {
  // 样式内容
}
</style>
```

## 3. 组件设计原则

### 3.1 API 设计

- **一致性**：相同功能的 Props 在不同组件中保持一致的命名和类型
- **可预测性**：API 行为应该符合用户直觉
- **可扩展性**：为未来功能扩展预留空间
- **向后兼容**：新版本应保持向后兼容

### 3.2 Props 设计

- 必需的 Props 应该尽可能少
- 提供合理的默认值
- 使用 TypeScript 严格类型检查
- 支持响应式更新

### 3.3 事件设计

- 事件名使用动词形式：`click`、`change`、`input`
- 提供必要的事件参数
- 支持事件修饰符

### 3.4 插槽设计

- 提供默认插槽用于主要内容
- 命名插槽使用描述性名称
- 提供插槽作用域参数

## 4. 样式规范

### 4.1 CSS 架构

- 使用 SCSS 预处理器
- 采用 BEM 命名规范
- 使用 CSS 变量支持主题定制

### 4.2 样式组织

```scss
// 1. 导入
@use "../../../styles/mixins.scss" as *;
@use "../../../styles/variables.scss" as *;

// 2. 组件根样式
.vk-component {
  // 基础样式

  // 3. 元素样式
  &__element {
    // 元素样式
  }

  // 4. 修饰符样式
  &--modifier {
    // 修饰符样式
  }

  // 5. 状态样式
  &.is-disabled {
    // 状态样式
  }
}
```

### 4.3 主题变量

- 使用 CSS 自定义属性
- 变量命名：`--vk-component-property`
- 支持暗色主题

## 5. 图标规范

### 5.1 图标系统

- 优先使用 Iconify 图标库
- 图标格式：`mdi:icon-name`
- 支持自定义 SVG 图标

### 5.2 图标使用

```vue
<!-- Iconify 图标 -->
<VkIcon icon="mdi:check-circle" />

<!-- 自定义 SVG -->
<VkIcon src="/path/to/icon.svg" />
```

## 6. 文档规范

### 6.1 组件文档结构

1. 组件描述
2. 基础用法
3. 高级用法
4. API 文档
5. 主题定制

### 6.2 示例代码

- 提供完整可运行的示例
- 包含 HTML、JavaScript 和 CSS
- 示例应该简洁明了

### 6.3 API 文档

- Props 表格：参数、说明、类型、可选值、默认值
- Events 表格：事件名、说明、参数
- Slots 表格：插槽名、说明、作用域参数
- Methods 表格：方法名、说明、参数、返回值

### 6.4 文档编写注意事项

#### 6.4.1 导入路径规范

**文档示例代码中的导入**：

- 在 `<Demo>` 组件的 `<template #code>` 中展示给用户的代码，应使用用户实际安装后的导入路径
- 组件导入：`import { VkMessageBox } from "vakao-ui"`
- 样式导入：`import 'vakao-ui/style.css'`

**文档内部实际使用**：

- 在文档的 `<script setup>` 中，使用开发环境的导入路径
- 组件导入：`import { VkMessageBox } from "@vakao-ui/components"`
- 样式导入：根据实际文档环境配置

#### 6.4.2 组件标签使用规范

**支持的组件标签格式**：

- PascalCase：`<VkButton></VkButton>`、`<VkMessageBox></VkMessageBox>`
- kebab-case：`<vk-button></vk-button>`、`<vk-message-box></vk-message-box>`

**不支持的格式**：

- 全大写：`<VKBUTTON></VKBUTTON>`、`<VKMESSAGEBOX></VKMESSAGEBOX>`

#### 6.4.4 文档一致性要求

- 示例代码必须与用户实际使用场景保持一致
- 确保所有示例都能在用户环境中直接运行
- 区分开发环境和生产环境的不同配置

## 7. 测试规范

### 7.1 单元测试

- 使用 Vitest 测试框架
- 测试覆盖率不低于 80%
- 测试文件命名：`component-name.test.ts`

### 7.2 测试内容

- Props 验证
- 事件触发
- 插槽渲染
- 边界情况

## 8. 版本管理

### 8.1 语义化版本

- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 8.2 变更日志

- 记录每个版本的变更内容
- 分类：新增、修改、修复、移除
- 提供迁移指南

## 9. 依赖管理

### 9.1 工作空间配置

项目使用 pnpm workspace 管理 Monorepo，配置文件：`pnpm-workspace.yaml`

```yaml
packages:
  - "packages/*"
  - "docs"
```

### 9.2 依赖分类

**核心依赖**：

- `@iconify/vue`：图标系统
- `vue`：框架（peerDependency）

**开发依赖**：

- `@typescript-eslint/*`：TypeScript ESLint 支持
- `eslint`、`prettier`：代码质量工具
- `typescript`：类型检查
- `vite`、`vite-plugin-dts`：构建工具

**工作空间依赖**：

- `@vakao-ui/components`
- `@vakao-ui/hooks`
- `@vakao-ui/utils`

### 9.3 依赖安装

```bash
# 安装所有依赖
pnpm install

# 为特定包添加依赖
pnpm add <package> --filter @vakao-ui/components

# 添加开发依赖到根目录
pnpm add -D <package> -w
```

## 10. 构建和发布

### 10.1 构建流程

1. 代码检查（ESLint + Prettier）
2. 类型检查（TypeScript）
3. 单元测试（待实现）
4. 构建产物（UMD + ESM + 类型声明）
5. 文档生成

### 10.2 构建产物

```
dist/
├── vakao-ui.es.js      # ESM 格式
├── vakao-ui.umd.js     # UMD 格式
├── style.css           # 样式文件
└── types/              # 类型声明文件
    ├── index.d.ts
    └── resolver.d.ts
```

### 10.3 发布流程

1. 版本号更新
2. 变更日志更新
3. 构建验证（`pnpm build`）
4. 发布预检（`pnpm publish:dry-run`）
5. NPM 发布（`pnpm publish:only`）
6. 文档部署（GitHub Actions）

## 11. 代码审查

### 11.1 审查要点

- 代码规范遵循
- API 设计合理性
- 性能影响
- 向后兼容性
- 文档完整性

### 11.2 审查流程

1. 自测验证
2. 同行评审
3. 集成测试
4. 合并主分支

## 12. 性能优化

### 12.1 优化原则

- 按需加载
- Tree Shaking 支持
- 最小化包体积
- 运行时性能优化

### 12.2 性能监控

- Bundle 大小监控
- 渲染性能测试
- 内存泄漏检查

### 12.3 构建优化

**Vite 配置优化**：

- 启用 Tree Shaking
- CSS 代码分割：`cssCodeSplit: false`（统一样式文件）
- 生成 Source Map：便于调试
- 外部化 Vue：减少包体积

**类型声明优化**：

- 使用 `vite-plugin-dts` 生成类型声明
- 路径别名处理：确保类型导入正确
- 排除内部依赖：避免类型污染

## 13. 无障碍性

### 13.1 可访问性要求

- 支持键盘导航
- 提供 ARIA 属性
- 支持屏幕阅读器
- 颜色对比度符合标准

### 13.2 实现指南

- 使用语义化 HTML
- 提供焦点管理
- 支持高对比度模式

## 14. 国际化

- 当前项目暂不支持国际化。
- 未来可考虑使用 Vue I18n 实现多语言支持。

## 15. 贡献指南

### 15.1 贡献流程

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request
5. 代码审查
6. 合并代码

### 15.2 提交规范

- 使用 Conventional Commits
- 格式：`type(scope): description`
- 类型：feat、fix、docs、style、refactor、test、chore

### 15.3 开发环境设置

```bash
# 1. 克隆项目
git clone <repository-url>
cd vakao-ui

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 运行代码检查
pnpm lint
pnpm format
```

## 16. 工具配置

### 16.1 开发工具

- **IDE**：VS Code（推荐）
- **代码格式化**：Prettier
- **代码检查**：ESLint + @typescript-eslint
- **类型检查**：TypeScript
- **构建工具**：Vite + vite-plugin-dts
- **包管理器**：pnpm

### 16.2 配置文件

**注意**：当前项目配置通过 package.json 管理，未使用独立配置文件。

- `package.json`：包含 ESLint 和 Prettier 配置
- `tsconfig.json`：TypeScript 配置
- `packages/vite.config.ts`：构建配置
- `pnpm-workspace.yaml`：工作空间配置

### 16.3 脚本命令

```bash
# 开发
pnpm dev              # 启动文档开发服务器

# 构建
pnpm build            # 构建组件库
pnpm build:docs       # 构建文档

# 代码质量
pnpm lint             # ESLint 检查和修复
pnpm format           # Prettier 格式化

# 发布
pnpm publish:dry-run  # 模拟发布
pnpm publish:only     # 发布到 npm
```

### 16.4 IDE 配置建议

**VS Code 扩展**：

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier - Code formatter
- SCSS IntelliSense

**工作区设置**：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["vue", "typescript", "javascript"]
}
```

---

**注意**：本规则文档会根据项目发展持续更新，所有团队成员都应该遵循这些规范，确保代码质量和项目的可维护性。
