# @vakao-ui/utils

[![npm version](https://img.shields.io/npm/v/@vakao-ui/utils.svg?style=flat-square)](https://www.npmjs.com/package/@vakao-ui/utils)
[![npm downloads](https://img.shields.io/npm/dm/@vakao-ui/utils.svg?style=flat-square)](https://www.npmjs.com/package/@vakao-ui/utils)
[![license](https://img.shields.io/npm/l/@vakao-ui/utils.svg?style=flat-square)](https://github.com/Rouarn/vakao-ui/blob/main/LICENSE)

Vakao UI 工具函数库 - 实用工具函数集合

## 简介

`@vakao-ui/utils` 是 Vakao UI 组件库的配套工具包，提供了一系列高质量、可复用的工具函数，用于简化前端开发过程中的常见任务。这些工具函数涵盖了组件安装、CSS 命名空间、数据处理、DOM 操作等多个方面。

### 特性

- ✅ **类型安全**：完整的 TypeScript 类型支持和智能提示
- ✅ **按需导入**：支持 Tree Shaking，只打包你使用的部分
- ✅ **零依赖**：除了 Vue 3 外无其他依赖
- ✅ **全面测试**：高测试覆盖率确保稳定性
- ✅ **轻量级**：精简代码，优化性能

## 安装

```bash
# npm
npm install @vakao-ui/utils

# yarn
yarn add @vakao-ui/utils

# pnpm
pnpm add @vakao-ui/utils
```

## 快速开始

### 导入方式

```js
// 按需导入（推荐）
import { deepClone, useNamespace, withInstall } from "@vakao-ui/utils";

// 全量导入
import * as VakaoUtils from "@vakao-ui/utils";
```

### 基础示例

```vue
<template>
  <div :class="ns.block()">
    <div :class="ns.element('header')">标题</div>
    <div :class="ns.element('content')">内容</div>
    <button :class="[ns.element('button'), ns.is('disabled', disabled)]">按钮</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNamespace } from "@vakao-ui/utils";

// 创建命名空间工具
const ns = useNamespace("card");
const disabled = ref(true);
</script>
```

## 工具函数分类

### 组件安装工具

- `withInstall` - 为组件添加 install 方法
- `installAll` - 批量安装组件

### CSS 命名空间工具

- `useNamespace` - 基于 BEM 规范的 CSS 类名生成器

### 数据处理工具

- `deepClone` - 对象深拷贝
- `deepCloneWithCircular` - 支持循环引用的深拷贝
- `isEqual` - 深度比较两个值是否相等

### DOM 操作工具

- `getScrollBarWidth` - 获取滚动条宽度
- `isInViewport` - 检查元素是否在视口内
- `scrollTo` - 平滑滚动到指定位置

### 类型判断工具

- `isString` - 判断是否为字符串
- `isNumber` - 判断是否为数字
- `isBoolean` - 判断是否为布尔值
- `isFunction` - 判断是否为函数
- `isObject` - 判断是否为对象
- `isArray` - 判断是否为数组
- `isDate` - 判断是否为日期对象

### 字符串操作工具

- `capitalize` - 首字母大写
- `camelize` - 转换为驼峰命名
- `kebabCase` - 转换为短横线命名

### 数组操作工具

- `unique` - 数组去重
- `flatten` - 数组扁平化
- `chunk` - 数组分块

### 对象操作工具

- `pick` - 从对象中选取指定属性
- `omit` - 从对象中排除指定属性
- `merge` - 深度合并对象

### 日期处理工具

- `formatDate` - 日期格式化

### URL 处理工具

- `parseQuery` - 解析 URL 查询参数
- `stringifyQuery` - 将对象转换为 URL 查询字符串

### 其他工具

- `generateUUID` - 生成唯一标识符
- `debounce` - 函数防抖
- `throttle` - 函数节流

## 详细文档

### withInstall

为 Vue 组件添加 install 方法，使其可以通过 `app.use()` 注册。

```typescript
const withInstall = <T extends Component>(component: T) => WithInstall<T>;
```

**参数：**

- `component`：Vue 组件

**返回值：**

- 添加了 install 方法的组件

**示例：**

```typescript
import { withInstall } from "@vakao-ui/utils";
import Button from "./Button.vue";

// 添加 install 方法
const VkButton = withInstall(Button);

// 现在可以这样使用
app.use(VkButton);

// 或者直接使用组件
<VkButton>按钮</VkButton>
```

### useNamespace

创建基于 BEM 规范的 CSS 命名空间工具函数。

```typescript
const useNamespace = (block: string, namespace?: string) => UseNamespaceReturn;
```

**参数：**

- `block`：块名称，通常是组件名称
- `namespace`：命名空间前缀，默认为 'vk'

**返回值：**

- `block()`：获取块级类名，格式：`{namespace}-{block}`
- `element(element)`：获取元素类名，格式：`{namespace}-{block}__{element}`
- `modifier(modifier, value?)`：获取修饰符类名
- `is(name, state?)`：获取状态类名，格式：`is-{name}`
- `bem(element?, modifier?)`：获取 BEM 格式的完整类名

**示例：**

```typescript
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

### deepClone

深拷贝函数，支持对象、数组、Date、RegExp、Map、Set 等类型的深度拷贝。

```typescript
const deepClone = <T>(obj: T) => T;
```

**参数：**

- `obj`：要拷贝的对象

**返回值：**

- 深拷贝后的对象

**示例：**

```typescript
import { deepClone } from "@vakao-ui/utils";

const original = {
  name: "张三",
  age: 30,
  birthday: new Date(1990, 0, 1),
  hobbies: ["阅读", "游泳"],
  address: {
    city: "北京",
    street: "朝阳区",
  },
};

const cloned = deepClone(original);
// cloned 是 original 的深拷贝，修改 cloned 不会影响 original
```

### deepCloneWithCircular

支持循环引用的深拷贝函数。

```typescript
const deepCloneWithCircular = <T>(obj: T, visited?: WeakMap<object, unknown>) => T;
```

**参数：**

- `obj`：要拷贝的对象
- `visited`：已访问的对象映射，用于处理循环引用

**返回值：**

- 深拷贝后的对象

**示例：**

```typescript
import { deepCloneWithCircular } from "@vakao-ui/utils";

// 创建一个带有循环引用的对象
const original: any = {
  name: "循环引用示例",
  nested: {
    data: "嵌套数据",
  },
};
original.self = original; // 循环引用

// 使用支持循环引用的深拷贝
const cloned = deepCloneWithCircular(original);
// cloned 是 original 的深拷贝，且正确处理了循环引用
```

## 设计原则

`@vakao-ui/utils` 遵循以下设计原则：

1. **功能单一**：每个工具函数专注于解决一个特定问题
2. **类型安全**：完整的 TypeScript 类型定义
3. **可组合性**：工具函数可以相互组合使用
4. **可测试性**：便于单元测试
5. **性能优先**：注重执行效率和包体积

## 贡献指南

欢迎为 Vakao UI Utils 贡献代码！请参阅我们的[贡献指南](https://github.com/Rouarn/vakao-ui/blob/main/CONTRIBUTING.md)了解更多信息。

## 许可证

[MIT](https://github.com/Rouarn/vakao-ui/blob/main/LICENSE)
