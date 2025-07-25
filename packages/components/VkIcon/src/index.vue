<template>
  <span :class="mergedClass" :style="mergedStyle" v-bind="$attrs">
    <!-- 自定义图片 -->
    <img v-if="props.src" :src="props.src" alt="icon" class="vk-icon__image" />
    <!-- 默认插槽内容 -->
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNamespace } from "@vakao-ui/utils";
import type { VkIconProps } from "./types";

defineOptions({
  name: "VkIcon",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<VkIconProps>(), {
  size: "1em",
  color: "currentColor",
});

const ns = useNamespace("icon");

// 样式类名
const mergedClass = computed(() => {
  return [ns.block(), props.customClass];
});

// 合并样式
const mergedStyle = computed(() => {
  const baseStyle = {
    fontSize: typeof props.size === "number" ? `${props.size}px` : props.size,
    color: props.color,
  };

  if (typeof props.customStyle === "string") {
    return `${Object.entries(baseStyle)
      .map(
        ([key, value]) =>
          `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`
      )
      .join("; ")}; ${props.customStyle}`;
  }

  return {
    ...baseStyle,
    ...props.customStyle,
  };
});
</script>
