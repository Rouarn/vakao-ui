import type { ComputedRef } from "vue";
import { ref, computed } from "vue";
import type { ResetFunction } from "../types/shared";

/**
 * 异步函数类型
 */
export type AsyncFunction<T, P extends unknown[] = unknown[]> = (...args: P) => Promise<T>;

/**
 * 异步操作状态枚举
 */
export enum AsyncStatus {
  /** 空闲状态 */
  IDLE = "idle",
  /** 加载中 */
  LOADING = "loading",
  /** 成功 */
  SUCCESS = "success",
  /** 错误 */
  ERROR = "error",
}

/**
 * 异步操作状态接口
 */
export interface AsyncState<T> {
  /** 数据 */
  data: T | null;
  /** 错误信息 */
  error: Error | null;
  /** 状态 */
  status: AsyncStatus;
}

/**
 * 执行异步操作的函数类型
 */
export type AsyncExecuteFunction<P extends unknown[] = unknown[]> = (...args: P) => Promise<void>;

/**
 * 成功回调函数类型
 */
export type SuccessCallback<T> = (data: T) => void;

/**
 * 错误回调函数类型
 */
export type ErrorCallback = (error: Error) => void;

/**
 * 完成回调函数类型（无论成功或失败都会调用）
 */
export type FinallyCallback = () => void;

/**
 * 异步操作配置选项
 */
export interface UseAsyncOptions {
  /** 是否立即执行异步函数 */
  immediate?: boolean;
  /** 重置延迟时间（毫秒），用于防止状态闪烁 */
  resetDelay?: number;
  /** 成功回调 */
  onSuccess?: <T>(data: T) => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
  /** 完成回调（无论成功或失败） */
  onFinally?: () => void;
}

/**
 * useAsync 返回值类型
 */
export type UseAsyncReturn<T, P extends unknown[] = unknown[]> = [
  ComputedRef<T | null>,
  ComputedRef<boolean>,
  ComputedRef<Error | null>,
  AsyncExecuteFunction<P>,
  ResetFunction,
  ComputedRef<AsyncStatus>,
];

/**
 * 异步操作状态管理 Hook
 *
 * 用于管理异步操作的状态，包括加载状态、数据、错误等。
 * 提供统一的异步操作状态管理方案，支持手动执行、自动重置等功能。
 *
 * @param asyncFn - 异步函数
 * @param options - 配置选项
 * @returns [data, loading, error, execute, reset, status] - 数据、加载状态、错误、执行函数、重置函数、状态
 *
 * @example
 * ```typescript
 * // 基础用法
 * const [data, loading, error, execute] = useAsync(async (id: string) => {
 *   const response = await fetch(`/api/users/${id}`);
 *   return response.json();
 * });
 *
 * // 立即执行
 * const [userData, userLoading] = useAsync(
 *   () => fetchUserData(),
 *   { immediate: true }
 * );
 *
 * // 带回调
 * const [result, loading, error, submit] = useAsync(
 *   async (formData) => submitForm(formData),
 *   {
 *     onSuccess: (data) => console.log('提交成功:', data),
 *     onError: (err) => console.error('提交失败:', err)
 *   }
 * );
 *
 * // 在组件中使用
 * const handleSubmit = () => {
 *   execute(formData.value);
 * };
 * ```
 *
 * @since 0.0.2
 * @author Vakao UI Team
 */
export function useAsync<T, P extends unknown[] = unknown[]>(
  asyncFn: AsyncFunction<T, P>,
  options: UseAsyncOptions = {},
): UseAsyncReturn<T, P> {
  const { immediate = false, resetDelay = 0, onSuccess, onError, onFinally } = options;

  // 状态管理
  const state = ref<AsyncState<T>>({
    data: null,
    error: null,
    status: AsyncStatus.IDLE,
  });

  // 计算属性
  const data = computed(() => state.value.data) as ComputedRef<T | null>;
  const error = computed(() => state.value.error);
  const status = computed(() => state.value.status);
  const loading = computed(() => state.value.status === AsyncStatus.LOADING);

  // 重置定时器
  let resetTimer: number | null = null;

  /**
   * 执行异步操作
   */
  const execute: AsyncExecuteFunction<P> = async (...args: P) => {
    // 清除之前的重置定时器
    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }

    // 设置加载状态
    state.value = {
      data: state.value.data, // 保持之前的数据
      error: null,
      status: AsyncStatus.LOADING,
    };

    try {
      const result = await asyncFn(...args);

      state.value = {
        data: result,
        error: null,
        status: AsyncStatus.SUCCESS,
      };

      onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));

      state.value = {
        data: null,
        error,
        status: AsyncStatus.ERROR,
      };

      onError?.(error);
    } finally {
      onFinally?.();
    }
  };

  /**
   * 重置状态
   */
  const reset: ResetFunction = () => {
    // 清除重置定时器
    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }

    const resetState = () => {
      state.value = {
        data: null,
        error: null,
        status: AsyncStatus.IDLE,
      };
    };

    if (resetDelay > 0) {
      resetTimer = window.setTimeout(resetState, resetDelay);
    } else {
      resetState();
    }
  };

  // 立即执行
  if (immediate) {
    execute(...([] as unknown as P));
  }

  return [data, loading, error, execute, reset, status];
}

/**
 * 默认导出
 */
export default useAsync;
