import VkMessageBoxComponent from "./src/index.vue";
import { VkMessageBox as MessageBoxService } from "./src/message-box";
import { withInstall } from "@vakao-ui/utils";

// 组件安装
const VkMessageBoxComponentWithInstall = withInstall(VkMessageBoxComponent);

// 将服务方法添加到组件上
VkMessageBoxComponentWithInstall.alert = MessageBoxService.alert;
VkMessageBoxComponentWithInstall.confirm = MessageBoxService.confirm;
VkMessageBoxComponentWithInstall.prompt = MessageBoxService.prompt;
VkMessageBoxComponentWithInstall.close = MessageBoxService.close;

// 导出服务（用于函数式调用）
export { MessageBoxService as VkMessageBox };
// 导出组件（用于模板使用）
export { VkMessageBoxComponentWithInstall as VkMessageBoxComponent };
export default VkMessageBoxComponentWithInstall;

// 导出类型
export * from "./src/types";
