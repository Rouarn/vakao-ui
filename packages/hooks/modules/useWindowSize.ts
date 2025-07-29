import type { ComputedRef } from "vue";
import { ref, computed, onMounted } from "vue";
import { useEventListener } from "./useEventListener";
import type { SetEnabledFunction, UpdateFunction } from "../types/shared";

/**
 * 窗口尺寸信息类型
 */
export interface WindowSize {
  /** 窗口宽度 */
  width: number;
  /** 窗口高度 */
  height: number;
}

/**
 * 手动更新窗口尺寸的函数类型
 */
export type UpdateSizeFunction = UpdateFunction;

/**
 * useWindowSize 钩子函数的返回值类型
 * @description 返回一个包含窗口尺寸信息和控制函数的数组
 * @example
 * ```typescript
 * const [size, updateSize, setEnabled] = useWindowSize();
 * ```
 */
export type UseWindowSizeReturn = [
  /** 窗口尺寸信息的只读响应式引用 */
  ComputedRef<WindowSize>,
  /** 手动更新窗口尺寸的函数 */
  UpdateSizeFunction,
  /** 启用/禁用尺寸监听的函数 */
  SetEnabledFunction,
];

/**
 * 窗口尺寸监听配置选项
 */
export interface UseWindowSizeOptions {
  /** 是否立即获取窗口尺寸，默认为 true */
  immediate?: boolean;
  /** 是否监听窗口尺寸变化，默认为 true */
  listen?: boolean;
  /** 防抖延迟时间（毫秒），默认为 0（不防抖） */
  debounce?: number;
  /** 初始宽度，在服务端渲染时使用，默认为 1024 */
  initialWidth?: number;
  /** 初始高度，在服务端渲染时使用，默认为 768 */
  initialHeight?: number;
}

/**
 * 窗口尺寸获取和监听 Hook
 *
 * 提供窗口尺寸的响应式获取和实时监听功能，支持防抖优化和服务端渲染。
 * 常用于响应式布局、媒体查询判断、组件尺寸适配等场景。
 *
 * 设计特点：
 * - 响应式：基于 Vue 3 响应式系统，自动触发视图更新
 * - 性能优化：支持防抖处理，避免频繁更新
 * - SSR 支持：提供初始尺寸配置，支持服务端渲染
 * - 自动监听：自动监听窗口 resize 事件
 * - 手动控制：支持手动更新和启用/禁用监听
 * - 类型安全：完整的 TypeScript 类型定义
 *
 * @param options - 配置选项
 *
 * @returns 返回包含窗口尺寸和控制函数的数组
 * - [0] size: ComputedRef<WindowSize> - 窗口尺寸信息的只读响应式引用
 * - [1] updateSize: () => void - 手动更新窗口尺寸的函数
 * - [2] setEnabled: (enabled: boolean) => void - 启用/禁用监听的函数
 *
 * @example
 * ```typescript
 * // 基础用法 - 获取窗口尺寸
 * const [windowSize] = useWindowSize();
 *
 * // 在模板中使用
 * // <div>窗口尺寸: {{ windowSize.width }} x {{ windowSize.height }}</div>
 *
 * // 响应式布局判断
 * const [size] = useWindowSize();
 * const isMobile = computed(() => size.value.width < 768);
 * const isTablet = computed(() => size.value.width >= 768 && size.value.width < 1024);
 * const isDesktop = computed(() => size.value.width >= 1024);
 *
 * // 条件渲染
 * const showSidebar = computed(() => {
 *   return size.value.width >= 1200;
 * });
 *
 * // 动态样式
 * const containerStyle = computed(() => ({
 *   width: size.value.width < 768 ? '100%' : '80%',
 *   maxWidth: size.value.width < 1200 ? '100vw' : '1200px'
 * }));
 *
 * // 防抖优化
 * const [debouncedSize] = useWindowSize({
 *   debounce: 300 // 300ms 防抖
 * });
 *
 * // 手动控制
 * const [size, updateSize, setEnabled] = useWindowSize({
 *   listen: false // 不自动监听
 * });
 *
 * // 手动更新尺寸
 * const handleRefresh = () => {
 *   updateSize();
 * };
 *
 * // 条件启用监听
 * watch(needResize, (need) => {
 *   setEnabled(need);
 * });
 *
 * // 服务端渲染支持
 * const [size] = useWindowSize({
 *   initialWidth: 1920,
 *   initialHeight: 1080
 * });
 *
 * // 复杂响应式逻辑
 * const [windowSize] = useWindowSize();
 *
 * const breakpoints = computed(() => {
 *   const { width } = windowSize.value;
 *   return {
 *     xs: width < 576,
 *     sm: width >= 576 && width < 768,
 *     md: width >= 768 && width < 992,
 *     lg: width >= 992 && width < 1200,
 *     xl: width >= 1200 && width < 1920,
 *     xxl: width >= 1920
 *   };
 * });
 *
 * const currentBreakpoint = computed(() => {
 *   const bp = breakpoints.value;
 *   if (bp.xs) return 'xs';
 *   if (bp.sm) return 'sm';
 *   if (bp.md) return 'md';
 *   if (bp.lg) return 'lg';
 *   if (bp.xl) return 'xl';
 *   return 'xxl';
 * });
 * ```
 *
 * @see {@link useEventListener} 通用事件监听器
 * @see {@link useElementSize} 元素尺寸监听
 * @see {@link useResizeObserver} ResizeObserver 监听
 * @since 1.0.0
 * @author Vakao UI Team
 */
