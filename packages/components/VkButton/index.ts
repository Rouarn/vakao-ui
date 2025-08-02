import VkButton from "./src/index.vue";
import VkButtonGroup from "./src/button-group.vue";
import { withInstall } from "@vakao-ui/utils";

export const _VkButton = withInstall(VkButton);
export const _VkButtonGroup = withInstall(VkButtonGroup);
export { _VkButton as VkButton, _VkButtonGroup as VkButtonGroup };
export default _VkButton;
export * from "./src/types.ts";
