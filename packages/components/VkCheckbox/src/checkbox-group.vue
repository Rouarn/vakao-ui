<template>
  <div
    :class="mergedClass"
    :style="mergedStyle"
    role="group"
    aria-label="checkbox group"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, watch } from "vue";
import {
  checkboxGroupProps,
  checkboxGroupEmits,
  type CheckboxValue,
} from "./types";
import { useNamespace } from "@vakao-ui/utils";

defineOptions({
  name: "VkCheckboxGroup",
});

const props = defineProps(checkboxGroupProps);
const emit = defineEmits(checkboxGroupEmits);
const ns = useNamespace("checkbox-group");

// 双向绑定值
const modelValue = defineModel<CheckboxValue[]>({ default: () => [] });

// 样式类名
const mergedClass = computed(() => {
  return [
    ns.block(),
    `${ns.block()}--size-${props.size}`,
    ns.is("disabled", props.disabled),
    props.customClass,
  ];
});

// 合并样式
const mergedStyle = computed(() => {
  return props.customStyle;
});

// 变更事件处理
const changeEvent = (value: CheckboxValue[]) => {
  modelValue.value = value;
  emit("change", value);
};

// 提供给子组件的上下文
provide("VkCheckboxGroup", {
  modelValue,
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  min: computed(() => props.min),
  max: computed(() => props.max),
  changeEvent,
});

// 监听值变化，确保在限制范围内
watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue.length < props.min) {
      console.warn(`[VkCheckboxGroup] 选择数量不能少于 ${props.min} 个`);
    }
    if (newValue.length > props.max) {
      console.warn(`[VkCheckboxGroup] 选择数量不能超过 ${props.max} 个`);
    }
  },
  { immediate: true },
);
</script>
