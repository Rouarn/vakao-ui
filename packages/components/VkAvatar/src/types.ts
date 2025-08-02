import type { ExtractPropTypes, PropType } from "vue";
import type { ComponentSize } from "../../../types";

/**
 * 头像尺寸
 *
 * @description 定义头像的尺寸大小
 */
export type AvatarSize = ComponentSize;

/**
 * 头像形状
 *
 * @description 定义头像的形状
 */
export type AvatarShape = "circle" | "square";

/**
 * 头像适应方式
 *
 * @description 定义头像图片的适应方式
 */
export type AvatarFit = "fill" | "contain" | "cover" | "none" | "scale-down";

/**
 * 头像组件属性
 *
 * @description 定义头像组件的所有可配置属性
 */
export const avatarProps = {
  /**
   * 头像尺寸
   *
   * 控制头像的大小，可以是预设尺寸或具体像素值
   *
   * @default 'default'
   */
  size: {
    type: [String, Number] as PropType<AvatarSize | number>,
    default: "medium",
  },

  /**
   * 头像形状
   *
   * 控制头像的形状，圆形或方形
   *
   * @default 'circle'
   */
  shape: {
    type: String as PropType<AvatarShape>,
    default: "circle",
    validator: (val: string): boolean => {
      return ["circle", "square"].includes(val);
    },
  },

  /**
   * 图片源
   *
   * 头像图片的URL地址
   */
  src: {
    type: String,
    default: "",
  },

  /**
   * 图片适应方式
   *
   * 控制图片在头像容器中的适应方式
   *
   * @default 'cover'
   */
  fit: {
    type: String as PropType<AvatarFit>,
    default: "cover",
    validator: (val: string): boolean => {
      return ["fill", "contain", "cover", "none", "scale-down"].includes(val);
    },
  },

  /**
   * 图标
   *
   * 当不使用图片时，可以显示的图标
   */
  icon: {
    type: String,
    default: "",
  },

  /**
   * 图标大小
   *
   * 控制图标的大小，默认为头像尺寸的一半
   */
  iconSize: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },

  /**
   * 图标颜色
   *
   * 控制图标的颜色
   */
  iconColor: {
    type: String,
    default: "",
  },

  /**
   * 替代文本
   *
   * 图片加载失败时显示的文本
   */
  alt: {
    type: String,
    default: "",
  },

  /**
   * 背景颜色
   *
   * 头像的背景颜色
   */
  backgroundColor: {
    type: String,
    default: "",
  },

  /**
   * 文字颜色
   *
   * 头像中文字的颜色
   */
  color: {
    type: String,
    default: "",
  },

  /**
   * 加载失败时显示的内容
   *
   * 图片加载失败时显示的内容，可以是文本或图标
   */
  fallback: {
    type: String,
    default: "",
  },

  /**
   * 懒加载
   *
   * 是否启用图片懒加载
   *
   * @default false
   */
  lazy: {
    type: Boolean,
    default: false,
  },

  /**
   * 预览功能
   *
   * 是否启用图片预览功能
   *
   * @default false
   */
  preview: {
    type: Boolean,
    default: false,
  },

  /**
   * 占位符
   *
   * 图片加载时显示的占位符
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * 是否可点击
   *
   * 设置头像是否可以被点击
   *
   * @default false
   */
  clickable: {
    type: Boolean,
    default: false,
  },

  /**
   * 边框
   *
   * 头像的边框样式
   */
  border: {
    type: String,
    default: "",
  },

  /**
   * 圆角半径
   *
   * 当形状为方形时的圆角半径
   */
  radius: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
} as const;

/**
 * 头像组件事件
 */
export const avatarEmits = {
  /**
   * 错误事件
   *
   * 图片加载失败时触发
   */
  error: (e: Event) => e instanceof Event,

  /**
   * 加载事件
   *
   * 图片加载成功时触发
   */
  load: (e: Event) => e instanceof Event,

  /**
   * 点击事件
   *
   * 点击头像时触发
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
};

/**
 * 头像组件属性类型
 */
export type AvatarProps = ExtractPropTypes<typeof avatarProps>;

/**
 * 头像组件事件类型
 */
export type AvatarEmits = typeof avatarEmits;
