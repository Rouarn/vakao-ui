<template>
  <!-- 
    标签组件模板结构
    
    主要元素：
    - 根容器：包含标签内容和关闭按钮
    - 标签内容：通过默认插槽提供
    - 关闭按钮：可选的关闭图标
  -->
  <span v-if="!closed" :class="mergedClass" :style="mergedStyle" @click="handleClick">
    <!-- 标签内容 -->
    <span :class="ns.element('content')">
      <slot></slot>
    </span>

    <!-- 关闭按钮 -->
    <span v-if="closable" :class="ns.element('close')" @click.stop="handleClose">
      <VkIcon icon="mdi:close" :size="closeIconSize" />
    </span>
  </span>
</template>

<script setup lang="ts">
/**
 * VkTag 标签组件
 *
 * 标签组件用于标记和分类，支持多种样式、尺寸和主题。
 * 可以用于内容分类、状态标识、筛选条件等场景。
 *
 * 主要特性：
 * - 支持多种类型和尺寸
 * - 可设置不同主题风格
 * - 支持可关闭功能
 * - 可自定义颜色和样式
 * - 支持禁用状态
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 基础标签 -->
 *   <VkTag>默认标签</VkTag>
 *
 *   <!-- 可关闭标签 -->
 *   <VkTag type="primary" closable @close="handleClose">
 *     可关闭标签
 *   </VkTag>
 *
 *   <!-- 自定义颜色 -->
 *   <VkTag color="#6554C0" text-color="#ffffff">
 *     自定义颜色
 *   </VkTag>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, ref, useAttrs } from "vue";
import type { CSSProperties } from "vue";
/** 组件属性和事件定义 */
import { tagProps, tagEmits } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "@vakao-ui/utils";
/** 图标组件 */
import VkIcon from "../../VkIcon";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkTag",
  inheritAttrs: false,
});

/** 组件属性定义 */
const props = defineProps(tagProps);

/** 组件事件定义 */
const emit = defineEmits(tagEmits);

/** 组件属性 */
const attrs = useAttrs();

// ==================== 响应式数据 ====================

/**
 * 标签关闭状态
 *
 * 控制标签的显示和隐藏，当用户点击关闭按钮时设置为 true。
 */
const closed = ref(false);

// ==================== 计算属性 ====================

/**
 * CSS 命名空间
 *
 * 生成组件的 CSS 类名前缀，确保样式隔离。
 */
const ns = useNamespace("tag");

/**
 * 关闭图标尺寸
 *
 * 根据标签尺寸计算关闭图标的大小。
 */
const closeIconSize = computed(() => {
  const sizeMap = {
    tiny: 12,
    small: 14,
    medium: 16,
    large: 18,
  };
  return sizeMap[props.size] || 16;
});

/**
 * 过滤属性
 *
 * 从 attrs 中过滤掉 class 和 style 属性，避免与组件内部的
 * 样式合并逻辑冲突，其他属性正常传递给根元素。
 */
const filteredAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs;
  return rest;
});

/**
 * 合并的 CSS 类名
 *
 * 将组件的基础类名、修饰符类名、状态类名和用户自定义类名合并。
 * 确保样式的正确应用和用户定制的灵活性。
 */
const mergedClass = computed(() => {
  const classes = [
    // 基础类名
    ns.block(),
    // 类型修饰符
    ns.modifier(props.type),
    // 尺寸修饰符
    ns.modifier(props.size),
    // 主题修饰符
    ns.modifier(props.theme),
    // 状态类名
    ns.is("disabled", props.disabled),
    ns.is("closable", props.closable),
    ns.is("round", props.round),
    ns.is("bordered", props.bordered),
  ];

  // 添加用户自定义类名
  if (props.customClass) {
    classes.push(props.customClass);
  }
  if (attrs.class) {
    classes.push(attrs.class as string);
  }

  return classes.filter(Boolean);
});

/**
 * 合并的样式
 *
 * 将组件的默认样式、用户自定义样式和属性样式合并。
 * 支持自定义颜色配置，优先级高于主题样式。
 */
const mergedStyle = computed((): CSSProperties => {
  const styles: CSSProperties = {};

  // 自定义背景色
  if (props.color) {
    styles.backgroundColor = props.color;
    styles.borderColor = props.color;
  }

  // 自定义文字颜色
  if (props.textColor) {
    styles.color = props.textColor;
  }

  // 合并用户自定义样式
  const { customStyle } = props;
  if (customStyle) {
    if (typeof customStyle === "string") {
      // 处理字符串样式 - 解析为对象
      const styleElement = document.createElement("div");
      styleElement.style.cssText = customStyle;
      const parsedStyle: CSSProperties = {};
      for (let i = 0; i < styleElement.style.length; i++) {
        const property = styleElement.style[i];
        parsedStyle[property as keyof CSSProperties] = styleElement.style.getPropertyValue(property) as any;
      }
      Object.assign(styles, parsedStyle);
    } else {
      // 处理对象样式
      Object.assign(styles, customStyle);
    }
  }

  // 合并 attrs 中的样式
  if (attrs.style) {
    if (typeof attrs.style === "string") {
      // 处理字符串样式 - 解析为对象
      const styleElement = document.createElement("div");
      styleElement.style.cssText = attrs.style;
      const parsedStyle: CSSProperties = {};
      for (let i = 0; i < styleElement.style.length; i++) {
        const property = styleElement.style[i];
        parsedStyle[property as keyof CSSProperties] = styleElement.style.getPropertyValue(property) as any;
      }
      Object.assign(styles, parsedStyle);
    } else {
      Object.assign(styles, attrs.style as CSSProperties);
    }
  }

  return styles;
});

// ==================== 事件处理 ====================

/**
 * 处理标签点击事件
 *
 * 只有在标签非禁用状态下才会触发点击事件，
 * 确保用户交互的一致性和可预期性。
 *
 * @param e - 鼠标点击事件对象
 */
const handleClick = (e: MouseEvent) => {
  if (!props.disabled) {
    emit("click", e);
  }
};

/**
 * 处理标签关闭事件
 *
 * 当用户点击关闭按钮时触发，设置标签为关闭状态并触发关闭事件。
 * 使用 stop 修饰符防止事件冒泡到标签的点击事件。
 *
 * @param e - 鼠标点击事件对象
 */
const handleClose = (e: MouseEvent) => {
  if (!props.disabled) {
    closed.value = true;
    emit("close", e);
  }
};
</script>
