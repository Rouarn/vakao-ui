import { ref, computed, watch, type Ref, type ComputedRef } from "vue";

/**
 * 受控/非受控模式的返回类型
 */
export interface UseControlledReturn<T> {
  /** 是否为受控模式 */
  isControlled: ComputedRef<boolean>;
  /** 内部值引用 */
  internalValue: Ref<T>;
  /** 当前值（受控或非受控） */
  currentValue: ComputedRef<T>;
  /** 更新值的方法 */
  updateValue: (_newValue: T) => void;
}

/**
 * 处理受控和非受控模式的组合式函数
 *
 * @param props - 组件的 props 对象
 * @param propName - 受控模式的 prop 名称（如 'value'）
 * @param modelValuePropName - v-model 的 prop 名称（如 'modelValue'）
 * @param emit - 组件的 emit 函数
 * @param defaultValue - 默认值
 * @returns 受控/非受控模式的相关状态和方法
 *
 * @example
 * ```typescript
 * // 在组件中使用
 * const { isControlled, currentValue, updateValue } = useControlled(
 *   props,
 *   'value',
 *   'modelValue',
 *   emit,
 *   ''
 * );
 *
 * // 在事件处理中
 * const handleChange = (newValue: string) => {
 *   updateValue(newValue);
 *   emit('change', newValue);
 * };
 * ```
 */
export function useControlled<T>(
  props: Record<string, unknown>,
  propName: string,
  modelValuePropName: string,
  emit: (event: string, ...args: unknown[]) => void,
  defaultValue: T
): UseControlledReturn<T> {
  // 判断是否为受控模式
  const isControlled = computed(() => props[propName] !== undefined);

  // 内部状态值（非受控模式使用）
  const internalValue = ref<T>((props[modelValuePropName] as T) ?? defaultValue);

  // 当前显示的值
  const currentValue = computed(() => {
    return isControlled.value ? props[propName] : internalValue.value;
  });

  // 监听 modelValue 变化（非受控模式）
  watch(
    () => props[modelValuePropName],
    (newValue) => {
      if (!isControlled.value && newValue !== undefined) {
        internalValue.value = newValue;
      }
    }
  );

  // 更新值的方法
  const updateValue = (newValue: T) => {
    if (!isControlled.value) {
      internalValue.value = newValue;
    }

    emit(`update:${modelValuePropName}`, newValue);
  };

  return {
    isControlled,
    currentValue,
    internalValue: internalValue as Ref<T>,
    updateValue,
  };
}

/**
 * 简化版的受控/非受控模式处理函数
 * 适用于大多数表单组件的标准用法
 *
 * @param props - 组件的 props 对象
 * @param emit - 组件的 emit 函数
 * @param defaultValue - 默认值
 * @returns 受控/非受控模式的相关状态和方法
 *
 * @example
 * ```typescript
 * // 在组件中使用（标准的 value/modelValue 模式）
 * const { isControlled, currentValue, updateValue } = useStandardControlled(
 *   props,
 *   emit,
 *   ''
 * );
 * ```
 */
export function useStandardControlled<T>(
  props: Record<string, unknown>,
  emit: (event: string, ...args: unknown[]) => void,
  defaultValue: T
): UseControlledReturn<T> {
  return useControlled(props, "value", "modelValue", emit, defaultValue);
}
