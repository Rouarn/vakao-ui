import { isObject } from "./typeTool";

/**
 * 从对象中忽略指定的属性，返回一个新对象
 * @param obj - 源对象
 * @param keys - 要忽略的属性键数组
 * @returns 忽略指定属性后的新对象
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['a', 'c']); // { b: 2 }
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  if (!isObject(obj)) return {} as Omit<T, K>;
  const newObj = { ...obj };
  for (const key of keys) {
    delete newObj[key];
  }
  return newObj;
};

/**
 * 从对象中选择指定的属性，返回一个新对象
 * @param obj - 源对象
 * @param keys - 要选择的属性键数组
 * @returns 包含所选属性的新对象
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, ['a', 'c']); // { a: 1, c: 3 }
 */
export const pick = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  if (!isObject(obj)) return {} as Pick<T, K>;
  const newObj = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
 * 深度合并一个或多个对象
 * 后面的对象会覆盖前面对象的同名属性
 * @param target - 目标对象
 * @param sources - 一个或多个源对象
 * @returns 合并后的新对象
 * @example
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * merge(obj1, obj2); // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
export const merge = <T extends Record<string, unknown>>(target: T, ...sources: unknown[]): T => {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} });
        }
        merge(target[key] as Record<string, unknown>, source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return merge(target, ...sources);
};

/**
 * 检查值是否为空
 * 支持检查对象、数组和字符串
 * @param val - 要检查的值
 * @returns 如果值为空则返回 true，否则返回 false
 * @example
 * isEmpty({}); // true
 * isEmpty([]); // true
 * isEmpty(''); // true
 * isEmpty(null); // true
 * isEmpty({ a: 1 }); // false
 */
export const isEmpty = (val: unknown): boolean => {
  if (val == null) return true;
  if (Array.isArray(val) || typeof val === "string") {
    return val.length === 0;
  }
  if (typeof val === "object") {
    return Object.keys(val).length === 0;
  }
  return false;
};
