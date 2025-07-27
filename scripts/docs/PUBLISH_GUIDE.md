# Vakao UI 发布指南

本指南详细介绍了如何使用新版 Vakao UI 统一发布系统来发布和部署包。新系统采用模块化架构，集成了智能通知、扩展系统和多种部署策略。

## 环境准备

### 安装依赖

```bash
pnpm install
```

### 私有制品仓库配置

如果您使用私有 npm 仓库，请配置相应的认证信息：

```bash
# 配置私有仓库
npm config set registry https://your-private-registry.com/
npm config set //your-private-registry.com/:_authToken your-auth-token
```

### 通知系统配置

新版系统集成了智能通知功能，支持多种通知方式。在项目根目录创建 `.env` 文件（可参考 `.env.example`）：

```bash
# 邮件通知配置（可选）
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@vakao-ui.com
NOTIFICATION_EMAIL=admin@company.com

# Webhook 通知配置（可选）
WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# GitHub 集成配置（可选）
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**通知方式说明：**

- 🖥️ **桌面通知**：自动启用，无需配置，支持 Windows/macOS/Linux
- 📧 **邮件通知**：可选配置，支持 SMTP 协议
- 🔗 **Webhook 通知**：可选配置，支持 Slack、Discord 等第三方服务

#### 设置环境变量（传统方式）

如果您需要使用传统的环境变量配置方式：

```bash
# 私有制品仓库地址
NPM_REGISTRY=http://your-private-registry.com/repository/npm-private/

# 认证令牌（可选，如果仓库需要认证）
NPM_TOKEN=your-auth-token
```

#### 配置 npm 认证

**方法一：使用 .npmrc 文件**

在项目根目录创建 `.npmrc` 文件：

```
registry=http://your-private-registry.com/repository/npm-private/
//your-private-registry.com/repository/npm-private/:_authToken=your-auth-token
```

**方法二：使用 npm login**

```bash
npm login --registry=http://your-private-registry.com/repository/npm-private/
```

**方法三：使用 npm config**

```bash
npm config set registry http://your-private-registry.com/repository/npm-private/
npm config set //your-private-registry.com/repository/npm-private/:_authToken your-auth-token
```

## 发布流程

### 统一发布系统 (推荐)

Vakao UI 现在使用统一的发布系统，采用模块化架构，集成了扩展系统和智能通知功能，提供更强大和便捷的发布管理功能。

#### 交互式发布（推荐）

```bash
node scripts/publish.js
```

运行发布脚本后，系统会引导您完成以下步骤：

1. **选择发布模式**
   - 单个包发布
   - 批量发布
   - 版本同步
   - 仅部署模式

2. **选择要发布的包**
   - main（主包）
   - hooks（组合式函数）
   - utils（工具函数）

3. **设置版本号**
   - 自动检测当前版本
   - 支持语义化版本控制
   - 可选择预发布版本
   - 智能版本同步

4. **确认发布信息**
   - 显示发布计划
   - 确认版本变更
   - 开始发布流程
   - 实时进度显示

#### 命令行参数发布

对于自动化场景，支持丰富的命令行参数：

**发布指定包：**

```bash
# 发布多个包
node scripts/publish.js --packages hooks,utils

# 发布单个包
node scripts/publish.js --package hooks
```

**测试模式：**

```bash
node scripts/publish.js --dry-run
```

**同步版本号：**

```bash
node scripts/publish.js --sync-version
```

**仅部署（不发布包）：**

```bash
node scripts/publish.js --deploy-only
```

**指定部署策略：**

```bash
node scripts/publish.js --deploy-strategy github-pages
node scripts/publish.js --deploy-strategy legacy-docs
```

**组合使用：**

```bash
node scripts/publish.js --package main --deploy --deploy-strategy github-pages
```

**查看帮助：**

```bash
node scripts/publish.js --help
```

#### NPM 脚本快捷方式

为了方便使用，项目提供了预定义的 npm 脚本：

**交互式发布：**

```bash
npm run publish
```

**发布单个包：**

```bash
# 发布主包（组件库）
npm run publish:main
npm run publish:main:dry-run

# 发布 hooks 包
npm run publish:hooks
npm run publish:hooks:dry-run

