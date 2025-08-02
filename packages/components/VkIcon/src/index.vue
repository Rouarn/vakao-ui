<template>
  <span :class="mergedClass" :style="mergedStyle" v-bind="$attrs">
    <!-- 自定义图片 -->
    <img v-if="props.src" :src="props.src" alt="icon" :class="ns.element('image')" />
    <!-- Iconify 图标 -->
    <Icon v-else-if="props.icon" :icon="props.icon || ''" :class="ns.element('icon')" />
    <!-- 默认插槽内容 -->
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
/**
 * VkIcon 图标组件
 *
 * 一个灵活的图标组件，支持多种图标来源和样式定制。
 * 基于 Vue 3 Composition API 和 setup 语法糖构建。
 *
 * 主要特性：
 * - 支持 Iconify 图标库（数万个图标）
 * - 支持自定义图片图标
 * - 支持插槽自定义内容
 * - 灵活的尺寸和颜色配置
 * - 完整的 TypeScript 支持
 *
 * 渲染优先级：
 * 1. src 属性 - 渲染为 img 元素
 * 2. icon 属性 - 渲染为 Iconify 图标
 * 3. 默认插槽 - 渲染插槽内容
 *
 * @example
 * ```vue
 * <template>
 *   <!-- Iconify 图标 -->
 *   <VkIcon icon="mdi:home" size="24px" color="#409eff" />
 *
 *   <!-- 自定义图片 -->
 *   <VkIcon src="/logo.svg" size="32" />
 *
 *   <!-- 插槽内容 -->
 *   <VkIcon size="1.5em" color="red">
 *     <svg viewBox="0 0 24 24">...</svg>
 *   </VkIcon>
 * </template>
 * ```
 */
import { computed } from "vue";
import { useNamespace } from "@vakao-ui/utils";
import type { VkIconProps } from "./types";
import { Icon } from "@iconify/vue";

// 组件配置
defineOptions({
  name: "VkIcon",
  inheritAttrs: false, // 禁用属性继承，手动控制属性传递
});

// 组件属性定义和默认值
const props = withDefaults(defineProps<VkIconProps>(), {
  size: "1em", // 默认大小为 1em，继承父元素字体大小
  color: "currentColor", // 默认颜色为当前文字颜色
});

// 获取命名空间工具
const ns = useNamespace("icon");

/**
 * 合并 CSS 类名
 *
 * 将组件的基础类名与用户自定义类名合并，
 * 使用 BEM 命名规范确保样式的模块化。
 */
const mergedClass = computed(() => {
  return [ns.block(), props.customClass];
});

/**
 * 合并样式
 *
 * 将组件的基础样式（尺寸和颜色）与用户自定义样式合并。
 * 支持字符串和对象两种格式的自定义样式。
 */
const mergedStyle = computed(() => {
  // 基础样式：尺寸和颜色
  const baseStyle = {
    fontSize: typeof props.size === "number" ? `${props.size}px` : props.size,
    color: props.color,
  };

  // 如果自定义样式是字符串格式，需要转换并合并
  if (typeof props.customStyle === "string") {
    return `${Object.entries(baseStyle)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`)
      .join("; ")}; ${props.customStyle}`;
  }

  // 如果自定义样式是对象格式，直接合并
  return {
    ...baseStyle,
    ...props.customStyle,
  };
});
</script>
