import type { Ref } from "vue";
import { ref, onMounted, onUnmounted } from "vue";
import type { SetEnabledFunction } from "../types/shared";

/**
 * 点击外部区域的回调函数类型
 * @description 当点击目标元素外部时触发的回调函数
 */
export type ClickOutsideCallback = (event: MouseEvent) => void;

/**
 * useClickOutside 钩子函数的返回值类型
 * @description 返回一个包含目标元素引用和控制函数的数组
 * @example
 * ```typescript
 * const [targetRef, setEnabled] = useClickOutside(callback);
 * ```
 */
export type UseClickOutsideReturn = [
  /** 目标元素的响应式引用 */
  Ref<HTMLElement | null>,
  /** 启用/禁用点击外部检测的函数 */
  SetEnabledFunction,
];

/**
 * 点击外部区域检测配置选项
 */
export interface UseClickOutsideOptions {
  /** 是否立即启用检测，默认为 true */
  immediate?: boolean;
  /** 事件类型，默认为 'mousedown' */
  eventType?: "mousedown" | "mouseup" | "click";
  /** 是否在捕获阶段监听事件，默认为 true */
  capture?: boolean;
  /** 要排除的元素选择器或元素引用数组 */
  ignore?: (string | Ref<HTMLElement | null>)[];
}

/**
 * 点击外部区域检测 Hook
 *
 * 检测用户是否点击了指定元素外部的区域，常用于关闭下拉菜单、模态框等组件。
 * 支持多种配置选项和排除特定元素的功能。
 *
 * 设计特点：
 * - 自动管理：自动添加和移除事件监听器
 * - 性能优化：支持动态启用/禁用，避免不必要的事件监听
 * - 灵活配置：支持多种事件类型和监听选项
 * - 排除机制：支持排除特定元素，避免误触发
 * - 类型安全：完整的 TypeScript 类型定义
 * - 生命周期管理：组件卸载时自动清理事件监听器
 *
 * @param callback - 点击外部时的回调函数
 * @param options - 配置选项
 *
 * @returns 返回包含目标元素引用和控制函数的数组
 * - [0] targetRef: Ref<HTMLElement | null> - 目标元素的响应式引用
 * - [1] setEnabled: (enabled: boolean) => void - 启用/禁用检测的函数
 *
 * @example
 * ```typescript
 * // 基础用法 - 关闭下拉菜单
 * const [dropdownRef, setEnabled] = useClickOutside(() => {
 *   isDropdownOpen.value = false;
 * });
 *
 * // 在模板中使用
 * // <div ref="dropdownRef" class="dropdown">
 * //   <!-- 下拉菜单内容 -->
 * // </div>
 *
 * // 条件启用检测
 * const [modalRef, setModalEnabled] = useClickOutside(
 *   () => closeModal(),
 *   { immediate: false }
 * );
 *
 * // 当模态框打开时启用检测
 * watch(isModalOpen, (open) => {
 *   setModalEnabled(open);
 * });
 *
 * // 排除特定元素
 * const [menuRef, setMenuEnabled] = useClickOutside(
 *   () => closeMenu(),
 *   {
 *     ignore: ['.menu-trigger', triggerButtonRef]
 *   }
 * );
 *
 * // 自定义事件类型
 * const [panelRef] = useClickOutside(
 *   handleClickOutside,
 *   {
 *     eventType: 'click',
 *     capture: false
 *   }
 * );
 *
 * // 复杂场景 - 多层嵌套组件
 * const [outerRef, setOuterEnabled] = useClickOutside(() => {
 *   // 关闭外层组件
 *   closeOuter();
 * });
 *
 * const [innerRef, setInnerEnabled] = useClickOutside(() => {
 *   // 关闭内层组件，但不影响外层
 *   closeInner();
 * }, {
 *   ignore: [outerRef] // 排除外层元素
 * });
 * ```
 *
 * @see {@link useEventListener} 通用事件监听器
 * @see {@link useFocus} 焦点状态管理
 * @since 1.0.0
 * @author Vakao UI Team
 */
