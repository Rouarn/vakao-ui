# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选。

<Demo>
  <vk-select v-model="value1" placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
  
  <template #code>

```vue
<template>
  <vk-select v-model="value" placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 受控和非受控模式

VkSelect 组件支持两种使用模式：非受控模式（使用 v-model）和受控模式（使用 :value + 事件）。

### 非受控模式

使用 `v-model` 进行双向数据绑定，组件内部管理状态。

<Demo>
  <div>
    <vk-select v-model="uncontrolledValue" placeholder="非受控模式">
      <vk-option label="选项一" value="option1" />
      <vk-option label="选项二" value="option2" />
      <vk-option label="选项三" value="option3" />
    </vk-select>
    <p>当前值: {{ uncontrolledValue }}</p>
    <vk-button-group>
      <vk-button @click="uncontrolledValue = 'option1'">选择选项一</vk-button>
      <vk-button @click="uncontrolledValue = ''">清空</vk-button>
    </vk-button-group>
  </div>
  
  <template #code>

```vue
<template>
  <vk-select v-model="value" placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
  </vk-select>
  <p>当前值: {{ value }}</p>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

### 受控模式

使用 `:value` 单向绑定配合 `@change` 或 `@update:modelValue` 事件，由父组件完全控制状态。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <vk-select :value="controlledValue1" @change="setControlledValue1" placeholder="受控模式 - @change">
        <vk-option label="选项一" value="option1" />
        <vk-option label="选项二" value="option2" />
        <vk-option label="选项三" value="option3" />
      </vk-select>
      <p>当前值: {{ controlledValue1 }}</p>
      <vk-button-group>
        <vk-button @click="controlledValue1 = 'option2'">选择选项二</vk-button>
        <vk-button @click="controlledValue1 = ''">清空</vk-button>
      </vk-button-group>
    </div>
    <div>
      <vk-select :value="controlledValue2" @update:modelValue="setControlledValue2" placeholder="受控模式 - @update:modelValue">
        <vk-option label="选项一" value="option1" />
        <vk-option label="选项二" value="option2" />
        <vk-option label="选项三" value="option3" />
      </vk-select>
      <p>当前值: {{ controlledValue2 }}</p>
      <vk-button-group>
        <vk-button @click="controlledValue2 = 'option3'">选择选项三</vk-button>
        <vk-button @click="controlledValue2 = ''">清空</vk-button>
      </vk-button-group>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <!-- 使用 @change 事件 -->
  <vk-select :value="value1" @change="setValue1" placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
  </vk-select>

  <!-- 使用 @update:modelValue 事件 -->
  <vk-select
    :value="value2"
    @update:modelValue="setValue2"
    placeholder="请选择"
  >
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");

const setValue1 = (value) => {
  value1.value = value;
};

const setValue2 = (value) => {
  value2.value = value;
};
</script>
```

  </template>
</Demo>

### 多选模式的受控和非受控

多选模式同样支持受控和非受控两种模式。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <h4>非受控多选</h4>
      <vk-select v-model="multiUncontrolledValue" multiple placeholder="非受控多选">
        <vk-option label="选项一" value="option1" />
        <vk-option label="选项二" value="option2" />
        <vk-option label="选项三" value="option3" />
        <vk-option label="选项四" value="option4" />
      </vk-select>
      <p>当前值: {{ multiUncontrolledValue }}</p>
      <vk-button-group>
        <vk-button @click="multiUncontrolledValue = ['option1', 'option2']">选择前两项</vk-button>
        <vk-button @click="multiUncontrolledValue = []">清空</vk-button>
      </vk-button-group>
    </div>
    <div>
      <h4>受控多选</h4>
      <vk-select :value="multiControlledValue" @change="setMultiControlledValue" multiple placeholder="受控多选">
        <vk-option label="选项一" value="option1" />
        <vk-option label="选项二" value="option2" />
        <vk-option label="选项三" value="option3" />
        <vk-option label="选项四" value="option4" />
      </vk-select>
      <p>当前值: {{ multiControlledValue }}</p>
      <vk-button-group>
        <vk-button @click="multiControlledValue = ['option3', 'option4']">选择后两项</vk-button>
        <vk-button @click="multiControlledValue = []">清空</vk-button>
      </vk-button-group>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <!-- 非受控多选 -->
  <vk-select v-model="multiValue1" multiple placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>

  <!-- 受控多选 -->
  <vk-select
    :value="multiValue2"
    @change="setMultiValue2"
    multiple
    placeholder="请选择"
  >
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const multiValue1 = ref([]);
const multiValue2 = ref([]);

const setMultiValue2 = (value) => {
  multiValue2.value = value;
};
</script>
```

  </template>
