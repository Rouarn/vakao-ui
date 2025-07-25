import type { ExtractPropTypes, PropType } from "vue";

// 选择器尺寸
export type SelectSize = "small" | "medium" | "large";

// 选择器值类型
export type SelectValue = string | number;

// 选项接口
export interface SelectOption {
  value: SelectValue;
  label: string;
  disabled?: boolean;
}

// 过滤方法类型
export type FilterMethod = (query: string, option: SelectOption) => boolean;

// 远程搜索方法类型
export type RemoteMethod = (query: string) => void;

// Select 组件 props
export const selectProps = {
  // 基础属性
  modelValue: {
    type: [String, Number, Array] as PropType<SelectValue | SelectValue[]>,
    default: undefined,
  },
  size: {
    type: String as PropType<SelectSize>,
    default: "medium",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "请选择",
  },

  // 功能选项
  clearable: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },

  // 文本配置
  loadingText: {
    type: String,
    default: "加载中...",
  },
  noDataText: {
    type: String,
    default: "无数据",
  },
  noMatchText: {
    type: String,
    default: "无匹配数据",
  },

  // 样式配置
  customClass: {
    type: String,
    default: "",
  },
  customStyle: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: "",
  },
} as const;

// Select 组件 emits
export const selectEmits = {
  "update:modelValue": (_value: SelectValue | SelectValue[]) => true,
  change: (_value: SelectValue | SelectValue[]) => true,
  clear: () => true,
  focus: (_event: FocusEvent) => true,
  blur: (_event: FocusEvent) => true,
  "visible-change": (_visible: boolean) => true,
  "remove-tag": (_value: SelectValue) => true,
} as const;

// Option 组件 props
export const optionProps = {
  value: {
    type: [String, Number, Boolean, Object] as PropType<SelectValue>,
    required: true,
  },
  label: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

// Option 组件 emits
export const optionEmits = {
  click: (_value: SelectValue) => true,
} as const;

// OptionGroup 组件 props
export const optionGroupProps = {
  label: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

// OptionGroup 组件 emits
export const optionGroupEmits = {} as const;

// 类型导出
export type SelectProps = ExtractPropTypes<typeof selectProps>;
export type SelectEmits = ExtractPropTypes<typeof selectEmits>;
export type OptionProps = ExtractPropTypes<typeof optionProps>;
export type OptionEmits = ExtractPropTypes<typeof optionEmits>;
export type OptionGroupProps = ExtractPropTypes<typeof optionGroupProps>;
export type OptionGroupEmits = ExtractPropTypes<typeof optionGroupEmits>;
