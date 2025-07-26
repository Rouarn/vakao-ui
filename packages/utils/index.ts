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
export * from "./install";

// CSS 命名空间工具
export * from "./namespace";

// URL 处理工具
export * from "./url";

// 受控/非受控模式工具
export * from "./controlled";

// 数据处理工具
export * from "./deepClone";
export * from "./isEqual";

// 日期处理工具
export * from "./formatDate";
