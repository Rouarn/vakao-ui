<template>
  <Teleport to="body">
    <Transition name="vk-message-box-fade">
      <div
        v-if="visible"
        class="vk-message-box-wrapper"
        @click="handleWrapperClick"
      >
        <div class="vk-message-box" :class="messageBoxClass">
          <!-- 头部 -->
          <div class="vk-message-box__header">
            <div class="vk-message-box__title">
              <VkIcon
                v-if="iconName"
                :class="iconClass"
                :icon="iconName"
                :color="iconColor"
              />
              {{ title }}
            </div>
            <button
              v-if="showClose"
              class="vk-message-box__close"
              @click="handleClose"
            >
              <Icon icon="mdi:close" />
            </button>
          </div>

          <!-- 内容 -->
          <div class="vk-message-box__content">
            <div class="vk-message-box__message">{{ message }}</div>
            <!-- 输入框 (用于 prompt 类型) -->
            <div v-if="showInput" class="vk-message-box__input">
              <VkInput
                ref="inputRef"
                v-model="inputValue"
                type="text"
                :placeholder="inputPlaceholder"
                clearable
                @keydown.enter="handleConfirm"
                @blur="handleInputBlur"
              />
              <div
                v-if="inputErrorMessage"
                class="vk-message-box__error-message"
              >
                {{ inputErrorMessage }}
              </div>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="vk-message-box__footer">
            <VkButton
              v-if="showCancelButton"
              @click="handleCancel"
              :class="cancelButtonClass"
            >
              {{ cancelText }}
            </VkButton>
            <VkButton
              v-if="showConfirmButton"
              @click="handleConfirm"
              :type="confirmButtonType"
              :class="confirmButtonClass"
            >
              {{ confirmText }}
            </VkButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onUnmounted,
  type PropType,
} from "vue";
import {
  messageBoxProps,
  messageBoxEmits,
  type MessageBoxAction,
} from "./types";
import { ComponentType } from "../../../types";
import VkButton from "../../VkButton";
import VkIcon from "../../VkIcon";
import VkInput from "../../VkInput";
import { Icon } from "@iconify/vue";

export default defineComponent({
  name: "VkMessageBox",
  components: {
    VkButton,
    VkIcon,
    VkInput,
    Icon,
  },
  props: {
    ...messageBoxProps,
    onAction: {
      type: Function as PropType<
        (action: MessageBoxAction, instance: any) => void
      >,
    },
  },
  emits: messageBoxEmits,
  setup(props, { emit }) {
    const visible = ref(false);
    const inputRef = ref<HTMLInputElement>();
    const inputValue = ref(props.inputValue || "");
    const inputErrorMessage = ref("");
    const hasInputBlurred = ref(false); // 追踪输入框是否已经失焦过

    // 计算属性
    const messageBoxClass = computed(() => [`vk-message-box--${props.type}`]);

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

    const iconClass = computed(() => [
      "vk-message-box__icon",
      `vk-message-box__icon--${props.type}`,
    ]);

    const confirmButtonType = computed((): ComponentType => {
      const typeMap: Record<string, ComponentType> = {
        success: "success",
        warning: "warning",
        error: "danger",
        info: "info",
      };
      return typeMap[props.type] || "primary";
    });

    const confirmButtonClass = computed(() => ["vk-message-box__confirm"]);

    const cancelButtonClass = computed(() => ["vk-message-box__cancel"]);

    // 输入验证方法
    const validateInput = (showError = true) => {
      if (!props.showInput) return true;

      const value = inputValue.value;

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
        if (showError)
          inputErrorMessage.value = props.inputErrorMessage || "输入格式不正确";
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
        visible,
        value: inputValue.value,
        close: () => {
          visible.value = false;
        },
      };
    };

    // 键盘事件处理
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.closeOnPressEscape) {
        handleClose();
      }
    };

    // 生命周期
    onMounted(() => {
      visible.value = true;
      document.addEventListener("keydown", handleKeydown);

      // 如果显示输入框，自动聚焦
      if (props.showInput && inputRef.value) {
        setTimeout(() => {
          inputRef.value?.focus();
        }, 100);
      }
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
    });

    // 返回所有需要在模板中使用的变量和方法
    return {
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
      },
    };
  },
});
</script>

<style>
.vk-message-box-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.vk-message-box {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  min-width: 420px;
  max-width: 500px;
  overflow: hidden;
}

.vk-message-box__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0;
}

.vk-message-box__title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.vk-message-box__icon {
  margin-right: 12px;
  font-size: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vk-message-box__icon--success {
  color: #10b981;
}

.vk-message-box__icon--warning {
  color: #f59e0b;
}

.vk-message-box__icon--error {
  color: #ef4444;
}

.vk-message-box__icon--info {
  color: #3b82f6;
}

.vk-message-box__close {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.vk-message-box__close:hover {
  background: #f3f4f6;
  color: #374151;
}

.vk-message-box__content {
  padding: 16px 24px;
}

.vk-message-box__message {
  font-size: 15px;
  color: #4b5563;
  line-height: 1.5;
  margin: 0;
}

.vk-message-box__input {
  margin: 16px 0 0;
}

.vk-message-box__error-message {
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
}

.vk-message-box__footer {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 动画 */
.vk-message-box-fade-enter-active {
  transition: all 0.3s ease;
}

.vk-message-box-fade-leave-active {
  transition: all 0.2s ease;
}

.vk-message-box-fade-enter-active .vk-message-box {
  transition: all 0.3s ease;
}

.vk-message-box-fade-leave-active .vk-message-box {
  transition: all 0.2s ease;
}

.vk-message-box-fade-enter-from,
.vk-message-box-fade-leave-to {
  opacity: 0;
}

.vk-message-box-fade-enter-from .vk-message-box {
  transform: scale(0.95);
  opacity: 0;
}

.vk-message-box-fade-leave-to .vk-message-box {
  transform: scale(0.98);
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .vk-message-box {
    min-width: auto;
    width: 100%;
    max-width: 90vw;
    margin: 0 20px;
  }

  .vk-message-box__header,
  .vk-message-box__content,
  .vk-message-box__footer {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
