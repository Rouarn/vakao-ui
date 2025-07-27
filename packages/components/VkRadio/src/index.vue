<template>
  <label :class="mergedClass" :style="mergedStyle" @click="handleClick">
    <span class="vk-radio__input">
      <input
        ref="inputRef"
        type="radio"
        class="vk-radio__original"
        :disabled="isDisabled"
        :checked="isChecked"
        :value="value"
        @change="handleChange"
      />
      <span
        class="vk-radio__inner"
        :class="[
          {
            'is-checked': isChecked,
            'is-disabled': isDisabled,
          },
        ]"
      >
        <span v-if="isChecked" class="vk-radio__dot" />
      </span>
    </span>
    <span v-if="$slots.default || label" class="vk-radio__label">
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
import { radioProps, radioEmits, type RadioValue } from "./types";
import { useNamespace, useControlled } from "@vakao-ui/utils";

export default defineComponent({
  name: "VkRadio",
  props: radioProps,
  emits: radioEmits,
  setup(props, { emit }) {
    const ns = useNamespace("radio");

    // 模板引用
    const inputRef = ref<HTMLInputElement>();

    // 注入单选框组上下文
    const radioGroup = inject<
      | {
          modelValue: Ref<RadioValue>;
          disabled: ComputedRef<boolean>;
          size: ComputedRef<string>;
          changeEvent: (_value: RadioValue) => void;
        }
      | undefined
    >("VkRadioGroup", undefined);

    // 使用受控/非受控模式工具函数（仅在非组模式下使用）
    const { currentValue, updateValue } = useControlled<RadioValue | undefined>(
      props,
      "modelValue",
      "modelValue",
      emit as (event: string, ...args: unknown[]) => void,
      undefined,
    );

    // 计算属性
    const isGroup = computed(() => !!radioGroup);

    const isDisabled = computed(() => {
      return props.disabled || radioGroup?.disabled.value || false;
    });

    const currentSize = computed(() => {
      return props.size || radioGroup?.size.value || "medium";
    });

    const isChecked = computed(() => {
      if (isGroup.value && radioGroup) {
        return radioGroup.modelValue.value === props.value;
      }
      // 非组模式下使用受控/非受控逻辑
      return currentValue.value === props.value;
    });

    // 样式类名
    const mergedClass = computed(() => {
      return [
        ns.block(),
        `${ns.block()}--size-${currentSize.value}`,
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        props.customClass,
      ];
    });

    // 合并样式
    const mergedStyle = computed(() => {
      return props.customStyle;
    });

    // 事件处理
    const handleChange = (_event: Event) => {
      if (isDisabled.value) {
        _event.preventDefault();
        return;
      }

      const { value } = props;

      if (isGroup.value && radioGroup) {
        radioGroup.changeEvent(value);
      } else {
        updateValue(value);
        emit("change", value);
      }
    };

    const handleClick = (event: Event) => {
      if (isDisabled.value) {
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
