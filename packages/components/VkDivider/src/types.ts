import type { ExtractPropTypes, PropType } from "vue";

/**
 * 分割线方向
 * 
 * @description 定义分割线的方向，水平或垂直
 */
export type DividerDirection = "horizontal" | "vertical";

/**
 * 分割线内容位置
 * 
 * @description 定义分割线内容的位置
 */
export type DividerContentPosition = "left" | "center" | "right";

/**
 * 分割线组件属性
 * 
 * @description 定义分割线组件的所有可配置属性
 */
export const dividerProps = {
  /**
   * 分割线方向
   * 
   * 控制分割线是水平还是垂直方向
   * 
   * @default 'horizontal'
   */
  direction: {
    type: String as PropType<DividerDirection>,
    default: "horizontal",
    validator: (val: string): boolean => {
      return ["horizontal", "vertical"].includes(val);
    },
  },
  
  /**
   * 分割线边框样式
   * 
   * 控制分割线的边框样式，可以是CSS支持的任何边框样式
   * 
   * @default 'solid'
   */
  borderStyle: {
    type: String,
    default: "solid",
  },
  
  /**
   * 内容位置
   * 
   * 控制分割线内容的位置，仅在水平方向有效
   * 
   * @default 'center'
   */
  contentPosition: {
    type: String as PropType<DividerContentPosition>,
    default: "center",
    validator: (val: string): boolean => {
      return ["left", "center", "right"].includes(val);
    },
  },
  
  /**
   * 分割线颜色
   * 
   * 控制分割线的颜色
   * 
   * @default ''
   */
  borderColor: {
    type: String,
    default: "",
  },
} as const;

/**
 * 分割线组件属性类型
 */
export type DividerProps = ExtractPropTypes<typeof dividerProps>;