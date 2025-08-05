# 工具函数 (Utils)

Vakao UI 提供了一系列实用的工具函数，帮助您更高效地开发应用。

## 设计理念

- **轻量级** - 体积小巧，按需引入
- **类型安全** - 完整的 TypeScript 类型支持
- **高性能** - 经过性能优化的实现
- **易测试** - 纯函数设计，易于单元测试

## 工具分类

### 组件工具

- [withInstall](./withInstall.md) - 为组件添加全局安装方法，支持单个组件和批量注册
- [useNamespace](./namespace.md) - 创建组件 CSS 命名空间，基于 BEM 规范生成类名
- [useControlled](./controlled.md) - 处理受控和非受控组件状态，统一组件状态管理
- [generate-color](./generate-color.md) - 颜色生成工具，自动生成主题色系统和设计变量

### 类型工具

- [typeTool](./typeTool.md) - TypeScript 类型工具，包含 ExtractPublicPropTypes 等类型推导工具
- [typeGuards](./typeGuards.md) - 类型守卫函数，提供精确的类型检查和类型缩小

### 数据处理

- [deepClone](./deepClone.md) - 深拷贝函数，支持对象、数组、Date、RegExp、Map、Set 等类型
- [isEqual](./isEqual.md) - 深度比较函数，支持对象、数组等复杂类型的相等判断
- [array](./array.md) - 数组操作工具，包含去重、分组、排序等常用数组处理函数
- [object](./object.md) - 对象操作工具，包含属性忽略、合并、转换等对象处理函数
- [string](./string.md) - 字符串操作工具，包含大小写转换、格式化等字符串处理函数
- [math](./math.md) - 数学计算工具，包含数值限制、随机数生成等数学函数
- [function](./function.md) - 函数工具，包含函数增强、控制等高阶函数
- [misc](./misc.md) - 其他实用工具，包含延迟执行等未分类的工具函数

### 日期处理

- [formatDate](./formatDate.md) - 日期格式化工具，支持多种格式、相对时间显示和日期判断

### URL 处理

- [url](./url.md) - URL 验证工具，判断字符串是否为有效的 URL 格式

### DOM 操作

- [dom](./dom.md) - DOM 操作工具，提供样式管理、类名操作和事件处理等 DOM 相关函数

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
pnpm install vakao-ui
```

### 基础示例

```ts
// 组件安装
import { withInstall } from "vakao-ui/utils";
import MyComponent from "./MyComponent.vue";

const VkMyComponent = withInstall(MyComponent);

// 命名空间
import { useNamespace } from "vakao-ui/utils";
const ns = useNamespace("button");
// 'vk-button', 'vk-button__icon', 'vk-button--primary'

// 受控组件
import { useControlled } from "vakao-ui/utils";
const [value, setValue] = useControlled({
  value: props.value,
  defaultValue: props.defaultValue,
  onChange: props.onChange,
});

// 数据处理
import { deepClone, isEqual } from "vakao-ui/utils";

const original = { name: "张三", hobbies: ["读书"] };
const cloned = deepClone(original);
const isEqualResult = isEqual(original, cloned); // true

// 数组操作
import { unique, groupBy } from "vakao-ui/utils";
const numbers = [1, 2, 2, 3, 3, 3];
const uniqueNumbers = unique(numbers); // [1, 2, 3]

// 字符串操作
import { capitalize, camelCase } from "vakao-ui/utils";
const text = capitalize("hello world"); // "Hello world"
const camelText = camelCase("hello-world"); // "helloWorld"

// 类型守卫
import { isString, isNumber } from "vakao-ui/utils";
if (isString(value)) {
  // TypeScript 知道 value 是 string 类型
  console.log(value.toUpperCase());
}

// 日期格式化
import { formatDate, DATE_FORMATS } from "vakao-ui/utils";
const formatted = formatDate(new Date(), DATE_FORMATS.DATETIME);

// DOM 操作
import { addClass, removeClass, getStyle } from "vakao-ui/utils";
const element = document.getElementById("myElement");
addClass(element, "active");
const color = getStyle(element, "color");

// 数学计算
import { clamp, randomInt } from "vakao-ui/utils";
const value = clamp(150, 0, 100); // 100
const random = randomInt(1, 10); // 1-10 之间的随机整数
```

## 注意事项

1. 所有工具函数都支持 Tree Shaking，按需打包
2. 类型工具仅在 TypeScript 环境下有效
3. 建议在组件库开发中使用这些工具保持一致性
4. 部分函数提供了处理循环引用的版本
5. 日期相关函数支持多种语言环境和时区
