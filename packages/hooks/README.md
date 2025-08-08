# @vakao-ui/hooks

[![npm version](https://img.shields.io/npm/v/@vakao-ui/hooks.svg?style=flat-square)](https://www.npmjs.com/package/@vakao-ui/hooks)
[![npm downloads](https://img.shields.io/npm/dm/@vakao-ui/hooks.svg?style=flat-square)](https://www.npmjs.com/package/@vakao-ui/hooks)
[![license](https://img.shields.io/npm/l/@vakao-ui/hooks.svg?style=flat-square)](https://github.com/Rouarn/vakao-ui/blob/main/LICENSE)

Vakao UI 组合式函数库 - 基于 Vue 3 Composition API 的可复用逻辑钩子集合

## 简介

`@vakao-ui/hooks` 是 Vakao UI 组件库的配套工具包，提供了一系列高质量、可复用的 Vue 3 组合式函数（Hooks）。这些函数遵循 React Hooks 的设计理念，采用数组返回格式，便于解构和重命名，同时保持了 Vue 3 的响应式特性。

### 特性

- ✅ **数组返回格式**：所有 hooks 返回数组，便于解构和自定义命名
- ✅ **类型安全**：完整的 TypeScript 类型支持和智能提示
- ✅ **按需导入**：支持 Tree Shaking，只打包你使用的部分
- ✅ **零依赖**：除了 Vue 3 外无其他依赖
- ✅ **自动清理**：自动处理组件卸载时的资源释放
- ✅ **全面测试**：高测试覆盖率确保稳定性

## 安装

```bash
# npm
npm install @vakao-ui/hooks

# yarn
yarn add @vakao-ui/hooks

# pnpm
pnpm add @vakao-ui/hooks
```

## 快速开始

### 导入方式

```js
// 按需导入（推荐）
import { useToggle, useCounter } from "@vakao-ui/hooks";

// 全量导入
import * as VakaoHooks from "@vakao-ui/hooks";
```

### 基础示例

```vue
<template>
  <div>
    <p>当前状态: {{ isVisible.value ? "显示" : "隐藏" }}</p>
    <button @click="toggle">切换</button>
    <button @click="show">显示</button>
    <button @click="hide">隐藏</button>
  </div>
</template>

<script setup>
import { useToggle } from "@vakao-ui/hooks";

// 数组解构，可自定义变量名
const [isVisible, toggle, show, hide] = useToggle(false);
</script>
```

## 可用的 Hooks

### 状态管理

- `useToggle` - 布尔值切换
- `useBoolean` - 布尔值管理
- `useCounter` - 计数器
- `useArray` - 数组操作

### 数据持久化

- `useLocalStorage` - 本地存储

### 性能优化

- `useDebounce` - 防抖
- `useThrottle` - 节流

### 网络请求

- `useFetch` - 数据获取

### DOM 操作

- `useClickOutside` - 点击外部
- `useEventListener` - 事件监听
- `useWindowSize` - 窗口尺寸
- `useFullscreen` - 全屏模式

### 用户交互

- `useHover` - 悬停状态
- `useKeyPress` - 按键监听
- `useMouse` - 鼠标位置
- `useDrag` - 拖拽功能

### 异步操作

- `useAsync` - 异步操作管理

### 系统功能

- `useClipboard` - 剪贴板操作

### 高级功能

- `usePagination` - 分页管理

## 详细文档

### useToggle

切换布尔值的钩子函数，提供简单的布尔状态管理。

```typescript
const [state, toggle, setTrue, setFalse] = useToggle(initialValue);
```

**参数：**

- `initialValue`：初始值，默认为 `false`

**返回值：**

- `[0] state`：只读的当前状态值（ComputedRef<boolean>）
- `[1] toggle`：切换状态的函数
- `[2] setTrue`：将状态设置为 true 的函数
- `[3] setFalse`：将状态设置为 false 的函数

**示例：**

```typescript
// 基础用法
const [isVisible, toggle] = useToggle(false);

// 完整用法
const [isOpen, toggleSidebar, openSidebar, closeSidebar] = useToggle(true);

// 多实例使用
const [showModal, toggleModal, openModal, closeModal] = useToggle();
const [isLoading, , startLoading, stopLoading] = useToggle();
```

### useCounter

计数器钩子函数，提供数值状态管理。

```typescript
const [count, increment, decrement, reset, setValue] = useCounter(initialValue, options);
```

**参数：**

- `initialValue`：初始值，默认为 `0`
- `options`：配置选项（可选）
  - `min`：最小值
  - `max`：最大值
  - `step`：步长，默认为 `1`

**返回值：**

- `[0] count`：只读的当前计数值（ComputedRef<number>）
- `[1] increment`：增加计数的函数
- `[2] decrement`：减少计数的函数
- `[3] reset`：重置为初始值的函数
- `[4] setValue`：设置为指定值的函数

**示例：**

```typescript
// 基础用法
const [count, increment, decrement] = useCounter(0);

// 带配置选项
const [count, increment, decrement, reset, setValue] = useCounter(0, {
  min: 0,
  max: 10,
  step: 2,
});

// 分页应用
const [page, nextPage, prevPage, resetPage, setPage] = useCounter(1, { min: 1 });
```

## 设计原则

`@vakao-ui/hooks` 遵循以下设计原则：

1. **数组返回格式**：参考 React Hooks 设计模式，所有 hooks 返回数组，便于解构和自定义命名
2. **只读状态**：状态值使用只读计算属性，确保数据流单向性
3. **一致性**：所有 hooks 遵循相同的 API 设计模式
4. **可组合性**：hooks 可以相互组合使用
5. **可重用性**：hooks 具有良好的可重用性

## 贡献指南

欢迎为 Vakao UI Hooks 贡献代码！请参阅我们的[贡献指南](../../CONTRIBUTING.md)了解更多信息。

## 许可证

[MIT](../../LICENSE)
