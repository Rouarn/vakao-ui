<template>
  <span
    :class="mergedClass"
    :style="mergedStyle"
    v-bind="$attrs"
  >
    <!-- 自定义图片 -->
    <img
      v-if="props.src"
      :src="props.src"
      :alt="props.name || 'icon'"
      class="vk-icon__image"
    />
    <!-- 内置图标 -->
    <component
      v-else-if="iconComponent"
      :is="iconComponent"
      class="vk-icon__svg"
    />
    <!-- 插槽内容 -->
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { computed, defineProps, defineOptions, shallowRef, watchEffect } from 'vue'
import { useNamespace } from '@vakao-ui/utils'
import type { VkIconProps } from './types'

defineOptions({
  name: 'VkIcon',
  inheritAttrs: false
})

const props = withDefaults(defineProps<VkIconProps>(), {
  size: '1em',
  color: 'currentColor'
})

const ns = useNamespace('icon')

// 图标组件引用
const iconComponent = shallowRef(null)

// 动态加载图标
watchEffect(async () => {
  if (!props.name) {
    iconComponent.value = null
    return
  }
  
  try {
    // 将输入名称转换为 PascalCase 格式
    const toPascalCase = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    }
    
    // 尝试不同的命名格式
    const possibleNames = [
      props.name, // 原始名称
      toPascalCase(props.name), // PascalCase
      props.name + 'Outline', // 添加 Outline 后缀
      toPascalCase(props.name) + 'Outline',
      props.name + 'Sharp', // 添加 Sharp 后缀
      toPascalCase(props.name) + 'Sharp'
    ]
    
    // 直接从主包导入图标
    const icons = await import('@vicons/ionicons5')
    
    for (const name of possibleNames) {
      if ((icons as any)[name]) {
        iconComponent.value = (icons as any)[name]
        return
      }
    }
    
    console.warn(`Icon "${props.name}" not found in @vicons/ionicons5. Available variants: ${possibleNames.join(', ')}`)
    iconComponent.value = null
  } catch (error) {
    console.warn(`Failed to load icon "${props.name}":`, error)
    iconComponent.value = null
  }
})

// 样式类名
const mergedClass = computed(() => {
  return [
    ns.block(),
    props.customClass
  ]
})

// 合并样式
const mergedStyle = computed(() => {
  const baseStyle = {
    fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
    color: props.color
  }
  
  if (typeof props.customStyle === 'string') {
    return `${Object.entries(baseStyle).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}; ${props.customStyle}`
  }
  
  return {
    ...baseStyle,
    ...props.customStyle
  }
})
</script>