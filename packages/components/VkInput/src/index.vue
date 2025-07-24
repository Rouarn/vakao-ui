<template>
  <div :class="mergedClass" :style="mergedStyle">
    <!-- 前缀插槽 -->
    <div v-if="$slots.prefix || prefixIcon" class="vk-input__prefix">
      <slot name="prefix">
        <vk-icon v-if="prefixIcon" :name="prefixIcon" size="16px" />
      </slot>
    </div>

    <!-- 输入框容器 -->
    <div class="vk-input__wrapper">
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
        @keydown.enter="handleEnter"
      />
    </div>

    <!-- 后缀插槽 -->
    <div v-if="showSuffix" class="vk-input__suffix">
      <!-- 清除按钮 -->
      <vk-icon v-if="showClear" name="CloseCircle" size="16px" class="vk-input__clear" @click="handleClear" />

      <!-- 密码切换按钮 -->
      <vk-icon
        v-if="showPassword"
        :name="showPasswordVisible ? 'EyeOff' : 'Eye'"
        size="16px"
        class="vk-input__password-toggle"
        @click="togglePasswordVisible"
      />

      <!-- 后缀图标 -->
      <slot name="suffix">
        <vk-icon v-if="suffixIcon" :name="suffixIcon" size="16px" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, useSlots, nextTick } from "vue";
import type { StyleValue } from "vue";
import { inputProps } from "./types";
import { useNamespace } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";

defineOptions({
  name: "VkInput",
  inheritAttrs: false,
});

const props = defineProps(inputProps);
const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [value: string];
  change: [value: string];
  focus: [evt: FocusEvent];
  blur: [evt: FocusEvent];
  clear: [];
  keydown: [evt: KeyboardEvent];
}>();
const attrs = useAttrs();
const slots = useSlots();
const ns = useNamespace("input");

// 模板引用
const inputRef = ref<HTMLInputElement>();

// 密码显示状态
const showPasswordVisible = ref(false);

// 焦点状态
const isFocused = ref(false);

// 过滤属性
const filteredAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs;
  return rest;
});

// 样式类名
const mergedClass = computed(() => {
  return [
    ns.block(),
    ns.modifier("size", props.size),
    ns.is("disabled", props.disabled),
    ns.is("readonly", props.readonly),
    ns.is("focused", isFocused.value),
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

// 是否显示后缀
const showSuffix = computed(() => {
  return (
    showClear.value || props.showPassword || props.suffixIcon || slots.suffix
  );
});

// 是否显示清除按钮
const showClear = computed(() => {
  return (
    props.clearable && !props.disabled && !props.readonly && !!modelValue.value
  );
});



// 双向绑定值
const modelValue = defineModel<string>({ default: "" });

// 事件处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  modelValue.value = value;
  emit("input", value);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
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
  modelValue.value = "";
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

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  clear: handleClear,
});
</script>
