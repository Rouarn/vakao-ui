# useKeyPress

用于检测特定按键的按下状态的 hook，支持单个按键或按键组合，提供按键状态监听、事件回调等功能。

## 基础用法

最简单的用法是监听单个按键的按下状态。

<Demo>
  <div>
    <div class="status-indicator" :class="{ active: isEnterPressed, inactive: !isEnterPressed }">
      <span>🎯</span>
      <span>Enter 键状态: {{ isEnterPressed ? '按下' : '释放' }}</span>
    </div>
    <p>请按下 <kbd>Enter</kbd> 键试试</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>按键状态: {{ isEnterPressed ? "按下" : "释放" }}</p>
    <p>请按下 <kbd>Enter</kbd> 键试试</p>
  </div>
</template>

<script setup lang="ts">
import { useKeyPress } from "vakao-ui";

// 监听 Enter 键
const [isEnterPressed] = useKeyPress("Enter");
</script>
```

  </template>
</Demo>

## 监听多个按键

可以同时监听多个按键，任意一个按键按下时都会触发。

<Demo>
  <div>
    <div class="status-indicator" :class="{ active: isArrowPressed, inactive: !isArrowPressed }">
      <span>🎮</span>
      <span>方向键状态: {{ isArrowPressed ? '按下' : '释放' }}</span>
    </div>
    <p>请按下 <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> 方向键试试</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>方向键状态: {{ isArrowPressed ? "按下" : "释放" }}</p>
    <p>请按下任意方向键试试</p>
  </div>
</template>

<script setup lang="ts">
import { useKeyPress } from "vakao-ui";

// 监听所有方向键
const [isArrowPressed] = useKeyPress(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
</script>
```

  </template>
</Demo>

## 带回调的用法

可以在按键按下或释放时执行回调函数。

<Demo>
  <div>
    <div class="status-indicator" :class="{ active: isSpacePressed, inactive: !isSpacePressed }">
      <span>⌨️</span>
      <span>空格键状态: {{ isSpacePressed ? '按下' : '释放' }}</span>
    </div>
    <div style="margin: 16px 0; display: flex; align-items: center; gap: 12px;">
      <span>按下次数:</span>
      <div class="counter" :class="{ updated: isSpacePressed }">{{ spaceCount }}</div>
    </div>
    <p>请按下 <kbd>Space</kbd> 键试试</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>空格键状态: {{ isSpacePressed ? "按下" : "释放" }}</p>
    <p>按下次数: {{ spaceCount }}</p>
    <p>请按下 <kbd>Space</kbd> 键试试</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useKeyPress } from "vakao-ui";

const spaceCount = ref(0);

// 带回调的用法
const [isSpacePressed] = useKeyPress("Space", {
  onKeyDown: (event) => {
    spaceCount.value++;
    console.log("空格键按下");
  },
  onKeyUp: () => {
    console.log("空格键释放");
  },
});
</script>
```

  </template>
</Demo>

## 动态控制

可以动态启用或禁用按键监听。

<Demo>
  <div style="width: 100%;">
   <div style="display: flex; flex-direction: row; align-items: center; gap: 12px;">
    <div class="status-indicator" :class="{ active: isTabPressed, inactive: !isTabPressed }">
      <span>📋</span>
      <span>Tab 键状态: {{ isTabPressed ? '按下' : '释放' }}</span>
    </div>
    <div class="status-indicator" :class="{ active: enabled, inactive: !enabled }" style="margin: 8px 0;">
      <span>🔧</span>
      <span>监听状态: {{ enabled ? '启用' : '禁用' }}</span>
    </div>
    <button class="demo-button" @click="toggle" :disabled="false">
      {{ enabled ? '禁用' : '启用' }}监听
    </button>
    </div>
    <p>请按下 <kbd>Tab</kbd> 键试试</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>监听状态: {{ enabled ? "启用" : "禁用" }}</p>
    <p>按键状态: {{ isTabPressed ? "按下" : "释放" }}</p>
    <button @click="toggle">{{ enabled ? "禁用" : "启用" }}监听</button>
    <p>请按下 <kbd>Tab</kbd> 键试试</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useKeyPress } from "vakao-ui";

const enabled = ref(true);

// 动态控制监听
const [isTabPressed, enable, disable] = useKeyPress("Tab", {
  enabled,
});

const toggle = () => {
  enabled.value = !enabled.value;
  if (enabled.value) {
    enable();
  } else {
    disable();
  }
};
</script>
```

  </template>
</Demo>

## 自定义过滤器

可以使用自定义函数来过滤按键事件。

