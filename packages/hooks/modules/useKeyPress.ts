import { ref, computed, type Ref, type ComputedRef } from "vue";
import { useEventListener, type EventTarget } from "./useEventListener";

/**
 * 按键类型
 */
export type KeyType = string | string[];

/**
 * 按键事件回调函数类型
 */
export type KeyPressCallback = (event: KeyboardEvent) => void;

/**
 * 按键检测配置选项
 */
export interface UseKeyPressOptions {
  /** 监听的事件类型 */
  eventType?: "keydown" | "keyup";
  /** 监听目标 */
  target?: Window | Document | HTMLElement | Ref<HTMLElement | null> | (() => HTMLElement | null);
  /** 是否启用监听 */
  enabled?: boolean | Ref<boolean>;
  /** 是否阻止默认行为 */
  preventDefault?: boolean;
  /** 是否阻止事件冒泡 */
  stopPropagation?: boolean;
  /** 是否精确匹配（区分大小写） */
  exactMatch?: boolean;
  /** 按键按下回调 */
  onKeyDown?: KeyPressCallback;
  /** 按键释放回调 */
  onKeyUp?: KeyPressCallback;
}

/**
 * 启用/禁用函数类型
 */
export type EnableFunction = () => void;
export type DisableFunction = () => void;

/**
 * useKeyPress 返回值类型
 */
export type UseKeyPressReturn = [ComputedRef<boolean>, EnableFunction, DisableFunction];

/**
 * 标准化按键名称
 */
function normalizeKey(key: string, exactMatch: boolean = false): string {
  // 确保 key 是字符串类型
  if (typeof key !== "string") {
    return "";
  }

  if (exactMatch) {
    return key;
  }
  return key.toLowerCase();
}

/**
 * 检查按键是否匹配
 */
function isKeyMatch(event: KeyboardEvent, targetKeys: string[], exactMatch: boolean = false): boolean {
  // 确保 event.key 和 event.code 存在且为字符串
  if (!event.key || !event.code || typeof event.key !== "string" || typeof event.code !== "string") {
    return false;
  }

  const eventKey = normalizeKey(event.key, exactMatch);
  const eventCode = normalizeKey(event.code, exactMatch);

  return targetKeys.some((key) => {
    const normalizedKey = normalizeKey(key, exactMatch);
    return eventKey === normalizedKey || eventCode === normalizedKey;
  });
}

/**
 * 键盘按键检测 Hook
 *
 * 用于检测特定按键的按下状态，支持单个按键或按键组合。
 * 提供按键状态监听、事件回调等功能。
 *
 * @param keys - 要监听的按键（字符串或字符串数组）
 * @param options - 配置选项
 * @returns [isPressed, enable, disable] - 按键状态、启用函数、禁用函数
 *
 * @example
 * ```typescript
 * // 监听单个按键
 * const [isEnterPressed] = useKeyPress('Enter');
 * const [isEscPressed] = useKeyPress('Escape');
 *
 * // 监听多个按键
 * const [isArrowPressed] = useKeyPress(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);
 *
 * // 带回调的用法
 * const [isSpacePressed] = useKeyPress('Space', {
 *   onKeyDown: (event) => {
 *     console.log('空格键按下');
 *     event.preventDefault();
 *   },
 *   onKeyUp: () => {
 *     console.log('空格键释放');
 *   }
 * });
 *
 * // 监听组合键（需要自定义逻辑）
 * const [isCtrlPressed] = useKeyPress('Control');
 * const [isCPressed] = useKeyPress('c');
 * const isCtrlC = computed(() => isCtrlPressed.value && isCPressed.value);
 *
 * // 动态启用/禁用
 * const [isPressed, enable, disable] = useKeyPress('Enter', {
 *   enabled: false
 * });
 *
 * // 在特定元素上监听
 * const inputRef = ref<HTMLInputElement>();
 * const [isTabPressed] = useKeyPress('Tab', {
 *   target: inputRef,
 *   preventDefault: true
 * });
 *
 * // 精确匹配（区分大小写）
 * const [isUpperAPressed] = useKeyPress('A', {
 *   exactMatch: true
 * });
 * ```
 *
 * @since 0.0.2
 * @author Vakao UI Team
 */
