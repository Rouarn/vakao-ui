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
      <vk-icon v-else-if="typeof icon === 'string'" :size="iconSize">
        <Icon :icon="icon" />
      </vk-icon>
    </span>
    <span class="vk-button__content">
      <slot></slot>
    </span>
    <span
      v-if="icon && iconPosition === 'right'"
      class="vk-button__icon vk-button__icon--right"
    >
      <component v-if="typeof icon === 'object'" :is="icon" />
      <vk-icon v-else-if="typeof icon === 'string'" :size="iconSize">
        <Icon :icon="icon" />
      </vk-icon>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, useAttrs } from "vue";
import type { CSSProperties } from "vue";
import { buttonProps } from "./types";
import { useNamespace } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "VkButton",
  inheritAttrs: false,
  components: {
    VkIcon,
    Icon
  },
  props: buttonProps,
  emits: ["click"],
  setup(props, { emit }) {
    const attrs = useAttrs();
    const ns = useNamespace('button');
    
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
        ns.block(),
        ns.modifier('type', props.type),
        ns.modifier('size', props.size),
        ns.is('disabled', props.disabled),
        ns.is('loading', props.loading),
        ns.is('plain', props.plain),
        ns.is('round', props.round),
        ns.is('circle', props.circle),
        ns.is('text', props.text),
        ns.is('link', props.link),
        props.customClass,
        attrs.class,
      ];
    });

    // 图标尺寸
    const iconSize = computed(() => {
      const sizeMap = {
        small: '14px',
        medium: '16px',
        large: '18px'
      };
      return sizeMap[props.size] || '16px';
    });

    return {
      handleClick,
      filteredAttrs,
      mergedStyle,
      mergedClass,
      iconSize,
    };
  },
});
</script>
