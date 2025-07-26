/**
 * 深度比较两个值是否相等
 * 支持对象、数组、Date、RegExp、Map、Set 等类型的深度比较
 * @param a 第一个值
 * @param b 第二个值
 * @returns 如果两个值相等返回 true，否则返回 false
 */
export const isEqual = (a: any, b: any): boolean => {
  // 严格相等检查（包括 NaN）
  if (Object.is(a, b)) {
    return true;
  }

  // 类型不同直接返回 false
  if (typeof a !== typeof b) {
    return false;
  }

  // null 或 undefined 检查
  if (a === null || b === null || a === undefined || b === undefined) {
    return a === b;
  }

  // 基本类型检查
  if (typeof a !== "object") {
    return a === b;
  }

  // Date 对象比较
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // RegExp 对象比较
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // Map 对象比较
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) {
      return false;
    }
    for (const [key, value] of a) {
      if (!b.has(key) || !isEqual(value, b.get(key))) {
        return false;
      }
    }
    return true;
  }

  // Set 对象比较
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) {
      return false;
    }
    for (const value of a) {
      if (!b.has(value)) {
        // 对于对象类型的值，需要深度比较
        let found = false;
        for (const bValue of b) {
          if (isEqual(value, bValue)) {
            found = true;
            break;
          }
        }
        if (!found) {
          return false;
        }
      }
    }
    return true;
  }

  // 数组比较
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // 一个是数组，另一个不是
  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  // 普通对象比较
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 属性数量不同
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 比较每个属性
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    if (!isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

/**
 * 深度比较两个值是否相等（支持循环引用）
 * @param a 第一个值
 * @param b 第二个值
 * @param visitedA 已访问的 a 对象映射
 * @param visitedB 已访问的 b 对象映射
 * @returns 如果两个值相等返回 true，否则返回 false
 */
export const isEqualWithCircular = (
  a: any,
  b: any,
  visitedA: WeakMap<object, object> = new WeakMap(),
  visitedB: WeakMap<object, object> = new WeakMap(),
): boolean => {
  // 严格相等检查（包括 NaN）
  if (Object.is(a, b)) {
    return true;
  }

  // 类型不同直接返回 false
  if (typeof a !== typeof b) {
    return false;
  }

  // null 或 undefined 检查
  if (a === null || b === null || a === undefined || b === undefined) {
    return a === b;
  }

  // 基本类型检查
  if (typeof a !== "object") {
    return a === b;
  }

  // 循环引用检查
  if (visitedA.has(a)) {
    return visitedA.get(a) === b;
  }
  if (visitedB.has(b)) {
    return visitedB.get(b) === a;
  }

  // 记录访问过的对象
  visitedA.set(a, b);
  visitedB.set(b, a);

  try {
    // Date 对象比较
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    // RegExp 对象比较
    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }

    // Map 对象比较
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      }
      for (const [key, value] of a) {
        if (
          !b.has(key) ||
          !isEqualWithCircular(value, b.get(key), visitedA, visitedB)
        ) {
          return false;
        }
      }
      return true;
    }

    // Set 对象比较
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) {
        return false;
      }
      for (const value of a) {
        if (!b.has(value)) {
          // 对于对象类型的值，需要深度比较
          let found = false;
          for (const bValue of b) {
            if (isEqualWithCircular(value, bValue, visitedA, visitedB)) {
              found = true;
              break;
            }
          }
          if (!found) {
            return false;
          }
        }
      }
      return true;
    }

    // 数组比较
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!isEqualWithCircular(a[i], b[i], visitedA, visitedB)) {
          return false;
        }
      }
      return true;
    }

    // 一个是数组，另一个不是
    if (Array.isArray(a) || Array.isArray(b)) {
      return false;
    }

    // 普通对象比较
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // 属性数量不同
    if (keysA.length !== keysB.length) {
      return false;
    }

    // 比较每个属性
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (!isEqualWithCircular(a[key], b[key], visitedA, visitedB)) {
        return false;
      }
    }

    return true;
  } finally {
    // 清理访问记录
    visitedA.delete(a);
    visitedB.delete(b);
  }
};

/**
 * 浅比较两个对象是否相等
 * 只比较第一层属性，不进行深度比较
 * @param a 第一个对象
 * @param b 第二个对象
 * @returns 如果两个对象的第一层属性相等返回 true，否则返回 false
 */
export const shallowEqual = (a: any, b: any): boolean => {
  // 严格相等检查
  if (Object.is(a, b)) {
    return true;
  }

  // 类型不同或不是对象
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a === null ||
    b === null
  ) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 属性数量不同
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 比较每个属性（浅比较）
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !Object.is(a[key], b[key])
    ) {
      return false;
    }
  }

  return true;
};

/**
 * 比较两个数组是否相等（浅比较）
 * @param a 第一个数组
 * @param b 第二个数组
 * @returns 如果两个数组相等返回 true，否则返回 false
 */
export const arrayEqual = <T>(a: T[], b: T[]): boolean => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!Object.is(a[i], b[i])) {
      return false;
    }
  }

  return true;
};
