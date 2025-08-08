# 依赖管理脚本

这个文件夹包含用于管理项目依赖的脚本，特别是处理 `vakao-ui` 包在不同环境下的依赖切换。

## 背景

在 monorepo 项目中，`examples` 项目需要引用 `vakao-ui` 包。但在不同的环境下，我们需要使用不同的依赖方式：

- **开发环境**: 使用私有 npm 仓库中的 `vakao-ui@0.0.1`
- **部署环境**: 使用本地 workspace 中的 `vakao-ui@workspace:*`

## 脚本说明

### `switch-deps.js`

主要的依赖切换脚本，使用 ESM 语法编写。

#### 功能

- **开发模式**: 将 `examples/package.json` 中的 `vakao-ui` 依赖设置为 `"0.0.1"`
- **部署模式**: 将 `examples/package.json` 中的 `vakao-ui` 依赖设置为 `"workspace:*"`
- **状态查看**: 显示当前的依赖配置状态
- **帮助信息**: 显示使用说明

#### 使用方法

```bash
# 切换到开发模式
node scripts/deps/switch-deps.js dev

# 切换到部署模式
node scripts/deps/switch-deps.js deploy

# 查看当前状态
node scripts/deps/switch-deps.js status

# 显示帮助信息
node scripts/deps/switch-deps.js help
```

#### 便捷脚本

在根目录的 `package.json` 中已经配置了便捷脚本：

```bash
# 切换到开发模式并重新安装依赖
pnpm run deps:dev

# 切换到部署模式并重新安装依赖
pnpm run deps:deploy

# 仅切换依赖（不重新安装）
pnpm run deps:switch

# 查看当前状态
pnpm run deps:status
```

## 自动化集成

### GitHub Actions

在 `.github/workflows/deploy-docs.yml` 中，部署文档时会自动切换到部署模式：

```yaml
- name: Switch to workspace dependencies
  run: |
    node scripts/deps/switch-deps.js deploy
    echo "✅ 已切换到部署模式：使用 workspace:* 依赖"
```

这确保了在 GitHub Actions 环境中，`examples` 项目使用本地的 `vakao-ui` 包，而不是尝试从 npm 仓库下载不存在的包。

## 注意事项

1. **私有仓库配置**: 如果要在开发环境中使用私有 npm 仓库，需要正确配置 `.npmrc` 文件和认证信息。

2. **依赖安装**: 切换依赖后，建议重新运行 `pnpm install` 来确保依赖正确安装。

3. **版本控制**: 建议在提交代码前，确保 `examples/package.json` 中的依赖处于正确的状态。

## 扩展

如果需要支持更多的依赖切换场景，可以在 `switch-deps.js` 中添加新的命令和逻辑。脚本设计为易于扩展和维护。
