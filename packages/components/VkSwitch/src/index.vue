<template>
  <div :class="mergedClass" :style="mergedStyle" @click="handleClick">
    <!-- 未选中状态的文字 -->
    <span
      v-if="inactiveText && !inlinePrompt"
      :class="[ns.element('label'), ns.element('label--left')]"
    >
      {{ inactiveText }}
    </span>

    <!-- 开关主体 -->
    <span ref="switchRef" :class="switchClass">
      <!-- 加载图标 -->
      <span v-if="loading" :class="ns.element('loading')">
        <vk-icon size="12px" icon="mdi:reload"> </vk-icon>
      </span>

      <!-- 内联提示 -->
      <template v-if="inlinePrompt">
        <span v-if="isChecked" :class="ns.element('inner')">
          <vk-icon
            v-if="activeIcon"
            size="12px"
            :src="isUrl(activeIcon) ? activeIcon : undefined"
            :icon="!isUrl(activeIcon) ? activeIcon : undefined"
          >
          </vk-icon>
          <span v-else-if="activeText">{{ activeText }}</span>
        </span>
        <span v-else :class="ns.element('inner')">
          <vk-icon
            v-if="inactiveIcon"
            size="12px"
            :src="isUrl(inactiveIcon) ? inactiveIcon : undefined"
            :icon="!isUrl(inactiveIcon) ? inactiveIcon : undefined"
          >
          </vk-icon>
          <span v-else-if="inactiveText">{{ inactiveText }}</span>
        </span>
      </template>

      <!-- 开关按钮 -->
      <span :class="ns.element('action')"></span>
    </span>

    <!-- 选中状态的文字 -->
    <span
      v-if="activeText && !inlinePrompt"
      :class="[ns.element('label'), ns.element('label--right')]"
    >
      {{ activeText }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { switchProps, switchEmits, type SwitchValue } from "./types";
import { useNamespace, isUrl, useControlled } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";

export default defineComponent({
  name: "VkSwitch",
  components: {
    VkIcon,
  },
  props: switchProps,
  emits: switchEmits,
  setup(props, { emit }) {
    const ns = useNamespace("switch");

    // 模板引用
    const switchRef = ref<HTMLElement>();

    // 使用受控/非受控模式工具函数
    const { currentValue, updateValue } = useControlled<SwitchValue>(
      props,
      "value",
      "modelValue",
      emit,
      false as SwitchValue,
    );

    // 计算属性
    const isChecked = computed(() => {
      return currentValue.value === props.activeValue;
    });

    const isDisabled = computed(() => {
      return props.disabled || props.loading;
    });

    // 样式类名
    const mergedClass = computed(() => {
      return [
        ns.block(),
        ns.modifier("size", props.size),
        ns.is("disabled", isDisabled.value),
        ns.is("checked", isChecked.value),
        ns.is("loading", props.loading),
        props.customClass,
      ];
    });

    const switchClass = computed(() => {
      return [
        ns.element("core"),
        {
          [ns.element("core--inline")]: props.inlinePrompt,
        },
      ];
    });

    // 合并样式
    const mergedStyle = computed(() => {
      return props.customStyle;
    });

    // 事件处理
    const handleClick = async () => {
      if (isDisabled.value) return;

      const newValue = isChecked.value
        ? props.inactiveValue
        : props.activeValue;

      // 如果有 beforeChange 钩子，先执行
      if (props.beforeChange) {
        try {
          const result = await props.beforeChange();
          if (result === false) {
            return; // 阻止切换
          }
        } catch (error) {
          return; // Promise reject 时阻止切换
        }
      }

      updateValue(newValue);
      emit("change", newValue);
    };

    return {
      ns,
      switchRef,
      isChecked,
      isDisabled,
      mergedClass,
      switchClass,
      mergedStyle,
      handleClick,
      isUrl,
      // 暴露方法
      focus: () => switchRef.value?.focus(),
      blur: () => switchRef.value?.blur(),
    };
  },
});
</script>
