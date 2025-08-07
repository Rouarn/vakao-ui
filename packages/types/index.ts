/**
 * Vakao UI 全局类型定义
 *
 * 定义了组件库中使用的所有全局类型，包括组件属性、安装类型、
 * 尺寸规范、颜色主题等。这些类型确保了整个组件库的类型一致性。
 *
 * @example
 * ```typescript
 * import type { ComponentSize, ComponentType, VakaoUIInstance } from '@vakao-ui/types';
 *
 * // 使用组件尺寸类型
 * const size: ComponentSize = 'medium';
 *
 * // 使用组件类型
 * const type: ComponentType = 'primary';
 * ```
 */

import type { App, Component, Plugin } from "vue";

/**
 * 提取组件的公共属性类型
 *
 * 从组件定义中提取公共属性类型，排除 Vue 组件内部属性。
 * 主要用于从 props 定义中提取类型，确保类型安全。
 *
 * @template T - 组件属性定义类型
 *
 * @example
 * ```typescript
 * const buttonProps = {
 *   type: { type: String, default: 'default' },
 *   size: { type: String, default: 'medium' }
 * } as const;
 *
 * type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>;
 * // 结果: { type: string; size: string }
 * ```
 */
export type ExtractPublicPropTypes<T> = Omit<T, keyof Component>;

/**
 * 单文件组件安装类型
 *
 * 为 Vue 单文件组件添加 install 方法，使其可以作为 Vue 插件使用。
 * 这是组件库中每个组件都需要具备的类型。
 *
 * @template T - 组件类型
 *
 * @example
 * ```typescript
 * import type { SFCWithInstall } from '@vakao-ui/types';
 * import Button from './Button.vue';
 *
 * const VkButton: SFCWithInstall<typeof Button> = Button;
 * VkButton.install = (app: App) => {
 *   app.component('VkButton', Button);
 * };
 * ```
 */
export type SFCWithInstall<T> = T & Plugin;

/**
 * Vakao UI 组件库实例接口
 *
 * 定义了组件库主实例的结构，包含版本信息和安装方法。
 * 用于组件库的主入口文件类型约束。
 *
 * @example
 * ```typescript
 * import type { VakaoUIInstance } from '@vakao-ui/types';
 *
 * const VakaoUI: VakaoUIInstance = {
 *   version: '1.0.0',
 *   install(app: App) {
 *     // 安装所有组件
 *   }
 * };
 * ```
 */
export interface VakaoUIInstance {
  /** 组件库版本号 */
  version: string;
  /** Vue 插件安装方法 */
  install: (_app: App, ..._options: unknown[]) => void;
}

/**
 * 组件尺寸类型
 *
 * 定义了组件库中所有组件支持的标准尺寸规格。
 * 确保所有组件的尺寸命名和视觉效果保持一致。
 *
 * 尺寸规范：
 * - small: 小尺寸，适用于紧凑布局
 * - medium: 中等尺寸，默认推荐尺寸
 * - large: 大尺寸，适用于重要操作
 *
 * @example
 * ```typescript
 * import type { ComponentSize } from '@vakao-ui/types';
 *
 * // 在组件 props 中使用
 * const props = {
 *   size: {
 *     type: String as PropType<ComponentSize>,
 *     default: 'medium'
 *   }
 * };
 * ```
 */
export type ComponentSize = "tiny" | "small" | "medium" | "large";

/**
 * 组件类型（主题色彩）
 *
 * 定义了组件库中所有组件支持的标准主题类型。
 * 每种类型对应不同的语义和视觉样式，确保界面的一致性和可读性。
 *
 * 类型说明：
 * - default: 默认样式，中性色调
 * - primary: 主要操作，品牌色调
 * - success: 成功状态，绿色系
 * - warning: 警告状态，橙色系
 * - info: 信息提示，蓝色系
 * - danger: 危险操作，红色系
 *
 * @example
 * ```typescript
 * import type { ComponentType } from '@vakao-ui/types';
 *
 * // 在组件 props 中使用
 * const props = {
 *   type: {
 *     type: String as PropType<ComponentType>,
 *     default: 'default'
 *   }
 * };
 *
 * // 在样式中使用
 * const buttonClass = computed(() => [
 *   'vk-button',
 *   `vk-button--${props.type}`
 * ]);
 * ```
 */
export type ComponentType = "default" | "primary" | "success" | "warning" | "info" | "danger" | "plain";

// ==================== 全局类型声明 ====================

/**
 * 导入全局 Vue 模块声明
 *
 * 确保所有组件的 GlobalComponents 接口声明被正确加载，
 * 提供完整的模板类型检查和智能提示支持。
 */
import "./global";
