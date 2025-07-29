import type { Ref, ComputedRef } from "vue";
import { ref, computed, onUnmounted } from "vue";

/**
 * 请求状态枚举
 */
export enum FetchStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

/**
 * 请求错误类型
 */
export interface FetchError {
  message: string;
  status?: number;
  statusText?: string;
  url?: string;
}

/**
 * 请求配置选项
 */
export interface UseFetchOptions<T> {
  /** 是否立即执行请求，默认为 true */
  immediate?: boolean;
  /** 请求超时时间（毫秒），默认为 10000 */
  timeout?: number;
  /** 重试次数，默认为 0 */
  retries?: number;
  /** 重试延迟时间（毫秒），默认为 1000 */
  retryDelay?: number;
  /** 响应数据转换函数 */
  transform?: (data: unknown) => T;
  /** 请求前的钩子函数 */
  beforeRequest?: (url: string, options?: RequestInit) => void | Promise<void>;
  /** 请求后的钩子函数 */
  afterRequest?: (response: Response) => void | Promise<void>;
  /** 错误处理钩子函数 */
  onError?: (error: FetchError) => void;
}

/**
 * 执行请求的函数类型
 * @description 手动执行请求
 */
export type FetchExecuteFunction = () => Promise<void>;

/**
 * 取消请求的函数类型
 * @description 取消当前进行中的请求
 */
export type CancelFunction = () => void;

/**
 * 重新请求的函数类型
 * @description 重新执行请求
 */
export type RefreshFunction = () => Promise<void>;

/**
 * useFetch 钩子函数的返回值类型（数组形式）
 * @description 返回一个包含请求状态和控制函数的数组，类似 React hooks 设计
 * @example
 * ```typescript
 * const [data, loading, error, { execute, cancel, refresh, status, finished }] = useFetch('/api/users');
 * // 或者自定义命名
 * const [users, isLoading, fetchError, actions] = useFetch('/api/users');
 * // 支持Promise函数
 * const [data, loading, error] = useFetch(() => fetchUserData());
 * ```
 */
export type UseFetchReturn<T> = [
  /** 响应数据的只读响应式引用 */
  ComputedRef<T | null>,
  /** 加载状态的响应式引用 */
  Ref<boolean>,
  /** 错误信息的响应式引用 */
  Ref<FetchError | null>,
  /** 控制函数和状态对象 */
  {
    /** 请求状态的响应式引用 */
    status: Ref<FetchStatus>;
    /** 是否完成的计算属性 */
    finished: ComputedRef<boolean>;
    /** 手动执行请求的函数 */
    execute: FetchExecuteFunction;
    /** 取消请求的函数 */
    cancel: CancelFunction;
    /** 重新请求的函数 */
    refresh: RefreshFunction;
  },
];

/**
 * usePromise 钩子函数的返回值类型（数组形式）
 * @description 专门用于处理Promise函数的钩子
 */
export type UsePromiseReturn<T> = UseFetchReturn<T>;

/**
 * Promise执行函数类型
 */
export type PromiseFunction<T> = () => Promise<T>;

/**
 * 数据获取钩子函数
 * @param url 请求 URL 或返回 URL 的函数
 * @param options 请求配置选项
 * @param fetchOptions fetch API 的配置选项
 * @returns 返回包含请求状态和控制函数的对象
 * @example
 * ```typescript
 * // 基础用法
 * const [data, loading, error] = useFetch('/api/users');
 *
 * // 手动触发请求
 * const [data, , , { execute }] = useFetch('/api/users', { immediate: false });
 *
 * // 带参数的请求
 * const userId = ref(1);
 * const [data] = useFetch(() => `/api/users/${userId.value}`);
 *
 * // 自定义配置
 * const [data, loading, error, { refresh }] = useFetch('/api/users', {
 *   timeout: 5000,
 *   retries: 3,
 *   transform: (data) => data.users,
 *   onError: (error) => console.error('请求失败:', error)
 * });
 *
 * // 自定义命名（React 风格）
 * const [users, isLoading, fetchError, actions] = useFetch('/api/users');
 * ```
 */
