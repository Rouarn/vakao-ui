<template>
  <div :class="mergedClass" :style="mergedStyle" v-bind="filteredAttrs">
    <template v-if="wrapItem">
      <div v-for="(child, index) in children" :key="index" :class="[ns.element('item'), itemClass]" :style="[itemStyles[index], itemStyle]">
        <component :is="child" />
      </div>
    </template>
    <template v-else>
      <component :is="child" v-for="(child, index) in children" :key="index" />
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * VkSpace 间距组件
 *
 * 一个用于在子元素之间添加一致间距的布局组件。
 * 基于 Vue 3 Composition API 构建，提供完整的 TypeScript 支持。
 *
 * 主要特性：
 * - 支持水平和垂直布局
 * - 多种间距尺寸选项
 * - 灵活的对齐方式
 * - 自动换行支持
 * - 响应式设计
 * - 完整的无障碍支持
 *
 * @example
 * ```vue
 * <template>
 *   <VkSpace size="large" vertical>
 *     <VkButton>按钮1</VkButton>
 *     <VkButton>按钮2</VkButton>
 *     <VkButton>按钮3</VkButton>
 *   </VkSpace>
 * </template>
 * ```
 */

import { computed, useSlots, useAttrs, Comment, Text } from "vue";
import { useNamespace } from "@vakao-ui/utils";
import { spaceProps } from "./types";
import type { CSSProperties, VNode } from "vue";

// 定义组件属性和事件
defineOptions({
  name: "VkSpace",
  inheritAttrs: false,
});

const props = defineProps(spaceProps);

// 获取插槽和属性
const slots = useSlots();
const attrs = useAttrs();

// 命名空间
const ns = useNamespace("space");

// 预设尺寸映射
const sizeMap = {
  tiny: 4,
  small: 8,
  medium: 12,
  large: 16,
} as const;

/**
 * 计算间距值
 */
const spacingValues = computed(() => {
  const { size } = props;

  if (Array.isArray(size)) {
    return {
      horizontal: size[0],
      vertical: size[1],
    };
  }

  if (typeof size === "number") {
    return {
      horizontal: size,
      vertical: size,
    };
  }

  const sizeValue = sizeMap[size] || sizeMap.medium;
  return {
    horizontal: sizeValue,
    vertical: sizeValue,
  };
});

/**
 * 获取有效的子元素
 */
const children = computed(() => {
  const defaultSlot = slots.default?.() || [];

  const validChildren = defaultSlot.filter((child: VNode) => {
    // 过滤掉注释节点和空文本节点
    if (child.type === Comment) return false;
    if (child.type === Text && (!child.children || child.children.toString().trim() === "")) {
      return false;
    }
    return true;
  });

  return props.reverse ? validChildren.reverse() : validChildren;
});

/**
 * 计算子元素样式
 */
const itemStyles = computed(() => {
  if (!props.wrapItem) return [];

  const { horizontal, vertical } = spacingValues.value;
  const styles: CSSProperties[] = [];

  children.value.forEach((_, index) => {
    const style: CSSProperties = {};

    if (props.vertical) {
      // 垂直布局
      if (index < children.value.length - 1) {
        style.marginBottom = `${vertical}px`;
      }
    } else {
      // 水平布局
      if (index < children.value.length - 1) {
        style.marginRight = `${horizontal}px`;
      }

      // 如果支持换行，添加垂直间距
      if (props.wrap) {
        style.marginBottom = `${vertical}px`;
      }
    }

    styles.push(style);
  });

  return styles;
});

/**
 * 计算容器样式
 */
const containerStyle = computed(() => {
  const style: CSSProperties = {
    display: props.inline ? "inline-flex" : "flex",
    flexDirection: props.vertical ? "column" : "row",
    flexWrap: props.wrap && !props.vertical ? "wrap" : "nowrap",
  };

  // 设置对齐方式
  if (props.align) {
    style.alignItems = props.align;
  }

  if (props.justify) {
    style.justifyContent = props.justify;
  }

  // 如果不使用包装器，直接使用 gap
  if (!props.wrapItem) {
    const { horizontal, vertical } = spacingValues.value;

    if (props.vertical) {
      style.gap = `${vertical}px`;
    } else {
      style.gap = props.wrap ? `${vertical}px ${horizontal}px` : `${horizontal}px`;
    }
  }

  return style;
});

/**
 * 合并的类名
 */
const mergedClass = computed(() => {
  return [
    ns.block(),
    {
      [ns.modifier("vertical")]: props.vertical,
      [ns.modifier("horizontal")]: !props.vertical,
      [ns.modifier("wrap")]: props.wrap,
      [ns.modifier("inline")]: props.inline,
      [ns.modifier("reverse")]: props.reverse,
      // 尺寸修饰符
      [ns.modifier(`size-${props.size}`)]: typeof props.size === "string",
      // 对齐修饰符
      [ns.modifier(`align-${props.align}`)]: props.align,
      [ns.modifier(`justify-${props.justify}`)]: props.justify && props.justify !== "start",
    },
    props.customClass,
  ];
});

/**
 * 合并的样式
 */
const mergedStyle = computed(() => {
  return [containerStyle.value, props.customStyle];
});

/**
 * 过滤后的属性
 */
const filteredAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs;
  return rest;
});
</script>
