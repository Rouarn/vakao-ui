import type { ComputedRef } from "vue";
import { ref, computed } from "vue";
import type { ResetFunction } from "../types/shared";

/**
 * 增加计数的函数类型
 * @description 将计数值增加指定数量
 */
export type IncrementFunction = (_delta?: number) => void;

/**
 * 减少计数的函数类型
 * @description 将计数值减少指定数量
 */
export type DecrementFunction = (_delta?: number) => void;

/**
 * 设置计数的函数类型
 * @description 将计数值设置为指定值
 */
export type SetCountFunction = (_value: number) => void;

/**
 * useCounter 钩子函数的返回值类型
 * @description 返回一个包含计数状态和操作函数的数组，可以通过数组解构使用
 * @example
 * ```typescript
 * const [count, increment, decrement, reset, setCount] = useCounter(0);
 * ```
 */
export type UseCounterReturn = [
  /** 当前计数值的只读响应式引用 */
  ComputedRef<number>,
  /** 增加计数的函数 */
  IncrementFunction,
  /** 减少计数的函数 */
  DecrementFunction,
  /** 重置计数的函数 */
  ResetFunction,
  /** 设置计数的函数 */
  SetCountFunction,
];

/**
 * 计数器钩子函数
 * @param initialValue 初始计数值，默认为0
 * @param options 配置选项
 * @param options.min 最小值限制
 * @param options.max 最大值限制
 * @returns 返回数组 [count, increment, decrement, reset, setCount]
 * @example
 * ```typescript
 * // 基础用法
 * const [count, increment, decrement] = useCounter(0);
 *
 * // 带限制的用法
 * const [score, addScore, minusScore, resetScore] = useCounter(0, { min: 0, max: 100 });
 *
 * // 完整用法
 * const [value, inc, dec, reset, setValue] = useCounter(10, { min: 0, max: 20 });
 * ```
 */
export function useCounter(
  initialValue: number = 0,
  options: {
    min?: number;
    max?: number;
  } = {}
): UseCounterReturn {
  const { min, max } = options;
  const count = ref(initialValue);

  // 创建只读的计算属性
  const readonlyCount = computed(() => count.value);

  function increment(delta: number = 1) {
    const newValue = count.value + delta;
    count.value = max !== undefined ? Math.min(newValue, max) : newValue;
  }

  function decrement(delta: number = 1) {
    const newValue = count.value - delta;
    count.value = min !== undefined ? Math.max(newValue, min) : newValue;
  }

  function reset() {
    count.value = initialValue;
  }

  function setCount(value: number) {
    let newValue = value;
    if (min !== undefined) {
      newValue = Math.max(newValue, min);
    }
    if (max !== undefined) {
      newValue = Math.min(newValue, max);
    }
    count.value = newValue;
  }

  return [readonlyCount, increment, decrement, reset, setCount];
}
