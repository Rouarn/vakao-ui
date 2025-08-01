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
      >
      <span
        class="vk-checkbox__inner"
        :class="[
          {
            'is-indeterminate': indeterminate,
            'is-checked': isChecked,
            'is-disabled': isDisabled,
          },
        ]"
      >
        <VkIcon
          v-if="isChecked && !indeterminate"
          class="vk-checkbox__icon"
          size="12px"
          color="#ffffff"
          icon="mdi:check"
        />
        <VkIcon
          v-if="indeterminate"
          class="vk-checkbox__icon"
          size="12px"
          color="#ffffff"
          icon="mdi:minus"
        />
      </span>
    </span>
    <span
      v-if="$slots.default || label"
      class="vk-checkbox__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  inject,
  type Ref,
  type ComputedRef,
} from "vue";
import { checkboxProps, checkboxEmits, type CheckboxValue } from "./types";
import { useNamespace, useControlled } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";

export default defineComponent({
  name: "VkCheckbox",
  components: {
    VkIcon,
  },
  props: checkboxProps,
  emits: checkboxEmits,
  setup(props, { emit }) {
    const ns = useNamespace("checkbox");

    // 模板引用
    const inputRef = ref<HTMLInputElement>();

    // 注入复选框组上下文
    const checkboxGroup = inject<
      | {
          modelValue: Ref<CheckboxValue[]>;
          disabled: ComputedRef<boolean>;
          size: ComputedRef<string>;
          min: ComputedRef<number>;
          max: ComputedRef<number>;
          changeEvent: (_value: CheckboxValue[]) => void;
        }
      | undefined
    >("VkCheckboxGroup", undefined);

    // 使用受控/非受控模式工具函数（仅在非组模式下使用）
    const { currentValue: currentChecked, updateValue } = useControlled(
      props,
      "checked",
      "modelValue",
      emit as (event: string, ...args: unknown[]) => void,
      false,
    );

    // 计算属性
    const isGroup = computed(() => !!checkboxGroup);

    const isDisabled = computed(() => {
      return props.disabled || checkboxGroup?.disabled.value || false;
    });

    const currentSize = computed(() => {
      return props.size || checkboxGroup?.size.value || "medium";
    });

    const isChecked = computed(() => {
      if (isGroup.value && checkboxGroup) {
        return checkboxGroup.modelValue.value.includes(
          props.value as CheckboxValue,
        );
      }
      // 非组模式下使用受控/非受控逻辑
      return currentChecked.value;
    });

    const isLimitExceeded = computed(() => {
      if (!isGroup.value || !checkboxGroup) return false;

      const { min, max, modelValue: groupValue } = checkboxGroup;
      return (
        (!isChecked.value && groupValue.value.length >= max.value) ||
        (isChecked.value && groupValue.value.length <= min.value)
      );
    });

    // 样式类名
    const mergedClass = computed(() => {
      return [
        ns.block(),
        `${ns.block()}--size-${currentSize.value}`,
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("indeterminate", props.indeterminate),
        props.customClass,
      ];
    });

    // 合并样式
    const mergedStyle = computed(() => {
      return props.customStyle;
    });

    // 事件处理
    const handleChange = (event: Event) => {
      if (isDisabled.value || isLimitExceeded.value) {
        event.preventDefault();
        return;
      }

      const target = event.target as HTMLInputElement;
      const { checked } = target;

      if (isGroup.value && checkboxGroup) {
        const value = props.value as CheckboxValue;
        const newValue = [...checkboxGroup.modelValue.value];

        if (checked) {
          if (!newValue.includes(value)) {
            newValue.push(value);
          }
        } else {
          const index = newValue.indexOf(value);
          if (index > -1) {
            newValue.splice(index, 1);
          }
        }

        checkboxGroup.changeEvent(newValue);
      } else {
        updateValue(checked);
        emit("change", checked);
      }
    };

    const handleClick = (event: Event) => {
      if (isDisabled.value || isLimitExceeded.value) {
        event.preventDefault();
        return;
      }
    };

    return {
      ns,
      inputRef,
      isGroup,
      isDisabled,
      currentSize,
      isChecked,
      isLimitExceeded,
      mergedClass,
      mergedStyle,
      handleChange,
      handleClick,
      // 暴露方法
      focus: () => inputRef.value?.focus(),
      blur: () => inputRef.value?.blur(),
    };
  },
});
</script>
