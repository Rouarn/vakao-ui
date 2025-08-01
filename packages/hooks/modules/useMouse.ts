import type { Ref, MaybeRefOrGetter } from "vue";
import { ref, computed, toValue } from "vue";
import { useEventListener } from "./useEventListener";

/**
 * 鼠标位置坐标类型
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 鼠标输入源类型
 */
export type MouseSourceType = "mouse" | "touch";

/**
 * useMouse 钩子函数的返回值类型
 */
export interface UseMouseReturn {
  /** 鼠标 X 坐标 */
  x: Ref<number>;
  /** 鼠标 Y 坐标 */
  y: Ref<number>;
  /** 输入源类型 */
  sourceType: Ref<MouseSourceType>;
  /** 相对于目标元素的 X 坐标 */
  elementX: Ref<number>;
  /** 相对于目标元素的 Y 坐标 */
  elementY: Ref<number>;
  /** 目标元素的 X 位置 */
  elementPositionX: Ref<number>;
  /** 目标元素的 Y 位置 */
  elementPositionY: Ref<number>;
  /** 目标元素的高度 */
  elementHeight: Ref<number>;
  /** 目标元素的宽度 */
  elementWidth: Ref<number>;
  /** 鼠标是否在目标元素内 */
  isInside: Ref<boolean>;
  /** 鼠标按键状态的位掩码 */
  buttons: Ref<number>;
}

/**
 * 鼠标跟踪配置选项
 */
export interface UseMouseOptions {
  /** 目标元素，用于相对定位 */
  target?: MaybeRefOrGetter<Element | null | undefined>;
  /** 是否启用触摸支持 */
  touch?: boolean;
  /** 触摸结束时是否重置坐标 */
  resetOnTouchEnds?: boolean;
  /** 初始坐标值 */
  initialValue?: Position;
}

/**
 * 鼠标位置和状态跟踪 Hook
 *
 * 提供实时的鼠标坐标、移动状态、按键状态等信息。
 * 支持相对定位、边界检测、自定义目标元素等功能。
 *
 * 设计特点：
 * - 响应式：基于 Vue 3 响应式系统，自动触发视图更新
 * - 多模式：支持全局和相对定位两种模式
 * - 触摸支持：支持触摸设备的坐标跟踪
 * - 按键检测：提供鼠标按键状态检测
 * - 边界检测：自动检测鼠标是否在目标元素内
 * - 类型安全：完整的 TypeScript 类型定义
 * - 自动清理：组件卸载时自动清理事件监听器
 *
 * @param options - 配置选项
 *
 * @returns 返回包含鼠标状态信息的对象
 *
 * @example
 * ```typescript
 * // 基础用法 - 全局鼠标位置跟踪
 * const { x, y, sourceType } = useMouse();
 *
 * // 在模板中使用
 * // <div>鼠标位置: ({{ x }}, {{ y }})</div>
 * // <div>输入类型: {{ sourceType }}</div>
 *
 * // 相对定位 - 跟踪相对于特定元素的位置
 * const containerRef = ref<HTMLElement>();
 * const { elementX, elementY, isInside } = useMouse({
 *   target: containerRef
 * });
 *
 * // 鼠标按键检测
 * const { buttons } = useMouse();
 * const leftPressed = computed(() => !!(buttons.value & 1));
 * const rightPressed = computed(() => !!(buttons.value & 2));
 * const middlePressed = computed(() => !!(buttons.value & 4));
 *
 * // 触摸设备支持
 * const { x, y, sourceType } = useMouse({
 *   touch: true,
 *   resetOnTouchEnds: true
 * });
 *
 * // 自定义初始值
 * const { x, y } = useMouse({
 *   initialValue: { x: 100, y: 100 }
 * });
 *
 * // 复杂交互 - 拖拽跟踪
 * const dragAreaRef = ref<HTMLElement>();
 * const { elementX, elementY, isInside, buttons } = useMouse({
 *   target: dragAreaRef
 * });
 *
 * const isDragging = computed(() => {
 *   return isInside.value && !!(buttons.value & 1);
 * });
 *
 * // 鼠标跟随效果
 * const { x, y } = useMouse();
 * const followerStyle = computed(() => ({
 *   position: 'fixed',
 *   left: x.value + 'px',
 *   top: y.value + 'px',
 *   transform: 'translate(-50%, -50%)',
 *   pointerEvents: 'none'
 * }));
 * ```
 *
 * @see {@link useEventListener} 通用事件监听器
 * @see {@link useDrag} 拖拽操作管理
 * @see {@link useHover} 悬停状态检测
 * @since 1.0.0
 * @author Vakao UI Team
 */
