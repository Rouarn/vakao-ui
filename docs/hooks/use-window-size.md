# useWindowSize

窗口尺寸获取和监听 Hook，提供窗口尺寸的响应式获取和实时监听功能。支持防抖优化和服务端渲染，常用于响应式布局、媒体查询判断、组件尺寸适配等场景。

## 基础用法

最简单的用法是获取当前窗口尺寸并监听变化。

<Demo>
  <div>
    <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; margin-bottom: 16px;">
      <p style="margin: 4px 0; font-size: 16px;"><strong>窗口宽度:</strong> {{ basicSize.width }}px</p>
      <p style="margin: 4px 0; font-size: 16px;"><strong>窗口高度:</strong> {{ basicSize.height }}px</p>
    </div>
    <p style="color: #666; font-size: 14px;">调整浏览器窗口大小查看实时变化</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>窗口宽度: {{ windowSize.width }}px</p>
    <p>窗口高度: {{ windowSize.height }}px</p>
  </div>
</template>

<script setup>
import { useWindowSize } from "vakao-ui";

const [windowSize] = useWindowSize();
</script>
```

  </template>
</Demo>

## 响应式布局判断

基于窗口尺寸进行响应式布局判断，实现不同屏幕尺寸下的适配。

<Demo>
  <div>
    <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; margin-bottom: 16px;">
      <p style="margin: 4px 0;"><strong>当前设备类型:</strong> 
        <span :style="{ color: deviceColor, fontWeight: 'bold' }">{{ deviceType }}</span>
      </p>
      <p style="margin: 4px 0;"><strong>断点信息:</strong></p>
      <ul style="margin: 8px 0; padding-left: 20px;">
        <li>移动端 (< 768px): {{ isMobile ? '✅' : '❌' }}</li>
        <li>平板 (768px - 1024px): {{ isTablet ? '✅' : '❌' }}</li>
        <li>桌面端 (≥ 1024px): {{ isDesktop ? '✅' : '❌' }}</li>
      </ul>
    </div>
    <p style="color: #666; font-size: 14px;">调整窗口大小查看设备类型变化</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>当前设备类型: {{ deviceType }}</p>
    <ul>
      <li>移动端: {{ isMobile ? "是" : "否" }}</li>
      <li>平板: {{ isTablet ? "是" : "否" }}</li>
      <li>桌面端: {{ isDesktop ? "是" : "否" }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWindowSize } from "vakao-ui";

const [size] = useWindowSize();

const isMobile = computed(() => size.value.width < 768);
const isTablet = computed(() => size.value.width >= 768 && size.value.width < 1024);
const isDesktop = computed(() => size.value.width >= 1024);

const deviceType = computed(() => {
  if (isMobile.value) return "移动端";
  if (isTablet.value) return "平板";
  return "桌面端";
});
</script>
```

  </template>
</Demo>

## 防抖优化

使用防抖功能避免窗口尺寸快速变化时的性能问题。

