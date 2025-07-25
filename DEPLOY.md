# 部署文档到 GitHub Pages

本项目已配置自动化部署流程，可以将 VitePress 文档自动部署到 GitHub Pages。

## 自动部署设置

### 1. GitHub Actions 工作流

项目已包含 `.github/workflows/deploy-docs.yml` 工作流文件，该文件会在以下情况下自动触发：

- 推送到 `main` 或 `master` 分支
- 创建针对 `main` 或 `master` 分支的 Pull Request

### 2. GitHub Pages 设置

在 GitHub 仓库中启用 GitHub Pages：

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分选择 **GitHub Actions**
4. 保存设置

### 3. 部署流程

工作流包含两个主要步骤：

#### 构建步骤 (Build)

- 检出代码
- 设置 pnpm 和 Node.js 环境
- 安装依赖
- 构建 VitePress 文档
- 上传构建产物

#### 部署步骤 (Deploy)

- 将构建产物部署到 GitHub Pages
- 提供访问 URL

## 手动部署

如果需要手动部署，可以按照以下步骤：

### 1. 本地构建

```bash
# 进入文档目录
cd docs

# 安装依赖
pnpm install

# 构建文档
pnpm run build
```

### 2. 部署到 GitHub Pages

构建完成后，`docs/.vitepress/dist` 目录包含了所有静态文件。

#### 方法一：使用 gh-pages 包

```bash
# 安装 gh-pages
npm install -g gh-pages

# 部署到 gh-pages 分支
gh-pages -d docs/.vitepress/dist
```

#### 方法二：手动推送到 gh-pages 分支

```bash
# 进入构建目录
cd docs/.vitepress/dist

# 初始化 git 仓库
git init
git add -A
git commit -m 'deploy'

# 推送到 gh-pages 分支
git push -f git@github.com:Rouarn/vakao-ui.git master:gh-pages
```

## 配置说明

### VitePress 配置

在 `docs/.vitepress/config.ts` 中已配置：

```typescript
export default defineConfig({
  base: "/vakao-ui/", // GitHub Pages 部署路径
  // ... 其他配置
});
```

`base` 路径必须与 GitHub 仓库名称匹配，格式为 `/仓库名/`。

### 工作流权限

工作流已配置必要的权限：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## 访问部署的文档

部署成功后，文档将在以下地址可用：

```
https://rouarn.github.io/vakao-ui/
```

## 故障排除

### 常见问题

1. **部署失败**
   - 检查 GitHub Actions 日志
   - 确认 GitHub Pages 已启用
   - 验证工作流权限设置

2. **资源加载失败**
   - 检查 `base` 路径配置是否正确
   - 确认静态资源路径是否正确

3. **页面显示异常**
   - 检查构建日志是否有错误
   - 验证 VitePress 配置是否正确

### 调试步骤

1. 本地测试构建：

   ```bash
   cd docs
   pnpm run build
   pnpm run serve
   ```

2. 检查构建产物：

   ```bash
   ls -la docs/.vitepress/dist
   ```

3. 查看 GitHub Actions 日志：
   - 进入仓库的 **Actions** 页面
   - 点击相应的工作流运行
   - 查看详细日志

## 自定义域名（可选）

如果要使用自定义域名：

1. 在 `docs/.vitepress/public/` 目录下创建 `CNAME` 文件
2. 在文件中写入你的域名，如：`docs.vakao-ui.com`
3. 在域名提供商处配置 CNAME 记录指向 `rouarn.github.io`
4. 更新 VitePress 配置中的 `base` 路径为 `/`

## 注意事项

- 确保仓库是公开的，或者有 GitHub Pro 账户（私有仓库的 GitHub Pages）
- 首次部署可能需要几分钟时间
- 每次推送到主分支都会触发重新部署
- 构建失败时会在 GitHub Actions 中显示详细错误信息
