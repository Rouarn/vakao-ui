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
              <VkIcon v-if="iconName" :name="iconName" :class="iconClass" />
              {{ title }}
            </div>
            <button
              v-if="showClose"
              class="vk-message-box__close"
              @click="handleClose"
            >
              ×
            </button>
          </div>

          <!-- 内容 -->
          <div class="vk-message-box__content">
            <div class="vk-message-box__message">{{ message }}</div>
            <!-- 输入框 (用于 prompt 类型) -->
            <div v-if="showInput" class="vk-message-box__input">
              <input
                ref="inputRef"
                v-model="inputValue"
                type="text"
                :placeholder="inputPlaceholder"
                class="vk-message-box__input-inner"
                @keyup.enter="handleConfirm"
              />
              <div v-if="inputErrorMessage" class="vk-message-box__error-message">
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
import { defineComponent, ref, computed, onMounted, onUnmounted, type PropType } from "vue";
import { messageBoxProps, type MessageBoxAction } from "./types";
import { ComponentType } from "../../../types";
import VkButton from "../../VkButton";
import VkIcon from "../../VkIcon";

export default defineComponent({
  name: "VkMessageBox",
  components: {
    VkButton,
    VkIcon
  },
  props: {
    ...messageBoxProps,
    onAction: {
      type: Function as PropType<(action: MessageBoxAction, instance: any) => void>
    }
  },
  emits: {
    'action': (_action: MessageBoxAction, _instance: any) => true
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const inputRef = ref<HTMLInputElement>();
    const inputValue = ref(props.inputValue || '');
    const inputErrorMessage = ref(props.inputErrorMessage || '');

// 计算属性
const messageBoxClass = computed(() => [`vk-message-box--${props.type}`]);

const iconName = computed(() => {
  const iconMap = {
    success: "checkmark-circle",
    warning: "warning",
    error: "close-circle",
    info: "information-circle",
  };
  return iconMap[props.type];
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
const validateInput = () => {
  if (!props.showInput) return true;
  
  const value = inputValue.value;
  
  // 使用自定义验证函数
  if (props.inputValidator) {
    const result = props.inputValidator(value);
    if (result === false) {
      inputErrorMessage.value = '输入不符合要求';
      return false;
    }
    if (typeof result === 'string') {
      inputErrorMessage.value = result;
      return false;
    }
  }
  
  // 使用正则表达式验证
  if (props.inputPattern && !props.inputPattern.test(value)) {
    inputErrorMessage.value = props.inputErrorMessage || '输入格式不正确';
    return false;
  }
  
  inputErrorMessage.value = '';
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
      iconClass,
      confirmButtonType,
      confirmButtonClass,
      cancelButtonClass,
      validateInput,
      handleConfirm,
      handleCancel,
      handleClose,
      handleWrapperClick,
      getMessageBoxInstance,
      // 暴露方法
      close: () => {
        visible.value = false;
      }
    };
  }
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
}

.vk-message-box {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 420px;
  max-width: 500px;
  overflow: hidden;
}

.vk-message-box__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 10px;
}

.vk-message-box__title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.vk-message-box__icon {
  margin-right: 8px;
  font-size: 20px;
}

.vk-message-box__icon--success {
  color: #67c23a;
}

.vk-message-box__icon--warning {
  color: #e6a23c;
}

.vk-message-box__icon--error {
  color: #f56c6c;
}

.vk-message-box__icon--info {
  color: #409eff;
}

.vk-message-box__close {
  background: none;
  border: none;
  font-size: 20px;
  color: #909399;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vk-message-box__close:hover {
  color: #409eff;
}

.vk-message-box__content {
  padding: 10px 20px 20px;
}

.vk-message-box__message {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
}

.vk-message-box__input {
  margin: 16px 0;
}

.vk-message-box__input-inner {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.vk-message-box__input-inner:focus {
  border-color: #409eff;
}

.vk-message-box__error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 4px;
}

.vk-message-box__footer {
  padding: 10px 20px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 动画 */
.vk-message-box-fade-enter-active,
.vk-message-box-fade-leave-active {
  transition: opacity 0.3s;
}

.vk-message-box-fade-enter-active .vk-message-box,
.vk-message-box-fade-leave-active .vk-message-box {
  transition: transform 0.3s;
}

.vk-message-box-fade-enter-from,
.vk-message-box-fade-leave-to {
  opacity: 0;
}

.vk-message-box-fade-enter-from .vk-message-box,
.vk-message-box-fade-leave-to .vk-message-box {
  transform: scale(0.9);
}
</style>
