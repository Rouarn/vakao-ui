import { ref, computed, type Ref, type ComputedRef } from "vue";

/**
 * 数组操作函数类型
 */
export type ArrayPushFunction<T> = (...items: T[]) => void;
export type ArrayPopFunction<T> = () => T | undefined;
export type ArrayShiftFunction<T> = () => T | undefined;
export type ArrayUnshiftFunction<T> = (...items: T[]) => void;
export type ArraySpliceFunction<T> = (start: number, deleteCount?: number, ...items: T[]) => T[];
export type ArrayRemoveFunction<T> = (item: T) => boolean;
export type ArrayRemoveAtFunction<T> = (index: number) => T | undefined;
export type ArrayInsertAtFunction<T> = (index: number, item: T) => void;
export type ArrayUpdateAtFunction<T> = (index: number, item: T) => boolean;
export type ArrayClearFunction = () => void;
export type ArrayReplaceFunction<T> = (newArray: T[]) => void;
export type ArrayFilterFunction<T> = (predicate: (item: T, index: number) => boolean) => void;
export type ArraySortFunction<T> = (compareFn?: (a: T, b: T) => number) => void;
export type ArrayReverseFunction = () => void;

/**
 * 数组操作接口
 */
export interface ArrayActions<T> {
  /** 添加元素到末尾 */
  push: ArrayPushFunction<T>;
  /** 移除并返回最后一个元素 */
  pop: ArrayPopFunction<T>;
  /** 移除并返回第一个元素 */
  shift: ArrayShiftFunction<T>;
  /** 添加元素到开头 */
  unshift: ArrayUnshiftFunction<T>;
  /** 删除/插入元素 */
  splice: ArraySpliceFunction<T>;
  /** 移除指定元素 */
  remove: ArrayRemoveFunction<T>;
  /** 移除指定索引的元素 */
  removeAt: ArrayRemoveAtFunction<T>;
  /** 在指定索引插入元素 */
  insertAt: ArrayInsertAtFunction<T>;
  /** 更新指定索引的元素 */
  updateAt: ArrayUpdateAtFunction<T>;
  /** 清空数组 */
  clear: ArrayClearFunction;
  /** 替换整个数组 */
  replace: ArrayReplaceFunction<T>;
  /** 过滤数组 */
  filter: ArrayFilterFunction<T>;
  /** 排序数组 */
  sort: ArraySortFunction<T>;
  /** 反转数组 */
  reverse: ArrayReverseFunction;
}

/**
 * useArray 返回值类型
 */
export type UseArrayReturn<T> = [ComputedRef<readonly T[]>, ArrayActions<T>, ComputedRef<number>, ComputedRef<boolean>];

/**
 * 数组状态管理 Hook
 *
 * 提供响应式数组状态管理和常用数组操作方法。
 * 支持所有常见的数组操作，并保持响应式特性。
 *
 * @param initialValue - 初始数组值
 * @returns [array, actions, length, isEmpty] - 数组、操作方法、长度、是否为空
 *
 * @example
 * ```typescript
 * // 基础用法
 * const [list, actions] = useArray([1, 2, 3]);
 *
 * // 添加元素
 * actions.push(4, 5);
 * actions.unshift(0);
 * actions.insertAt(2, 1.5);
 *
 * // 移除元素
 * actions.pop();
 * actions.shift();
 * actions.remove(2);
 * actions.removeAt(1);
 *
 * // 修改元素
 * actions.updateAt(0, 10);
 * actions.replace([10, 20, 30]);
 *
 * // 数组操作
 * actions.sort((a, b) => a - b);
 * actions.reverse();
 * actions.filter(item => item > 5);
 *
 * // 获取状态
 * const [todos, todoActions, length, isEmpty] = useArray<Todo>([]);
 * console.log('待办数量:', length.value);
 * console.log('是否为空:', isEmpty.value);
 *
 * // 在组件中使用
 * const addTodo = (text: string) => {
 *   todoActions.push({ id: Date.now(), text, completed: false });
 * };
 *
 * const removeTodo = (id: number) => {
 *   todoActions.filter(todo => todo.id !== id);
 * };
 * ```
 *
 * @since 0.0.2
 * @author Vakao UI Team
 */
export function useArray<T>(initialValue: T[] = []): UseArrayReturn<T> {
  // 响应式数组状态
  const array = ref<T[]>([...initialValue]) as Ref<T[]>;

  // 计算属性
  const readonlyArray = computed(() => array.value as readonly T[]);
  const length = computed(() => array.value.length);
  const isEmpty = computed(() => array.value.length === 0);

  // 数组操作方法
  const actions: ArrayActions<T> = {
    /**
     * 添加元素到末尾
     */
    push: (...items: T[]) => {
      array.value.push(...items);
    },

    /**
     * 移除并返回最后一个元素
     */
    pop: () => {
      return array.value.pop();
    },

    /**
     * 移除并返回第一个元素
     */
    shift: () => {
      return array.value.shift();
    },

    /**
     * 添加元素到开头
     */
    unshift: (...items: T[]) => {
      array.value.unshift(...items);
    },

    /**
     * 删除/插入元素
     */
    splice: (start: number, deleteCount?: number, ...items: T[]) => {
      return array.value.splice(start, deleteCount ?? 0, ...items);
    },

    /**
     * 移除指定元素（移除第一个匹配的元素）
     */
    remove: (item: T) => {
      const index = array.value.indexOf(item);
      if (index > -1) {
        array.value.splice(index, 1);
        return true;
      }
      return false;
    },

    /**
     * 移除指定索引的元素
     */
    removeAt: (index: number) => {
      if (index >= 0 && index < array.value.length) {
        return array.value.splice(index, 1)[0];
      }
      return undefined;
    },

    /**
     * 在指定索引插入元素
     */
    insertAt: (index: number, item: T) => {
      array.value.splice(index, 0, item);
    },

    /**
     * 更新指定索引的元素
     */
    updateAt: (index: number, item: T) => {
      if (index >= 0 && index < array.value.length) {
        array.value[index] = item;
        return true;
      }
      return false;
    },

    /**
     * 清空数组
     */
    clear: () => {
      array.value.length = 0;
    },

    /**
     * 替换整个数组
     */
    replace: (newArray: T[]) => {
      array.value.splice(0, array.value.length, ...newArray);
    },

    /**
     * 过滤数组（就地修改）
     */
    filter: (predicate: (item: T, index: number) => boolean) => {
      const filtered = array.value.filter(predicate);
      actions.replace(filtered);
    },

    /**
     * 排序数组（就地修改）
     */
    sort: (compareFn?: (a: T, b: T) => number) => {
      array.value.sort(compareFn);
    },

    /**
     * 反转数组（就地修改）
     */
    reverse: () => {
      array.value.reverse();
    },
  };

  return [readonlyArray, actions, length, isEmpty];
}

/**
 * 默认导出
 */
export default useArray;
