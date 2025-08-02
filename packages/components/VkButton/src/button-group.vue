<template>
  <div :class="ns.block()">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from "@vakao-ui/utils";

defineOptions({
  name: "VkButtonGroup",
});

const ns = useNamespace("button-group");
</script>

<style scoped>
.vk-button-group {
  display: inline-flex;
  vertical-align: middle;
}

.vk-button-group :deep(.vk-button) {
  border-radius: 0;
  margin-left: -1px;
}

.vk-button-group :deep(.vk-button:first-child) {
  border-top-left-radius: var(--vk-border-radius-base);
  border-bottom-left-radius: var(--vk-border-radius-base);
  margin-left: 0;
}

.vk-button-group :deep(.vk-button:last-child) {
  border-top-right-radius: var(--vk-border-radius-base);
  border-bottom-right-radius: var(--vk-border-radius-base);
}

.vk-button-group :deep(.vk-button:hover) {
  z-index: 1;
}

.vk-button-group :deep(.vk-button:focus) {
  z-index: 2;
}
</style>
