<template>
  <div
    ref="triggerRef"
    :class="[
      ns.block(),
      {
        [ns.is('inline')]: props.inline,
      },
    ]"
  >
    <!-- 触发元素：用户提供的内容 -->
    <slot></slot>

    <!-- 提示框：使用 Teleport 将其移至 body 下，避免被父元素样式影响 -->
    <Teleport to="body">
      <Transition name="vk-fade">
        <div
          v-show="visible"
          ref="popperRef"
          :class="[ns.element('popper'), ns.modifier(props.theme), ns.modifier(actualPlacement), props.customClass]"
          :style="[popperStyle, props.customStyle]"
          @click="handleClick"
        >
          <!-- 提示内容 -->
          <div :class="ns.element('content')">
            <slot name="content">{{ props.content }}</slot>
          </div>

          <!-- 提示箭头 -->
          <div v-if="props.showArrow" :class="[ns.element('arrow'), ns.modifier(actualPlacement)]"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/**
 * VkTooltip 提示工具组件
 *
 * 这是一个轻量级的提示工具组件，用于在用户与元素交互时显示额外信息。
 * 支持多种触发方式、位置和主题。
 *
 * 主要特性：
 * - 多种触发方式：悬停、点击、聚焦
 * - 灵活的位置设置：上、右、下、左
 * - 主题支持：亮色/暗色主题
 * - 延迟显示和隐藏
 * - 自定义样式和类名
 * - 箭头指示
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <VkTooltip content="这是一个提示信息" placement="top">
 *     <VkButton>悬停查看提示</VkButton>
 *   </VkTooltip>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
/** 组件属性和事件定义 */
import { tooltipProps, tooltipEmits } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "@vakao-ui/utils";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkTooltip",
  inheritAttrs: false,
});

/** 组件属性定义 */
const props = defineProps(tooltipProps);

/** 组件事件定义 */
const emit = defineEmits(tooltipEmits);

// ==================== 响应式状态 ====================

/** 提示框是否可见 */
const visible = ref(false);

/** 触发元素引用 */
const triggerRef = ref<HTMLElement | null>(null);

/** 提示框元素引用 */
const popperRef = ref<HTMLElement | null>(null);

/** 实际显示位置 */
const actualPlacement = ref(props.placement);

/** 显示延迟定时器 */
let showTimer: ReturnType<typeof setTimeout> | null = null;

/** 隐藏延迟定时器 */
let hideTimer: ReturnType<typeof setTimeout> | null = null;

// ==================== 计算属性 ====================

/** CSS 命名空间 */
const ns = useNamespace("tooltip");

/**
 * 提示框样式
 *
 * 根据位置计算提示框的定位样式
 */
const popperStyle = computed(() => {
  if (!triggerRef.value) return { visibility: "hidden" as const };

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const { offset } = props;

  // 使用固定的tooltip尺寸进行计算，避免getBoundingClientRect的循环依赖
  const estimatedWidth = 200; // 预估宽度
  const estimatedHeight = 32; // 预估高度

  let left = 0;
  let top = 0;

  switch (actualPlacement.value) {
    case "top":
      left = triggerRect.left + (triggerRect.width - estimatedWidth) / 2;
      top = triggerRect.top - estimatedHeight - offset;
      break;
    case "bottom":
      left = triggerRect.left + (triggerRect.width - estimatedWidth) / 2;
      top = triggerRect.bottom + offset;
      break;
    case "left":
      left = triggerRect.left - estimatedWidth - offset;
      top = triggerRect.top + (triggerRect.height - estimatedHeight) / 2;
      break;
    case "right":
      left = triggerRect.right + offset;
      top = triggerRect.top + (triggerRect.height - estimatedHeight) / 2;
      break;
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
    visibility: "visible" as const,
  };
});

// ==================== 方法 ====================

/**
 * 显示提示框
 *
 * 根据设置的延迟时间显示提示框
 */
const show = () => {
  const { disabled, showDelay } = props;
  if (disabled) return;

  clearTimeout(hideTimer!);
  hideTimer = null;

  if (showTimer) return;

  showTimer = setTimeout(() => {
    visible.value = true;
    nextTick(() => {
      updatePosition();
    });
    emit("show");
    showTimer = null;
  }, showDelay);
};

/**
 * 隐藏提示框
 *
 * 根据设置的延迟时间隐藏提示框
 */
const hide = () => {
  clearTimeout(showTimer!);
  showTimer = null;

  if (hideTimer) return;

  const { hideDelay } = props;
  hideTimer = setTimeout(() => {
    visible.value = false;
    emit("hide");
    hideTimer = null;
  }, hideDelay);
};

/**
 * 更新提示框位置
 *
 * 根据触发元素位置计算提示框的最佳显示位置
 * 包含边界检测和自动位置调整
 */
