<template>
  <div :class="ns.block()">
    <!-- 主体内容 -->
    <slot></slot>

    <!-- 徽章 -->
    <transition name="vk-badge-fade">
      <sup
        v-if="!hidden && (content || isDot)"
        :class="[ns.element('content'), ns.modifier(type), ns.is('fixed'), ns.is('dot', isDot)]"
        :style="badgeStyle"
      >
        {{ content }}
      </sup>
    </transition>
  </div>
</template>

<script setup lang="ts">
/**
 * VkBadge 徽章组件
 *
 * 徽章组件用于显示计数、提示或状态标记，通常附加在其他元素上。
 * 可以用于未读消息数、通知提醒、状态指示等场景。
 *
 * 主要特性：
 * - 支持数字和文本内容
 * - 可设置最大值，超出显示为 "{max}+"
 * - 支持小圆点模式
 * - 多种预设颜色主题
 * - 可自定义颜色和位置
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 基础徽章 -->
 *   <VkBadge :value="12">
 *     <VkButton>消息</VkButton>
 *   </VkBadge>
 *
 *   <!-- 小圆点徽章 -->
 *   <VkBadge is-dot>
 *     <VkIcon icon="bell" />
 *   </VkBadge>
 *
 *   <!-- 自定义颜色 -->
 *   <VkBadge :value="new" background-color="#6554C0" text-color="#ffffff">
 *     <VkButton>通知</VkButton>
 *   </VkBadge>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed } from "vue";
/** 组件属性定义 */
import { badgeProps } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "../../../utils/modules/namespace";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkBadge",
  inheritAttrs: false,
});

/** 组件属性定义 */
const props = defineProps(badgeProps);

// ==================== 计算属性 ====================

/**
 * CSS 命名空间
 *
 * 生成组件的 CSS 类名前缀，确保样式隔离。
 */
const ns = useNamespace("badge");

/**
 * 徽章内容
 *
 * 根据属性计算最终显示的徽章内容
 */
const content = computed(() => {
  if (props.isDot) return "";

  const { value, max } = props;
  if (typeof value === "number" && typeof max === "number") {
    return value > max ? `${max}+` : `${value}`;
  }
  return value;
});

/**
 * 徽章样式对象
 *
 * 根据属性动态生成徽章的样式，包括位置、背景色和文字颜色
 */
const badgeStyle = computed(() => {
  const style: Record<string, string> = {};

  // 设置位置偏移
  const [x, y] = props.offset;
  if (x) {
    style.right = `${-x}px`;
  }
  if (y) {
    style.top = `${y}px`;
  }

  // 设置自定义颜色
  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor;
  }

  if (props.textColor) {
    style.color = props.textColor;
  }

  return style;
});
</script>
