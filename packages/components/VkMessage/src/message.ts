/**
 * VkMessage 消息组件函数式 API
 *
 * 提供程序化创建和管理消息的功能，支持多种调用方式和配置选项。
 * 可以通过函数调用的方式快速显示消息，无需在模板中声明组件。
 */

import { createApp, nextTick, type App } from "vue";
import type { MessageOptions, MessageInstance, MessageType, MessageComponentInstance } from "./types";
import MessageComponent from "./index.vue";

/**
 * 消息实例管理器
 *
 * 用于管理所有活跃的消息实例，提供统一的创建、销毁和查找功能。
 * 支持消息堆叠显示和最大数量限制。
 */
class MessageManager {
  /** 存储所有活跃的消息实例 */
  private instances: Map<string, MessageInstance> = new Map();

  /** 按位置分组的消息实例 */
  private instancesByPosition: Map<string, MessageInstance[]> = new Map();

  /** 消息实例计数器，用于生成唯一 ID */
  private counter = 0;

  /** 最大消息数量配置 */
  private maxCount = 3;

  /** 消息间距配置 */
  private messageGap = 12;

  /**
   * 创建消息实例
   *
   * @param options - 消息配置选项
   * @returns 消息实例
   */
  create(options: MessageOptions): MessageInstance {
    const position = options.position || "top";

    // 检查是否超过最大数量限制
    this.enforceMaxCount(position);

    // 生成唯一 ID
    const id = `vk-message-${Date.now()}-${++this.counter}`;

    // 消息选项，保持原始offset值，稍后通过updatePositionOffsets方法来控制堆叠位置
    const finalOptions = {
      ...options,
    };

    // 创建容器元素
    const container = document.createElement("div");
    container.id = id;
    document.body.appendChild(container);

    // 创建 Vue 应用实例
    const app = createApp(MessageComponent, {
      ...finalOptions,
      onDestroy: () => {
        this.destroy(id, app, container);
      },
    });

    // 挂载组件
    const vm = app.mount(container) as unknown as MessageComponentInstance;

    // 创建消息实例对象
    const instance: MessageInstance & { position?: string } = {
      id,
      position, // 存储位置信息以便销毁时使用
      vm, // 存储Vue组件实例
      close: () => {
        if (vm && typeof vm.close === "function") {
          vm.close();
        }
      },
    };

    // 存储实例
    this.instances.set(id, instance);
    this.addToPositionGroup(position, instance);

    return instance;
  }

  /**
   * 强制执行最大消息数量限制
   *
   * @param position - 消息位置
   */
  private enforceMaxCount(position: string) {
    const positionInstances = this.instancesByPosition.get(position) || [];

    // 如果当前位置的消息数量达到最大值，关闭最旧的消息（数组末尾）
    while (positionInstances.length >= this.maxCount) {
      const oldestInstance = positionInstances.pop();
      if (oldestInstance) {
        oldestInstance.close();
      }
    }
  }

  /**
   * 更新位置分组中所有消息的偏移量
   * 实现垂直堆叠效果，新消息在最上面
   *
   * @param position - 消息位置
   */
  private updatePositionOffsets(position: string) {
    const positionInstances = this.instancesByPosition.get(position) || [];

    positionInstances.forEach((instance, index) => {
      // 基础配置
      const baseOffset = 20; // 基础偏移量（距顶部或边缘）
      const messageHeight = 50; // 每个消息的基本高度
      const {messageGap} = this; // 消息之间的间距，使用类属性值

      // 计算垂直位置：新消息在顶部，后续消息向下堆叠
      // index=0的消息在顶部，index=1的消息在下方，以此类推
      const topPosition = baseOffset + index * (messageHeight + messageGap);

      // 通过Vue组件暴露的响应式currentOffset更新位置
      if (instance.vm && (instance.vm as any).currentOffset) {
        // 检查currentOffset是否是ref对象
        if (typeof (instance.vm as any).currentOffset === "object" && "value" in (instance.vm as any).currentOffset) {
          // 更新响应式的offset值，触发组件重新渲染
          (instance.vm as any).currentOffset.value = topPosition;
        } else {
          // 如果不是ref对象，直接赋值
          (instance.vm as any).currentOffset = topPosition;
        }
      }
    });
  }

