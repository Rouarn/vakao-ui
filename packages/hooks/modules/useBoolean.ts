import type { ComputedRef } from "vue";
import { ref, computed } from "vue";
import type { SetTrueFunction, SetFalseFunction } from "../types/shared";

/**
 * 设置布尔值的函数类型
 * @description 设置布尔状态为指定值
 */
export type SetBooleanFunction = (value: boolean) => void;

/**
 * useBoolean 钩子函数的返回值类型
 * @description 返回一个包含状态和操作函数的数组，可以通过数组解构使用
 * @example
 * ```typescript
 * const [isVisible, setVisible, setTrue, setFalse] = useBoolean(false);
 * ```
 */
export type UseBooleanReturn = [
  /** 当前布尔状态值的只读响应式引用 */
  ComputedRef<boolean>,
  /** 设置布尔值的函数 */
  SetBooleanFunction,
  /** 将状态设置为 true 的函数 */
  SetTrueFunction,
  /** 将状态设置为 false 的函数 */
  SetFalseFunction,
];

/**
 * 布尔值状态管理 Hook
 *
 * 提供简单的布尔状态管理功能，支持直接设置值、设置为 true 或 false。
 * 相比 useToggle，useBoolean 更专注于状态设置而非切换操作。
 *
 * 设计特点：
 * - 响应式：基于 Vue 3 ref 实现，自动触发视图更新
 * - 类型安全：完整的 TypeScript 类型定义
 * - 简洁性：专注于布尔值的设置操作
 * - 一致性：API 设计与其他 Hooks 保持一致
 * - 数组返回：避免对象形式，便于用户自定义命名
 *
 * @param initialValue - 初始布尔值，默认为 false
 *
 * @returns 返回包含状态和操作函数的数组
 * - [0] state: ComputedRef<boolean> - 只读的响应式布尔状态（计算属性）
 * - [1] setValue: (value: boolean) => void - 设置布尔值的函数
 * - [2] setTrue: () => void - 设置为 true 的函数
 * - [3] setFalse: () => void - 设置为 false 的函数
 *
 * @example
 * ```typescript
 * // 基础用法 - 控制加载状态
 * const [isLoading, setLoading, startLoading, stopLoading] = useBoolean(false);
 *
 * // 异步操作示例
 * const handleSubmit = async () => {
 *   startLoading(); // 开始加载
 *   try {
 *     await submitForm();
 *     // 成功后可能需要保持加载状态或关闭
 *     setLoading(false);
 *   } catch (error) {
 *     stopLoading(); // 出错时停止加载
 *   }
 * };
 *
 * // 条件设置示例
 * const [isValid, setValid, markValid, markInvalid] = useBoolean(true);
 * const validateForm = (formData: FormData) => {
 *   const valid = formData.email && formData.password;
 *   setValid(valid); // 根据条件设置状态
 * };
 *
 * // 多状态管理示例
 * const [isModalOpen, setModalOpen, openModal, closeModal] = useBoolean();
 * const [isConfirmed, setConfirmed, confirm, cancel] = useBoolean();
 *
 * const handleConfirm = () => {
 *   confirm();
 *   closeModal();
 * };
 * ```
 *
 * @see {@link useToggle} 布尔值切换管理
 * @see {@link useCounter} 数值状态管理
 * @since 1.0.0
 * @author Vakao UI Team
 */
export function useBoolean(initialValue = false): UseBooleanReturn {
  // ==================== 响应式状态 ====================

  /**
   * 内部布尔状态
   *
   * 使用 ref 创建响应式状态，支持自动依赖追踪和视图更新。
   * 内部状态可写，但对外暴露只读计算属性确保数据流单向性。
   */
  const state = ref<boolean>(initialValue);

  // ==================== 计算属性 ====================

  /**
   * 只读的响应式布尔状态
   *
   * 使用计算属性包装内部状态，确保对外暴露的状态是只读的。
   * 这样可以防止外部直接修改状态，保证数据流的单向性。
   *
   * @returns 当前布尔状态值
   */
  const readonlyState = computed(() => state.value);

  // ==================== 操作函数 ====================

  /**
   * 设置布尔值
   *
   * 直接设置布尔状态为指定值，支持动态设置。
   * 这是最灵活的设置方式，可以根据条件动态设置状态。
   *
   * @param value - 要设置的布尔值
   *
   * @example
   * ```typescript
   * const [isValid, setValid] = useBoolean();
   *
   * // 根据条件设置
   * setValid(formData.isValid);
   *
   * // 动态切换
   * setValid(!isValid.value);
   * ```
   */
  const setValue: SetBooleanFunction = (value: boolean) => {
    state.value = value;
  };

  /**
   * 设置状态为 true
   *
   * 将布尔状态设置为 true，常用于启用、显示、激活等场景。
   * 提供语义化的操作方法，提高代码可读性。
   *
   * @example
   * ```typescript
   * const [isVisible, , show] = useBoolean();
   *
   * // 显示元素
   * show();
   *
   * // 启用功能
   * const [isEnabled, , enable] = useBoolean();
   * enable();
   * ```
   */
  const setTrue: SetTrueFunction = () => {
    state.value = true;
  };

  /**
   * 设置状态为 false
   *
   * 将布尔状态设置为 false，常用于禁用、隐藏、停用等场景。
   * 提供语义化的操作方法，提高代码可读性。
   *
   * @example
   * ```typescript
   * const [isVisible, , , hide] = useBoolean(true);
   *
   * // 隐藏元素
   * hide();
   *
   * // 禁用功能
   * const [isEnabled, , , disable] = useBoolean(true);
   * disable();
   * ```
   */
  const setFalse: SetFalseFunction = () => {
    state.value = false;
  };

  // ==================== 返回值 ====================

  /**
   * 返回数组格式的状态和操作函数
   *
   * 遵循 React Hooks 设计模式，返回数组便于解构和自定义命名。
   * 数组顺序：[状态, 设置函数, 设为true函数, 设为false函数]
   */
  return [readonlyState, setValue, setTrue, setFalse];
}
