# 类型工具 (TypeTool)

Vakao UI 提供了一系列 TypeScript 类型工具，帮助您更好地进行类型定义和推导。

## ExtractPublicPropTypes

提取组件公共属性类型的工具类型。

### 基础用法

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

## SFCWithInstall

带安装方法的单文件组件类型。

### 基础用法

```ts
import type { SFCWithInstall } from "vakao-ui";
import type { DefineComponent } from "vue";

// 定义组件类型
type ButtonComponent = DefineComponent<ButtonProps>;

// 带安装方法的组件类型
type VkButtonType = SFCWithInstall<ButtonComponent>;
```

### 类型定义

```ts
export type SFCWithInstall<T> = T & {
  install(app: App): void;
};
```

## 使用场景

### 组件属性类型提取

```ts
// 定义组件属性
const inputProps = {
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

// 提取类型
export type InputProps = ExtractPublicPropTypes<typeof inputProps>;

// 在其他地方使用
function createInput(props: InputProps) {
  // ...
}
```

### 组件类型定义

```ts
import type { DefineComponent } from "vue";
import type { SFCWithInstall } from "vakao-ui";

// 组件实例类型
type MyComponentInstance = DefineComponent<MyComponentProps>;

// 带安装方法的组件类型
export type MyComponent = SFCWithInstall<MyComponentInstance>;
```

## 注意事项

- 类型工具仅在 TypeScript 环境下有效
- `ExtractPublicPropTypes` 需要配合 `as const` 使用以获得准确的类型推导
- `SFCWithInstall` 通常与 `withInstall` 函数配合使用
- 建议在组件库开发中统一使用这些类型工具
