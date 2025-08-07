/**
 * VkTooltip 组件类型定义
 *
 * 定义了工具提示组件的所有属性、事件和类型，提供完整的 TypeScript 支持。
 * 基于 element-plus tooltip 设计，支持多种触发方式、位置配置、主题定制等功能。
 */

import type { PropType, CSSProperties } from "vue";
import type { ExtractPublicPropTypes } from "../../../types";

/**
 * 工具提示位置类型
 *
 * 支持 12 个方向的位置配置：
 * - top: 上方（居中对齐）
 * - top-start: 上方（左对齐）
 * - top-end: 上方（右对齐）
 * - bottom: 下方（居中对齐）
 * - bottom-start: 下方（左对齐）
 * - bottom-end: 下方（右对齐）
 * - left: 左侧（居中对齐）
 * - left-start: 左侧（上对齐）
 * - left-end: 左侧（下对齐）
 * - right: 右侧（居中对齐）
 * - right-start: 右侧（上对齐）
 * - right-end: 右侧（下对齐）
 */
export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

/**
 * 工具提示触发方式
 *
 * - hover: 鼠标悬停触发（默认）
 * - click: 点击触发
 * - focus: 聚焦触发
 * - manual: 手动控制
 */
export type TooltipTrigger = "hover" | "click" | "focus" | "manual";

/**
 * 工具提示主题
 *
 * - dark: 深色主题（默认）
 * - light: 浅色主题
 */
export type TooltipTheme = "dark" | "light";

/**
 * 工具提示过渡动画
 *
 * - fade: 淡入淡出（默认）
 * - zoom: 缩放
 * - slide: 滑动
 */
export type TooltipTransition = "fade" | "zoom" | "slide";

/**
 * 工具提示属性定义
 */
export const tooltipProps = {
  /**
   * 工具提示内容
   * 支持字符串或 HTML 内容
   */
  content: {
    type: String,
    default: "",
  },

  /**
   * 是否支持 HTML 内容
   * 注意：使用 HTML 内容时需要确保内容安全，避免 XSS 攻击
   */
  rawContent: {
    type: Boolean,
    default: false,
  },

  /**
   * 工具提示位置
   */
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: "bottom" as TooltipPlacement,
  },

  /**
   * 触发方式
   */
  trigger: {
    type: String as PropType<TooltipTrigger>,
    default: "hover" as TooltipTrigger,
  },

  /**
   * 工具提示主题
   */
  effect: {
    type: String as PropType<TooltipTheme>,
    default: "dark" as TooltipTheme,
  },

  /**
   * 是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否禁用工具提示
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * 显示延迟（毫秒）
   */
  showDelay: {
    type: Number,
    default: 0,
  },

  /**
   * 隐藏延迟（毫秒）
   */
  hideDelay: {
    type: Number,
    default: 200,
  },

  /**
   * 自动关闭延迟（毫秒）
   * 设置为 0 表示不自动关闭
   */
  autoClose: {
    type: Number,
    default: 0,
  },

  /**
   * 工具提示偏移量
   * [x, y] 格式的数组
   */
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default(): [number, number] {
      return [0, 8];
    },
  },

  /**
   * 过渡动画类型
   */
  transition: {
    type: String as PropType<TooltipTransition>,
    default: "fade" as TooltipTransition,
  },

  /**
   * 工具提示容器的挂载目标
   * 可以是选择器字符串或 DOM 元素
   */
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: "body",
  },

  /**
   * 自定义类名
   */
  popperClass: {
    type: String,
    default: "",
  },

  /**
   * 自定义样式
   */
  popperStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: "",
  },

  /**
   * 是否可见（用于手动控制）
   * 支持 v-model:visible
   */
  visible: {
    type: Boolean,
    default: undefined,
  },

  /**
   * 最大宽度
   */
  maxWidth: {
    type: [String, Number] as PropType<string | number>,
    default: "200px",
  },

  /**
   * 是否在内容为空时隐藏工具提示
   */
  hideOnEmpty: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否在点击外部时关闭
   */
  hideOnClickOutside: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否在按下 ESC 键时关闭
   */
  hideOnEscape: {
    type: Boolean,
    default: true,
  },

  /**
   * 虚拟触发元素
   * 用于分离触发元素和内容元素
   */
  virtualTriggering: {
    type: Boolean,
    default: false,
  },

  /**
   * 虚拟触发元素引用
   */
  virtualRef: {
    type: Object as PropType<HTMLElement>,
    default: undefined,
  },
} as const;

/**
 * 工具提示属性类型
 */
export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>;

/**
 * 工具提示事件定义
 */
export const tooltipEmits = {
  /**
   * 显示状态变化事件
   * @param visible 是否可见
   */
  "update:visible": (visible: boolean) => typeof visible === "boolean",

  /**
   * 工具提示显示前事件
   */
  "before-show": () => true,

  /**
   * 工具提示显示后事件
   */
  show: () => true,

  /**
   * 工具提示隐藏前事件
   */
  "before-hide": () => true,

  /**
   * 工具提示隐藏后事件
   */
  hide: () => true,
} as const;

/**
 * 工具提示事件类型
 */
export type TooltipEmits = ExtractPublicPropTypes<typeof tooltipEmits>;

/**
 * 工具提示实例类型
 */
export interface TooltipInstance {
  /**
   * 显示工具提示
   */
  show: () => void;

  /**
   * 隐藏工具提示
   */
  hide: () => void;

  /**
   * 切换工具提示显示状态
   */
  toggle: () => void;

  /**
   * 更新工具提示位置
   */
  updatePopper: () => void;

  /**
   * 销毁工具提示
   */
  destroy: () => void;
}
