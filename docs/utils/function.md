# 函数工具 (Function Utilities)

提供了一系列高阶函数，用于增强或控制其他函数的行为。

## once

创建一个只能被调用一次的函数。无论后续调用多少次，都将返回第一次执行的结果。

- **定义**: `<T extends (...args: unknown[]) => unknown>(fn: T): T`
- **示例**:

  ```ts
  import { once } from "vakao-ui/utils";

  let count = 0;
  const initialize = once(() => {
    count++;
    console.log("Initialized!");
    return true;
  });

  initialize(); // 控制台输出 'Initialized!'，返回 true，count 变为 1
  initialize(); // 不会输出任何内容，直接返回 true，count 仍然是 1
  initialize(); // 同上
  ```

## memoize

记忆化一个函数。即缓存函数的计算结果，当使用相同的参数再次调用时，直接返回缓存的结果，而无需重新计算。

- **定义**: `<T extends (...args: unknown[]) => unknown>(fn: T, resolver?: (...args: Parameters<T>) => string | number): T`
- **参数**:
  - `resolver` (可选): 一个函数，用于根据输入参数生成一个唯一的缓存键（`key`）。如果未提供，默认使用第一个参数作为 `key`。
- **示例**:

  ```ts
  import { memoize } from "vakao-ui/utils";

  // 基础用法
  const expensiveCalculation = (num) => {
    console.log(`Calculating for ${num}...`);
    return num * 2;
  };
  const memoizedCalc = memoize(expensiveCalculation);

  memoizedCalc(5); // 控制台输出 'Calculating for 5...'，返回 10
  memoizedCalc(5); // 直接返回 10，无输出
  memoizedCalc(10); // 控制台输出 'Calculating for 10...'，返回 20

  // 使用自定义 resolver
  const complexKeyFunc = (a, b) => `${a}-${b}`;
  const memoizedComplex = memoize((a, b) => {
    console.log(`Adding ${a} and ${b}...`);
    return a + b;
  }, complexKeyFunc);

  memoizedComplex(2, 3); // 控制台输出 'Adding 2 and 3...'，返回 5
  memoizedComplex(2, 3); // 直接返回 5，无输出
  ```
