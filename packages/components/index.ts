// Export all components
export * from "./VkButton";
export * from "./VkInput";
export * from "./VkCheckbox";
export * from "./VkSwitch";
export * from "./VkIcon";
// Add more component exports here as they are created

import { App } from "vue";
import { VkButton, VkButtonGroup } from "./VkButton";
import { VkInput } from "./VkInput";
import { VkCheckbox, VkCheckboxGroup } from "./VkCheckbox";
import { VkSwitch } from "./VkSwitch";
import { VkIcon } from "./VkIcon";
import { installAll } from "@vakao-ui/utils";

// 组件列表
const components = {
  VkButton: VkButton,
  VkButtonGroup: VkButtonGroup,
  VkInput: VkInput,
  VkCheckbox: VkCheckbox,
  VkCheckboxGroup: VkCheckboxGroup,
  VkSwitch: VkSwitch,
  VkIcon: VkIcon,
};

// 导出组件库插件
export default {
  install(app: App) {
    installAll(app, components);
  },
};
