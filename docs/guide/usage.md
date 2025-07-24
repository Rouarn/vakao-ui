# 使用方法

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from "vue";
import VakaoUI from "vakao-ui";
// 导入样式文件（重要！）
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(VakaoUI);
app.mount("#app");
```

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式。

### 手动按需引入

```ts
// main.ts
import { createApp } from "vue";
import { VKButton, VKInput } from "vakao-ui";
// 导入样式文件（重要！）
import "vakao-ui/style.css";
import App from "./App.vue";

const app = createApp(App);

// 全局注册
app.component("VKButton", VKButton);
app.component("VKInput", VKInput);

// 或者使用 install 方法
app.use(VKButton);
app.use(VKInput);

app.mount("#app");
```

### 使用自动导入插件

我们推荐使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 来实现自动导入组件。

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VakaoUIResolver } from "vakao-ui/resolver";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VakaoUIResolver()],
    }),
  ],
});
```

使用自动导入插件后，你可以直接在模板中使用组件，无需手动导入：

```vue
<template>
  <vk-button type="primary">按钮</vk-button>
</template>

<script setup lang="ts">
// 无需导入，插件会自动处理
</script>
```

## 类型安全

Vakao UI 使用 TypeScript 编写，提供完整的类型定义。所有组件都支持完整的类型检查和智能提示。

```vue
<template>
  <!-- 完整的类型支持和智能提示 -->
  <vk-button type="primary" size="large" :disabled="false" @click="handleClick">
    按钮
  </vk-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log("按钮被点击");
};
</script>
```

## 属性继承

组件支持标准的 HTML 属性继承，你可以直接传递 `class`、`style` 等属性：

```vue
<template>
  <!-- 支持 class 和 style 属性 -->
  <vk-button
    class="my-custom-class"
    style="margin: 10px;"
    data-testid="my-button"
  >
    自定义样式按钮
  </vk-button>
</template>
```

首先安装插件：

```bash
npm install -D unplugin-vue-components
```

然后在 Vite 或 Webpack 配置文件中添加配置：

#### Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";

// 导入 Vakao UI 组件解析器
import { VakaoUIResolver } from "vakao-ui/resolver";

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VakaoUIResolver()],
    }),
  ],
});
```

#### Webpack

```js
// webpack.config.js
const Components = require("unplugin-vue-components/webpack");
const { VakaoUIResolver } = require("vakao-ui/resolver");

module.exports = {
  // ...
  plugins: [
    Components({
      resolvers: [VakaoUIResolver()],
    }),
  ],
};
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
    <vk-button @click="toggle">切换状态: {{ state ? "开" : "关" }}</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "vakao-ui";

const { state, toggle } = useToggle(false);
</script>
```
