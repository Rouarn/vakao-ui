/**
 * 深拷贝函数
 * 支持对象、数组、Date、RegExp、Map、Set 等类型的深度拷贝
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
  // 处理 null 和 undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // 处理基本类型
  if (typeof obj !== "object") {
    return obj;
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  // 处理 Map 对象
  if (obj instanceof Map) {
    const clonedMap = new Map();
    for (const [key, value] of obj) {
      clonedMap.set(deepClone(key), deepClone(value));
    }
    return clonedMap as T;
  }

  // 处理 Set 对象
  if (obj instanceof Set) {
    const clonedSet = new Set();
    for (const value of obj) {
      clonedSet.add(deepClone(value));
    }
    return clonedSet as T;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  // 处理普通对象
  const clonedObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      (clonedObj as Record<string, unknown>)[key] = deepClone(
        (obj as Record<string, unknown>)[key],
      );
    }
  }

  return clonedObj;
};

/**
 * 深拷贝函数（支持循环引用）
 * @param obj 要拷贝的对象
 * @param visited 已访问的对象映射，用于处理循环引用
 * @returns 深拷贝后的对象
 */
export const deepCloneWithCircular = <T>(
  obj: T,
  visited: WeakMap<object, unknown> = new WeakMap(),
): T => {
  // 处理 null 和 undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // 处理基本类型
  if (typeof obj !== "object") {
    return obj;
  }

  // 检查循环引用
  if (visited.has(obj as object)) {
    return visited.get(obj as object) as T;
  }

  let clonedObj: unknown;

  // 处理 Date 对象
  if (obj instanceof Date) {
    clonedObj = new Date(obj.getTime());
  }
  // 处理 RegExp 对象
  else if (obj instanceof RegExp) {
    clonedObj = new RegExp(obj.source, obj.flags);
  }
  // 处理 Map 对象
  else if (obj instanceof Map) {
    clonedObj = new Map();
    visited.set(obj as object, clonedObj);
    for (const [key, value] of obj) {
      (clonedObj as Map<unknown, unknown>).set(
        deepCloneWithCircular(key, visited),
        deepCloneWithCircular(value, visited),
      );
    }
  }
  // 处理 Set 对象
  else if (obj instanceof Set) {
    clonedObj = new Set();
    visited.set(obj as object, clonedObj);
    for (const value of obj) {
      (clonedObj as Set<unknown>).add(deepCloneWithCircular(value, visited));
    }
  }
  // 处理数组
  else if (Array.isArray(obj)) {
    clonedObj = [];
    visited.set(obj as object, clonedObj);
    for (let i = 0; i < obj.length; i++) {
      (clonedObj as unknown[])[i] = deepCloneWithCircular(obj[i], visited);
    }
  }
  // 处理普通对象
  else {
    clonedObj = {};
    visited.set(obj as object, clonedObj);
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (clonedObj as Record<string, unknown>)[key] = deepCloneWithCircular(
          (obj as Record<string, unknown>)[key],
          visited,
        );
      }
    }
  }

  return clonedObj as T;
};