const updatePosition = () => {
  if (!triggerRef.value || !popperRef.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const popperRect = popperRef.value.getBoundingClientRect();
  const { innerWidth, innerHeight } = window;
  const { offset, placement: originalPlacement } = props;

  let placement = originalPlacement;

  // 边界检测和自动调整位置
  switch (originalPlacement) {
    case "top":
      if (triggerRect.top - popperRect.height - offset < 0) {
        placement = "bottom";
      }
      break;
    case "bottom":
      if (triggerRect.bottom + popperRect.height + offset > innerHeight) {
        placement = "top";
      }
      break;
    case "left":
      if (triggerRect.left - popperRect.width - offset < 0) {
        placement = "right";
      }
      break;
    case "right":
      if (triggerRect.right + popperRect.width + offset > innerWidth) {
        placement = "left";
      }
      break;
  }

  actualPlacement.value = placement;

  // 精确位置调整
  nextTick(() => {
    if (!triggerRef.value || !popperRef.value) return;
    
    const updatedTriggerRect = triggerRef.value.getBoundingClientRect();
    const updatedPopperRect = popperRef.value.getBoundingClientRect();
    
    let left = 0;
    let top = 0;

    switch (actualPlacement.value) {
      case "top":
        left = updatedTriggerRect.left + (updatedTriggerRect.width - updatedPopperRect.width) / 2;
        top = updatedTriggerRect.top - updatedPopperRect.height - offset;
        break;
      case "bottom":
        left = updatedTriggerRect.left + (updatedTriggerRect.width - updatedPopperRect.width) / 2;
        top = updatedTriggerRect.bottom + offset;
        break;
      case "left":
        left = updatedTriggerRect.left - updatedPopperRect.width - offset;
        top = updatedTriggerRect.top + (updatedTriggerRect.height - updatedPopperRect.height) / 2;
        break;
      case "right":
        left = updatedTriggerRect.right + offset;
        top = updatedTriggerRect.top + (updatedTriggerRect.height - updatedPopperRect.height) / 2;
        break;
    }

    // 直接设置样式进行精确定位
    popperRef.value.style.left = `${left}px`;
    popperRef.value.style.top = `${top}px`;
  });
};

/**
 * 处理点击事件
 *
 * 当提示框被点击时触发
 *
 * @param event - 鼠标事件对象
 */
const handleClick = (event: MouseEvent) => {
  emit("click", event);
};

/**
 * 处理滚动事件
 *
 * 当页面或容器滚动时更新提示框位置
 */
const handleScroll = () => {
  if (visible.value) {
    updatePosition();
  }
};

/**
 * 添加事件监听器
 *
 * 根据触发方式添加相应的事件监听器
 */
const addEvents = () => {
  if (!triggerRef.value) return;

  const el = triggerRef.value;
  const { trigger } = props;

  if (trigger === "hover") {
    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);

    // 鼠标悬停在tooltip内容上时保持显示
    nextTick(() => {
      if (popperRef.value) {
        popperRef.value.addEventListener("mouseenter", show);
        popperRef.value.addEventListener("mouseleave", hide);
      }
    });
  } else if (trigger === "click") {
    clickHandler = () => {
      if (visible.value) {
        hide();
      } else {
        show();
      }
    };
    el.addEventListener("click", clickHandler);

    documentClickHandler = (e) => {
      if (!el.contains(e.target as Node) && !popperRef.value?.contains(e.target as Node)) {
        hide();
      }
    };
    document.addEventListener("click", documentClickHandler);
  } else if (trigger === "focus") {
    el.addEventListener("focus", show);
    el.addEventListener("blur", hide);
  }
};

// 存储事件处理函数的引用，用于正确移除事件监听器
let clickHandler: (() => void) | null = null;
let documentClickHandler: ((e: Event) => void) | null = null;

/**
 * 移除事件监听器
 *
 * 在组件销毁前移除所有事件监听器
 */
const removeEvents = () => {
  if (!triggerRef.value) return;

  const el = triggerRef.value;
  const { trigger } = props;

  if (trigger === "hover") {
    el.removeEventListener("mouseenter", show);
    el.removeEventListener("mouseleave", hide);

    // 移除tooltip内容的事件监听器
    if (popperRef.value) {
      popperRef.value.removeEventListener("mouseenter", show);
      popperRef.value.removeEventListener("mouseleave", hide);
    }
  } else if (trigger === "click") {
    if (clickHandler) {
      el.removeEventListener("click", clickHandler);
      clickHandler = null;
    }
    if (documentClickHandler) {
      document.removeEventListener("click", documentClickHandler);
      documentClickHandler = null;
    }
  } else if (trigger === "focus") {
    el.removeEventListener("focus", show);
    el.removeEventListener("blur", hide);
  }
};

// ==================== 生命周期钩子 ====================

/** 组件挂载后添加事件监听器 */
onMounted(() => {
  nextTick(() => {
    addEvents();
  });

  // 监听窗口大小变化，更新提示框位置
  window.addEventListener("resize", updatePosition);
  // 监听滚动事件，确保tooltip跟随元素移动
  window.addEventListener("scroll", handleScroll, true);
});

/** 组件销毁前移除事件监听器 */
onBeforeUnmount(() => {
  removeEvents();
  window.removeEventListener("resize", updatePosition);
  window.removeEventListener("scroll", handleScroll, true);

  // 清除定时器
  if (showTimer) {
    clearTimeout(showTimer);
    showTimer = null;
  }

  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
});

// ==================== 监听器 ====================

/** 监听禁用状态变化 */
watch(
  () => {
    const { disabled } = props;
    return disabled;
  },
  (newVal) => {
    if (newVal && visible.value) {
      visible.value = false;
    }
  },
);

/** 监听位置变化 */
watch(
  () => {
    const { placement } = props;
    return placement;
  },
  (newVal) => {
    actualPlacement.value = newVal;
    if (visible.value) {
      nextTick(updatePosition);
    }
  },
);

// ==================== 暴露的方法 ====================

/**
 * 暴露给父组件的方法
 *
 * 允许父组件通过模板引用调用这些方法
 */
defineExpose({
  /**
   * 手动显示提示框
   */
  show,

  /**
   * 手动隐藏提示框
   */
  hide,
});
</script>
