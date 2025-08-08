import VkSpace from "./src/index.vue";
import { withInstall } from "@vakao-ui/utils";

export const _VkSpace = withInstall(VkSpace);
export { _VkSpace as VkSpace };
export default _VkSpace;
export * from "./src/types";