# 发布 utils 包
npm run publish:utils
npm run publish:utils:dry-run
```

**批量发布：**

```bash
# 发布所有包
npm run publish:all
npm run publish:all:dry-run

# 同步版本号发布
npm run publish:sync
npm run publish:sync:dry-run
```

**测试模式：**

```bash
npm run publish:dry-run
```

**仅部署：**

```bash
npm run deploy:only
```

**测试桌面通知：**

```bash
npm run test:notification
```

### 新系统特性

#### 统一入口

- 所有发布操作通过单一脚本 `scripts/publish.js` 完成
- 支持交互式和命令行两种使用方式
- 提供丰富的配置选项和参数
- 集成扩展系统，支持自定义功能

#### 模块化架构

- **发布引擎（PublishEngine）**：负责包的构建和发布
- **部署引擎（DeploymentEngine）**：负责文档部署和多策略支持
- **扩展管理器（ExtensionManager）**：管理扩展生命周期和钩子系统
- **交互界面（InteractiveInterface）**：提供用户友好的交互体验

#### 扩展系统

- **插件化架构**：支持自定义扩展开发
- **钩子机制**：beforeDeploy、afterDeploy、onError 等生命周期钩子
- **内置扩展**：
  - GitHub 集成扩展：检查未推送提交、自动创建 Release
  - 通知扩展：多种通知方式支持
  - 传统部署扩展：兼容原有部署流程
- **扩展目录**：`scripts/extensions/` 和 `scripts/plugins/`（别名）

#### 批量发布

- 支持一次性发布多个包
- 智能依赖关系处理和排序
- 并行构建优化
- 发布结果统计和报告

#### 版本同步

- 自动同步所有包的版本号
- 支持语义化版本控制
- 版本冲突检测和解决
- 智能版本号建议

#### 测试模式

- `--dry-run` 参数支持
- 模拟发布流程，不实际发布
- 验证配置和依赖
- 测试通知功能

#### 私有仓库

- 支持私有 npm 仓库
- 灵活的认证配置
- 多仓库支持
- 自动仓库检测

#### 交互式界面

- 美观的命令行界面
- 实时进度显示
- 错误信息友好提示
- ASCII 艺术字横幅
- 彩色日志输出

#### 智能通知系统

- **桌面通知**：
  - 自动检测部署状态并发送相应通知
  - 支持 Windows、macOS 和 Linux 系统
  - 通过 `node-notifier` 库实现跨平台支持
  - 部署失败时显示错误详情
  - 自定义应用名称和图标
- **邮件通知**：
  - 支持 SMTP 协议
  - HTML 格式邮件模板
  - 可配置发送方和接收方
- **Webhook 通知**：
  - 支持 Slack、Discord 等第三方服务
  - JSON 格式数据推送
  - 可配置请求方法和头部
- **通知触发时机**：
  - 发布成功/失败
  - 部署成功/失败
  - 错误处理

#### 部署策略

- **GitHub Pages**：自动部署到 GitHub Pages
- **Legacy Docs**：兼容传统文档部署方式
- **智能策略选择**：根据发布结果自动选择合适的部署策略
- **部署结果验证**：自动检查部署状态和可访问性

## 发布步骤详解

### 1. 选择发布模式

运行发布脚本后，系统会提供以下选项：

- **交互式选择**: 手动选择要发布的包
- **全部发布**: 发布所有可用的包
- **指定包发布**: 通过命令行参数指定包

### 2. 版本管理

系统支持两种版本管理模式：

- **同步版本**: 所有包使用相同的版本号
- **独立版本**: 每个包可以有不同的版本号

### 3. 构建和发布

对于每个选中的包，系统会：

1. 检查当前版本
2. 提示输入新版本号
3. 更新 package.json
4. 执行构建命令
5. 准备发布文件
6. 发布到制品仓库

## 可发布的包

当前支持发布的包：

- **vakao-ui**: 组件库主包（包含所有组件）
- **@vakao-ui/hooks**: Vue 3 组合式函数库
- **@vakao-ui/utils**: 通用工具函数库

## 版本规范

建议遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**: 不兼容的 API 修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

示例：

- `1.0.0` → `1.0.1` (修复 bug)
- `1.0.1` → `1.1.0` (新增功能)
- `1.1.0` → `2.0.0` (破坏性更改)

## 测试模式

在正式发布前，建议使用测试模式验证：

```bash
node scripts/publish.js --dry-run
```

测试模式会执行所有步骤但不会实际发布，用于：

- 验证构建过程
- 检查版本号
- 确认发布配置

## 故障排除

### 私有仓库相关问题

**问题1: 认证失败**

```bash
# 检查环境变量
echo $NPM_REGISTRY
echo $NPM_TOKEN

