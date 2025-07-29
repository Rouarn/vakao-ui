/**
 * 判断字符串是否为有效的 URL 格式
 * 支持检测多种 URL 类型：HTTP/HTTPS、Data URL、相对路径、绝对路径
 *
 * @param str 要检查的字符串
 * @returns 如果是有效的 URL 格式返回 true，否则返回 false
 *
 * @example
 * ```typescript
 * // HTTP/HTTPS URL
 * isUrl('https://example.com');        // true
 * isUrl('http://localhost:3000');      // true
 *
 * // Data URL
 * isUrl('data:image/png;base64,abc');  // true
 *
 * // 相对路径
 * isUrl('./assets/image.png');         // true
 * isUrl('../components/Button.vue');   // true
 *
 * // 绝对路径
 * isUrl('/static/logo.svg');           // true
 *
 * // 无效格式
 * isUrl('');                           // false
 * isUrl('invalid-url');                // false
 * isUrl('ftp://example.com');          // false
 * ```
 *
 * @remarks
 * 支持的 URL 格式：
 * - HTTP/HTTPS: `http://` 或 `https://` 开头
 * - Data URL: `data:` 开头
 * - 相对路径: `./` 或 `../` 开头
 * - 绝对路径: `/` 开头
 */
export const isUrl = (str: string): boolean => {
  // 空字符串或 null/undefined 不是有效 URL
  if (!str) return false;

  // 使用正则表达式检测支持的 URL 格式
  return /^(https?:\/\/|data:|\.\/|\.\.\/|\/)/.test(str);
};
