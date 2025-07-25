/**
 * 判断字符串是否为 URL
 * @param str 要检查的字符串
 * @returns 如果是 URL 返回 true，否则返回 false
 */
export const isUrl = (str: string): boolean => {
  if (!str) return false;
  return /^(https?:\/\/|data:|\.\/|\.\.\/|\/)/.test(str);
};