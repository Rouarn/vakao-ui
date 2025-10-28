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
 * 安全的数值转换函数
 * @param value 要转换的值
 * @param fallback 转换失败时的后备值
 * @returns 安全的数值
 */
function toSafeNumber(value: any, fallback: number = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

/**
 * 应用边界约束
 * @param value 要约束的值
 * @param min 最小值
 * @param max 最大值
 * @returns 约束后的值
 */
function applyConstraints(value: number, min?: number, max?: number): number {
  let result = value;

  if (typeof min === "number" && Number.isFinite(min)) {
    result = Math.max(result, min);
  }

  if (typeof max === "number" && Number.isFinite(max)) {
    result = Math.min(result, max);
  }

  return result;
}

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
  } = {},
): UseCounterReturn {
  // 安全地处理初始值
  const safeInitialValue = toSafeNumber(initialValue, 0);
  const safeMin = typeof options.min === "number" ? toSafeNumber(options.min) : undefined;
  const safeMax = typeof options.max === "number" ? toSafeNumber(options.max) : undefined;

  // 应用初始约束
  const constrainedInitialValue = applyConstraints(safeInitialValue, safeMin, safeMax);

  const count = ref(constrainedInitialValue);

  // 创建只读的计算属性
  const readonlyCount = computed(() => count.value);

  function increment(delta: number = 1) {
    const safeDelta = toSafeNumber(delta, 1);
    const newValue = count.value + safeDelta;
    count.value = applyConstraints(newValue, safeMin, safeMax);
  }

  function decrement(delta: number = 1) {
    const safeDelta = toSafeNumber(delta, 1);
    const newValue = count.value - safeDelta;
    count.value = applyConstraints(newValue, safeMin, safeMax);
  }

  function reset() {
    count.value = constrainedInitialValue;
  }

  function setCount(value: number) {
    const safeValue = toSafeNumber(value, count.value);
    count.value = applyConstraints(safeValue, safeMin, safeMax);
  }

  return [readonlyCount, increment, decrement, reset, setCount];
}
