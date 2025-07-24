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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from "vue";
import { messageBoxProps, type MessageBoxAction } from "./types";
import { ComponentType } from "../../../types";
import VkButton from "../../VkButton";
import VkIcon from "../../VkIcon";

defineOptions({
  name: "VkMessageBox",
});

const props = defineProps(messageBoxProps);
const emit = defineEmits<{
  action: [action: MessageBoxAction, instance: any];
}>();

const visible = ref(false);

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

// 方法
const handleConfirm = () => {
  emit("action", "confirm", getMessageBoxInstance());
};

const handleCancel = () => {
  emit("action", "cancel", getMessageBoxInstance());
};

const handleClose = () => {
  emit("action", "close", getMessageBoxInstance());
};

const handleWrapperClick = (e: Event) => {
  if (e.target === e.currentTarget && props.closeOnClickModal) {
    handleClose();
  }
};

const getMessageBoxInstance = () => {
  return {
    visible,
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
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

// 暴露方法
defineExpose({
  visible,
  close: () => {
    visible.value = false;
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
