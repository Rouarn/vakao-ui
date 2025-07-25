import type { PropType, CSSProperties } from "vue";
import { ExtractPublicPropTypes, ComponentSize } from "../../../types";

// 输入框类型
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url";

// 输入框尺寸
export type InputSize = ComponentSize;

// 输入框属性定义
export const inputProps = {
  /** 输入框类型 */
  type: {
    type: String as PropType<InputType>,
    default: "text",
  },
  /** 输入框尺寸 */
  size: {
    type: String as PropType<InputSize>,
    default: "medium",
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: "请输入...",
  },
  /** 最大输入长度 */
  maxlength: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  /** 是否显示清除按钮 */
  clearable: {
    type: Boolean,
    default: false,
  },
  /** 是否显示密码切换按钮 */
  showPassword: {
    type: Boolean,
    default: false,
  },
  /** 前缀图标 */
  prefixIcon: {
    type: String,
    default: "",
  },
  /** 后缀图标 */
  suffixIcon: {
    type: String,
    default: "",
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false,
  },
  /** 自定义类名 */
  customClass: String,
  /** 自定义样式 */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
  /** 是否自动获取焦点 */
  autofocus: Boolean,
} as const;

// 导出属性类型
export type InputProps = ExtractPublicPropTypes<typeof inputProps>;

// 输入框事件定义
export const inputEmits = {
  "update:modelValue": (_value: string) => null,
  input: (_value: string) => null,
  change: (_value: string) => null,
  focus: (_evt: FocusEvent) => null,
  blur: (_evt: FocusEvent) => null,
  clear: () => null,
  keydown: (_evt: KeyboardEvent) => null,
} as const;

// 导出事件类型
export type InputEmits = ExtractPublicPropTypes<typeof inputEmits>;
