/**
 * Vakao UI 全局类型声明文件
 *
 * 统一管理所有组件的 Vue 模块声明，避免在每个组件的 index.ts 文件中重复声明。
 * 这种方式提供了更好的维护性和一致性。
 *
 * 当添加新组件时，只需要在此文件中添加对应的 GlobalComponents 声明即可。
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// 导入所有组件类型
import type { DefineComponent } from "vue";

// 导入组件实例类型（用于类型推导）
import type VkAvatar from "../components/VkAvatar/src/index.vue";
import type VkBadge from "../components/VkBadge/src/index.vue";
import type VkButton from "../components/VkButton/src/index.vue";
import type VkButtonGroup from "../components/VkButton/src/button-group.vue";
import type VkCard from "../components/VkCard/src/index.vue";
import type VkCheckbox from "../components/VkCheckbox/src/index.vue";
import type VkCheckboxGroup from "../components/VkCheckbox/src/checkbox-group.vue";
import type VkDivider from "../components/VkDivider/src/index.vue";
import type VkIcon from "../components/VkIcon/src/index.vue";
import type VkImage from "../components/VkImage/src/index.vue";
import type VkSpace from "../components/VkSpace/src/index.vue";
import type VkInput from "../components/VkInput/src/index.vue";
import type VkMessageBox from "../components/VkMessageBox/src/index.vue";
import type VkRadio from "../components/VkRadio/src/index.vue";
import type VkRadioGroup from "../components/VkRadio/src/radio-group.vue";
import type VkSelect from "../components/VkSelect/src/index.vue";
import type VkOption from "../components/VkSelect/src/option.vue";
import type VkOptionGroup from "../components/VkSelect/src/option-group.vue";
import type VkSwitch from "../components/VkSwitch/src/index.vue";
import type VkTag from "../components/VkTag/src/index.vue";

/**
 * Vue 模块声明扩展
 *
 * 扩展 Vue 的 GlobalComponents 接口，使所有 Vakao UI 组件在模板中
 * 可以被正确识别和类型检查，无需手动导入。
 *
 * 这样配置后，在 Vue 模板中使用组件时会有完整的类型提示和检查：
 *
 * @example
 * ```vue
 * <template>
 *   <!-- 这些组件都会有完整的类型提示 -->
 *   <VkButton type="primary">按钮</VkButton>
 *   <VkInput v-model="value" placeholder="请输入" />
 *   <VkIcon icon="mdi:home" />
 * </template>
 * ```
 */
declare module "vue" {
  export interface GlobalComponents {
    // 基础组件
    VkAvatar: typeof VkAvatar;
    VkBadge: typeof VkBadge;
    VkButton: typeof VkButton;
    VkButtonGroup: typeof VkButtonGroup;
    VkCard: typeof VkCard;
    VkDivider: typeof VkDivider;
    VkIcon: typeof VkIcon;
    VkImage: typeof VkImage;
    VkInput: typeof VkInput;
    VkTag: typeof VkTag;
    VkSpace: typeof VkSpace;

    // 表单组件
    VkCheckbox: typeof VkCheckbox;
    VkCheckboxGroup: typeof VkCheckboxGroup;
    VkRadio: typeof VkRadio;
    VkRadioGroup: typeof VkRadioGroup;
    VkSelect: typeof VkSelect;
    VkOption: typeof VkOption;
    VkOptionGroup: typeof VkOptionGroup;
    VkSwitch: typeof VkSwitch;

    // 反馈组件
    VkMessageBox: typeof VkMessageBox;
  }
}

/**
 * 导出空对象以确保此文件被识别为模块
 *
 * TypeScript 要求声明文件要么有顶级的 import/export 语句，
 * 要么被识别为全局声明文件。这里导出一个空对象确保模块化。
 */
export {};
