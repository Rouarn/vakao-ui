// Export all components
export * from "./VkButton";
// Add more component exports here as they are created

import { App } from "vue";
import { VkButton, VkButtonGroup } from "./VkButton";
import { installAll } from "@vakao-ui/utils";

// 组件列表
const components = {
  VkButton: VkButton,
  VkButtonGroup: VkButtonGroup,
};

// 导出组件库插件
export default {
  install(app: App) {
    installAll(app, components);
  },
};
