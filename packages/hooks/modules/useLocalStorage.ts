import type { ComputedRef } from "vue";
import { ref, watch, computed } from "vue";

/**
 * 设置存储值的函数类型
 * @description 设置本地存储的值
 */
export type SetStorageFunction<T> = (value: T | ((prevValue: T) => T)) => void;

/**
 * 移除存储值的函数类型
 * @description 从本地存储中移除指定键的值
 */
export type RemoveStorageFunction = () => void;

/**
 * useLocalStorage 钩子函数的返回值类型
 * @description 返回一个包含存储值和操作函数的数组，可以通过数组解构使用
 * @example
 * ```typescript
 * const [value, setValue, removeValue] = useLocalStorage('key', 'defaultValue');
 * ```
 */
export type UseLocalStorageReturn<T> = [
  /** 当前存储值的只读响应式引用 */
  ComputedRef<T>,
  /** 设置存储值的函数 */
  SetStorageFunction<T>,
  /** 移除存储值的函数 */
  RemoveStorageFunction,
];

/**
 * 序列化函数类型
 */
export type SerializerFunction<T> = {
  read: (value: string) => T;
  write: (value: T) => string;
};

/**
 * 默认序列化器
 */
const defaultSerializer: SerializerFunction<unknown> = {
  read: (value: string) => {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },
  write: (value: unknown) => JSON.stringify(value),
};

/**
 * 本地存储钩子函数
 * @param key 存储键名（实际存储时会自动添加 'vk-' 前缀）
 * @param defaultValue 默认值
 * @param options 配置选项
 * @param options.serializer 自定义序列化器
 * @param options.syncAcrossTabs 是否在标签页间同步，默认为true
 * @returns 返回数组 [storedValue, setValue, removeValue]，其中 storedValue 是只读的
 * @example
 * ```typescript
 * // 基础用法（实际存储键名为 'vk-username'）
 * const [name, setName] = useLocalStorage('username', '');
 * // name.value 是只读的，只能通过 setName() 修改
 * setName('新用户名'); // ✅ 正确
 * // name.value = '直接修改'; // ❌ 错误：只读属性
 *
 * // 存储对象（实际存储键名为 'vk-user'）
 * const [user, setUser] = useLocalStorage('user', { name: '', age: 0 });
 * setUser({ name: '张三', age: 25 }); // ✅ 正确
 *
 * // 自定义序列化器（实际存储键名为 'vk-date'）
 * const [date, setDate] = useLocalStorage('date', new Date(), {
 *   serializer: {
 *     read: (value) => new Date(value),
 *     write: (value) => value.toISOString()
 *   }
 * });
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: {
    serializer?: SerializerFunction<T>;
    syncAcrossTabs?: boolean;
  } = {},
): UseLocalStorageReturn<T> {
  const { serializer = defaultSerializer, syncAcrossTabs = true } = options;

  // 添加组件库前缀
  const prefixedKey = `vk-${key}`;

  // 读取初始值
  function readFromStorage(): T {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(prefixedKey);
      if (item === null) {
        return defaultValue;
      }
      return serializer.read(item) as T;
    } catch (error) {
      console.warn(`Error reading localStorage key "${prefixedKey}":`, error);
      return defaultValue;
    }
  }

  // 写入存储
  function writeToStorage(value: T): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(prefixedKey, serializer.write(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${prefixedKey}":`, error);
    }
  }

  // 从存储中移除
  function removeFromStorage(): void {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.removeItem(prefixedKey);
    } catch (error) {
      console.warn(`Error removing localStorage key "${prefixedKey}":`, error);
    }
  }

  const storedValue = ref<T>(readFromStorage());

  // 创建只读的计算属性
  const readonlyValue = computed(() => storedValue.value);

  // 设置值
  function setValue(value: T | ((prevValue: T) => T)): void {
    const newValue = typeof value === "function" ? (value as (prevValue: T) => T)(storedValue.value) : value;

    storedValue.value = newValue;
    writeToStorage(newValue);
  }

  // 移除值
  function removeValue(): void {
    storedValue.value = defaultValue;
    removeFromStorage();
  }

  // 监听值变化，同步到存储
  watch(
    storedValue,
    (newValue) => {
      writeToStorage(newValue);
    },
    { deep: true },
  );

  // 监听存储变化（跨标签页同步）
  if (typeof window !== "undefined" && syncAcrossTabs) {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === prefixedKey && e.newValue !== null) {
        try {
          storedValue.value = serializer.read(e.newValue);
        } catch (error) {
          console.warn(`Error parsing storage event for key "${prefixedKey}":`, error);
        }
      } else if (e.key === prefixedKey && e.newValue === null) {
        storedValue.value = defaultValue;
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // 清理函数（在组件卸载时会自动调用）
    if (typeof window !== "undefined") {
      const cleanup = () => {
        window.removeEventListener("storage", handleStorageChange);
      };

      // 在 Vue 3 中，可以使用 onUnmounted 来清理
      // 但这里我们返回清理函数，让用户自己决定何时清理
      (setValue as SetStorageFunction<T> & { cleanup?: () => void }).cleanup = cleanup;
    }
  }

  return [readonlyValue, setValue, removeValue];
}
