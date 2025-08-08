# 贡献指南

感谢您对 Vakao UI 的关注！我们欢迎任何形式的贡献，包括但不限于：

- 🐛 报告 Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复或新功能
- 🎨 改进设计和用户体验

## 📋 开发环境要求

在开始贡献之前，请确保您的开发环境满足以下要求：

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **Git**: 最新版本

## 🚀 快速开始

### 1. Fork 和克隆项目

```bash
# Fork 项目到您的 GitHub 账户
# 然后克隆到本地
git clone https://github.com/YOUR_USERNAME/vakao-ui.git
cd vakao-ui
```

### 2. 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

### 3. 启动开发环境

```bash
# 启动文档开发服务器
pnpm run docs:dev

# 启动示例项目
pnpm run dev

# 生成样式变量
pnpm run generate:colors
```

## 📁 项目结构

```
vakao-ui/
├── docs/                    # 文档源码
│   ├── .vitepress/         # VitePress 配置
│   ├── components/         # 组件文档
│   ├── guide/              # 使用指南
│   └── hooks/              # Hooks 文档
├── examples/               # 示例项目
├── packages/               # 核心包
│   ├── components/         # Vue 组件
│   ├── hooks/              # 组合式函数
│   ├── styles/             # 样式文件
│   ├── types/              # 类型定义
│   └── utils/              # 工具函数
└── scripts/                # 构建脚本
```

## 🛠️ 开发流程

### 创建新分支

```bash
# 从 main 分支创建新的功能分支
git checkout -b feature/your-feature-name

# 或者修复分支
git checkout -b fix/your-fix-name
```

### 开发规范

#### 组件开发

1. **组件命名**: 使用 PascalCase，以 `Vk` 前缀开头

   ```
   VkButton, VkInput, VkCard
   ```

2. **文件结构**: 每个组件应包含以下文件

   ```
   VkButton/
   ├── index.ts          # 导出文件
   ├── VkButton.vue      # 组件实现
   ├── VkButton.scss     # 组件样式
   └── types.ts          # 类型定义
   ```

3. **组件属性**: 使用 TypeScript 定义清晰的 Props 接口
   ```typescript
   interface VkButtonProps {
     type?: "primary" | "secondary" | "danger";
     size?: "small" | "medium" | "large";
     disabled?: boolean;
   }
   ```

#### 样式开发

1. **CSS 变量**: 使用项目定义的 CSS 变量

   ```scss
   .vk-button {
     background-color: var(--vk-color-primary);
     border-radius: var(--vk-border-radius-medium);
     font-size: var(--vk-font-size-base);
   }
   ```

2. **响应式设计**: 使用断点变量

   ```scss
   @media (min-width: var(--vk-breakpoint-medium)) {
     .vk-button {
       padding: var(--vk-spacing-3) var(--vk-spacing-4);
     }
   }
   ```

3. **样式变量生成**: 修改样式变量后运行
   ```bash
   pnpm run generate:colors
   ```

#### 工具函数开发

1. **函数命名**: 使用 camelCase
2. **类型安全**: 提供完整的 TypeScript 类型定义
3. **单元测试**: 为每个工具函数编写测试

#### Hooks 开发

1. **命名规范**: 以 `use` 开头
2. **返回值**: 使用对象形式返回多个值
3. **响应式**: 正确使用 Vue 3 的响应式 API

### 代码质量

#### 代码格式化

```bash
# 格式化代码
pnpm run format

# 检查代码规范
pnpm run lint
```

#### 类型检查

```bash
# TypeScript 类型检查
pnpm run type-check
```

#### 测试

```bash
# 运行单元测试
pnpm run test

# 运行测试覆盖率
pnpm run test:coverage
```

## 📝 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 提交类型

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式化（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 提交示例

```bash
# 新功能
git commit -m "feat(button): add loading state support"

# 修复 Bug
git commit -m "fix(input): resolve focus issue on mobile"

# 文档更新
git commit -m "docs(contributing): add development guidelines"

# 样式更新
git commit -m "style: update color variables naming convention"
```

## 🔄 Pull Request 流程

### 1. 提交 PR 前检查

- [ ] 代码已通过 lint 检查
- [ ] 代码已通过类型检查
- [ ] 相关测试已通过
- [ ] 文档已更新（如需要）
- [ ] 变更日志已更新（如需要）

### 2. PR 标题格式

使用与提交信息相同的格式：

```
feat(button): add loading state support
```

### 3. PR 描述模板

```markdown
## 📋 变更类型

- [ ] 新功能
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 样式更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 测试
- [ ] 其他

## 📝 变更描述

简要描述此次变更的内容和原因。

## 🔗 相关 Issue

关闭 #issue_number

## 📸 截图（如适用）

如果是 UI 相关的变更，请提供截图。

## ✅ 检查清单

- [ ] 代码已通过 lint 检查
- [ ] 代码已通过类型检查
- [ ] 相关测试已通过
- [ ] 文档已更新
- [ ] 变更日志已更新
```

## 🐛 报告 Bug

请使用 [Issue 模板](https://github.com/your-org/vakao-ui/issues/new?template=bug_report.md) 报告 Bug，并提供：

- 详细的问题描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息（浏览器、Node.js 版本等）
- 相关截图或代码片段

## 💡 功能建议

请使用 [Feature Request 模板](https://github.com/your-org/vakao-ui/issues/new?template=feature_request.md) 提出功能建议，并说明：

- 功能描述
- 使用场景
- 期望的 API 设计
- 是否愿意实现此功能

## 📚 文档贡献

文档同样重要！您可以：

- 修复文档中的错误
- 改进现有文档的清晰度
- 添加使用示例
- 翻译文档到其他语言

### 文档开发

```bash
# 启动文档开发服务器
pnpm run docs:dev

# 构建文档
pnpm run docs:build
```

## 🎯 发布流程

发布由维护者负责，流程如下：

1. 更新版本号
2. 更新变更日志
3. 创建 Git 标签
4. 发布到 npm
5. 部署文档

## 🤝 社区准则

- 保持友善和尊重
- 欢迎新手贡献者
- 提供建设性的反馈
- 遵循项目的代码规范
- 及时响应评论和反馈

## 📞 联系我们

如果您有任何问题或建议，可以通过以下方式联系我们：

- 创建 [GitHub Issue](https://github.com/your-org/vakao-ui/issues)
- 发送邮件到 [your-email@example.com](mailto:your-email@example.com)
- 加入我们的 [Discord 社区](https://discord.gg/your-invite)

## 📄 许可证

通过贡献代码，您同意您的贡献将在与项目相同的 [MIT 许可证](./LICENSE) 下发布。

---

再次感谢您对 Vakao UI 的贡献！🎉
