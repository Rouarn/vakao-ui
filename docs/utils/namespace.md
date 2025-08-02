# useNamespace

`useNamespace` 是一个用于创建组件 CSS 命名空间的工具函数，基于 BEM (Block Element Modifier) 命名规范，用于生成一致的 CSS 类名。

## 基本用法

```ts
import { useNamespace } from "vakao-ui/utils";

// 创建按钮组件的命名空间
const ns = useNamespace("button");

// 生成类名
ns.block(); // 'vk-button'
ns.element("icon"); // 'vk-button__icon'
ns.modifier("primary"); // 'vk-button--primary'
ns.modifier("size", "large"); // 'vk-button--size-large'
ns.is("disabled"); // 'is-disabled'
ns.is("loading", true); // 'is-loading'
ns.is("loading", false); // ''
ns.bem("icon", "primary"); // 'vk-button__icon--primary'
```

## API

### useNamespace

```ts
function useNamespace(block: string, namespace: string = defaultNamespace): UseNamespaceReturn;
```

#### 参数

| 参数      | 类型   | 默认值 | 说明                      |
| --------- | ------ | ------ | ------------------------- |
| block     | string | -      | 块名称，通常是组件名称    |
| namespace | string | 'vk'   | 命名空间前缀，默认为 'vk' |

#### 返回值

返回一个包含以下方法的对象：

| 方法     | 参数                                                  | 返回值 | 说明                    |
| -------- | ----------------------------------------------------- | ------ | ----------------------- |
| block    | -                                                     | string | 获取块级类名            |
| element  | element: string                                       | string | 获取元素类名            |
| modifier | modifier: string, value?: string \| number \| boolean | string | 获取修饰符类名          |
| is       | name: string, state?: boolean                         | string | 获取状态类名            |
| bem      | element?: string, modifier?: string                   | string | 获取 BEM 格式的完整类名 |

## 类型定义

类型定义如下：

```js
// 命名空间工具函数返回类型
interface UseNamespaceReturn {
  // 获取块级类名
  block: () => string
  // 获取元素类名
  element: (element: string) => string
  // 获取修饰符类名
  modifier: (modifier: string, value?: string | number | boolean) => string
  // 获取状态类名
  is: (name: string, state?: boolean) => string
  // 获取 BEM 格式的完整类名
  bem: (element?: string, modifier?: string) => string
}
```

## 示例

### 在组件中使用

```vue
<template>
  <button :class="[ns.block(), ns.modifier('type', type), ns.is('disabled', disabled)]">
    <span :class="ns.element('icon')" v-if="icon">
      <i :class="icon"></i>
    </span>
    <span :class="ns.element('text')">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useNamespace } from "vakao-ui/utils";

defineProps({
  type: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
});

// 创建按钮组件的命名空间
const ns = useNamespace("button");
</script>
```

### 自定义命名空间前缀

```ts
// 使用自定义前缀
const ns = useNamespace("button", "custom");

ns.block(); // 'custom-button'
```

## BEM 命名规范说明

BEM 是一种 CSS 命名规范，用于创建可重用和可维护的 CSS 代码：

- **Block（块）**：独立的组件，如 `vk-button`
- **Element（元素）**：块的一部分，如 `vk-button__icon`
- **Modifier（修饰符）**：改变块或元素的外观或行为，如 `vk-button--primary`
- **State（状态）**：表示组件的状态，如 `is-disabled`

使用 `useNamespace` 可以确保组件库中的所有组件都遵循一致的命名规范，提高代码的可维护性和可读性。
