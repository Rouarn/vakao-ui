/**
 * VkButton 组件类型定义
 *
 * 定义了按钮组件的所有属性、事件和类型，提供完整的 TypeScript 支持。
 * 按钮组件支持多种样式变体、图标配置、状态控制等功能。
 */

import type { PropType, CSSProperties, VNode } from "vue";
import {
  ExtractPublicPropTypes,
  ComponentType,
  ComponentSize,
} from "../../../types";

/**
 * 按钮类型
 *
 * 继承全局组件类型，支持不同的视觉样式：
 * - default: 默认样式
 * - primary: 主要按钮
 * - success: 成功按钮
 * - warning: 警告按钮
 * - danger: 危险按钮
 * - info: 信息按钮
 */
export type ButtonType = ComponentType;

/**
 * 按钮尺寸
 *
 * 继承全局组件尺寸，支持三种大小：
 * - small: 小尺寸 (28px 高度)
 * - medium: 中等尺寸 (32px 高度，默认)
 * - large: 大尺寸 (36px 高度)
 */
export type ButtonSize = ComponentSize;

/**
 * 按钮原生类型
 *
 * 对应 HTML button 元素的 type 属性：
 * - button: 普通按钮（默认）
 * - submit: 提交按钮，用于表单提交
 * - reset: 重置按钮，用于表单重置
 */
export type ButtonNativeType = "button" | "submit" | "reset";

/**
 * 按钮组件属性定义
 *
 * 定义了按钮组件的所有可配置属性，包括样式、状态、行为等。
 * 所有属性都提供了合理的默认值和完整的类型约束。
 *
 * @example
 * ```vue
 * <VkButton
 *   type="primary"
 *   size="large"
 *   :loading="isLoading"
 *   icon="search"
 *   @click="handleClick"
 * >
 *   搜索
 * </VkButton>
 * ```
 */
export const buttonProps = {
  /**
   * 按钮类型，决定按钮的视觉样式和语义
   * @default 'default'
   */
  type: {
    type: String as PropType<ButtonType>,
    default: "default",
  },
  /**
   * 按钮尺寸，影响按钮的高度和内边距
   * @default 'medium'
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: "medium",
  },
  /**
   * 是否禁用按钮，禁用后不可点击且样式变灰
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示加载状态，显示加载图标且不可点击
   * @default false
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为朴素按钮，背景透明，只有边框和文字颜色
   * @default false
   */
  plain: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为文本按钮，无背景和边框，只有文字颜色
   * @default false
   */
  text: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为链接按钮，样式类似超链接
   * @default false
   */
  link: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为圆角按钮，边框圆角更大
   * @default false
   */
  round: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为圆形按钮，通常用于图标按钮
   * @default false
   */
  circle: {
    type: Boolean,
    default: false,
  },
  /**
   * 按钮图标，支持字符串（图标名或URL）或 VNode 组件
   * - 字符串：可以是图标名称或图片URL
   * - VNode：可以是任意 Vue 组件
   * @default ''
   */
  icon: {
    type: [String, Object] as PropType<string | VNode>,
    default: "",
  },
  /**
   * 图标位置，相对于按钮文字的位置
   * @default 'left'
   */
  iconPosition: {
    type: String as PropType<"left" | "right">,
    default: "left",
  },
  /**
   * 原生 button 元素的 type 属性
   * @default 'button'
   */
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: "button",
  },
  /**
   * 自定义 CSS 类名，会与组件默认类名合并
   */
  customClass: String,
  /**
   * 自定义样式，支持字符串或对象格式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
  /**
   * 是否自动聚焦，页面加载时自动获得焦点
   * @default false
   */
  autofocus: Boolean,
} as const;

/**
 * 按钮组件属性类型
 *
 * 从 buttonProps 中提取的公共属性类型，用于组件的 TypeScript 类型检查。
 * 包含所有可配置的按钮属性及其类型约束。
 */
export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>;

/**
 * 按钮组件事件定义
 *
 * 定义了按钮组件支持的所有事件及其参数类型。
 * 目前支持的事件：
 * - click: 按钮点击事件，传递原生 MouseEvent 对象
 *
 * @example
 * ```vue
 * <VkButton @click="handleClick">
 *   点击我
 * </VkButton>
 *
 * <script setup>
 * const handleClick = (event: MouseEvent) => {
 *   console.log('按钮被点击了', event);
 * };
 * </script>
 * ```
 */
export const buttonEmits = {
  /**
   * 按钮点击事件
   *
   * 当按钮被点击时触发，只有在非禁用和非加载状态下才会触发。
   *
   * @param _evt - 原生鼠标点击事件对象
   * @returns 总是返回 true，表示事件有效
   */
  click: (_evt: MouseEvent) => true,
} as const;

/**
 * 按钮组件事件类型
 *
 * 从 buttonEmits 中提取的事件类型，用于组件的 TypeScript 类型检查。
 * 包含所有支持的事件及其参数类型。
 */
export type ButtonEmits = ExtractPublicPropTypes<typeof buttonEmits>;
