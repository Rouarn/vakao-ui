/**
 * VkImage 图片组件类型定义
 *
 * 定义了图片组件的所有属性、事件和类型，提供完整的 TypeScript 支持。
 * 图片组件支持懒加载、错误处理、预览功能、多种适应模式等功能。
 */

import type { PropType, CSSProperties } from "vue";
import type { ExtractPublicPropTypes, ComponentSize } from "../../../types";

/**
 * 图片尺寸
 *
 * 继承全局组件尺寸，支持四种大小：
 * - tiny: 超小尺寸 (64px)
 * - small: 小尺寸 (96px)
 * - medium: 中等尺寸 (128px，默认)
 * - large: 大尺寸 (200px)
 */
export type ImageSize = ComponentSize;

/**
 * 图片适应模式
 *
 * 定义图片在容器中的显示方式：
 * - fill: 填充整个容器，可能会拉伸图片
 * - contain: 保持宽高比，完整显示图片
 * - cover: 保持宽高比，裁剪图片以填充容器
 * - none: 保持图片原始尺寸
 * - scale-down: 保持宽高比，缩小图片以适应容器
 */
export type ImageFit = "fill" | "contain" | "cover" | "none" | "scale-down";

/**
 * 图片加载状态
 *
 * 定义图片的加载状态：
 * - loading: 加载中
 * - loaded: 加载成功
 * - error: 加载失败
 */
export type ImageLoadStatus = "loading" | "loaded" | "error";

/**
 * 图片组件属性定义
 *
 * 定义了图片组件的所有可配置属性，包括样式、状态、行为等。
 * 所有属性都提供了合理的默认值和完整的类型约束。
 *
 * @example
 * ```vue
 * <VkImage
 *   src="https://example.com/image.jpg"
 *   alt="示例图片"
 *   fit="cover"
 *   lazy
 *   preview
 *   :width="200"
 *   :height="150"
 * />
 * ```
 */
export const imageProps = {
  /**
   * 图片源地址
   */
  src: {
    type: String,
    required: true,
  },

  /**
   * 图片替代文本
   */
  alt: {
    type: String,
    default: "",
  },

  /**
   * 图片适应模式
   */
  fit: {
    type: String as PropType<ImageFit>,
    default: "cover" as ImageFit,
  },

  /**
   * 图片宽度
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },

  /**
   * 图片高度
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },

  /**
   * 图片尺寸预设
   */
  size: {
    type: String as PropType<ImageSize>,
    default: "medium" as ImageSize,
  },

  /**
   * 是否启用懒加载
   */
  lazy: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否启用预览功能
   */
  preview: {
    type: Boolean,
    default: false,
  },

  /**
   * 预览图片列表（用于图片组预览）
   */
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  /**
   * 初始预览图片索引
   */
  initialIndex: {
    type: Number,
    default: 0,
  },

  /**
   * 是否显示预览工具栏
   */
  previewTeleported: {
    type: Boolean,
    default: true,
  },

  /**
   * 加载中的占位图片
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * 加载失败的占位图片
   */
  fallback: {
    type: String,
    default: "",
  },

  /**
   * 是否显示加载状态
   */
  loading: {
    type: Boolean,
    default: true,
  },

  /**
   * 图片圆角大小
   */
  radius: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },

  /**
   * 是否为圆形图片
   */
  round: {
    type: Boolean,
    default: false,
  },

  /**
   * 自定义样式类名
   */
  customClass: {
    type: [String, Array, Object] as PropType<string | string[] | Record<string, boolean>>,
    default: "",
  },

  /**
   * 自定义样式
   */
  customStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: "",
  },

  /**
   * 懒加载的根边距
   */
  scrollContainer: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: undefined,
  },

  /**
   * 是否禁用图片
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

/**
 * 图片组件事件定义
 *
 * 定义了图片组件支持的所有事件，包括加载状态变化、用户交互等。
 *
 * @example
 * ```vue
 * <VkImage
 *   @load="handleLoad"
 *   @error="handleError"
 *   @click="handleClick"
 *   @preview="handlePreview"
 * />
 * ```
 */
export const imageEmits = {
  /**
   * 图片加载成功事件
   *
   * @param event - 加载事件对象
   */
  load: (event: Event) => event instanceof Event,

  /**
   * 图片加载失败事件
   *
   * @param event - 错误事件对象
   */
  error: (event: Event) => event instanceof Event,

  /**
   * 图片点击事件
   *
   * @param event - 鼠标点击事件对象
   */
  click: (event: MouseEvent) => event instanceof MouseEvent,

  /**
   * 预览打开事件
   *
   * @param index - 预览图片索引
   */
  preview: (index: number) => typeof index === "number",

  /**
   * 预览关闭事件
   */
  "preview-close": () => true,

  /**
   * 预览切换事件
   *
   * @param index - 当前预览图片索引
   */
  "preview-switch": (index: number) => typeof index === "number",
} as const;

/**
 * 图片组件属性类型
 *
 * 从 imageProps 中提取出的公共属性类型，用于类型推导和组件实例类型定义。
 */
export type ImageProps = ExtractPublicPropTypes<typeof imageProps>;

/**
 * 图片组件事件类型
 *
 * 从 imageEmits 中提取出的事件类型，用于事件处理函数的类型约束。
 */
export type ImageEmits = typeof imageEmits;

/**
 * 图片组件实例类型
 *
 * 定义图片组件实例的公共方法和属性，用于模板引用和程序化操作。
 */
export interface ImageInstance {
  /** 手动触发图片重新加载 */
  reload: () => void;
  /** 打开预览 */
  openPreview: () => void;
  /** 关闭预览 */
  closePreview: () => void;
  /** 获取当前加载状态 */
  getLoadStatus: () => ImageLoadStatus;
}