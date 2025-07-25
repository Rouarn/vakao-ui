# useThrottle

节流钩子，用于限制函数或响应式值的更新频率。

## 基本用法

### 节流响应式值

```vue
<template>
  <div>
    <div 
      @mousemove="updateMousePosition"
      style="width: 400px; height: 300px; border: 1px solid #ccc; position: relative;"
    >
      <div 
        style="position: absolute; background: red; width: 10px; height: 10px; border-radius: 50%;"
        :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
      ></div>
      <p>实时位置: ({{ mouseX }}, {{ mouseY }})</p>
      <p>节流位置: ({{ throttledMouseX }}, {{ throttledMouseY }})</p>
    </div>
  </div>
</template>

<script setup>
import { useThrottle } from 'vakao-ui';
import { ref } from 'vue';

const mouseX = ref(0);
const mouseY = ref(0);

const throttledMouseX = useThrottle(mouseX, 100);
const throttledMouseY = useThrottle(mouseY, 100);

const updateMousePosition = (event: MouseEvent) => {
  const rect = event.currentTarget.getBoundingClientRect();
  mouseX.value = event.clientX - rect.left;
  mouseY.value = event.clientY - rect.top;
};
</script>
```

### 节流函数

```vue
<template>
  <div>
    <button @click="throttledClick">点击我 (节流)</button>
    <button @click="cancelThrottle">取消节流</button>
    <button @click="flushThrottle">立即执行</button>
    <p>点击次数: {{ clickCount }}</p>
    <p>节流执行次数: {{ throttledCount }}</p>
  </div>
</template>

<script setup>
import { useThrottle } from 'vakao-ui';
import { ref } from 'vue';

const clickCount = ref(0);
const throttledCount = ref(0);

const handleClick = () => {
  throttledCount.value++;
};

const [throttledClick, cancelThrottle, flushThrottle] = useThrottle(handleClick, 1000);

const onClick = () => {
  clickCount.value++;
  throttledClick();
};
</script>
```

## 高级用法

### 滚动事件节流

```vue
<template>
  <div>
    <div 
      ref="scrollContainer"
      @scroll="throttledScroll"
      style="height: 200px; overflow-y: auto; border: 1px solid #ccc;"
    >
      <div style="height: 1000px; padding: 20px;">
        <p>滚动位置: {{ scrollTop }}</p>
        <p>节流滚动位置: {{ throttledScrollTop }}</p>
        <p>滚动百分比: {{ scrollPercentage }}%</p>
        <div v-for="i in 50" :key="i" style="margin: 10px 0;">
          内容行 {{ i }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThrottle } from 'vakao-ui';
import { ref, computed } from 'vue';

const scrollContainer = ref<HTMLElement>();
const scrollTop = ref(0);
const throttledScrollTop = useThrottle(scrollTop, 50);

const scrollPercentage = computed(() => {
  if (!scrollContainer.value) return 0;
  const { scrollTop: top, scrollHeight, clientHeight } = scrollContainer.value;
  return Math.round((top / (scrollHeight - clientHeight)) * 100);
});

const [throttledScroll] = useThrottle((event: Event) => {
  const target = event.target as HTMLElement;
  scrollTop.value = target.scrollTop;
}, 50);
</script>
```

### 窗口大小调整节流

```vue
<template>
  <div>
    <h3>窗口大小监听 (节流)</h3>
    <p>实时大小: {{ windowWidth }} x {{ windowHeight }}</p>
    <p>节流大小: {{ throttledWidth }} x {{ throttledHeight }}</p>
    <p>是否移动端: {{ isMobile }}</p>
  </div>
</template>

<script setup>
import { useThrottle } from 'vakao-ui';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const throttledWidth = useThrottle(windowWidth, 200);
const throttledHeight = useThrottle(windowHeight, 200);

const isMobile = computed(() => throttledWidth.value < 768);

const [throttledResize] = useThrottle(() => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
}, 200);

onMounted(() => {
  window.addEventListener('resize', throttledResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', throttledResize);
});
</script>
```

### API 调用节流

