import type { Ref } from "vue";
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type { SetEnabledFunction } from "../types/shared";

/**
 * 事件监听器的目标类型
 */
export type EventTarget = Window | Document | HTMLElement | null;

/**
 * 事件监听器的目标引用类型
 */
export type EventTargetRef = Ref<EventTarget> | (() => EventTarget);

/**
 * 通用事件处理函数类型
 */
export type EventHandler<T extends Event = Event> = (event: T) => void;

/**
 * 添加事件监听器的函数类型
 */
export type AddListenerFunction = () => void;

/**
 * 移除事件监听器的函数类型
 */
export type RemoveListenerFunction = () => void;

/**
 * useEventListener 钩子函数的返回值类型
 * @description 返回一个包含控制函数的数组
 * @example
 * ```typescript
 * const [addListener, removeListener, setEnabled] = useEventListener(target, 'click', handler);
 * ```
 */
export type UseEventListenerReturn = [
  /** 手动添加事件监听器的函数 */
  AddListenerFunction,
  /** 手动移除事件监听器的函数 */
  RemoveListenerFunction,
  /** 启用/禁用事件监听器的函数 */
  SetEnabledFunction,
];

/**
 * 事件监听器配置选项
 */
export interface UseEventListenerOptions extends AddEventListenerOptions {
  /** 是否立即添加监听器，默认为 true */
  immediate?: boolean;
  /** 是否在组件卸载时自动移除监听器，默认为 true */
  autoRemove?: boolean;
}

/**
 * 通用事件监听器管理 Hook
 *
 * 提供统一的事件监听器管理功能，支持多种目标类型和自动生命周期管理。
 * 是其他事件相关 Hooks 的基础工具，提供了完整的事件监听器控制能力。
 *
 * 设计特点：
 * - 类型安全：完整的 TypeScript 类型定义和事件类型推断
 * - 自动管理：自动处理组件生命周期，防止内存泄漏
 * - 灵活配置：支持所有原生 addEventListener 选项
 * - 动态目标：支持响应式目标和函数式目标
 * - 性能优化：支持动态启用/禁用，避免不必要的事件监听
 * - 手动控制：提供手动添加/移除监听器的能力
 *
 * @template T - 事件类型，继承自 Event
 * @param target - 事件目标，支持响应式引用或函数
 * @param event - 事件名称
 * @param handler - 事件处理函数
 * @param options - 配置选项
 *
 * @returns 返回包含控制函数的数组
 * - [0] addListener: () => void - 手动添加事件监听器
 * - [1] removeListener: () => void - 手动移除事件监听器
 * - [2] setEnabled: (enabled: boolean) => void - 启用/禁用监听器
 *
 * @example
 * ```typescript
 * // 基础用法 - 监听窗口大小变化
 * const [, , setResizeEnabled] = useEventListener(
 *   window,
 *   'resize',
 *   () => {
 *     console.log('窗口大小改变');
 *   }
 * );
 *
 * // 监听元素引用
 * const buttonRef = ref<HTMLButtonElement | null>(null);
 * const [addClick, removeClick] = useEventListener(
 *   buttonRef,
 *   'click',
 *   (event: MouseEvent) => {
 *     console.log('按钮被点击', event);
 *   }
 * );
 *
 * // 函数式目标
 * const [, , setDocumentEnabled] = useEventListener(
 *   () => document,
 *   'keydown',
 *   (event: KeyboardEvent) => {
 *     if (event.key === 'Escape') {
 *       closeModal();
 *     }
 *   }
 * );
 *
 * // 自定义配置
 * const [, , setScrollEnabled] = useEventListener(
 *   window,
 *   'scroll',
 *   handleScroll,
 *   {
 *     passive: true,
 *     capture: false,
 *     immediate: false
 *   }
 * );
 *
 * // 条件启用
 * watch(isModalOpen, (open) => {
 *   setDocumentEnabled(open);
 * });
 *
 * // 手动控制
 * const handleStartListening = () => {
 *   addClick();
 * };
 *
 * const handleStopListening = () => {
 *   removeClick();
 * };
 *
 * // 复杂事件处理
 * const [, , setTouchEnabled] = useEventListener(
 *   touchAreaRef,
 *   'touchstart',
 *   (event: TouchEvent) => {
 *     const touch = event.touches[0];
 *     startX.value = touch.clientX;
 *     startY.value = touch.clientY;
 *   },
 *   {
 *     passive: false,
 *     capture: true
 *   }
 * );
 * ```
 *
 * @see {@link useClickOutside} 点击外部检测
 * @see {@link useKeyPress} 键盘按键检测
 * @see {@link useScroll} 滚动事件监听
 * @since 1.0.0
 * @author Vakao UI Team
 */
