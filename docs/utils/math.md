# 数学与随机数 (Math & Random)

提供了一系列用于数学计算和生成随机数的函数。

## clamp

将一个数字限制在指定的最小值和最大值之间。

- **定义**: `(num: number, min: number, max: number): number`
- **示例**:

  ```ts
  import { clamp } from "vakao-ui/utils";

  clamp(5, 0, 10); // 5
  clamp(-5, 0, 10); // 0
  clamp(15, 0, 10); // 10
  ```

## random

生成一个指定范围内的随机整数，范围包含最小值和最大值。

- **定义**: `(min: number, max: number): number`
- **示例**:

  ```ts
  import { random } from "vakao-ui/utils";

  // 生成 1 到 10 之间的随机整数
  const randomNumber = random(1, 10);
  ```

## uniqueId

生成一个唯一的 ID 字符串，可以指定前缀。该函数在每次调用时都会返回一个递增的 ID。

- **定义**: `(prefix?: string): string`
- **参数**:
  - `prefix` (可选): `string`，ID 的前缀，默认为 `'uid-'`。
- **示例**:

  ```ts
  import { uniqueId } from "vakao-ui/utils";

  uniqueId(); // 'uid-1'
  uniqueId(); // 'uid-2'
  uniqueId("user-"); // 'user-3'
  uniqueId("user-"); // 'user-4'
  ```