</Demo>

## 有禁用选项

在 `vk-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项。

<Demo>
  <vk-select v-model="value2" placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" disabled />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
  
  <template #code>

```vue
<template>
  <vk-select v-model="value" placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" disabled />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 禁用状态

选择器不可用状态。

<Demo>
  <vk-select v-model="value3" disabled placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
  
  <template #code>

```vue
<template>
  <vk-select v-model="value" disabled placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 可清空单选

包含清空按钮，可将选择器清空为初始状态。

<Demo>
  <vk-select v-model="value4" clearable placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
  
  <template #code>

```vue
<template>
  <vk-select v-model="value" clearable placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 基础多选

适用性较广的基础多选，用 Tag 展示已选项。

<Demo>
  <vk-select v-model="value5" multiple placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
    <vk-option label="选项五" value="option5" />
  </vk-select>
  
  <template #code>

```vue
<template>
  <vk-select v-model="value" multiple placeholder="请选择">
    <vk-option label="选项一" value="option1" />
    <vk-option label="选项二" value="option2" />
    <vk-option label="选项三" value="option3" />
    <vk-option label="选项四" value="option4" />
    <vk-option label="选项五" value="option5" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const value = ref([]);
</script>
```

  </template>
</Demo>

## 可搜索

可以利用搜索功能快速查找选项。

<Demo>
  <vk-select v-model="value6" filterable placeholder="请选择">
    <vk-option label="北京" value="beijing" />
    <vk-option label="上海" value="shanghai" />
    <vk-option label="广州" value="guangzhou" />
    <vk-option label="深圳" value="shenzhen" />
    <vk-option label="杭州" value="hangzhou" />
    <vk-option label="南京" value="nanjing" />
    <vk-option label="成都" value="chengdu" />
    <vk-option label="西安" value="xian" />
  </vk-select>
  
  <template #code>

```vue
<template>
  <vk-select v-model="value" filterable placeholder="请选择">
    <vk-option label="北京" value="beijing" />
    <vk-option label="上海" value="shanghai" />
    <vk-option label="广州" value="guangzhou" />
    <vk-option label="深圳" value="shenzhen" />
    <vk-option label="杭州" value="hangzhou" />
    <vk-option label="南京" value="nanjing" />
    <vk-option label="成都" value="chengdu" />
    <vk-option label="西安" value="xian" />
  </vk-select>
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 不同尺寸

Select 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

<Demo>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <vk-select v-model="value7" size="small" placeholder="小尺寸">
      <vk-option label="选项一" value="option1" />
      <vk-option label="选项二" value="option2" />
      <vk-option label="选项三" value="option3" />
    </vk-select>
    <vk-select v-model="value8" placeholder="默认尺寸">
      <vk-option label="选项一" value="option1" />
      <vk-option label="选项二" value="option2" />
      <vk-option label="选项三" value="option3" />
    </vk-select>
    <vk-select v-model="value9" size="large" placeholder="大尺寸">
      <vk-option label="选项一" value="option1" />
      <vk-option label="选项二" value="option2" />
      <vk-option label="选项三" value="option3" />
    </vk-select>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;  width: 100%;">
    <vk-select
      v-model="value1"
      size="small"
      placeholder="小尺寸"
      style="width: 100%;"
    >
      <vk-option label="选项一" value="option1" />
      <vk-option label="选项二" value="option2" />
      <vk-option label="选项三" value="option3" />
    </vk-select>

    <vk-select v-model="value2" placeholder="默认尺寸">
      <vk-option label="选项一" value="option1" />
      <vk-option label="选项二" value="option2" />
      <vk-option label="选项三" value="option3" />
    </vk-select>

    <vk-select v-model="value3" size="large" placeholder="大尺寸">
      <vk-option label="选项一" value="option1" />
      <vk-option label="选项二" value="option2" />
      <vk-option label="选项三" value="option3" />
    </vk-select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
</script>
```

  </template>
