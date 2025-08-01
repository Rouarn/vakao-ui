import type { Ref, ComputedRef } from "vue";
import { ref, computed } from "vue";
import { useEventListener } from "./useEventListener";
import type { SetEnabledFunction } from "../types/shared";

/**
 * 鼠标进入事件的回调函数类型
 */
export type MouseEnterCallback = (event: MouseEvent) => void;

/**
 * 鼠标离开事件的回调函数类型
 */
export type MouseLeaveCallback = (event: MouseEvent) => void;

/**
 * useHover 钩子函数的返回值类型
 * @description 返回一个包含目标元素引用、悬停状态和控制函数的数组
 * @example
 * ```typescript
 * const [targetRef, isHovered, setEnabled] = useHover();
 * ```
 */
export type UseHoverReturn = [
  /** 目标元素的响应式引用 */
  Ref<HTMLElement | null>,
  /** 悬停状态的只读响应式引用 */
  ComputedRef<boolean>,
  /** 启用/禁用悬停检测的函数 */
  SetEnabledFunction,
];

/**
 * 悬停检测配置选项
 */
export interface UseHoverOptions {
  /** 是否立即启用检测，默认为 true */
  immediate?: boolean;
  /** 鼠标进入时的回调函数 */
  onEnter?: MouseEnterCallback;
  /** 鼠标离开时的回调函数 */
  onLeave?: MouseLeaveCallback;
  /** 进入延迟时间（毫秒），默认为 0 */
  enterDelay?: number;
  /** 离开延迟时间（毫秒），默认为 0 */
  leaveDelay?: number;
}

/**
 * 鼠标悬停状态检测 Hook
 *
 * 检测鼠标是否悬停在指定元素上，提供响应式的悬停状态和相关回调。
 * 支持延迟触发、自定义回调等高级功能，常用于工具提示、悬停效果等场景。
 *
 * 设计特点：
 * - 响应式：基于 Vue 3 响应式系统，自动触发视图更新
 * - 延迟支持：支持进入和离开的延迟触发，避免误触发
 * - 回调机制：支持自定义进入和离开回调函数
 * - 性能优化：支持动态启用/禁用，避免不必要的事件监听
 * - 类型安全：完整的 TypeScript 类型定义
 * - 自动清理：组件卸载时自动清理定时器和事件监听器
 *
 * @param options - 配置选项
 *
 * @returns 返回包含目标元素引用、悬停状态和控制函数的数组
 * - [0] targetRef: Ref<HTMLElement | null> - 目标元素的响应式引用
 * - [1] isHovered: ComputedRef<boolean> - 悬停状态的只读响应式引用
 * - [2] setEnabled: (enabled: boolean) => void - 启用/禁用检测的函数
 *
 * @example
 * ```typescript
 * // 基础用法 - 悬停状态检测
 * const [buttonRef, isHovered] = useHover();
 *
 * // 在模板中使用
 * // <button
 * //   ref="buttonRef"
 * //   :class="{ 'hovered': isHovered }"
 * // >
 * //   悬停我
 * // </button>
 *
 * // 带回调的悬停检测
 * const [cardRef, isCardHovered] = useHover({
 *   onEnter: (event) => {
 *     console.log('鼠标进入卡片', event);
 *   },
 *   onLeave: (event) => {
 *     console.log('鼠标离开卡片', event);
 *   }
 * });
 *
 * // 延迟触发 - 避免快速移动时的闪烁
 * const [tooltipRef, showTooltip] = useHover({
 *   enterDelay: 500, // 500ms 后显示
 *   leaveDelay: 200,  // 200ms 后隐藏
 *   onEnter: () => {
 *     // 显示工具提示
 *     tooltipVisible.value = true;
 *   },
 *   onLeave: () => {
 *     // 隐藏工具提示
 *     tooltipVisible.value = false;
 *   }
 * });
 *
 * // 条件启用
 * const [menuRef, isMenuHovered, setMenuEnabled] = useHover({
 *   immediate: false
 * });
 *
 * // 根据状态动态控制
 * watch(isMenuOpen, (open) => {
 *   setMenuEnabled(open);
 * });
 *
 * // 复杂交互 - 嵌套悬停
 * const [parentRef, isParentHovered] = useHover();
 * const [childRef, isChildHovered] = useHover();
 *
 * const shouldShowDetails = computed(() => {
 *   return isParentHovered.value || isChildHovered.value;
 * });
 *
 * // 悬停计数器
 * const hoverCount = ref(0);
 * const [counterRef] = useHover({
 *   onEnter: () => {
 *     hoverCount.value++;
 *   }
 * });
 *
 * // 悬停时长统计
 * const hoverStartTime = ref<number | null>(null);
 * const totalHoverTime = ref(0);
 *
 * const [timerRef] = useHover({
 *   onEnter: () => {
 *     hoverStartTime.value = Date.now();
 *   },
 *   onLeave: () => {
 *     if (hoverStartTime.value) {
 *       totalHoverTime.value += Date.now() - hoverStartTime.value;
 *       hoverStartTime.value = null;
 *     }
 *   }
 * });
 *
 * // 动态样式
 * const [imageRef, isImageHovered] = useHover();
 * const imageStyle = computed(() => ({
 *   transform: isImageHovered.value ? 'scale(1.1)' : 'scale(1)',
 *   transition: 'transform 0.3s ease'
 * }));
 * ```
 *
 * @see {@link useEventListener} 通用事件监听器
 * @see {@link useFocus} 焦点状态管理
 * @see {@link useClickOutside} 点击外部检测
 * @since 1.0.0
 * @author Vakao UI Team
 */