  /**
   * 将消息实例添加到位置分组
   * 新消息插入到数组开头，确保最新消息显示在最上面
   *
   * @param position - 消息位置
   * @param instance - 消息实例
   */
  private addToPositionGroup(position: string, instance: MessageInstance) {
    if (!this.instancesByPosition.has(position)) {
      this.instancesByPosition.set(position, []);
    }
    // 将新消息插入到数组开头，确保最新消息在最上面
    this.instancesByPosition.get(position)!.unshift(instance);

    // 立即更新该位置所有消息的偏移量
    // 使用nextTick确保DOM已渲染，但不使用setTimeout避免延迟
    nextTick(() => {
      this.updatePositionOffsets(position);
    });
  }

  /**
   * 从位置分组中移除消息实例
   *
   * @param position - 消息位置
   * @param instanceId - 消息实例ID
   */
  private removeFromPositionGroup(position: string, instanceId: string) {
    const positionInstances = this.instancesByPosition.get(position);
    if (positionInstances) {
      const index = positionInstances.findIndex((instance) => instance.id === instanceId);
      if (index > -1) {
        positionInstances.splice(index, 1);
      }

      // 如果该位置没有消息了，清理空数组
      if (positionInstances.length === 0) {
        this.instancesByPosition.delete(position);
      } else {
        // 立即更新剩余消息的位置，确保DOM已更新
        nextTick(() => {
          this.updatePositionOffsets(position);
        });
      }
    }
  }

  /**
   * 销毁消息实例
   *
   * @param id - 消息 ID
   * @param app - Vue 应用实例
   * @param container - 容器元素
   */
  private destroy(id: string, app: App, container: HTMLElement) {
    const instance = this.instances.get(id);

    // 从实例管理器中移除
    this.instances.delete(id);

    // 从位置分组中移除
    if (instance && "position" in instance) {
      const position = instance.position as string;
      this.removeFromPositionGroup(position, id);
    }

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

  /**
   * 获取指定位置的消息数量
   *
   * @param position - 消息位置
   * @returns 该位置的消息数量
   */
  getCountByPosition(position: string): number {
    const positionInstances = this.instancesByPosition.get(position);
    return positionInstances ? positionInstances.length : 0;
  }

  /**
   * 设置最大消息数量
   *
   * @param maxCount - 最大消息数量
   */
  setMaxCount(maxCount: number) {
    this.maxCount = Math.max(1, maxCount); // 确保至少为1
  }

  /**
   * 获取最大消息数量
   *
   * @returns 最大消息数量
   */
  getMaxCount(): number {
    return this.maxCount;
  }

  /**
   * 设置消息间距
   *
   * @param gap - 消息间距（像素）
   */
  setMessageGap(gap: number) {
    this.messageGap = Math.max(0, gap); // 确保不为负数
  }

  /**
   * 获取消息间距
   *
   * @returns 消息间距（像素）
   */
  getMessageGap(): number {
    return this.messageGap;
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
  getCountByPosition: (position: string) => number;
  setMaxCount: (maxCount: number) => void;
  getMaxCount: () => number;
  setMessageGap: (gap: number) => void;
  getMessageGap: () => number;
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
Message.getCountByPosition = (position: string) => messageManager.getCountByPosition(position);
Message.setMaxCount = (maxCount: number) => messageManager.setMaxCount(maxCount);
Message.getMaxCount = () => messageManager.getMaxCount();
Message.setMessageGap = (gap: number) => messageManager.setMessageGap(gap);
Message.getMessageGap = () => messageManager.getMessageGap();

/**
 * 导出消息函数和相关类型
 */
export { Message, MessageManager };
export type { MessageFunction };
export default Message;
