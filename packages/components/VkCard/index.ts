import VkCard from "./src/index.vue";
import { withInstall } from "@vakao-ui/utils";

export const _VkCard = withInstall(VkCard);
export { _VkCard as VkCard };
export default _VkCard;
export * from "./src/types";