export function useWindowSize(
  options: UseWindowSizeOptions = {}
): UseWindowSizeReturn {
  // ==================== 配置选项 ====================

  const {
    immediate = true,
    listen = true,
    debounce = 0,
    initialWidth = 1024,
    initialHeight = 768,
  } = options;

  // ==================== 响应式状态 ====================

  /**
   * 窗口宽度的响应式引用
   *
   * 存储当前窗口的宽度值（像素）。
   * 在服务端渲染环境中使用初始宽度。
   */
  const width = ref<number>(initialWidth);

  /**
   * 窗口高度的响应式引用
   *
   * 存储当前窗口的高度值（像素）。
   * 在服务端渲染环境中使用初始高度。
   */
  const height = ref<number>(initialHeight);

  /**
   * 防抖定时器引用
   *
   * 用于防抖处理，避免窗口尺寸变化时频繁更新。
   */
  const debounceTimer = ref<number | null>(null);

  // ==================== 计算属性 ====================

  /**
   * 窗口尺寸信息的只读计算属性
   *
   * 将宽度和高度组合成一个对象，提供统一的尺寸信息接口。
   * 使用计算属性确保数据的响应性和只读性。
   *
   * @returns 包含宽度和高度的窗口尺寸对象
   */
  const windowSize = computed<WindowSize>(() => ({
    width: width.value,
    height: height.value,
  }));

  // ==================== 核心逻辑 ====================

  /**
   * 获取当前窗口尺寸
   *
   * 从浏览器 API 获取当前窗口的实际尺寸。
   * 在服务端渲染环境中返回初始尺寸。
   *
   * @returns 当前窗口尺寸对象
   */
  const getCurrentSize = (): WindowSize => {
    // 检查是否在浏览器环境中
    if (typeof window === "undefined") {
      return {
        width: initialWidth,
        height: initialHeight,
      };
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  /**
   * 更新窗口尺寸状态
   *
   * 获取最新的窗口尺寸并更新响应式状态。
   * 支持防抖处理，避免频繁更新。
   */
  const updateSizeInternal = () => {
    const newSize = getCurrentSize();
    width.value = newSize.width;
    height.value = newSize.height;
  };

  /**
   * 带防抖的尺寸更新函数
   *
   * 如果配置了防抖延迟，则使用防抖处理；否则立即更新。
   * 防抖可以避免窗口尺寸快速变化时的性能问题。
   */
  const debouncedUpdate = () => {
    if (debounce > 0) {
      // 清除之前的定时器
      if (debounceTimer.value !== null) {
        clearTimeout(debounceTimer.value);
      }

      // 设置新的防抖定时器
      debounceTimer.value = window.setTimeout(() => {
        updateSizeInternal();
        debounceTimer.value = null;
      }, debounce);
    } else {
      // 无防抖，立即更新
      updateSizeInternal();
    }
  };

  // ==================== 操作函数 ====================

  /**
   * 手动更新窗口尺寸
   *
   * 立即获取当前窗口尺寸并更新状态，忽略防抖设置。
   * 适用于需要强制刷新尺寸信息的场景。
   *
   * @example
   * ```typescript
   * const [size, updateSize] = useWindowSize();
   *
   * // 手动刷新尺寸
   * const handleRefresh = () => {
   *   updateSize();
   * };
   *
   * // 在某些操作后强制更新
   * const handleFullscreen = async () => {
   *   await document.documentElement.requestFullscreen();
   *   // 全屏后手动更新尺寸
   *   updateSize();
   * };
   * ```
   */
  const updateSize: UpdateSizeFunction = () => {
    // 清除防抖定时器
    if (debounceTimer.value !== null) {
      clearTimeout(debounceTimer.value);
      debounceTimer.value = null;
    }

    // 立即更新尺寸
    updateSizeInternal();
  };

  // ==================== 事件监听 ====================

  /**
   * 窗口尺寸变化事件监听器
   *
   * 使用 useEventListener 监听窗口的 resize 事件。
   * 支持动态启用/禁用监听功能。
   */
  const [, , setListenerEnabled] = useEventListener(
    () => window,
    "resize",
    debouncedUpdate,
    {
      immediate: listen,
      passive: true, // 使用被动监听器优化性能
    }
  );

  /**
   * 启用/禁用窗口尺寸监听
   *
   * 动态控制是否监听窗口尺寸变化事件。
   * 可以用于性能优化，在不需要监听时禁用。
   *
   * @param enabled - 是否启用监听
   *
   * @example
   * ```typescript
   * const [size, , setEnabled] = useWindowSize();
   *
   * // 禁用监听
   * setEnabled(false);
   *
   * // 重新启用监听
   * setEnabled(true);
   *
   * // 根据页面状态动态控制
   * watch(isPageVisible, (visible) => {
   *   setEnabled(visible);
   * });
   * ```
   */
  const setEnabled: SetEnabledFunction = (enabled: boolean) => {
    setListenerEnabled(enabled);
  };

  // ==================== 生命周期管理 ====================

  /**
   * 组件挂载时的初始化
   *
   * 如果配置为立即获取尺寸，则在挂载时获取当前窗口尺寸。
   * 确保组件初始化时就有正确的尺寸信息。
   */
  onMounted(() => {
    if (immediate) {
      updateSizeInternal();
    }
  });

  // ==================== 返回值 ====================

  /**
   * 返回数组格式的尺寸信息和控制函数
   *
   * 遵循 React Hooks 设计模式，返回数组便于解构和自定义命名。
   * 数组顺序：[尺寸信息, 更新函数, 启用控制函数]
   */
  return [windowSize, updateSize, setEnabled];
}