```vue
<template>
  <div>
    <h3>搜索建议 (节流)</h3>
    <input 
      v-model="searchQuery"
      placeholder="输入搜索关键词"
      @input="throttledSearch"
    />
    <div v-if="loading">搜索中...</div>
    <ul v-else>
      <li v-for="suggestion in suggestions" :key="suggestion">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useThrottle } from 'vakao-ui';
import { ref } from 'vue';

const searchQuery = ref('');
const suggestions = ref<string[]>([]);
const loading = ref(false);

const searchSuggestions = async (query: string) => {
  if (!query.trim()) {
    suggestions.value = [];
    return;
  }
  
  loading.value = true;
  
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 300));
    suggestions.value = [
      `${query} 建议1`,
      `${query} 建议2`,
      `${query} 建议3`
    ];
  } finally {
    loading.value = false;
  }
};

const [throttledSearch] = useThrottle(() => {
  searchSuggestions(searchQuery.value);
}, 500, { leading: true, trailing: true });
</script>
```

## API

### 参数

#### 节流响应式值

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `Ref<T>` | - | 要节流的响应式值 |
| delay | `number` | - | 节流间隔时间（毫秒） |
| options | `UseThrottleOptions` | `{}` | 配置选项 |

#### 节流函数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fn | `Function` | - | 要节流的函数 |
| delay | `number` | - | 节流间隔时间（毫秒） |
| options | `UseThrottleOptions` | `{}` | 配置选项 |

### UseThrottleOptions

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| leading | `boolean` | `true` | 是否在节流开始时立即执行 |
| trailing | `boolean` | `true` | 是否在节流结束时执行 |

### 返回值

#### 节流响应式值

返回节流后的响应式值 `Ref<T>`。

#### 节流函数

返回一个数组 `[throttledFn, cancel, flush]`：

| 索引 | 名称 | 类型 | 说明 |
| --- | --- | --- | --- |
| 0 | throttledFn | `ThrottledFunction` | 节流后的函数 |
| 1 | cancel | `ThrottleCancelFunction` | 取消执行函数 |
| 2 | flush | `ThrottleFlushFunction` | 立即执行函数 |

### 类型定义

```ts
/**
 * 节流函数类型
 */
type ThrottledFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

/**
 * 取消函数类型
 */
type ThrottleCancelFunction = () => void;

/**
 * 立即执行函数类型
 */
type ThrottleFlushFunction = () => void;

/**
 * useThrottle 配置选项
 */
interface UseThrottleOptions {
  /** 是否在节流开始时立即执行 */
  leading?: boolean;
  /** 是否在节流结束时执行 */
  trailing?: boolean;
}

/**
 * 节流钩子 - 响应式值版本
 * @param value 要节流的响应式值
 * @param delay 节流间隔时间（毫秒）
 * @param options 配置选项
 * @returns 节流后的响应式值
 * @example
 * const throttledValue = useThrottle(scrollTop, 100);
 */
function useThrottle<T>(
  value: Ref<T>,
  delay: number,
  options?: UseThrottleOptions
): Ref<T>;

/**
 * 节流钩子 - 函数版本
 * @param fn 要节流的函数
 * @param delay 节流间隔时间（毫秒）
 * @param options 配置选项
 * @returns [节流函数, 取消函数, 立即执行函数]
 * @example
 * const [throttledFn, cancel, flush] = useThrottle(handleScroll, 100);
 */
function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options?: UseThrottleOptions
): [ThrottledFunction<T>, ThrottleCancelFunction, ThrottleFlushFunction];
```

## 防抖 vs 节流

| 特性 | 防抖 (Debounce) | 节流 (Throttle) |
| --- | --- | --- |
| **执行时机** | 停止触发后延迟执行 | 固定间隔执行 |
| **适用场景** | 搜索输入、表单验证 | 滚动事件、鼠标移动 |
| **性能影响** | 减少执行次数 | 限制执行频率 |
| **用户体验** | 避免频繁操作 | 保持响应性 |

## 注意事项

1. **间隔时间** - 根据具体场景选择合适的节流间隔
2. **leading/trailing** - 控制首次和末次执行时机
3. **性能优化** - 对于高频事件（如滚动、鼠标移动）建议使用节流
4. **内存管理** - 组件卸载时会自动清理定时器
5. **响应式** - 值版本返回的是响应式引用

## 使用场景

- 滚动事件处理
- 鼠标移动跟踪
- 窗口大小调整
- 按钮连续点击限制
- API 调用频率控制
- 实时搜索建议
- 拖拽操作优化