# 安装

## 环境支持

Vakao UI 需要 Node.js 版本 >= 16。

## 版本

Vakao UI 目前还处于开发中，版本为 0.0.4。

## 使用包管理器

我们建议您使用包管理器（如 NPM、Yarn 或 pnpm）安装 Vakao UI，然后您就可以使用打包工具，例如 Vite 或 webpack。

```bash
# 选择一个你喜欢的包管理器

# NPM
$ npm install vakao-ui --save

# Yarn
$ yarn add vakao-ui

# pnpm
$ pnpm add vakao-ui
```

## 开发环境配置

如果您需要参与 Vakao UI 的开发或使用发布脚本，可以配置以下环境变量：

### 通知系统配置

项目集成了智能通知系统，支持多种通知方式：

- 🖥️ **桌面通知**: 自动启用，无需配置
- 📧 **邮件通知**: 可选配置
- 🔗 **Webhook 通知**: 可选配置

### 环境变量配置

在项目根目录创建 `.env` 文件（可参考 `.env.example`）：

```bash
# 邮件通知配置（可选）
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=admin@company.com

# Webhook 通知配置（可选）
WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# GitHub 集成配置（可选）
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# NPM 私有仓库配置（可选）
NPM_REGISTRY=https://your-private-registry.com/
```

### 测试桌面通知

安装完成后，您可以测试桌面通知功能：

```bash
# 测试桌面通知
pnpm run test:notification

# 或者手动测试
node -e "const notifier = require('node-notifier'); notifier.notify({title: '测试通知', message: '桌面通知功能正常', sound: true});"
```

## 故障排除

### 桌面通知问题

如果桌面通知无法正常显示：

1. 确认 `node-notifier` 依赖已安装：
   ```bash
   pnpm list node-notifier
   ```

2. 检查系统通知权限设置

3. 在 Windows 系统中，确保通知服务已启用

### 权限问题

如果遇到权限相关问题，请确保：

- Node.js 有足够的文件系统权限
- 网络连接正常（用于下载依赖和发布）
- 如使用私有 NPM 仓库，确保认证配置正确
