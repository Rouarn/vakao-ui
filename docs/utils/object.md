# 对象操作 (Object Utilities)

提供了一系列用于处理和操作 JavaScript 对象的函数。

## omit

从一个对象中忽略指定的属性，并返回一个新对象。

- **定义**: `<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>`
- **示例**:

  ```ts
  import { omit } from "vakao-ui/utils";

  const obj = { a: 1, b: 2, c: 3 };
  const newObj = omit(obj, ["a", "c"]);
  // newObj is { b: 2 }
  ```

## pick

从一个对象中选择指定的属性，并返回一个新对象。

- **定义**: `<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>`
- **示例**:

  ```ts
  import { pick } from "vakao-ui/utils";

  const obj = { a: 1, b: 2, c: 3 };
  const newObj = pick(obj, ["a", "c"]);
  // newObj is { a: 1, c: 3 }
  ```

## merge

深度合并一个或多个源对象到目标对象。后面的对象会覆盖前面对象的同名属性。

- **定义**: `<T extends Record<string, unknown>>(target: T, ...sources: unknown[]): T`
- **示例**:

  ```ts
  import { merge } from "vakao-ui/utils";

  const obj1 = { a: 1, b: { c: 2 } };
  const obj2 = { b: { d: 3 }, e: 4 };
  const mergedObj = merge({}, obj1, obj2);
  // mergedObj is { a: 1, b: { c: 2, d: 3 }, e: 4 }
  ```

## isEmpty

检查一个值（对象、数组、字符串或 null/undefined）是否为空。

- **定义**: `(val: unknown): boolean`
- **示例**:

  ```ts
  import { isEmpty } from "vakao-ui/utils";

  isEmpty({}); // true
  isEmpty([]); // true
  isEmpty(""); // true
  isEmpty(null); // true
  isEmpty(undefined); // true
  isEmpty({ a: 1 }); // false
  ```