<Demo>
  <div>
    <div style="display: flex; gap: 16px; margin-bottom: 16px;">
      <div style="flex: 1; padding: 12px; background: #e3f2fd; border-radius: 6px;">
        <h4 style="margin: 0 0 8px 0; color: #1976d2;">无防抖</h4>
        <p style="margin: 2px 0; font-size: 14px;">宽度: {{ normalSize.width }}px</p>
        <p style="margin: 2px 0; font-size: 14px;">更新次数: {{ normalUpdateCount }}</p>
      </div>
      <div style="flex: 1; padding: 12px; background: #e8f5e8; border-radius: 6px;">
        <h4 style="margin: 0 0 8px 0; color: #388e3c;">300ms 防抖</h4>
        <p style="margin: 2px 0; font-size: 14px;">宽度: {{ debouncedSize.width }}px</p>
        <p style="margin: 2px 0; font-size: 14px;">更新次数: {{ debouncedUpdateCount }}</p>
      </div>
    </div>
    <p style="color: #666; font-size: 14px;">快速调整窗口大小，观察更新次数差异</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div>
      <h4>无防抖</h4>
      <p>宽度: {{ normalSize.width }}px</p>
      <p>更新次数: {{ normalUpdateCount }}</p>
    </div>

    <div>
      <h4>300ms 防抖</h4>
      <p>宽度: {{ debouncedSize.width }}px</p>
      <p>更新次数: {{ debouncedUpdateCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useWindowSize } from "vakao-ui";

// 无防抖
const [normalSize] = useWindowSize();
const normalUpdateCount = ref(0);

// 300ms 防抖
const [debouncedSize] = useWindowSize({
  debounce: 300,
});
const debouncedUpdateCount = ref(0);

// 监听更新次数
watch(
  normalSize,
  () => {
    normalUpdateCount.value++;
  },
  { deep: true },
);

watch(
  debouncedSize,
  () => {
    debouncedUpdateCount.value++;
  },
  { deep: true },
);
</script>
```

  </template>
</Demo>

## 手动控制

支持手动更新尺寸和动态启用/禁用监听功能。

<Demo>
  <div>
    <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; margin-bottom: 16px;">
      <p style="margin: 4px 0;"><strong>窗口尺寸:</strong> {{ manualSize.width }} x {{ manualSize.height }}</p>
      <p style="margin: 4px 0;"><strong>监听状态:</strong> 
        <span :style="{ color: isListening ? '#4caf50' : '#f44336', fontWeight: 'bold' }">
          {{ isListening ? '已启用' : '已禁用' }}
        </span>
      </p>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="manualUpdate" type="primary">手动更新</vk-button>
      <vk-button @click="toggleListening" :type="isListening ? 'warning' : 'success'">
        {{ isListening ? '禁用监听' : '启用监听' }}
      </vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>窗口尺寸: {{ size.width }} x {{ size.height }}</p>
    <p>监听状态: {{ isListening ? "已启用" : "已禁用" }}</p>

    <div>
      <vk-button @click="updateSize">手动更新</vk-button>
      <vk-button @click="toggleListening">
        {{ isListening ? "禁用监听" : "启用监听" }}
      </vk-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useWindowSize } from "vakao-ui";

const [size, updateSize, setEnabled] = useWindowSize({
  listen: false, // 初始不监听
});

const isListening = ref(false);

const toggleListening = () => {
  isListening.value = !isListening.value;
  setEnabled(isListening.value);
};
</script>
```

  </template>
</Demo>

## 服务端渲染支持

为服务端渲染环境提供初始尺寸配置。

<Demo>
  <div>
    <div style="padding: 16px; background: #fff3e0; border-radius: 8px; margin-bottom: 16px;">
      <p style="margin: 4px 0;"><strong>SSR 初始尺寸:</strong> {{ ssrSize.width }} x {{ ssrSize.height }}</p>
      <p style="color: #666; font-size: 14px;">在服务端渲染时使用预设的初始尺寸</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>窗口尺寸: {{ size.width }} x {{ size.height }}</p>
  </div>
</template>

<script setup>
import { useWindowSize } from "vakao-ui";

// 为 SSR 设置初始尺寸
const [size] = useWindowSize({
  initialWidth: 1920,
  initialHeight: 1080,
});
</script>
```

  </template>
</Demo>

## API

### 参数

| 参数    | 类型                   | 默认值 | 说明     |
| ------- | ---------------------- | ------ | -------- |
| options | `UseWindowSizeOptions` | `{}`   | 配置选项 |

### UseWindowSizeOptions

| 属性          | 类型      | 默认值 | 说明                               |
| ------------- | --------- | ------ | ---------------------------------- |
| immediate     | `boolean` | `true` | 是否立即获取窗口尺寸               |
| listen        | `boolean` | `true` | 是否监听窗口尺寸变化               |
| debounce      | `number`  | `0`    | 防抖延迟时间（毫秒），0 表示不防抖 |
| initialWidth  | `number`  | `1024` | 初始宽度，在服务端渲染时使用       |
| initialHeight | `number`  | `768`  | 初始高度，在服务端渲染时使用       |

### 返回值

返回一个数组 `[windowSize, updateSize, setEnabled]`：

| 索引 | 名称       | 类型                         | 说明                         |
| ---- | ---------- | ---------------------------- | ---------------------------- |
| 0    | windowSize | `ComputedRef<WindowSize>`    | 窗口尺寸信息的只读响应式引用 |
| 1    | updateSize | `() => void`                 | 手动更新窗口尺寸的函数       |
| 2    | setEnabled | `(enabled: boolean) => void` | 启用/禁用监听的函数          |

### 类型定义

```ts
/**
 * 窗口尺寸信息类型
 */
export interface WindowSize {
  /** 窗口宽度 */
  width: number;
  /** 窗口高度 */
  height: number;
}

/**
 * 手动更新窗口尺寸的函数类型
 */
export type UpdateSizeFunction = () => void;

/**
 * 启用/禁用尺寸监听的函数类型
 */
export type SetEnabledFunction = (enabled: boolean) => void;

/**
 * useWindowSize 钩子函数的返回值类型
 */
export type UseWindowSizeReturn = [
  /** 窗口尺寸信息的只读响应式引用 */
  ComputedRef<WindowSize>,
  /** 手动更新窗口尺寸的函数 */
  UpdateSizeFunction,
  /** 启用/禁用尺寸监听的函数 */
  SetEnabledFunction,
];

/**
 * 窗口尺寸监听配置选项
 */
export interface UseWindowSizeOptions {
  /** 是否立即获取窗口尺寸，默认为 true */
  immediate?: boolean;
  /** 是否监听窗口尺寸变化，默认为 true */
  listen?: boolean;
  /** 防抖延迟时间（毫秒），默认为 0（不防抖） */
  debounce?: number;
  /** 初始宽度，在服务端渲染时使用，默认为 1024 */
  initialWidth?: number;
  /** 初始高度，在服务端渲染时使用，默认为 768 */
  initialHeight?: number;
}
```

## 注意事项

1. **响应式引用**: `windowSize` 是一个只读的计算属性，在模板中可以直接使用，在 JavaScript 中需要通过 `.value` 访问
2. **性能优化**: 建议在频繁变化的场景下使用防抖功能，避免过度渲染
3. **服务端渲染**: 在 SSR 环境中会使用配置的初始尺寸，客户端激活后会自动更新为实际尺寸
4. **内存管理**: Hook 会自动处理事件监听器的清理，无需手动移除
5. **多实例使用**: 支持在同一个组件中多次使用，每次调用都会创建独立的状态

<script setup>
import { ref, computed, watch } from 'vue';
import { useWindowSize } from '@vakao-ui/hooks';

// 基础用法示例
const [basicSize] = useWindowSize();

// 响应式布局判断示例
const [responsiveSize] = useWindowSize();
const isMobile = computed(() => responsiveSize.value.width < 768);
const isTablet = computed(() => responsiveSize.value.width >= 768 && responsiveSize.value.width < 1024);
const isDesktop = computed(() => responsiveSize.value.width >= 1024);

const deviceType = computed(() => {
  if (isMobile.value) return '移动端';
  if (isTablet.value) return '平板';
  return '桌面端';
});

const deviceColor = computed(() => {
  if (isMobile.value) return '#f44336';
  if (isTablet.value) return '#ff9800';
  return '#4caf50';
});

// 防抖优化示例
const [normalSize] = useWindowSize();
const [debouncedSize] = useWindowSize({ debounce: 300 });
const normalUpdateCount = ref(0);
const debouncedUpdateCount = ref(0);

watch(normalSize, () => {
  normalUpdateCount.value++;
}, { deep: true });

watch(debouncedSize, () => {
  debouncedUpdateCount.value++;
}, { deep: true });

// 手动控制示例
const [manualSize, manualUpdate, setManualEnabled] = useWindowSize({ listen: false });
const isListening = ref(false);

const toggleListening = () => {
  isListening.value = !isListening.value;
  setManualEnabled(isListening.value);
};

// SSR 支持示例
const [ssrSize] = useWindowSize({
  initialWidth: 1920,
  initialHeight: 1080
});
</script>

<style scoped>
.demo-container {
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
}

.demo-info {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.demo-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.device-info {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.device-card {
  flex: 1;
  padding: 12px;
  border-radius: 6px;
}

.mobile-card {
  background: #ffebee;
  border-left: 4px solid #f44336;
}

.tablet-card {
  background: #fff3e0;
  border-left: 4px solid #ff9800;
}

.desktop-card {
  background: #e8f5e8;
  border-left: 4px solid #4caf50;
}
</style>
