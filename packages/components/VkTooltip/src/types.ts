import type { ExtractPropTypes, PropType } from "vue";

/**
 * 提示工具组件属性接口定义
 *
 * 定义了提示工具组件所有可接受的属性及其类型约束。
 * 遵循 Vue 3 组件属性设计规范。
 *
 * @interface TooltipProps
 */
export const tooltipProps = {
  /**
   * 提示内容
   *
   * 显示在提示框中的文本内容。
   *
   * @default ''
   * @example
   * ```vue
   * <VkTooltip content="这是一个提示">悬停此处</VkTooltip>
   * ```
   */
  content: {
    type: String,
    default: "",
  },

  /**
   * 提示框位置
   *
   * 控制提示框相对于触发元素的显示位置。
   *
   * @default 'top'
   * @example
   * ```vue
   * <VkTooltip placement="bottom">底部提示</VkTooltip>
   * ```
   */
  placement: {
    type: String as PropType<"top" | "right" | "bottom" | "left">,
    default: "top",
  },

  /**
   * 是否禁用提示
   *
   * 设置为 true 时，不会显示提示框。
   *
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 触发方式
   *
   * 控制提示框的触发方式。
   * - hover: 鼠标悬停时显示
   * - click: 点击时显示
   * - focus: 获得焦点时显示
   *
   * @default 'hover'
   */
  trigger: {
    type: String as PropType<"hover" | "click" | "focus">,
    default: "hover",
  },

  /**
   * 显示延迟
   *
   * 鼠标悬停后，延迟多少毫秒显示提示框。
   *
   * @default 0
   */
  showDelay: {
    type: Number,
    default: 0,
  },

  /**
   * 隐藏延迟
   *
   * 鼠标移出后，延迟多少毫秒隐藏提示框。
   *
   * @default 200
   */
  hideDelay: {
    type: Number,
    default: 200,
  },

  /**
   * 提示框主题
   *
   * 控制提示框的颜色主题。
   *
   * @default 'dark'
   */
  theme: {
    type: String as PropType<"dark" | "light">,
    default: "dark",
  },

  /**
   * 自定义类名
   *
   * 添加到提示框容器的自定义 CSS 类名。
   */
  customClass: {
    type: String,
    default: "",
  },

  /**
   * 自定义样式
   *
   * 应用于提示框容器的内联样式。
   */
  customStyle: {
    type: String,
    default: "",
  },

  /**
   * 是否显示箭头
   *
   * 设置为 false 时，不显示提示框的指向箭头。
   *
   * @default true
   */
  showArrow: {
    type: Boolean,
    default: true,
  },

  /**
   * 偏移量
   *
   * 提示框距离触发元素的偏移量（单位：像素）。
   *
   * @default 8
   */
  offset: {
    type: Number,
    default: 8,
  },

  /**
   * 是否可用于纯文本内容
   *
   * 设置为 true 时，将使用 span 而不是 div 作为容器，
   * 适用于在行内文本中使用提示框。
   *
   * @default false
   */
  inline: {
    type: Boolean,
    default: false,
  },
} as const;

/**
 * 提示工具组件事件定义
 */
export const tooltipEmits = {
  /**
   * 提示框显示时触发
   */
  show: () => true,

  /**
   * 提示框隐藏时触发
   */
  hide: () => true,

  /**
   * 点击提示框内容时触发
   *
   * @param event - 鼠标事件对象
   */
  click: (event: MouseEvent) => event instanceof MouseEvent,
} as const;

/**
 * 提示工具组件属性类型
 */
export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;

/**
 * 提示工具组件事件类型
 */
export type TooltipEmits = typeof tooltipEmits;
