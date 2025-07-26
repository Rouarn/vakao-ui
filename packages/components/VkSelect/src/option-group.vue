<template>
  <li :class="ns.block()">
    <div :class="ns.element('title')">
      {{ label }}
    </div>
    <ul :class="ns.element('list')">
      <slot />
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, provide, computed } from 'vue';
import { optionGroupProps, optionGroupEmits } from './types';
import { useNamespace } from '@vakao-ui/utils';

export default defineComponent({
  name: 'VkOptionGroup',
  props: optionGroupProps,
  emits: optionGroupEmits,
  setup(props) {
    const ns = useNamespace('select-option-group');

    // 提供给子选项的分组信息
    provide('VkOptionGroup', {
      disabled: computed(() => props.disabled),
    });

    return {
      ns,
    };
  },
});
</script>
