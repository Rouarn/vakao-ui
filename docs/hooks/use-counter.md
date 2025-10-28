# useCounter

计数器钩子，提供数值的增减操作和边界控制。

## 基本用法

最简单的计数器用法，提供增减、重置和设置值的功能。

<Demo>
  <div>
    <p style="font-size: 18px; margin-bottom: 16px;">计数: <strong>{{ basicCount }}</strong></p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="basicIncrement">+1</vk-button>
      <vk-button @click="basicDecrement">-1</vk-button>
      <vk-button @click="basicReset" type="warning">重置</vk-button>
      <vk-button @click="() => basicSetCount(10)" type="primary">设置为 10</vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <div>
      <vk-button @click="increment">+1</vk-button>
      <vk-button @click="decrement">-1</vk-button>
      <vk-button @click="reset">重置</vk-button>
      <vk-button @click="() => setCount(10)">设置为 10</vk-button>
    </div>
  </div>
</template>

<script setup>
import { useCounter } from "vakao-ui";

const [count, increment, decrement, reset, setCount] = useCounter(0);
</script>
```

  </template>
</Demo>

## 带边界限制

设置最小值和最大值来限制计数器的范围。

<Demo>
  <div>
    <p style="font-size: 18px; margin-bottom: 8px;">计数: <strong>{{ boundedCount }}</strong></p>
    <p style="color: #666; margin-bottom: 16px;">范围: 0 - 10</p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="boundedIncrement" :disabled="boundedCount >= 10">+1</vk-button>
      <vk-button @click="boundedDecrement" :disabled="boundedCount <= 0">-1</vk-button>
      <vk-button @click="boundedReset" type="warning">重置</vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <p>范围: 0 - 10</p>
    <div>
      <vk-button @click="increment" :disabled="count >= 10">+1</vk-button>
      <vk-button @click="decrement" :disabled="count <= 0">-1</vk-button>
      <vk-button @click="reset">重置</vk-button>
    </div>
  </div>
</template>

<script setup>
import { useCounter } from "vakao-ui";

const [count, increment, decrement, reset] = useCounter(5, {
  min: 0,
  max: 10,
});
</script>
```

  </template>
</Demo>

## 自定义步长

可以为增减操作指定自定义的步长值。

<Demo>
  <div>
    <p style="font-size: 18px; margin-bottom: 16px;">计数: <strong>{{ stepCount }}</strong></p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="() => stepIncrement(5)" type="primary">+5</vk-button>
      <vk-button @click="() => stepDecrement(3)" type="primary">-3</vk-button>
      <vk-button @click="() => stepIncrement(1)">+1</vk-button>
      <vk-button @click="() => stepDecrement(1)">-1</vk-button>
      <vk-button @click="stepReset" type="warning">重置</vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
    <div>
      <vk-button @click="() => increment(5)">+5</vk-button>
      <vk-button @click="() => decrement(3)">-3</vk-button>
      <vk-button @click="() => increment(1)">+1</vk-button>
      <vk-button @click="() => decrement(1)">-1</vk-button>
      <vk-button @click="reset">重置</vk-button>
    </div>
  </div>
</template>

<script setup>
import { useCounter } from "vakao-ui";

const [count, increment, decrement, reset] = useCounter(0);
</script>
```

  </template>
</Demo>

## API

### 参数

| 参数         | 类型                | 默认值 | 说明     |
| ------------ | ------------------- | ------ | -------- |
| initialValue | `number`            | `0`    | 初始值   |
| options      | `UseCounterOptions` | `{}`   | 配置选项 |

### UseCounterOptions

| 属性 | 类型     | 默认值      | 说明   |
| ---- | -------- | ----------- | ------ |
| min  | `number` | `undefined` | 最小值 |
| max  | `number` | `undefined` | 最大值 |

### 返回值

返回一个数组 `[count, increment, decrement, reset, setCount]`：

| 索引 | 名称      | 类型                | 说明       |
| ---- | --------- | ------------------- | ---------- |
| 0    | count     | `Ref<number>`       | 当前计数值 |
| 1    | increment | `IncrementFunction` | 增加函数   |
| 2    | decrement | `DecrementFunction` | 减少函数   |
| 3    | reset     | `ResetFunction`     | 重置函数   |
| 4    | setCount  | `SetCountFunction`  | 设置值函数 |

### 类型定义

```ts
/**
 * 增加函数类型
 * @param step 步长，默认为 1
 */
type IncrementFunction = (step?: number) => void;

/**
 * 减少函数类型
 * @param step 步长，默认为 1
 */
type DecrementFunction = (step?: number) => void;

/**
 * 重置函数类型
 */
type ResetFunction = () => void;

/**
 * 设置计数值函数类型
 * @param value 要设置的值
 */
type SetCountFunction = (value: number) => void;

/**
 * useCounter 返回值类型
 * @example
 * const [count, increment, decrement, reset, setCount] = useCounter(0);
 */
type UseCounterReturn = [
  /** 当前计数值 */ Ref<number>,
  /** 增加函数 */ IncrementFunction,
  /** 减少函数 */ DecrementFunction,
  /** 重置函数 */ ResetFunction,
  /** 设置值函数 */ SetCountFunction,
];

/**
 * useCounter 配置选项
 */
interface UseCounterOptions {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
}

/**
 * 计数器钩子
 * @param initialValue 初始值，默认为 0
 * @param options 配置选项
 * @returns UseCounterReturn
 * @example
 * const [count, increment, decrement, reset, setCount] = useCounter(0, { min: 0, max: 100 });
 */
function useCounter(initialValue?: number, options?: UseCounterOptions): UseCounterReturn;
```

## 注意事项

1. **边界控制** - 当设置了 `min` 或 `max` 时，计数值会被限制在指定范围内
2. **步长参数** - `increment` 和 `decrement` 函数支持自定义步长
3. **响应式** - 返回的 `count` 是响应式的，可以直接在模板中使用
4. **类型安全** - 所有函数都有完整的 TypeScript 类型支持
5. **数组解构** - 支持数组解构，可以重命名变量或跳过不需要的函数

## 使用场景

- 商品数量选择器
- 分页组件的页码控制
- 评分组件
- 游戏分数计算
- 任何需要数值增减的场景

<script lang="ts" setup>
import { useCounter } from '@vakao-ui/hooks';

// 基本用法示例
const [basicCount, basicIncrement, basicDecrement, basicReset, basicSetCount] = useCounter(0);

// 带边界限制示例
const [boundedCount, boundedIncrement, boundedDecrement, boundedReset] = useCounter(5, {
  min: 0,
  max: 10
});

// 自定义步长示例
const [stepCount, stepIncrement, stepDecrement, stepReset] = useCounter(0);
</script>