</Demo>

<script setup>
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const value4 = ref("");
const value5 = ref([]);
const value6 = ref("");
const value7 = ref("");
const value8 = ref("");
const value9 = ref("");

// 受控和非受控模式示例变量
const uncontrolledValue = ref("");
const controlledValue1 = ref("");
const controlledValue2 = ref("");
const multiUncontrolledValue = ref([]);
const multiControlledValue = ref([]);

const setControlledValue1 = (value) => {
  controlledValue1.value = value;
};

const setControlledValue2 = (value) => {
  controlledValue2.value = value;
};

const setMultiControlledValue = (value) => {
  multiControlledValue.value = value;
};
</script>

## API

### Select Props

| 名称        | 类型                             | 默认值         | 说明                 |
| ----------- | -------------------------------- | -------------- | -------------------- |
| size        | `'small' \| 'medium' \| 'large'` | `'medium'`     | 选择器大小           |
| disabled    | `boolean`                        | `false`        | 是否禁用             |
| placeholder | `string`                         | `'请选择'`     | 占位符               |
| clearable   | `boolean`                        | `false`        | 是否可以清空选项     |
| filterable  | `boolean`                        | `false`        | 是否可搜索           |
| multiple    | `boolean`                        | `false`        | 是否多选             |
| loading     | `boolean`                        | `false`        | 是否正在加载         |
| loadingText | `string`                         | `'加载中...'`  | 加载时显示的文字     |
| noDataText  | `string`                         | `'无数据'`     | 选项为空时显示的文字 |
| noMatchText | `string`                         | `'无匹配数据'` | 无匹配时显示的文字   |
| customClass | `string`                         | `''`           | 自定义类名           |
| customStyle | `string \| CSSProperties`        | `''`           | 自定义样式           |

### Select Events

| 名称           | 参数                                            | 说明                                     |
| -------------- | ----------------------------------------------- | ---------------------------------------- |
| change         | `(value: SelectValue \| SelectValue[]) => void` | 选中值发生变化时触发                     |
| focus          | `(evt: FocusEvent) => void`                     | 获得焦点时触发                           |
| blur           | `(evt: FocusEvent) => void`                     | 失去焦点时触发                           |
| clear          | `() => void`                                    | 可清空的单选模式下用户点击清空按钮时触发 |
| visible-change | `(visible: boolean) => void`                    | 下拉框出现/隐藏时触发                    |
| remove-tag     | `(value: SelectValue) => void`                  | 多选模式下移除tag时触发                  |

### Select Slots

| 名称    | 说明            |
| ------- | --------------- |
| default | Option 组件列表 |

### Option Props

| 名称     | 类型               | 默认值  | 说明           |
| -------- | ------------------ | ------- | -------------- |
| label    | `string`           | `-`     | 选项的标签     |
| value    | `string \| number` | `-`     | 选项的值       |
| disabled | `boolean`          | `false` | 是否禁用该选项 |

### Option Events

| 名称  | 参数                           | 说明           |
| ----- | ------------------------------ | -------------- |
| click | `(value: SelectValue) => void` | 点击选项时触发 |

### Option Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 选项内容 |
