# useEventListener

一个事件监听器管理 Hook，提供简洁的 API 来添加和移除事件监听器。支持 DOM 元素、Window、Document 等多种目标，自动处理清理逻辑。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🎯 基础事件监听</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <!-- 点击事件 -->
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">点击事件</h4>
        <div ref="clickTargetRef" 
             style="width: 100%; height: 100px; background: linear-gradient(45deg, #1890ff, #52c41a); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; user-select: none; transition: transform 0.2s;"
             :style="{ transform: isClicked ? 'scale(0.95)' : 'scale(1)' }">
          点击我 ({{ clickCount }})
        </div>
      </div>
      <!-- 鼠标悬停事件 -->
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">鼠标悬停</h4>
        <div ref="hoverTargetRef" 
             style="width: 100%; height: 100px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; user-select: none; transition: all 0.3s;"
             :style="{ 
               background: isHovered ? 'linear-gradient(45deg, #fa8c16, #f759ab)' : '#f5f5f5',
               color: isHovered ? 'white' : '#666',
               transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
             }">
          {{ isHovered ? '悬停中 ✨' : '悬停我' }}
        </div>
      </div>
    </div>
    <!-- 键盘事件 -->
    <div style="margin-top: 16px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px;">键盘事件</h4>
      <input ref="keyboardTargetRef" 
             v-model="inputValue"
             placeholder="在这里输入，按 Enter 或 Escape 试试"
             style="width: 100%; padding: 12px; border: 2px solid #d9d9d9; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s;"
             :style="{ borderColor: lastKey ? '#1890ff' : '#d9d9d9' }" />
      <div style="margin-top: 8px; padding: 8px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        最后按键: {{ lastKey || '无' }}<br>
        输入值: {{ inputValue }}
      </div>
    </div>
    <!-- 全局事件 -->
    <div style="margin-top: 16px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px;">全局事件监听</h4>
      <div style="padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px;">
        <div style="font-size: 14px; margin-bottom: 8px;">窗口尺寸: {{ windowSize.width }} × {{ windowSize.height }}</div>
        <div style="font-size: 12px; color: #666;">调整浏览器窗口大小试试</div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 点击事件 -->
    <div>
      <h4>点击事件</h4>
      <div
        ref="clickTargetRef"
        class="click-target"
        :class="{ clicked: isClicked }"
      >
        点击我 ({{ clickCount }})
      </div>
    </div>

    <!-- 鼠标悬停事件 -->
    <div>
      <h4>鼠标悬停</h4>
      <div
        ref="hoverTargetRef"
        class="hover-target"
        :class="{ hovered: isHovered }"
      >
        {{ isHovered ? "悬停中 ✨" : "悬停我" }}
      </div>
    </div>

    <!-- 键盘事件 -->
    <div>
      <h4>键盘事件</h4>
      <input
        ref="keyboardTargetRef"
        v-model="inputValue"
        placeholder="在这里输入，按 Enter 或 Escape 试试"
        class="keyboard-input"
        :class="{ active: lastKey }"
      />
      <div class="info">
        最后按键: {{ lastKey || "无" }}<br />
        输入值: {{ inputValue }}
      </div>
    </div>

    <!-- 全局事件 -->
    <div>
      <h4>全局事件监听</h4>
      <div class="window-info">
        <div>窗口尺寸: {{ windowSize.width }} × {{ windowSize.height }}</div>
        <div>调整浏览器窗口大小试试</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

// 点击事件
const clickTargetRef = ref<HTMLElement>();
const clickCount = ref(0);
const isClicked = ref(false);

useEventListener(clickTargetRef, "click", () => {
  clickCount.value++;
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 150);
});

// 鼠标悬停事件
const hoverTargetRef = ref<HTMLElement>();
const isHovered = ref(false);

useEventListener(hoverTargetRef, "mouseenter", () => {
  isHovered.value = true;
});

useEventListener(hoverTargetRef, "mouseleave", () => {
  isHovered.value = false;
});

// 键盘事件
const keyboardTargetRef = ref<HTMLInputElement>();
const inputValue = ref("");
const lastKey = ref("");

useEventListener(keyboardTargetRef, "keydown", (event: KeyboardEvent) => {
  lastKey.value = event.key;
  if (event.key === "Enter") {
    console.log("Enter pressed:", inputValue.value);
  } else if (event.key === "Escape") {
    inputValue.value = "";
    lastKey.value = "";
  }
});

// 全局窗口事件
const windowSize = reactive({ width: 0, height: 0 });

