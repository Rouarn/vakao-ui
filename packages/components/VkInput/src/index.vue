<template>
  <div :class="mergedClass" :style="mergedStyle">
    <!-- 前缀插槽 -->
    <div v-if="$slots.prefix || prefixIcon" :class="ns.element('prefix')">
      <slot name="prefix">
        <VkIcon
          v-if="prefixIcon"
          size="16px"
          :src="isUrl(prefixIcon) ? prefixIcon : undefined"
          :icon="!isUrl(prefixIcon) ? prefixIcon : undefined"
        />
      </slot>
    </div>

    <!-- 输入框容器 -->
    <div :class="ns.element('wrapper')">
      <input
        ref="inputRef"
        v-bind="filteredAttrs"
        :class="inputClass"
        :type="showPasswordVisible ? 'text' : type"
        :value="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autofocus="autofocus"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="handleEnter"
      />
    </div>

    <!-- 后缀插槽 -->
    <div v-if="showSuffix" :class="ns.element('suffix')">
      <!-- 清除按钮 -->
      <VkIcon v-if="showClear" size="16px" :class="ns.element('clear')" @click="handleClear">
        <Icon icon="mdi:close-circle" />
      </VkIcon>

      <!-- 密码切换按钮 -->
      <VkIcon v-if="showPassword" size="16px" :class="ns.element('password-toggle')" @click="togglePasswordVisible">
        <Icon :icon="showPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'" />
      </VkIcon>

      <!-- 后缀图标 -->
      <slot name="suffix">
        <VkIcon
          v-if="suffixIcon"
          size="16px"
          :src="isUrl(suffixIcon) ? suffixIcon : undefined"
          :icon="!isUrl(suffixIcon) ? suffixIcon : undefined"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from "vue";
import type { StyleValue } from "vue";
import { inputProps, inputEmits } from "./types";
import { useNamespace, isUrl, useStandardControlled } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "VkInput",
  components: {
    VkIcon,
    Icon,
  },
  inheritAttrs: false,
  props: inputProps,
  emits: inputEmits,
  setup(props, { emit, attrs, slots }) {
    const ns = useNamespace("input");

    // 模板引用
    const inputRef = ref<HTMLInputElement>();

    // 使用受控/非受控模式工具函数
    const { currentValue, updateValue } = useStandardControlled(props, emit as (event: string, ...args: unknown[]) => void, "");

    // 密码显示状态
    const showPasswordVisible = ref(false);

    // 焦点状态
    const isFocused = ref(false);

    // 过滤属性
    const filteredAttrs = computed(() => {
      const { class: _, style: __, ...rest } = attrs;
      return rest;
    });

    // 是否有前缀
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefixIcon);
    });

    // 是否显示后缀
    const showSuffix = computed(() => {
      return showClear.value || props.showPassword || props.suffixIcon || slots.suffix;
    });

    // 样式类名
    const mergedClass = computed(() => {
      return [
        ns.block(),
        ns.modifier("size", props.size),
        ns.is("disabled", props.disabled),
        ns.is("readonly", props.readonly),
        ns.is("focused", isFocused.value),
        {
          "has-prefix": hasPrefix.value,
          "has-suffix": showSuffix.value,
        },
        props.customClass,
        attrs.class,
      ];
    });

    // 合并样式
    const mergedStyle = computed((): StyleValue => {
      const styles: StyleValue[] = [];
      if (props.customStyle) {
        styles.push(props.customStyle);
      }
      if (attrs.style) {
        styles.push(attrs.style as StyleValue);
      }
      return styles.length > 1 ? styles : styles[0] || undefined;
    });

    // 输入框类名
    const inputClass = computed(() => {
      return [];
    });

    // 是否显示清除按钮
    const showClear = computed(() => {
      return props.clearable && !props.disabled && !props.readonly && !!currentValue.value;
    });

    // 事件处理
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const { value } = target;

      updateValue(value);
      emit("input", value);
    };

    const handleChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const { value } = target;
      emit("change", value);
    };

    const handleFocus = (event: FocusEvent) => {
      isFocused.value = true;
      emit("focus", event);
    };

    const handleBlur = (event: FocusEvent) => {
      isFocused.value = false;
      emit("blur", event);
    };

    const handleClear = () => {
      updateValue("");
      emit("clear");
      emit("input", "");
      emit("change", "");
      nextTick(() => {
        inputRef.value?.focus();
      });
    };

    const togglePasswordVisible = () => {
      showPasswordVisible.value = !showPasswordVisible.value;
      nextTick(() => {
        inputRef.value?.focus();
      });
    };

    const handleEnter = (event: KeyboardEvent) => {
      emit("keydown", event);
    };

    return {
      ns,
      inputRef,
      currentValue,
      showPasswordVisible,
      isFocused,
      filteredAttrs,
      mergedClass,
      mergedStyle,
      inputClass,
      showSuffix,
      showClear,
      isUrl,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
      togglePasswordVisible,
      handleEnter,
      // 暴露方法
      focus: () => inputRef.value?.focus(),
      blur: () => inputRef.value?.blur(),
      select: () => inputRef.value?.select(),
      clear: handleClear,
    };
  },
});
</script>
