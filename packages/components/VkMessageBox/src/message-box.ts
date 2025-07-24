import { createApp, App } from 'vue'
import MessageBoxComponent from './index.vue'
import type { MessageBoxOptions, MessageBoxAction, MessageBoxInstance } from './types'

// MessageBox 实例管理
let messageBoxInstance: App | null = null
let currentContainer: HTMLElement | null = null

// 创建 MessageBox 实例
function createMessageBox(options: MessageBoxOptions): Promise<MessageBoxAction> {
  return new Promise((resolve, reject) => {
    // 清理之前的实例
    if (messageBoxInstance && currentContainer) {
      messageBoxInstance.unmount()
      document.body.removeChild(currentContainer)
    }

    // 创建容器
    const container = document.createElement('div')
    document.body.appendChild(container)
    currentContainer = container

    // 创建应用实例
    const app = createApp(MessageBoxComponent, {
      ...options,
      onAction: (action: MessageBoxAction, instance: MessageBoxInstance) => {
        // 延迟关闭，等待动画完成
        setTimeout(() => {
          if (messageBoxInstance && currentContainer) {
            messageBoxInstance.unmount()
            document.body.removeChild(currentContainer)
            messageBoxInstance = null
            currentContainer = null
          }
        }, 300)

        if (action === 'confirm') {
          resolve(action)
        } else {
          reject(action)
        }
      }
    })

    messageBoxInstance = app
    app.mount(container)
  })
}

// MessageBox 主对象
export const VkMessageBox = {
  /**
   * 显示确认对话框
   */
  confirm(
    message: string,
    title?: string | MessageBoxOptions,
    options?: MessageBoxOptions
  ): Promise<MessageBoxAction> {
    let mergedOptions: MessageBoxOptions

    if (typeof title === 'string') {
      mergedOptions = {
        message,
        title,
        showCancelButton: true,
        ...options
      }
    } else {
      mergedOptions = {
        message,
        title: '确认',
        showCancelButton: true,
        ...title
      }
    }

    return createMessageBox(mergedOptions)
  },

  /**
   * 显示警告对话框
   */
  alert(
    message: string,
    title?: string | MessageBoxOptions,
    options?: MessageBoxOptions
  ): Promise<MessageBoxAction> {
    let mergedOptions: MessageBoxOptions

    if (typeof title === 'string') {
      mergedOptions = {
        message,
        title,
        showCancelButton: false,
        ...options
      }
    } else {
      mergedOptions = {
        message,
        title: '提示',
        showCancelButton: false,
        ...title
      }
    }

    return createMessageBox(mergedOptions)
  },

  /**
   * 显示提示对话框
   */
  prompt(
    message: string,
    title?: string | MessageBoxOptions,
    options?: MessageBoxOptions
  ): Promise<MessageBoxAction> {
    let mergedOptions: MessageBoxOptions

    if (typeof title === 'string') {
      mergedOptions = {
        message,
        title,
        showCancelButton: true,
        type: 'info',
        ...options
      }
    } else {
      mergedOptions = {
        message,
        title: '输入',
        showCancelButton: true,
        type: 'info',
        ...title
      }
    }

    return createMessageBox(mergedOptions)
  },

  /**
   * 关闭当前 MessageBox
   */
  close() {
    if (messageBoxInstance && currentContainer) {
      messageBoxInstance.unmount()
      document.body.removeChild(currentContainer)
      messageBoxInstance = null
      currentContainer = null
    }
  }
}

export default VkMessageBox