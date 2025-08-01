# useMouse

一个鼠标位置和状态跟踪 Hook，提供实时的鼠标坐标、移动状态、按键状态等信息。支持相对定位、边界检测、自定义目标元素等功能。

## 基础用法

### 全局鼠标位置跟踪

最基本的用法是跟踪全局鼠标位置。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
      <p style="margin: 4px 0;"><strong>鼠标 X 坐标:</strong> {{ x }}px</p>
      <p style="margin: 4px 0;"><strong>鼠标 Y 坐标:</strong> {{ y }}px</p>
      <p style="margin: 4px 0;"><strong>源元素类型:</strong> {{ sourceType }}</p>
    </div>
    <p style="color: #666; font-size: 14px;">移动鼠标查看坐标变化</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>鼠标 X 坐标: {{ x }}px</p>
    <p>鼠标 Y 坐标: {{ y }}px</p>
    <p>源元素类型: {{ sourceType }}</p>
  </div>
</template>

<script setup>
import { useMouse } from "@vakao-ui/hooks";

const { x, y, sourceType } = useMouse();
</script>
```

  </template>
</Demo>

### 相对位置跟踪

可以指定目标元素，获取相对于该元素的鼠标位置。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <div 
      ref="container" 
      style="position: relative; width: 300px; height: 200px; border: 2px dashed #ccc; border-radius: 8px; width: 100%; margin-bottom: 16px; background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"
    >
      <div 
        v-if="elementX >= 0 && elementY >= 0"
        style="position: absolute; width: 12px; height: 12px; background: #ff4757; border: 2px solid white; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 10;"
        :style="{ left: elementX + 'px', top: elementY + 'px' }"
      ></div>
      <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #999; font-size: 14px; pointer-events: none;">
        在此区域移动鼠标
      </div>
    </div>
    <div style="background: #f5f5f5; padding: 12px; border-radius: 4px;">
      <p style="margin: 4px 0;"><strong>相对 X 坐标:</strong> {{ elementX }}px</p>
      <p style="margin: 4px 0;"><strong>相对 Y 坐标:</strong> {{ elementY }}px</p>
      <p style="margin: 4px 0;"><strong>是否在区域内:</strong> {{ isInside ? '是' : '否' }}</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div ref="container" class="container">
      <div v-if="elementX >= 0 && elementY >= 0" class="pointer" :style="{ left: elementX + 'px', top: elementY + 'px' }"></div>
    </div>
    <p>相对 X 坐标: {{ elementX }}px</p>
    <p>相对 Y 坐标: {{ elementY }}px</p>
    <p>是否在区域内: {{ isInside }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMouse } from "@vakao-ui/hooks";

const container = ref();
const { elementX, elementY, isInside } = useMouse({ target: container });
</script>

<style>
.container {
  position: relative;
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
}

.pointer {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4757;
  border: 2px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
```

  </template>
</Demo>

### 鼠标按键状态

