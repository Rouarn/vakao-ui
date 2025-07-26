import { ref, Ref, watch, onUnmounted, computed, ComputedRef } from 'vue';

/**
 * 防抖函数类型
 * @description 防抖处理后的函数
 */
export type DebouncedFunction<T extends (..._args: any[]) => any> = (
  ..._args: Parameters<T>
) => void;

/**
 * 取消防抖的函数类型
 * @description 取消当前的防抖延迟
 */
export type DebounceCancelFunction = () => void;

/**
 * 立即执行的函数类型
 * @description 立即执行防抖函数，忽略延迟
 */
export type DebounceFlushFunction = () => void;

/**
 * useDebounce 钩子函数的返回值类型（用于防抖值）
 * @description 返回防抖后的只读响应式值
 * @example
 * ```typescript
 * const debouncedValue = useDebounce(searchText, 300);
 * ```
 */
export type UseDebouncedValueReturn<T> = ComputedRef<T>;

/**
 * useDebounce 钩子函数的返回值类型（用于防抖函数）
 * @description 返回一个包含防抖函数和控制函数的数组
 * @example
 * ```typescript
 * const [debouncedFn, cancel, flush] = useDebounce(fn, 300);
 * ```
 */
export type UseDebouncedFunctionReturn<T extends (..._args: any[]) => any> = [
  /** 防抖处理后的函数 */
  DebouncedFunction<T>,
  /** 取消防抖的函数 */
  DebounceCancelFunction,
  /** 立即执行的函数 */
  DebounceFlushFunction,
];

/**
 * 防抖值钩子函数
 * @param value 要防抖的响应式值
 * @param delay 防抖延迟时间（毫秒）
 * @returns 返回防抖后的响应式值
 * @example
 * ```typescript
 * // 防抖搜索输入
 * const searchText = ref('');
 * const debouncedSearchText = useDebounce(searchText, 300);
 *
 * // 监听防抖后的值
 * watch(debouncedSearchText, (newValue) => {
 *   console.log('搜索:', newValue);
 * });
 * ```
 */
export function useDebounce<T>(
  value: Ref<T>,
  delay: number
): UseDebouncedValueReturn<T>;

/**
 * 防抖函数钩子函数
 * @param fn 要防抖的函数
 * @param delay 防抖延迟时间（毫秒）
 * @param options 配置选项
 * @param options.leading 是否在延迟开始前调用函数
 * @param options.trailing 是否在延迟结束后调用函数
 * @returns 返回数组 [debouncedFn, cancel, flush]
 * @example
 * ```typescript
 * // 防抖按钮点击
 * const handleClick = () => console.log('clicked');
 * const [debouncedClick, cancel, flush] = useDebounce(handleClick, 300);
 *
 * // 防抖搜索函数
 * const search = (query: string) => console.log('searching:', query);
 * const [debouncedSearch] = useDebounce(search, 500, { leading: true });
 * ```
 */
export function useDebounce<T extends (..._args: any[]) => any>(
  fn: T,
  delay: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
  }
): UseDebouncedFunctionReturn<T>;

/**
 * 防抖钩子函数实现
 */
export function useDebounce<T>(
  valueOrFn: Ref<T> | ((..._args: any[]) => any),
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {}
): UseDebouncedValueReturn<T> | UseDebouncedFunctionReturn<any> {
  // 如果第一个参数是 ref，则处理防抖值
  if (typeof valueOrFn === 'object' && 'value' in valueOrFn) {
    return useDebouncedValue(valueOrFn as Ref<T>, delay);
  }

  // 否则处理防抖函数
  return useDebouncedFunction(
    valueOrFn as (..._args: any[]) => any,
    delay,
    options
  );
}

/**
 * 防抖值的内部实现
 */
function useDebouncedValue<T>(
  value: Ref<T>,
  delay: number
): UseDebouncedValueReturn<T> {
  const debouncedValue = ref<T>(value.value) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // 创建只读的计算属性
  const readonlyDebouncedValue = computed(() => debouncedValue.value);

  const updateDebouncedValue = () => {
    debouncedValue.value = value.value;
  };

  watch(
    value,
    () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(updateDebouncedValue, delay);
    },
    { immediate: false }
  );

  onUnmounted(() => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  });

  return readonlyDebouncedValue;
}

/**
 * 防抖函数的内部实现
 */
function useDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
  } = {}
): UseDebouncedFunctionReturn<T> {
  const { leading = false, trailing = true } = options;

  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime: number | null = null;

  const cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastCallTime = null;
  };

  const flush = () => {
    if (timeoutId !== null && lastArgs !== null) {
      cancel();
      fn(...lastArgs);
    }
  };

  const debouncedFn = (...args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = args;

    const shouldCallLeading =
      leading && (lastCallTime === null || now - lastCallTime >= delay);

    if (shouldCallLeading) {
      lastCallTime = now;
      fn(...args);
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    if (trailing) {
      timeoutId = setTimeout(() => {
        if (
          !leading ||
          (lastCallTime !== null && now - lastCallTime >= delay)
        ) {
          fn(...args);
        }
        lastCallTime = Date.now();
        timeoutId = null;
      }, delay);
    }
  };

  onUnmounted(() => {
    cancel();
  });

  return [debouncedFn, cancel, flush];
}
