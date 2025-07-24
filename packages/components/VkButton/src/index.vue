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
      <span class="vk-button__loading-indicator"></span>
    </span>
    <span
      v-if="icon && iconPosition === 'left'"
      class="vk-button__icon vk-button__icon--left"
    >
      <component v-if="typeof icon === 'object'" :is="icon" />
      <i v-else :class="icon"></i>
    </span>
    <span class="vk-button__content">
      <slot></slot>
    </span>
    <span
      v-if="icon && iconPosition === 'right'"
      class="vk-button__icon vk-button__icon--right"
    >
      <component v-if="typeof icon === 'object'" :is="icon" />
      <i v-else :class="icon"></i>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, useAttrs } from "vue";
import type { CSSProperties } from "vue";
import { buttonProps } from "./types";

export default defineComponent({
  name: "VkButton",
  inheritAttrs: false,
  props: buttonProps,
  emits: ["click"],
  setup(props, { emit }) {
    const attrs = useAttrs();
    
    const handleClick = (e: MouseEvent) => {
      if (!props.disabled && !props.loading) {
        emit("click", e);
      }
    };

    // 过滤掉 class 和 style 属性，其他属性正常传递
    const filteredAttrs = computed(() => {
      const { class: _, style: __, ...rest } = attrs;
      return rest;
    });

    // 合并样式，确保类型安全
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

    // 合并类名
    const mergedClass = computed(() => {
      return [
        'vk-button',
        `vk-button--${props.type}`,
        `vk-button--${props.size}`,
        {
          'is-disabled': props.disabled,
          'is-loading': props.loading,
          'is-plain': props.plain,
          'is-round': props.round,
          'is-circle': props.circle,
          'is-text': props.text,
          'is-link': props.link,
        },
        props.customClass,
        attrs.class,
      ];
    });

    return {
      handleClick,
      filteredAttrs,
      mergedStyle,
      mergedClass,
    };
  },
});
</script>
