# useDrag

一个拖拽操作管理 Hook，提供完整的拖拽功能，支持位置约束、网格对齐、轴限制等高级特性。自动处理鼠标事件和拖拽状态管理。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🎯 基础拖拽</h3>
    <div style="position: relative; width: 100%; height: 300px; background: #f5f5f5; border: 2px dashed #d9d9d9; border-radius: 8px; overflow: hidden;">
      <div ref="basicDragRef" 
           style="position: absolute; width: 80px; height: 80px; background: linear-gradient(45deg, #1890ff, #52c41a); border-radius: 8px; cursor: move; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; user-select: none;"
           :style="{ transform: `translate(${basicDragState.position.x}px, ${basicDragState.position.y}px)` }">
        拖我
      </div>
    </div>
    <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="() => basicResetPosition()" size="small">重置位置</vk-button>
      <vk-button @click="() => basicSetPosition(100, 100)" size="small">设置位置 (100, 100)</vk-button>
    </div>
    <div style="margin-top: 12px; padding: 8px; background: #f0f0f0; border-radius: 4px; font-family: monospace; font-size: 12px;">
      位置: ({{ basicDragState.position.x }}, {{ basicDragState.position.y }})<br>
      拖拽中: {{ basicDragState.isDragging }}
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div
    style="position: relative; width: 100%; height: 300px; background: #f5f5f5; border: 2px dashed #d9d9d9; border-radius: 8px; overflow: hidden;"
  >
    <div
      ref="basicDragRef"
      class="draggable-item"
      :style="{
        transform: `translate(${basicDragState.position.x}px, ${basicDragState.position.y}px)`,
      }"
    >
      拖我
    </div>
  </div>

  <vk-button @click="() => basicResetPosition()" size="small">重置位置</vk-button>
  <vk-button @click="() => basicSetPosition(100, 100)" size="small">设置位置 (100, 100)</vk-button>

  <div>
    位置: ({{ basicDragState.position.x }}, {{ basicDragState.position.y }})<br />
    拖拽中: {{ basicDragState.isDragging }}
  </div>
</template>

<script setup lang="ts">
import { useDrag } from "@vakao-ui/hooks";

const [basicDragRef, basicDragState, , , basicResetPosition, basicSetPosition] = useDrag();
</script>

