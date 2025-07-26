import VkRadio from './src/index.vue';
import VkRadioGroup from './src/radio-group.vue';
import { withInstall } from '@vakao-ui/utils';

export const _VkRadio = withInstall(VkRadio);
export const _VkRadioGroup = withInstall(VkRadioGroup);
export { _VkRadio as VkRadio, _VkRadioGroup as VkRadioGroup };
export default _VkRadio;
export * from './src/types.ts';

declare module 'vue' {
  export interface GlobalComponents {
    VkRadio: typeof VkRadio;
    VkRadioGroup: typeof VkRadioGroup;
  }
}
