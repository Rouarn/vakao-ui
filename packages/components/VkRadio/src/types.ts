import type { PropType, CSSProperties } from 'vue';
import { ExtractPublicPropTypes, ComponentSize } from '../../../types';

// 单选框尺寸
export type RadioSize = ComponentSize;

// 单选框值类型
export type RadioValue = string | number | boolean;

// 单选框属性定义
export const radioProps = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioValue>,
    default: undefined,
  },
  /** 单选框尺寸 */
  size: {
    type: String as PropType<RadioSize>,
    default: 'medium',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 单选框的值 */
  value: {
    type: [String, Number, Boolean] as PropType<RadioValue>,
    required: true,
  },
  /** 单选框标签 */
  label: {
    type: String,
    default: '',
  },
  /** 自定义类名 */
  customClass: String,
  /** 自定义样式 */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
} as const;

// 单选框组属性定义
export const radioGroupProps = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioValue>,
    default: undefined,
  },
  /** 单选框组尺寸 */
  size: {
    type: String as PropType<RadioSize>,
    default: 'medium',
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 自定义类名 */
  customClass: String,
  /** 自定义样式 */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
} as const;

// 导出属性类型
export type RadioProps = ExtractPublicPropTypes<typeof radioProps>;
export type RadioGroupProps = ExtractPublicPropTypes<typeof radioGroupProps>;

// 单选框事件定义
export const radioEmits = {
  'update:modelValue': (_value: RadioValue) => true,
  change: (_value: RadioValue) => true,
} as const;

export const radioGroupEmits = {
  'update:modelValue': (_value: RadioValue) => true,
  change: (_value: RadioValue) => true,
} as const;

// 导出事件类型
export type RadioEmits = ExtractPublicPropTypes<typeof radioEmits>;
export type RadioGroupEmits = ExtractPublicPropTypes<typeof radioGroupEmits>;
