# 安装

## 环境支持

Vakao UI 需要 Node.js 版本 >= 16。

## 版本

Vakao UI 目前还处于开发中，版本为 1.0.0。

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

## 浏览器直接引入

### 通过 CDN 引入

如果您想要直接通过 HTML 的方式引入，那么可以使用 CDN 的方式引入，例如：

```html
<head>
  <!-- 导入样式（重要！） -->
  <link rel="stylesheet" href="https://unpkg.com/vakao-ui/dist/style.css">
  <!-- 导入 Vue 3 -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <!-- 导入组件库 -->
  <script src="https://unpkg.com/vakao-ui/dist/vakao-ui.umd.js"></script>
</head>

<body>
  <div id="app">
    <vk-button>按钮</vk-button>
  </div>

  <script>
    const { createApp } = Vue
    const app = createApp({
      /* ... */
    })
    app.use(VakaoUI)
    app.mount('#app')
  </script>
</body>
```
