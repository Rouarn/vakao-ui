import VkSelect from './src/index.vue';
import VkOption from './src/option.vue';
import VkOptionGroup from './src/option-group.vue';
import { withInstall } from '@vakao-ui/utils';

export const _VkSelect = withInstall(VkSelect);
export const _VkOption = withInstall(VkOption);
export const _VkOptionGroup = withInstall(VkOptionGroup);
export {
  _VkSelect as VkSelect,
  _VkOption as VkOption,
  _VkOptionGroup as VkOptionGroup,
};
export default _VkSelect;
export * from './src/types';

declare module 'vue' {
  export interface GlobalComponents {
    VkSelect: typeof VkSelect;
    VkOption: typeof VkOption;
    VkOptionGroup: typeof VkOptionGroup;
  }
}
