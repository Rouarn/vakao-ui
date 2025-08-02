import type { ExtractPropTypes, PropType } from "vue";

/**
 * 卡片阴影显示时机
 *
 * @description 定义卡片阴影的显示时机
 */
export type CardShadow = "always" | "hover" | "never";

/**
 * 卡片组件属性
 *
 * @description 定义卡片组件的所有可配置属性
 */
export const cardProps = {
  /**
   * 卡片标题
   *
   * 显示在卡片头部的主要标题文本
   *
   * @default ''
   */
  title: {
    type: String,
    default: "",
  },

  /**
   * 卡片副标题
   *
   * 显示在主标题下方的辅助说明文本
   *
   * @default ''
   */
  subtitle: {
    type: String,
    default: "",
  },

  /**
   * 卡片阴影显示时机
   *
   * 控制卡片阴影的显示时机：总是显示、悬停时显示或从不显示
   *
   * @default 'always'
   */
  shadow: {
    type: String as PropType<CardShadow>,
    default: "always",
    validator: (val: string): boolean => {
      return ["always", "hover", "never"].includes(val);
    },
  },

  /**
   * 是否显示边框
   *
   * 控制卡片是否显示边框
   *
   * @default true
   */
  bordered: {
    type: Boolean,
    default: true,
  },

  /**
   * 卡片内容区域的填充
   *
   * 控制卡片内容区域的内边距
   *
   * @default true
   */
  bodyPadding: {
    type: Boolean,
    default: true,
  },

  /**
   * 卡片圆角大小
   *
   * 控制卡片的圆角大小，可以是CSS支持的任何圆角值
   *
   * @default ''
   */
  radius: {
    type: String,
    default: "",
  },
} as const;

/**
 * 卡片组件属性类型
 */
export type CardProps = ExtractPropTypes<typeof cardProps>;

/**
 * 卡片组件事件
 */
export const cardEmits = {
  /**
   * 点击卡片时触发
   *
   * @param event 鼠标事件对象
   */
  click: (event: MouseEvent) => event instanceof MouseEvent,
};

/**
 * 卡片组件事件类型
 */
export type CardEmits = typeof cardEmits;
