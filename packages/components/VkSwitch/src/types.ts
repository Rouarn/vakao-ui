import type { PropType, CSSProperties } from "vue";
import { ExtractPublicPropTypes, ComponentSize } from "../../../types";

// 开关尺寸
export type SwitchSize = ComponentSize;

// 开关值类型
export type SwitchValue = string | number | boolean;

// 开关属性定义
export const switchProps = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Boolean] as PropType<SwitchValue>,
    default: false,
  },
  /** 开关尺寸 */
  size: {
    type: String as PropType<SwitchSize>,
    default: "medium",
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false,
  },
  /** 选中时的值 */
  activeValue: {
    type: [String, Number, Boolean] as PropType<SwitchValue>,
    default: true,
  },
  /** 未选中时的值 */
  inactiveValue: {
    type: [String, Number, Boolean] as PropType<SwitchValue>,
    default: false,
  },
  /** 选中时的文字描述 */
  activeText: {
    type: String,
    default: "",
  },
  /** 未选中时的文字描述 */
  inactiveText: {
    type: String,
    default: "",
  },
  /** 选中时的图标 */
  activeIcon: {
    type: String,
    default: "",
  },
  /** 未选中时的图标 */
  inactiveIcon: {
    type: String,
    default: "",
  },
  /** 是否在按钮内显示图标 */
  inlinePrompt: {
    type: Boolean,
    default: false,
  },
  /** 切换前的钩子函数，返回 false 或 Promise reject 时阻止切换 */
  beforeChange: {
    type: Function as PropType<() => boolean | Promise<boolean>>,
    default: undefined,
  },
  /** 自定义类名 */
  customClass: String,
  /** 自定义样式 */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
} as const;

// 导出属性类型
export type SwitchProps = ExtractPublicPropTypes<typeof switchProps>;

// 开关事件定义
export const switchEmits = {
  "update:modelValue": (_value: SwitchValue) => true,
  change: (_value: SwitchValue) => true,
} as const;
// 导出事件类型
export type SwitchEmits = ExtractPublicPropTypes<typeof switchEmits>;
