import { ref, computed, ComputedRef } from "vue";

/**
 * 切换布尔值的钩子函数
 * @param initialValue 初始值，默认为false
 * @returns 返回数组 [state, toggle, setTrue, setFalse]
 * @example
 * ```typescript
 * // 基础用法
 * const [isVisible, toggle] = useToggle(false);
 *
 * // 完整用法
 * const [isOpen, toggleOpen, setOpen, setClosed] = useToggle(true);
 * ```
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const state = ref(initialValue);

  // 创建只读的计算属性
  const readonlyState = computed(() => state.value);

  function toggle() {
    state.value = !state.value;
  }

  function setTrue() {
    state.value = true;
  }

  function setFalse() {
    state.value = false;
  }

  return [readonlyState, toggle, setTrue, setFalse];
}

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
