<template>
  <div
    ref="triggerRef"
    :class="ns.block()"
    @click="handleTriggerClick"
    @mouseenter="handleTriggerMouseEnter"
    @mouseleave="handleTriggerMouseLeave"
    @focus="handleTriggerFocus"
    @blur="handleTriggerBlur"
  >
    <!-- 触发元素插槽 -->
    <slot v-if="!virtualTriggering" />

    <!-- 工具提示弹出层 -->
    <Teleport :to="appendTo" :disabled="!shouldTeleport">
      <Transition
        :name="transitionName"
        @before-enter="handleBeforeShow"
        @after-enter="handleShow"
        @before-leave="handleBeforeHide"
        @after-leave="handleHide"
      >
        <div
          v-show="isVisible && !isEmpty"
          ref="popperRef"
          :class="popperClasses"
          :style="popperStyles"
          role="tooltip"
          :aria-hidden="!isVisible"
          @mouseenter="handlePopperMouseEnter"
          @mouseleave="handlePopperMouseLeave"
        >
          <!-- 箭头 -->
          <div v-if="showArrow" :class="ns.element('arrow')" :data-popper-arrow="''" />

          <!-- 内容 -->
          <div :class="ns.element('content')">
            <slot name="content">
              <span v-if="!rawContent">{{ content }}</span>
              <span v-else v-html="content" />
            </slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { createPopper } from "@popperjs/core";
import type { Instance as PopperInstance, Placement } from "@popperjs/core";
import { useClickOutside, useEventListener } from "@vakao-ui/hooks";
import { useNamespace } from "@vakao-ui/utils";
import { isString } from "@vakao-ui/utils";
import { tooltipProps, tooltipEmits } from "./types";
import type { TooltipInstance } from "./types";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkTooltip",
  inheritAttrs: false,
});

// 组件属性和事件
const props = defineProps(tooltipProps);
const emit = defineEmits(tooltipEmits);

// 命名空间
const ns = useNamespace("tooltip");

// 模板引用
const triggerRef = ref<HTMLElement | null>(null);
const popperRef = ref<HTMLElement>();

// 状态管理
const isVisible = ref(false);
const popperInstance = ref<PopperInstance>();
const showTimer = ref<NodeJS.Timeout>();
const hideTimer = ref<NodeJS.Timeout>();
const autoCloseTimer = ref<NodeJS.Timeout>();

// 计算属性
const isEmpty = computed(() => {
  if (!props.hideOnEmpty) return false;
  return !props.content && !slots.content;
});

const shouldTeleport = computed(() => {
  return props.appendTo !== "";
});

const transitionName = computed(() => {
  return `vk-${props.transition}`;
});

const popperClasses = computed(() => {
  return [ns.element("popper"), ns.modifier(props.effect), ns.modifier(props.placement), props.popperClass];
});

const popperStyles = computed(() => {
  const styles: Record<string, string | number> = {
    maxWidth: isString(props.maxWidth) ? props.maxWidth : `${props.maxWidth}px`,
  };

  if (props.popperStyle) {
    if (isString(props.popperStyle)) {
      // 将字符串样式解析为对象
      const additionalStyles: Record<string, string> = {};
      props.popperStyle.split(";").forEach((rule) => {
        const [property, value] = rule.split(":").map((s) => s.trim());
        if (property && value) {
          additionalStyles[property] = value;
        }
      });
      return { ...styles, ...additionalStyles };
    }
    return { ...styles, ...props.popperStyle };
  }

  return styles;
});

const placementMap: Record<string, Placement> = {
  top: "top",
  "top-start": "top-start",
  "top-end": "top-end",
  bottom: "bottom",
  "bottom-start": "bottom-start",
  "bottom-end": "bottom-end",
  left: "left",
  "left-start": "left-start",
  "left-end": "left-end",
  right: "right",
  "right-start": "right-start",
  "right-end": "right-end",
};

// 插槽
const slots = defineSlots<{
  default?: () => never;
  content?: () => never;
}>();

// 清除定时器
const clearTimers = () => {
  if (showTimer.value) {
    clearTimeout(showTimer.value);
    showTimer.value = undefined;
  }
  if (hideTimer.value) {
    clearTimeout(hideTimer.value);
    hideTimer.value = undefined;
  }
  if (autoCloseTimer.value) {
    clearTimeout(autoCloseTimer.value);
    autoCloseTimer.value = undefined;
  }
};

