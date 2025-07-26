import VkIcon from './src/index.vue';
import { withInstall } from '@vakao-ui/utils';

export const _VkIcon = withInstall(VkIcon);
export { _VkIcon as VkIcon };
export default _VkIcon;
export * from './src/types';

declare module 'vue' {
  export interface GlobalComponents {
    VkIcon: typeof VkIcon;
  }
}
