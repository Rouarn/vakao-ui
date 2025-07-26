import VkMessageBoxComponent from "./src/index.vue";
import { VkMessageBox as MessageBoxService } from "./src/message-box";
import { withInstall } from "@vakao-ui/utils";

// 组件安装
const VkMessageBox = withInstall(VkMessageBoxComponent);

// 将服务方法添加到组件上
VkMessageBox.alert = MessageBoxService.alert;
VkMessageBox.confirm = MessageBoxService.confirm;
VkMessageBox.prompt = MessageBoxService.prompt;
VkMessageBox.close = MessageBoxService.close;

export { VkMessageBox };
export default VkMessageBox;

// 导出类型
export * from "./src/types";