export function useMouse(options: UseMouseOptions = {}): UseMouseReturn {
  // ==================== 配置选项 ====================

  const { target, touch = true, resetOnTouchEnds = false, initialValue = { x: 0, y: 0 } } = options;

  // ==================== 响应式状态 ====================

  /**
   * 鼠标 X 坐标
   */
  const x = ref<number>(initialValue.x);

  /**
   * 鼠标 Y 坐标
   */
  const y = ref<number>(initialValue.y);

  /**
   * 输入源类型
   */
  const sourceType = ref<MouseSourceType>("mouse");

  /**
   * 目标元素的位置和尺寸信息
   */
  const elementPositionX = ref<number>(0);
  const elementPositionY = ref<number>(0);
  const elementHeight = ref<number>(0);
  const elementWidth = ref<number>(0);

  /**
   * 鼠标按键状态
   */
  const buttons = ref<number>(0);

  // ==================== 计算属性 ====================

  /**
   * 相对于目标元素的 X 坐标
   */
  const elementX = computed(() => {
    const targetElement = toValue(target);
    if (!targetElement) return x.value;
    return x.value - elementPositionX.value;
  });

  /**
   * 相对于目标元素的 Y 坐标
   */
  const elementY = computed(() => {
    const targetElement = toValue(target);
    if (!targetElement) return y.value;
    return y.value - elementPositionY.value;
  });

  /**
   * 鼠标是否在目标元素内
   */
  const isInside = computed(() => {
    const targetElement = toValue(target);
    if (!targetElement) return false;

    const relativeX = elementX.value;
    const relativeY = elementY.value;

    return relativeX >= 0 && relativeY >= 0 && relativeX <= elementWidth.value && relativeY <= elementHeight.value;
  });

  // ==================== 工具函数 ====================

  /**
   * 更新目标元素的位置和尺寸信息
   */
  const updateElementInfo = () => {
    const targetElement = toValue(target);
    if (!targetElement) {
      elementPositionX.value = 0;
      elementPositionY.value = 0;
      elementHeight.value = 0;
      elementWidth.value = 0;
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    elementPositionX.value = rect.left;
    elementPositionY.value = rect.top;
    elementHeight.value = rect.height;
    elementWidth.value = rect.width;
  };

  /**
   * 更新鼠标坐标
   */
  const updatePosition = (clientX: number, clientY: number) => {
    x.value = clientX;
    y.value = clientY;
    updateElementInfo();
  };

  // ==================== 事件处理函数 ====================

  /**
   * 鼠标移动事件处理
   */
  const handleMouseMove = (event: MouseEvent) => {
    sourceType.value = "mouse";
    buttons.value = event.buttons;
    updatePosition(event.clientX, event.clientY);
  };

  /**
   * 鼠标按键事件处理
   */
  const handleMouseDown = (event: MouseEvent) => {
    sourceType.value = "mouse";
    buttons.value = event.buttons;
  };

  /**
   * 鼠标释放事件处理
   */
  const handleMouseUp = (event: MouseEvent) => {
    sourceType.value = "mouse";
    buttons.value = event.buttons;
  };

  /**
   * 触摸开始事件处理
   */
  const handleTouchStart = (event: TouchEvent) => {
    if (!touch) return;
    sourceType.value = "touch";
    const touchEvent = event.touches[0];
    if (touchEvent) {
      updatePosition(touchEvent.clientX, touchEvent.clientY);
    }
  };

  /**
   * 触摸移动事件处理
   */
  const handleTouchMove = (event: TouchEvent) => {
    if (!touch) return;
    sourceType.value = "touch";
    const touchEvent = event.touches[0];
    if (touchEvent) {
      updatePosition(touchEvent.clientX, touchEvent.clientY);
    }
  };

  /**
   * 触摸结束事件处理
   */
  const handleTouchEnd = () => {
    if (!touch) return;
    sourceType.value = "touch";
    if (resetOnTouchEnds) {
      x.value = initialValue.x;
      y.value = initialValue.y;
    }
  };

  // ==================== 事件监听器 ====================

  // 鼠标事件监听
  useEventListener(() => window, "mousemove", handleMouseMove, {
    passive: true,
  });
  useEventListener(() => window, "mousedown", handleMouseDown, {
    passive: true,
  });
  useEventListener(() => window, "mouseup", handleMouseUp, { passive: true });

  // 触摸事件监听
  if (touch) {
    useEventListener(() => window, "touchstart", handleTouchStart, {
      passive: true,
    });
    useEventListener(() => window, "touchmove", handleTouchMove, {
      passive: true,
    });
    useEventListener(() => window, "touchend", handleTouchEnd, {
      passive: true,
    });
  }

  // 窗口大小变化时更新元素信息
  useEventListener(() => window, "resize", updateElementInfo, {
    passive: true,
  });
  useEventListener(() => window, "scroll", updateElementInfo, {
    passive: true,
  });

  // ==================== 返回值 ====================

  return {
    x,
    y,
    sourceType,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isInside,
    buttons,
  };
}

/**
 * 默认导出
 */
export default useMouse;
