# useEventListener

通用事件监听器管理 Hook，提供统一的事件监听器管理功能，支持多种目标类型和自动生命周期管理。

## 基础用法

最简单的用法是监听元素的点击事件。

<Demo>
  <div>
    <div 
      ref="buttonRef" 
      class="demo-button" 
      :class="{ active: isClicked }"
    >
      点击我 ({{ clickCount }})
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div ref="buttonRef" class="demo-button" :class="{ active: isClicked }">点击我 ({{ clickCount }})</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

const buttonRef = ref<HTMLElement>();
const clickCount = ref(0);
const isClicked = ref(false);

// 基础用法
const [addListener, removeListener, setEnabled] = useEventListener(buttonRef, "click", () => {
  clickCount.value++;
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 150);
});
</script>
```

  </template>
</Demo>

## 监听窗口事件

可以监听全局事件，如窗口大小变化。

<Demo>
    <div class="window-info">
      <p>窗口大小: {{ windowSize.width }} × {{ windowSize.height }}</p>
      <vk-button @click="toggleResize">{{ resizeEnabled ? '禁用' : '启用' }}监听</vk-button>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="window-info">
      <p>窗口大小: {{ windowSize.width }} × {{ windowSize.height }}</p>
      <vk-button @click="toggleResize">{{ resizeEnabled ? "禁用" : "启用" }}监听</vk-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

const windowSize = reactive({ width: 0, height: 0 });
const resizeEnabled = ref(true);

const updateWindowSize = () => {
  if (typeof window !== "undefined") {
    windowSize.width = window.innerWidth;
    windowSize.height = window.innerHeight;
  }
};

// 监听窗口大小变化
const [, , setResizeEnabled] = useEventListener(() => (typeof window !== "undefined" ? window : null), "resize", updateWindowSize, {
  passive: true,
});

// 初始化
updateWindowSize();

const toggleResize = () => {
  resizeEnabled.value = !resizeEnabled.value;
  setResizeEnabled(resizeEnabled.value);
};
</script>
```

  </template>
</Demo>

## 实际应用场景

### 键盘事件处理

