/**
 * 从数组中移除重复的原始值
 * @param arr - 要处理的数组
 * @returns 去重后的新数组
 * @example
 * unique([1, 2, 2, 3, 1]); // [1, 2, 3]
 */
export const unique = <T>(arr: T[]): T[] => {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
};

/**
 * 将嵌套数组扁平化
 * @param arr - 要扁平化的数组
 * @param depth - 扁平化的深度，默认为 1
 * @returns 扁平化后的新数组
 * @example
 * flatten([1, [2, [3, [4]], 5]]); // [1, 2, [3, [4]], 5]
 * flatten([1, [2, [3, [4]], 5]], Infinity); // [1, 2, 3, 4, 5]
 */
export const flatten = <T>(arr: T[], depth = 1): unknown[] => {
  if (!Array.isArray(arr)) return [];
  return depth > 0 ? arr.reduce((acc: unknown[], val) => acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val), []) : arr.slice();
};

/**
 * 根据指定的键或函数对数组进行分组
 * @param arr - 要分组的数组
 * @param keyOrFn - 用于分组的对象的键或一个返回分组键的函数
 * @returns 分组后的对象
 * @example
 * const people = [{ name: 'Alice', age: 21 }, { name: 'Bob', age: 24 }, { name: 'Charlie', age: 21 }];
 * groupBy(people, 'age'); // { '21': [ ... ], '24': [ ... ] }
 * groupBy(people, p => p.name.length); // { '5': [ ... ], '3': [ ... ], '7': [ ... ] }
 */
export const groupBy = <T extends Record<string, unknown>>(
  arr: T[],
  keyOrFn: string | ((item: T) => string | number),
): Record<string, T[]> => {
  return arr.reduce(
    (result, item) => {
      const key = typeof keyOrFn === "function" ? keyOrFn(item) : (item[keyOrFn] as string | number);
      (result[key] = result[key] || []).push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
};

/**
 * 将数组分割成指定大小的块
 * @param arr - 要分割的数组
 * @param size - 每个块的大小
 * @returns 包含块的二维数组
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};
