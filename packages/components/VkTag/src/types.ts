/**
 * VkTag 标签组件类型定义
 *
 * 定义了标签组件的所有属性、事件和类型，提供完整的 TypeScript 支持。
 * 标签组件用于标记和分类，支持多种样式变体、尺寸配置、状态控制等功能。
 */

import type { PropType, CSSProperties } from "vue";
import type { ExtractPublicPropTypes, ComponentType, ComponentSize } from "@/types";

/**
 * 标签类型
 *
 * 继承全局组件类型，支持不同的视觉样式：
 * - default: 默认样式
 * - primary: 主要标签
 * - success: 成功标签
 * - warning: 警告标签
 * - danger: 危险标签
 * - info: 信息标签
 */
export type TagType = ComponentType;

/**
 * 标签尺寸
 *
 * 继承全局组件尺寸，支持四种大小：
 * - tiny: 超小尺寸
 * - small: 小尺寸
 * - medium: 中等尺寸（默认）
 * - large: 大尺寸
 */
export type TagSize = ComponentSize;

/**
 * 标签主题
 *
 * 定义标签的视觉主题：
 * - light: 浅色主题（默认）
 * - dark: 深色主题
 * - plain: 朴素主题
 */
export type TagTheme = "light" | "dark" | "plain";

/**
 * 标签组件属性定义
 *
 * 定义了标签组件的所有可配置属性，包括样式、状态、行为等。
 * 所有属性都提供了合理的默认值和完整的类型约束。
 *
 * @example
 * ```vue
 * <VkTag
 *   type="primary"
 *   size="large"
 *   theme="dark"
 *   closable
 *   @close="handleClose"
 * >
 *   标签内容
 * </VkTag>
 * ```
 */
export const tagProps = {
  /**
   * 标签类型，决定标签的视觉样式和语义
   * @default 'default'
   */
  type: {
    type: String as PropType<TagType>,
    default: "default",
  },
  /**
   * 标签尺寸，影响标签的高度和内边距
   * @default 'medium'
   */
  size: {
    type: String as PropType<TagSize>,
    default: "medium",
  },
  /**
   * 标签主题，影响标签的整体视觉风格
   * @default 'light'
   */
  theme: {
    type: String as PropType<TagTheme>,
    default: "light",
  },
  /**
   * 是否可关闭，显示关闭按钮
   * @default false
   */
  closable: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用标签，禁用后不可点击且样式变灰
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为圆角标签，边框圆角更大
   * @default false
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示边框
   * @default true
   */
  bordered: {
    type: Boolean,
    default: true,
  },
  /**
   * 自定义背景色
   * 设置标签的背景颜色，优先级高于 type
   */
  color: {
    type: String,
    default: "",
  },
  /**
   * 自定义文字颜色
   * 设置标签的文字颜色
   */
  textColor: {
    type: String,
    default: "",
  },
  /**
   * 自定义 CSS 类名，会与组件默认类名合并
   */
  customClass: String,
  /**
   * 自定义样式，支持字符串或对象格式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
} as const;

/**
 * 标签组件属性类型
 *
 * 从 tagProps 中提取的公共属性类型，用于组件的 TypeScript 类型检查。
 * 包含所有可配置的标签属性及其类型约束。
 */
export type TagProps = ExtractPublicPropTypes<typeof tagProps>;

/**
 * 标签组件事件定义
 *
 * 定义了标签组件支持的所有事件及其参数类型。
 * 支持的事件：
 * - click: 标签点击事件，传递原生 MouseEvent 对象
 * - close: 标签关闭事件，当点击关闭按钮时触发
 *
 * @example
 * ```vue
 * <VkTag
 *   @click="handleClick"
 *   @close="handleClose"
 * >
 *   可关闭标签
 * </VkTag>
 * ```
 */
export const tagEmits = {
  /**
   * 点击事件
   * @param e - 鼠标点击事件对象
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 关闭事件
   * @param e - 鼠标点击事件对象
   */
  close: (e: MouseEvent) => e instanceof MouseEvent,
};

/**
 * 标签组件事件类型
 *
 * 从 tagEmits 中提取的事件类型，用于组件的事件类型检查。
 */
export type TagEmits = typeof tagEmits;