<Demo>
  <div style="width: 100%;">  
    <input 
      ref="inputRef" 
      v-model="inputValue" 
      placeholder="输入内容，按 Enter 或 Escape"
      class="demo-input"
    />
    <p class="key-info">最后按键: {{ lastKey || '无' }}</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <input ref="inputRef" v-model="inputValue" placeholder="输入内容，按 Enter 或 Escape" class="demo-input" />
    <p class="key-info">最后按键: {{ lastKey || "无" }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

const inputRef = ref<HTMLInputElement>();
const inputValue = ref("");
const lastKey = ref("");

// 监听键盘事件
useEventListener(inputRef, "keydown", (event: KeyboardEvent) => {
  lastKey.value = event.key;
  if (event.key === "Enter") {
    console.log("Enter pressed:", inputValue.value);
  } else if (event.key === "Escape") {
    inputValue.value = "";
    lastKey.value = "";
  }
});
</script>
```

  </template>
</Demo>

### 鼠标悬停效果

<Demo>
    <div 
      ref="hoverRef" 
      class="hover-target" 
      :class="{ hovered: isHovered }"
    >
      {{ isHovered ? '鼠标悬停中' : '鼠标移入试试' }}
    </div>
  
  <template #code>

```vue
<template>
  <div ref="hoverRef" class="hover-target" :class="{ hovered: isHovered }">
    {{ isHovered ? "鼠标悬停中" : "鼠标移入试试" }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

const hoverRef = ref<HTMLElement>();
const isHovered = ref(false);

// 监听鼠标进入
useEventListener(hoverRef, "mouseenter", () => {
  isHovered.value = true;
});

// 监听鼠标离开
useEventListener(hoverRef, "mouseleave", () => {
  isHovered.value = false;
});
</script>
```

  </template>
</Demo>

### 条件监听

<Demo>
  <div style="width: 100%;">
    <div class="controls">
      <label>
        <input type="checkbox" v-model="listenEnabled" />
        启用点击监听
      </label>
    </div>
    <div 
      ref="conditionalRef" 
      class="conditional-target" 
      :class="{ enabled: listenEnabled, clicked: wasClicked }"
    >
      {{ listenEnabled ? '监听已启用，点击我' : '监听已禁用' }}
    </div>
    <p class="click-info">点击次数: {{ conditionalCount }}</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="controls">
      <label>
        <input type="checkbox" v-model="listenEnabled" />
        启用点击监听
      </label>
    </div>
    <div ref="conditionalRef" class="conditional-target" :class="{ enabled: listenEnabled, clicked: wasClicked }">
      {{ listenEnabled ? "监听已启用，点击我" : "监听已禁用" }}
    </div>
    <p class="click-info">点击次数: {{ conditionalCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

const conditionalRef = ref<HTMLElement>();
const listenEnabled = ref(false);
const conditionalCount = ref(0);
const wasClicked = ref(false);

const [, , setEnabled] = useEventListener(
  conditionalRef,
  "click",
  () => {
    conditionalCount.value++;
    wasClicked.value = true;
    setTimeout(() => {
      wasClicked.value = false;
    }, 200);
  },
  { immediate: false },
);

// 根据条件动态启用/禁用
watch(listenEnabled, (enabled) => {
  setEnabled(enabled);
});
</script>
```

  </template>
</Demo>

### 手动控制监听器

<Demo>
  <div style="width: 100%;">
    <div 
      ref="manualRef" 
      class="manual-target" 
      :class="{ active: manualActive }"
    >
      {{ manualActive ? '监听已启用，点击我' : '监听已禁用' }}
    </div>
    <p class="click-info">点击次数: {{ manualCount }}</p>
    <div class="controls">
      <vk-button @click="startListening">开始监听</vk-button>
      <vk-button @click="stopListening">停止监听</vk-button>
      <vk-button @click="toggleListening">切换监听</vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div ref="manualRef" class="manual-target" :class="{ active: manualActive }">
      {{ manualActive ? "监听已启用，点击我" : "监听已禁用" }}
    </div>
    <p class="click-info">点击次数: {{ manualCount }}</p>
    <div class="controls">
      <vk-button @click="startListening">开始监听</vk-button>
      <vk-button @click="stopListening">停止监听</vk-button>
      <vk-button @click="toggleListening">切换监听</vk-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

const manualRef = ref<HTMLElement>();
const manualCount = ref(0);
const manualActive = ref(false);

const [addListener, removeListener, setEnabled] = useEventListener(
  manualRef,
  "click",
  () => {
    manualCount.value++;
  },
  { immediate: false },
);

const startListening = () => {
  addListener();
  manualActive.value = true;
};

const stopListening = () => {
  removeListener();
  manualActive.value = false;
};

const toggleListening = () => {
  if (manualActive.value) {
    stopListening();
  } else {
    startListening();
  }
};
</script>
```

  </template>
</Demo>

## API

### 参数

| 参数名  | 类型                      | 默认值 | 说明                           |
| ------- | ------------------------- | ------ | ------------------------------ |
| target  | `EventTargetRef`          | -      | 事件目标，支持响应式引用或函数 |
| event   | `string`                  | -      | 事件名称                       |
| handler | `EventHandler<T>`         | -      | 事件处理函数                   |
| options | `UseEventListenerOptions` | `{}`   | 配置选项                       |

### 配置选项

| 选项名     | 类型      | 默认值 | 说明                           |
| ---------- | --------- | ------ | ------------------------------ |
| immediate  | `boolean` | `true` | 是否立即添加监听器             |
| autoRemove | `boolean` | `true` | 是否在组件卸载时自动移除监听器 |
| passive    | `boolean` | -      | 是否为被动监听器               |
| capture    | `boolean` | -      | 是否在捕获阶段处理事件         |
| once       | `boolean` | -      | 是否只触发一次                 |

### 返回值

返回一个数组，包含以下元素：

| 索引 | 类型                     | 说明                      |
| ---- | ------------------------ | ------------------------- |
| 0    | `AddListenerFunction`    | 手动添加事件监听器的函数  |
| 1    | `RemoveListenerFunction` | 手动移除事件监听器的函数  |
| 2    | `SetEnabledFunction`     | 启用/禁用事件监听器的函数 |

### 类型定义

````ts
/**
 * 事件监听器的目标类型
 */
export type EventTarget = Window | Document | HTMLElement | null;

/**
 * 事件监听器的目标引用类型
 */
export type EventTargetRef = Ref<EventTarget> | (() => EventTarget);

/**
 * 通用事件处理函数类型
 */
export type EventHandler<T extends Event = Event> = (event: T) => void;

/**
 * 添加事件监听器的函数类型
 */
export type AddListenerFunction = () => void;

/**
 * 移除事件监听器的函数类型
 */
export type RemoveListenerFunction = () => void;

/**
 * useEventListener 钩子函数的返回值类型
 */
export type UseEventListenerReturn = [
  /** 手动添加事件监听器的函数 */
  AddListenerFunction,
  /** 手动移除事件监听器的函数 */
  RemoveListenerFunction,
  /** 启用/禁用事件监听器的函数 */
  SetEnabledFunction,
];

/**
 * 事件监听器配置选项
 */
export interface UseEventListenerOptions extends AddEventListenerOptions {
  /** 是否立即添加监听器，默认为 true */
  immediate?: boolean;
  /** 是否在组件卸载时自动移除监听器，默认为 true */
  autoRemove?: boolean;
}

/**
 * 通用事件监听器管理 Hook
 * @param target - 事件目标，支持响应式引用或函数
 * @param event - 事件名称
 * @param handler - 事件处理函数
 * @param options - 配置选项
 * @returns 返回包含控制函数的数组
 * @example
 * ```typescript
 * // 基础用法
 * const [addListener, removeListener, setEnabled] = useEventListener(
 *   buttonRef,
 *   'click',
 *   () => console.log('clicked')
 * );
 *
 * // 监听窗口事件
 * const [, , setResizeEnabled] = useEventListener(
 *   window,
 *   'resize',
 *   () => console.log('resized'),
 *   { passive: true }
 * );
 *
 * // 条件监听
 * const [, , setEnabled] = useEventListener(
 *   elementRef,
 *   'scroll',
 *   handleScroll,
 *   { immediate: false }
 * );
 * ```
 */
export function useEventListener<T extends Event = Event>(
  target: EventTargetRef,
  event: string,
  handler: EventHandler<T>,
  options?: UseEventListenerOptions,
): UseEventListenerReturn;
````

## 注意事项

1. **目标类型**: 支持 `Window`、`Document`、`HTMLElement` 等多种目标类型
2. **响应式目标**: 当目标元素发生变化时，会自动重新绑定事件监听器
3. **生命周期管理**: 默认在组件卸载时自动清理监听器，防止内存泄漏
4. **性能优化**: 使用 `setEnabled` 可以动态启用/禁用监听器，避免不必要的事件处理
5. **类型安全**: 完整的 TypeScript 类型支持，提供良好的开发体验
6. **选项配置**: 支持所有原生 `addEventListener` 的选项，如 `passive`、`capture`、`once` 等

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { useEventListener } from '@vakao-ui/hooks';

// 基础用法示例
const buttonRef = ref<HTMLElement>();
const clickCount = ref(0);
const isClicked = ref(false);

const [addListener, removeListener, setEnabled] = useEventListener(
  buttonRef,
  'click',
  () => {
    clickCount.value++;
    isClicked.value = true;
    setTimeout(() => {
      isClicked.value = false;
    }, 150);
  }
);

// 窗口事件示例
const windowSize = reactive({ width: 0, height: 0 });
const resizeEnabled = ref(true);

const updateWindowSize = () => {
  if (typeof window !== 'undefined') {
    windowSize.width = window.innerWidth;
    windowSize.height = window.innerHeight;
  }
};

const [, , setResizeEnabled] = useEventListener(
  () => typeof window !== 'undefined' ? window : null,
  'resize',
  updateWindowSize,
  { passive: true }
);

updateWindowSize();

const toggleResize = () => {
  resizeEnabled.value = !resizeEnabled.value;
  setResizeEnabled(resizeEnabled.value);
};

// 键盘事件示例
const inputRef = ref<HTMLInputElement>();
const inputValue = ref('');
const lastKey = ref('');

useEventListener(
  inputRef,
  'keydown',
  (event: KeyboardEvent) => {
    lastKey.value = event.key;
    if (event.key === 'Enter') {
      console.log('Enter pressed:', inputValue.value);
    } else if (event.key === 'Escape') {
      inputValue.value = '';
      lastKey.value = '';
    }
  }
);

// 鼠标悬停示例
const hoverRef = ref<HTMLElement>();
const isHovered = ref(false);

useEventListener(hoverRef, 'mouseenter', () => {
  isHovered.value = true;
});

useEventListener(hoverRef, 'mouseleave', () => {
  isHovered.value = false;
});

// 条件监听示例
const conditionalRef = ref<HTMLElement>();
const listenEnabled = ref(false);
const conditionalCount = ref(0);
const wasClicked = ref(false);

const [, , setConditionalEnabled] = useEventListener(
  conditionalRef,
  'click',
  () => {
    conditionalCount.value++;
    wasClicked.value = true;
    setTimeout(() => {
      wasClicked.value = false;
    }, 200);
  },
  { immediate: false }
);

watch(listenEnabled, (enabled) => {
  setConditionalEnabled(enabled);
});

// 手动控制示例
const manualRef = ref<HTMLElement>();
const manualCount = ref(0);
const manualActive = ref(false);

const [addManualListener, removeManualListener] = useEventListener(
  manualRef,
  'click',
  () => {
    manualCount.value++;
  },
  { immediate: false }
);

const startListening = () => {
  addManualListener();
  manualActive.value = true;
};

const stopListening = () => {
  removeManualListener();
  manualActive.value = false;
};

const toggleListening = () => {
  if (manualActive.value) {
    stopListening();
  } else {
    startListening();
  }
};
</script>

<style scoped>
.demo-button {
  display: inline-block;
  padding: 12px 24px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.demo-button:hover {
  background: #007AFF;
}

.demo-button.active {
  transform: scale(0.95);
  background: #007AFF;
}

.window-info {
  width: 100%;
  padding: 16px;
  background: #F5F5F5;
  border-radius: 6px;
  margin-bottom: 16px;
}

.window-info p {
  margin: 0 0 12px 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
}

.demo-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #D1D1D1;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 8px;
}

.demo-input:focus {
  outline: none;
  border-color: #007AFF;
}

.key-info {
  font-size: 12px;
  color: #8E8E8E;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  margin: 0;
}

.hover-target {
  width: 100%;
  display: inline-block;
  padding: 20px 40px;
  background: #F5F5F5;
  border: 2px solid #D1D1D1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.hover-target.hovered {
  background: #007AFF;
  border-color: #007AFF;
  color: #FFFFFF;
  transform: translateY(-2px);
}

.conditional-target {
  display: inline-block;
  padding: 16px 24px;
  background: #F5F5F5;
  border: 2px solid #D1D1D1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  margin: 8px 0;
}

.conditional-target.enabled {
  background: #007AFF;
  border-color: #007AFF;
  color: #FFFFFF;
}

.conditional-target.clicked {
  transform: scale(0.95);
}

.manual-target {
  display: inline-block;
  padding: 16px 24px;
  background: #F5F5F5;
  border: 2px solid #D1D1D1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 12px;
}

.manual-target.active {
  background: #007AFF;
  border-color: #007AFF;
  color: #FFFFFF;
}

.controls {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
}

.controls input[type="checkbox"] {
  margin: 0;
}

.click-info {
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  margin: 8px 0;
}
</style>