export function useHover(options: UseHoverOptions = {}): UseHoverReturn {
  // ==================== 配置选项 ====================

  const {
    immediate = true,
    onEnter,
    onLeave,
    enterDelay = 0,
    leaveDelay = 0,
  } = options;

  // ==================== 响应式状态 ====================

  /**
   * 目标元素的响应式引用
   *
   * 用户需要将此引用绑定到要检测悬停状态的目标元素上。
   */
  const targetRef = ref<HTMLElement | null>(null);

  /**
   * 悬停状态的内部引用
   *
   * 存储当前的悬停状态，内部可写，对外暴露只读计算属性。
   */
  const isHovered = ref<boolean>(false);

  /**
   * 进入延迟定时器引用
   *
   * 用于处理鼠标进入的延迟触发。
   */
  const enterTimer = ref<number | null>(null);

  /**
   * 离开延迟定时器引用
   *
   * 用于处理鼠标离开的延迟触发。
   */
  const leaveTimer = ref<number | null>(null);

  // ==================== 计算属性 ====================

  /**
   * 悬停状态的只读计算属性
   *
   * 对外暴露的只读悬停状态，确保数据流的单向性。
   *
   * @returns 当前悬停状态
   */
  const readonlyIsHovered = computed(() => isHovered.value);

  // ==================== 工具函数 ====================

  /**
   * 清除所有定时器
   *
   * 清除进入和离开的延迟定时器，避免内存泄漏。
   */
  const clearTimers = () => {
    if (enterTimer.value !== null) {
      clearTimeout(enterTimer.value);
      enterTimer.value = null;
    }
    if (leaveTimer.value !== null) {
      clearTimeout(leaveTimer.value);
      leaveTimer.value = null;
    }
  };

  // ==================== 事件处理函数 ====================

  /**
   * 鼠标进入事件处理函数
   *
   * 处理鼠标进入目标元素的事件。
   * 支持延迟触发和自定义回调。
   *
   * @param event - 鼠标事件对象
   */
  const handleMouseEnter = (event: MouseEvent) => {
    // 清除离开定时器
    if (leaveTimer.value !== null) {
      clearTimeout(leaveTimer.value);
      leaveTimer.value = null;
    }

    // 如果已经是悬停状态，直接返回
    if (isHovered.value) {
      return;
    }

    const triggerEnter = () => {
      isHovered.value = true;
      onEnter?.(event);
      enterTimer.value = null;
    };

    if (enterDelay > 0) {
      // 延迟触发
      enterTimer.value = window.setTimeout(triggerEnter, enterDelay);
    } else {
      // 立即触发
      triggerEnter();
    }
  };

  /**
   * 鼠标离开事件处理函数
   *
   * 处理鼠标离开目标元素的事件。
   * 支持延迟触发和自定义回调。
   *
   * @param event - 鼠标事件对象
   */
  const handleMouseLeave = (event: MouseEvent) => {
    // 清除进入定时器
    if (enterTimer.value !== null) {
      clearTimeout(enterTimer.value);
      enterTimer.value = null;
    }

    // 如果已经不是悬停状态，直接返回
    if (!isHovered.value) {
      return;
    }

    const triggerLeave = () => {
      isHovered.value = false;
      onLeave?.(event);
      leaveTimer.value = null;
    };

    if (leaveDelay > 0) {
      // 延迟触发
      leaveTimer.value = window.setTimeout(triggerLeave, leaveDelay);
    } else {
      // 立即触发
      triggerLeave();
    }
  };

  // ==================== 事件监听器 ====================

  /**
   * 鼠标进入事件监听器
   *
   * 监听目标元素的 mouseenter 事件。
   */
  const [, , setEnterListenerEnabled] = useEventListener(
    targetRef,
    "mouseenter",
    handleMouseEnter,
    {
      immediate,
      passive: true,
    },
  );

  /**
   * 鼠标离开事件监听器
   *
   * 监听目标元素的 mouseleave 事件。
   */
  const [, , setLeaveListenerEnabled] = useEventListener(
    targetRef,
    "mouseleave",
    handleMouseLeave,
    {
      immediate,
      passive: true,
    },
  );

  // ==================== 操作函数 ====================

  /**
   * 启用/禁用悬停检测
   *
   * 动态控制悬停检测功能的开关状态。
   * 禁用时会清除所有定时器并重置状态。
   *
   * @param enabled - 是否启用悬停检测
   *
   * @example
   * ```typescript
   * const [targetRef, isHovered, setEnabled] = useHover();
   *
   * // 禁用悬停检测
   * setEnabled(false);
   *
   * // 重新启用悬停检测
   * setEnabled(true);
   *
   * // 根据条件动态控制
   * watch(isInteractive, (interactive) => {
   *   setEnabled(interactive);
   * });
   * ```
   */
  const setEnabled: SetEnabledFunction = (enabled: boolean) => {
    // 同时控制进入和离开事件监听器
    setEnterListenerEnabled(enabled);
    setLeaveListenerEnabled(enabled);

    // 如果禁用，清除所有定时器并重置状态
    if (!enabled) {
      clearTimers();
      isHovered.value = false;
    }
  };

  // ==================== 返回值 ====================

  /**
   * 返回数组格式的引用、状态和控制函数
   *
   * 遵循 React Hooks 设计模式，返回数组便于解构和自定义命名。
   * 数组顺序：[目标元素引用, 悬停状态, 启用控制函数]
   */
  return [targetRef, readonlyIsHovered, setEnabled];
}
