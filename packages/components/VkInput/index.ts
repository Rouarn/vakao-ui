import VkInput from './src/index.vue';
import { withInstall } from '@vakao-ui/utils';

export const _VkInput = withInstall(VkInput);
export { _VkInput as VkInput };
export default _VkInput;
export * from './src/types.ts';

declare module 'vue' {
  export interface GlobalComponents {
    VkInput: typeof VkInput;
  }
}
