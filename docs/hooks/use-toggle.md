# useToggle

用于管理布尔值状态的 hook，提供切换、设置为 true 和设置为 false 的方法。

## 基础用法

最简单的用法是创建一个可切换的布尔状态。

<Demo>
  <div>
    <p>当前状态: {{ basicState ? '开启' : '关闭' }}</p>
    <vk-button @click="basicToggle">切换状态</vk-button>
    <vk-button @click="basicSetTrue">设为开启</vk-button>
    <vk-button @click="basicSetFalse">设为关闭</vk-button>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>当前状态: {{ state ? "开启" : "关闭" }}</p>
    <vk-button @click="toggle">切换状态</vk-button>
    <vk-button @click="setTrue">设为开启</vk-button>
    <vk-button @click="setFalse">设为关闭</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "vakao-ui";

const { state, toggle, setTrue, setFalse } = useToggle();
</script>
```

  </template>
</Demo>

## 设置初始值

可以通过传入参数来设置初始值。

<Demo>
  <div>
    <p>模态框状态: {{ modalVisible ? '显示' : '隐藏' }}</p>
    <vk-button @click="toggleModal">切换模态框</vk-button>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>模态框状态: {{ modalVisible ? "显示" : "隐藏" }}</p>
    <vk-button @click="toggleModal">切换模态框</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "vakao-ui";

// 初始值为 true
const { state: modalVisible, toggle: toggleModal } = useToggle(true);
</script>
```

  </template>
</Demo>

## 实际应用场景

### 控制组件显示/隐藏

<Demo>
  <div>
    <vk-button @click="toggleSidebar">切换侧边栏</vk-button>
    <div v-if="sidebarVisible" class="demo-sidebar">
      <h3>侧边栏内容</h3>
      <p>这里是侧边栏的内容...</p>
      <vk-button @click="closeSidebar">关闭</vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="toggleSidebar">切换侧边栏</vk-button>

    <div v-if="sidebarVisible" class="sidebar">
      <h3>侧边栏内容</h3>
      <p>这里是侧边栏的内容...</p>
      <vk-button @click="closeSidebar">关闭</vk-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from "vakao-ui";

const {
  state: sidebarVisible,
  toggle: toggleSidebar,
  setFalse: closeSidebar,
} = useToggle();
</script>

<style>
.sidebar {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}
</style>
```

  </template>
</Demo>

### 加载状态管理

<Demo>
  <div>
    <vk-button 
      @click="fetchData" 
      :loading="isLoading"
      :disabled="isLoading"
    >
      {{ isLoading ? '加载中...' : '获取数据' }}
    </vk-button>
    <div v-if="data" style="margin-top: 10px;">
      <h3>数据内容:</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">{{ data }}</pre>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="fetchData" :loading="isLoading" :disabled="isLoading">
      {{ isLoading ? "加载中..." : "获取数据" }}
    </vk-button>

    <div v-if="data">
      <h3>数据内容:</h3>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToggle } from "vakao-ui";

const {
  state: isLoading,
  setTrue: startLoading,
  setFalse: stopLoading,
} = useToggle();
const data = ref(null);

const fetchData = async () => {
  startLoading();

  try {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 2000));
    data.value = { message: "数据加载成功!", timestamp: Date.now() };
  } finally {
    stopLoading();
  }
};
</script>
```

  </template>
</Demo>

## API

### 参数

| 参数名       | 类型      | 默认值  | 说明     |
| ------------ | --------- | ------- | -------- |
| initialValue | `boolean` | `false` | 初始状态 |

### 返回值

| 属性名   | 类型           | 说明                 |
| -------- | -------------- | -------------------- |
| state    | `Ref<boolean>` | 当前状态的响应式引用 |
| toggle   | `() => void`   | 切换状态的函数       |
| setTrue  | `() => void`   | 设置状态为 true      |
| setFalse | `() => void`   | 设置状态为 false     |

### 类型定义

```ts
export type UseToggleReturn = {
  state: Ref<boolean>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};

export function useToggle(initialValue?: boolean): UseToggleReturn;
```

## 注意事项

1. `state` 是一个响应式引用，在模板中可以直接使用，在 JavaScript 中需要通过 `.value` 访问
2. `toggle`、`setTrue`、`setFalse` 函数可以安全地传递给事件处理器
3. 该 hook 是纯函数，不会产生副作用
4. 支持在同一个组件中多次使用，每次调用都会创建独立的状态

<script setup>
import { ref } from 'vue';
import { useToggle } from '@vakao-ui/hooks';

// 基础用法示例
const { state: basicState, toggle: basicToggle, setTrue: basicSetTrue, setFalse: basicSetFalse } = useToggle();

// 设置初始值示例
const { state: modalVisible, toggle: toggleModal } = useToggle(true);

// 侧边栏控制示例
const { state: sidebarVisible, toggle: toggleSidebar, setFalse: closeSidebar } = useToggle();

// 表单字段控制示例
const { state: showAdvanced, toggle: toggleAdvanced } = useToggle();

// 加载状态管理示例
const { state: isLoading, setTrue: startLoading, setFalse: stopLoading } = useToggle();
const data = ref(null);

const fetchData = async () => {
  startLoading();
  
  try {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 2000));
    data.value = { message: '数据加载成功!', timestamp: Date.now() };
  } finally {
    stopLoading();
  }
};
</script>

<style scoped>
.demo-sidebar {
  position: relative;
  width: 300px;
  height: 200px;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.demo-sidebar h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.demo-sidebar p {
  margin: 0 0 15px 0;
  color: #666;
}
</style>
