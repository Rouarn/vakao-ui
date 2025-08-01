<template>
  <div
    ref="selectRef"
    :class="mergedClass"
    :style="mergedStyle"
    @click="handleClick"
  >
    <!-- 选择器输入区域 -->
    <div :class="ns.element('input')">
      <!-- 多选标签 -->
      <template v-if="multiple && selectedOptions.length > 0">
        <span
          v-for="option in selectedOptions"
          :key="String(option.value)"
          :class="ns.element('tag')"
        >
          {{ option.label }}
          <VkIcon
            :class="ns.element('tag-close')"
            icon="mdi:close"
            size="12px"
            @click.stop="removeTag(option.value)"
          />
        </span>
      </template>

      <!-- 输入框或显示值 -->
      <VkInput
        v-if="filterable"
        ref="inputRef"
        :value="inputValue"
        :class="ns.element('inner')"
        :placeholder="currentPlaceholder"
        :disabled="disabled"
        :size="size"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span
        v-else
        :class="ns.element('inner')"
      >
        {{ displayValue }}
      </span>

      <!-- 后缀图标 -->
      <div :class="ns.element('suffix')">
        <!-- 清空按钮 -->
        <VkIcon
          v-if="showClearIcon"
          :class="ns.element('clear')"
          icon="mdi:close-circle"
          size="16px"
          @click.stop="handleClear"
        />
        <!-- 下拉箭头 -->
        <VkIcon
          v-else
          :class="[ns.element('arrow'), ns.is('reverse', dropdownVisible)]"
          icon="mdi:chevron-down"
          size="16px"
        />
      </div>
    </div>

    <!-- 下拉面板 -->
    <Transition name="vk-select-dropdown">
      <div
        v-show="dropdownVisible"
        ref="dropdownRef"
        :class="ns.element('dropdown')"
      >
        <!-- 加载状态 -->
        <div
          v-if="loading"
          :class="ns.element('loading')"
        >
          <VkIcon
            icon="mdi:loading"
            size="16px"
            class="rotating"
          />
          <span>{{ loadingText }}</span>
        </div>

        <!-- 选项列表 -->
        <ul
          v-else-if="hasVisibleOptions"
          :class="ns.element('options')"
        >
          <slot />
        </ul>

        <!-- 无数据 -->
        <div
          v-else
          :class="ns.element('empty')"
        >
          {{ searchQuery ? noMatchText : noDataText }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  provide,
  onMounted,
  onUnmounted,
  type StyleValue,
} from "vue";
import {
  selectProps,
  selectEmits,
  type SelectValue,
  type SelectOption,
} from "./types";
import { useNamespace, useControlled } from "@vakao-ui/utils";
import VkIcon from "../../VkIcon";
import VkInput from "../../VkInput";

