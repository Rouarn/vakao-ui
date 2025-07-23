import type { PropType, CSSProperties, VNode } from 'vue'
import { ExtractPublicPropTypes } from '../../../types'

// 按钮类型
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger'

// 按钮尺寸
export type ButtonSize = 'small' | 'medium' | 'large'

// 按钮原生类型
export type ButtonNativeType = 'button' | 'submit' | 'reset'

// 按钮属性定义
export const buttonProps = {
  /** 按钮类型 */
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  /** 按钮尺寸 */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否为朴素按钮 */
  plain: {
    type: Boolean,
    default: false
  },
  /** 是否为文本按钮 */
  text: {
    type: Boolean,
    default: false
  },
  /** 是否为链接按钮 */
  link: {
    type: Boolean,
    default: false
  },
  /** 是否为圆角按钮 */
  round: {
    type: Boolean,
    default: false
  },
  /** 是否为圆形按钮 */
  circle: {
    type: Boolean,
    default: false
  },
  /** 按钮图标 */
  icon: {
    type: [String, Object] as PropType<string | VNode>,
    default: ''
  },
  /** 图标位置 */
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  /** 原生type属性 */
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button'
  },
  /** 自定义类名 */
  customClass: String,
  /** 自定义样式 */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
  /** 自动聚焦 */
  autofocus: Boolean,
} as const

// 导出按钮属性类型
export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>

// 按钮事件类型
export type ButtonEmits = {
  click: (evt: MouseEvent) => void
}