export function useKeyPress(keys: KeyType, options: UseKeyPressOptions = {}): UseKeyPressReturn {
  const {
    target = typeof window !== "undefined" ? window : undefined,
    preventDefault = false,
    stopPropagation = false,
    exactMatch = false,
    enabled = true,
    eventType = "keydown",
    onKeyDown,
    onKeyUp,
  } = options;

  // 标准化按键数组，确保所有元素都是字符串
  const targetKeys = (Array.isArray(keys) ? keys : [keys]).filter((key): key is string => typeof key === "string" && key.length > 0);

  // 按键状态
  const isPressed = ref(false);
  const pressedComputed = computed(() => isPressed.value);

  // 处理 enabled 的响应式
  const enabledRef = typeof enabled === "boolean" ? ref(enabled) : enabled;

  // 按键按下处理
  const handleKeyDown = (event: KeyboardEvent) => {
    if (isKeyMatch(event, targetKeys, exactMatch)) {
      if (!isPressed.value) {
        isPressed.value = true;
        onKeyDown?.(event);
      }

      if (preventDefault) {
        event.preventDefault();
      }
      if (stopPropagation) {
        event.stopPropagation();
      }
    }
  };

  // 按键释放处理
  const handleKeyUp = (event: KeyboardEvent) => {
    if (isKeyMatch(event, targetKeys, exactMatch)) {
      if (eventType === "keyup") {
        // 对于只监听keyup的情况，在keyup时短暂设置为true表示"释放"事件发生
        isPressed.value = true;
        onKeyUp?.(event);
        // 短暂延迟后重置为false
        setTimeout(() => {
          isPressed.value = false;
        }, 100);
      } else if (isPressed.value) {
        isPressed.value = false;
        onKeyUp?.(event);
      }

      if (preventDefault) {
        event.preventDefault();
      }
      if (stopPropagation) {
        event.stopPropagation();
      }
    }
  };

  // 转换 target 类型
  const targetRef = typeof target === "function" ? target : () => target as EventTarget;

  // 根据 eventType 决定监听的事件
  let setKeyDownEnabled: (enabled: boolean) => void;
  let setKeyUpEnabled: (enabled: boolean) => void;

  if (eventType === "keydown" || eventType === undefined) {
    // 监听 keydown 和 keyup 事件（默认行为）
    const [, , setDownEnabled] = useEventListener(targetRef, "keydown", handleKeyDown, { immediate: enabledRef.value });

    const [, , setUpEnabled] = useEventListener(targetRef, "keyup", handleKeyUp, { immediate: enabledRef.value });

    setKeyDownEnabled = setDownEnabled;
    setKeyUpEnabled = setUpEnabled;
  } else {
    // 只监听 keyup 事件，keydown时不改变状态，只在keyup时短暂变为true
    const handleKeyDownForKeyUp = (event: KeyboardEvent) => {
      // keydown时不改变isPressed状态，保持false表示"等待释放"
      if (isKeyMatch(event, targetKeys, exactMatch)) {
        onKeyDown?.(event);
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
      }
    };

    const [, , setDownEnabled] = useEventListener(targetRef, "keydown", handleKeyDownForKeyUp, { immediate: enabledRef.value });
    const [, , setUpEnabled] = useEventListener(targetRef, "keyup", handleKeyUp, { immediate: enabledRef.value });

    setKeyDownEnabled = setDownEnabled;
    setKeyUpEnabled = setUpEnabled;
  }

  // 启用监听
  const enable: EnableFunction = () => {
    enabledRef.value = true;
    setKeyDownEnabled(true);
    setKeyUpEnabled(true);
  };

  // 禁用监听
  const disable: DisableFunction = () => {
    // 重置状态
    isPressed.value = false;
    enabledRef.value = false;
    // 禁用事件监听器
    setKeyDownEnabled(false);
    setKeyUpEnabled(false);
  };

  return [pressedComputed, enable, disable];
}

/**
 * 预定义的常用按键常量
 */
export const Keys = {
  // 字母键
  A: "KeyA",
  B: "KeyB",
  C: "KeyC",
  D: "KeyD",
  E: "KeyE",
  F: "KeyF",
  G: "KeyG",
  H: "KeyH",
  I: "KeyI",
  J: "KeyJ",
  K: "KeyK",
  L: "KeyL",
  M: "KeyM",
  N: "KeyN",
  O: "KeyO",
  P: "KeyP",
  Q: "KeyQ",
  R: "KeyR",
  S: "KeyS",
  T: "KeyT",
  U: "KeyU",
  V: "KeyV",
  W: "KeyW",
  X: "KeyX",
  Y: "KeyY",
  Z: "KeyZ",

  // 数字键
  Digit0: "Digit0",
  Digit1: "Digit1",
  Digit2: "Digit2",
  Digit3: "Digit3",
  Digit4: "Digit4",
  Digit5: "Digit5",
  Digit6: "Digit6",
  Digit7: "Digit7",
  Digit8: "Digit8",
  Digit9: "Digit9",

  // 功能键
  F1: "F1",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  F10: "F10",
  F11: "F11",
  F12: "F12",

  // 方向键
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",

  // 修饰键
  Control: "Control",
  Shift: "Shift",
  Alt: "Alt",
  Meta: "Meta",

  // 特殊键
  Enter: "Enter",
  Escape: "Escape",
  Space: "Space",
  Tab: "Tab",
  Backspace: "Backspace",
  Delete: "Delete",
  Home: "Home",
  End: "End",
  PageUp: "PageUp",
  PageDown: "PageDown",
  Insert: "Insert",
} as const;

/**
 * 默认导出
 */
export default useKeyPress;
