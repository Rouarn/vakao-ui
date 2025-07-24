<template>
  <div
    :class="mergedClass"
    :style="mergedStyle"
    @click="handleClick"
  >
    <!-- 未选中状态的文字 -->
    <span
      v-if="inactiveText && !inlinePrompt"
      :class="[ns.element('label'), ns.element('label--left')]"
    >
      {{ inactiveText }}
    </span>
    
    <!-- 开关主体 -->
    <span ref="switchRef" :class="switchClass">
      <!-- 加载图标 -->
      <span v-if="loading" :class="ns.element('loading')">
        <vk-icon name="Reload" size="12px" />
      </span>
      
      <!-- 内联提示 -->
      <template v-if="inlinePrompt">
        <span v-if="isChecked" :class="ns.element('inner')">
          <vk-icon v-if="activeIcon" :name="activeIcon" size="12px" />
          <span v-else-if="activeText">{{ activeText }}</span>
        </span>
        <span v-else :class="ns.element('inner')">
          <vk-icon v-if="inactiveIcon" :name="inactiveIcon" size="12px" />
          <span v-else-if="inactiveText">{{ inactiveText }}</span>
        </span>
      </template>
      
      <!-- 开关按钮 -->
      <span :class="ns.element('action')"></span>
    </span>
    
    <!-- 选中状态的文字 -->
    <span
      v-if="activeText && !inlinePrompt"
      :class="[ns.element('label'), ns.element('label--right')]"
    >
      {{ activeText }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { switchProps, type SwitchValue } from './types'
import { useNamespace } from '@vakao-ui/utils'
import VkIcon from '../../VkIcon'

export default defineComponent({
  name: 'VkSwitch',
  components: {
    VkIcon
  },
  props: switchProps,
  emits: {
    'update:modelValue': (_value: SwitchValue) => true,
    'change': (_value: SwitchValue) => true
  },
  setup(props, { emit }) {
    const ns = useNamespace('switch')
    
    // 模板引用
    const switchRef = ref<HTMLElement>()
    
    // 双向绑定值
    const modelValue = ref<SwitchValue>(false)
    
    // 计算属性
    const isChecked = computed(() => {
      return modelValue.value === props.activeValue
    })
    
    const isDisabled = computed(() => {
      return props.disabled || props.loading
    })
    
    // 样式类名
    const mergedClass = computed(() => {
      return [
        ns.block(),
        ns.modifier('size', props.size),
        ns.is('disabled', isDisabled.value),
        ns.is('checked', isChecked.value),
        ns.is('loading', props.loading),
        props.customClass
      ]
    })
    
    const switchClass = computed(() => {
      return [
        ns.element('core'),
        {
          [ns.element('core--inline')]: props.inlinePrompt
        }
      ]
    })
    
    // 合并样式
    const mergedStyle = computed(() => {
      return props.customStyle
    })
    
    // 事件处理
    const handleClick = () => {
      if (isDisabled.value) return
      
      const newValue = isChecked.value ? props.inactiveValue : props.activeValue
      modelValue.value = newValue
      emit('update:modelValue', newValue)
      emit('change', newValue)
    }
    
    return {
      ns,
      switchRef,
      modelValue,
      isChecked,
      isDisabled,
      mergedClass,
      switchClass,
      mergedStyle,
      handleClick,
      // 暴露方法
      focus: () => switchRef.value?.focus(),
      blur: () => switchRef.value?.blur()
    }
  }
})
</script>