# 重新配置认证
npm login --registry=http://your-private-registry.com/repository/npm-private/
```

**问题2: 仓库连接失败**

```bash
# 测试仓库连接
npm ping --registry=http://your-private-registry.com/repository/npm-private/

# 检查网络和防火墙设置
curl -I http://your-private-registry.com/repository/npm-private/
```

**问题3: 重新配置认证**

```bash
# 清除现有配置
npm config delete registry
npm config delete //your-private-registry.com/repository/npm-private/:_authToken

# 重新设置
npm config set registry http://your-private-registry.com/repository/npm-private/
npm login --registry=http://your-private-registry.com/repository/npm-private/
```

### 常见问题

**问题1: 版本号已存在**

- 检查远程仓库中的版本
- 使用 `--sync-version` 参数同步版本
- 使用更高的版本号
- 确认是否需要更新现有版本

**问题2: 构建失败**

- 检查依赖是否安装完整：`pnpm install`
- 确认构建命令是否正确
- 清理缓存：`pnpm run clean`
- 重新安装依赖：`rm -rf node_modules && pnpm install`
- 查看详细错误信息和构建日志

**问题3: 权限不足**

- 确认账户有发布权限：`npm whoami`
- 检查包名是否被占用
- 检查包的 `publishConfig` 配置
- 联系仓库管理员

**问题4: 输入问题（Windows 环境）**

- 如果在交互式模式下出现输入重复或删除键异常
- 运行测试工具验证：`node scripts/test-input.js`
- 使用 PowerShell 或 Git Bash
- 确保终端支持 UTF-8 编码
- 更新到最新版本的 Node.js
- 问题已在 v2.0.0 中修复，使用优化的 readline 配置

**问题5: 桌面通知问题**

_通知未显示：_

- 确认 `node-notifier` 依赖已安装：`pnpm list node-notifier`
- 检查系统通知权限设置
- 验证通知扩展是否正确加载
- 测试桌面通知功能：`pnpm run test:notification`
- 在 Windows 系统中，确保通知服务已启用

_部署失败时通知未触发：_

- 确保错误处理流程正确传播错误
- 检查 `onError` 钩子是否正确注册
- 验证部署引擎的错误处理逻辑
- 查看扩展加载日志

**问题6: 扩展系统问题**

_扩展未加载：_

- 检查文件路径和命名
- 确保扩展类正确导出
- 检查控制台错误信息
- 验证扩展目录权限

_钩子未执行：_

- 确保在 `initialize` 方法中注册了钩子
- 检查钩子名称是否正确
- 确保钩子方法存在且可调用
- 查看扩展管理器日志

_扩展报错：_

- 添加 try-catch 错误处理
- 检查依赖是否正确安装
- 验证配置和环境变量
- 查看详细错误堆栈

**问题7: 部署问题**

_GitHub Pages 部署失败：_

- 检查 GitHub 仓库权限
- 验证 Git 状态和未推送的提交
- 确认 `gh-pages` 分支状态
- 检查构建产物是否正确生成

_部署策略选择错误：_

- 使用 `--deploy-strategy` 参数指定策略
- 检查可用的部署策略列表
- 验证策略配置是否正确

**问题8: 调试模式**

启用详细日志进行问题诊断：

```bash
# 启用详细日志
DEBUG=* node scripts/publish.js

# 测试模式（不实际发布）
node scripts/publish.js --dry-run