检测鼠标按键的按下状态。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px;">
      <div :style="{ padding: '12px', borderRadius: '6px', textAlign: 'center', border: '2px solid', borderColor: leftPressed ? '#ff4757' : '#ddd', background: leftPressed ? '#ffe8e8' : '#f9f9f9', transition: 'all 0.2s' }">
        <div style="font-size: 20px; margin-bottom: 4px;">🖱️</div>
        <div style="font-weight: bold; margin-bottom: 2px;">左键</div>
        <div :style="{ color: leftPressed ? '#ff4757' : '#999' }">{{ leftPressed ? '按下' : '释放' }}</div>
      </div>
      <div :style="{ padding: '12px', borderRadius: '6px', textAlign: 'center', border: '2px solid', borderColor: rightPressed ? '#ff4757' : '#ddd', background: rightPressed ? '#ffe8e8' : '#f9f9f9', transition: 'all 0.2s' }">
        <div style="font-size: 20px; margin-bottom: 4px;">🖱️</div>
        <div style="font-weight: bold; margin-bottom: 2px;">右键</div>
        <div :style="{ color: rightPressed ? '#ff4757' : '#999' }">{{ rightPressed ? '按下' : '释放' }}</div>
      </div>
      <div :style="{ padding: '12px', borderRadius: '6px', textAlign: 'center', border: '2px solid', borderColor: middlePressed ? '#ff4757' : '#ddd', background: middlePressed ? '#ffe8e8' : '#f9f9f9', transition: 'all 0.2s' }">
        <div style="font-size: 20px; margin-bottom: 4px;">🖱️</div>
        <div style="font-weight: bold; margin-bottom: 2px;">中键</div>
        <div :style="{ color: middlePressed ? '#ff4757' : '#999' }">{{ middlePressed ? '按下' : '释放' }}</div>
      </div>
    </div>
    <p style="color: #666; font-size: 14px;">在此区域按下鼠标按键查看状态变化</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="button-grid">
      <div class="button-card" :class="{ active: leftPressed }">
        <div class="button-name">左键</div>
        <div class="button-status">{{ leftPressed ? "按下" : "释放" }}</div>
      </div>
      <div class="button-card" :class="{ active: rightPressed }">
        <div class="button-name">右键</div>
        <div class="button-status">{{ rightPressed ? "按下" : "释放" }}</div>
      </div>
      <div class="button-card" :class="{ active: middlePressed }">
        <div class="button-name">中键</div>
        <div class="button-status">{{ middlePressed ? "按下" : "释放" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMouse } from "@vakao-ui/hooks";

const { buttons } = useMouse();

const leftPressed = computed(() => !!(buttons.value & 1));
const rightPressed = computed(() => !!(buttons.value & 2));
const middlePressed = computed(() => !!(buttons.value & 4));
</script>

<style>
.button-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.button-card {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  text-align: center;
  background: #f9f9f9;
  transition: all 0.2s;
}

.button-card.active {
  border-color: #ff4757;
  background: #ffe8e8;
}

.button-name {
  font-weight: bold;
  margin-bottom: 4px;
}

.button-status {
  color: #999;
}

.button-card.active .button-status {
  color: #ff4757;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数               | 类型                        | 默认值           | 说明                   |
| ------------------ | --------------------------- | ---------------- | ---------------------- |
| `target`           | `MaybeRefOrGetter<Element>` | `window`         | 目标元素，用于相对定位 |
| `touch`            | `boolean`                   | `true`           | 是否启用触摸支持       |
| `resetOnTouchEnds` | `boolean`                   | `false`          | 触摸结束时是否重置坐标 |
| `initialValue`     | `Position`                  | `{ x: 0, y: 0 }` | 初始坐标值             |

### 返回值

| 属性               | 类型                   | 说明                            |
| ------------------ | ---------------------- | ------------------------------- |
| `x`                | `Ref<number>`          | 鼠标 X 坐标                     |
| `y`                | `Ref<number>`          | 鼠标 Y 坐标                     |
| `sourceType`       | `Ref<MouseSourceType>` | 输入源类型 (`mouse` \| `touch`) |
| `elementX`         | `Ref<number>`          | 相对于目标元素的 X 坐标         |
| `elementY`         | `Ref<number>`          | 相对于目标元素的 Y 坐标         |
| `elementPositionX` | `Ref<number>`          | 目标元素的 X 位置               |
| `elementPositionY` | `Ref<number>`          | 目标元素的 Y 位置               |
| `elementHeight`    | `Ref<number>`          | 目标元素的高度                  |
| `elementWidth`     | `Ref<number>`          | 目标元素的宽度                  |
| `isInside`         | `Ref<boolean>`         | 鼠标是否在目标元素内            |
| `buttons`          | `Ref<number>`          | 鼠标按键状态的位掩码            |

## 使用示例

### 基础位置跟踪

```vue
<template>
  <div>
    <p>鼠标位置: ({{ x }}, {{ y }})</p>
  </div>
</template>

<script setup>
import { useMouse } from "@vakao-ui/hooks";

const { x, y } = useMouse();
</script>
```

### 相对定位

```vue
<template>
  <div>
    <div ref="container" class="container">
      <div class="pointer" :style="{ left: x + 'px', top: y + 'px' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMouse } from "@vakao-ui/hooks";

const container = ref();
const { x, y } = useMouse({ target: container });
</script>

<style>
.container {
  position: relative;
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
}

.pointer {
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
```

### 鼠标按键检测

```vue
<template>
  <div>
    <p>左键: {{ leftPressed ? "按下" : "释放" }}</p>
    <p>右键: {{ rightPressed ? "按下" : "释放" }}</p>
    <p>中键: {{ middlePressed ? "按下" : "释放" }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMouse } from "@vakao-ui/hooks";

const { buttons } = useMouse();

const leftPressed = computed(() => !!(buttons.value & 1));
const rightPressed = computed(() => !!(buttons.value & 2));
const middlePressed = computed(() => !!(buttons.value & 4));
</script>
```

### 触摸设备支持

```vue
<template>
  <div>
    <p>位置: ({{ x }}, {{ y }})</p>
    <p>输入类型: {{ sourceType }}</p>
  </div>
</template>

<script setup>
import { useMouse } from "@vakao-ui/hooks";

// 启用触摸支持，触摸结束时重置坐标
const { x, y, sourceType } = useMouse({
  touch: true,
  resetOnTouchEnds: true,
});
</script>
```

<script setup>
import { ref, computed } from 'vue';
import { useMouse } from '@vakao-ui/hooks';

// 全局鼠标位置跟踪
const { x, y, sourceType } = useMouse();

// 相对位置跟踪
const container = ref();
const { elementX, elementY, isInside } = useMouse({ target: container });

// 鼠标按键状态
const { buttons } = useMouse();
const leftPressed = computed(() => !!(buttons.value & 1));
const rightPressed = computed(() => !!(buttons.value & 2));
const middlePressed = computed(() => !!(buttons.value & 4));
</script>
