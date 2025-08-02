/**
 * 将数字限制在指定的范围内
 * @param num - 要限制的数字
 * @param min - 最小值
 * @param max - 最大值
 * @returns 限制在范围内的数字
 * @example
 * clamp(5, 0, 10); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * 生成指定范围内的随机整数（包含 min 和 max）
 * @param min - 范围的最小值
 * @param max - 范围的最大值
 * @returns 范围内的随机整数
 * @example
 * random(1, 10); // 可能是 1 到 10 之间的任何整数
 */
export const random = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let idCounter = 0;
/**
 * 生成一个带指定前缀的唯一 ID
 * @param prefix - ID 的前缀，默认为 'uid-'
 * @returns 唯一的 ID 字符串
 * @example
 * uniqueId(); // 'uid-1'
 * uniqueId('prefix-'); // 'prefix-2'
 */
export const uniqueId = (prefix = "uid-"): string => {
  idCounter += 1;
  return `${prefix}${idCounter}`;
};