// 创建 Popper 实例
const createPopperInstance = async () => {
  if (!triggerRef.value || !popperRef.value) return;

  await nextTick();

  const triggerElement = props.virtualTriggering && props.virtualRef ? props.virtualRef : triggerRef.value;

  if (!triggerElement) return;

  popperInstance.value = createPopper(triggerElement, popperRef.value, {
    placement: placementMap[props.placement] || "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: props.offset,
        },
      },
      {
        name: "arrow",
        options: {
          element: "[data-popper-arrow]",
        },
      },
      {
        name: "preventOverflow",
        options: {
          boundary: "viewport",
          padding: 8,
        },
      },
    ],
  });
};

// 更新 Popper 位置
const updatePopper = () => {
  popperInstance.value?.update();
};

// 显示工具提示
const show = () => {
  if (props.disabled || isEmpty.value) return;

  clearTimers();

  if (props.showDelay > 0) {
    showTimer.value = setTimeout(() => {
      doShow();
    }, props.showDelay);
  } else {
    doShow();
  }
};

// 执行显示
const doShow = async () => {
  if (isVisible.value) return;

  isVisible.value = true;
  emit("update:visible", true);

  await nextTick();
  await createPopperInstance();

  // 自动关闭
  if (props.autoClose > 0) {
    autoCloseTimer.value = setTimeout(() => {
      hide();
    }, props.autoClose);
  }
};

// 隐藏工具提示
const hide = () => {
  clearTimers();

  if (props.hideDelay > 0) {
    hideTimer.value = setTimeout(() => {
      doHide();
    }, props.hideDelay);
  } else {
    doHide();
  }
};

// 执行隐藏
const doHide = () => {
  if (!isVisible.value) return;

  isVisible.value = false;
  emit("update:visible", false);
};

// 切换显示状态
const toggle = () => {
  if (isVisible.value) {
    hide();
  } else {
    show();
  }
};

// 销毁 Popper 实例
const destroyPopper = () => {
  popperInstance.value?.destroy();
  popperInstance.value = undefined;
};

// 事件处理
const handleTriggerClick = () => {
  if (props.trigger === "click") {
    toggle();
  }
};

const handleTriggerMouseEnter = () => {
  if (props.trigger === "hover") {
    show();
  }
};

const handleTriggerMouseLeave = () => {
  if (props.trigger === "hover") {
    hide();
  }
};

const handleTriggerFocus = () => {
  if (props.trigger === "focus") {
    show();
  }
};

const handleTriggerBlur = () => {
  if (props.trigger === "focus") {
    hide();
  }
};

const handlePopperMouseEnter = () => {
  if (props.trigger === "hover") {
    clearTimers();
  }
};

const handlePopperMouseLeave = () => {
  if (props.trigger === "hover") {
    hide();
  }
};

const handleBeforeShow = () => {
  emit("before-show");
};

const handleShow = () => {
  emit("show");
};

const handleBeforeHide = () => {
  emit("before-hide");
};

const handleHide = () => {
  emit("hide");
  destroyPopper();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.hideOnEscape && event.key === "Escape" && isVisible.value) {
    hide();
  }
};

// 点击外部关闭
const [clickOutsideRef, setClickOutsideEnabled] = useClickOutside(() => {
  if (isVisible.value && props.trigger !== "manual") {
    hide();
  }
});

// 监听点击外部关闭配置
watch(
  () => props.hideOnClickOutside,
  (enabled) => {
    setClickOutsideEnabled(enabled);
  },
  { immediate: true },
);

// 同步 clickOutsideRef 与 triggerRef
watch(
  triggerRef,
  (newTriggerRef) => {
    if (newTriggerRef) {
      clickOutsideRef.value = newTriggerRef;
    }
  },
  { immediate: true },
);

// 监听 visible 属性变化
watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible !== undefined) {
      if (newVisible) {
        show();
      } else {
        hide();
      }
    }
  },
  { immediate: true },
);

// 监听内容变化
watch(
  () => [props.content, slots.content],
  () => {
    if (isEmpty.value && isVisible.value) {
      hide();
    }
  },
);

// 事件监听器
let removeKeydownListener: (() => void) | undefined;

// 生命周期
onMounted(() => {
  // 键盘事件
  if (props.hideOnEscape) {
    const [, removeKeydown] = useEventListener(() => document, "keydown", handleKeydown);
    removeKeydownListener = removeKeydown;
  }
});

onUnmounted(() => {
  clearTimers();
  destroyPopper();

  // 清理事件监听器
  removeKeydownListener?.();
});

// 暴露实例方法
const instance: TooltipInstance = {
  show,
  hide,
  toggle,
  updatePopper,
  destroy: () => {
    clearTimers();
    destroyPopper();
  },
};

defineExpose(instance);
</script>
