/**
 * Vakao UI 组合式函数库 (Hooks)
 *
 * 提供一系列可复用的组合式函数，遵循 Vue 3 Composition API 设计模式，
 * 参考 React Hooks 的设计理念，所有 hooks 返回数组格式以便于解构和重命名。
 *
 * 功能分类：
 * - 状态管理：useToggle, useCounter, useBoolean, useArray
 * - 数据持久化：useLocalStorage
 * - 性能优化：useDebounce, useThrottle
 * - 网络请求：useFetch
 * - DOM 操作：useClickOutside, useEventListener, useWindowSize, useFullscreen
 * - 用户交互：useHover, useKeyPress, useDrag
 * - 异步操作：useAsync
 * - 系统功能：useClipboard
 * - 高级功能：usePagination
 *
 * 设计原则：
 * - 所有 hooks 返回数组格式，便于解构重命名
 * - 状态值使用只读计算属性，确保数据流单向性
 * - 提供完整的 TypeScript 类型支持
 * - 自动处理组件卸载时的清理工作
 *
 * @example
 * ```typescript
 * // 全量导入
 * import * as VakaoHooks from '@vakao-ui/hooks';
 *
 * // 按需导入
 * import { useToggle, useFetch, useLocalStorage, useClickOutside, useAsync, usePagination } from '@vakao-ui/hooks';
 *
 * // 使用示例
 * const [isVisible, toggle] = useToggle(false);
 * const [data, loading, error] = useFetch('/api/users');
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * const [targetRef] = useClickOutside(() => closeModal());
 * const [asyncData, asyncLoading, asyncError, execute] = useAsync(fetchData);
 * const [pagination, paginationActions] = usePagination({ total: 100 });
 * ```
 */

// 共享类型定义
export * from "./types/shared";

// 状态管理 hooks
export * from "./modules/useToggle";
export * from "./modules/useCounter";
export * from "./modules/useBoolean";
export * from "./modules/useArray";

// 数据持久化 hooks
export * from "./modules/useLocalStorage";

// 性能优化 hooks
export * from "./modules/useDebounce";
export * from "./modules/useThrottle";

// 网络请求 hooks
export * from "./modules/useFetch";

// DOM 操作 hooks
export * from "./modules/useClickOutside";
export * from "./modules/useEventListener";
export * from "./modules/useWindowSize";
export * from "./modules/useFullscreen";

// 用户交互 hooks
export * from "./modules/useHover";
export * from "./modules/useKeyPress";
export * from "./modules/useMouse";
export * from "./modules/useDrag";

// 异步操作 hooks
export * from "./modules/useAsync";

// 系统功能 hooks
export * from "./modules/useClipboard";

// 高级功能 hooks
export * from "./modules/usePagination";
