# withInstall

为 Vue 组件添加全局安装方法的工具函数。

## 基础用法

```ts
import { withInstall } from "vakao-ui/utils";
import Button from "./Button.vue";

// 为组件添加 install 方法
const VkButton = withInstall(Button);

export default VkButton;
```

## 在插件中使用

```ts
import { App } from "vue";
import { withInstall } from "vakao-ui/utils";
import Button from "./components/Button.vue";

const VkButton = withInstall(Button);

// 可以作为插件使用
app.use(VkButton);

// 也可以全局注册
app.component("VkButton", VkButton);
```

## 类型定义

```ts
export type SFCWithInstall<T> = T & {
  install(app: App): void;
};

export function withInstall<T>(component: T): SFCWithInstall<T>;
```

## 最佳实践

### 组件开发

```ts
// components/Button/index.ts
import { withInstall } from "vakao-ui/utils";
import Button from "./src/Button.vue";

// 添加安装方法
export const VkButton = withInstall(Button);
export default VkButton;

// 导出类型
export type { ButtonProps } from "./src/types";
```

### 插件开发

```ts
// plugins/my-plugin.ts
import type { App } from "vue";
import { withInstall } from "vakao-ui/utils";
import MyComponent from "./MyComponent.vue";

const MyPlugin = withInstall(MyComponent);

export default {
  install(app: App) {
    app.use(MyPlugin);
  },
};
```

## 注意事项

- `withInstall` 会修改原始组件，添加 `install` 方法
- 建议在组件库开发中使用这个工具保持一致性
- 支持 Tree Shaking，按需打包