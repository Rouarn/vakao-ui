/**
 * 创建一个只能调用一次的函数。
 * 重复调用会返回第一次调用的结果。
 * @param fn - 要限制的函数。
 * @returns 返回新的受限函数。
 * @example
 * const initialize = once(() => { console.log('Initialized!'); return true; });
 * initialize(); // Logs 'Initialized!' and returns true
 * initialize(); // Returns true without logging
 */
export const once = <T extends (...args: unknown[]) => unknown>(fn: T): T => {
  let hasBeenCalled = false;
  let result: ReturnType<T>;

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (hasBeenCalled) {
      return result;
    }
    hasBeenCalled = true;
    result = fn.apply(this, args) as ReturnType<T>;
    return result;
  } as T;
};

/**
 * 记忆化函数，缓存函数调用的结果。
 * @param fn - 要记忆化的函数。
 * @param resolver - 一个可选函数，用于从参数生成缓存的 key。默认使用第一个参数作为 key。
 * @returns 返回新的记忆化函数。
 * @example
 * const expensiveCalculation = (num) => { console.log('Calculating...'); return num * 2; };
 * const memoizedCalc = memoize(expensiveCalculation);
 * memoizedCalc(5); // 'Calculating...', returns 10
 * memoizedCalc(5); // returns 10 (no log)
 *
 * const complexKeyFunc = (a, b) => a + '-' + b;
 * const memoizedComplex = memoize((a, b) => a + b, complexKeyFunc);
 * memoizedComplex(2, 3); // returns 5
 */
export const memoize = <T extends (...args: unknown[]) => unknown>(fn: T, resolver?: (...args: Parameters<T>) => string | number): T => {
  const cache = new Map<string | number, ReturnType<T>>();

  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver ? resolver(...args) : (args[0] as string | number);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = fn.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T;
};
