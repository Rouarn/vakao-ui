<template>
  <label
    :class="mergedClass"
    :style="mergedStyle"
    @click="handleClick"
  >
    <span class="vk-checkbox__input">
      <input
        ref="inputRef"
        type="checkbox"
        class="vk-checkbox__original"
        :disabled="isDisabled"
        :checked="isChecked"
        :value="value"
        @change="handleChange"
      />
      <span
        :class="[
          'vk-checkbox__inner',
          {
            'is-indeterminate': indeterminate,
            'is-checked': isChecked,
            'is-disabled': isDisabled
          }
        ]"
      >
        <i v-if="isChecked || indeterminate" class="vk-checkbox__icon"></i>
      </span>
    </span>
    <span v-if="$slots.default || label" class="vk-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref, type ComputedRef } from 'vue'
import { checkboxProps, type CheckboxValue } from './types'
import { useNamespace } from '@vakao-ui/utils'

defineOptions({
  name: 'VkCheckbox'
})

const props = defineProps(checkboxProps)
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()
const ns = useNamespace('checkbox')

// 模板引用
const inputRef = ref<HTMLInputElement>()

// 注入复选框组上下文
const checkboxGroup = inject<{
  modelValue: Ref<CheckboxValue[]>
  disabled: ComputedRef<boolean>
  size: ComputedRef<string>
  min: ComputedRef<number>
  max: ComputedRef<number>
  changeEvent: (value: CheckboxValue[]) => void
} | undefined>('VkCheckboxGroup', undefined)

// 双向绑定值
const modelValue = defineModel<boolean>({ default: false })

// 计算属性
const isGroup = computed(() => !!checkboxGroup)

const isDisabled = computed(() => {
  return props.disabled || checkboxGroup?.disabled.value || false
})

const currentSize = computed(() => {
  return props.size || checkboxGroup?.size.value || 'medium'
})

const isChecked = computed(() => {
  if (isGroup.value && checkboxGroup) {
    return checkboxGroup.modelValue.value.includes(props.value as CheckboxValue)
  }
  return props.checked || modelValue.value
})

const isLimitExceeded = computed(() => {
  if (!isGroup.value || !checkboxGroup) return false
  
  const { min, max, modelValue: groupValue } = checkboxGroup
  return (!isChecked.value && groupValue.value.length >= max.value) ||
         (isChecked.value && groupValue.value.length <= min.value)
})

// 样式类名
const mergedClass = computed(() => {
  return [
    ns.block(),
    `${ns.block()}--size-${currentSize.value}`,
    ns.is('disabled', isDisabled.value),
    ns.is('checked', isChecked.value),
    ns.is('indeterminate', props.indeterminate),
    props.customClass
  ]
})

// 合并样式
const mergedStyle = computed(() => {
  return props.customStyle
})

// 事件处理
const handleChange = (event: Event) => {
  if (isDisabled.value || isLimitExceeded.value) {
    event.preventDefault()
    return
  }
  
  const target = event.target as HTMLInputElement
  const checked = target.checked
  
  if (isGroup.value && checkboxGroup) {
    const value = props.value as CheckboxValue
    const newValue = [...checkboxGroup.modelValue.value]
    
    if (checked) {
      if (!newValue.includes(value)) {
        newValue.push(value)
      }
    } else {
      const index = newValue.indexOf(value)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    
    checkboxGroup.changeEvent(newValue)
  } else {
    modelValue.value = checked
    emit('change', checked)
  }
}

const handleClick = (event: Event) => {
  if (isDisabled.value || isLimitExceeded.value) {
    event.preventDefault()
    return
  }
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur()
})
</script>