<template>
  <Teleport to="body">
    <Transition name="vk-fade">
      <div v-if="visible" :class="ns.element('wrapper')" @click="handleWrapperClick">
        <div :class="[ns.block(), messageBoxClass]">
          <!-- 头部 -->
          <div :class="ns.element('header')">
            <div :class="ns.element('title')">
              <VkIcon v-if="iconName" :class="iconClass" :icon="iconName" :color="iconColor" />
              {{ title }}
            </div>
            <button v-if="showClose" :class="ns.element('close')" @click="handleClose">
              <Icon icon="mdi:close" />
            </button>
          </div>

          <!-- 内容 -->
          <div :class="ns.element('content')">
            <div :class="ns.element('message')">
              {{ message }}
            </div>
            <!-- 输入框 (用于 prompt 类型) -->
            <div v-if="showInput" :class="ns.element('input')">
              <VkInput
                ref="inputRef"
                v-model="inputValue"
                type="text"
                :placeholder="inputPlaceholder"
                clearable
                @keydown.enter="handleConfirm"
                @blur="handleInputBlur"
              />
              <div v-if="inputErrorMessage" :class="ns.element('error-message')">
                {{ inputErrorMessage }}
              </div>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div :class="ns.element('footer')">
            <VkButton v-if="showCancelButton" :class="cancelButtonClass" @click="handleCancel">
              {{ cancelText }}
            </VkButton>
            <VkButton v-if="showConfirmButton" :type="confirmButtonType" :class="confirmButtonClass" @click="handleConfirm">
              {{ confirmText }}
            </VkButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from "vue";
import { messageBoxProps, messageBoxEmits } from "./types";
import type { ComponentType } from "../../../types";
import VkButton from "../../VkButton";
import VkIcon from "../../VkIcon";
import VkInput from "../../VkInput";
import { Icon } from "@iconify/vue";
import { useNamespace } from "@vakao-ui/utils";

export default defineComponent({
  name: "VkMessageBox",
  components: {
    VkButton,
    VkIcon,
    VkInput,
    Icon,
  },
  props: messageBoxProps,
  emits: messageBoxEmits,
  setup(props, { emit }) {
    const visible = ref(false);
    const inputRef = ref<HTMLInputElement>();
    const inputValue = ref(props.inputValue || "");
    const inputErrorMessage = ref("");
    const hasInputBlurred = ref(false); // 追踪输入框是否已经失焦过
    const ns = useNamespace("message-box");

    // 计算属性
    const messageBoxClass = computed(() => [ns.modifier(props.type)]);

    const iconName = computed(() => {
      const iconMap = {
        success: "mdi:check-circle",
        warning: "mdi:alert",
        error: "mdi:close-circle",
        info: "mdi:information",
      };
      return iconMap[props.type];
    });

    const iconColor = computed(() => {
      const colorMap = {
        success: "var(--vk-color-success)",
        warning: "var(--vk-color-warning)",
        error: "var(--vk-color-danger)",
        info: "var(--vk-color-info)",
      };
      return colorMap[props.type];
    });

    const iconClass = computed(() => [ns.element("icon"), `${ns.element("icon")}--${props.type}`]);

    const confirmButtonType = computed((): ComponentType => {
      const typeMap: Record<string, ComponentType> = {
        success: "success",
        warning: "warning",
        error: "danger",
        info: "info",
      };
      return typeMap[props.type] || "primary";
    });

    const confirmButtonClass = computed(() => []);

    const cancelButtonClass = computed(() => []);

    // 输入验证方法
    const validateInput = (showError = true) => {
      if (!props.showInput) return true;

      const { value } = inputValue;

      // 如果还没有交互过且不强制显示错误，则不验证
      if (!hasInputBlurred.value && !showError) {
        return true;
      }

      // 使用自定义验证函数
      if (props.inputValidator) {
        const result = props.inputValidator(value);
        if (result === false) {
          if (showError) inputErrorMessage.value = "输入不符合要求";
          return false;
        }
        if (typeof result === "string") {
          if (showError) inputErrorMessage.value = result;
          return false;
        }
      }

      // 使用正则表达式验证
      if (props.inputPattern && !props.inputPattern.test(value)) {
        if (showError) inputErrorMessage.value = props.inputErrorMessage || "输入格式不正确";
        return false;
      }

      inputErrorMessage.value = "";
      return true;
    };

    // 方法
    const handleConfirm = () => {
      if (!validateInput()) {
        return;
      }

      const instance = getMessageBoxInstance();
      emit("action", "confirm", instance);
      if (props.onAction) {
        props.onAction("confirm", instance);
      }
    };

    const handleCancel = () => {
      const instance = getMessageBoxInstance();
      emit("action", "cancel", instance);
      if (props.onAction) {
        props.onAction("cancel", instance);
      }
    };

    const handleClose = () => {
      const instance = getMessageBoxInstance();
      emit("action", "close", instance);
      if (props.onAction) {
        props.onAction("close", instance);
      }
    };

    const handleWrapperClick = (e: Event) => {
      if (e.target === e.currentTarget && props.closeOnClickModal) {
        handleClose();
      }
    };

    const handleInputBlur = () => {
      hasInputBlurred.value = true;
      validateInput(true); // 失焦时进行验证并显示错误
    };

    const getMessageBoxInstance = () => {
      return {
        visible: visible.value,
        value: inputValue.value,
        close: () => {
          visible.value = false;
          restoreBodyScroll();
        },
      };
    };

    // 键盘事件处理
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.closeOnPressEscape) {
        handleClose();
      }
    };

    // 禁止背景滚动
    const preventBodyScroll = () => {
      const body = document.body as HTMLElement;

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
    };

    // 恢复背景滚动
    const restoreBodyScroll = () => {
      const body = document.body as HTMLElement;
      body.style.overflow = "";
      body.style.paddingRight = "";
    };

    // 生命周期
    onMounted(() => {
      visible.value = true;
      document.addEventListener("keydown", handleKeydown);
      preventBodyScroll();

      // 如果显示输入框，自动聚焦
      if (props.showInput && inputRef.value) {
        setTimeout(() => {
          inputRef.value?.focus();
        }, 100);
      }
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
      restoreBodyScroll();
    });

    // 返回所有需要在模板中使用的变量和方法
    return {
      ns,
      visible,
      inputRef,
      inputValue,
      inputErrorMessage,
      messageBoxClass,
      iconName,
      iconColor,
      iconClass,
      confirmButtonType,
      confirmButtonClass,
      cancelButtonClass,
      validateInput,
      handleConfirm,
      handleCancel,
      handleClose,
      handleWrapperClick,
      handleInputBlur,
      getMessageBoxInstance,
      // 暴露方法
      close: () => {
        visible.value = false;
        restoreBodyScroll();
      },
    };
  },
});
</script>
