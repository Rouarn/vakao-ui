import VkMessage from "./src/index.vue";
import { withInstall } from "@vakao-ui/utils";
import { Message } from "./src/message";

export const _VkMessage = withInstall(VkMessage);
export { _VkMessage as VkMessage, Message };
export default _VkMessage;
export * from "./src/types";
export * from "./src/message";