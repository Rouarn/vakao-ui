<template>
  <div
    :class="mergedClass"
    :style="mergedStyle"
  >
    <!-- 前缀插槽 -->
    <div v-if="$slots.prefix || prefixIcon" class="vk-input__prefix">
      <slot name="prefix">
        <i v-if="prefixIcon" :class="prefixIcon"></i>
      </slot>
    </div>
    
    <!-- 输入框 -->
    <input
      ref="inputRef"
      v-bind="filteredAttrs"
      :class="inputClass"
      :type="showPasswordVisible ? 'text' : type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autofocus="autofocus"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    
    <!-- 后缀插槽 -->
    <div v-if="showSuffix" class="vk-input__suffix">
      <!-- 清除按钮 -->
      <i
        v-if="showClear"
        class="vk-input__clear"
        @click="handleClear"
      ></i>
      
      <!-- 密码切换按钮 -->
      <i
        v-if="showPassword"
        :class="passwordIconClass"
        @click="togglePasswordVisible"
      ></i>
      
      <!-- 后缀图标 -->
      <slot name="suffix">
        <i v-if="suffixIcon" :class="suffixIcon"></i>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, useSlots, nextTick } from 'vue'
import type { StyleValue } from 'vue'
import { inputProps } from './types'
import { useNamespace } from '@vakao-ui/utils'

defineOptions({
  name: 'VkInput',
  inheritAttrs: false
})

const props = defineProps(inputProps)
const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  focus: [evt: FocusEvent]
  blur: [evt: FocusEvent]
  clear: []
}>()
const attrs = useAttrs()
const slots = useSlots()
const ns = useNamespace('input')

// 模板引用
const inputRef = ref<HTMLInputElement>()

// 密码显示状态
const showPasswordVisible = ref(false)

// 过滤属性
const filteredAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs
  return rest
})

// 样式类名
const mergedClass = computed(() => {
  return [
    ns.block(),
    ns.modifier('size', props.size),
    ns.is('disabled', props.disabled),
    ns.is('readonly', props.readonly),
    {
      [ns.modifier('prefix')]: !!(slots.prefix || props.prefixIcon),
      [ns.modifier('suffix')]: showSuffix.value,
    },
    props.customClass,
    attrs.class
  ]
})

// 合并样式
const mergedStyle = computed((): StyleValue => {
  const styles: StyleValue[] = []
  if (props.customStyle) {
    styles.push(props.customStyle)
  }
  if (attrs.style) {
    styles.push(attrs.style as StyleValue)
  }
  return styles.length > 1 ? styles : styles[0] || undefined
})

// 输入框类名
const inputClass = computed(() => {
  return ns.element('inner')
})

// 是否显示后缀
const showSuffix = computed(() => {
  return showClear.value || props.showPassword || props.suffixIcon || slots.suffix
})

// 是否显示清除按钮
const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && !!modelValue.value
})

// 密码图标类名
const passwordIconClass = computed(() => {
  return showPasswordVisible.value ? 'vk-icon-eye' : 'vk-icon-eye-close'
})

// 双向绑定值
const modelValue = defineModel<string>({ default: '' })

// 事件处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  modelValue.value = value
  emit('input', value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleClear = () => {
  modelValue.value = ''
  emit('clear')
  emit('input', '')
  emit('change', '')
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const togglePasswordVisible = () => {
  showPasswordVisible.value = !showPasswordVisible.value
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  clear: handleClear
})
</script>