# Vakao UI 脚本系统

这是 Vakao UI 组件库的统一脚本管理系统，提供发布、部署和扩展功能。

## 📁 目录结构

```
scripts/
├── core/                          # 核心模块
│   ├── deployment-engine.js       # 部署引擎
│   ├── extension-manager.js       # 扩展管理器
│   ├── interactive.js             # 交互界面
│   ├── package-configs.js         # 包配置
│   └── publish-engine.js          # 发布引擎
├── extensions/                    # 扩展插件
│   ├── README.md                 # 扩展开发指南
│   ├── github-integration.js     # GitHub 集成
│   ├── legacy-deploy.js          # 传统部署扩展
│   └── notification.js           # 通知扩展
├── legacy/                       # 传统脚本（已废弃）
├── publish.js                    # 统一发布工具（主入口）
├── utils.js                      # 工具函数
└── README.md                     # 本文档
```

## 🚀 主要功能

### 1. 统一发布系统 (`publish.js`)

这是主要的发布工具，整合了包发布和部署功能。

#### 基本用法

```bash
# 交互式发布
node scripts/publish.js

# 发布指定包
node scripts/publish.js --package main
node scripts/publish.js --packages main,hooks,utils

# 测试模式（不实际发布）
node scripts/publish.js --dry-run

# 同步版本号
node scripts/publish.js --sync-version
```

#### 部署功能

```bash
# 仅部署（不发布包）
node scripts/publish.js --deploy-only

# 指定部署策略
node scripts/publish.js --deploy-only --deploy-strategy docs
node scripts/publish.js --deploy-only --deploy-strategy github-pages

# 发布后自动部署
node scripts/publish.js --deploy

# 跳过部署
node scripts/publish.js --skip-deploy
```

#### 可用的部署策略

- `docs`: 文档部署（默认）
- `github-pages`: GitHub Pages 部署
- `static`: 静态资源部署
- `legacy-docs`: 传统文档部署（通过扩展提供）

### 2. 兼容性部署脚本 (`deploy.js`)

为了保持向后兼容，原有的 `deploy.js` 脚本仍然可用，但会重定向到新的统一发布系统。

```bash
# 传统用法（仍然有效）
node scripts/legacy/deploy.js

# 等价于
node scripts/publish.js --deploy-only --deploy-strategy docs
```

## 🔧 核心架构

### 发布引擎 (`PublishEngine`)

负责包的发布逻辑，包括：

- 版本管理
- 依赖关系处理
- 发布流程控制
- 错误处理

### 部署引擎 (`DeploymentEngine`)

负责部署逻辑，支持：

- 多种部署策略
- 插件化架构
- 部署前检查
- 钩子函数

### 扩展管理器 (`ExtensionManager`)

提供插件化扩展能力：

- 动态加载扩展
- 生命周期管理
- 扩展间通信
- 配置管理

## 🔌 扩展系统

扩展系统允许你添加自定义功能，如通知、GitHub 集成等。详细信息请参考 [扩展开发指南](./extensions/README.md)。

### 内置扩展

1. **GitHub 集成** (`github-integration.js`)
   - 部署前检查未推送的提交
   - 部署后处理（如创建 Release）

2. **通知系统** (`notification.js`)
   - 邮件通知
   - Webhook 通知
   - 桌面通知

3. **传统部署** (`legacy-deploy.js`)
   - 提供 `legacy-docs` 部署策略
   - 兼容原有部署流程

## 📝 配置

### 包配置

包的配置在 `core/package-configs.js` 中定义，包括：

- 包名称和路径
- 构建命令
- 依赖关系
- 发布配置

### 扩展配置

扩展可以通过以下方式配置：

1. **环境变量**
2. **配置文件**
3. **命令行参数**

## 🛠️ 开发指南

### 添加新的部署策略

1. 在 `DeploymentEngine` 中注册新策略
2. 实现策略的部署逻辑
3. 添加相应的配置选项

### 创建扩展

1. 在 `extensions/` 目录下创建扩展文件
2. 实现扩展类，继承基础扩展接口
3. 注册钩子函数
4. 添加配置和文档

### 修改发布流程

1. 修改 `PublishEngine` 中的相关方法
2. 更新包配置（如需要）
3. 添加测试和文档

## 🔍 故障排除

### 常见问题

1. **发布失败**
   - 检查网络连接
   - 验证 npm 认证
   - 确认包版本号

2. **部署失败**
   - 检查 Git 状态
   - 验证 GitHub 权限
   - 确认构建产物

3. **扩展加载失败**
   - 检查扩展语法
   - 验证依赖安装
   - 查看错误日志

### 调试模式

```bash
# 启用详细日志
DEBUG=* node scripts/publish.js

# 测试模式
node scripts/publish.js --dry-run
```

## 📚 更多信息

- [扩展开发指南](./extensions/README.md)
- [API 文档](./docs/api.md)
- [更新日志](./CHANGELOG.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个脚本系统！

## 📄 许可证

本项目采用 MIT 许可证。