# 查看帮助信息
node scripts/publish.js --help
```

## 最佳实践

### 发布前检查

1. **代码质量**
   - 运行测试：`pnpm test`
   - 代码检查：`pnpm run lint`
   - 类型检查：`pnpm run type-check`
   - 构建验证：`pnpm run build`

2. **版本管理**
   - 遵循语义化版本控制
   - 更新 CHANGELOG.md
   - 确认版本号递增正确
   - 使用 `--sync-version` 保持版本一致性

3. **依赖检查**
   - 确认所有依赖已安装：`pnpm install`
   - 检查依赖版本兼容性
   - 清理无用依赖：`pnpm prune`
   - 验证 peer dependencies

4. **Git 状态检查**
   - 确保所有更改已提交
   - 推送到远程仓库
   - 检查分支状态

### 版本管理

#### 语义化版本控制

遵循 [Semantic Versioning](https://semver.org/) 规范：

- **MAJOR**: 不兼容的 API 修改
- **MINOR**: 向下兼容的功能性新增
- **PATCH**: 向下兼容的问题修正

#### 版本号示例

```
1.0.0 -> 1.0.1 (修复 bug)
1.0.1 -> 1.1.0 (新增功能)
1.1.0 -> 2.0.0 (破坏性更改)
```

#### 版本同步策略

```bash
# 同步所有包版本
pnpm run publish:sync

# 测试版本同步
pnpm run publish:sync:dry-run
```

### 测试验证

#### 发布前测试

```bash
# 完整测试流程
pnpm run test:all

# 构建测试
pnpm run build

# 发布测试（不实际发布）
pnpm run publish:dry-run

# 测试桌面通知
pnpm run test:notification
```

#### 发布后验证

1. 检查包是否正确发布到仓库
2. 验证包的安装和使用
3. 确认文档是否正确更新
4. 验证桌面通知是否正常发送
5. 检查部署结果和可访问性

### 通知系统配置

#### 桌面通知

桌面通知默认启用，无需额外配置：

```bash
# 测试桌面通知
pnpm run test:notification
```

#### 邮件通知配置

在 `.env` 文件中配置邮件通知：

```bash
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@vakao-ui.com
NOTIFICATION_EMAIL=admin@company.com
```

#### Webhook 通知配置

配置第三方服务通知：

```bash
# Slack Webhook
WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Discord Webhook
WEBHOOK_URL=https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK
```

### 扩展开发

#### 创建自定义扩展

1. **使用模板创建**：

   ```bash
   node scripts/publish.js --create-extension my-extension
   ```

2. **手动创建**：

   ```javascript
   // scripts/extensions/my-extension.js
   class MyExtension {
     constructor(config) {
       this.name = "my-extension";
       this.version = "1.0.0";
     }

     async initialize(extensionManager) {
       extensionManager.registerHook(
         "afterDeploy",
         this.onSuccess.bind(this),
         this.name,
       );
     }

     async onSuccess(context) {
       console.log("部署成功！");
     }
   }

   module.exports = MyExtension;
   ```

#### 扩展最佳实践

1. **错误处理**：

   ```javascript
   async onDeploySuccess(context) {
     try {
       await this.doSomething();
     } catch (error) {
       console.error(`${this.name} 扩展执行失败:`, error.message);
       // 不要抛出错误，避免影响主流程
     }
   }
   ```

2. **配置管理**：

   ```javascript
   constructor(config) {
     this.config = {
       enabled: process.env.MY_EXTENSION_ENABLED !== 'false',
       apiKey: process.env.MY_API_KEY,
       timeout: parseInt(process.env.MY_TIMEOUT) || 5000
     };
   }
   ```

3. **异步操作**：
   ```javascript
   async onDeploySuccess(context) {
     const results = await Promise.allSettled([
       this.sendNotification(),
       this.updateDatabase(),
       this.callWebhook()
     ]);
   }
   ```

### 文档维护

1. **及时更新**
   - 新功能添加文档
   - API 变更更新说明
   - 示例代码保持最新
   - 扩展开发指南

2. **版本记录**
   - 维护详细的 CHANGELOG
   - 记录破坏性更改
   - 提供迁移指南
   - 扩展变更记录

3. **自动化文档**
   - 使用 JSDoc 注释
   - 自动生成 API 文档
   - 集成到发布流程

## 迁移说明

如果您之前使用的是旧版发布脚本，请按照以下步骤迁移到新的统一发布系统：

### 1. 系统升级

新版统一发布系统已集成到项目中，无需额外安装。主要变更：

- 统一入口：`scripts/publish.js`
- 模块化架构：发布引擎、部署引擎、扩展管理器
- 扩展系统：支持自定义扩展开发
- 智能通知：桌面通知、邮件、Webhook

### 2. 配置迁移

#### 环境变量配置

新系统保持向后兼容，同时支持更多配置选项：

```bash
# 基础配置（保持兼容）
NPM_REGISTRY=https://your-registry.com/
NPM_TOKEN=your-token

