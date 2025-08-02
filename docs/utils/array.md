# 数组操作 (Array Utilities)

提供了一系列用于处理和转换数组的实用函数。

## unique

从数组中移除重复的原始值，返回一个新数组。

- **定义**: `<T>(arr: T[]): T[]`
- **示例**:

  ```ts
  import { unique } from "vakao-ui/utils";

  unique([1, 2, 2, 3, 1]); // [1, 2, 3]
  unique(["a", "b", "a"]); // ['a', 'b']
  ```

## flatten

将嵌套数组扁平化到指定深度。

- **定义**: `<T>(arr: T[], depth = 1): unknown[]`
- **参数**:
  - `depth` (可选): `number`，要扁平化的深度，默认为 `1`。设置为 `Infinity` 可以完全扁平化。
- **示例**:

  ```ts
  import { flatten } from "vakao-ui/utils";

  const nested = [1, [2, [3, [4]], 5]];
  flatten(nested); // [1, 2, [3, [4]], 5]
  flatten(nested, 2); // [1, 2, 3, [4], 5]
  flatten(nested, Infinity); // [1, 2, 3, 4, 5]
  ```

## groupBy

根据指定的键或函数对数组中的对象进行分组。

- **定义**: `<T extends Record<string, unknown>>(arr: T[], keyOrFn: string | ((item: T) => string | number)): Record<string, T[]>`
- **示例**:

  ```ts
  import { groupBy } from "vakao-ui/utils";

  const people = [
    { name: "Alice", age: 21 },
    { name: "Bob", age: 24 },
    { name: "Charlie", age: 21 },
  ];

  // 按 'age' 属性分组
  groupBy(people, "age");
  // { '21': [{ name: 'Alice', ... }, { name: 'Charlie', ... }], '24': [{ name: 'Bob', ... }] }

  // 按名字长度分组
  groupBy(people, (p) => p.name.length);
  // { '5': [{ name: 'Alice', ... }], '3': [{ name: 'Bob', ... }], '7': [{ name: 'Charlie', ... }] }
  ```

## chunk

将一个数组分割成多个指定大小的子数组（块）。

- **定义**: `<T>(arr: T[], size: number): T[][]`
- **示例**:

  ```ts
  import { chunk } from "vakao-ui/utils";

  chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
  chunk(["a", "b", "c", "d"], 3); // [['a', 'b', 'c'], ['d']]
  ```
