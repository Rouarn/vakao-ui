import { ref, computed, onMounted, type Ref, type ComputedRef } from "vue";
import { useEventListener } from "./useEventListener";

/**
 * 全屏操作配置选项
 */
export interface UseFullscreenOptions {
  /** 进入全屏回调 */
  onEnter?: () => void;
  /** 退出全屏回调 */
  onExit?: () => void;
  /** 全屏状态变化回调 */
  onChange?: (isFullscreen: boolean) => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
}

/**
 * 进入全屏函数类型
 */
export type EnterFullscreenFunction = () => Promise<void>;

/**
 * 退出全屏函数类型
 */
export type ExitFullscreenFunction = () => Promise<void>;

/**
 * 切换全屏函数类型
 */
export type ToggleFullscreenFunction = () => Promise<void>;

/**
 * useFullscreen 返回值类型
 */
export type UseFullscreenReturn = [
  ComputedRef<boolean>,
  EnterFullscreenFunction,
  ExitFullscreenFunction,
  ToggleFullscreenFunction,
  ComputedRef<boolean>,
];

/**
 * 获取全屏元素
 */
function getFullscreenElement(): Element | null {
  if (typeof document === "undefined") {
    return null;
  }
  return (
    document.fullscreenElement ||
    (
      document as Document & {
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
      }
    ).webkitFullscreenElement ||
    (
      document as Document & {
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
      }
    ).mozFullScreenElement ||
    (
      document as Document & {
        webkitFullscreenElement?: Element;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
      }
    ).msFullscreenElement ||
    null
  );
}

/**
 * 请求全屏
 */
function requestFullscreen(element: HTMLElement): Promise<void> {
  const extendedElement = element as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  };

  if (element.requestFullscreen) {
    return element.requestFullscreen();
  } else if (extendedElement.webkitRequestFullscreen) {
    return extendedElement.webkitRequestFullscreen();
  } else if (extendedElement.mozRequestFullScreen) {
    return extendedElement.mozRequestFullScreen();
  } else if (extendedElement.msRequestFullscreen) {
    return extendedElement.msRequestFullscreen();
  }
  return Promise.reject(new Error("全屏 API 不被支持"));
}

/**
 * 退出全屏
 */
function exitFullscreen(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("document 对象不可用"));
  }

  const extendedDocument = document as Document & {
    webkitExitFullscreen?: () => Promise<void>;
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  };

  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if (extendedDocument.webkitExitFullscreen) {
    return extendedDocument.webkitExitFullscreen();
  } else if (extendedDocument.mozCancelFullScreen) {
    return extendedDocument.mozCancelFullScreen();
  } else if (extendedDocument.msExitFullscreen) {
    return extendedDocument.msExitFullscreen();
  }
  return Promise.reject(new Error("退出全屏 API 不被支持"));
}

/**
 * 检查是否支持全屏 API
 */
function isFullscreenSupported(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const extendedDocument = document as Document & {
    webkitFullscreenEnabled?: boolean;
    mozFullScreenEnabled?: boolean;
    msFullscreenEnabled?: boolean;
  };

  return !!(
    document.fullscreenEnabled ||
    extendedDocument.webkitFullscreenEnabled ||
    extendedDocument.mozFullScreenEnabled ||
    extendedDocument.msFullscreenEnabled
  );
}

