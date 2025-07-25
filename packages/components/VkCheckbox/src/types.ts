import type { PropType, CSSProperties } from "vue";
import { ExtractPublicPropTypes, ComponentSize } from "../../../types";

// 复选框尺寸
export type CheckboxSize = ComponentSize;

// 复选框值类型
export type CheckboxValue = string | number | boolean;

// 复选框属性定义
export const checkboxProps = {
  /** 绑定值 */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /** 复选框尺寸 */
  size: {
    type: String as PropType<CheckboxSize>,
    default: "medium",
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 复选框的值 */
  value: {
    type: [String, Number, Boolean] as PropType<CheckboxValue>,
    default: undefined,
  },
  /** 复选框标签 */
  label: {
    type: String,
    default: "",
  },
  /** 是否为不确定状态 */
  indeterminate: {
    type: Boolean,
    default: false,
  },
  /** 是否选中 */
  checked: {
    type: Boolean,
    default: undefined,
  },
  /** 自定义类名 */
  customClass: String,
  /** 自定义样式 */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
} as const;

// 复选框组属性定义
export const checkboxGroupProps = {
  /** 复选框组尺寸 */
  size: {
    type: String as PropType<CheckboxSize>,
    default: "medium",
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 最小选择数量 */
  min: {
    type: Number,
    default: 0,
  },
  /** 最大选择数量 */
  max: {
    type: Number,
    default: Infinity,
  },
  /** 自定义类名 */
  customClass: String,
  /** 自定义样式 */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
} as const;

// 导出属性类型
export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>;
export type CheckboxGroupProps = ExtractPublicPropTypes<
  typeof checkboxGroupProps
>;

// 复选框事件定义
export const checkboxEmits = {
  "update:modelValue": (_value: boolean) => true,
  change: (_value: boolean) => true,
} as const;

export const checkboxGroupEmits = {
  "update:modelValue": (_value: CheckboxValue[]) => true,
  change: (_value: CheckboxValue[]) => true,
} as const;

// 导出事件类型
export type CheckboxEmits = ExtractPublicPropTypes<typeof checkboxEmits>;
export type CheckboxGroupEmits = ExtractPublicPropTypes<
  typeof checkboxGroupEmits
>;
