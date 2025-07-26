<template>
  <li v-show="isVisible" :class="mergedClass" @click.stop="handleClick">
    <slot>
      {{ label }}
    </slot>
    <vk-icon
      v-if="isSelected"
      class="vk-select-option__check"
      icon="mdi:check"
      size="14px"
    />
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, inject, onMounted, onUnmounted } from "vue";
import { optionProps, optionEmits, type SelectOption } from "./types";
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
      props: any;
      addOption: (option: SelectOption) => void;
      removeOption: (value: any) => void;
      selectOption: (option: SelectOption) => void;
      isSelected: (value: any) => boolean;
      filteredOptions: any;
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
      return selectContext.filteredOptions.value.some(
        (option: SelectOption) => option.value === props.value,
      );
    });

    // 样式类名
    const mergedClass = computed(() => {
      return [
        ns.block(),
        ns.is("selected", isSelected.value),
        ns.is("disabled", isDisabled.value),
      ];
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
      mergedClass,
      isSelected,
      isDisabled,
      isVisible,
      handleClick,
    };
  },
});
</script>

<style lang="scss">
.vk-select-option {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f7fa;
  }

  &.is-selected {
    color: #409eff;
    background-color: #f0f9ff;
  }

  &.is-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }

  &__check {
    color: #409eff;
  }
}
</style>
