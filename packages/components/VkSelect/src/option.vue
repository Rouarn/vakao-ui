<template>
  <li v-show="isVisible" :class="mergedClass" @click.stop="handleClick">
    <slot>
      {{ label }}
    </slot>
    <VkIcon v-if="isSelected" :class="ns.element('check')" icon="mdi:check" size="14px" />
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, inject, onMounted, onUnmounted, type Ref } from "vue";
import { optionProps, optionEmits, type SelectOption, type SelectValue } from "./types";
import { useNamespace } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";

export default defineComponent({
  name: "VkOption",
  components: {
    VkIcon,
  },
  props: optionProps,
  emits: optionEmits,
  setup(props, { emit }) {
    const ns = useNamespace("select-option");

    // 注入选择器上下文
    const selectContext = inject<{
      props: Record<string, unknown>;
      addOption: (_option: SelectOption) => void;
      removeOption: (_value: SelectValue) => void;
      selectOption: (_option: SelectOption) => void;
      isSelected: (_value: SelectValue) => boolean;
      filteredOptions: Ref<SelectOption[]>;
    }>("VkSelect");

    // 当前选项对象
    const currentOption = computed(() => ({
      value: props.value,
      label: props.label,
      disabled: props.disabled,
    }));

    // 计算是否选中
    const isSelected = computed(() => {
      if (!selectContext) return false;
      return selectContext.isSelected(props.value);
    });

    // 计算是否禁用
    const isDisabled = computed(() => {
      return props.disabled || selectContext?.props.disabled || false;
    });

    // 计算是否可见（用于搜索过滤）
    const isVisible = computed(() => {
      if (!selectContext) return true;
      if (!selectContext.props.filterable) return true;
      return selectContext.filteredOptions.value.some((option: SelectOption) => option.value === props.value);
    });

    // 样式类名
    const mergedClass = computed(() => {
      return [ns.block(), ns.is("selected", isSelected.value), ns.is("disabled", Boolean(isDisabled.value))];
    });

    // 点击处理
    const handleClick = () => {
      if (isDisabled.value) return;
      selectContext?.selectOption({
        ...currentOption.value,
        label: String(currentOption.value.label),
      });
      emit("click", props.value);
    };

    // 注册选项到父组件
    onMounted(() => {
      if (selectContext) {
        selectContext.addOption({
          ...currentOption.value,
          label: String(currentOption.value.label),
        });
      }
    });

    // 从父组件移除选项
    onUnmounted(() => {
      if (selectContext) {
        selectContext.removeOption(props.value);
      }
    });

    return {
      ns,
      mergedClass,
      isSelected,
      isDisabled,
      isVisible,
      handleClick,
    };
  },
});
</script>
