# useHover

一个鼠标悬停状态管理 Hook，提供简洁的 API 来检测元素的悬停状态。支持延迟触发、自定义事件和条件控制等高级功能。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🎯 基础悬停检测</h3>
    <!-- 基础悬停 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">基础悬停</h4>
      <div ref="basicHoverRef" 
           style="width: 100%; height: 120px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; user-select: none; transition: all 0.3s;"
           :style="{ 
             background: basicIsHovered ? 'linear-gradient(45deg, #1890ff, #52c41a)' : '#f5f5f5',
             color: basicIsHovered ? 'white' : '#666',
             transform: basicIsHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
             boxShadow: basicIsHovered ? '0 8px 24px rgba(24, 144, 255, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
           }">
        {{ basicIsHovered ? '🎉 悬停中！' : '🖱️ 悬停我' }}
      </div>
      <div style="margin-top: 8px; padding: 8px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        悬停状态: {{ basicIsHovered ? '是' : '否' }}
      </div>
    </div>
    <!-- 卡片悬停效果 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">卡片悬停效果</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <div v-for="(card, index) in cards" :key="index"
             :ref="el => cardRefs[index] = el"
             style="padding: 20px; border-radius: 12px; cursor: pointer; transition: all 0.3s; user-select: none; position: relative; overflow: hidden;"
             :style="{ 
               background: cardHoverStates[index]?.value ? card.hoverColor : card.color,
               transform: cardHoverStates[index]?.value ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
               boxShadow: cardHoverStates[index]?.value ? '0 12px 32px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.1)'
             }">
          <div style="font-size: 32px; margin-bottom: 8px;">{{ card.icon }}</div>
          <h5 style="margin: 0 0 8px 0; color: white; font-size: 16px;">{{ card.title }}</h5>
          <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.4;">{{ card.description }}</p>
          <div v-if="cardHoverStates[index]?.value" 
               style="position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.2); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
            ✨
          </div>
        </div>
      </div>
    </div>
    <!-- 交互式按钮 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">交互式按钮</h4>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button v-for="(btn, index) in buttons" :key="index"
                :ref="el => buttonRefs[index] = el"
                style="padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.2s; user-select: none;"
                :style="{ 
                  background: buttonHoverStates[index]?.value ? btn.hoverColor : btn.color,
                  color: 'white',
                  transform: buttonHoverStates[index]?.value ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: buttonHoverStates[index]?.value ? '0 6px 20px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)'
                }">
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 基础悬停 -->
    <div>
      <h4>基础悬停</h4>
      <div ref="basicHoverRef" class="basic-hover-target" :class="{ hovered: basicIsHovered }">
        {{ basicIsHovered ? "🎉 悬停中！" : "🖱️ 悬停我" }}
      </div>
      <div class="hover-status">悬停状态: {{ basicIsHovered ? "是" : "否" }}</div>
    </div>

    <!-- 卡片悬停效果 -->
    <div>
      <h4>卡片悬停效果</h4>
      <div class="card-grid">
        <div
          v-for="(card, index) in cards"
          :key="index"
          :ref="(el) => (cardRefs[index] = el)"
          class="card"
          :class="{ hovered: cardHoverStates[index]?.value }"
          :style="{
            background: cardHoverStates[index]?.value ? card.hoverColor : card.color,
          }"
        >
          <div class="card-icon">{{ card.icon }}</div>
          <h5 class="card-title">{{ card.title }}</h5>
          <p class="card-description">{{ card.description }}</p>
          <div v-if="cardHoverStates[index]?.value" class="card-indicator">✨</div>
        </div>
      </div>
    </div>

    <!-- 交互式按钮 -->
    <div>
      <h4>交互式按钮</h4>
      <div class="button-group">
        <button
          v-for="(btn, index) in buttons"
          :key="index"
          :ref="(el) => (buttonRefs[index] = el)"
          class="interactive-button"
          :class="{ hovered: buttonHoverStates[index]?.value }"
          :style="{
            background: buttonHoverStates[index]?.value ? btn.hoverColor : btn.color,
          }"
        >
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useHover } from "@vakao-ui/hooks";

