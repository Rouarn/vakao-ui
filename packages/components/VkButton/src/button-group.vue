<template>
  <div class="vk-button-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "VkButtonGroup",
});
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
  border-top-left-radius: var(--border-radius-base);
  border-bottom-left-radius: var(--border-radius-base);
  margin-left: 0;
}

.vk-button-group :deep(.vk-button:last-child) {
  border-top-right-radius: var(--border-radius-base);
  border-bottom-right-radius: var(--border-radius-base);
}

.vk-button-group :deep(.vk-button:hover) {
  z-index: 1;
}

.vk-button-group :deep(.vk-button:focus) {
  z-index: 2;
}
</style>