<Demo>
  <div>
    <div class="status-indicator" :class="{ active: isNumberPressed, inactive: !isNumberPressed }">
      <span>🔢</span>
      <span>数字键状态: {{ isNumberPressed ? '按下' : '释放' }}</span>
    </div>
    <div style="margin: 16px 0; display: flex; align-items: center; gap: 12px;">
      <span>最后按下的数字:</span>
      <div class="input-display" :class="{ 'has-value': pressedNumber }">
        {{ pressedNumber || '无' }}
      </div>
    </div>
    <p>请按下数字键 <kbd>0</kbd>-<kbd>9</kbd> 试试</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="status-indicator" :class="{ active: isNumberPressed, inactive: !isNumberPressed }">
      <span>🔢</span>
      <span>数字键状态: {{ isNumberPressed ? "按下" : "释放" }}</span>
    </div>
    <div style="margin: 16px 0; display: flex; align-items: center; gap: 12px;">
      <span>最后按下的数字:</span>
      <div class="input-display" :class="{ 'has-value': pressedNumber }">
        {{ pressedNumber || "无" }}
      </div>
    </div>
    <p>请按下数字键 <kbd>0</kbd>-<kbd>9</kbd> 试试</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useKeyPress } from "vakao-ui";

const pressedNumber = ref("");

// 监听所有数字键
const [isNumberPressed] = useKeyPress(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], {
  onKeyDown: (event) => {
    pressedNumber.value = event.key;
  },
});
</script>
```

  </template>
</Demo>

## 事件类型控制

可以指定只监听 keydown 或 keyup 事件。

<Demo>
  <div>
    <div class="status-indicator" :class="{ active: isKeyDownPressed, inactive: !isKeyDownPressed }">
      <span>⬇️</span>
      <span>只监听按下: {{ isKeyDownPressed ? 'CTRL按下' : 'CTRL释放' }}</span>
    </div>
    <div class="status-indicator" :class="{ active: keyUpState === 2, inactive: keyUpState !== 2 }" style="margin: 8px 0;">
      <span>⬆️</span>
      <span>只监听释放: {{ keyUpText }}</span>
    </div>
    <p>请按下 <kbd>Ctrl</kbd> 键试试</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>只监听按下: {{ isKeyDownPressed ? "CTRL按下" : "CTRL释放" }}</p>
    <p>只监听释放: {{ isKeyUpPressed ? "CTRL按下" : "CTRL释放" }}</p>
    <p>请按下 <kbd>Ctrl</kbd> 键试试</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useKeyPress } from "vakao-ui/hooks";

// 只监听 keydown 事件
const [isKeyDownPressed] = useKeyPress("Control", {
  eventType: "keydown",
});

// keyup模式的状态管理：0=等待按下, 1=等待释放, 2=释放
const keyUpState = ref(0);
const [isKeyUpPressed] = useKeyPress("Control", {
  eventType: "keyup",
  onKeyDown: () => {
    keyUpState.value = 1; // 按下后进入等待释放状态
  },
  onKeyUp: () => {
    keyUpState.value = 2; // 释放时短暂显示释放状态
    setTimeout(() => {
      keyUpState.value = 0; // 100ms后回到等待按下状态
    }, 100);
  },
});

// 计算keyup显示文本
const keyUpText = computed(() => {
  switch (keyUpState.value) {
    case 0:
      return "等待CTRL按下";
    case 1:
      return "等待CTRL释放";
    case 2:
      return "CTRL释放";
    default:
      return "等待CTRL按下";
  }
});
</script>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数      | 类型                 | 默认值 | 说明                                             |
| --------- | -------------------- | ------ | ------------------------------------------------ |
| keyFilter | `KeyFilter`          | -      | 按键过滤器，可以是字符串、字符串数组或自定义函数 |
| options   | `UseKeyPressOptions` | `{}`   | 配置选项                                         |

### KeyFilter

```typescript
type KeyFilter = KeyType | KeyType[] | ((event: KeyboardEvent) => boolean);
```

### UseKeyPressOptions

| 属性            | 类型                             | 默认值   | 说明                       |
| --------------- | -------------------------------- | -------- | -------------------------- |
| eventType       | `'keydown' \| 'keyup' \| 'both'` | `'both'` | 监听的事件类型             |
| target          | `Target`                         | `window` | 监听的目标元素             |
| enabled         | `MaybeRefOrGetter<boolean>`      | `true`   | 是否启用监听               |
| preventDefault  | `boolean`                        | `false`  | 是否阻止默认行为           |
| stopPropagation | `boolean`                        | `false`  | 是否阻止事件冒泡           |
| exactMatch      | `boolean`                        | `false`  | 是否精确匹配（区分大小写） |
| onKeyDown       | `(event: KeyboardEvent) => void` | -        | 按键按下时的回调           |
| onKeyUp         | `(event: KeyboardEvent) => void` | -        | 按键释放时的回调           |

### 返回值

```typescript
type UseKeyPressReturn = [
  Ref<boolean>, // isPressed - 按键是否被按下
  () => void, // enable - 启用监听
  () => void, // disable - 禁用监听
];
```

### 类型定义

```typescript
type KeyType = string;

interface UseKeyPressOptions {
  eventType?: "keydown" | "keyup" | "both";
  target?: Target;
  enabled?: MaybeRefOrGetter<boolean>;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  exactMatch?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
}

