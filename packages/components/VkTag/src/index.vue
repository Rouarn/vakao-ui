<template>
  <!-- 
    VkTag 标签组件模板
    
    采用 BEM 命名规范，支持多种样式和交互状态
    使用条件渲染避免模板重复，提高代码可维护性
  -->
  <component
    :is="disableTransitions ? 'span' : 'transition'"
    v-bind="transitionProps"
  >
    <span
      :class="tagClasses"
      :style="tagStyle"
      @click="handleClick"
    >
      <!-- 标签内容插槽 -->
      <span :class="ns.element('content')">
        <slot />
      </span>

      <!-- 关闭按钮 -->
      <VkIcon 
        v-if="closable" 
        :class="ns.element('close')" 
        icon="ic:sharp-cancel" 
        @click.stop="handleClose" 
      />
    </span>
  </component>
</template>

<script setup lang="ts">
/**
 * VkTag 标签组件
 *
 * 基于 Vue 3 Composition API 和 TypeScript 构建的标签组件
 * 遵循 BEM 命名规范，支持多种样式主题和交互状态
 *
 * 主要特性：
 * - 多种预设颜色主题（default, primary, success, warning, danger, info）
 * - 三种尺寸选项（tiny, small, medium, large）
 * - 三种效果模式（light, dark, plain）
 * - 可关闭功能
 * - 自定义颜色支持
 * - 圆角和边框样式
 * - 可点击交互
 * - 过渡动画支持
 *
 * @example
 * ```vue
 * <template>
 *   <!-- 基础用法 -->
 *   <VkTag>默认标签</VkTag>
 *   <VkTag type="primary">主要标签</VkTag>
 *   
 *   <!-- 不同效果 -->
 *   <VkTag effect="dark" type="success">深色成功</VkTag>
 *   <VkTag effect="plain" type="warning">朴素警告</VkTag>
 *   
 *   <!-- 可关闭标签 -->
 *   <VkTag closable @close="handleClose">可关闭</VkTag>
 *   
 *   <!-- 自定义颜色 -->
 *   <VkTag color="#6554C0">自定义颜色</VkTag>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 导入依赖 ====================

import { computed } from "vue";
import { tagProps, tagEmits } from "./types";
import { useNamespace } from "../../../utils/modules/namespace";
import { VkIcon } from "../../VkIcon";

// ==================== 组件配置 ====================

defineOptions({
  name: "VkTag",
  inheritAttrs: false,
});

const props = defineProps(tagProps);
const emit = defineEmits(tagEmits);

// ==================== 响应式数据 ====================

/**
 * CSS 命名空间实例
 * 基于 BEM 规范生成一致的 CSS 类名
 */
const ns = useNamespace("tag");

// ==================== 计算属性 ====================

/**
 * 过渡组件属性
 * 当启用过渡动画时的配置
 */
const transitionProps = computed(() => {
  if (props.disableTransitions) return {};
  
  return {
    name: "vk-tag-fade",
    appear: true,
  };
});

/**
 * 标签CSS类名集合
 * 根据组件属性动态生成完整的类名数组
 */
const tagClasses = computed(() => {
  return [
    ns.block(),
    ns.modifier(props.size),
    ns.modifier(props.effect),
    ns.modifier(props.type),
    ns.is("round", props.round),
    ns.is("bordered", props.bordered),
    ns.is("clickable", props.clickable),
  ].filter(Boolean);
});

/**
 * 标签内联样式
 * 处理自定义颜色的样式生成
 */
const tagStyle = computed(() => {
  if (!props.color) return {};

  const style: Record<string, string> = {};
  const { color, effect } = props;

  switch (effect) {
    case "light":
      // 浅色效果：淡化背景 + 原色文字
      style.backgroundColor = `${color}20`;
      style.color = color;
      style.borderColor = `${color}30`;
      break;
      
    case "plain":
      // 朴素效果：透明背景 + 原色文字和边框
      style.color = color;
      style.borderColor = `${color}30`;
      break;
      
    case "dark":
    default:
      // 深色效果：原色背景 + 自适应文字颜色
      style.backgroundColor = color;
      style.borderColor = color;
      style.color = getContrastTextColor(color);
      break;
  }

  return style;
});

// ==================== 事件处理 ====================

/**
 * 处理标签关闭事件
 * @param event 鼠标事件对象
 */
const handleClose = (event: MouseEvent) => {
  emit("close", event);
};

/**
 * 处理标签点击事件
 * 只有在可点击状态下才触发事件
 * @param event 鼠标事件对象
 */
const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};

/**
 * 获取与背景色对比度最佳的文字颜色
 * 基于 WCAG 对比度算法，确保文字可读性
 * @param backgroundColor 背景颜色值（支持 hex、rgb、rgba 格式）
 * @returns 返回白色或黑色文字颜色
 */
function getContrastTextColor(backgroundColor: string): string {
  const brightness = calculateColorBrightness(backgroundColor);
  // 亮度阈值为 0.5，大于阈值使用深色文字，否则使用浅色文字
  return brightness > 0.5 ? "#303133" : "#ffffff";
}

/**
 * 计算颜色亮度值
 * 使用相对亮度公式，符合 WCAG 2.0 标准
 * @param color 颜色值（支持 hex、rgb、rgba 格式）
 * @returns 亮度值（0-1 之间，0为最暗，1为最亮）
 */
function calculateColorBrightness(color: string): number {
  const normalizedColor = color.trim().toLowerCase();

  // 处理十六进制颜色
  if (normalizedColor.startsWith("#")) {
    return calculateHexBrightness(normalizedColor);
  }

  // 处理 RGB/RGBA 颜色
  if (normalizedColor.startsWith("rgb")) {
    return calculateRgbBrightness(normalizedColor);
  }

  // 未知格式返回中等亮度
  return 0.5;
}

/**
 * 计算十六进制颜色的亮度
 * @param hex 十六进制颜色值
 * @returns 亮度值
 */
function calculateHexBrightness(hex: string): number {
  let cleanHex = hex.slice(1);

  // 处理简写形式 (#fff -> #ffffff)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char.repeat(2))
      .join("");
  }

  if (cleanHex.length !== 6) return 0.5;

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return calculateRelativeLuminance(r, g, b);
}

/**
 * 计算 RGB 颜色的亮度
 * @param rgb RGB/RGBA 颜色值
 * @returns 亮度值
 */
function calculateRgbBrightness(rgb: string): number {
  const rgbMatch = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
  
  if (!rgbMatch) return 0.5;

  const r = parseInt(rgbMatch[1], 10);
  const g = parseInt(rgbMatch[2], 10);
  const b = parseInt(rgbMatch[3], 10);

  return calculateRelativeLuminance(r, g, b);
}

/**
 * 计算相对亮度
 * 基于 WCAG 2.0 相对亮度公式
 * @param r 红色分量 (0-255)
 * @param g 绿色分量 (0-255)
 * @param b 蓝色分量 (0-255)
 * @returns 相对亮度值 (0-1)
 */
function calculateRelativeLuminance(r: number, g: number, b: number): number {
  // 将 RGB 值转换为 0-1 范围
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const normalized = c / 255;
    // 应用 gamma 校正
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  // 计算相对亮度（基于人眼对不同颜色的敏感度）
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
</script>