const updateWindowSize = () => {
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;
};

// 初始化窗口尺寸
updateWindowSize();

// 监听窗口大小变化
useEventListener(window, "resize", updateWindowSize);
</script>

<style scoped>
.click-target {
  width: 100%;
  height: 100px;
  background: linear-gradient(45deg, #1890ff, #52c41a);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  user-select: none;
  transition: transform 0.2s;
}

.click-target.clicked {
  transform: scale(0.95);
}

.hover-target {
  width: 100%;
  height: 100px;
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

.hover-target.hovered {
  background: linear-gradient(45deg, #fa8c16, #f759ab);
  color: white;
  transform: translateY(-2px);
}

.keyboard-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.keyboard-input.active {
  border-color: #1890ff;
}

.info {
  margin-top: 8px;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.window-info {
  padding: 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
}

.window-info > div:first-child {
  font-size: 14px;
  margin-bottom: 8px;
}

.window-info > div:last-child {
  font-size: 12px;
  color: #666;
}
</style>
```

  </template>
</Demo>

## 高级用法示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">⚡ 高级事件监听</h3>
    <!-- 事件选项 -->
    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px;">事件选项控制</h4>
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
          <input type="checkbox" v-model="passiveEnabled" style="margin: 0;" />
          <span style="font-size: 14px;">Passive</span>
        </label>
        <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
          <input type="checkbox" v-model="captureEnabled" style="margin: 0;" />
          <span style="font-size: 14px;">Capture</span>
        </label>
        <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
          <input type="checkbox" v-model="onceEnabled" style="margin: 0;" />
          <span style="font-size: 14px;">Once</span>
        </label>
      </div>
      <div ref="optionsTargetRef" 
           style="width: 100%; height: 80px; background: #722ed1; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; user-select: none;">
        点击测试事件选项 ({{ optionsClickCount }})
      </div>
    </div>
    <!-- 条件监听 -->
    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px;">条件监听</h4>
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <vk-button @click="() => toggleListening()" size="small" :type="isListening ? 'primary' : 'default'">
          {{ isListening ? '停止监听' : '开始监听' }}
        </vk-button>
        <span style="font-size: 14px; line-height: 28px;">状态: {{ isListening ? '监听中' : '已停止' }}</span>
      </div>
      <div ref="conditionalTargetRef" 
           style="width: 100%; height: 80px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; user-select: none; transition: all 0.3s;"
           :style="{ 
             background: isListening ? 'linear-gradient(45deg, #52c41a, #1890ff)' : '#f5f5f5',
             color: isListening ? 'white' : '#999'
           }">
        {{ isListening ? `点击我 (${conditionalClickCount})` : '监听已停止' }}
      </div>
    </div>
    <!-- 多事件监听 -->
    <div>
      <h4 style="margin: 0 0 8px 0; font-size: 14px;">多事件监听</h4>
      <div ref="multiEventTargetRef" 
           style="width: 100%; height: 100px; background: linear-gradient(45deg, #fa8c16, #f759ab); border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-weight: bold; user-select: none; transition: transform 0.2s;"
           :style="{ transform: multiEventState.isActive ? 'scale(1.05)' : 'scale(1)' }">
        <div>多事件目标</div>
        <div style="font-size: 12px; margin-top: 4px;">{{ multiEventState.lastEvent }}</div>
      </div>
      <div style="margin-top: 8px; padding: 8px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
        点击: {{ multiEventState.clickCount }} | 双击: {{ multiEventState.dblClickCount }} | 右键: {{ multiEventState.contextMenuCount }}
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 事件选项 -->
    <div>
      <h4>事件选项控制</h4>
      <div>
        <label
          ><input type="checkbox" v-model="passiveEnabled" /> Passive</label
        >
        <label
          ><input type="checkbox" v-model="captureEnabled" /> Capture</label
        >
        <label><input type="checkbox" v-model="onceEnabled" /> Once</label>
      </div>
      <div ref="optionsTargetRef" class="options-target">
        点击测试事件选项 ({{ optionsClickCount }})
      </div>
    </div>

    <!-- 条件监听 -->
    <div>
      <h4>条件监听</h4>
      <vk-button
        @click="toggleListening"
        :type="isListening ? 'primary' : 'default'"
      >
        {{ isListening ? "停止监听" : "开始监听" }}
      </vk-button>
      <span>状态: {{ isListening ? "监听中" : "已停止" }}</span>

      <div
        ref="conditionalTargetRef"
        class="conditional-target"
        :class="{ listening: isListening }"
      >
        {{ isListening ? `点击我 (${conditionalClickCount})` : "监听已停止" }}
      </div>
    </div>

    <!-- 多事件监听 -->
    <div>
      <h4>多事件监听</h4>
      <div
        ref="multiEventTargetRef"
        class="multi-event-target"
        :class="{ active: multiEventState.isActive }"
      >
        <div>多事件目标</div>
        <div>{{ multiEventState.lastEvent }}</div>
      </div>
      <div class="event-stats">
        点击: {{ multiEventState.clickCount }} | 双击:
        {{ multiEventState.dblClickCount }} | 右键:
        {{ multiEventState.contextMenuCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useEventListener } from "@vakao-ui/hooks";

// 事件选项
const optionsTargetRef = ref<HTMLElement>();
const optionsClickCount = ref(0);
const passiveEnabled = ref(false);
const captureEnabled = ref(false);
const onceEnabled = ref(false);

const eventOptions = computed(() => ({
  passive: passiveEnabled.value,
  capture: captureEnabled.value,
  once: onceEnabled.value,
}));

useEventListener(
  optionsTargetRef,
  "click",
  () => {
    optionsClickCount.value++;
  },
  eventOptions
);

// 条件监听
const conditionalTargetRef = ref<HTMLElement>();
const conditionalClickCount = ref(0);
const isListening = ref(true);

const toggleListening = () => {
  isListening.value = !isListening.value;
};

useEventListener(
  conditionalTargetRef,
  "click",
  () => {
    conditionalClickCount.value++;
  },
  { enabled: isListening }
);

// 多事件监听
const multiEventTargetRef = ref<HTMLElement>();
const multiEventState = reactive({
  clickCount: 0,
  dblClickCount: 0,
  contextMenuCount: 0,
  lastEvent: "等待事件...",
  isActive: false,
});

// 点击事件
useEventListener(multiEventTargetRef, "click", () => {
  multiEventState.clickCount++;
  multiEventState.lastEvent = "单击";
  multiEventState.isActive = true;
  setTimeout(() => {
    multiEventState.isActive = false;
  }, 200);
});

// 双击事件
useEventListener(multiEventTargetRef, "dblclick", () => {
  multiEventState.dblClickCount++;
  multiEventState.lastEvent = "双击";
});

// 右键事件
useEventListener(multiEventTargetRef, "contextmenu", (event: MouseEvent) => {
  event.preventDefault();
  multiEventState.contextMenuCount++;
  multiEventState.lastEvent = "右键";
  multiEventState.isActive = true;
  setTimeout(() => {
    multiEventState.isActive = false;
  }, 200);
});
</script>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                                      | 默认值 | 说明         |
| ------- | ----------------------------------------- | ------ | ------------ |
| target  | `EventTarget \| Ref<EventTarget \| null>` | -      | 事件目标     |
| event   | `string`                                  | -      | 事件类型     |
| handler | `EventListener`                           | -      | 事件处理函数 |
| options | `UseEventListenerOptions`                 | `{}`   | 配置选项     |

### UseEventListenerOptions

| 属性    | 类型                      | 默认值  | 说明               |
| ------- | ------------------------- | ------- | ------------------ |
| capture | `boolean \| Ref<boolean>` | `false` | 是否在捕获阶段触发 |
| once    | `boolean \| Ref<boolean>` | `false` | 是否只触发一次     |
| passive | `boolean \| Ref<boolean>` | `false` | 是否为被动监听器   |
| enabled | `boolean \| Ref<boolean>` | `true`  | 是否启用监听器     |

### 返回值

`useEventListener` 返回一个清理函数：

```typescript
const cleanup = useEventListener(target, event, handler, options);

// 手动清理
cleanup();
```

| 类型         | 说明                         |
| ------------ | ---------------------------- |
| `() => void` | 清理函数，用于移除事件监听器 |

### 类型定义

```typescript
export interface UseEventListenerOptions {
  capture?: boolean | Ref<boolean>;
  once?: boolean | Ref<boolean>;
  passive?: boolean | Ref<boolean>;
  enabled?: boolean | Ref<boolean>;
}

export type UseEventListenerReturn = () => void;

export function useEventListener(
  target: EventTarget | Ref<EventTarget | null>,
  event: string,
  handler: EventListener,
  options?: UseEventListenerOptions
): UseEventListenerReturn;
```

## 使用场景

1. **DOM 事件** - 处理点击、键盘、鼠标等事件
2. **全局事件** - 监听 window、document 事件
3. **自定义事件** - 处理组件间的自定义事件
4. **性能优化** - 使用 passive 选项优化滚动性能
5. **条件监听** - 根据状态动态启用/禁用监听器

## 高级用法

### 监听多个事件

```typescript
const elementRef = ref<HTMLElement>();

// 监听多个事件
useEventListener(elementRef, "mouseenter", handleMouseEnter);
useEventListener(elementRef, "mouseleave", handleMouseLeave);
useEventListener(elementRef, "click", handleClick);
```

### 全局键盘快捷键

```typescript
useEventListener(window, "keydown", (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    handleSave();
  }
});
```

### 响应式选项

```typescript
const isEnabled = ref(true);
const useCapture = ref(false);

useEventListener(elementRef, "click", handleClick, {
  enabled: isEnabled,
  capture: useCapture,
});
```

### 性能优化

```typescript
// 滚动事件优化
useEventListener(window, "scroll", handleScroll, { passive: true });

// 一次性事件
useEventListener(elementRef, "click", handleFirstClick, { once: true });
```

## 注意事项

1. 组件卸载时会自动清理事件监听器
2. 支持响应式的事件目标和选项
3. 使用 `passive: true` 可以提升滚动性能
4. `once: true` 的监听器触发后会自动移除
5. 可以通过返回的清理函数手动移除监听器
6. 支持所有标准的 DOM 事件和自定义事件

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useEventListener } from '@vakao-ui/hooks';

// 基础用法
const clickTargetRef = ref<HTMLElement>();
const clickCount = ref(0);
const isClicked = ref(false);

useEventListener(clickTargetRef, 'click', () => {
  clickCount.value++;
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 150);
});

const hoverTargetRef = ref<HTMLElement>();
const isHovered = ref(false);

useEventListener(hoverTargetRef, 'mouseenter', () => {
  isHovered.value = true;
});

useEventListener(hoverTargetRef, 'mouseleave', () => {
  isHovered.value = false;
});

const keyboardTargetRef = ref<HTMLInputElement>();
const inputValue = ref('');
const lastKey = ref('');

useEventListener(keyboardTargetRef, 'keydown', (event: KeyboardEvent) => {
  lastKey.value = event.key;
  if (event.key === 'Enter') {
    console.log('Enter pressed:', inputValue.value);
  } else if (event.key === 'Escape') {
    inputValue.value = '';
    lastKey.value = '';
  }
});

const windowSize = reactive({ width: 0, height: 0 });

const updateWindowSize = () => {
  windowSize.width = window.innerWidth;
  windowSize.height = window.innerHeight;
};

updateWindowSize();
useEventListener(window, 'resize', updateWindowSize);

// 高级用法
const optionsTargetRef = ref<HTMLElement>();
const optionsClickCount = ref(0);
const passiveEnabled = ref(false);
const captureEnabled = ref(false);
const onceEnabled = ref(false);

const eventOptions = computed(() => ({
  passive: passiveEnabled.value,
  capture: captureEnabled.value,
  once: onceEnabled.value
}));

useEventListener(optionsTargetRef, 'click', () => {
  optionsClickCount.value++;
}, eventOptions);

const conditionalTargetRef = ref<HTMLElement>();
const conditionalClickCount = ref(0);
const isListening = ref(true);

const toggleListening = () => {
  isListening.value = !isListening.value;
};

useEventListener(
  conditionalTargetRef, 
  'click', 
  () => {
    conditionalClickCount.value++;
  },
  { enabled: isListening }
);

const multiEventTargetRef = ref<HTMLElement>();
const multiEventState = reactive({
  clickCount: 0,
  dblClickCount: 0,
  contextMenuCount: 0,
  lastEvent: '等待事件...',
  isActive: false
});

useEventListener(multiEventTargetRef, 'click', () => {
  multiEventState.clickCount++;
  multiEventState.lastEvent = '单击';
  multiEventState.isActive = true;
  setTimeout(() => { multiEventState.isActive = false; }, 200);
});

useEventListener(multiEventTargetRef, 'dblclick', () => {
  multiEventState.dblClickCount++;
  multiEventState.lastEvent = '双击';
});

useEventListener(multiEventTargetRef, 'contextmenu', (event: MouseEvent) => {
  event.preventDefault();
  multiEventState.contextMenuCount++;
  multiEventState.lastEvent = '右键';
  multiEventState.isActive = true;
  setTimeout(() => { multiEventState.isActive = false; }, 200);
});
</script>
