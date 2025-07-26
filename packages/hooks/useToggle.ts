import { ref, computed, ComputedRef } from "vue";

/**
 * 切换状态的函数类型
 * @description 切换当前布尔状态值
 */
export type ToggleFunction = () => void;

/**
 * 设置状态为 true 的函数类型
 * @description 将状态设置为 true
 */
export type SetTrueFunction = () => void;

/**
 * 设置状态为 false 的函数类型
 * @description 将状态设置为 false
 */
export type SetFalseFunction = () => void;

/**
 * useToggle 钩子函数的返回值类型
 * @description 返回一个包含状态和操作函数的数组，可以通过数组解构使用
 * @example
 * ```typescript
 * const [isVisible, toggle, setTrue, setFalse] = useToggle(false);
 * ```
 */
export type UseToggleReturn = [
  /** 当前布尔状态值的只读响应式引用 */
  ComputedRef<boolean>,
  /** 切换状态的函数 */
  ToggleFunction,
  /** 将状态设置为 true 的函数 */
  SetTrueFunction,
  /** 将状态设置为 false 的函数 */
  SetFalseFunction,
];

/**
 * 切换布尔值的钩子函数
 * 提供简单的布尔状态管理，支持切换、设置为 true 或 false
 *
 * @param initialValue 初始值，默认为 false
 * @returns 返回数组 [state, toggle, setTrue, setFalse]，其中 state 是只读的
 *
 * @example
 * ```typescript
 * // 基础用法 - 控制模态框显示
 * const [isVisible, toggle] = useToggle(false);
 * // isVisible.value 是只读的，只能通过 toggle() 修改
 * toggle(); // 切换状态
 *
 * // 完整用法 - 控制侧边栏
 * const [isOpen, toggleSidebar, openSidebar, closeSidebar] = useToggle(true);
 * toggleSidebar();  // 切换状态
 * openSidebar();    // 设置为 true
 * closeSidebar();   // 设置为 false
 *
 * // 在模板中使用
 * // <div v-if="isVisible.value">内容</div>
 * // <button @click="toggle">切换</button>
 *
 * // 实际应用场景
 * const [showModal, toggleModal, openModal, closeModal] = useToggle();
 * const [isLoading, , startLoading, stopLoading] = useToggle();
 * const [isDarkMode, toggleTheme] = useToggle(false);
 * ```
 *
 * @remarks
 * - 返回的状态值是只读的计算属性，确保数据流的单向性
 * - 遵循 React Hooks 的设计模式，使用数组返回值便于重命名
 * - 适用于任何需要布尔状态切换的场景
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  // 内部可变状态
  const state = ref(initialValue);

  // 创建只读的计算属性，确保外部无法直接修改
  const readonlyState = computed(() => state.value);

  /**
   * 切换当前状态值
   */
  function toggle() {
    state.value = !state.value;
  }

  /**
   * 将状态设置为 true
   */
  function setTrue() {
    state.value = true;
  }

  /**
   * 将状态设置为 false
   */
  function setFalse() {
    state.value = false;
  }

  return [readonlyState, toggle, setTrue, setFalse];
}
