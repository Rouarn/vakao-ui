# useArray

一个强大的数组状态管理 Hook，提供响应式数组状态和丰富的数组操作方法。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">📋 待办事项管理</h3>
    <div style="margin-bottom: 16px; display: flex; gap: 8px;">
      <vk-input 
        :value="newItem" 
        @input="(value) => newItem = value"
        placeholder="输入新的待办事项"
        @keyup.enter="addItem"
        style="flex: 1;"
      />
      <vk-button @click="addItem" type="primary" :disabled="!newItem.trim()">添加</vk-button>
    </div>
    <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="() => actions.unshift('紧急任务')" size="small">添加到开头</vk-button>
      <vk-button @click="() => actions.pop()" size="small" :disabled="isEmpty">移除最后一个</vk-button>
      <vk-button @click="() => actions.shift()" size="small" :disabled="isEmpty">移除第一个</vk-button>
      <vk-button @click="() => actions.reverse()" size="small" :disabled="isEmpty">反转顺序</vk-button>
      <vk-button @click="() => actions.clear()" size="small" type="danger" :disabled="isEmpty">清空</vk-button>
    </div>
    <div v-if="isEmpty" style="text-align: center; padding: 40px; color: #999; background: #fafafa; border-radius: 4px;">
      📝 暂无待办事项，添加一个开始吧！
    </div>
    <div v-else>
      <div style="margin-bottom: 12px; color: #666; font-size: 14px;">
        共 {{ length }} 项待办事项
      </div>
      <div v-for="(item, index) in list" :key="index" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e8e8e8; border-radius: 4px; margin-bottom: 8px;">
        <span style="flex: 1;">{{ index + 1 }}. {{ item }}</span>
        <vk-button @click="() => editItem(index)" size="small">编辑</vk-button>
        <vk-button @click="() => actions.removeAt(index)" size="small" type="danger">删除</vk-button>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 8px;">
      <vk-input
        v-model="newItem"
        placeholder="输入新的待办事项"
        @keyup.enter="addItem"
        style="flex: 1;"
      />
      <vk-button @click="addItem" type="primary" :disabled="!newItem.trim()"
        >添加</vk-button
      >
    </div>

    <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="() => actions.unshift('紧急任务')" size="small"
        >添加到开头</vk-button
      >
      <vk-button @click="() => actions.pop()" size="small" :disabled="isEmpty"
        >移除最后一个</vk-button
      >
      <vk-button @click="() => actions.shift()" size="small" :disabled="isEmpty"
        >移除第一个</vk-button
      >
      <vk-button
        @click="() => actions.reverse()"
        size="small"
        :disabled="isEmpty"
        >反转顺序</vk-button
      >
      <vk-button
        @click="() => actions.clear()"
        size="small"
        type="danger"
        :disabled="isEmpty"
        >清空</vk-button
      >
    </div>

    <div v-if="isEmpty">📝 暂无待办事项，添加一个开始吧！</div>
    <div v-else>
      <div>共 {{ length }} 项待办事项</div>
      <div v-for="(item, index) in list" :key="index">
        {{ index + 1 }}. {{ item }}
        <vk-button @click="() => editItem(index)" size="small">编辑</vk-button>
        <vk-button
          @click="() => actions.removeAt(index)"
          size="small"
          type="danger"
          >删除</vk-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useArray } from "@vakao-ui/hooks";
import { ref } from "vue";

const [list, actions, length, isEmpty] = useArray < string > [];
const newItem = ref("");

const addItem = () => {
  if (newItem.value.trim()) {
    actions.push(newItem.value.trim());
    newItem.value = "";
  }
};

