import { isVNode as isVueVNode } from "vue";

/**
 * 检查值是否为字符串类型
 * @param val - 要检查的值
 * @returns 如果值为字符串则返回 true，否则返回 false
 * @example
 * isString('hello'); // true
 * isString(123);     // false
 */
export const isString = (val: unknown): val is string => typeof val === "string";

/**
 * 检查值是否为数字类型
 * @param val - 要检查的值
 * @returns 如果值为数字则返回 true，否则返回 false
 * @example
 * isNumber(123);   // true
 * isNumber('123'); // false
 */
export const isNumber = (val: unknown): val is number => typeof val === "number";

/**
 * 检查值是否为布尔类型
 * @param val - 要检查的值
 * @returns 如果值为布尔值则返回 true，否则返回 false
 * @example
 * isBoolean(true);  // true
 * isBoolean(0);     // false
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === "boolean";

/**
 * 检查值是否为函数类型
 * @param val - 要检查的值
 * @returns 如果值为函数则返回 true，否则返回 false
 * @example
 * isFunction(() => {}); // true
 * isFunction(null);      // false
 */
export const isFunction = (val: unknown): val is (...args: unknown[]) => unknown => typeof val === "function";

/**
 * 检查值是否为普通对象类型
 * @param val - 要检查的值
 * @returns 如果值为普通对象则返回 true，否则返回 false
 * @example
 * isObject({});         // true
 * isObject([]);         // false
 * isObject(null);       // false
 */
export const isObject = (val: unknown): val is Record<PropertyKey, unknown> =>
  val !== null && typeof val === "object" && !Array.isArray(val);

/**
 * 检查值是否为数组类型
 * @param val - 要检查的值
 * @returns 如果值为数组则返回 true，否则返回 false
 * @example
 * isArray([]);    // true
 * isArray({});    // false
 */
export const { isArray } = Array;

/**
 * 检查值是否为 Promise 类型
 * @param val - 要检查的值
 * @returns 如果值为 Promise 则返回 true，否则返回 false
 * @example
 * isPromise(new Promise(() => {})); // true
 * isPromise(Promise.resolve());     // true
 */
export const isPromise = <T = unknown>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) && isFunction((val as { then?: unknown }).then) && isFunction((val as { catch?: unknown }).catch)
  );
};

/**
 * 检查值是否为 DOM 元素
 * @param val - 要检查的值
 * @returns 如果值为 DOM 元素则返回 true，否则返回 false
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!(val as unknown as Element).tagName;
};

/**
 * 检查值是否为 Vue 的 VNode
 * @param val - 要检查的值
 * @returns 如果值为 VNode 则返回 true，否则返回 false
 */
export const isVNode = isVueVNode;

/**
 * 判断当前环境是否为浏览器客户端
 * @returns 如果是浏览器环境则返回 true，否则返回 false
 */
export const isClient = typeof window !== "undefined";

/**
 * 判断当前环境是否为服务器端
 * @returns 如果是服务器环境则返回 true，否则返回 false
 */
export const isServer = !isClient;
