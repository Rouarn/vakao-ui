# Vakao UI 包发布指南

本指南介绍如何发布 Vakao UI 组件库的各个包到私有制品仓库。

## 环境准备

### 1. 安装依赖

确保项目依赖已安装：
```bash
npm install
```

### 2. 私有制品仓库配置

#### 设置环境变量

在项目根目录创建 `.env` 文件或设置系统环境变量：

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

Vakao UI 现在使用统一的发布系统，提供更强大和便捷的发布管理功能。

#### 交互式发布（推荐）
```bash
node scripts/publish.js
```

#### 命令行参数发布

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

### 新系统特性

- 🎯 **统一发布入口**: 使用单一脚本管理所有包的发布
- 🔧 **模块化架构**: 核心引擎、交互界面、配置管理分离
- 📦 **批量发布**: 支持同时发布多个包
- 🔄 **版本同步**: 可选择同步所有包的版本号
- 🧪 **测试模式**: 完整的 dry-run 支持
- 🏢 **私有仓库**: 完整的私有制品仓库支持
- 🎨 **交互式界面**: 友好的用户交互体验

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
- 使用更高的版本号
- 确认是否需要更新现有版本

**问题2: 构建失败**
- 检查依赖是否安装完整
- 确认构建命令是否正确
- 查看详细错误信息

**问题3: 权限不足**
- 确认账户有发布权限
- 检查包名是否被占用
- 联系仓库管理员

## 最佳实践

1. **发布前检查**
   - 确保代码已提交到版本控制
   - 运行测试确保功能正常
   - 更新 CHANGELOG.md

2. **版本管理**
   - 遵循语义化版本规范
   - 保持版本号的一致性
   - 及时更新依赖版本

3. **测试验证**
   - 使用 dry-run 模式预检查
   - 在测试环境验证发布包
   - 确认包的完整性

4. **文档维护**
   - 及时更新 README.md
   - 维护 API 文档
   - 记录重要变更

## 迁移说明

如果你之前使用的是旧版发布脚本，请查看 `scripts/legacy/MIGRATION_GUIDE.md` 了解详细的迁移指南。

旧脚本已移动到 `scripts/legacy/` 目录，新系统提供了更好的用户体验和更强大的功能。

---

如有问题，请联系 Vakao UI 团队。