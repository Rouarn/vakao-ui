# 工具函数

Vakao UI 提供了一系列实用的工具函数，帮助您更高效地开发应用。

## 设计理念

- **轻量级** - 体积小巧，按需引入
- **类型安全** - 完整的 TypeScript 类型支持
- **高性能** - 经过性能优化的实现
- **易测试** - 纯函数设计，易于单元测试

## 工具分类

### 组件工具

- [withInstall](./withInstall.md) - 为组件添加全局安装方法
- [useNamespace](./namespace.md) - 创建组件 CSS 命名空间
- [useControlled](./controlled.md) - 处理受控和非受控组件状态

### 数据处理

- [deepClone](./deepClone.md) - 深拷贝函数，支持循环引用
- [isEqual](./isEqual.md) - 深度比较、浅比较、数组比较等

### 日期处理

- [formatDate](./formatDate.md) - 日期格式化、相对时间、日期判断等

### URL 处理

- [isUrl](./url.md) - 判断字符串是否为有效的 URL 格式

## 使用方式

### 全局引入

```ts
import { withInstall } from "vakao-ui";
```

### 按需引入

```ts
import { withInstall } from "vakao-ui/utils";
```

## 快速开始

### 安装

```bash
npm install vakao-ui
```

### 基础示例

```ts
// 组件安装
import { withInstall } from "vakao-ui/utils";
import MyComponent from "./MyComponent.vue";

const VkMyComponent = withInstall(MyComponent);

// 命名空间
import { useNamespace } from "vakao-ui/utils";
const ns = useNamespace('button');
// 'vk-button', 'vk-button__icon', 'vk-button--primary'

// 数据处理
import { deepClone, isEqual } from "vakao-ui/utils";

const original = { name: "张三", hobbies: ["读书"] };
const cloned = deepClone(original);

// 日期格式化
import { formatDate, DATE_FORMATS } from "vakao-ui/utils";

const formatted = formatDate(new Date(), DATE_FORMATS.DATETIME);
```

## 注意事项

1. 所有工具函数都支持 Tree Shaking，按需打包
2. 类型工具仅在 TypeScript 环境下有效
3. 建议在组件库开发中使用这些工具保持一致性
4. 部分函数提供了处理循环引用的版本
5. 日期相关函数支持多种语言环境和时区
