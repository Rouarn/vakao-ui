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
