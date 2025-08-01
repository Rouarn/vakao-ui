import { ref, computed, type ComputedRef } from "vue";

/**
 * 剪贴板操作配置选项
 */
export interface UseClipboardOptions {
  /** 是否启用旧版 API 作为后备方案 */
  legacy?: boolean;
  /** 复制成功回调 */
  onCopy?: (text: string) => void;
  /** 复制失败回调 */
  onError?: (error: Error) => void;
  /** 读取成功回调 */
  onRead?: (text: string) => void;
  /** 读取失败回调 */
  onReadError?: (error: Error) => void;
}

/**
 * 复制函数类型
 */
export type CopyFunction = (text: string) => Promise<boolean>;

/**
 * 读取函数类型
 */
export type ReadFunction = () => Promise<string>;

/**
 * useClipboard 返回值类型
 */
export type UseClipboardReturn = [
  ComputedRef<string>,
  CopyFunction,
  ReadFunction,
  ComputedRef<boolean>,
  ComputedRef<boolean>,
];

/**
 * 检查是否支持现代剪贴板 API
 */
function isClipboardApiSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "clipboard" in navigator &&
    typeof navigator.clipboard.writeText === "function"
  );
}

/**
 * 使用旧版 API 复制文本
 */
function legacyCopy(text: string): boolean {
  try {
    // 创建临时文本区域
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    // 选择并复制
    textArea.focus();
    textArea.select();
    const result = document.execCommand("copy");

    // 清理
    document.body.removeChild(textArea);

    return result;
  } catch {
    return false;
  }
}

/**
 * 剪贴板操作 Hook
 *
 * 提供剪贴板读取和写入功能，支持现代 Clipboard API 和旧版后备方案。
 * 自动处理权限请求和错误处理。
 *
 * @param options - 配置选项
 * @returns [text, copy, read, isSupported, isSecureContext] - 文本内容、复制函数、读取函数、是否支持、是否安全上下文
 *
 * @example
 * ```typescript
 * // 基础用法
 * const [text, copy, read, isSupported] = useClipboard();
 *
 * // 复制文本
 * const handleCopy = async () => {
 *   const success = await copy('Hello, World!');
 *   if (success) {
 *     console.log('复制成功');
 *   }
 * };
 *
 * // 读取剪贴板
 * const handleRead = async () => {
 *   try {
 *     const clipboardText = await read();
 *     console.log('剪贴板内容:', clipboardText);
 *   } catch (error) {
 *     console.error('读取失败:', error);
 *   }
 * };
 *
 * // 带回调的用法
 * const [, copyWithCallback] = useClipboard({
 *   onCopy: (text) => {
 *     console.log('已复制:', text);
 *     // 显示成功提示
 *   },
 *   onError: (error) => {
 *     console.error('复制失败:', error);
 *     // 显示错误提示
 *   }
 * });
 *
 * // 在组件中使用
 * const copyToClipboard = async (content: string) => {
 *   if (!isSupported.value) {
 *     alert('浏览器不支持剪贴板操作');
 *     return;
 *   }
 *
 *   const success = await copy(content);
 *   if (success) {
 *     // 显示成功消息
 *   }
 * };
 *
 * // 检查支持情况
 * if (isSupported.value) {
 *   console.log('支持剪贴板操作');
 * }
 * ```
 *
 * @since 0.0.2
 * @author Vakao UI Team
 */
export function useClipboard(
  options: UseClipboardOptions = {},
): UseClipboardReturn {
  const { legacy = true, onCopy, onError, onRead, onReadError } = options;

  // 状态管理
  const text = ref("");
  const textComputed = computed(() => text.value);

  // 支持检测
  const isSupported = computed(() => {
    return (
      isClipboardApiSupported() ||
      (legacy && typeof document !== "undefined" && document.queryCommandSupported?.("copy"))
    );
  });

  const isSecureContext = computed(() => {
    return typeof window !== "undefined" && window.isSecureContext;
  });

  /**
   * 复制文本到剪贴板
   */
  const copy: CopyFunction = async (textToCopy: string) => {
    try {
      // 优先使用现代 API
      if (isClipboardApiSupported()) {
        await navigator.clipboard.writeText(textToCopy);
        text.value = textToCopy;
        onCopy?.(textToCopy);
        return true;
      }

      // 后备方案：使用旧版 API
      if (legacy) {
        const success = legacyCopy(textToCopy);
        if (success) {
          text.value = textToCopy;
          onCopy?.(textToCopy);
          return true;
        }
      }

      throw new Error("剪贴板操作不被支持");
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
      return false;
    }
  };

  /**
   * 从剪贴板读取文本
   */
  const read: ReadFunction = async () => {
    try {
      if (!isClipboardApiSupported()) {
        throw new Error("剪贴板读取 API 不被支持");
      }

      const clipboardText = await navigator.clipboard.readText();
      text.value = clipboardText;
      onRead?.(clipboardText);
      return clipboardText;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onReadError?.(err);
      throw err;
    }
  };

  return [textComputed, copy, read, isSupported, isSecureContext];
}

/**
 * 默认导出
 */
export default useClipboard;
