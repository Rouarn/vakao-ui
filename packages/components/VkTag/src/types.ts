import type { ExtractPropTypes, PropType } from "vue";

/**
 * 标签尺寸
 *
 * @description 定义标签的尺寸大小
 */
export type TagSize = "large" | "default" | "small";

/**
 * 标签类型
 *
 * @description 定义标签的类型，影响外观样式
 */
export type TagType = "primary" | "success" | "warning" | "danger" | "info";

/**
 * 标签组件属性
 *
 * @description 定义标签组件的所有可配置属性
 */
export const tagProps = {
  /**
   * 标签类型
   *
   * 控制标签的主题颜色和样式
   *
   * @default ''
   */
  type: {
    type: String as PropType<TagType>,
    default: "",
  },

  /**
   * 是否可关闭
   *
   * 设置标签是否可以被关闭/删除
   *
   * @default false
   */
  closable: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否禁用渐变动画
   *
   * 控制标签出现和消失时是否有渐变动画效果
   *
   * @default false
   */
  disableTransitions: {
    type: Boolean,
    default: false,
  },

  /**
   * 标签尺寸
   *
   * 控制标签的大小
   *
   * @default 'default'
   */
  size: {
    type: String as PropType<TagSize>,
    default: "default",
  },

  /**
   * 标签主题
   *
   * 控制标签的主题样式，dark为深色背景，light为浅色背景，plain为朴素风格
   *
   * @default 'light'
   */
  effect: {
    type: String as PropType<"dark" | "light" | "plain">,
    default: "light",
  },

  /**
   * 是否圆角
   *
   * 控制标签是否为圆角样式
   *
   * @default false
   */
  round: {
    type: Boolean,
    default: false,
  },

  /**
   * 背景颜色
   *
   * 自定义标签的背景颜色
   */
  color: {
    type: String,
    default: "",
  },

  /**
   * 是否为边框标签
   *
   * 设置标签是否显示为边框样式
   *
   * @default false
   */
  bordered: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否可点击
   *
   * 设置标签是否可以被点击
   *
   * @default false
   */
  clickable: {
    type: Boolean,
    default: false,
  },
} as const;

/**
 * 标签组件事件
 */
export const tagEmits = {
  /**
   * 关闭事件
   *
   * 点击关闭按钮时触发
   */
  close: (evt: MouseEvent) => evt instanceof MouseEvent,

  /**
   * 点击事件
   *
   * 点击标签时触发
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

/**
 * 标签组件属性类型
 */
export type TagProps = ExtractPropTypes<typeof tagProps>;

/**
 * 标签组件事件类型
 */
export type TagEmits = typeof tagEmits;
