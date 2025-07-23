<template>
  <button
    :class="[
      'vk-button',
      `vk-button--${type}`,
      `vk-button--${size}`,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-text': text,
        'is-link': link
      },
      customClass
    ]"
    :style="customStyle"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="vk-button__loading">
      <span class="vk-button__loading-indicator"></span>
    </span>
    <span v-if="icon && iconPosition === 'left'" class="vk-button__icon vk-button__icon--left">
      <component v-if="typeof icon === 'object'" :is="icon" />
      <i v-else :class="icon"></i>
    </span>
    <span class="vk-button__content">
      <slot></slot>
    </span>
    <span v-if="icon && iconPosition === 'right'" class="vk-button__icon vk-button__icon--right">
      <component v-if="typeof icon === 'object'" :is="icon" />
      <i v-else :class="icon"></i>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { buttonProps } from './types'

export default defineComponent({
  name: 'vkbutton',
  props: buttonProps,
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = (e: MouseEvent) => {
      if (!props.disabled && !props.loading) {
        emit('click', e)
      }
    }

    return {
      handleClick
    }
  }
})
</script>