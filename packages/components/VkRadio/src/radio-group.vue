<template>
  <div :class="mergedClass" :style="mergedStyle" role="radiogroup">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, ref, watch } from "vue";
import { radioGroupProps, radioGroupEmits, type RadioValue } from "./types";
import { useNamespace } from "@vakao-ui/utils";

export default defineComponent({
  name: "VkRadioGroup",
  props: radioGroupProps,
  emits: radioGroupEmits,
  setup(props, { emit }) {
    const ns = useNamespace("radio-group");

    // 内部状态
    const modelValue = ref(props.modelValue);

    // 监听外部值变化
    watch(
      () => props.modelValue,
      (newValue) => {
        modelValue.value = newValue;
      },
    );

    // 计算属性
    const isDisabled = computed(() => props.disabled);
    const currentSize = computed(() => props.size);

    // 样式类名
    const mergedClass = computed(() => {
      return [ns.block(), `${ns.block()}--size-${currentSize.value}`, ns.is("disabled", isDisabled.value), props.customClass];
    });

    // 合并样式
    const mergedStyle = computed(() => {
      return props.customStyle;
    });

    // 事件处理
    const changeEvent = (value: RadioValue) => {
      modelValue.value = value;
      emit("update:modelValue", value);
      emit("change", value);
    };

    // 提供给子组件的上下文
    provide("VkRadioGroup", {
      modelValue,
      disabled: isDisabled,
      size: currentSize,
      changeEvent,
    });

    return {
      ns,
      mergedClass,
      mergedStyle,
    };
  },
});
</script>