<style scoped>
.draggable-item {
  position: absolute;
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #1890ff, #52c41a);
  border-radius: 8px;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  user-select: none;
}
</style>
```

  </template>
</Demo>

## 约束拖拽示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🔒 约束拖拽</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <!-- 边界约束 -->
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">边界约束</h4>
        <div style="position: relative; width: 200px; height: 150px; background: #fff7e6; border: 2px solid #ffd591; border-radius: 8px; overflow: hidden;">
          <div ref="boundaryDragRef" 
               style="position: absolute; width: 40px; height: 40px; background: #fa8c16; border-radius: 6px; cursor: move; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; user-select: none;"
               :style="{ transform: `translate(${boundaryDragState.position.x}px, ${boundaryDragState.position.y}px)` }">
            📦
          </div>
        </div>
      </div>
      <!-- 轴限制 -->
      <div>
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">水平拖拽</h4>
        <div style="position: relative; width: 200px; height: 150px; background: #f6ffed; border: 2px solid #b7eb8f; border-radius: 8px; overflow: hidden;">
          <div ref="horizontalDragRef" 
               style="position: absolute; width: 40px; height: 40px; background: #52c41a; border-radius: 6px; cursor: move; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; user-select: none;"
               :style="{ transform: `translate(${horizontalDragState.position.x}px, ${horizontalDragState.position.y}px)` }">
            ↔️
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 16px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px;">网格对齐</h4>
      <div style="position: relative; width: 100%; height: 200px; background: repeating-linear-gradient(0deg, transparent, transparent 19px, #e8e8e8 19px, #e8e8e8 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #e8e8e8 19px, #e8e8e8 20px); border: 2px solid #d9d9d9; border-radius: 8px; overflow: hidden;">
        <div ref="gridDragRef" 
             style="position: absolute; width: 60px; height: 60px; background: #722ed1; border-radius: 8px; cursor: move; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; user-select: none;"
             :style="{ transform: `translate(${gridDragState.position.x}px, ${gridDragState.position.y}px)` }">
          🎯
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 边界约束 -->
    <div>
      <h4>边界约束</h4>
      <div class="boundary-container">
        <div
          ref="boundaryDragRef"
          class="boundary-item"
          :style="{
            transform: `translate(${boundaryDragState.position.x}px, ${boundaryDragState.position.y}px)`,
          }"
        >
          📦
        </div>
      </div>
    </div>

    <!-- 轴限制 -->
    <div>
      <h4>水平拖拽</h4>
      <div class="horizontal-container">
        <div
          ref="horizontalDragRef"
          class="horizontal-item"
          :style="{
            transform: `translate(${horizontalDragState.position.x}px, ${horizontalDragState.position.y}px)`,
          }"
        >
          ↔️
        </div>
      </div>
    </div>

    <!-- 网格对齐 -->
    <div>
      <h4>网格对齐</h4>
      <div class="grid-container">
        <div
          ref="gridDragRef"
          class="grid-item"
          :style="{
            transform: `translate(${gridDragState.position.x}px, ${gridDragState.position.y}px)`,
          }"
        >
          🎯
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrag } from "@vakao-ui/hooks";

// 边界约束拖拽
const [boundaryDragRef, boundaryDragState] = useDrag({
  boundary: {
    left: 0,
    top: 0,
    right: 160, // 200 - 40 (容器宽度 - 元素宽度)
    bottom: 110, // 150 - 40 (容器高度 - 元素高度)
  },
});

// 水平轴限制拖拽
const [horizontalDragRef, horizontalDragState] = useDrag({
  axis: "x",
  boundary: {
    left: 0,
    right: 160,
  },
});

// 网格对齐拖拽
const [gridDragRef, gridDragState] = useDrag({
  grid: [20, 20], // 20px 网格
});
</script>

<style scoped>
.boundary-container {
  position: relative;
  width: 200px;
  height: 150px;
  background: #fff7e6;
  border: 2px solid #ffd591;
  border-radius: 8px;
  overflow: hidden;
}

.boundary-item {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #fa8c16;
  border-radius: 6px;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  user-select: none;
}

.horizontal-container {
  position: relative;
  width: 200px;
  height: 150px;
  background: #f6ffed;
  border: 2px solid #b7eb8f;
  border-radius: 8px;
  overflow: hidden;
}

.horizontal-item {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #52c41a;
  border-radius: 6px;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  user-select: none;
}

.grid-container {
  position: relative;
  width: 100%;
  height: 200px;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 19px, #e8e8e8 19px, #e8e8e8 20px),
    repeating-linear-gradient(90deg, transparent, transparent 19px, #e8e8e8 19px, #e8e8e8 20px);
  border: 2px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
}

.grid-item {
  position: absolute;
  width: 60px;
  height: 60px;
  background: #722ed1;
  border-radius: 8px;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  user-select: none;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型             | 默认值 | 说明     |
| ------- | ---------------- | ------ | -------- |
| options | `UseDragOptions` | `{}`   | 配置选项 |

### UseDragOptions

| 属性              | 类型                                            | 默认值           | 说明                     |
| ----------------- | ----------------------------------------------- | ---------------- | ------------------------ |
| initialPosition   | `Position`                                      | `{ x: 0, y: 0 }` | 初始位置                 |
| axis              | `'x' \| 'y' \| 'both'`                          | `'both'`         | 拖拽轴限制               |
| grid              | `[number, number]`                              | -                | 网格对齐，[x间距, y间距] |
| boundary          | `Boundary`                                      | -                | 拖拽边界限制             |
| constrainToParent | `boolean`                                       | `false`          | 是否约束在父元素内       |
| handle            | `string`                                        | -                | 拖拽手柄选择器           |
| disabled          | `boolean`                                       | `false`          | 是否禁用拖拽             |
| onDragStart       | `(state: DragState, event: MouseEvent) => void` | -                | 拖拽开始回调             |
| onDrag            | `(state: DragState, event: MouseEvent) => void` | -                | 拖拽中回调               |
| onDragEnd         | `(state: DragState, event: MouseEvent) => void` | -                | 拖拽结束回调             |

### 返回值

`useDrag` 返回一个数组，包含以下元素：

```typescript
const [elementRef, dragState, startDrag, stopDrag, resetPosition, setPosition] = useDrag(options);
```

| 索引 | 名称          | 类型                             | 说明           |
| ---- | ------------- | -------------------------------- | -------------- |
| 0    | elementRef    | `Ref<HTMLElement \| null>`       | 拖拽元素的引用 |
| 1    | dragState     | `ComputedRef<DragState>`         | 拖拽状态       |
| 2    | startDrag     | `(event: MouseEvent) => void`    | 手动开始拖拽   |
| 3    | stopDrag      | `() => void`                     | 手动停止拖拽   |
| 4    | resetPosition | `() => void`                     | 重置位置       |
| 5    | setPosition   | `(x: number, y: number) => void` | 设置位置       |

### 类型定义

```typescript
export interface Position {
  x: number;
  y: number;
}

