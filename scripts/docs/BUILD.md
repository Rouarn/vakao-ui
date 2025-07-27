# Vakao UI Publisher - Electron 构建指南

本文档详细说明了 Vakao UI Publisher 的 Electron 应用构建配置和使用方法。

## 📋 目录

- [构建环境要求](#构建环境要求)
- [快速开始](#快速开始)
- [构建脚本说明](#构建脚本说明)
- [构建配置详解](#构建配置详解)
- [平台特定配置](#平台特定配置)
- [发布配置](#发布配置)
- [故障排除](#故障排除)

## 🔧 构建环境要求

### 基础要求

- **Node.js**: >= 16.0.0
- **npm**: >= 8.0.0 或 **pnpm**: >= 7.0.0
- **Git**: 用于版本控制

### 平台特定要求

#### Windows 构建
- Windows 10/11
- Visual Studio Build Tools 或 Visual Studio Community
- Windows SDK

#### macOS 构建
- macOS 10.15+ (Catalina)
- Xcode Command Line Tools
- Apple Developer Account (用于代码签名)

#### Linux 构建
- Ubuntu 18.04+ / CentOS 7+ / 其他主流发行版
- build-essential 包
- libnss3-dev, libatk-bridge2.0-dev 等依赖

## 🚀 快速开始

### 1. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm (推荐)
pnpm install
```

### 2. 开发模式运行

```bash
# 启动开发模式
npm run dev

# 或直接启动
npm start
```

### 3. 构建应用

```bash
# 构建当前平台
npm run build

# 构建 Windows 版本
npm run build:win

# 构建 macOS 版本
npm run build:mac

# 构建 Linux 版本
npm run build:linux

# 构建所有平台
npm run build:all
```

## 📜 构建脚本说明

### 开发脚本

| 脚本 | 描述 |
|------|------|
| `npm start` | 启动 Electron 应用 |
| `npm run dev` | 开发模式启动（禁用 GPU 加速） |

### 构建脚本

| 脚本 | 描述 |
|------|------|
| `npm run build` | 构建当前平台的安装包 |
| `npm run build:win` | 构建 Windows 安装包 |
| `npm run build:mac` | 构建 macOS 安装包 |
| `npm run build:linux` | 构建 Linux 安装包 |
| `npm run build:all` | 构建所有平台安装包 |
| `npm run build:prepare` | 执行构建前准备工作 |

### 打包脚本

| 脚本 | 描述 |
|------|------|
| `npm run pack` | 打包应用（不创建安装程序） |
| `npm run pack:win` | 打包 Windows 应用 |
| `npm run pack:mac` | 打包 macOS 应用 |
| `npm run pack:linux` | 打包 Linux 应用 |

### 发布脚本

| 脚本 | 描述 |
|------|------|
| `npm run publish` | 构建并发布到 GitHub Releases |
| `npm run publish:win` | 构建并发布 Windows 版本 |

### 工具脚本

| 脚本 | 描述 |
|------|------|
| `npm run clean` | 清理构建目录 |
| `npm run clean:all` | 完全清理并重新安装依赖 |

## ⚙️ 构建配置详解

### 基础配置

```json
{
  "appId": "com.vakao-ui.publisher",
  "productName": "Vakao UI Publisher",
  "copyright": "Copyright © 2025 Vakao UI Team",
  "directories": {
    "output": "dist",
    "buildResources": "assets"
  }
}
```

### 文件包含配置

应用会包含以下文件和目录：

- `src/**/*` - 源代码文件
- `assets/**/*` - 资源文件
- `node_modules/**/*` - 依赖包
- `package.json` - 包配置文件

同时排除了以下不必要的文件：

- 开发文档和示例
- 测试文件
- TypeScript 定义文件
- 各种配置文件

### 额外资源配置

```json
{
  "extraResources": [
    {
      "from": "assets/",
      "to": "assets/",
      "filter": ["**/*"]
    }
  ]
}
```

## 🖥️ 平台特定配置

### Windows 配置

#### 构建目标
- **NSIS**: 标准安装程序
- **Portable**: 便携版应用

#### NSIS 安装程序特性
- 自定义安装目录
- 桌面和开始菜单快捷方式
- 卸载程序
- 安装向导界面

#### 文件命名
```
Vakao UI Publisher-1.0.0-x64.exe
Vakao UI Publisher-1.0.0-portable.exe
```

### macOS 配置

#### 构建目标
- **DMG**: 磁盘映像安装包

#### 支持架构
- **x64**: Intel 处理器
- **arm64**: Apple Silicon (M1/M2)

#### DMG 特性
- 自定义背景和布局
- 拖拽安装界面
- 应用程序文件夹快捷方式

#### 文件命名
```
Vakao UI Publisher-1.0.0-x64.dmg
Vakao UI Publisher-1.0.0-arm64.dmg
```

### Linux 配置

#### 构建目标
- **AppImage**: 便携式应用映像
- **DEB**: Debian/Ubuntu 安装包

#### 应用分类
- **Category**: Development (开发工具)

#### 文件命名
```
Vakao UI Publisher-1.0.0-x64.AppImage
Vakao UI Publisher-1.0.0-amd64.deb
```

## 📦 发布配置

### GitHub Releases

应用配置为自动发布到 GitHub Releases：

```json
{
  "publish": {
    "provider": "github",
    "owner": "vakao-ui",
    "repo": "vakao-ui",
    "private": false
  }
}
```

### 发布流程

1. **准备发布**
   ```bash
   # 更新版本号
   npm version patch|minor|major
   
   # 推送标签
   git push --tags
   ```

2. **构建和发布**
   ```bash
   # 发布所有平台
   npm run publish
   
   # 或分别发布
   npm run publish:win
   ```

3. **环境变量**
   
   发布需要设置以下环境变量：
   ```bash
   # GitHub Personal Access Token
   export GH_TOKEN="your_github_token"
   
   # 或使用 .env 文件
   echo "GH_TOKEN=your_github_token" > .env
   ```

## 🔍 构建准备脚本

`build/prepare.js` 脚本在每次构建前自动执行以下任务：

### 1. 清理构建目录
- 删除旧的 `dist` 目录
- 创建新的构建目录

### 2. 验证构建环境
- 检查必要的源文件
- 验证图标文件
- 确认依赖完整性

### 3. 生成构建信息
- 创建 `src/build-info.json`
- 包含版本、构建时间等信息

### 4. 优化资源文件
- 检查字体文件
- 验证 CSS 文件
- 确保资源目录结构

## 🛠️ 故障排除

### 常见问题

#### 1. 构建失败：缺少依赖

**问题**: `Error: Cannot find module 'xxx'`

**解决方案**:
```bash
# 清理并重新安装
npm run clean:all

# 或手动清理
rm -rf node_modules package-lock.json
npm install
```

#### 2. Windows 构建失败：缺少 Visual Studio

**问题**: `error MSB8003: Could not find WindowsSDKDir`

**解决方案**:
1. 安装 Visual Studio Build Tools
2. 或安装 Visual Studio Community
3. 确保包含 C++ 构建工具

#### 3. macOS 构建失败：代码签名

**问题**: `Code signing failed`

**解决方案**:
```bash
# 跳过代码签名（仅用于测试）
export CSC_IDENTITY_AUTO_DISCOVERY=false
npm run build:mac
```

#### 4. Linux 构建失败：缺少系统依赖

**问题**: `error while loading shared libraries`

**解决方案**:
```bash
# Ubuntu/Debian
sudo apt-get install libnss3-dev libatk-bridge2.0-dev libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libasound2

# CentOS/RHEL
sudo yum install nss atk at-spi2-atk libdrm libxcomposite libxdamage libxrandr mesa-libgbm libXScrnSaver alsa-lib
```

#### 5. 构建速度慢

**优化建议**:
1. 使用 SSD 硬盘
2. 增加系统内存
3. 使用本地镜像源
4. 排除不必要的文件

### 调试技巧

#### 1. 详细日志输出

```bash
# 启用详细日志
DEBUG=electron-builder npm run build

# 或设置环境变量
export DEBUG=electron-builder
npm run build
```

#### 2. 仅打包不构建安装程序

```bash
# 快速验证打包配置
npm run pack
```

#### 3. 检查构建产物

```bash
# 查看构建目录
ls -la dist/

# 检查应用结构
ls -la dist/win-unpacked/  # Windows
ls -la dist/mac/           # macOS
ls -la dist/linux-unpacked/ # Linux
```

## 📚 相关资源

- [Electron Builder 官方文档](https://www.electron.build/)
- [Electron 官方文档](https://www.electronjs.org/docs)
- [NSIS 文档](https://nsis.sourceforge.io/Docs/)
- [代码签名指南](https://www.electron.build/code-signing)

## 🤝 贡献

如果您在构建过程中遇到问题或有改进建议，请：

1. 查看现有的 [Issues](https://github.com/vakao-ui/vakao-ui/issues)
2. 创建新的 Issue 描述问题
3. 提交 Pull Request 改进配置

---

**Vakao UI Team** © 2025