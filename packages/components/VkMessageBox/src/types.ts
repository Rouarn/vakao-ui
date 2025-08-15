import type { PropType, CSSProperties } from "vue";
import type { ExtractPublicPropTypes } from "@/types";

// MessageBox 类型
export type MessageBoxType = "success" | "warning" | "error" | "info";

// MessageBox 动作类型
export type MessageBoxAction = "confirm" | "cancel" | "close";

// MessageBox 属性定义
export const messageBoxProps = {
  /** 消息内容 */
  message: {
    type: [String, Object] as PropType<string | any>,
    required: true,
  },
  /** 标题 */
  title: {
    type: String,
    default: "提示",
  },
  /** 类型 */
  type: {
    type: String as PropType<MessageBoxType>,
    default: "info",
  },
  /** 确认按钮文字 */
  confirmText: {
    type: String,
    default: "确定",
  },
  /** 取消按钮文字 */
  cancelText: {
    type: String,
    default: "取消",
  },
  /** 是否显示确认按钮 */
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  /** 是否显示取消按钮 */
  showCancelButton: {
    type: Boolean,
    default: false,
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true,
  },
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  /** 按下 ESC 键是否关闭 */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /** 自定义类名 */
  customClass: {
    type: String,
    default: "",
  },
  /** 自定义样式 */
  customStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: "",
  },
  /** 是否显示输入框 */
  showInput: {
    type: Boolean,
    default: false,
  },
  /** 输入框占位符 */
  inputPlaceholder: {
    type: String,
    default: "",
  },
  /** 输入框初始值 */
  inputValue: {
    type: String,
    default: "",
  },
  /** 输入框验证模式 */
  inputPattern: {
    type: RegExp,
  },
  /** 输入框验证函数 */
  inputValidator: {
    type: Function as PropType<(_value: string) => boolean | string>,
  },
  /** 输入框错误信息 */
  inputErrorMessage: {
    type: String,
    default: "",
  },
  /** 点击确认按钮回调 */
  onAction: {
    type: Function as PropType<(_action: MessageBoxAction, _instance: MessageBoxInstance) => void>,
    default: undefined,
  },
  /** 点击关闭按钮回调 */
  onClose: {
    type: Function as PropType<(_action: MessageBoxAction, _instance: MessageBoxInstance) => void>,
    default: undefined,
  },
  /** 关闭前的回调，返回 false 或 Promise.reject 时阻止关闭 */
  beforeClose: {
    type: Function as PropType<
      (_action: MessageBoxAction, _instance: MessageBoxInstance, _done?: () => void) => boolean | Promise<boolean> | void
    >,
    default: undefined,
  },
} as const;

// MessageBox 属性类型
export type MessageBoxProps = ExtractPublicPropTypes<typeof messageBoxProps>;

// MessageBox 选项
export interface MessageBoxOptions {
  title?: string;
  message?: string | any;
  type?: MessageBoxType;
  iconClass?: string;
  confirmText?: string;
  cancelText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  showClose?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  customClass?: string;
  customStyle?: string | CSSProperties;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  inputPattern?: RegExp;
  inputValidator?: (_value: string) => boolean | string;
  inputErrorMessage?: string;
  beforeClose?: (_action: MessageBoxAction, _instance: MessageBoxInstance, _done?: () => void) => boolean | Promise<boolean> | void;
}

// MessageBox 实例
export interface MessageBoxInstance {
  visible: boolean;
  value?: string;
  close: () => void;
  confirmButtonLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
  inputValue?: string;
  inputErrorMessage?: string;
}

// MessageBox 结果
export interface MessageBoxResult {
  action: MessageBoxAction;
  instance: MessageBoxInstance;
  value?: string;
}

// MessageBox 事件定义
export const messageBoxEmits = {
  action: (_action: MessageBoxAction, _instance: MessageBoxInstance) => true,
} as const;

// 导出事件类型
export type MessageBoxEmits = ExtractPublicPropTypes<typeof messageBoxEmits>;
