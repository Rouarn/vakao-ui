/**
 * VkIcon 图标组件属性接口
 *
 * 定义了图标组件的所有可配置属性，支持多种图标来源和样式定制。
 * 组件优先级：src > icon > slot，即自定义图片 > Iconify 图标 > 插槽内容。
 *
 * @example
 * ```vue
 * <!-- 使用 Iconify 图标 -->
 * <VkIcon icon="mdi:home" size="24px" color="#409eff" />
 *
 * <!-- 使用自定义图片 -->
 * <VkIcon src="/path/to/icon.svg" size="32" />
 *
 * <!-- 使用插槽内容 -->
 * <VkIcon size="1.5em">
 *   <svg>...</svg>
 * </VkIcon>
 * ```
 */
export interface VkIconProps {
  /**
   * 自定义图标 URL 或路径
   *
   * 当提供此属性时，组件将渲染为 img 元素显示图片。
   * 优先级最高，会覆盖 icon 属性和插槽内容。
   *
   * @example
   * ```vue
   * <VkIcon src="/assets/logo.svg" />
   * <VkIcon src="https://example.com/icon.png" />
   * ```
   */
  src?: string;

  /**
   * Iconify 图标名称
   *
   * 使用 Iconify 图标库中的图标，格式为 "集合名:图标名"。
   * 当没有 src 属性时生效，优先级高于插槽内容。
   *
   * @example
   * ```vue
   * <VkIcon icon="mdi:home" />
   * <VkIcon icon="heroicons:user-solid" />
   * <VkIcon icon="tabler:settings" />
   * ```
   *
   * @see https://iconify.design/ - Iconify 图标库
   */
  icon?: string;

  /**
   * 图标大小
   *
   * 支持数字（像素值）或字符串（CSS 单位）。
   * 数字会自动添加 px 单位，字符串直接作为 CSS 值使用。
   *
   * @default '1em'
   *
   * @example
   * ```vue
   * <VkIcon size="24" />        <!-- 24px -->
   * <VkIcon size="1.5em" />     <!-- 1.5em -->
   * <VkIcon size="2rem" />      <!-- 2rem -->
   * <VkIcon :size="32" />       <!-- 32px -->
   * ```
   */
  size?: string | number;

  /**
   * 图标颜色
   *
   * 支持任何有效的 CSS 颜色值。
   * 对于 SVG 图标，会设置 color 属性；对于图片，可能需要配合 CSS 滤镜使用。
   *
   * @default 'currentColor'
   *
   * @example
   * ```vue
   * <VkIcon color="#409eff" />     <!-- 十六进制 -->
   * <VkIcon color="red" />        <!-- 颜色名称 -->
   * <VkIcon color="rgb(64, 158, 255)" /> <!-- RGB -->
   * <VkIcon color="var(--vk-color-primary)" /> <!-- CSS 变量 -->
   * ```
   */
  color?: string;

  /**
   * 自定义 CSS 类名
   *
   * 会与组件默认类名合并，用于添加额外的样式。
   *
   * @example
   * ```vue
   * <VkIcon customClass="my-icon rotating" />
   * ```
   */
  customClass?: string;

  /**
   * 自定义样式
   *
   * 支持字符串或对象格式的 CSS 样式。
   * 会与组件内部样式合并，可以覆盖默认样式。
   *
   * @example
   * ```vue
   * <!-- 字符串格式 -->
   * <VkIcon customStyle="transform: rotate(45deg); opacity: 0.8;" />
   *
   * <!-- 对象格式 -->
   * <VkIcon :customStyle="{ transform: 'scale(1.2)', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }" />
   * ```
   */
  customStyle?: string | Record<string, CSSStyleValue>;
}

import type { ComponentSize } from "@/types";

/**
 * 图标尺寸预设类型
 *
 * 定义了常用的图标尺寸选项，可以配合主题系统使用。
 * 注意：当前组件实现中主要使用 size 属性的具体值，此类型用于未来扩展。
 */
export type VkIconSize = ComponentSize;
