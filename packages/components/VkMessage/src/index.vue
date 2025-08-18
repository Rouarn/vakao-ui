<template>
  <Teleport to="body">
    <Transition
      name="vk-message"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="visible"
        :id="messageId"
        :class="mergedClass"
        :style="mergedStyle"
        role="alert"
        aria-live="assertive"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- 消息图标 -->
        <span v-if="showIcon" :class="ns.element('icon')">
          <component :is="currentIcon" v-if="typeof currentIcon === 'object'" />
          <VkIcon v-else-if="typeof currentIcon === 'string'" :icon="currentIcon" :size="16" />
        </span>

        <!-- 消息内容 -->
        <div :class="ns.element('content')">
          <div v-if="dangerouslyUseHTMLString" v-html="message" />
          <span v-else>{{ message }}</span>
          <slot />
        </div>

        <!-- 关闭按钮 -->
        <span v-if="closable" :class="[ns.element('close'), { [ns.element('close-visible')]: isHovered }]" @click="handleClose">
          <VkIcon icon="mdi:close" :size="14" />
        </span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * VkMessage 消息组件
 *
 * 消息组件用于显示全局提示信息，通常从页面顶部滑入显示。
 * 支持多种类型、自动关闭、手动关闭等功能。
 *
 * 主要特性：
 * - 支持多种消息类型（success、warning、error、info等）
 * - 可配置显示时长和自动关闭
 * - 支持手动关闭功能
 * - 可自定义图标和位置
 * - 支持 HTML 内容渲染
 * - 完整的动画效果
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 基础消息 -->
 *   <VkMessage type="success" message="操作成功！" />
 *
 *   <!-- 可关闭消息 -->
 *   <VkMessage
 *     type="warning"
 *     message="请注意检查输入内容"
 *     :closable="true"
 *     @close="handleClose"
 *   />
 *
 *   <!-- 自定义图标 -->
 *   <VkMessage
 *     type="info"
 *     message="自定义图标消息"
 *     icon="mdi:information"
 *   />
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import type { CSSProperties } from "vue";
/** 组件属性和事件定义 */
import { messageProps, messageEmits } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "@vakao-ui/utils";
/** 图标组件 */
import VkIcon from "../../VkIcon";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkMessage",
  inheritAttrs: true,
});

/** 组件属性定义 */
const props = defineProps(messageProps);

/** 组件事件定义 */
const emit = defineEmits(messageEmits);

// ==================== 响应式数据 ====================

/** CSS 命名空间 */
const ns = useNamespace("message");

/** 消息可见性 */
const visible = ref(false);

/** 消息唯一 ID */
const messageId = ref(`vk-message-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

/** 自动关闭定时器 */
let timer: NodeJS.Timeout | null = null;

/** 响应式的offset值，用于消息堆叠定位 */
const currentOffset = ref(props.offset);

/** 鼠标悬浮状态 */
const isHovered = ref(false);

// ==================== 计算属性 ====================

/**
 * 当前图标
 *
 * 根据自定义图标或消息类型返回对应的图标。
 * 优先使用自定义图标，否则根据类型返回默认图标。
 */
const currentIcon = computed(() => {
  if (props.icon) {
    return props.icon;
  }

  const iconMap = {
    success: "mdi:check-circle",
    warning: "mdi:alert",
    danger: "mdi:close-circle",
    error: "mdi:close-circle",
    info: "mdi:information",
    default: "mdi:information",
    primary: "mdi:information",
    plain: "mdi:information",
  };

  return iconMap[props.type] || iconMap.info;
});

/**
 * 合并的 CSS 类名
 *
 * 组合基础类名、类型类名、位置类名和自定义类名。
 */
const mergedClass = computed(() => {
  const classes = [ns.block(), ns.modifier(props.type), ns.modifier(props.position)];

  if (props.customClass) {
    classes.push(props.customClass);
  }

  return classes;
});

/**
 * 合并的样式
 *
 * 组合层级样式和自定义样式，设置初始位置，然后由message.ts的堆叠逻辑控制最终位置。
 */
const mergedStyle = computed(() => {
  const styles: CSSProperties = {
    zIndex: props.zIndex,
    // 使用响应式的offset值，确保消息堆叠时能正确更新位置
    top: `${currentOffset.value}px`,
  };

  // 设置水平位置样式，垂直位置由message.ts的updatePositionOffsets方法控制
  if (props.position === "top") {
    styles.left = "50%";
    styles.transform = "translateX(-50%)";
  } else if (props.position === "top-left") {
    styles.left = "20px";
  } else if (props.position === "top-right") {
    styles.right = "20px";
  }

  // 合并自定义样式
  if (props.customStyle) {
    if (typeof props.customStyle === "string") {
      // 解析样式字符串（简单实现）
      const styleObj: CSSProperties = {};
      props.customStyle.split(";").forEach((rule) => {
        const [property, value] = rule.split(":").map((s) => s.trim());
        if (property && value) {
          (styleObj as Record<string, string>)[property] = value;
        }
      });
      Object.assign(styles, styleObj);
    } else {
      Object.assign(styles, props.customStyle);
    }
  }

  return styles;
});

// ==================== 方法定义 ====================

/**
 * 显示消息
 *
 * 设置消息为可见状态，并启动自动关闭定时器（如果配置了持续时间）。
 */
const show = () => {
  visible.value = true;
  startTimer();
};

/**
 * 启动自动关闭定时器
 *
 * 如果设置了持续时间且大于 0，则在指定时间后自动关闭消息。
 */
const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      handleClose();
    }, props.duration);
  }
};

/**
 * 清除定时器
 *
 * 清除自动关闭定时器，防止内存泄漏。
 */
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

/**
 * 处理关闭事件
 *
 * 清除定时器，隐藏消息，并触发关闭事件。
 */
const handleClose = () => {
  clearTimer();
  visible.value = false;
  emit("close");
};

/**
 * 处理鼠标进入事件
 */
const handleMouseEnter = () => {
  isHovered.value = true;
};

/**
 * 处理鼠标离开事件
 */
const handleMouseLeave = () => {
  isHovered.value = false;
};

/**
 * 手动关闭消息
 *
 * 提供给外部调用的关闭方法。
 */
const close = () => {
  handleClose();
};

// ==================== 动画钩子 ====================

/**
 * 进入前钩子
 */
const onBeforeEnter = () => {
  // 动画开始前的处理
};

/**
 * 进入后钩子
 */
const onAfterEnter = () => {
  // 动画完成后的处理
};

/**
 * 离开前钩子
 */
const onBeforeLeave = () => {
  // 离开动画开始前的处理
};

/**
 * 离开后钩子
 */
const onAfterLeave = () => {
  // 离开动画完成后的处理
  emit("destroy");
};

// ==================== 生命周期 ====================

/**
 * 组件挂载后
 *
 * 在下一个 tick 显示消息，确保 DOM 已经渲染。
 */
onMounted(() => {
  nextTick(() => {
    show();
  });
});

/**
 * 组件卸载前
 *
 * 清理定时器，防止内存泄漏。
 */
onUnmounted(() => {
  clearTimer();
});

// ==================== 暴露给父组件 ====================

/**
 * 暴露给父组件的方法和属性
 */
defineExpose({
  close,
  visible,
  messageId,
  currentOffset, // 暴露响应式的offset值，用于消息堆叠定位
});
</script>
