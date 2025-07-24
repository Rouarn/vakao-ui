import type { PropType, CSSProperties } from 'vue'
import { ExtractPublicPropTypes } from '../../../types'

// MessageBox 类型
export type MessageBoxType = 'success' | 'warning' | 'error' | 'info'

// MessageBox 动作类型
export type MessageBoxAction = 'confirm' | 'cancel' | 'close'

// MessageBox 属性定义
export const messageBoxProps = {
  /** 消息内容 */
  message: {
    type: String,
    required: true
  },
  /** 标题 */
  title: {
    type: String,
    default: '提示'
  },
  /** 类型 */
  type: {
    type: String as PropType<MessageBoxType>,
    default: 'info'
  },
  /** 确认按钮文字 */
  confirmText: {
    type: String,
    default: '确定'
  },
  /** 取消按钮文字 */
  cancelText: {
    type: String,
    default: '取消'
  },
  /** 是否显示确认按钮 */
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  /** 是否显示取消按钮 */
  showCancelButton: {
    type: Boolean,
    default: false
  },
  /** 是否显示关闭按钮 */
  showClose: {
    type: Boolean,
    default: true
  },
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  /** 按下 ESC 键是否关闭 */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /** 自定义类名 */
  customClass: {
    type: String,
    default: ''
  },
  /** 自定义样式 */
  customStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: ''
  }
} as const

// MessageBox 属性类型
export type MessageBoxProps = ExtractPublicPropTypes<typeof messageBoxProps>

// MessageBox 选项
export interface MessageBoxOptions {
  title?: string
  message?: string
  type?: MessageBoxType
  confirmText?: string
  cancelText?: string
  showConfirmButton?: boolean
  showCancelButton?: boolean
  showClose?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  customClass?: string
  customStyle?: string | CSSProperties
}

// MessageBox 实例
export interface MessageBoxInstance {
  visible: boolean
  close: () => void
}

// MessageBox 返回值
export interface MessageBoxResult {
  action: MessageBoxAction
  instance: MessageBoxInstance
}