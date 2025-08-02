import VkAvatar from "./src/index.vue";
import { withInstall } from "@vakao-ui/utils";

export const _VkAvatar = withInstall(VkAvatar);
export { _VkAvatar as VkAvatar };
export default _VkAvatar;
export * from "./src/types.ts";
