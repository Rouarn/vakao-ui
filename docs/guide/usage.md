# 使用方法

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from 'vue'
import VakaoUI from 'vakao-ui'
import 'vakao-ui/dist/vakao-ui.css'
import App from './App.vue'

const app = createApp(App)

app.use(VakaoUI)
app.mount('#app')
```

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式。

### 手动按需引入

```ts
// main.ts
import { createApp } from 'vue'
import { VKButton, VKInput } from 'vakao-ui'
import 'vakao-ui/dist/vakao-ui.css'
import App from './App.vue'

const app = createApp(App)

// 全局注册
app.component('VKButton', VKButton)
app.component('VKInput', VKInput)

// 或者使用 install 方法
app.use(VKButton)
app.use(VKInput)

app.mount('#app')
```

### 使用自动导入插件

我们推荐使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 来实现自动导入组件。

首先安装插件：

```bash
npm install -D unplugin-vue-components
```

然后在 Vite 或 Webpack 配置文件中添加配置：

#### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

// 导入 Vakao UI 组件解析器
import { VakaoUIResolver } from 'vakao-ui/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VakaoUIResolver(),
      ],
    }),
  ],
})
```

#### Webpack

```js
// webpack.config.js
const Components = require('unplugin-vue-components/webpack')
const { VakaoUIResolver } = require('vakao-ui/resolver')

module.exports = {
  // ...
  plugins: [
    Components({
      resolvers: [
        VakaoUIResolver(),
      ],
    }),
  ],
}
```

## 在组件中使用

完成上述步骤后，你就可以在组件中使用 Vakao UI 的组件了：

```vue
<template>
  <div>
    <vk-button type="primary">主要按钮</vk-button>
    <vk-button type="success">成功按钮</vk-button>
  </div>
</template>
```

## 使用组合式 API

Vakao UI 提供了一系列的组合式 API，可以在 `setup` 中使用：

```vue
<template>
  <div>
    <vk-button @click="toggle">切换状态: {{ state ? '开' : '关' }}</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from 'vakao-ui'

const { state, toggle } = useToggle(false)
</script>
```
