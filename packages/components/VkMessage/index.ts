import VkMessageComponent from "./src/index.vue";
import { withInstall } from "@vakao-ui/utils";
import { Message } from "./src/message";

// 将组件与函数式 API 合并
const _VkMessage = withInstall(VkMessageComponent);

// 将 Message 的所有方法绑定到 VkMessage 上
const VkMessage = Object.assign(Message, {
  install: _VkMessage.install,
});

export { VkMessage, Message };
export default VkMessage;
export * from "./src/types";
export * from "./src/message";