export default defineComponent({
  name: "VkSelect",
  components: {
    VkIcon,
    VkInput,
  },
  props: selectProps,
  emits: selectEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace("select");

    // 模板引用
    const selectRef = ref<HTMLElement>();
    const inputRef = ref<InstanceType<typeof VkInput>>();
    const dropdownRef = ref<HTMLElement>();

    // 响应式状态
    const dropdownVisible = ref(false);
    const searchQuery = ref("");
    const isFocused = ref(false);
    const options = reactive<SelectOption[]>([]);

    // 使用受控/非受控模式工具函数
    const { currentValue, updateValue } = useControlled<
      SelectValue | SelectValue[]
    >(
      props,
      "value",
      "modelValue",
      emit as (event: string, ...args: unknown[]) => void,
      props.multiple ? ([] as SelectValue[]) : ("" as SelectValue),
    );

    // 计算属性
    const hasValue = computed(() => {
      if (props.multiple) {
        return (
          Array.isArray(currentValue.value) && currentValue.value.length > 0
        );
      }
      return (
        currentValue.value !== undefined &&
        currentValue.value !== null &&
        currentValue.value !== ""
      );
    });

    const selectedOptions = computed(() => {
      if (!props.multiple || !Array.isArray(currentValue.value)) return [];
      return options.filter((option) =>
        (currentValue.value as SelectValue[]).includes(option.value),
      );
    });

    const displayValue = computed(() => {
      if (props.multiple) return "";
      if (!hasValue.value) return "";
      const option = options.find((opt) => opt.value === currentValue.value);
      return option ? option.label : String(currentValue.value);
    });

    const currentPlaceholder = computed(() => {
      if (props.multiple && hasValue.value) return "";
      return props.placeholder;
    });

    const inputValue = computed({
      get: () => {
        if (dropdownVisible.value && searchQuery.value) {
          return searchQuery.value;
        }
        return displayValue.value;
      },
      set: (value: string) => {
        searchQuery.value = value;
      },
    });

    const filteredOptions = computed(() => {
      if (!props.filterable || !searchQuery.value) {
        return options;
      }
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
      );
    });

    const showClearIcon = computed(() => {
      return props.clearable && !props.disabled && hasValue.value;
    });

    const hasVisibleOptions = computed(() => {
      return filteredOptions.value.length > 0 || slots.default;
    });

    // 样式类名
    const mergedClass = computed(() => {
      return [
        ns.block(),
        ns.modifier("size", props.size),
        ns.is("disabled", props.disabled),
        ns.is("focused", isFocused.value),
        ns.is("multiple", props.multiple),
        ns.is("filterable", props.filterable),
        props.customClass,
      ];
    });

    const mergedStyle = computed(() => {
      return props.customStyle as StyleValue;
    });

    // 事件处理
    const handleClick = () => {
      if (props.disabled) return;
      if (props.filterable) {
        inputRef.value?.focus();
        if (!dropdownVisible.value) {
          showDropdown();
        }
      } else {
        // 非搜索模式下，直接切换下拉框状态
        toggleDropdown();
      }
    };

    const handleFocus = (evt: FocusEvent) => {
      if (props.disabled) return;
      isFocused.value = true;
      emit("focus", evt);
    };

    const handleBlur = (evt: FocusEvent) => {
      setTimeout(() => {
        isFocused.value = false;
        emit("blur", evt);
      }, 200);
    };

    const handleInput = (value: string) => {
      searchQuery.value = value;
      if (!dropdownVisible.value) {
        showDropdown();
      }
    };

    const handleClear = () => {
      if (props.disabled) return;

      const newValue = props.multiple ? [] : "";
      updateValue(newValue);
      emit("change", newValue);

      searchQuery.value = "";
      emit("clear");
      hideDropdown();
    };

    const removeTag = (value: SelectValue) => {
      if (props.disabled || !props.multiple) return;

      const currentValues = currentValue.value as SelectValue[];
      const newValues = currentValues.filter((v) => v !== value);
      updateValue(newValues);
      emit("remove-tag", value);
      emit("change", newValues);
    };

    // 下拉框控制
    const showDropdown = () => {
      if (props.disabled) return;
      dropdownVisible.value = true;
      emit("visible-change", true);
    };

    const hideDropdown = () => {
      dropdownVisible.value = false;
      emit("visible-change", false);
      searchQuery.value = "";
    };

    const toggleDropdown = () => {
      if (dropdownVisible.value) {
        hideDropdown();
      } else {
        showDropdown();
      }
    };

    // 选项管理
    const addOption = (option: SelectOption) => {
      const existingIndex = options.findIndex(
        (opt) => opt.value === option.value,
      );
      if (existingIndex === -1) {
        options.push(option);
      } else {
        options[existingIndex] = option;
      }
    };

    const removeOption = (value: SelectValue) => {
      const index = options.findIndex((opt) => opt.value === value);
      if (index > -1) {
        options.splice(index, 1);
      }
    };

    const selectOption = (option: SelectOption) => {
      if (option.disabled) return;

      if (props.multiple) {
        const currentValues = (currentValue.value as SelectValue[]) || [];
        const index = currentValues.indexOf(option.value);
        let newValues: SelectValue[];

        if (index > -1) {
          // 取消选择
          newValues = currentValues.filter((v) => v !== option.value);
        } else {
          // 添加选择
          newValues = [...currentValues, option.value];
        }

        updateValue(newValues);
        emit("change", newValues);
      } else {
        // 单选模式
        updateValue(option.value);
        emit("change", option.value);
        hideDropdown(); // 单选后自动关闭
      }
    };

    const isSelected = (value: SelectValue) => {
      if (props.multiple) {
        return (
          Array.isArray(currentValue.value) &&
          currentValue.value.includes(value)
        );
      }
      return currentValue.value === value;
    };

    // 提供给子组件的上下文
    provide("VkSelect", {
      props,
      addOption,
      removeOption,
      selectOption,
      isSelected,
      filteredOptions,
    });

    // 点击外部关闭下拉框
    const handleClickOutside = (event: Event) => {
      // 延迟执行，确保选项点击事件先处理
      setTimeout(() => {
        if (
          selectRef.value &&
          !selectRef.value.contains(event.target as Node) &&
          dropdownRef.value &&
          !dropdownRef.value.contains(event.target as Node)
        ) {
          hideDropdown();
        }
      }, 0);
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      ns,
      selectRef,
      inputRef,
      dropdownRef,
      dropdownVisible,
      searchQuery,
      isFocused,
      options,
      currentValue,
      hasValue,
      selectedOptions,
      displayValue,
      currentPlaceholder,
      inputValue,
      filteredOptions,
      showClearIcon,
      hasVisibleOptions,
      mergedClass,
      mergedStyle,
      handleClick,
      handleFocus,
      handleBlur,
      handleInput,
      handleClear,
      removeTag,
      showDropdown,
      hideDropdown,
      toggleDropdown,
      addOption,
      removeOption,
      selectOption,
      isSelected,
    };
  },
});
</script>

<style lang="scss">
.vk-select {
  position: relative;
  display: inline-block;
  width: 100%;

  &__input {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 32px;
    padding: 4px 8px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
      border-color: #c0c4cc;
    }
  }

  &.is-focused &__input {
    border-color: #409eff;
  }

  &.is-disabled &__input {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  &__inner {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
  }

  &__suffix {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }

  &__arrow {
    transition: transform 0.2s;

    &.is-reverse {
      transform: rotate(180deg);
    }
  }

  &__clear {
    cursor: pointer;

    &:hover {
      color: #909399;
    }
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    height: 24px;
    background-color: #f0f2f5;
    border-radius: 4px;
    font-size: 12px;

    &-close {
      margin-left: 4px;
      cursor: pointer;

      &:hover {
        color: #909399;
      }
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
  }

  &__options {
    margin: 0;
    padding: 4px 0;
    list-style: none;
  }

  &__loading,
  &__empty {
    padding: 12px;
    text-align: center;
    color: #909399;
    font-size: 14px;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

.vk-select-dropdown-enter-active,
.vk-select-dropdown-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.vk-select-dropdown-enter-from,
.vk-select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
