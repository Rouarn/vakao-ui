/**
 * VkSpace 间距组件类型定义
 *
 * 定义了间距组件的所有属性、事件和类型，提供完整的 TypeScript 支持。
 * 间距组件用于在子元素之间添加一致的间距，支持水平和垂直布局、自动换行、
 * 多种对齐方式等功能，是构建灵活布局的重要工具。
 */

import type { PropType, CSSProperties } from "vue";
import type { ExtractPublicPropTypes, ComponentSize } from "@/types";

/**
 * 间距尺寸类型
 *
 * 支持预设尺寸和自定义数值：
 * - tiny: 4px
 * - small: 8px (默认)
 * - medium: 12px
 * - large: 16px
 * - number: 自定义像素值
 * - [number, number]: [水平间距, 垂直间距]
 */
export type SpaceSize = ComponentSize | number | [number, number];

/**
 * 对齐方式类型
 *
 * 定义子元素在交叉轴上的对齐方式：
 * - start: 起始对齐
 * - end: 结束对齐
 * - center: 居中对齐
 * - baseline: 基线对齐
 * - stretch: 拉伸对齐
 */
export type SpaceAlign = "start" | "end" | "center" | "baseline" | "stretch";

/**
 * 主轴对齐方式类型
 *
 * 定义子元素在主轴上的分布方式：
 * - start: 起始对齐
 * - end: 结束对齐
 * - center: 居中对齐
 * - space-around: 环绕分布
 * - space-between: 两端对齐
 * - space-evenly: 均匀分布
 */
export type SpaceJustify = "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";

/**
 * 间距组件属性定义
 *
 * 定义了间距组件的所有可配置属性，包括布局方向、间距大小、对齐方式等。
 * 所有属性都提供了合理的默认值和完整的类型约束。
 *
 * @example
 * ```vue
 * <VkSpace
 *   size="large"
 *   vertical
 *   align="center"
 *   justify="space-between"
 *   :wrap="false"
 *   inline
 *   reverse
 * >
 *   <VkButton>按钮1</VkButton>
 *   <VkButton>按钮2</VkButton>
 * </VkSpace>
 * ```
 */
export const spaceProps = {
  /**
   * 间距大小
   *
   * 支持预设尺寸（tiny/small/medium/large）、数值或数组形式。
   * 当为数组时，格式为 [水平间距, 垂直间距]。
   *
   * @default 'small'
   */
  size: {
    type: [String, Number, Array] as PropType<SpaceSize>,
    default: "small",
  },

  /**
   * 是否垂直布局
   *
   * true 时子元素垂直排列，false 时水平排列。
   *
   * @default false
   */
  vertical: {
    type: Boolean,
    default: false,
  },

  /**
   * 交叉轴对齐方式
   *
   * 定义子元素在交叉轴（垂直布局时为水平轴，水平布局时为垂直轴）上的对齐方式。
   *
   * @default undefined
   */
  align: {
    type: String as PropType<SpaceAlign>,
    default: undefined,
  },

  /**
   * 主轴对齐方式
   *
   * 定义子元素在主轴上的分布方式。
   *
   * @default 'start'
   */
  justify: {
    type: String as PropType<SpaceJustify>,
    default: "start",
  },

  /**
   * 是否自动换行
   *
   * 当子元素超出容器宽度时是否自动换行。
   *
   * @default true
   */
  wrap: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否为行内元素
   *
   * true 时使用 inline-flex，false 时使用 flex。
   *
   * @default false
   */
  inline: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否包装子元素
   *
   * 为每个子元素添加包装容器，用于应用间距样式。
   * 在不支持 flex gap 的浏览器中必须为 true。
   *
   * @default true
   */
  wrapItem: {
    type: Boolean,
    default: true,
  },

  /**
   * 子元素包装器的类名
   *
   * 当 wrapItem 为 true 时，为每个子元素的包装器添加的类名。
   *
   * @default undefined
   */
  itemClass: {
    type: String,
    default: undefined,
  },

  /**
   * 子元素包装器的样式
   *
   * 当 wrapItem 为 true 时，为每个子元素的包装器添加的样式。
   *
   * @default undefined
   */
  itemStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: undefined,
  },

  /**
   * 是否反转子元素顺序
   *
   * true 时子元素按相反顺序排列。
   *
   * @default false
   */
  reverse: {
    type: Boolean,
    default: false,
  },

  /**
   * 自定义类名
   *
   * 为组件根元素添加的自定义类名。
   *
   * @default undefined
   */
  customClass: String,

  /**
   * 自定义样式
   *
   * 为组件根元素添加的自定义样式。
   *
   * @default undefined
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
} as const;

/**
 * 间距组件属性类型
 *
 * 从 spaceProps 中提取的公共属性类型，用于组件的 props 类型定义。
 */
export type SpaceProps = ExtractPublicPropTypes<typeof spaceProps>;