const editItem = (index) => {
  const newValue = prompt("编辑待办事项:", list.value[index]);
  if (newValue !== null && newValue.trim()) {
    actions.updateAt(index, newValue.trim());
  }
};
</script>
```

  </template>
</Demo>

## 数组操作示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🔢 数字数组操作</h3>
    <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="() => numberActions.push(Math.floor(Math.random() * 100))" type="primary">添加随机数</vk-button>
      <vk-button @click="() => numberActions.sort((a, b) => a - b)" :disabled="numberList.length === 0">升序排序</vk-button>
      <vk-button @click="() => numberActions.sort((a, b) => b - a)" :disabled="numberList.length === 0">降序排序</vk-button>
      <vk-button @click="() => numberActions.filter(n => n % 2 === 0)" :disabled="numberList.length === 0">只保留偶数</vk-button>
      <vk-button @click="() => numberActions.clear()" type="danger" :disabled="numberList.length === 0">清空</vk-button>
    </div>
    <div v-if="numberList.length === 0" style="text-align: center; padding: 40px; color: #999; background: #fafafa; border-radius: 4px;">
      🔢 点击"添加随机数"开始操作
    </div>
    <div v-else>
      <div style="margin-bottom: 12px; color: #666; font-size: 14px;">
        数组长度: {{ numberLength }}，总和: {{ sum }}
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <span v-for="(num, index) in numberList" :key="index" 
              style="padding: 4px 8px; background: #1890ff; color: white; border-radius: 4px; font-family: monospace;">
          {{ num }}
        </span>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button
        @click="() => numberActions.push(Math.floor(Math.random() * 100))"
        type="primary"
        >添加随机数</vk-button
      >
      <vk-button
        @click="() => numberActions.sort((a, b) => a - b)"
        :disabled="numberList.length === 0"
        >升序排序</vk-button
      >
      <vk-button
        @click="() => numberActions.sort((a, b) => b - a)"
        :disabled="numberList.length === 0"
        >降序排序</vk-button
      >
      <vk-button
        @click="() => numberActions.filter((n) => n % 2 === 0)"
        :disabled="numberList.length === 0"
        >只保留偶数</vk-button
      >
      <vk-button
        @click="() => numberActions.clear()"
        type="danger"
        :disabled="numberList.length === 0"
        >清空</vk-button
      >
    </div>

    <div v-if="numberList.length === 0">🔢 点击"添加随机数"开始操作</div>
    <div v-else>
      <div>数组长度: {{ numberLength }}，总和: {{ sum }}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <span v-for="(num, index) in numberList" :key="index">
          {{ num }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArray } from "@vakao-ui/hooks";
import { computed } from "vue";

const [numberList, numberActions, numberLength] = useArray<number>([]);

const sum = computed(() => {
  return numberList.value.reduce((acc, num) => acc + num, 0);
});
</script>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数         | 类型  | 默认值 | 说明         |
| ------------ | ----- | ------ | ------------ |
| initialValue | `T[]` | `[]`   | 数组的初始值 |

### 返回值

`useArray` 返回一个数组，包含以下元素：

```typescript
const [list, actions, length, isEmpty] = useArray<T>(initialValue);
```

| 索引 | 名称    | 类型                        | 说明                   |
| ---- | ------- | --------------------------- | ---------------------- |
| 0    | list    | `ComputedRef<readonly T[]>` | 只读的响应式数组       |
| 1    | actions | `ArrayActions<T>`           | 数组操作方法对象       |
| 2    | length  | `ComputedRef<number>`       | 数组长度的计算属性     |
| 3    | isEmpty | `ComputedRef<boolean>`      | 数组是否为空的计算属性 |

### ArrayActions 方法

| 方法     | 类型                                                          | 说明                         |
| -------- | ------------------------------------------------------------- | ---------------------------- |
| push     | `(...items: T[]) => void`                                     | 添加元素到数组末尾           |
| pop      | `() => T \| undefined`                                        | 移除并返回最后一个元素       |
| shift    | `() => T \| undefined`                                        | 移除并返回第一个元素         |
| unshift  | `(...items: T[]) => void`                                     | 添加元素到数组开头           |
| splice   | `(start: number, deleteCount?: number, ...items: T[]) => T[]` | 删除/插入元素                |
| remove   | `(item: T) => boolean`                                        | 移除指定元素（第一个匹配项） |
| removeAt | `(index: number) => T \| undefined`                           | 移除指定索引的元素           |
| insertAt | `(index: number, item: T) => void`                            | 在指定索引插入元素           |
| updateAt | `(index: number, item: T) => boolean`                         | 更新指定索引的元素           |
| clear    | `() => void`                                                  | 清空数组                     |
| replace  | `(newArray: T[]) => void`                                     | 替换整个数组                 |
| filter   | `(predicate: (item: T, index: number) => boolean) => void`    | 过滤数组元素                 |
| sort     | `(compareFn?: (a: T, b: T) => number) => void`                | 排序数组                     |
| reverse  | `() => void`                                                  | 反转数组                     |

## 类型定义

```typescript
export type UseArrayReturn<T> = [
  ComputedRef<readonly T[]>,
  ArrayActions<T>,
  ComputedRef<number>,
  ComputedRef<boolean>,
];

export interface ArrayActions<T> {
  push: (...items: T[]) => void;
  pop: () => T | undefined;
  shift: () => T | undefined;
  unshift: (...items: T[]) => void;
  splice: (start: number, deleteCount?: number, ...items: T[]) => T[];
  remove: (item: T) => boolean;
  removeAt: (index: number) => T | undefined;
  insertAt: (index: number, item: T) => void;
  updateAt: (index: number, item: T) => boolean;
  clear: () => void;
  replace: (newArray: T[]) => void;
  filter: (predicate: (item: T, index: number) => boolean) => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
  reverse: () => void;
}
```

## 使用场景

1. **列表管理** - 待办事项、购物车、用户列表等
2. **数据操作** - 数组的增删改查操作
3. **排序过滤** - 数据的排序和过滤功能
4. **状态管理** - 复杂数组状态的统一管理

## 注意事项

1. 返回的 `list` 是只读的，只能通过 `actions` 中的方法修改
2. 所有操作都是响应式的，会自动触发视图更新
3. `filter` 和 `sort` 方法会直接修改原数组
4. 数组操作遵循 JavaScript 原生数组方法的行为

<script setup>
import { useArray } from '@vakao-ui/hooks';
import { ref, computed } from 'vue';

// 基础用法示例
const [list, actions, length, isEmpty] = useArray([]);
const newItem = ref('');

const addItem = () => {
  if (newItem.value.trim()) {
    actions.push(newItem.value.trim());
    newItem.value = '';
  }
};

const editItem = (index) => {
  const newValue = prompt('编辑待办事项:', list.value[index]);
  if (newValue !== null && newValue.trim()) {
    actions.updateAt(index, newValue.trim());
  }
};

// 数字数组操作示例
const [numberList, numberActions, numberLength] = useArray([]);

const sum = computed(() => {
  return numberList.value.reduce((acc, num) => acc + num, 0);
});
</script>
