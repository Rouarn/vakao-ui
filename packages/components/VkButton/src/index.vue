<template>
  <button
    v-bind="filteredAttrs"
    :class="mergedClass"
    :style="mergedStyle"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="vk-button__loading">
      <span class="vk-button__loading-indicator" />
    </span>
    <span
      v-if="icon && iconPosition === 'left'"
      class="vk-button__icon vk-button__icon--left"
    >
      <component :is="icon" v-if="typeof icon === 'object'" />
      <VkIcon
        v-else-if="typeof icon === 'string'"
        :size="iconSize"
        :src="isUrl(icon) ? icon : undefined"
        :icon="!isUrl(icon) ? icon : undefined"
      />
    </span>
    <span class="vk-button__content">
      <slot />
    </span>
    <span
      v-if="icon && iconPosition === 'right'"
      class="vk-button__icon vk-button__icon--right"
    >
      <component :is="icon" v-if="typeof icon === 'object'" />
      <VkIcon
        v-else-if="typeof icon === 'string'"
        :size="iconSize"
        :src="isUrl(icon) ? icon : undefined"
        :icon="!isUrl(icon) ? icon : undefined"
      />
    </span>
  </button>
</template>

<script lang="ts">
/**
 * VkButton 按钮组件
 *
 * 一个功能丰富的按钮组件，支持多种样式、状态和配置选项。
 * 基于 Vue 3 Composition API 构建，提供完整的 TypeScript 支持。
 *
 * 主要特性：
 * - 多种按钮类型和尺寸
 * - 支持图标和加载状态
 * - 灵活的样式定制
 * - 完整的无障碍支持
 * - 响应式设计
 *
 * @example
 * ```vue
 * <template>
 *   <VkButton type="primary" size="large" :loading="isLoading" @click="handleClick">
 *     提交
 *   </VkButton>
 * </template>
 * ```
 */
import { defineComponent, computed, useAttrs } from "vue";
import type { CSSProperties } from "vue";
import { buttonProps, buttonEmits } from "./types";
import { useNamespace, isUrl } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "VkButton",
  components: {
    VkIcon,
    Icon,
  },
  inheritAttrs: false,
  props: buttonProps,
  emits: buttonEmits,
  setup(props, { emit }) {
    // 获取组件属性和命名空间工具
    const attrs = useAttrs();
    const ns = useNamespace("button");

    /**
     * 处理按钮点击事件
     *
     * 只有在按钮非禁用且非加载状态下才会触发点击事件，
     * 确保用户交互的一致性和可预期性。
     *
     * @param e - 鼠标点击事件对象
     */
    const handleClick = (e: MouseEvent) => {
      if (!props.disabled && !props.loading) {
        emit("click", e);
      }
    };

    /**
     * 过滤属性
     *
     * 从 attrs 中过滤掉 class 和 style 属性，避免与组件内部的
     * 样式合并逻辑冲突，其他属性正常传递给根元素。
     */
    const filteredAttrs = computed(() => {
      const { class: _, style: __, ...rest } = attrs;
      return rest;
    });

    /**
     * 合并样式
     *
     * 将组件的 customStyle 属性和父组件传递的 style 属性合并，
     * 支持字符串和对象两种格式，确保类型安全。
     */
    const mergedStyle = computed(() => {
      const styles: (string | CSSProperties | undefined)[] = [];
      if (props.customStyle) {
        styles.push(props.customStyle);
      }
      if (attrs.style) {
        styles.push(attrs.style as string | CSSProperties);
      }
      return styles.filter(Boolean);
    });

    /**
     * 合并类名
     *
     * 根据组件的各种属性和状态生成完整的 CSS 类名列表，
     * 使用 BEM 命名规范，确保样式的模块化和可维护性。
     */
    const mergedClass = computed(() => {
      return [
        ns.block(), // 基础块类名：vk-button
        ns.modifier("type", props.type), // 类型修饰符：vk-button--primary
        ns.modifier("size", props.size), // 尺寸修饰符：vk-button--large
        ns.is("disabled", props.disabled), // 状态类名：is-disabled
        ns.is("loading", props.loading), // 加载状态：is-loading
        ns.is("plain", props.plain), // 朴素样式：is-plain
        ns.is("round", props.round), // 圆角样式：is-round
        ns.is("circle", props.circle), // 圆形样式：is-circle
        ns.is("text", props.text), // 文本样式：is-text
        ns.is("link", props.link), // 链接样式：is-link
        props.customClass, // 自定义类名
        attrs.class, // 父组件传递的类名
      ];
    });

    /**
     * 图标尺寸计算
     *
     * 根据按钮尺寸自动计算合适的图标大小，
     * 确保图标与按钮的视觉比例协调。
     */
    const iconSize = computed(() => {
      const sizeMap = {
        small: "14px",
        medium: "16px",
        large: "18px",
      };
      return sizeMap[props.size] || "16px";
    });

    return {
      handleClick,
      filteredAttrs,
      mergedStyle,
      mergedClass,
      iconSize,
      isUrl,
    };
  },
});
</script>