/**
 * 全屏操作管理 Hook
 *
 * 提供全屏状态管理和操作功能，支持进入、退出、切换全屏模式。
 * 自动处理浏览器兼容性和事件监听。
 *
 * @param target - 目标元素（默认为 document.documentElement）
 * @param options - 配置选项
 * @returns [isFullscreen, enter, exit, toggle, isSupported] - 全屏状态、进入函数、退出函数、切换函数、是否支持
 *
 * @example
 * ```typescript
 * // 基础用法
 * const [isFullscreen, enter, exit, toggle] = useFullscreen();
 *
 * // 进入全屏
 * const handleEnterFullscreen = async () => {
 *   try {
 *     await enter();
 *     console.log('已进入全屏');
 *   } catch (error) {
 *     console.error('进入全屏失败:', error);
 *   }
 * };
 *
 * // 退出全屏
 * const handleExitFullscreen = async () => {
 *   try {
 *     await exit();
 *     console.log('已退出全屏');
 *   } catch (error) {
 *     console.error('退出全屏失败:', error);
 *   }
 * };
 *
 * // 切换全屏
 * const handleToggleFullscreen = async () => {
 *   await toggle();
 * };
 *
 * // 针对特定元素
 * const videoRef = ref<HTMLVideoElement>();
 * const [isVideoFullscreen, enterVideo, exitVideo] = useFullscreen(videoRef);
 *
 * // 带回调的用法
 * const [isFullscreen, enter, exit, toggle, isSupported] = useFullscreen(undefined, {
 *   onEnter: () => {
 *     console.log('进入全屏模式');
 *   },
 *   onExit: () => {
 *     console.log('退出全屏模式');
 *   },
 *   onChange: (fullscreen) => {
 *     console.log('全屏状态变化:', fullscreen);
 *   },
 *   onError: (error) => {
 *     console.error('全屏操作错误:', error);
 *   }
 * });
 *
 * // 检查支持情况
 * if (isSupported.value) {
 *   console.log('浏览器支持全屏 API');
 * }
 *
 * // 在模板中使用
 * // <button @click="toggle" :disabled="!isSupported">
 * //   {{ isFullscreen ? '退出全屏' : '进入全屏' }}
 * // </button>
 * ```
 *
 * @since 0.0.2
 * @author Vakao UI Team
 */
export function useFullscreen(target?: Ref<HTMLElement | null> | HTMLElement, options: UseFullscreenOptions = {}): UseFullscreenReturn {
  const { onEnter, onExit, onChange, onError } = options;

  // 状态管理
  const isFullscreen = ref(false);
  const isFullscreenComputed = computed(() => isFullscreen.value);
  const isSupported = computed(() => isFullscreenSupported());

  // 获取目标元素
  const getTargetElement = (): HTMLElement => {
    if (!target) {
      return document.documentElement;
    }

    if ("value" in target) {
      return target.value || document.documentElement;
    }

    return target;
  };

  // 更新全屏状态
  const updateFullscreenState = () => {
    const fullscreenElement = getFullscreenElement();
    const targetElement = getTargetElement();
    const newIsFullscreen = fullscreenElement === targetElement;

    if (isFullscreen.value !== newIsFullscreen) {
      isFullscreen.value = newIsFullscreen;
      onChange?.(newIsFullscreen);

      if (newIsFullscreen) {
        onEnter?.();
      } else {
        onExit?.();
      }
    }
  };

  // 监听全屏状态变化事件
  const [, ,] = useEventListener(() => document, "fullscreenchange", updateFullscreenState);

  // 兼容性事件监听
  const [, ,] = useEventListener(() => document, "webkitfullscreenchange", updateFullscreenState);

  const [, ,] = useEventListener(() => document, "mozfullscreenchange", updateFullscreenState);

  const [, ,] = useEventListener(() => document, "MSFullscreenChange", updateFullscreenState);

  /**
   * 进入全屏
   */
  const enter: EnterFullscreenFunction = async () => {
    try {
      if (!isSupported.value) {
        throw new Error("浏览器不支持全屏 API");
      }

      const targetElement = getTargetElement();
      await requestFullscreen(targetElement);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
      throw err;
    }
  };

  /**
   * 退出全屏
   */
  const exit: ExitFullscreenFunction = async () => {
    try {
      if (!isSupported.value) {
        throw new Error("浏览器不支持全屏 API");
      }

      if (getFullscreenElement()) {
        await exitFullscreen();
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
      throw err;
    }
  };

  /**
   * 切换全屏状态
   */
  const toggle: ToggleFullscreenFunction = async () => {
    if (isFullscreen.value) {
      await exit();
    } else {
      await enter();
    }
  };

  // 初始化状态
  onMounted(() => {
    updateFullscreenState();
  });

  return [isFullscreenComputed, toggle, enter, exit, isSupported];
}

/**
 * 默认导出
 */
export default useFullscreen;
