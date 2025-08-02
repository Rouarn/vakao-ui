<template>
  <!-- 
    标签组件模板结构
    
    主要元素：
    - 根容器：包含标签内容和关闭按钮
    - 内容区域：显示标签文本或自定义内容
    - 关闭按钮：可选的关闭图标
  -->
  <transition
    v-if="!disableTransitions"
    name="vk-tag-fade"
    appear
  >
    <span
      :class="[
        ns.block(),
        ns.modifier(type),
        ns.modifier(size),
        ns.modifier(effect),
        ns.is('round', round),
        ns.is('bordered', bordered),
        ns.is('clickable', clickable),
      ]"
      :style="tagStyle"
      @click="handleClick"
    >
      <!-- 标签内容 -->
      <slot />
      
      <!-- 关闭按钮 -->
      <VkIcon
        v-if="closable"
        :class="ns.element('close')"
        icon="close"
        @click.stop="handleClose"
      />
    </span>
  </transition>
  <span
    v-else
    :class="[
      ns.block(),
      ns.modifier(type),
      ns.modifier(size),
      ns.modifier(effect),
      ns.is('round', round),
      ns.is('bordered', bordered),
      ns.is('clickable', clickable),
    ]"
    :style="tagStyle"
    @click="handleClick"
  >
    <!-- 标签内容 -->
    <slot />
    
    <!-- 关闭按钮 -->
    <VkIcon
      v-if="closable"
      :class="ns.element('close')"
      icon="close"
      @click.stop="handleClose"
    />
  </span>
</template>

<script setup lang="ts">
/**
 * VkTag 标签组件
 *
 * 标签组件用于标记和分类，支持多种颜色、尺寸和样式。
 * 可以用于展示状态、分类信息或标记内容。
 *
 * 主要特性：
 * - 多种预设颜色主题
 * - 三种尺寸选项
 * - 可关闭功能
 * - 自定义颜色
 * - 圆角和边框样式
 * - 可点击交互
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 基础标签 -->
 *   <VkTag>默认标签</VkTag>
 *   
 *   <!-- 不同类型的标签 -->
 *   <VkTag type="primary">主要标签</VkTag>
 *   <VkTag type="success">成功标签</VkTag>
 *   <VkTag type="warning">警告标签</VkTag>
 *   <VkTag type="danger">危险标签</VkTag>
 *   
 *   <!-- 可关闭的标签 -->
 *   <VkTag closable @close="handleClose">可关闭标签</VkTag>
 *   
 *   <!-- 自定义颜色的标签 -->
 *   <VkTag color="#6554C0">自定义颜色</VkTag>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed } from "vue";
/** 组件属性和事件定义 */
import { tagProps, tagEmits } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "../../../utils/modules/namespace";
/** 图标组件 */
import { VkIcon } from "../../VkIcon";

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

// ==================== 计算属性 ====================

/**
 * CSS 命名空间
 *
 * 生成组件的 CSS 类名前缀，确保样式隔离。
 */
const ns = useNamespace("tag");

/**
 * 标签样式对象
 * 
 * 根据属性动态生成标签的样式，主要用于自定义颜色
 */
const tagStyle = computed(() => {
  if (!props.color) return {};
  
  const style: Record<string, string> = {};
  
  if (props.effect === "light") {
    // 浅色主题：背景色为淡化的自定义颜色，文字为原色
    style.backgroundColor = `${props.color}20`; // 添加透明度
    style.color = props.color;
    style.borderColor = `${props.color}30`;
  } else if (props.effect === "plain") {
    // 朴素主题：背景透明，文字和边框为自定义颜色
    style.color = props.color;
    style.borderColor = `${props.color}30`;
  } else {
    // 深色主题：背景为自定义颜色，文字为白色或黑色（根据颜色亮度）
    style.backgroundColor = props.color;
    
    // 根据背景色亮度决定文字颜色
    const colorBrightness = getColorBrightness(props.color);
    style.color = colorBrightness > 0.5 ? "#333" : "#fff";
  }
  
  return style;
});

// ==================== 事件处理 ====================

/**
 * 处理关闭事件
 * 
 * 当点击关闭按钮时触发
 * 
 * @param event - 鼠标事件对象
 */
const handleClose = (event: MouseEvent) => {
  emit("close", event);
};

/**
 * 处理点击事件
 * 
 * 当点击标签时触发
 * 
 * @param event - 鼠标事件对象
 */
const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};

// ==================== 工具函数 ====================

/**
 * 获取颜色亮度
 * 
 * 计算颜色的亮度值，用于决定文字颜色
 * 
 * @param color - 颜色值（十六进制或RGB格式）
 * @returns 亮度值（0-1之间，0为最暗，1为最亮）
 */
function getColorBrightness(color: string): number {
  // 移除颜色字符串中的空格
  color = color.trim();
  
  // 处理十六进制颜色
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    
    // 处理简写形式 (#fff -> #ffffff)
    if (hex.length === 3) {
      hex = hex.split("").map(c => c + c).join("");
    }
    
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    
    // 计算亮度 (基于人眼对不同颜色的敏感度)
    return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  }
  
  // 处理 rgb/rgba 颜色
  if (color.startsWith("rgb")) {
    const rgbMatch = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      
      // 计算亮度
      return (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    }
  }
  
  // 默认返回中等亮度
  return 0.5;
}
</script>