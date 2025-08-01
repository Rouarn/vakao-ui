import { ref, computed, type Ref, type ComputedRef } from "vue";
import { useEventListener } from "./useEventListener";

/**
 * 拖拽位置信息
 */
export interface DragPosition {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 拖拽偏移信息
 */
export interface DragOffset {
  /** X 轴偏移 */
  deltaX: number;
  /** Y 轴偏移 */
  deltaY: number;
}

/**
 * 拖拽状态信息
 */
export interface DragState {
  /** 是否正在拖拽 */
  isDragging: boolean;
  /** 当前位置 */
  position: DragPosition;
  /** 起始位置 */
  startPosition: DragPosition;
  /** 偏移量 */
  offset: DragOffset;
}

/**
 * 拖拽配置选项
 */
export interface UseDragOptions {
  /** 初始位置 */
  initialPosition?: DragPosition;
  /** 是否启用拖拽 */
  enabled?: boolean | Ref<boolean>;
  /** 拖拽手柄选择器或元素 */
  handle?: string | HTMLElement | Ref<HTMLElement | null>;
  /** 拖拽约束边界 */
  boundary?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
  /** 是否限制在父元素内 */
  constrainToParent?: boolean;
  /** 拖拽轴限制 */
  axis?: "x" | "y" | "both";
  /** 网格对齐 */
  grid?: [number, number];
  /** 拖拽开始回调 */
  onDragStart?: (state: DragState, event: MouseEvent) => void;
  /** 拖拽中回调 */
  onDrag?: (state: DragState, event: MouseEvent) => void;
  /** 拖拽结束回调 */
  onDragEnd?: (state: DragState, event: MouseEvent) => void;
}

/**
 * 开始拖拽函数类型
 */
export type StartDragFunction = (event: MouseEvent) => void;

/**
 * 停止拖拽函数类型
 */
export type StopDragFunction = () => void;

/**
 * 重置位置函数类型
 */
export type ResetPositionFunction = () => void;

/**
 * 设置位置函数类型
 */
export type SetPositionFunction = (position: Partial<DragPosition>) => void;

/**
 * useDrag 返回值类型
 */
export type UseDragReturn = [
  Ref<HTMLElement | null>,
  ComputedRef<DragState>,
  StartDragFunction,
  StopDragFunction,
  ResetPositionFunction,
  SetPositionFunction,
];

/**
 * 应用网格对齐
 */
function applyGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * 应用边界约束
 */
function applyBoundary(
  position: DragPosition,
  boundary?: UseDragOptions["boundary"],
  _element?: HTMLElement,
): DragPosition {
  let { x, y } = position;

  if (boundary) {
    if (typeof boundary.left === "number") {
      x = Math.max(x, boundary.left);
    }
    if (typeof boundary.right === "number") {
      x = Math.min(x, boundary.right);
    }
    if (typeof boundary.top === "number") {
      y = Math.max(y, boundary.top);
    }
    if (typeof boundary.bottom === "number") {
      y = Math.min(y, boundary.bottom);
    }
  }

  return { x, y };
}

/**
 * 应用父元素约束
 */
function applyParentConstraint(
  position: DragPosition,
  element: HTMLElement,
): DragPosition {
  const parent = element.parentElement;
  if (!parent) return position;

  const parentRect = parent.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const maxX = parentRect.width - elementRect.width;
  const maxY = parentRect.height - elementRect.height;

  return {
    x: Math.max(0, Math.min(position.x, maxX)),
    y: Math.max(0, Math.min(position.y, maxY)),
  };
}

/**
 * 拖拽操作管理 Hook
 *
 * 提供完整的拖拽功能，支持位置约束、网格对齐、轴限制等高级特性。
 * 自动处理鼠标事件和拖拽状态管理。
 *
 * @param options - 配置选项
 * @returns [elementRef, dragState, startDrag, stopDrag, resetPosition, setPosition] - 元素引用、拖拽状态、开始拖拽、停止拖拽、重置位置、设置位置
 *
 * @example
 * ```typescript
 * // 基础用法
 * const [dragRef, dragState] = useDrag();
 *
 * // 在模板中使用
 * // <div ref="dragRef" :style="{ transform: `translate(${dragState.position.x}px, ${dragState.position.y}px)` }">
 * //   拖拽我
 * // </div>
 *
 * // 带约束的拖拽
 * const [constrainedDragRef, constrainedState] = useDrag({
 *   boundary: {
 *     left: 0,
 *     top: 0,
 *     right: 500,
 *     bottom: 300
 *   },
 *   constrainToParent: true
 * });
 *
 * // 网格对齐拖拽
 * const [gridDragRef, gridState] = useDrag({
 *   grid: [20, 20], // 20px 网格
 *   axis: 'both'
 * });
 *
 * // 只允许水平拖拽
 * const [horizontalDragRef, horizontalState] = useDrag({
 *   axis: 'x'
 * });
 *
 * // 自定义拖拽手柄
 * const [handleDragRef, handleState] = useDrag({
 *   handle: '.drag-handle' // 只有 .drag-handle 元素可以拖拽
 * });
 *
 * // 带回调的拖拽
 * const [callbackDragRef, callbackState, startDrag, stopDrag, resetPosition, setPosition] = useDrag({
 *   onDragStart: (state, event) => {
 *     console.log('开始拖拽:', state.position);
 *   },
 *   onDrag: (state, event) => {
 *     console.log('拖拽中:', state.offset);
 *   },
 *   onDragEnd: (state, event) => {
 *     console.log('拖拽结束:', state.position);
 *   }
 * });
 *
 * // 手动控制拖拽
 * const handleMouseDown = (event: MouseEvent) => {
 *   if (someCondition) {
 *     startDrag(event);
 *   }
 * };
 *
 * // 重置到初始位置
 * const handleReset = () => {
 *   resetPosition();
 * };
 *
 * // 设置特定位置
 * const handleSetPosition = () => {
 *   setPosition({ x: 100, y: 50 });
 * };
 * ```
 *
 * @since 0.0.2
 * @author Vakao UI Team
 */
export function useDrag(options: UseDragOptions = {}): UseDragReturn {
  const {
    initialPosition = { x: 0, y: 0 },
    enabled = true,
    handle,
    boundary,
    constrainToParent = false,
    axis = "both",
    grid,
    onDragStart,
    onDrag,
    onDragEnd,
  } = options;

  // 元素引用
  const elementRef = ref<HTMLElement | null>(null);

  // 拖拽状态
  const isDragging = ref(false);
  const position = ref<DragPosition>({ ...initialPosition });
  const startPosition = ref<DragPosition>({ x: 0, y: 0 });
  const offset = ref<DragOffset>({ deltaX: 0, deltaY: 0 });

  // 计算拖拽状态
  const dragState = computed<DragState>(() => ({
    isDragging: isDragging.value,
    position: position.value,
    startPosition: startPosition.value,
    offset: offset.value,
  }));

  // 获取拖拽手柄元素
  const getDragHandle = (): HTMLElement | null => {
    if (!handle) return elementRef.value;

    if (typeof handle === "string") {
      return (elementRef.value?.querySelector(handle) as HTMLElement) || null;
    }

    if ("value" in handle) {
      return handle.value;
    }

    return handle;
  };

  // 检查是否启用拖拽
  const isEnabled = computed(() => {
    return typeof enabled === "boolean" ? enabled : enabled.value;
  });

  /**
   * 开始拖拽
   */
  const startDrag: StartDragFunction = (event: MouseEvent) => {
    if (!isEnabled.value || !elementRef.value) return;

    // 检查是否点击在拖拽手柄上
    const handleElement = getDragHandle();
    if (handleElement && !handleElement.contains(event.target as Node)) {
      return;
    }

    event.preventDefault();

    isDragging.value = true;
    startPosition.value = {
      x: event.clientX - position.value.x,
      y: event.clientY - position.value.y,
    };

    onDragStart?.(dragState.value, event);
  };

  /**
   * 拖拽中
   */
  const handleDrag = (event: MouseEvent) => {
    if (!isDragging.value || !elementRef.value) return;

    event.preventDefault();

    let newX = event.clientX - startPosition.value.x;
    let newY = event.clientY - startPosition.value.y;

    // 应用轴限制
    if (axis === "x") {
      newY = position.value.y;
    } else if (axis === "y") {
      newX = position.value.x;
    }

    // 应用网格对齐
    if (grid) {
      newX = applyGrid(newX, grid[0]);
      newY = applyGrid(newY, grid[1]);
    }

    let newPosition = { x: newX, y: newY };

    // 应用边界约束
    if (boundary) {
      newPosition = applyBoundary(newPosition, boundary, elementRef.value);
    }

    // 应用父元素约束
    if (constrainToParent) {
      newPosition = applyParentConstraint(newPosition, elementRef.value);
    }

    // 更新位置和偏移
    position.value = newPosition;
    offset.value = {
      deltaX: newPosition.x - initialPosition.x,
      deltaY: newPosition.y - initialPosition.y,
    };

    onDrag?.(dragState.value, event);
  };

  /**
   * 停止拖拽
   */
  const stopDrag: StopDragFunction = () => {
    if (!isDragging.value) return;

    isDragging.value = false;
    onDragEnd?.(dragState.value, new MouseEvent("mouseup"));
  };

  /**
   * 结束拖拽（鼠标释放）
   */
  const handleDragEnd = (event: MouseEvent) => {
    if (!isDragging.value) return;

    isDragging.value = false;
    onDragEnd?.(dragState.value, event);
  };

  /**
   * 重置位置
   */
  const resetPosition: ResetPositionFunction = () => {
    position.value = { ...initialPosition };
    offset.value = { deltaX: 0, deltaY: 0 };
  };

  /**
   * 设置位置
   */
  const setPosition: SetPositionFunction = (
    newPosition: Partial<DragPosition>,
  ) => {
    position.value = {
      x: newPosition.x ?? position.value.x,
      y: newPosition.y ?? position.value.y,
    };

    offset.value = {
      deltaX: position.value.x - initialPosition.x,
      deltaY: position.value.y - initialPosition.y,
    };
  };

  // 事件监听器
  const [, ,] = useEventListener(
    () => getDragHandle() || elementRef.value,
    "mousedown",
    startDrag,
  );

  const [, ,] = useEventListener(() => document, "mousemove", handleDrag);

  const [, ,] = useEventListener(() => document, "mouseup", handleDragEnd);

  return [
    elementRef,
    dragState,
    startDrag,
    stopDrag,
    resetPosition,
    setPosition,
  ];
}

/**
 * 默认导出
 */
export default useDrag;
