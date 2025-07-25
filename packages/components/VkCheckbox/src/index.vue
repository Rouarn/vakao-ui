<template>
  <label :class="mergedClass" :style="mergedStyle" @click="handleClick">
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
            'is-disabled': isDisabled,
          },
        ]"
      >
        <vk-icon
          v-if="isChecked && !indeterminate"
          class="vk-checkbox__icon"
          size="12px"
          color="#ffffff"
        >
          <Icon icon="mdi:check" />
        </vk-icon>
        <vk-icon
          v-if="indeterminate"
          class="vk-checkbox__icon"
          size="12px"
          color="#ffffff"
        >
          <Icon icon="mdi:minus" />
        </vk-icon>
      </span>
    </span>
    <span v-if="$slots.default || label" class="vk-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  inject,
  ref,
  type Ref,
  type ComputedRef,
} from "vue";
import { checkboxProps, type CheckboxValue } from "./types";
import { useNamespace } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "VkCheckbox",
  components: {
    VkIcon,
    Icon,
  },
  props: checkboxProps,
  emits: {
    "update:modelValue": (_value: boolean) => true,
    change: (_value: boolean) => true,
  },
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
          changeEvent: (value: CheckboxValue[]) => void;
        }
      | undefined
    >("VkCheckboxGroup", undefined);

    // 双向绑定值
    const modelValue = ref<boolean>(false);

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
          props.value as CheckboxValue
        );
      }
      return props.modelValue !== undefined
        ? props.modelValue
        : props.checked || modelValue.value;
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
      const checked = target.checked;

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
        // 如果使用 v-model，发出 update:modelValue 事件
        if (props.modelValue !== undefined) {
          emit("update:modelValue", checked);
        } else {
          // 否则使用内部状态
          modelValue.value = checked;
        }
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
      modelValue,
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