export interface Boundary {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

export interface DragState {
  position: Position;
  isDragging: boolean;
  startPosition: Position;
  offset: Position;
}

export interface UseDragOptions {
  initialPosition?: Position;
  axis?: "x" | "y" | "both";
  grid?: [number, number];
  boundary?: Boundary;
  constrainToParent?: boolean;
  handle?: string;
  disabled?: boolean;
  onDragStart?: (state: DragState, event: MouseEvent) => void;
  onDrag?: (state: DragState, event: MouseEvent) => void;
  onDragEnd?: (state: DragState, event: MouseEvent) => void;
}

export type UseDragReturn = [
  Ref<HTMLElement | null>,
  ComputedRef<DragState>,
  (event: MouseEvent) => void,
  () => void,
  () => void,
  (x: number, y: number) => void,
];
```

## 使用场景

1. **拖拽排序** - 列表项的拖拽排序
2. **画布操作** - 图形编辑器中的元素拖拽
3. **布局调整** - 可拖拽的面板和窗口
4. **游戏开发** - 游戏中的拖拽交互
5. **数据可视化** - 图表中的拖拽操作

## 高级用法

### 拖拽手柄

```typescript
const [dragRef, dragState] = useDrag({
  handle: ".drag-handle", // 只有 .drag-handle 元素可以拖拽
});
```

### 约束到父元素

```typescript
const [dragRef, dragState] = useDrag({
  constrainToParent: true, // 自动约束在父元素内
});
```

### 回调函数

```typescript
const [dragRef, dragState] = useDrag({
  onDragStart: (state, event) => {
    console.log("开始拖拽", state.position);
  },
  onDrag: (state, event) => {
    console.log("拖拽中", state.position);
  },
  onDragEnd: (state, event) => {
    console.log("拖拽结束", state.position);
  },
});
```

## 注意事项

1. 需要将 `elementRef` 绑定到要拖拽的元素上
2. 拖拽元素需要设置 `position: absolute` 或 `position: relative`
3. 使用 `transform` 来应用位置变化以获得更好的性能
4. 网格对齐会自动调整位置到最近的网格点
5. 边界约束会限制拖拽范围
6. 组件卸载时会自动清理事件监听器

<script setup>
import { useDrag } from '@vakao-ui/hooks';

// 基础拖拽
const [basicDragRef, basicDragState, , , basicResetPosition, basicSetPosition] = useDrag();

// 边界约束拖拽
const [boundaryDragRef, boundaryDragState] = useDrag({
  boundary: {
    left: 0,
    top: 0,
    right: 160, // 200 - 40 (容器宽度 - 元素宽度)
    bottom: 110  // 150 - 40 (容器高度 - 元素高度)
  }
});

// 水平轴限制拖拽
const [horizontalDragRef, horizontalDragState] = useDrag({
  axis: 'x',
  boundary: {
    left: 0,
    right: 160
  }
});

// 网格对齐拖拽
const [gridDragRef, gridDragState] = useDrag({
  grid: [20, 20] // 20px 网格
});
</script>
