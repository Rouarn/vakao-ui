<template>
  <!-- 
    头像组件模板结构
    
    主要元素：
    - 根容器：包含头像内容
    - 图片：当提供src时显示
    - 图标：当提供icon且没有图片或图片加载失败时显示
    - 文本：当没有图片和图标，或图片加载失败时显示
  -->
  <div
    :class="[ns.block(), ns.modifier(String(shape)), ns.modifier(String(size)), ns.is('clickable', clickable)]"
    :style="avatarStyle"
    @click="handleClick"
  >
    <!-- 图片 -->
    <img
      v-if="src && !isImageLoadError"
      :src="src"
      :alt="alt"
      :class="ns.element('img')"
      :loading="lazy ? 'lazy' : 'eager'"
      :style="imgStyle"
      @error="handleError"
      @load="handleLoad"
    />

    <!-- 图标 -->
    <VkIcon v-else-if="icon" :icon="icon" :class="ns.element('icon')" :color="iconColor" :size="computedIconSize" />

    <!-- 文本 -->
    <span v-else-if="(hasContent || isImageLoadError) && displayText" :class="ns.element('text')" :style="{ color }">
      {{ displayText }}
    </span>

    <!-- 默认插槽 -->
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
/**
 * VkAvatar 头像组件
 *
 * 头像组件用于展示用户或事物的头像，支持图片、图标和文字三种显示方式。
 * 可用于用户头像、项目图标等场景。
 *
 * 主要特性：
 * - 支持图片、图标和文字三种显示方式
 * - 支持圆形和方形两种形状
 * - 支持多种尺寸和自定义大小
 * - 支持图片加载失败时的回退显示
 * - 支持自定义颜色和边框
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 图片头像 -->
 *   <VkAvatar src="/path/to/avatar.jpg" />
 *
 *   <!-- 图标头像 -->
 *   <VkAvatar icon="user" />
 *
 *   <!-- 文字头像 -->
 *   <VkAvatar>张</VkAvatar>
 *
 *   <!-- 自定义样式 -->
 *   <VkAvatar
 *     size="large"
 *     shape="square"
 *     background-color="#6554C0"
 *     color="#ffffff"
 *   >
 *     VK
 *   </VkAvatar>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, ref, useSlots } from "vue";
/** 组件属性和事件定义 */
import { avatarProps, avatarEmits } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "../../../utils/modules/namespace";
/** 图标组件 */
import { VkIcon } from "../../VkIcon";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkAvatar",
  inheritAttrs: false,
});

/** 组件属性定义 */
const props = defineProps(avatarProps);

/** 组件事件定义 */
const emit = defineEmits(avatarEmits);

// ==================== 内部状态 ====================

/** 图片加载状态 */
const isImageLoadError = ref(false);

/** 插槽 */
const slots = useSlots();

// ==================== 计算属性 ====================

/**
 * CSS 命名空间
 *
 * 生成组件的 CSS 类名前缀，确保样式隔离。
 */
const ns = useNamespace("avatar");

/**
 * 头像样式对象
 *
 * 合并所有样式属性
 */
const avatarStyle = computed(() => {
  const style: Record<string, string> = {};

  // 添加尺寸样式
  if (typeof props.size === "number") {
    style.width = `${props.size}px`;
    style.height = `${props.size}px`;
    style.lineHeight = `${props.size}px`;
    style.fontSize = `${Math.floor(Number(props.size) / 2)}px`;
  }

  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor;
  }

  if (props.border) {
    style.border = props.border;
  }

  return style;
});

/**
 * 图片样式对象
 *
 * 设置图片的适应方式
 */
const imgStyle = computed(() => {
  return {
    objectFit: props.fit as "fill" | "contain" | "cover" | "none" | "scale-down",
  };
});

/**
 * 计算图标大小
 *
 * 如果未指定图标大小，则根据头像尺寸计算
 */
const computedIconSize = computed(() => {
  if (props.iconSize) {
    return props.iconSize;
  }

  if (typeof props.size === "number") {
    return Math.floor(props.size / 2);
  }

  // 预设尺寸的图标大小
  const sizeMap = {
    large: 24,
    default: 16,
    small: 12,
  };

  return sizeMap[props.size as "large" | "default" | "small"] || 16;
});

/**
 * 是否有内容
 *
 * 检查是否有文本内容可显示
 */
const hasContent = computed(() => {
  return slots.default || props.alt || props.fallback;
});

/**
 * 显示文本
 *
 * 确定要显示的文本内容
 */
const displayText = computed(() => {
  // 如果图片加载失败且有回退内容，则显示回退内容
  if (isImageLoadError.value && props.fallback) {
    return props.fallback;
  }

  // 如果有默认插槽，获取插槽内容
  if (slots.default) {
    const slotContent = slots.default()[0]?.children;
    if (typeof slotContent === "string") {
      return slotContent;
    }
  }

  // 如果有替代文本，显示替代文本
  if (props.alt) {
    return props.alt;
  }

  return "";
});

// ==================== 事件处理 ====================

/**
 * 处理图片加载错误
 *
 * 当图片加载失败时触发
 *
 * @param event - 错误事件对象
 */
const handleError = (event: Event) => {
  isImageLoadError.value = true;
  emit("error", event);
};

/**
 * 处理图片加载成功
 *
 * 当图片加载成功时触发
 *
 * @param event - 加载事件对象
 */
const handleLoad = (event: Event) => {
  isImageLoadError.value = false;
  emit("load", event);
};

/**
 * 处理点击事件
 *
 * 当头像被点击时触发
 *
 * @param event - 鼠标事件对象
 */
const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};
</script>