export function useClickOutside(
  callback: ClickOutsideCallback,
  options: UseClickOutsideOptions = {},
): UseClickOutsideReturn {
  // ==================== 配置选项 ====================

  const {
    immediate = true,
    eventType = "mousedown",
    capture = true,
    ignore = [],
  } = options;

  // ==================== 响应式状态 ====================

  /**
   * 目标元素的响应式引用
   *
   * 用户需要将此引用绑定到要检测的目标元素上。
   * 当点击此元素外部时，会触发回调函数。
   */
  const targetRef = ref<HTMLElement | null>(null);

  /**
   * 检测功能的启用状态
   *
   * 控制是否启用点击外部检测功能。
   * 可以动态启用/禁用，优化性能。
   */
  const enabled = ref<boolean>(immediate);

  // ==================== 核心逻辑 ====================

  /**
   * 检查元素是否应该被忽略
   *
   * 遍历忽略列表，检查点击的元素是否在忽略范围内。
   * 支持 CSS 选择器字符串和元素引用两种方式。
   *
   * @param element - 要检查的元素
   * @returns 是否应该忽略此元素
   */
  const shouldIgnore = (element: Element): boolean => {
    return ignore.some((item) => {
      if (typeof item === "string") {
        // CSS 选择器方式
        return element.closest(item) !== null;
      } else {
        // 元素引用方式
        const ignoreElement = item.value;
        return (
          ignoreElement &&
          (element === ignoreElement || ignoreElement.contains(element))
        );
      }
    });
  };

  /**
   * 点击事件处理函数
   *
   * 检测点击事件是否发生在目标元素外部。
   * 如果是外部点击且不在忽略列表中，则触发回调函数。
   *
   * @param event - 鼠标事件对象
   */
  const handleClick = (event: MouseEvent) => {
    // 检测功能未启用时直接返回
    if (!enabled.value) {
      return;
    }

    // 目标元素不存在时直接返回
    const target = targetRef.value;
    if (!target) {
      return;
    }

    // 获取点击的元素
    const clickedElement = event.target as Element;
    if (!clickedElement) {
      return;
    }

    // 检查是否点击在目标元素内部
    const isClickInside =
      target === clickedElement || target.contains(clickedElement);
    if (isClickInside) {
      return;
    }

    // 检查是否应该忽略此次点击
    if (shouldIgnore(clickedElement)) {
      return;
    }

    // 触发外部点击回调
    callback(event);
  };

  // ==================== 生命周期管理 ====================

  /**
   * 添加事件监听器
   *
   * 在文档上添加指定类型的事件监听器。
   * 使用捕获阶段可以更早地捕获事件。
   */
  const addListener = () => {
    document.addEventListener(eventType, handleClick, capture);
  };

  /**
   * 移除事件监听器
   *
   * 从文档上移除事件监听器，避免内存泄漏。
   */
  const removeListener = () => {
    document.removeEventListener(eventType, handleClick, capture);
  };

  // ==================== 操作函数 ====================

  /**
   * 启用/禁用点击外部检测
   *
   * 动态控制检测功能的开关状态。
   * 启用时添加事件监听器，禁用时移除事件监听器。
   *
   * @param value - 是否启用检测功能
   *
   * @example
   * ```typescript
   * const [targetRef, setEnabled] = useClickOutside(callback);
   *
   * // 禁用检测
   * setEnabled(false);
   *
   * // 重新启用检测
   * setEnabled(true);
   *
   * // 根据条件动态控制
   * watch(isModalOpen, (open) => {
   *   setEnabled(open);
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

  // ==================== 生命周期钩子 ====================

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
   * 移除事件监听器，防止内存泄漏。
   */
  onUnmounted(() => {
    removeListener();
  });

  // ==================== 返回值 ====================

  /**
   * 返回数组格式的引用和控制函数
   *
   * 遵循 React Hooks 设计模式，返回数组便于解构和自定义命名。
   * 数组顺序：[目标元素引用, 启用控制函数]
   */
  return [targetRef, setEnabled];
}
