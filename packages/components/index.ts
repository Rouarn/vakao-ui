/**
 * Vakao UI 组件库主入口文件
 *
 * 这是组件库的核心导出文件，负责：
 * 1. 导出所有组件的类型定义和组件实例
 * 2. 提供完整的 Vue 插件安装功能
 * 3. 支持按需导入和全量导入两种使用方式
 *
 * 使用方式：
 *
 * 全量导入：
 * ```typescript
 * import { createApp } from 'vue';
 * import VakaoUI from '@vakao-ui/components';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 * app.use(VakaoUI);
 * ```
 *
 * 按需导入：
 * ```typescript
 * import { VkButton, VkInput, VkIcon } from '@vakao-ui/components';
 *
 * // 在组件中使用
 * export default {
 *   components: {
 *     VkButton,
 *     VkInput,
 *     VkIcon,
 *   },
 * };
 * ```
 */

// ==================== 组件导出 ====================
// 导出所有组件的类型定义和组件实例，支持按需导入

/** 按钮相关组件 */
export * from "./VkButton";

/** 输入相关组件 */
export * from "./VkInput";

/** 选择相关组件 */
export * from "./VkCheckbox";
export * from "./VkRadio";
export * from "./VkSwitch";
export * from "./VkSelect";

/** 通用组件 */
export * from "./VkIcon";
export * from "./VkAvatar";
export * from "./VkBadge";
export * from "./VkCard";
export * from "./VkDivider";
export * from "./VkTag";
export * from "./VkSpace";

/** 反馈相关组件 */
export * from "./VkMessage";
export * from "./VkMessageBox";
export * from "./VkTooltip";

// 注意：新增组件时请在此处添加导出

// ==================== 插件安装 ====================

import type { App } from "vue";
import { VkButton, VkButtonGroup } from "./VkButton";
import { VkInput } from "./VkInput";
import { VkCheckbox, VkCheckboxGroup } from "./VkCheckbox";
import { VkRadio, VkRadioGroup } from "./VkRadio";
import { VkSwitch } from "./VkSwitch";
import { VkIcon } from "./VkIcon";
import { VkImage } from "./VkImage";
import { VkAvatar } from "./VkAvatar";
import { VkBadge } from "./VkBadge";
import { VkCard } from "./VkCard";
import { VkDivider } from "./VkDivider";
import { VkTag } from "./VkTag";
import { VkMessage } from "./VkMessage";
import { VkMessageBox } from "./VkMessageBox";
import { VkSelect, VkOption, VkOptionGroup } from "./VkSelect";
import { VkTooltip } from "./VkTooltip";
import { VkSpace } from "./VkSpace";
import { installAll } from "@vakao-ui/utils";

/**
 * 组件注册列表
 *
 * 包含所有需要全局注册的组件，用于插件安装时批量注册。
 * 组件名称作为 key，组件实例作为 value。
 */
const components = {
  // 按钮组件
  VkButton,
  VkButtonGroup,

  // 输入组件
  VkInput,

  // 选择组件
  VkCheckbox,
  VkCheckboxGroup,
  VkRadio,
  VkRadioGroup,
  VkSwitch,
  VkSelect,
  VkOption,
  VkOptionGroup,

  // 通用组件
  VkIcon,
  VkImage,
  VkAvatar,
  VkBadge,
  VkCard,
  VkDivider,
  VkTag,

  // 反馈组件
  VkMessage,
  VkMessageBox,
  VkTooltip,

  // 布局组件
  VkSpace,
};

/**
 * Vakao UI 组件库 Vue 插件
 *
 * 提供完整的组件库安装功能，一次性注册所有组件到 Vue 应用实例。
 * 安装后可以在任何组件中直接使用所有 Vakao UI 组件。
 *
 * @example
 * ```typescript
 * import { createApp } from 'vue';
 * import VakaoUI from '@vakao-ui/components';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 * app.use(VakaoUI); // 安装组件库
 * app.mount('#app');
 * ```
 *
 * 安装后的使用：
 * ```vue
 * <template>
 *   <VkButton type="primary">主要按钮</VkButton>
 *   <VkInput v-model="value" placeholder="请输入内容" />
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
    installAll(app, components);
  },
};
