import VkCheckbox from './src/index.vue';
import VkCheckboxGroup from './src/checkbox-group.vue';
import { withInstall } from '@vakao-ui/utils';

export const _VkCheckbox = withInstall(VkCheckbox);
export const _VkCheckboxGroup = withInstall(VkCheckboxGroup);
export { _VkCheckbox as VkCheckbox, _VkCheckboxGroup as VkCheckboxGroup };
export default _VkCheckbox;
export * from './src/types.ts';

declare module 'vue' {
  export interface GlobalComponents {
    VkCheckbox: typeof VkCheckbox;
    VkCheckboxGroup: typeof VkCheckboxGroup;
  }
}