export function useEventListener<T extends Event = Event>(
  target: EventTargetRef,
  event: string,
  handler: EventHandler<T>,
  options: UseEventListenerOptions = {},
): UseEventListenerReturn {
  // ==================== 配置选项 ====================

  const { immediate = true, autoRemove = true, ...listenerOptions } = options;

  // ==================== 响应式状态 ====================

  /**
   * 监听器的启用状态
   *
   * 控制事件监听器是否处于活动状态。
   * 可以动态启用/禁用，优化性能。
   */
  const enabled = ref<boolean>(immediate);

  /**
   * 监听器是否已添加的状态
   *
   * 跟踪当前监听器的添加状态，避免重复添加或移除。
   */
  const isListenerAdded = ref<boolean>(false);

  /**
   * 包装的事件处理函数引用
   *
   * 存储包装后的事件处理函数，用于正确添加和移除监听器。
   * 特别是对于 once 选项，需要保持同一个函数引用。
   */
  let wrappedHandler: EventListener | null = null;

  // ==================== 计算属性 ====================

  /**
   * 获取当前的事件目标
   *
   * 支持响应式引用和函数两种方式获取目标元素。
   * 使用计算属性确保目标变化时能够自动响应。
   *
   * @returns 当前的事件目标元素
   */
  const currentTarget = computed(() => {
    if (typeof target === "function") {
      return target();
    }
    return target.value;
  });

  // ==================== 核心逻辑 ====================

  /**
   * 添加事件监听器
   *
   * 在当前目标上添加指定的事件监听器。
   * 会检查目标是否存在和监听器是否已添加，避免重复操作。
   * 特别处理 once 选项，确保状态同步。
   */
  const addListener: AddListenerFunction = () => {
    const element = currentTarget.value;

    // 目标不存在或监听器已添加时直接返回
    if (!element || isListenerAdded.value) {
      return;
    }

    // 创建包装的事件处理函数，处理 once 选项
    wrappedHandler = (event: Event) => {
      // 调用原始处理函数
      handler(event as T);

      // 如果是 once 选项，更新状态
      if (listenerOptions.once) {
        isListenerAdded.value = false;
        wrappedHandler = null;
      }
    };

    // 添加事件监听器
    element.addEventListener(event, wrappedHandler, listenerOptions);
    isListenerAdded.value = true;
  };

  /**
   * 移除事件监听器
   *
   * 从当前目标上移除指定的事件监听器。
   * 会检查监听器是否已添加，避免重复移除。
   * 使用保存的包装函数引用确保正确移除。
   */
  const removeListener: RemoveListenerFunction = () => {
    const element = currentTarget.value;

    // 目标不存在或监听器未添加时直接返回
    if (!element || !isListenerAdded.value || !wrappedHandler) {
      return;
    }

    // 移除事件监听器
    element.removeEventListener(event, wrappedHandler, listenerOptions);
    isListenerAdded.value = false;
    wrappedHandler = null;
  };

  /**
   * 启用/禁用事件监听器
   *
   * 动态控制监听器的启用状态。
   * 启用时添加监听器，禁用时移除监听器。
   *
   * @param value - 是否启用监听器
   *
   * @example
   * ```typescript
   * const [, , setEnabled] = useEventListener(target, 'click', handler);
   *
   * // 禁用监听器
   * setEnabled(false);
   *
   * // 重新启用监听器
   * setEnabled(true);
   *
   * // 根据条件动态控制
   * watch(shouldListen, (should) => {
   *   setEnabled(should);
   * });
   * ```
   */
  const setEnabled: SetEnabledFunction = (value: boolean) => {
    if (enabled.value === value) {
      return;
    }

    enabled.value = value;

    if (value) {
      addListener();
    } else {
      removeListener();
    }
  };

  // ==================== 响应式监听 ====================

  /**
   * 监听目标变化
   *
   * 当目标元素发生变化时，重新设置事件监听器。
   * 确保监听器始终绑定到正确的目标上。
   */
  watch(
    currentTarget,
    (newTarget, oldTarget) => {
      // 如果监听器未启用，直接返回
      if (!enabled.value) {
        return;
      }

      // 移除旧目标上的监听器
      if (oldTarget && isListenerAdded.value && wrappedHandler) {
        oldTarget.removeEventListener(event, wrappedHandler, listenerOptions);
        isListenerAdded.value = false;
        wrappedHandler = null;
      }

      // 在新目标上添加监听器
      if (newTarget) {
        addListener();
      }
    },
    { flush: "post" },
  );

  /**
   * 监听启用状态变化
   *
   * 当启用状态发生变化时，相应地添加或移除监听器。
   */
  watch(
    enabled,
    (isEnabled) => {
      if (isEnabled) {
        addListener();
      } else {
        removeListener();
      }
    },
    { flush: "post" },
  );

  // ==================== 生命周期管理 ====================

  /**
   * 组件挂载时的初始化
   *
   * 如果配置为立即启用，则添加事件监听器。
   */
  onMounted(() => {
    if (enabled.value) {
      addListener();
    }
  });

  /**
   * 组件卸载时的清理
   *
   * 如果配置为自动移除，则清理事件监听器，防止内存泄漏。
   */
  onUnmounted(() => {
    if (autoRemove) {
      removeListener();
    }
  });

  // ==================== 返回值 ====================

  /**
   * 返回数组格式的控制函数
   *
   * 遵循 React Hooks 设计模式，返回数组便于解构和自定义命名。
   * 数组顺序：[添加函数, 移除函数, 启用控制函数]
   */
  return [addListener, removeListener, setEnabled];
}
