/**
 * Vakao UI 组件库主入口文件
 *
 * 这是整个组件库的核心入口，负责统一导出所有功能模块：
 * - 组件库：所有 UI 组件及其类型定义
 * - 工具函数：通用工具和辅助函数
 * - 组合式函数：可复用的 Vue 3 Hooks
 * - 样式文件：完整的主题样式系统
 * - 解析器：用于按需导入的解析器
 * - 服务 API：如 MessageBox 等函数式调用
 *
 * 使用方式：
 *
 * 完整导入：
 * ```typescript
 * import { createApp } from 'vue';
 * import VakaoUI from 'vakao-ui';
 * import 'vakao-ui/style.css';
 *
 * const app = createApp(App);
 * app.use(VakaoUI);
 * ```
 *
 * 按需导入：
 * ```typescript
 * import { VkButton, VkInput, useToggle, deepClone } from 'vakao-ui';
 * ```
 *
 * 函数式调用：
 * ```typescript
 * import { VkMessageBox } from 'vakao-ui';
 *
 * VkMessageBox.alert('提示信息');
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

import type { App } from 'vue';

// ==================== 核心模块导入 ====================

/** 导入所有组件的安装插件 */
import components from './components';

/** 导入完整的样式系统 */
import './styles/index.scss';

// ==================== 功能模块导出 ====================

/**
 * 工具函数模块
 *
 * 导出所有通用工具函数，包括：
 * - 组件安装工具：withInstall
 * - 数据处理工具：deepClone, isEqual
 * - 日期处理工具：formatDate
 * - CSS 命名空间工具：useNamespace
 * - URL 处理工具：isUrl
 * - 受控组件工具：useControlled
 */
export * from './utils';

/**
 * 组合式函数模块
 *
 * 导出所有可复用的 Vue 3 Hooks，包括：
 * - 状态管理：useToggle, useCounter
 * - 数据持久化：useLocalStorage
 * - 性能优化：useDebounce, useThrottle
 * - 网络请求：useFetch
 */
export * from './hooks';

/**
 * 组件模块
 *
 * 导出所有 UI 组件及其类型定义，包括：
 * - 基础组件：VkButton, VkIcon, VkInput
 * - 表单组件：VkCheckbox, VkRadio, VkSwitch, VkSelect
 * - 反馈组件：VkMessageBox
 * - 组合组件：VkButtonGroup, VkCheckboxGroup, VkRadioGroup
 */
export * from './components';

/**
 * 解析器模块
 *
 * 导出用于构建工具的组件解析器，支持：
 * - Vite 插件按需导入
 * - Webpack 插件按需导入
 * - 自动样式导入
 */
export * from './resolver';

// ==================== 服务 API 导出 ====================

/**
 * MessageBox 服务
 *
 * 导出 MessageBox 的函数式调用 API，支持：
 * - alert: 警告弹窗
 * - confirm: 确认弹窗
 * - prompt: 输入弹窗
 *
 * @example
 * ```typescript
 * import { VkMessageBox } from 'vakao-ui';
 *
 * // 警告弹窗
 * VkMessageBox.alert('操作成功！');
 *
 * // 确认弹窗
 * const result = await VkMessageBox.confirm('确定要删除吗？');
 * if (result) {
 *   // 用户点击确定
 * }
 * ```
 */
export { VkMessageBox } from './components/VkMessageBox/src/message-box';

// ==================== 默认插件导出 ====================

/**
 * Vakao UI 默认插件
 *
 * 提供完整的组件库安装功能，一次性注册所有组件。
 * 这是推荐的全量导入方式，适用于大多数项目场景。
 *
 * 安装后的功能：
 * - 全局注册所有 UI 组件
 * - 自动加载完整样式系统
 * - 提供完整的 TypeScript 类型支持
 *
 * @example
 * ```typescript
 * import { createApp } from 'vue';
 * import VakaoUI from 'vakao-ui';
 * import 'vakao-ui/style.css';
 *
 * const app = createApp(App);
 * app.use(VakaoUI); // 安装组件库
 * app.mount('#app');
 * ```
 *
 * 安装后可直接在模板中使用：
 * ```vue
 * <template>
 *   <VkButton type="primary">主要按钮</VkButton>
 *   <VkInput v-model="value" placeholder="请输入" />
 *   <VkIcon icon="mdi:home" />
 * </template>
 * ```
 */
export default {
  /**
   * Vue 插件安装方法
   *
   * @param app - Vue 应用实例
   */
  install(app: App) {
    app.use(components);
  },
};
