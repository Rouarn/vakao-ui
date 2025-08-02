<template>
  <!-- 
    分割线组件模板结构
    
    主要元素：
    - 根容器：包含分割线和可选的内容
    - 内容区域：显示可选的文本或自定义内容
  -->
  <div
    :class="[
      ns.block(),
      ns.modifier(props.direction),
      ns.is(contentPositionClass),
      {
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
import { computed } from "vue";
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
  return props.direction === "horizontal" ? props.contentPosition : "";
});

/**
 * 分割线样式对象
 *
 * 根据属性动态生成分割线的样式
 */
const dividerStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.borderColor) {
    if (props.direction === "horizontal") {
      style.borderTopColor = props.borderColor;
    } else {
      style.borderLeftColor = props.borderColor;
    }
  }

  if (props.borderStyle) {
    if (props.direction === "horizontal") {
      style.borderTopStyle = props.borderStyle;
    } else {
      style.borderLeftStyle = props.borderStyle;
    }
  }

  return style;
});
</script>