type UseKeyPressReturn = [Ref<boolean>, () => void, () => void];

function useKeyPress(keyFilter: KeyFilter, options?: UseKeyPressOptions): UseKeyPressReturn;
```

## 注意事项

- 组件卸载时会自动清理事件监听器
- 支持响应式的 `enabled` 控制
- 按键名称不区分大小写（除非设置 `exactMatch: true`）
- 某些浏览器快捷键可能无法被拦截
- 在输入框中可能会触发事件冒泡
- 移动设备的虚拟键盘行为可能不一致

<script setup lang="ts">
import { ref,computed  } from 'vue';
import { useKeyPress } from '@vakao-ui/hooks';

// 基础用法
const [isEnterPressed] = useKeyPress('Enter');

// 监听多个按键
const [isArrowPressed] = useKeyPress(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

// 带回调的用法
const spaceCount = ref(0);
const [isSpacePressed] = useKeyPress('Space', {
  onKeyDown: (event) => {
    spaceCount.value++;
    console.log('空格键按下');
  },
  onKeyUp: () => {
    console.log('空格键释放');
  }
});

// 动态控制
const enabled = ref(true);
const [isTabPressed, enable, disable] = useKeyPress('Tab', {
  enabled
});

const toggle = () => {
  enabled.value = !enabled.value;
  if (enabled.value) {
    enable();
  } else {
    disable();
  }
};

// 自定义过滤器
const pressedNumber = ref('');
const [isNumberPressed] = useKeyPress(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], {
  onKeyDown: (event) => {
    pressedNumber.value = event.key;
  }
});

// 事件类型控制
const [isKeyDownPressed] = useKeyPress('Control', {
  eventType: 'keydown'
});

// keyup模式的状态管理：0=等待按下, 1=等待释放, 2=释放
const keyUpState = ref(0);
const [isKeyUpPressed] = useKeyPress('Control', {
  eventType: 'keyup',
  onKeyDown: () => {
    keyUpState.value = 1; // 按下后进入等待释放状态
  },
  onKeyUp: () => {
    keyUpState.value = 2; // 释放时短暂显示释放状态
    setTimeout(() => {
      keyUpState.value = 0; // 100ms后回到等待按下状态
    }, 100);
  }
});

// 计算keyup显示文本
const keyUpText = computed(() => {
  switch (keyUpState.value) {
    case 0: return '等待CTRL按下';
    case 1: return '等待CTRL释放';
    case 2: return 'CTRL释放';
    default: return '等待CTRL按下';
  }
});
</script>

<style scoped>
/* 键盘按键样式 */
kbd {
  display: inline-block;
  padding: 3px 8px;
  font-size: 0.85em;
  line-height: 1.2;
  color: #24292e;
  background-color: #f6f8fa;
  border: 1px solid #d1d5da;
  border-radius: 6px;
  box-shadow: inset 0 -1px 0 #d1d5da;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-weight: 500;
  margin: 0 2px;
  transition: all 0.2s ease;
}

kbd:hover {
  background-color: #e1e4e8;
  border-color: #c6cbd1;
  box-shadow: inset 0 -1px 0 #c6cbd1;
}

/* 状态指示器样式 */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin: 4px 0;
}

.status-indicator.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transform: translateY(-1px);
}

.status-indicator.inactive {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #e9ecef;
}

/* 按钮样式优化 */
.demo-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.2);
}

.demo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.demo-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.2);
}

.demo-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 计数器样式 */
.counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 1.1em;
  box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
}

.counter.updated {
  animation: pulse 0.6s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 输入显示样式 */
.input-display {
  display: inline-block;
  min-width: 60px;
  padding: 8px 16px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 1.1em;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.input-display.has-value {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  color: white;
  border-color: #56ab2f;
  box-shadow: 0 2px 10px rgba(86, 171, 47, 0.2);
}

/* Demo 容器样式优化 */
.vp-doc [class*="language-"] {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  kbd {
    padding: 2px 6px;
    font-size: 0.8em;
  }
  
  .status-indicator {
    padding: 6px 10px;
    font-size: 0.9em;
  }
  
  .demo-button {
    padding: 8px 16px;
    font-size: 0.9em;
  }
  
  .counter {
    min-width: 35px;
    height: 35px;
    font-size: 1em;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  kbd {
    color: #f0f6fc;
    background-color: #21262d;
    border-color: #30363d;
    box-shadow: inset 0 -1px 0 #30363d;
  }
  
  kbd:hover {
    background-color: #30363d;
    border-color: #484f58;
    box-shadow: inset 0 -1px 0 #484f58;
  }
  
  .status-indicator.inactive {
    background: #21262d;
    color: #8b949e;
    border-color: #30363d;
  }
  
  .input-display {
    background: #21262d;
    border-color: #30363d;
    color: #f0f6fc;
  }
}
</style>
