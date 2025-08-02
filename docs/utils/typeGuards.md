# 类型判断 (Type Guards)

提供了一系列用于精确检查 JavaScript 值的类型的函数。这些函数在 TypeScript 中可作为类型守卫使用，帮助缩小变量类型。

## isString

检查值是否为字符串。

- **定义**: `(val: unknown): val is string`
- **示例**:

  ```ts
  import { isString } from "vakao-ui/utils";

  isString("hello"); // true
  isString(123); // false
  ```

## isNumber

检查值是否为数字。

- **定义**: `(val: unknown): val is number`
- **示例**:

  ```ts
  import { isNumber } from "vakao-ui/utils";

  isNumber(123); // true
  isNumber("123"); // false
  ```

## isBoolean

检查值是否为布尔值。

- **定义**: `(val: unknown): val is boolean`
- **示例**:

  ```ts
  import { isBoolean } from "vakao-ui/utils";

  isBoolean(true); // true
  isBoolean(0); // false
  ```

## isFunction

检查值是否为函数。

- **定义**: `(val: unknown): val is (...args: unknown[]) => unknown`
- **示例**:

  ```ts
  import { isFunction } from "vakao-ui/utils";

  isFunction(() => {}); // true
  isFunction(null); // false
  ```

## isObject

检查值是否为普通对象（不包括数组、null 等）。

- **定义**: `(val: unknown): val is Record<PropertyKey, unknown>`
- **示例**:

  ```ts
  import { isObject } from "vakao-ui/utils";

  isObject({}); // true
  isObject([]); // false
  isObject(null); // false
  ```

## isArray

检查值是否为数组。

- **定义**: `(val: unknown): val is any[]`
- **示例**:

  ```ts
  import { isArray } from "vakao-ui/utils";

  isArray([]); // true
  isArray({}); // false
  ```

## isPromise

检查值是否为 Promise 对象。

- **定义**: `(val: unknown): val is Promise<unknown>`
- **示例**:

  ```ts
  import { isPromise } from "vakao-ui/utils";

  isPromise(new Promise(() => {})); // true
  isPromise(Promise.resolve()); // true
  ```

## isElement

检查值是否为 DOM 元素。

- **定义**: `(val: unknown): val is Element`
- **示例**:

  ```ts
  import { isElement } from "vakao-ui/utils";

  isElement(document.body); // true
  isElement({}); // false
  ```

## isVNode

检查值是否为 Vue 的 VNode（虚拟节点）。

- **定义**: `(val: unknown): val is VNode`
- **示例**:

  ```ts
  import { h } from "vue";
  import { isVNode } from "vakao-ui/utils";

  const vnode = h("div");
  isVNode(vnode); // true
  ```

## isClient / isServer

检查当前代码的运行环境。

- **isClient**: 如果在浏览器环境中，值为 `true`。
- **isServer**: 如果在 Node.js 等服务器环境中，值为 `true`。
- **示例**:

  ```ts
  import { isClient } from "vakao-ui/utils";

  if (isClient) {
    // 这段代码只会在浏览器中执行
    console.log(window.innerWidth);
  }
  ```
