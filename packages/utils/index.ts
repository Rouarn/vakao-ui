/**
 * Vakao UI 工具函数库
 *
 * 提供组件库开发和使用过程中需要的各种工具函数，包括：
 * - 组件安装工具
 * - CSS 命名空间工具
 * - URL 处理工具
 * - 受控/非受控模式工具
 * - 数据处理工具（深拷贝、相等性判断）
 * - 日期格式化工具
 *
 * @example
 * ```typescript
 * // 全量导入
 * import * as VakaoUtils from '@vakao-ui/utils';
 *
 * // 按需导入
 * import { withInstall, useNamespace, deepClone } from '@vakao-ui/utils';
 * ```
 */

// 组件安装相关工具
export * from "./modules/install";

// CSS 命名空间工具
export * from "./modules/namespace";

// URL 处理工具
export * from "./modules/url";

// 受控/非受控模式工具
export * from "./modules/controlled";

// 数据处理工具
export * from "./modules/deepClone";
export * from "./modules/isEqual";

// 日期处理工具
export * from "./modules/formatDate";

// 类型判断工具
export * from "./modules/typeTool";

// DOM 操作工具
export * from "./modules/dom";

// 字符串操作工具
export * from "./modules/string";

// 数组操作工具
export * from "./modules/array";

// 对象操作工具
export * from "./modules/object";

// 函数工具
export * from "./modules/function";

// 数学与随机数工具
export * from "./modules/math";

// 其他工具
export * from "./modules/misc";
