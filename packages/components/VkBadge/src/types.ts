import type { ExtractPropTypes, PropType } from "vue";
import type { ComponentType } from "@/types";

/**
 * 徽章类型
 *
 * @description 定义徽章的类型，影响外观样式
 */
export type BadgeType = ComponentType;

/**
 * 徽章组件属性
 *
 * @description 定义徽章组件的所有可配置属性
 */
export const badgeProps = {
  /**
   * 显示的值
   *
   * 徽章显示的内容，可以是数字或字符串
   */
  value: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },

  /**
   * 最大值
   *
   * 当值超过最大值时会显示 '{max}+'，仅当 value 为数字时有效
   */
  max: {
    type: Number,
    default: 99,
  },

  /**
   * 是否显示小圆点
   *
   * 不显示具体的数字，只显示一个小圆点
   *
   * @default false
   */
  isDot: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否隐藏徽章
   *
   * 设置为 true 时不显示徽章
   *
   * @default false
   */
  hidden: {
    type: Boolean,
    default: false,
  },

  /**
   * 徽章类型
   *
   * 控制徽章的主题颜色和样式
   *
   * @default 'danger'
   */
  type: {
    type: String as PropType<BadgeType>,
    default: "danger",
    validator: (val: string): boolean => {
      return ["default", "primary", "success", "warning", "info", "danger"].includes(val);
    },
  },

  /**
   * 自定义背景色
   *
   * 设置徽章的背景颜色，优先级高于 type
   */
  backgroundColor: {
    type: String,
    default: "",
  },

  /**
   * 自定义文字颜色
   *
   * 设置徽章的文字颜色
   */
  textColor: {
    type: String,
    default: "",
  },

  /**
   * 位置偏移
   *
   * 设置徽章的位置偏移，格式为 [x, y]，单位为像素
   */
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 0] as [number, number],
  },
} as const;

/**
 * 徽章组件属性类型
 */
export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
