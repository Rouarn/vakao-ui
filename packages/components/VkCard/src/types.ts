/**
 * VkCard 卡片组件类型定义
 *
 * 定义了卡片组件的所有属性、事件和类型，提供完整的 TypeScript 支持。
 * 卡片组件用于承载信息的容器，支持丰富的内容和操作。
 */

import type { PropType, CSSProperties } from "vue";
import type { ExtractPublicPropTypes, ComponentSize } from "@/types";

/**
 * 卡片尺寸
 *
 * 继承全局组件尺寸，支持四种大小：
 * - tiny: 超小尺寸
 * - small: 小尺寸
 * - medium: 中等尺寸（默认）
 * - large: 大尺寸
 */
export type CardSize = ComponentSize;

/**
 * 卡片阴影类型
 *
 * 定义卡片的阴影效果：
 * - always: 总是显示阴影
 * - hover: 悬停时显示阴影
 * - never: 从不显示阴影
 */
export type CardShadow = "always" | "hover" | "never";

/**
 * 卡片组件属性定义
 *
 * 定义了卡片组件的所有可配置属性，包括样式、状态、行为等。
 * 所有属性都提供了合理的默认值和完整的类型约束。
 *
 * @example
 * ```vue
 * <VkCard
 *   header="卡片标题"
 *   shadow="hover"
 *   size="large"
 *   :body-padding="20"
 * >
 *   <p>卡片内容</p>
 *   <template #footer>
 *     <VkButton type="primary">确认</VkButton>
 *   </template>
 * </VkCard>
 * ```
 */
export const cardProps = {
  /**
   * 卡片标题
   */
  header: {
    type: String,
    default: "",
  },
  /**
   * 卡片尺寸，影响内边距和字体大小
   * @default 'medium'
   */
  size: {
    type: String as PropType<CardSize>,
    default: "medium",
  },
  /**
   * 卡片阴影显示时机
   * @default 'always'
   */
  shadow: {
    type: String as PropType<CardShadow>,
    default: "always",
  },
  /**
   * 卡片主体内边距，可以是数字（px）或字符串
   */
  bodyPadding: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  /**
   * 是否显示边框
   * @default true
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否可悬停，悬停时会有交互效果
   * @default false
   */
  hoverable: {
    type: Boolean,
    default: false,
  },
  /**
   * 自定义 CSS 类名，会与组件默认类名合并
   */
  customClass: String,
  /**
   * 自定义样式，支持字符串或对象格式
   */
  customStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: undefined,
  },
} as const;

/**
 * 卡片组件属性类型
 *
 * 从 cardProps 中提取的公共属性类型，用于组件的 TypeScript 类型检查。
 * 包含所有可配置的卡片属性及其类型约束。
 */
export type CardProps = ExtractPublicPropTypes<typeof cardProps>;

/**
 * 卡片组件事件定义
 *
 * 定义了卡片组件支持的所有事件及其参数类型。
 * 支持的事件：
 * - click: 卡片点击事件，传递原生 MouseEvent 对象
 *
 * @example
 * ```vue
 * <VkCard
 *   @click="handleClick"
 * >
 *   点击卡片
 * </VkCard>
 * ```
 */
export const cardEmits = {
  /**
   * 点击事件
   * @param e - 鼠标点击事件对象
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
};

/**
 * 卡片组件事件类型
 *
 * 从 cardEmits 中提取的事件类型，用于组件的事件类型检查。
 */
export type CardEmits = typeof cardEmits;
