<template>
  <div :class="mergedClass" :style="mergedStyle" @click="handleClick">
    <!-- 卡片头部 -->
    <div v-if="$slots.header || header" :class="ns.element('header')">
      <slot name="header">
        {{ header }}
      </slot>
    </div>

    <!-- 卡片主体 -->
    <div :class="ns.element('body')" :style="bodyStyle">
      <slot></slot>
    </div>

    <!-- 卡片底部 -->
    <div v-if="$slots.footer" :class="ns.element('footer')">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * VkCard 卡片组件
 *
 * 卡片组件是一个通用的容器组件，用于承载信息和操作。
 * 支持头部、主体、底部三个区域，可以灵活组合使用。
 *
 * 主要特性：
 * - 支持多种尺寸和阴影效果
 * - 灵活的插槽系统
 * - 可自定义内边距和样式
 * - 支持悬停交互效果
 * - 完整的无障碍支持
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 基础卡片 -->
 *   <VkCard header="卡片标题">
 *     <p>这是卡片的内容</p>
 *   </VkCard>
 *
 *   <!-- 带操作的卡片 -->
 *   <VkCard shadow="hover" hoverable>
 *     <template #header>
 *       <h3>自定义标题</h3>
 *     </template>
 *     <p>卡片内容</p>
 *     <template #footer>
 *       <VkButton type="primary">确认</VkButton>
 *       <VkButton>取消</VkButton>
 *     </template>
 *   </VkCard>
 *
 *   <!-- 自定义样式 -->
 *   <VkCard
 *     :body-padding="24"
 *     size="large"
 *     shadow="never"
 *     :border="false"
 *   >
 *     <p>无边框无阴影的卡片</p>
 *   </VkCard>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, useAttrs } from "vue";
import type { CSSProperties } from "vue";

/** 组件类型定义 */
import { cardProps, cardEmits } from "./types";

/** 工具函数 */
import { useNamespace } from "@vakao-ui/utils";

// ==================== 组件定义 ====================

/** 组件名称 */
defineOptions({
  name: "VkCard",
  inheritAttrs: false,
});

/** 组件属性 */
const props = defineProps(cardProps);

/** 组件事件 */
const emit = defineEmits(cardEmits);

// ==================== 组合式 API ====================

/** 获取组件属性和命名空间工具 */
const attrs = useAttrs();
const ns = useNamespace("card");

// ==================== 事件处理 ====================

/**
 * 处理卡片点击事件
 *
 * 当卡片被点击时触发，传递原生的鼠标事件对象。
 * 可以用于实现卡片的选择、跳转等交互功能。
 *
 * @param e - 鼠标点击事件对象
 */
const handleClick = (e: MouseEvent) => {
  emit("click", e);
};

// ==================== 样式计算 ====================

/**
 * 合并样式
 *
 * 将组件的 customStyle 属性和父组件传递的 style 属性合并，
 * 支持字符串和对象两种格式，确保类型安全。
 */
const mergedStyle = computed(() => {
  const styles: (string | CSSProperties | undefined)[] = [];
  if (props.customStyle) {
    styles.push(props.customStyle);
  }
  if (attrs.style) {
    styles.push(attrs.style as string | CSSProperties);
  }
  return styles.filter(Boolean);
});

/**
 * 合并类名
 *
 * 根据组件的各种属性和状态生成完整的 CSS 类名列表，
 * 使用 BEM 命名规范，确保样式的模块化和可维护性。
 */
const mergedClass = computed(() => {
  return [
    ns.block(), // 基础块类名：vk-card
    ns.modifier("size", props.size), // 尺寸修饰符：vk-card--large
    ns.modifier("shadow", props.shadow), // 阴影修饰符：vk-card--shadow-hover
    ns.is("bordered", props.border), // 边框状态：is-bordered
    ns.is("hoverable", props.hoverable), // 悬停状态：is-hoverable
    props.customClass, // 自定义类名
    attrs.class, // 父组件传递的类名
  ];
});

/**
 * 卡片主体样式
 *
 * 根据 bodyPadding 属性计算主体区域的内边距样式。
 * 支持数字（转换为 px）和字符串两种格式。
 */
const bodyStyle = computed(() => {
  if (props.bodyPadding === undefined) {
    return undefined;
  }

  const padding = typeof props.bodyPadding === "number" ? `${props.bodyPadding}px` : props.bodyPadding;

  return {
    padding,
  };
});
</script>
