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
              <component v-if="isVNode(message)" :is="message" />
              <span v-else>{{ message }}</span>
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
              {{ dynamicCancelText }}
            </VkButton>
            <VkButton
              v-if="showConfirmButton"
              :type="confirmButtonType"
              :class="confirmButtonClass"
              :loading="confirmButtonLoading"
              @click="handleConfirm"
            >
              {{ dynamicConfirmText }}
            </VkButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, isVNode } from "vue";
import { messageBoxProps, messageBoxEmits, MessageBoxType } from "./types";
import type { ComponentType } from "@/types";
import VkButton from "../../VkButton";
import VkIcon from "../../VkIcon";
import VkInput from "../../VkInput";
import { Icon } from "@iconify/vue";
import { useNamespace } from "@vakao-ui/utils";

// 定义组件名称
defineOptions({
  name: "VkMessageBox",
});

// 定义props和emits
const props = defineProps(messageBoxProps);
const emit = defineEmits(messageBoxEmits);
const visible = ref(false);
const inputRef = ref<HTMLInputElement>();
const inputValue = ref(props.inputValue || "");
const inputErrorMessage = ref("");
const hasInputBlurred = ref(false); // 追踪输入框是否已经失焦过
const confirmButtonLoading = ref(false);
const dynamicConfirmText = ref(props.confirmText);
const dynamicCancelText = ref(props.cancelText);
const ns = useNamespace("message-box");

// 计算属性
const messageBoxClass = computed(() => [ns.modifier(props.type)]);

const iconName = computed(() => {
  const iconMap: Record<MessageBoxType, string> = {
    success: "mdi:check-circle",
    warning: "mdi:alert",
    error: "mdi:close-circle",
    info: "mdi:information",
  };
  return iconMap[props.type as MessageBoxType];
});

const iconColor = computed(() => {
  const colorMap: Record<MessageBoxType, string> = {
    success: "var(--vk-color-success)",
    warning: "var(--vk-color-warning)",
    error: "var(--vk-color-danger)",
    info: "var(--vk-color-info)",
  };
  return colorMap[props.type as MessageBoxType];
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

// 执行关闭前回调
const executeBeforeClose = async (action: string, instance: any): Promise<boolean> => {
  if (props.beforeClose) {
    try {
      // 检查 beforeClose 函数的参数个数，判断是否使用 done 回调模式
      if (props.beforeClose.length >= 3) {
        // done 回调模式
        return new Promise<boolean>((resolve) => {
          const done = () => resolve(true);
          const result = props.beforeClose!(action as any, instance, done);

          // 如果返回了 Promise，等待它完成
          if (result instanceof Promise) {
            result
              .then((res) => {
                if (res === false) {
                  resolve(false);
                }
                // 如果返回 true 或其他值，等待 done 被调用
              })
              .catch(() => {
                resolve(false);
              });
          } else if (result === false) {
            // 如果直接返回 false，立即拒绝
            resolve(false);
          }
          // 否则等待 done 被调用
        });
      } else {
        // 传统的返回值模式
        const result = await props.beforeClose(action as any, instance);
        return result !== false;
      }
    } catch {
      return false;
    }
  }
  return true;
};

// 方法
const handleConfirm = async () => {
  if (!validateInput()) {
    return;
  }

  const instance = getMessageBoxInstance();
  const canClose = await executeBeforeClose("confirm", instance);
  if (!canClose) {
    return;
  }

  emit("action", "confirm", instance);
  if (props.onAction && typeof props.onAction === "function") {
    props.onAction("confirm", instance);
  }
};

const handleCancel = async () => {
  const instance = getMessageBoxInstance();
  const canClose = await executeBeforeClose("cancel", instance);
  if (!canClose) {
    return;
  }

  emit("action", "cancel", instance);
  if (props.onAction && typeof props.onAction === "function") {
    props.onAction("cancel", instance);
  }
};

const handleClose = async () => {
  const instance = getMessageBoxInstance();
  const canClose = await executeBeforeClose("close", instance);
  if (!canClose) {
    return;
  }

  emit("action", "close", instance);
  if (props.onAction && typeof props.onAction === "function") {
    props.onAction("close", instance);
  }
};

const handleWrapperClick = async (e: Event) => {
  if (e.target === e.currentTarget && props.closeOnClickModal) {
    const instance = getMessageBoxInstance();
    const canClose = await executeBeforeClose("close", instance);
    if (!canClose) {
      return;
    }

    emit("action", "close", instance);
    if (props.onAction && typeof props.onAction === "function") {
      props.onAction("close", instance);
    }
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
    get confirmButtonLoading() {
      return confirmButtonLoading.value;
    },
    set confirmButtonLoading(value: boolean) {
      confirmButtonLoading.value = value;
    },
    get confirmText() {
      return dynamicConfirmText.value;
    },
    set confirmText(value: string) {
      dynamicConfirmText.value = value;
    },
    get cancelText() {
      return dynamicCancelText.value;
    },
    set cancelText(value: string) {
      dynamicCancelText.value = value;
    },
  };
};

// 键盘事件处理
const handleKeydown = async (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.closeOnPressEscape) {
    const instance = getMessageBoxInstance();
    const canClose = await executeBeforeClose("close", instance);
    if (!canClose) {
      return;
    }

    emit("action", "close", instance);
    if (props.onAction && typeof props.onAction === "function") {
      props.onAction("close", instance);
    }
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

// 暴露方法给父组件
defineExpose({
  close: () => {
    visible.value = false;
    restoreBodyScroll();
  },
  getMessageBoxInstance,
});
</script>
