import type { Ref, ComputedRef } from "vue";
import { ref, watch, onUnmounted, computed } from "vue";

/**
 * 节流函数类型
 * @description 节流处理后的函数
 */
export type ThrottledFunction<T extends (...args: unknown[]) => unknown> = (...args: Parameters<T>) => void;

/**
 * 取消节流的函数类型
 * @description 取消当前的节流延迟
 */
export type ThrottleCancelFunction = () => void;

/**
 * 立即执行的函数类型
 * @description 立即执行节流函数，忽略限制
 */
export type ThrottleFlushFunction = () => void;

/**
 * useThrottle 钩子函数的返回值类型（用于节流值）
 * @description 返回节流后的只读响应式值
 * @example
 * ```typescript
 * const throttledValue = useThrottle(scrollPosition, 100);
 * ```
 */
export type UseThrottledValueReturn<T> = ComputedRef<T>;

/**
 * useThrottle 钩子函数的返回值类型（用于节流函数）
 * @description 返回一个包含节流函数和控制函数的数组
 * @example
 * ```typescript
 * const [throttledFn, cancel, flush] = useThrottle(fn, 100);
 * ```
 */
export type UseThrottledFunctionReturn<T extends (...args: unknown[]) => unknown> = [
  /** 节流处理后的函数 */
  ThrottledFunction<T>,
  /** 取消节流的函数 */
  ThrottleCancelFunction,
  /** 立即执行的函数 */
  ThrottleFlushFunction,
];

/**
 * 节流值钩子函数
 * @param value 要节流的响应式值
 * @param delay 节流延迟时间（毫秒）
 * @returns 返回节流后的响应式值
 * @example
 * ```typescript
 * // 节流滚动位置
 * const scrollY = ref(0);
 * const throttledScrollY = useThrottle(scrollY, 100);
 *
 * // 监听节流后的值
 * watch(throttledScrollY, (newValue) => {
 *   console.log('滚动位置:', newValue);
 * });
 * ```
 */
export function useThrottle<T>(value: Ref<T>, delay: number): UseThrottledValueReturn<T>;

/**
 * 节流函数钩子函数
 * @param fn 要节流的函数
 * @param delay 节流延迟时间（毫秒）
 * @param options 配置选项
 * @param options.leading 是否在延迟开始时立即调用函数
 * @param options.trailing 是否在延迟结束后调用函数
 * @returns 返回数组 [throttledFn, cancel, flush]
 * @example
 * ```typescript
 * // 节流滚动事件
 * const handleScroll = () => console.log('scrolling');
 * const [throttledScroll] = useThrottle(handleScroll, 100);
 *
 * // 节流搜索函数
 * const search = (query: string) => console.log('searching:', query);
 * const [throttledSearch, cancel, flush] = useThrottle(search, 300, { trailing: false });
 * ```
 */
export function useThrottle<T extends (..._args: unknown[]) => unknown>(
  fn: T,
  delay: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  },
): UseThrottledFunctionReturn<T>;

/**
 * 节流钩子函数实现
 */
export function useThrottle<T>(
  valueOrFn: Ref<T> | ((..._args: unknown[]) => unknown),

  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
): UseThrottledValueReturn<T> | UseThrottledFunctionReturn<(..._args: unknown[]) => unknown> {
  // 如果第一个参数是 ref，则处理节流值
  if (typeof valueOrFn === "object" && "value" in valueOrFn) {
    return useThrottledValue(valueOrFn as Ref<T>, delay);
  }

  // 否则处理节流函数
  return useThrottledFunction(valueOrFn as (..._args: unknown[]) => unknown, delay, options);
}

/**
 * 节流值的内部实现
 */
function useThrottledValue<T>(value: Ref<T>, delay: number): UseThrottledValueReturn<T> {
  const throttledValue = ref<T>(value.value) as Ref<T>;
  let lastUpdateTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // 创建只读的计算属性
  const readonlyThrottledValue = computed(() => throttledValue.value);

  const updateThrottledValue = () => {
    throttledValue.value = value.value;
    lastUpdateTime = Date.now();
  };

  watch(
    value,
    () => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdateTime;

      if (timeSinceLastUpdate >= delay) {
        // 如果距离上次更新已经超过延迟时间，立即更新
        updateThrottledValue();
      } else {
        // 否则设置定时器在剩余时间后更新
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          updateThrottledValue();
          timeoutId = null;
        }, delay - timeSinceLastUpdate);
      }
    },
    { immediate: false },
  );

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  });

  return readonlyThrottledValue;
}

/**
 * 节流函数的内部实现
 */
function useThrottledFunction<T extends (..._args: unknown[]) => unknown>(
  fn: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {},
): UseThrottledFunctionReturn<T> {
  const { leading = true, trailing = true } = options;

  let lastCallTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
  };

  const flush = () => {
    if (timeoutId !== null && lastArgs !== null) {
      cancel();
      fn(...lastArgs);
      lastCallTime = Date.now();
    }
  };

  const throttledFn = (..._args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = _args;

    const timeSinceLastCall = now - lastCallTime;

    if (lastCallTime === 0 && leading) {
      // 第一次调用且允许 leading
      fn(..._args);
      lastCallTime = now;
      return;
    }

    if (timeSinceLastCall >= delay) {
      // 距离上次调用已经超过延迟时间
      if (leading) {
        fn(..._args);
        lastCallTime = now;
      } else if (trailing) {
        // 如果不允许 leading，但允许 trailing，则设置定时器
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          fn(..._args);
          lastCallTime = Date.now();
          timeoutId = null;
        }, delay);
      }
    } else if (trailing) {
      // 距离上次调用还没有超过延迟时间，但允许 trailing
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(..._args);
        lastCallTime = Date.now();
        timeoutId = null;
      }, delay - timeSinceLastCall);
    }
  };

  onUnmounted(() => {
    cancel();
  });

  return [throttledFn, cancel, flush];
}
