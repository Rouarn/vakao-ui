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
  target?:
    | Window
    | Document
    | HTMLElement
    | Ref<HTMLElement | null>
    | (() => HTMLElement | null);
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
export type UseKeyPressReturn = [
  ComputedRef<boolean>,
  EnableFunction,
  DisableFunction,
];

/**
 * 标准化按键名称
 */
function normalizeKey(key: string, exactMatch: boolean = false): string {
  if (exactMatch) {
    return key;
  }
  return key.toLowerCase();
}

/**
 * 检查按键是否匹配
 */
function isKeyMatch(
  event: KeyboardEvent,
  targetKeys: string[],
  exactMatch: boolean = false,
): boolean {
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
export function useKeyPress(
  keys: KeyType,
  options: UseKeyPressOptions = {},
): UseKeyPressReturn {
  const {
    target = window,
    preventDefault = false,
    stopPropagation = false,
    exactMatch = false,
    onKeyDown,
    onKeyUp,
  } = options;

  // 标准化按键数组
  const targetKeys = Array.isArray(keys) ? keys : [keys];

  // 按键状态
  const isPressed = ref(false);
  const pressedComputed = computed(() => isPressed.value);

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
      if (isPressed.value) {
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
  const targetRef =
    typeof target === "function" ? target : () => target as EventTarget;

  // 事件监听器
  const [, , ,] = useEventListener(targetRef, "keydown", handleKeyDown);

  const [, , ,] = useEventListener(targetRef, "keyup", handleKeyUp);

  // 启用监听
  const enable: EnableFunction = () => {
    // 事件监听器已自动启用
  };

  // 禁用监听
  const disable: DisableFunction = () => {
    // 重置状态
    isPressed.value = false;
    // 事件监听器已自动禁用
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
