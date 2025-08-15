/**
 * VkMessage 消息组件类型定义
 *
 * 定义了消息组件的所有属性、事件和类型，提供完整的 TypeScript 支持。
 * 消息组件用于显示全局提示信息，通常从页面顶部滑入显示。
 */

import type { PropType, CSSProperties, VNode } from "vue";
import type { ExtractPublicPropTypes, ComponentType } from "@/types";

/**
 * 消息类型
 *
 * 支持不同的视觉样式：
 * - default: 默认样式
 * - primary: 主要消息
 * - success: 成功消息
 * - warning: 警告消息
 * - danger: 危险消息
 * - info: 信息消息
 */
export type MessageType = ComponentType;

/**
 * 消息位置
 *
 * 定义消息显示的位置：
 * - top: 顶部显示（默认）
 * - top-left: 左上角显示
 * - top-right: 右上角显示
 */
export type MessagePosition = "top" | "top-left" | "top-right";

/**
 * 消息组件属性定义
 *
 * 定义了消息组件的所有可配置属性，包括样式、状态、行为等。
 * 所有属性都提供了合理的默认值和完整的类型约束。
 *
 * @example
 * ```typescript
 * const messageProps: MessageProps = {
 *   type: 'success',
 *   message: '操作成功！',
 *   duration: 3000,
 *   closable: true
 * };
 * ```
 */
export const messageProps = {
  /**
   * 消息类型
   *
   * 控制消息的视觉样式和语义，不同类型对应不同的颜色主题。
   * 默认为 'info'。
   */
  type: {
    type: String as PropType<MessageType>,
    default: "info",
  },

  /**
   * 消息内容
   *
   * 要显示的消息文本内容。
   */
  message: {
    type: String,
    default: "",
  },

  /**
   * 显示时长
   *
   * 消息自动关闭的时间，单位为毫秒。
   * 设置为 0 时不会自动关闭。
   * 默认为 3000ms（3秒）。
   */
  duration: {
    type: Number,
    default: 3000,
  },

  /**
   * 是否可关闭
   *
   * 控制是否显示关闭按钮，允许用户手动关闭消息。
   * 默认为 true。
   */
  closable: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示图标
   *
   * 控制是否在消息前显示类型对应的图标。
   * 默认为 true。
   */
  showIcon: {
    type: Boolean,
    default: true,
  },

  /**
   * 自定义图标
   *
   * 自定义消息图标，可以是图标名称字符串或 Vue 组件。
   * 当设置此属性时，会覆盖默认的类型图标。
   */
  icon: {
    type: [String, Object] as PropType<string | VNode>,
    default: "",
  },

  /**
   * 消息位置
   *
   * 控制消息在页面中的显示位置。
   * 默认为 'top'（顶部居中）。
   */
  position: {
    type: String as PropType<MessagePosition>,
    default: "top",
  },

  /**
   * 距离顶部的偏移量
   *
   * 消息距离页面顶部的距离，单位为像素。
   * 默认为 20px。
   */
  offset: {
    type: Number,
    default: 20,
  },

  /**
   * 是否使用 HTML
   *
   * 控制消息内容是否作为 HTML 渲染。
   * 注意：启用此选项时需要确保内容安全，避免 XSS 攻击。
   * 默认为 false。
   */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },

  /**
   * 自定义类名
   *
   * 添加到消息容器的自定义 CSS 类名。
   */
  customClass: String,

  /**
   * 自定义样式
   *
   * 添加到消息容器的自定义样式。
   * 可以是样式字符串或样式对象。
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,

  /**
   * z-index 层级
   *
   * 控制消息的层级，确保消息显示在其他元素之上。
   * 默认为 2000。
   */
  zIndex: {
    type: Number,
    default: 2000,
  },
} as const;

/**
 * 消息组件属性类型
 *
 * 从 messageProps 中提取的公共属性类型，用于组件的 props 类型约束。
 */
export type MessageProps = ExtractPublicPropTypes<typeof messageProps>;

/**
 * 消息组件事件定义
 *
 * 定义了消息组件支持的所有事件，包括事件参数的类型约束。
 * 所有事件都提供了参数验证函数，确保事件参数的类型正确性。
 *
 * @example
 * ```vue
 * <VkMessage
 *   @close="handleClose"
 *   @destroy="handleDestroy"
 * />
 * ```
 */
export const messageEmits = {
  /**
   * 关闭事件
   *
   * 当消息被关闭时触发，无论是用户手动关闭还是自动关闭。
   * 事件不携带参数。
   */
  close: () => true,

  /**
   * 销毁事件
   *
   * 当消息组件完全销毁时触发，通常在关闭动画完成后。
   * 事件不携带参数。
   */
  destroy: () => true,
} as const;

/**
 * 消息组件事件类型
 *
 * 从 messageEmits 中提取的事件类型，用于组件的 emits 类型约束。
 */
export type MessageEmits = typeof messageEmits;

/**
 * 消息组件实例接口
 *
 * 定义了消息组件实例的结构，包含组件暴露的方法和属性。
 */
export interface MessageComponentInstance {
  /** 关闭消息的方法 */
  close: () => void;
  /** 消息可见性 */
  visible: boolean;
  /** 消息唯一 ID */
  messageId: string;
}

/**
 * 消息实例接口
 *
 * 定义了消息实例的方法，用于程序化控制消息的行为。
 */
export interface MessageInstance {
  /**
   * 关闭消息
   *
   * 手动关闭当前消息实例。
   */
  close: () => void;

  /**
   * 消息 ID
   *
   * 消息的唯一标识符，用于区分不同的消息实例。
   */
  id: string;

  /**
   * 消息位置
   *
   * 消息显示的位置，用于堆叠管理。
   */
  position?: MessagePosition;

  /**
   * Vue组件实例
   *
   * 用于访问和控制消息组件。
   */
  vm?: MessageComponentInstance;
}

/**
 * 消息配置选项
 *
 * 用于创建消息时的配置选项，基于 MessageProps 但使用实际的值类型而不是 Vue prop 定义。
 */
export interface MessageOptions {
  /**
   * 消息类型
   */
  type?: MessageType;

  /**
   * 消息内容
   *
   * 要显示的消息文本内容，这是必需的属性。
   */
  message: string;

  /**
   * 显示时长
   *
   * 消息自动关闭的时间，单位为毫秒。
   * 设置为 0 时不会自动关闭。
   */
  duration?: number;

  /**
   * 是否可关闭
   */
  closable?: boolean;

  /**
   * 是否显示图标
   */
  showIcon?: boolean;

  /**
   * 自定义图标
   */
  icon?: string | VNode;

  /**
   * 消息位置
   */
  position?: MessagePosition;

  /**
   * 距离顶部的偏移量
   */
  offset?: number;

  /**
   * 是否使用 HTML
   */
  dangerouslyUseHTMLString?: boolean;

  /**
   * 自定义类名
   */
  customClass?: string;

  /**
   * 自定义样式
   */
  customStyle?: string | CSSProperties;

  /**
   * z-index 层级
   */
  zIndex?: number;
}
