<template>
  <!-- 
    卡片组件模板结构
    
    主要元素：
    - 根容器：包含整个卡片内容
    - 头部区域：显示标题和副标题
    - 内容区域：显示主要内容
    - 底部区域：显示操作按钮等
  -->
  <div
    :class="[
      ns.block(),
      ns.modifier(props.shadow),
      {
        [ns.is('bordered')]: props.bordered,
        [ns.is('radius')]: props.radius,
      },
    ]"
    :style="cardStyle"
    @click="handleClick"
  >
    <!-- 卡片头部 -->
    <div v-if="hasHeader" :class="ns.element('header')">
      <slot name="header">
        <div v-if="props.title || props.subtitle" :class="ns.element('title-group')">
          <div v-if="props.title" :class="ns.element('title')">{{ props.title }}</div>
          <div v-if="props.subtitle" :class="ns.element('subtitle')">{{ props.subtitle }}</div>
        </div>
      </slot>
    </div>

    <!-- 卡片内容 -->
    <div :class="[ns.element('body'), { [ns.is('padding')]: props.bodyPadding }]">
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
 * 卡片组件用于信息的分组展示，支持标题、内容和底部操作区域。
 * 可以设置不同的阴影效果、边框样式和圆角大小。
 *
 * 主要特性：
 * - 灵活的内容布局：支持头部、主体和底部三个区域
 * - 可定制的样式：支持自定义阴影、边框和圆角
 * - 响应式设计：适配不同屏幕尺寸
 * - 丰富的插槽：支持自定义头部和底部内容
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <VkCard
 *     title="卡片标题"
 *     subtitle="卡片副标题"
 *     shadow="hover"
 *   >
 *     卡片内容
 *     <template #footer>
 *       <VkButton>操作按钮</VkButton>
 *     </template>
 *   </VkCard>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, useSlots } from "vue";
/** 组件属性和事件定义 */
import { cardProps, cardEmits } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "../../../utils/modules/namespace";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkCard",
  inheritAttrs: false,
});

/** 组件属性定义 */
const props = defineProps(cardProps);

/** 组件事件定义 */
const emit = defineEmits(cardEmits);

/** 组件插槽 */
const slots = useSlots();

// ==================== 计算属性 ====================

/**
 * CSS 命名空间
 *
 * 生成组件的 CSS 类名前缀，确保样式隔离。
 */
const ns = useNamespace("card");

/**
 * 判断是否有头部内容
 *
 * 当存在标题、副标题或自定义头部插槽时，显示头部区域
 */
const hasHeader = computed(() => {
  return props.title || props.subtitle || slots.header;
});

/**
 * 卡片样式对象
 *
 * 根据属性动态生成卡片的样式
 */
const cardStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.radius) {
    style.borderRadius = props.radius;
  }

  return style;
});

// ==================== 事件处理 ====================

/**
 * 处理卡片点击事件
 *
 * 当卡片被点击时触发click事件
 *
 * @param event - 鼠标点击事件对象
 */
const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>
