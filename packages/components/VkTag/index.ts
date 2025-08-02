import VkTag from "./src/index.vue";
import { withInstall } from "@vakao-ui/utils";

export const _VkTag = withInstall(VkTag);
export { _VkTag as VkTag };
export default _VkTag;
export * from "./src/types.ts";

// Vue 模块声明已统一移至 @vakao-ui/types/global.d.ts 文件中管理