export function useFetch<T = unknown>(
  url: string | (() => string) | (() => Promise<T>),
  options: UseFetchOptions<T> = {},
  fetchOptions: RequestInit = {},
): UseFetchReturn<T> {
  const {
    immediate = true,
    timeout = 10000,
    retries = 0,
    retryDelay = 1000,
    transform,
    beforeRequest,
    afterRequest,
    onError,
  } = options;

  // 响应式状态
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<FetchError | null>(null);
  const status = ref<FetchStatus>(FetchStatus.IDLE);

  // 创建只读的数据计算属性
  const readonlyData = computed(() => data.value);

  // 计算属性
  const finished = computed(
    () =>
      status.value === FetchStatus.SUCCESS ||
      status.value === FetchStatus.ERROR,
  );

  // 请求控制
  let abortController: AbortController | null = null;
  let retryCount = 0;

  // 检查是否为Promise函数
  const isPromiseFunction = (): boolean => {
    if (typeof url === "function") {
      try {
        const result = url();
        return result instanceof Promise;
      } catch {
        return false;
      }
    }
    return false;
  };

  // 获取当前 URL
  const getCurrentUrl = (): string => {
    if (typeof url === "function" && !isPromiseFunction()) {
      return url() as string;
    }
    return url as string;
  };

  // 创建错误对象
  const createError = (message: string, response?: Response): FetchError => {
    return {
      message,
      status: response?.status,
      statusText: response?.statusText,
      url: getCurrentUrl(),
    };
  };

  // 延迟函数
  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // 执行请求
  const execute = async (): Promise<void> => {
    // 取消之前的请求
    if (abortController) {
      abortController.abort();
    }

    // 创建新的 AbortController
    abortController = new AbortController();

    // 重置状态
    loading.value = true;
    error.value = null;
    status.value = FetchStatus.LOADING;
    retryCount = 0;

    const performRequest = async (): Promise<void> => {
      try {
        // 检查是否为Promise函数
        if (isPromiseFunction()) {
          // 直接执行Promise函数
          const promiseFunction = url as () => Promise<T>;

          // 设置超时
          const timeoutPromise = new Promise<never>((_, reject) => {
            setTimeout(() => {
              reject(createError("Request timeout"));
            }, timeout);
          });

          const responseData = await Promise.race([
            promiseFunction(),
            timeoutPromise,
          ]);

          // 数据转换
          let finalData: T = responseData;
          if (transform) {
            finalData = transform(responseData);
          }

          // 更新状态
          data.value = finalData;
          status.value = FetchStatus.SUCCESS;
          loading.value = false;
        } else {
          // 原有的HTTP请求逻辑
          const currentUrl = getCurrentUrl();

          // 请求前钩子
          if (beforeRequest) {
            await beforeRequest(currentUrl, fetchOptions);
          }

          // 创建请求配置
          const requestOptions: RequestInit = {
            ...fetchOptions,
            signal: abortController?.signal,
          };

          // 设置超时
          const timeoutId = setTimeout(() => {
            if (abortController) {
              abortController.abort();
            }
          }, timeout);

          try {
            const response = await fetch(currentUrl, requestOptions);
            clearTimeout(timeoutId);

            // 请求后钩子
            if (afterRequest) {
              await afterRequest(response);
            }

            if (!response.ok) {
              throw createError(
                `HTTP Error: ${response.status} ${response.statusText}`,
                response,
              );
            }

            // 解析响应数据
            let responseData: unknown;
            const contentType = response.headers.get("content-type");

            if (contentType?.includes("application/json")) {
              responseData = await response.json();
            } else if (contentType?.includes("text/")) {
              responseData = await response.text();
            } else {
              responseData = await response.blob();
            }

            // 数据转换
            if (transform) {
              responseData = transform(responseData);
            }

            // 更新状态
            data.value = responseData;
            status.value = FetchStatus.SUCCESS;
            loading.value = false;
          } catch (fetchError: unknown) {
            clearTimeout(timeoutId);
            throw fetchError;
          }
        }
      } catch (err: unknown) {
        // 如果是取消请求，不处理错误
        if ((err as Error).name === "AbortError") {
          return;
        }

        const fetchError =
          err instanceof Error
            ? createError(err.message)
            : createError("Unknown error occurred");

        // 重试逻辑
        if (retryCount < retries) {
          retryCount++;
          await delay(retryDelay);
          return performRequest();
        }

        // 更新错误状态
        error.value = fetchError;
        status.value = FetchStatus.ERROR;
        loading.value = false;

        // 错误处理钩子
        if (onError) {
          onError(fetchError);
        }
      }
    };

    await performRequest();
  };

  // 取消请求
  const cancel = (): void => {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
    loading.value = false;
    status.value = FetchStatus.IDLE;
  };

  // 重新请求
  const refresh = async (): Promise<void> => {
    await execute();
  };

  // 如果 URL 是响应式的，监听变化
  if (typeof url === "function") {
    // 这里我们假设 URL 函数中使用的响应式变量会触发重新执行
    // 在实际使用中，用户需要手动调用 refresh 或 execute
  }

  // 立即执行请求
  if (immediate) {
    execute();
  }

  // 组件卸载时取消请求
  onUnmounted(() => {
    cancel();
  });

  return [
    readonlyData,
    loading,
    error,
    {
      status,
      finished,
      execute,
      cancel,
      refresh,
    },
  ];
}

/**
 * 创建一个可复用的 fetch 实例
 * @param baseURL 基础 URL
 * @param defaultOptions 默认配置选项
 * @param defaultFetchOptions 默认 fetch 配置
 * @returns 返回一个预配置的 useFetch 函数
 * @example
 * ```typescript
 * const useApi = createFetch('https://api.example.com', {
 *   timeout: 5000,
 *   onError: (error) => console.error('API Error:', error)
 * });
 *
 * const [data] = useApi('/users');
 * ```
 */
export function createFetch(
  baseURL: string,
  defaultOptions: UseFetchOptions<unknown> = {},
  defaultFetchOptions: RequestInit = {},
) {
  return function <T = unknown>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {},
    fetchOptions: RequestInit = {},
  ): UseFetchReturn<T> {
    const fullUrl =
      typeof url === "function" ? () => baseURL + url() : baseURL + url;

    const mergedOptions = { ...defaultOptions, ...options };
    const mergedFetchOptions = { ...defaultFetchOptions, ...fetchOptions };

    return useFetch(
      fullUrl,
      mergedOptions,
      mergedFetchOptions,
    ) as UseFetchReturn<T>;
  };
}
