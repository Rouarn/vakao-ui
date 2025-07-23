// Export all components
export * from "./VKButton";
// Add more component exports here as they are created

import { App } from "vue";
import { VKButton } from "./VKButton";
import { installAll } from "@vakao-ui/utils";

// 组件列表
const components = {
  VKButton: VKButton,
};

// 导出组件库插件
export default {
  install(app: App) {
    installAll(app, components);
  },
};