// 基础悬停
const [basicHoverRef, basicIsHovered] = useHover();

// 卡片数据
const cards = [
  {
    icon: "🚀",
    title: "快速启动",
    description: "一键启动您的项目",
    color: "linear-gradient(45deg, #1890ff, #36cfc9)",
    hoverColor: "linear-gradient(45deg, #0050b3, #08979c)",
  },
  {
    icon: "⚡",
    title: "高性能",
    description: "极致的性能体验",
    color: "linear-gradient(45deg, #52c41a, #73d13d)",
    hoverColor: "linear-gradient(45deg, #389e0d, #52c41a)",
  },
  {
    icon: "🎨",
    title: "美观设计",
    description: "精美的界面设计",
    color: "linear-gradient(45deg, #722ed1, #eb2f96)",
    hoverColor: "linear-gradient(45deg, #531dab, #c41d7f)",
  },
];

// 卡片悬停状态管理
const cardRefs = ref<HTMLElement[]>([]);
const cardHoverStates = ref<any[]>([]);

// 创建卡片悬停实例
const cardHoverInstances = cards.map(() => useHover());
cardHoverInstances.forEach(([_, isHovered], index) => {
  cardHoverStates.value[index] = isHovered;
});

// 按钮数据
const buttons = [
  { text: "主要按钮", color: "#1890ff", hoverColor: "#0050b3" },
  { text: "成功按钮", color: "#52c41a", hoverColor: "#389e0d" },
  { text: "警告按钮", color: "#fa8c16", hoverColor: "#d46b08" },
  { text: "危险按钮", color: "#ff4d4f", hoverColor: "#cf1322" },
];

// 按钮悬停状态管理
const buttonRefs = ref<HTMLElement[]>([]);
const buttonHoverStates = ref<any[]>([]);

// 创建按钮悬停实例
const buttonHoverInstances = buttons.map(() => useHover());
buttonHoverInstances.forEach(([_, isHovered], index) => {
  buttonHoverStates.value[index] = isHovered;
});

// 组件挂载后绑定 ref
onMounted(() => {
  // 绑定卡片 ref
  cardHoverInstances.forEach(([hoverRef], index) => {
    if (cardRefs.value[index]) {
      hoverRef.value = cardRefs.value[index];
    }
  });

  // 绑定按钮 ref
  buttonHoverInstances.forEach(([hoverRef], index) => {
    if (buttonRefs.value[index]) {
      hoverRef.value = buttonRefs.value[index];
    }
  });
});
</script>

<style scoped>
.basic-hover-target {
  width: 100%;
  height: 120px;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  user-select: none;
  transition: all 0.3s;
  color: #666;
}

