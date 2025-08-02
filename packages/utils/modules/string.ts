/**
 * 将字符串的首字母转换为大写
 * @param str - 要处理的字符串
 * @returns 首字母大写的字符串
 * @example
 * capitalize('hello'); // 'Hello'
 * capitalize('WORLD'); // 'WORLD'
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 将短横线命名（kebab-case）或下划线命名（snake_case）的字符串转换为驼峰命名（camelCase）
 * @param str - 要转换的字符串
 * @returns 驼峰命名格式的字符串
 * @example
 * camelCase('foo-bar'); // 'fooBar'
 * camelCase('foo_bar'); // 'fooBar'
 * camelCase('--foo-bar--'); // 'fooBar'
 */
export const camelCase = (str: string): string => {
  if (!str) return "";
  return str.replace(/[-_](\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
};

/**
 * 将驼峰命名（camelCase）的字符串转换为短横线命名（kebab-case）
 * @param str - 要转换的字符串
 * @returns 短横线命名格式的字符串
 * @example
 * kebabCase('fooBar'); // 'foo-bar'
 * kebabCase('FooBar'); // 'foo-bar'
 * kebabCase('__FOO_BAR__'); // '--foo-bar--'
 */
export const kebabCase = (str: string): string => {
  if (!str) return "";
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
};

/**
 * 截断字符串，如果超过指定长度，则添加省略号
 * @param str - 要截断的字符串
 * @param length - 最大长度
 * @param omission - 省略号替代文本，默认为 '...'
 * @returns 截断后的字符串
 * @example
 * truncate('hello world', 5); // 'hello...'
 * truncate('hello', 10); // 'hello'
 */
export const truncate = (str: string, length: number, omission = "..."): string => {
  if (!str) return "";
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length) + omission;
};
