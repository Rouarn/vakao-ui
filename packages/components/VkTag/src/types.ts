import type { ExtractPropTypes, PropType } from "vue";
import type { ComponentType, ComponentSize } from "../../../types";

/**
 * 标签尺寸类型
 * 继承自全局组件尺寸定义
 */
export type TagSize = ComponentSize;

/**
 * 标签主题类型
 * 继承自全局组件类型定义
 */
export type TagType = ComponentType;

/**
 * 标签效果类型
 * 定义标签的视觉效果模式
 */
export type TagEffect = "dark" | "light" | "plain";

/**
 * 标签组件属性定义
 * 基于 Vue 3 PropType 的完整类型安全属性配置
 */
export const tagProps = {
  /**
   * 标签类型
   *
   * 控制标签的主题颜色：
   * - default: 默认样式
   * - primary: 主要样式
   * - success: 成功样式
   * - warning: 警告样式
   * - danger: 危险样式
   * - info: 信息样式
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
   * 设置为 true 时显示关闭按钮，点击可触发 close 事件
   *
   * @default false
   */
  closable: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否禁用过渡动画
   *
   * 设置为 true 时禁用标签的淡入淡出动画效果
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
   * 控制标签的大小：tiny < small < medium < large
   *
   * @default 'medium'
   */
  size: {
    type: String as PropType<TagSize>,
    default: "medium",
  },

  /**
   * 标签效果
   *
   * 控制标签的视觉效果：
   * - light: 浅色效果，淡化背景色
   * - dark: 深色效果，使用主色作为背景
   * - plain: 朴素效果，透明背景带边框
   *
   * @default 'light'
   */
  effect: {
    type: String as PropType<TagEffect>,
    default: "light",
  },

  /**
   * 是否圆角
   *
   * 设置为 true 时标签显示为圆角样式
   *
   * @default false
   */
  round: {
    type: Boolean,
    default: false,
  },

  /**
   * 自定义颜色
   *
   * 自定义标签颜色，支持 hex、rgb、rgba 等格式
   * 设置后会覆盖 type 属性的预设颜色
   *
   * @default ''
   */
  color: {
    type: String,
    default: "",
  },

  /**
   * 是否显示边框
   *
   * 设置为 true 时标签显示边框样式
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
   * 设置为 true 时标签可点击，点击时触发 click 事件
   * 同时会添加鼠标悬停效果
   *
   * @default false
   */
  clickable: {
    type: Boolean,
    default: false,
  },
} as const;

/**
 * 标签组件事件定义
 * 定义组件可触发的所有事件及其参数类型
 */
export const tagEmits = {
  /**
   * 关闭事件
   *
   * 当用户点击关闭按钮时触发
   * 需要 closable 属性为 true
   *
   * @param evt 鼠标事件对象
   */
  close: (evt: MouseEvent) => evt instanceof MouseEvent,

  /**
   * 点击事件
   *
   * 当用户点击标签时触发
   * 需要 clickable 属性为 true
   *
   * @param evt 鼠标事件对象
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

// ==================== 类型导出 ====================

/**
 * 标签组件属性类型
 * 从 tagProps 中提取的完整属性类型定义
 */
export type TagProps = ExtractPropTypes<typeof tagProps>;

/**
 * 标签组件事件类型
 * 组件可触发的事件类型定义
 */
export type TagEmits = typeof tagEmits;

/**
 * 标签组件实例类型
 * 用于模板引用和组件实例操作
 */
export interface TagInstance {
  /** 组件属性 */
  $props: TagProps;
  /** 组件事件 */
  $emit: TagEmits;
}
