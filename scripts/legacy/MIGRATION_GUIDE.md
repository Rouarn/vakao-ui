# 发布系统迁移说明

## 概述

Vakao UI 发布系统已升级到 v2.0，提供了更强大和统一的发布管理功能。

## 新系统特性

- 🎯 **统一发布入口**: 使用单一脚本管理所有包的发布
- 🔧 **模块化架构**: 核心引擎、交互界面、配置管理分离
- 📦 **批量发布**: 支持同时发布多个包
- 🔄 **版本同步**: 可选择同步所有包的版本号
- 🧪 **测试模式**: 完整的 dry-run 支持
- 🏢 **私有仓库**: 完整的私有制品仓库支持
- 🎨 **交互式界面**: 友好的用户交互体验

## 新旧对比

### 旧系统 (Legacy)

```bash
# 发布 hooks 包
node scripts/publish-hooks.js

# 发布 utils 包
node scripts/publish-utils.js

# 统一发布管理器
node scripts/publish-packages.js
```

### 新系统 (v2.0)

```bash
# 交互式发布（推荐）
node scripts/publish.js

# 发布指定包
node scripts/publish.js --packages hooks,utils

# 发布单个包
node scripts/publish.js --package hooks

# 测试模式
node scripts/publish.js --dry-run

# 同步版本号
node scripts/publish.js --sync-version

# 查看帮助
node scripts/publish.js --help
```

## 迁移步骤

1. **停止使用旧脚本**: 不再使用 `publish-hooks.js`、`publish-utils.js`、`publish-packages.js`
2. **使用新脚本**: 统一使用 `publish.js` 进行所有发布操作
3. **更新 CI/CD**: 如果有自动化流程，请更新脚本路径和参数
4. **更新文档**: 更新团队文档中的发布流程说明

## 配置文件

新系统使用配置驱动的方式，主要配置文件：

- `scripts/core/package-configs.js`: 包配置定义
- `scripts/core/publish-engine.js`: 发布引擎核心
- `scripts/core/interactive.js`: 交互界面模块

## 自定义配置

如需添加新包或修改配置，请编辑 `scripts/core/package-configs.js` 文件。

## 回滚方案

如果遇到问题需要回滚到旧系统：

1. 将 `legacy/` 目录中的文件移回 `scripts/` 目录
2. 删除 `scripts/core/` 目录
3. 恢复原有的 `scripts/publish.js` 文件

## 技术支持

如有问题，请联系 Vakao UI 团队。

---

迁移时间: 2025/7/26 18:29:57
