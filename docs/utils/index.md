# 工具函数

Vakao UI 提供了一系列实用的工具函数，帮助您更高效地开发应用。

## 设计理念

- **轻量级** - 体积小巧，按需引入
- **类型安全** - 完整的 TypeScript 类型支持
- **高性能** - 经过性能优化的实现
- **易测试** - 纯函数设计，易于单元测试

## 工具分类

### 组件工具

- `withInstall` - 为组件添加全局安装方法
- `createNamespace` - 创建组件命名空间

### 类型工具

- `ExtractPublicPropTypes` - 提取组件公共属性类型
- `SFCWithInstall` - 带安装方法的单文件组件类型

### 即将推出

- `debounce` - 防抖函数
- `throttle` - 节流函数
- `deepClone` - 深拷贝函数
- `formatDate` - 日期格式化
- `isEqual` - 深度比较

## 使用方式

### 全局引入

```ts
import { withInstall } from "vakao-ui";
```

### 按需引入

```ts
import { withInstall } from "vakao-ui/utils";
```

## withInstall

为 Vue 组件添加全局安装方法的工具函数。

### 基础用法

```ts
import { withInstall } from "vakao-ui/utils";
import Button from "./Button.vue";

// 为组件添加 install 方法
const VkButton = withInstall(Button);

export default VkButton;
```

### 在插件中使用

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

### 类型定义

```ts
export type SFCWithInstall<T> = T & {
  install(app: App): void;
};

export function withInstall<T>(component: T): SFCWithInstall<T>;
```

## 类型工具

### ExtractPublicPropTypes

提取组件公共属性类型的工具类型。

```ts
import type { ExtractPublicPropTypes } from "vakao-ui";

// 定义组件属性
const buttonProps = {
  type: {
    type: String as PropType<"primary" | "default">,
    default: "default",
  },
  size: {
    type: String as PropType<"small" | "medium" | "large">,
    default: "medium",
  },
} as const;

// 提取公共属性类型
export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>;
```

### SFCWithInstall

带安装方法的单文件组件类型。

```ts
import type { SFCWithInstall } from "vakao-ui";
import type { DefineComponent } from "vue";

// 定义组件类型
type ButtonComponent = DefineComponent<ButtonProps>;

// 带安装方法的组件类型
type VkButtonType = SFCWithInstall<ButtonComponent>;
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

1. `withInstall` 会修改原始组件，添加 `install` 方法
2. 类型工具仅在 TypeScript 环境下有效
3. 建议在组件库开发中使用这些工具保持一致性
4. 所有工具函数都支持 Tree Shaking，按需打包
