<template>
  <div
    :class="[
      ns.block(),
      ns.modifier(props.direction),
      {
        [ns.modifier(contentPositionClass)]: contentPositionClass,
        [ns.modifier('with-text')]: $slots.default && props.direction === 'horizontal',
        [ns.modifier(props.borderStyle)]: props.borderStyle !== 'solid',
      },
    ]"
    :style="dividerStyle"
  >
    <!-- 内容区域，仅在水平方向且有内容时显示 -->
    <div v-if="$slots.default && props.direction === 'horizontal'" :class="ns.element('text')">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * VkDivider 分割线组件
 *
 * 分割线组件用于分隔内容区域，支持水平和垂直两种方向。
 * 水平分割线可以包含文本或其他内容。
 *
 * 主要特性：
 * - 支持水平和垂直两种方向
 * - 水平方向支持自定义内容
 * - 可自定义样式，包括颜色和边框样式
 * - 内容位置可调整（左、中、右）
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 基础分割线 -->
 *   <VkDivider />
 *
 *   <!-- 带文本的分割线 -->
 *   <VkDivider content-position="left">文本内容</VkDivider>
 *
 *   <!-- 垂直分割线 -->
 *   <VkDivider direction="vertical" />
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, useSlots } from "vue";
/** 组件属性定义 */
import { dividerProps } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "../../../utils/modules/namespace";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkDivider",
  inheritAttrs: false,
});

/** 组件属性定义 */
const props = defineProps(dividerProps);

/** 插槽对象 */
const slots = useSlots();

// ==================== 计算属性 ====================

/**
 * CSS 命名空间
 *
 * 生成组件的 CSS 类名前缀，确保样式隔离。
 */
const ns = useNamespace("divider");

/**
 * 内容位置类名
 *
 * 根据内容位置属性生成对应的类名
 */
const contentPositionClass = computed(() => {
  if (props.direction === "horizontal" && props.contentPosition !== "center") {
    return `text-${props.contentPosition}`;
  }
  return "";
});

/**
 * 分割线样式对象
 *
 * 根据属性动态生成分割线的样式
 */
const dividerStyle = computed(() => {
  const style: Record<string, string> = {};

  // 检查是否有文本内容
  const hasText = slots.default && props.direction === "horizontal";

  if (props.direction === "horizontal" && !hasText) {
    // 设置水平分割线的边框样式（仅在没有文本时）
    style.borderTop = `1px ${props.borderStyle} ${props.borderColor || "var(--vk-border-color-light)"}`;
  } else if (props.direction === "vertical") {
    // 设置垂直分割线的边框样式
    style.borderLeft = `1px ${props.borderStyle} ${props.borderColor || "var(--vk-border-color-light)"}`;
  } else if (hasText) {
    // 为带文字的分割线设置CSS变量，用于控制伪元素样式
    if (props.borderColor) {
      style["--vk-divider-color"] = props.borderColor;
    }
  }

  return style;
});
</script>
