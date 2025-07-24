import VkSwitch from './src/index.vue';
import { withInstall } from '@vakao-ui/utils';

export const _VkSwitch = withInstall(VkSwitch);
export { _VkSwitch as VkSwitch };
export default _VkSwitch;
export * from './src/types';

declare module 'vue' {
  export interface GlobalComponents {
    VkSwitch: typeof VkSwitch;
  }
}