.basic-hover-target.hovered {
  background: linear-gradient(45deg, #1890ff, #52c41a);
  color: white;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(24, 144, 255, 0.3);
}

.hover-status {
  margin-top: 8px;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.card {
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.card.hovered {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.card-title {
  margin: 0 0 8px 0;
  color: white;
  font-size: 16px;
}

.card-description {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.4;
}

.card-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.button-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.interactive-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  user-select: none;
  color: white;
}

.interactive-button.hovered {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
</style>
```

  </template>
</Demo>

## 高级用法示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">⚡ 高级悬停功能</h3>
    <!-- 延迟悬停 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">延迟悬停 (300ms)</h4>
      <div ref="delayHoverRef" 
           style="width: 100%; height: 80px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; user-select: none; transition: all 0.3s;"
           :style="{ 
             background: delayIsHovered ? 'linear-gradient(45deg, #fa8c16, #f759ab)' : '#f5f5f5',
             color: delayIsHovered ? 'white' : '#666'
           }">
        {{ delayIsHovered ? '⏰ 延迟悬停激活！' : '🐌 慢慢悬停我 (300ms 延迟)' }}
      </div>
      <div style="margin-top: 8px; padding: 8px; background: #fff7e6; border: 1px solid #ffd591; border-radius: 4px; font-size: 12px;">
        状态: {{ delayIsHovered ? '已激活' : '等待中...' }}
      </div>
    </div>
    <!-- 条件悬停 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">条件悬停</h4>
      <div style="margin-bottom: 12px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" v-model="hoverEnabled" style="margin: 0;" />
          <span style="font-size: 14px;">启用悬停检测</span>
        </label>
      </div>
      <div ref="conditionalHoverRef" 
           style="width: 100%; height: 80px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; user-select: none; transition: all 0.3s;"
           :style="{ 
             background: conditionalIsHovered && hoverEnabled ? 'linear-gradient(45deg, #722ed1, #eb2f96)' : '#f5f5f5',
             color: conditionalIsHovered && hoverEnabled ? 'white' : '#666',
             opacity: hoverEnabled ? 1 : 0.6
           }">
        {{ hoverEnabled ? (conditionalIsHovered ? '🎯 条件悬停激活！' : '🔧 条件悬停我') : '❌ 悬停已禁用' }}
      </div>
    </div>
    <!-- 悬停计数器 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">悬停计数器</h4>
      <div ref="counterHoverRef" 
           style="width: 100%; height: 100px; border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: bold; user-select: none; transition: all 0.3s;"
           :style="{ 
             background: counterIsHovered ? 'linear-gradient(45deg, #52c41a, #73d13d)' : '#f5f5f5',
             color: counterIsHovered ? 'white' : '#666'
           }">
        <div style="font-size: 18px; margin-bottom: 4px;">{{ counterIsHovered ? '🎉' : '📊' }}</div>
        <div>悬停次数: {{ hoverCount }}</div>
        <div style="font-size: 12px; opacity: 0.8;">{{ counterIsHovered ? '正在悬停...' : '悬停我增加计数' }}</div>
      </div>
    </div>
    <!-- 工具提示示例 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">工具提示</h4>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <div v-for="(tooltip, index) in tooltips" :key="index"
             :ref="el => tooltipRefs[index] = el"
             style="position: relative; display: inline-block;">
          <button style="padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s;"
                  :style="{ 
                    borderColor: tooltipHoverStates[index]?.value ? '#1890ff' : '#d9d9d9',
                    color: tooltipHoverStates[index]?.value ? '#1890ff' : '#666'
                  }">
            {{ tooltip.text }}
          </button>
          <div v-if="tooltipHoverStates[index]?.value" 
               style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; padding: 8px 12px; background: #333; color: white; border-radius: 4px; font-size: 12px; white-space: nowrap; z-index: 10;">
            {{ tooltip.tip }}
            <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid #333;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 延迟悬停 -->
    <div>
      <h4>延迟悬停 (300ms)</h4>
      <div ref="delayHoverRef" class="delay-hover-target" :class="{ hovered: delayIsHovered }">
        {{ delayIsHovered ? "⏰ 延迟悬停激活！" : "🐌 慢慢悬停我 (300ms 延迟)" }}
      </div>
      <div class="delay-status">状态: {{ delayIsHovered ? "已激活" : "等待中..." }}</div>
    </div>

    <!-- 条件悬停 -->
    <div>
      <h4>条件悬停</h4>
      <label class="checkbox-label">
        <input type="checkbox" v-model="hoverEnabled" />
        <span>启用悬停检测</span>
      </label>
      <div
        ref="conditionalHoverRef"
        class="conditional-hover-target"
        :class="{
          hovered: conditionalIsHovered && hoverEnabled,
          disabled: !hoverEnabled,
        }"
      >
        {{ hoverEnabled ? (conditionalIsHovered ? "🎯 条件悬停激活！" : "🔧 条件悬停我") : "❌ 悬停已禁用" }}
      </div>
    </div>

    <!-- 悬停计数器 -->
    <div>
      <h4>悬停计数器</h4>
      <div ref="counterHoverRef" class="counter-hover-target" :class="{ hovered: counterIsHovered }">
        <div class="counter-icon">{{ counterIsHovered ? "🎉" : "📊" }}</div>
        <div>悬停次数: {{ hoverCount }}</div>
        <div class="counter-subtitle">
          {{ counterIsHovered ? "正在悬停..." : "悬停我增加计数" }}
        </div>
      </div>
    </div>

    <!-- 工具提示示例 -->
    <div>
      <h4>工具提示</h4>
      <div class="tooltip-group">
        <div v-for="(tooltip, index) in tooltips" :key="index" :ref="(el) => (tooltipRefs[index] = el)" class="tooltip-container">
          <button class="tooltip-button" :class="{ hovered: tooltipHoverStates[index] }">
            {{ tooltip.text }}
          </button>
          <div v-if="tooltipHoverStates[index]" class="tooltip">
            {{ tooltip.tip }}
            <div class="tooltip-arrow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useHover } from "@vakao-ui/hooks";

// 延迟悬停
const [delayHoverRef, delayIsHovered] = useHover({
  enterDelay: 300,
  leaveDelay: 100,
});

// 条件悬停
const [conditionalHoverRef, conditionalIsHovered, setConditionalEnabled] = useHover();
const hoverEnabled = ref(true);

// 监听启用状态变化
watch(
  hoverEnabled,
  (enabled) => {
    setConditionalEnabled(enabled);
  },
  { immediate: true }
);

// 悬停计数器
const [counterHoverRef, counterIsHovered] = useHover();
const hoverCount = ref(0);

watch(counterIsHovered, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    hoverCount.value++;
  }
});

// 工具提示
const tooltips = [
  { text: "保存", tip: "保存当前文档 (Ctrl+S)" },
  { text: "复制", tip: "复制选中内容 (Ctrl+C)" },
  { text: "粘贴", tip: "粘贴剪贴板内容 (Ctrl+V)" },
  { text: "删除", tip: "删除选中项目" },
];

const tooltipRefs = ref<HTMLElement[]>([]);
const tooltipHoverStates = ref<any[]>([]);

tooltips.forEach((_, index) => {
  const [tooltipRef, isHovered] = useHover();
  tooltipRefs.value[index] = tooltipRef;
  tooltipHoverStates.value[index] = isHovered;
});
</script>

<style scoped>
.delay-hover-target {
  width: 100%;
  height: 80px;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  user-select: none;
  transition: all 0.3s;
  color: #666;
}

.delay-hover-target.hovered {
  background: linear-gradient(45deg, #fa8c16, #f759ab);
  color: white;
}

.delay-status {
  margin-top: 8px;
  padding: 8px;
  background: #fff7e6;
  border: 1px solid #ffd591;
  border-radius: 4px;
  font-size: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: 12px;
}

.checkbox-label input {
  margin: 0;
}

.checkbox-label span {
  font-size: 14px;
}

.conditional-hover-target {
  width: 100%;
  height: 80px;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  user-select: none;
  transition: all 0.3s;
  color: #666;
}

.conditional-hover-target.hovered {
  background: linear-gradient(45deg, #722ed1, #eb2f96);
  color: white;
}

.conditional-hover-target.disabled {
  opacity: 0.6;
}

.counter-hover-target {
  width: 100%;
  height: 100px;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  user-select: none;
  transition: all 0.3s;
  color: #666;
}

.counter-hover-target.hovered {
  background: linear-gradient(45deg, #52c41a, #73d13d);
  color: white;
}

.counter-icon {
  font-size: 18px;
  margin-bottom: 4px;
}

.counter-subtitle {
  font-size: 12px;
  opacity: 0.8;
}

.tooltip-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-button {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.tooltip-button.hovered {
  border-color: #1890ff;
  color: #1890ff;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  padding: 8px 12px;
  background: #333;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #333;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型              | 默认值 | 说明                                             |
| ------- | ----------------- | ------ | ------------------------------------------------ |
| options | `UseHoverOptions` | `{}`   | 悬停检测配置选项，包含延迟、回调和启用控制等参数 |

### UseHoverOptions

| 属性       | 类型                          | 默认值 | 说明                                                       |
| ---------- | ----------------------------- | ------ | ---------------------------------------------------------- |
| immediate  | `boolean`                     | `true` | 是否立即启用检测，设为 false 可以手动控制何时开始监听      |
| onEnter    | `(event: MouseEvent) => void` | -      | 鼠标进入时的回调函数，可用于执行额外的逻辑                 |
| onLeave    | `(event: MouseEvent) => void` | -      | 鼠标离开时的回调函数，可用于执行额外的逻辑                 |
| enterDelay | `number`                      | `0`    | 进入延迟时间（毫秒），可避免快速移动时的误触发             |
| leaveDelay | `number`                      | `0`    | 离开延迟时间（毫秒），可避免鼠标在元素边缘移动时的状态抖动 |

### 返回值

`useHover` 返回一个包含目标元素引用、悬停状态和控制函数的数组：

```typescript
const [targetRef, isHovered, setEnabled] = useHover(options);
```

| 索引 | 类型                         | 说明                                                 |
| ---- | ---------------------------- | ---------------------------------------------------- |
| 0    | `Ref<HTMLElement \| null>`   | 目标元素的响应式引用，需绑定到要检测悬停状态的元素   |
| 1    | `ComputedRef<boolean>`       | 悬停状态的只读响应式引用，表示当前元素是否处于悬停中 |
| 2    | `(enabled: boolean) => void` | 启用/禁用悬停检测的函数，可动态控制检测功能          |

### 类型定义

```typescript
export type MouseEnterCallback = (event: MouseEvent) => void;
export type MouseLeaveCallback = (event: MouseEvent) => void;

export interface UseHoverOptions {
  immediate?: boolean;
  onEnter?: MouseEnterCallback;
  onLeave?: MouseLeaveCallback;
  enterDelay?: number;
  leaveDelay?: number;
}

export type UseHoverReturn = [Ref<HTMLElement | null>, ComputedRef<boolean>, SetEnabledFunction];

export function useHover(options?: UseHoverOptions): UseHoverReturn;
```

## 使用场景

1. **交互反馈** - 按钮、卡片、列表项等元素的悬停效果，提供视觉反馈
2. **工具提示** - 实现悬停时显示的提示信息，增强用户体验
3. **预览功能** - 悬停预览内容，如图片缩略图、文章摘要等
4. **导航菜单** - 下拉菜单、级联菜单的显示控制，实现悬停展开
5. **数据可视化** - 图表元素的高亮显示，突出显示数据点
6. **图片画廊** - 悬停时显示图片控制按钮或额外信息
7. **表格交互** - 悬停时高亮行或单元格，显示额外操作按钮
8. **表单元素** - 为输入框、选择器等提供悬停状态样式

## 高级用法

### 延迟控制

通过设置延迟时间，避免用户快速移动鼠标时的频繁状态切换，提升用户体验：

```typescript
// 进入延迟 300ms，离开延迟 100ms
const [elementRef, isHovered] = useHover({
  enterDelay: 300, // 鼠标进入后等待 300ms 才触发悬停状态
  leaveDelay: 100, // 鼠标离开后等待 100ms 才取消悬停状态
});
```

### 条件启用

根据特定条件动态启用或禁用悬停检测，适用于特定交互场景：

```typescript
// 初始不启用悬停检测
const [elementRef, isHovered, setEnabled] = useHover({
  immediate: false,
});

// 动态控制启用状态
const isEnabled = ref(true);
watch(isEnabled, (enabled) => {
  setEnabled(enabled);
});

// 或者根据其他条件控制
watch(isEditing, (editing) => {
  // 编辑模式下禁用悬停效果
  setEnabled(!editing);
});
```

### 自定义回调函数

利用回调函数执行额外的逻辑，实现更复杂的交互效果：

```typescript
const [elementRef, isHovered] = useHover({
  onEnter: (event) => {
    console.log("鼠标进入", event);
    // 执行额外操作，如加载数据、播放动画等
    loadPreviewData(elementId);
    animateElement(event.target);
  },
  onLeave: (event) => {
    console.log("鼠标离开", event);
    // 执行清理操作
    cancelPreviewLoading();
    resetAnimation(event.target);
  },
});
```

### 嵌套悬停检测

组合多个悬停检测实例，实现复杂的嵌套交互效果：

```typescript
// 父元素悬停
const [parentRef, isParentHovered] = useHover();
// 子元素悬停
const [childRef, isChildHovered] = useHover();

// 组合悬停状态
const shouldShowDetails = computed(() => {
  return isParentHovered.value || isChildHovered.value;
});

// 使用组合状态控制UI显示
watch(shouldShowDetails, (show) => {
  if (show) {
    showDetailPanel();
  } else {
    hideDetailPanel();
  }
});
```

### 悬停统计与分析

结合其他逻辑，实现悬停行为的统计和分析：

```typescript
// 悬停计数器
const hoverCount = ref(0);
const [counterRef, isHovered] = useHover({
  onEnter: () => {
    hoverCount.value++;
    // 可以发送统计数据到分析系统
    trackUserInteraction("hover", elementId);
  },
});

// 悬停时长统计
const hoverStartTime = ref<number | null>(null);
const totalHoverTime = ref(0);

const [timerRef] = useHover({
  onEnter: () => {
    hoverStartTime.value = Date.now();
  },
  onLeave: () => {
    if (hoverStartTime.value) {
      const duration = Date.now() - hoverStartTime.value;
      totalHoverTime.value += duration;
      // 记录用户关注时长
      trackEngagementTime(elementId, duration);
      hoverStartTime.value = null;
    }
  },
});
```

### 动态样式与动画

结合计算属性，实现基于悬停状态的动态样式和动画效果：

```typescript
const [imageRef, isImageHovered] = useHover();

// 动态样式对象
const imageStyle = computed(() => ({
  transform: isImageHovered.value ? "scale(1.1)" : "scale(1)",
  filter: isImageHovered.value ? "brightness(1.2)" : "brightness(1)",
  boxShadow: isImageHovered.value ? "0 10px 20px rgba(0,0,0,0.2)" : "0 2px 5px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
}));
```

## 注意事项

1. **自动清理** - 组件卸载时会自动清理事件监听器和定时器，避免内存泄漏
2. **响应式控制** - 支持动态启用/禁用悬停检测，可根据应用状态灵活控制
3. **延迟机制** - 使用延迟可以避免频繁的状态切换，提升用户体验
4. **性能考虑** - 对于大量元素，考虑使用虚拟滚动或按需创建悬停实例
5. **移动设备** - 在触摸设备上，悬停事件的行为不同，可能需要额外的触摸事件处理
6. **嵌套元素** - 处理嵌套元素的悬停状态时，注意事件冒泡和捕获的影响
7. **引用绑定** - 确保正确绑定元素引用，特别是在动态创建的元素上
8. **类型安全** - 利用 TypeScript 类型定义，确保类型安全和代码提示
9. **组合使用** - 可与其他 Hooks（如 `useFocus`、`useClickOutside`）组合使用，实现更复杂的交互
10. **SSR 兼容** - 在服务器端渲染环境中，确保只在客户端执行 DOM 操作

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { useHover } from '@vakao-ui/hooks';

// 基础用法
const [basicHoverRef, basicIsHovered] = useHover();

// 卡片数据和状态
const cards = [
  {
    icon: '🚀',
    title: '快速启动',
    description: '一键启动您的项目',
    color: 'linear-gradient(45deg, #1890ff, #36cfc9)',
    hoverColor: 'linear-gradient(45deg, #0050b3, #08979c)'
  },
  {
    icon: '⚡',
    title: '高性能',
    description: '极致的性能体验',
    color: 'linear-gradient(45deg, #52c41a, #73d13d)',
    hoverColor: 'linear-gradient(45deg, #389e0d, #52c41a)'
  },
  {
    icon: '🎨',
    title: '美观设计',
    description: '精美的界面设计',
    color: 'linear-gradient(45deg, #722ed1, #eb2f96)',
    hoverColor: 'linear-gradient(45deg, #531dab, #c41d7f)'
  }
];

// 为每个卡片创建独立的悬停实例
const cardRefs = ref<HTMLElement[]>([]);
const cardHoverStates = ref<any[]>([]);

// 创建卡片悬停实例
const cardHoverInstances = cards.map(() => useHover());
cardHoverInstances.forEach(([_, isHovered], index) => {
  cardHoverStates.value[index] = isHovered;
});

// 在组件挂载后绑定元素引用
onMounted(() => {
  // 确保cardRefs.value已初始化
  if (cardRefs.value) {
    cardHoverInstances.forEach(([cardRef], index) => {
      if (cardRefs.value[index]) {
        cardRef.value = cardRefs.value[index];
      }
    });
  }
});

// 按钮数据和状态
const buttons = [
  { text: '主要按钮', color: '#1890ff', hoverColor: '#0050b3' },
  { text: '成功按钮', color: '#52c41a', hoverColor: '#389e0d' },
  { text: '警告按钮', color: '#fa8c16', hoverColor: '#d46b08' },
  { text: '危险按钮', color: '#ff4d4f', hoverColor: '#cf1322' }
];

// 为每个按钮创建独立的悬停实例
const buttonRefs = ref<HTMLElement[]>([]);
const buttonHoverStates = ref<any[]>([]);

// 创建按钮悬停实例
const buttonHoverInstances = buttons.map(() => useHover());
buttonHoverInstances.forEach(([_, isHovered], index) => {
  buttonHoverStates.value[index] = isHovered;
});

// 在组件挂载后绑定元素引用
onMounted(() => {
  buttonHoverInstances.forEach(([buttonRef], index) => {
    if (buttonRefs.value[index]) {
      buttonRef.value = buttonRefs.value[index];
    }
  });
});

// 高级用法
const [delayHoverRef, delayIsHovered] = useHover({
  enterDelay: 300,
  leaveDelay: 100
});

const [conditionalHoverRef, conditionalIsHovered, setConditionalEnabled] = useHover();
const hoverEnabled = ref(true);

// 监听启用状态变化
watch(hoverEnabled, (enabled) => {
  setConditionalEnabled(enabled);
}, { immediate: true });

const [counterHoverRef, counterIsHovered] = useHover();
const hoverCount = ref(0);

watch(counterIsHovered, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    hoverCount.value++;
  }
});

const tooltips = [
  { text: '保存', tip: '保存当前文档 (Ctrl+S)' },
  { text: '复制', tip: '复制选中内容 (Ctrl+C)' },
  { text: '粘贴', tip: '粘贴剪贴板内容 (Ctrl+V)' },
  { text: '删除', tip: '删除选中项目' }
];

// 为每个工具提示创建独立的悬停实例
const tooltipRefs = ref<HTMLElement[]>([]);
const tooltipHoverStates = ref<any[]>([]);

// 创建工具提示悬停实例
const tooltipHoverInstances = tooltips.map(() => useHover());
tooltipHoverInstances.forEach(([_, isHovered], index) => {
  tooltipHoverStates.value[index] = isHovered;
});

// 在组件挂载后绑定元素引用
onMounted(() => {
  tooltipHoverInstances.forEach(([tooltipRef], index) => {
    if (tooltipRefs.value[index]) {
      tooltipRef.value = tooltipRefs.value[index];
    }
  });
});
</script>
