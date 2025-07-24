# useToggle

用于管理布尔值状态的 hook，提供切换、设置为 true 和设置为 false 的方法。

## 基础用法

最简单的用法是创建一个可切换的布尔状态。

```vue
<template>
  <div>
    <p>当前状态: {{ state ? '开启' : '关闭' }}</p>
    <vk-button @click="toggle">切换状态</vk-button>
    <vk-button @click="setTrue">设为开启</vk-button>
    <vk-button @click="setFalse">设为关闭</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from 'vakao-ui';

const { state, toggle, setTrue, setFalse } = useToggle();
</script>
```

## 设置初始值

可以通过传入参数来设置初始值。

```vue
<template>
  <div>
    <p>模态框状态: {{ modalVisible ? '显示' : '隐藏' }}</p>
    <vk-button @click="toggleModal">切换模态框</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from 'vakao-ui';

// 初始值为 true
const { state: modalVisible, toggle: toggleModal } = useToggle(true);
</script>
```

## 实际应用场景

### 控制组件显示/隐藏

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
import { useToggle } from 'vakao-ui';

const { 
  state: sidebarVisible, 
  toggle: toggleSidebar, 
  setFalse: closeSidebar 
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

### 表单字段控制

```vue
<template>
  <div>
    <label>
      <input 
        type="checkbox" 
        :checked="agreeTerms" 
        @change="toggleAgree"
      >
      我同意服务条款
    </label>
    
    <vk-button 
      :disabled="!agreeTerms" 
      type="primary"
    >
      提交
    </vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from 'vakao-ui';

const { state: agreeTerms, toggle: toggleAgree } = useToggle();
</script>
```

### 加载状态管理

```vue
<template>
  <div>
    <vk-button 
      :loading="isLoading" 
      @click="handleSubmit"
    >
      {{ isLoading ? '提交中...' : '提交' }}
    </vk-button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from 'vakao-ui';

const { state: isLoading, setTrue: startLoading, setFalse: stopLoading } = useToggle();

const handleSubmit = async () => {
  startLoading();
  
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('提交成功');
  } catch (error) {
    console.error('提交失败:', error);
  } finally {
    stopLoading();
  }
};
</script>
```

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