# 新增通知配置
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=admin@company.com
WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK

# GitHub 集成
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 包管理器迁移

推荐从 npm 迁移到 pnpm：

```bash
# 安装 pnpm
npm install -g pnpm

# 迁移依赖
rm -rf node_modules package-lock.json
pnpm install
```

### 3. 命令更新

#### 兼容性命令

所有旧命令保持兼容：

```bash
# 旧命令（仍然可用）
npm run publish:main
npm run publish:hooks
npm run publish:utils

# 推荐使用 pnpm
pnpm run publish:main
pnpm run publish:hooks
pnpm run publish:utils
```

#### 新增命令

```bash
# 统一交互式发布
pnpm run publish

# 批量发布
pnpm run publish:all

# 版本同步
pnpm run publish:sync

# 仅部署
pnpm run deploy:only

# 测试模式
pnpm run publish:dry-run

# 测试通知
pnpm run test:notification
```

### 4. 功能对比

| 功能         | 旧系统 | 新系统 | 说明            |
| ------------ | ------ | ------ | --------------- |
| 单包发布     | ✅     | ✅     | 保持兼容        |
| 批量发布     | ❌     | ✅     | 新增功能        |
| 交互式界面   | ❌     | ✅     | 美观的 CLI 界面 |
| 版本同步     | ❌     | ✅     | 智能版本管理    |
| 测试模式     | ❌     | ✅     | dry-run 支持    |
| 桌面通知     | ❌     | ✅     | 跨平台通知      |
| 邮件通知     | ❌     | ✅     | SMTP 支持       |
| Webhook 通知 | ❌     | ✅     | 第三方集成      |
| 扩展系统     | ❌     | ✅     | 插件化架构      |
| GitHub 集成  | ❌     | ✅     | 自动化工作流    |
| 部署策略     | 单一   | 多种   | 灵活的部署选项  |
| 私有仓库     | ✅     | ✅     | 增强支持        |
| 错误处理     | 基础   | 增强   | 详细错误信息    |
| 日志系统     | 简单   | 丰富   | 彩色日志输出    |

### 5. 迁移步骤

#### 步骤 1：备份配置

```bash
# 备份现有配置
cp .env .env.backup
cp package.json package.json.backup
```

#### 步骤 2：更新依赖

```bash
# 安装新依赖
pnpm install

# 验证安装
pnpm list node-notifier
```

#### 步骤 3：测试新系统

```bash
# 测试发布流程（不实际发布）
pnpm run publish:dry-run

# 测试桌面通知
pnpm run test:notification

# 测试交互式界面
node scripts/publish.js --help
```

#### 步骤 4：配置通知

```bash
# 添加通知配置到 .env
echo "NOTIFICATION_EMAIL=admin@company.com" >> .env
echo "WEBHOOK_URL=https://your-webhook-url" >> .env
```

#### 步骤 5：验证迁移

```bash
# 使用新系统发布测试包
pnpm run publish:main:dry-run

# 检查所有功能
node scripts/publish.js --help
```

### 6. 回滚方案

如果遇到问题，可以临时回滚：

```bash
# 恢复备份配置
cp .env.backup .env
cp package.json.backup package.json

# 重新安装依赖
npm install

# 使用旧命令
npm run publish:main
```

### 7. 获取帮助

- 查看详细帮助：`node scripts/publish.js --help`
- 扩展开发指南：`scripts/extensions/README.md`
- 问题反馈：GitHub Issues

新系统完全向后兼容，您可以继续使用原有的命令，同时逐步采用新功能。建议先在测试环境中验证新系统，确认无误后再在生产环境中使用。

---

如有问题，请联系 Vakao UI 团队。
