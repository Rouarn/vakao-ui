/**
 * VkMessage 消息组件函数式 API
 *
 * 提供程序化创建和管理消息的功能，支持多种调用方式和配置选项。
 * 可以通过函数调用的方式快速显示消息，无需在模板中声明组件。
 */

import { createApp, type App } from "vue";
import type { MessageOptions, MessageInstance, MessageType } from "./types";
import MessageComponent from "./index.vue";

/**
 * 消息实例管理器
 *
 * 用于管理所有活跃的消息实例，提供统一的创建、销毁和查找功能。
 */
class MessageManager {
  /** 存储所有活跃的消息实例 */
  private instances: Map<string, MessageInstance> = new Map();

  /** 消息实例计数器，用于生成唯一 ID */
  private counter = 0;

  /**
   * 创建消息实例
   *
   * @param options - 消息配置选项
   * @returns 消息实例
   */
  create(options: MessageOptions): MessageInstance {
    // 生成唯一 ID
    const id = `vk-message-${Date.now()}-${++this.counter}`;

    // 创建容器元素
    const container = document.createElement("div");
    container.id = id;
    document.body.appendChild(container);

    // 创建 Vue 应用实例
    const app = createApp(MessageComponent, {
      ...options,
      onDestroy: () => {
        this.destroy(id, app, container);
      },
    });

    // 挂载组件
    const vm = app.mount(container);

    // 创建消息实例对象
    const instance: MessageInstance = {
      id,
      close: () => {
        if (vm && typeof vm.close === "function") {
          vm.close();
        }
      },
    };

    // 存储实例
    this.instances.set(id, instance);

    return instance;
  }

  /**
   * 销毁消息实例
   *
   * @param id - 消息 ID
   * @param app - Vue 应用实例
   * @param container - 容器元素
   */
  private destroy(id: string, app: App, container: HTMLElement) {
    // 从实例管理器中移除
    this.instances.delete(id);

    // 卸载 Vue 应用
    app.unmount();

    // 移除容器元素
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  /**
   * 关闭指定消息
   *
   * @param id - 消息 ID
   */
  close(id: string) {
    const instance = this.instances.get(id);
    if (instance) {
      instance.close();
    }
  }

  /**
   * 关闭所有消息
   */
  closeAll() {
    this.instances.forEach((instance) => {
      instance.close();
    });
  }

  /**
   * 获取指定消息实例
   *
   * @param id - 消息 ID
   * @returns 消息实例或 undefined
   */
  getInstance(id: string): MessageInstance | undefined {
    return this.instances.get(id);
  }

  /**
   * 获取所有活跃的消息实例
   *
   * @returns 消息实例数组
   */
  getAllInstances(): MessageInstance[] {
    return Array.from(this.instances.values());
  }

  /**
   * 获取活跃消息数量
   *
   * @returns 消息数量
   */
  getCount(): number {
    return this.instances.size;
  }
}

// 创建全局消息管理器实例
const messageManager = new MessageManager();

/**
 * 消息函数接口
 *
 * 定义消息函数的类型，支持字符串和配置对象两种调用方式。
 */
interface MessageFunction {
  (message: string): MessageInstance;
  (options: MessageOptions): MessageInstance;
}

/**
 * 创建类型化的消息函数
 *
 * @param type - 消息类型
 * @returns 消息函数
 */
function createTypedMessage(type: MessageType): MessageFunction {
  return (messageOrOptions: string | MessageOptions): MessageInstance => {
    const options: MessageOptions =
      typeof messageOrOptions === "string" ? { message: messageOrOptions, type } : { ...messageOrOptions, type };

    return messageManager.create(options);
  };
}

/**
 * 通用消息函数
 *
 * 支持字符串和配置对象两种调用方式。
 *
 * @example
 * ```typescript
 * // 字符串方式
 * Message('这是一条消息');
 *
 * // 配置对象方式
 * Message({
 *   message: '这是一条消息',
 *   type: 'success',
 *   duration: 5000
 * });
 * ```
 */
const Message: MessageFunction & {
  success: MessageFunction;
  warning: MessageFunction;
  info: MessageFunction;
  error: MessageFunction;
  danger: MessageFunction;
  primary: MessageFunction;
  close: (id: string) => void;
  closeAll: () => void;
  getInstance: (id: string) => MessageInstance | undefined;
  getAllInstances: () => MessageInstance[];
  getCount: () => number;
} = (messageOrOptions: string | MessageOptions): MessageInstance => {
  const options: MessageOptions = typeof messageOrOptions === "string" ? { message: messageOrOptions, type: "info" } : messageOrOptions;

  return messageManager.create(options);
};

// 添加类型化的消息方法
Message.success = createTypedMessage("success");
Message.warning = createTypedMessage("warning");
Message.info = createTypedMessage("info");
Message.error = createTypedMessage("danger");
Message.danger = createTypedMessage("danger");
Message.primary = createTypedMessage("primary");

// 添加管理方法
Message.close = (id: string) => messageManager.close(id);
Message.closeAll = () => messageManager.closeAll();
Message.getInstance = (id: string) => messageManager.getInstance(id);
Message.getAllInstances = () => messageManager.getAllInstances();
Message.getCount = () => messageManager.getCount();

/**
 * 导出消息函数和相关类型
 */
export { Message, MessageManager };
export type { MessageFunction };
export default Message;
