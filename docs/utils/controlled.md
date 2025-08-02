# useControlled (受控组件工具)

`useControlled` 是一个用于处理组件受控和非受控模式的组合式函数。它可以帮助开发者轻松实现同时支持受控和非受控模式的组件。

## 什么是受控/非受控模式？

- **受控模式**：组件的状态完全由父组件通过 props 控制
- **非受控模式**：组件内部维护自己的状态，父组件只提供初始值

## 基本用法

```ts
import { useControlled } from "vakao-ui/utils";

// 在组件中使用
const { isControlled, currentValue, updateValue } = useControlled(
  props,
  "value",
  "modelValue",
  emit,
  "", // 默认值
);

// 在事件处理中
const handleChange = (newValue: string) => {
  updateValue(newValue);
  emit("change", newValue);
};
```

## API

### useControlled

```ts
function useControlled&lt;T&gt;(
  props: Record&lt;string, unknown&gt;,
  propName: string,
  modelValuePropName: string,
  emit: (event: string, ...args: unknown[]) =&gt; void,
  defaultValue: T,
): UseControlledReturn&lt;T&gt;;
```

#### 参数

| 参数               | 类型                                           | 说明                                    |
| ------------------ | ---------------------------------------------- | --------------------------------------- |
| props              | Record&lt;string, unknown&gt;                  | 组件的 props 对象                       |
| propName           | string                                         | 受控模式的 prop 名称（如 'value'）      |
| modelValuePropName | string                                         | v-model 的 prop 名称（如 'modelValue'） |
| emit               | (event: string, ...args: unknown[]) =&gt; void | 组件的 emit 函数                        |
| defaultValue       | T                                              | 默认值                                  |

#### 返回值

返回一个包含以下属性和方法的对象：

| 属性/方法     | 类型                       | 说明                   |
| ------------- | -------------------------- | ---------------------- |
| isControlled  | ComputedRef&lt;boolean&gt; | 是否为受控模式         |
| internalValue | Ref&lt;T&gt;               | 内部值引用             |
| currentValue  | ComputedRef&lt;T&gt;       | 当前值（受控或非受控） |
| updateValue   | (newValue: T) =&gt; void   | 更新值的方法           |

### useStandardControlled

`useStandardControlled` 是 `useControlled` 的简化版本，适用于大多数表单组件的标准用法。

```ts
function useStandardControlled&lt;T&gt;(
  props: Record&lt;string, unknown&gt;,
  emit: (event: string, ...args: unknown[]) => void,
  defaultValue: T,
): UseControlledReturn&lt;T&gt;;
```

#### 参数

| 参数         | 类型                                           | 说明              |
| ------------ | ---------------------------------------------- | ----------------- |
| props        | Record&lt;string, unknown&gt;                  | 组件的 props 对象 |
| emit         | (event: string, ...args: unknown[]) =&gt; void | 组件的 emit 函数  |
| defaultValue | T                                              | 默认值            |

#### 返回值

与 `useControlled` 相同。

## 类型定义

类型定义如下：

```js
// 受控/非受控模式的返回类型
interface UseControlledReturn&lt;T&gt; {
  // 是否为受控模式
  isControlled: ComputedRef&lt;boolean&gt;
  // 内部值引用
  internalValue: Ref&lt;T&gt;
  // 当前值（受控或非受控）
  currentValue: ComputedRef&lt;T&gt;
  // 更新值的方法
  updateValue: (newValue: T) =&gt; void
}
```

## 示例

### 创建支持受控和非受控模式的输入框组件

```vue
<template>
  <input :value="currentValue" @input="handleInput" :disabled="disabled" />
</template>

<script setup lang="ts">
import { useControlled } from "vakao-ui/utils";

const props = defineProps({
  value: String,
  modelValue: String,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue", "change"]);

// 使用 useControlled 处理受控和非受控模式
const { isControlled, currentValue, updateValue } = useControlled(
  props,
  "value",
  "modelValue",
  emit,
  "", // 默认空字符串
);

// 输入事件处理
const handleInput = (e: Event) => {
  const newValue = (e.target as HTMLInputElement).value;
  updateValue(newValue);
  emit("change", newValue);
};
</script>
```

### 使用 useStandardControlled 简化代码

```vue
<template>
  <input :value="currentValue" @input="handleInput" :disabled="disabled" />
</template>

<script setup lang="ts">
import { useStandardControlled } from "vakao-ui/utils";

const props = defineProps({
  value: String,
  modelValue: String,
  disabled: Boolean,
});

const emit = defineEmits(["update:modelValue", "change"]);

// 使用 useStandardControlled 简化代码
const { currentValue, updateValue } = useStandardControlled(
  props,
  emit,
  "", // 默认空字符串
);

// 输入事件处理
const handleInput = (e: Event) => {
  const newValue = (e.target as HTMLInputElement).value;
  updateValue(newValue);
  emit("change", newValue);
};
</script>
```

## 受控和非受控模式的使用场景

### 受控模式

```vue
<template>
  <!-- 受控模式：通过 v-model 或 value 属性控制组件状态 -->
  <vk-input v-model="inputValue" />
  <!-- 或 -->
  <vk-input :value="inputValue" @update:modelValue="inputValue = $event" />
</template>

<script setup>
import { ref } from "vue";

const inputValue = ref("");
</script>
```

### 非受控模式

```vue
<template>
  <!-- 非受控模式：组件内部维护状态 -->
  <vk-input />
  <!-- 或提供初始值 -->
  <vk-input :modelValue="initialValue" />
</template>

<script setup>
const initialValue = "初始值";
</script>
```
