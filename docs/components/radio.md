# Radio 单选框

在一组备选项中进行单选。

## 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

<Demo>
  <vk-radio v-model="radio1" value="1" label="备选项1" />
  <vk-radio v-model="radio1" value="2" label="备选项2" />
  
  <template #code>

```vue
<template>
  <vk-radio v-model="radio" value="1" label="备选项1" />
  <vk-radio v-model="radio" value="2" label="备选项2" />
</template>

<script setup>
import { ref } from "vue";

const radio = ref("1");
</script>
```

  </template>
</Demo>

## 受控和非受控模式

### 非受控模式

使用 `v-model` 双向绑定，组件内部管理状态。

<Demo>
  <vk-radio v-model="uncontrolledRadio" value="option1" label="选项1" />
  <vk-radio v-model="uncontrolledRadio" value="option2" label="选项2" />
  <p>当前值: {{ uncontrolledRadio }}</p>
  
  <template #code>

```vue
<template>
  <vk-radio v-model="radio" value="option1" label="选项1" />
  <vk-radio v-model="radio" value="option2" label="选项2" />
  <p>当前值: {{ radio }}</p>
</template>

<script setup>
import { ref } from "vue";

const radio = ref("option1");
</script>
```

  </template>
</Demo>

### 受控模式

使用 `:model-value` 单向绑定配合 `@change` 或 `@update:modelValue` 事件，由父组件完全控制状态。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <vk-radio :model-value="controlledRadio" @change="setControlledRadio" value="controlled1" label="受控模式 - @change" />
      <vk-radio :model-value="controlledRadio" @change="setControlledRadio" value="controlled2" label="受控模式 - @change" />
      <p>当前值: {{ controlledRadio }}</p>
      <vk-button-group>
        <vk-button @click="setControlledRadio('controlled1')">选择选项1</vk-button>
        <vk-button @click="setControlledRadio('controlled2')">选择选项2</vk-button>
        <vk-button @click="setControlledRadio('')">清空选择</vk-button>
      </vk-button-group>
    </div>
    <div>
      <vk-radio :model-value="controlledRadio1" @update:modelValue="setControlledRadio1" value="update1" label="受控模式 - @update:modelValue" />
      <vk-radio :model-value="controlledRadio1" @update:modelValue="setControlledRadio1" value="update2" label="受控模式 - @update:modelValue" />
      <p>当前值: {{ controlledRadio1 }}</p>
      <vk-button-group>
        <vk-button @click="setControlledRadio1('update1')">选择选项1</vk-button>
        <vk-button @click="setControlledRadio1('update2')">选择选项2</vk-button>
        <vk-button @click="setControlledRadio1('')">清空选择</vk-button>
      </vk-button-group>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <!-- 使用 @change 事件 -->
  <vk-radio
    :model-value="radio1"
    @change="setRadio1"
    value="option1"
    label="选项1"
  />
  <vk-radio
    :model-value="radio1"
    @change="setRadio1"
    value="option2"
    label="选项2"
  />

  <!-- 使用 @update:modelValue 事件 -->
  <vk-radio
    :model-value="radio2"
    @update:modelValue="setRadio2"
    value="option1"
    label="选项1"
  />
  <vk-radio
    :model-value="radio2"
    @update:modelValue="setRadio2"
    value="option2"
    label="选项2"
  />
</template>

<script setup>
import { ref } from "vue";

const radio1 = ref("option1");
const radio2 = ref("option1");

const setRadio1 = value => {
  radio1.value = value;
};

const setRadio2 = value => {
  radio2.value = value;
};
</script>
```

  </template>
</Demo>

## 禁用状态

单选框不可用的状态。

<Demo>
  <vk-radio v-model="radio2" value="disabled" label="禁用" disabled />
  <vk-radio v-model="radio2" value="selected" label="选中且禁用" disabled />
  
  <template #code>

```vue
<template>
  <vk-radio v-model="radio1" value="disabled" label="禁用" disabled />
  <vk-radio v-model="radio2" value="selected" label="选中且禁用" disabled />
</template>

<script setup>
import { ref } from "vue";

const radio1 = ref("");
const radio2 = ref("selected");
</script>
```

  </template>
</Demo>

## 单选框组

适用于在多个互斥的选项中选择的场景。

<Demo>
  <vk-radio-group v-model="radio3">
    <vk-radio value="shanghai" label="上海" />
    <vk-radio value="beijing" label="北京" />
    <vk-radio value="guangzhou" label="广州" />
    <vk-radio value="shenzhen" label="深圳" />
  </vk-radio-group>
  
  <template #code>

```vue
<template>
  <vk-radio-group v-model="radio">
    <vk-radio value="shanghai" label="上海" />
    <vk-radio value="beijing" label="北京" />
    <vk-radio value="guangzhou" label="广州" />
    <vk-radio value="shenzhen" label="深圳" />
  </vk-radio-group>
</template>

<script setup>
import { ref } from "vue";

const radio = ref("shanghai");
</script>
```

  </template>
</Demo>

## 尺寸

使用 `size` 属性改变单选框大小。

<Demo>
  <div style="width: 100%; display: flex; ">
  <div style="margin-right: 16px;">
    <vk-radio-group v-model="radio4" size="small">
      <vk-radio value="small1" label="小尺寸" />
      <vk-radio value="small2" label="小尺寸" />
    </vk-radio-group>
  </div>
  
  <div style="margin-right: 16px;">
    <vk-radio-group v-model="radio5">
      <vk-radio value="medium1" label="默认尺寸" />
      <vk-radio value="medium2" label="默认尺寸" />
    </vk-radio-group>
  </div>
  
  <div>
    <vk-radio-group v-model="radio6" size="large">
      <vk-radio value="large1" label="大尺寸" />
      <vk-radio value="large2" label="大尺寸" />
    </vk-radio-group>
  </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 100%; display: flex;">
    <div style="margin-right: 16px;">
      <vk-radio-group v-model="radio4" size="small">
        <vk-radio value="small1" label="小尺寸" />
        <vk-radio value="small2" label="小尺寸" />
      </vk-radio-group>
    </div>

    <div style="margin-right: 16px;">
      <vk-radio-group v-model="radio5">
        <vk-radio value="medium1" label="默认尺寸" />
        <vk-radio value="medium2" label="默认尺寸" />
      </vk-radio-group>
    </div>

    <div style="margin-bottom: 16px;">
      <vk-radio-group v-model="radio6" size="large">
        <vk-radio value="large1" label="大尺寸" />
        <vk-radio value="large2" label="大尺寸" />
      </vk-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const radio1 = ref("small1");
const radio2 = ref("medium1");
const radio3 = ref("large1");
</script>
```

  </template>
</Demo>

## API

### Radio Props

| 名称        | 类型                             | 默认值     | 说明           |
| ----------- | -------------------------------- | ---------- | -------------- |
| modelValue  | `string \| number \| boolean`    | —          | 绑定值         |
| size        | `'small' \| 'medium' \| 'large'` | `'medium'` | 单选框大小     |
| disabled    | `boolean`                        | `false`    | 是否禁用       |
| value       | `string \| number \| boolean`    | —          | 单选框对应的值 |
| label       | `string`                         | —          | 单选框的文本   |
| customClass | `string`                         | —          | 自定义类名     |
| customStyle | `string \| object`               | —          | 自定义样式     |

### RadioGroup Props

| 名称        | 类型                             | 默认值     | 说明         |
| ----------- | -------------------------------- | ---------- | ------------ |
| modelValue  | `string \| number \| boolean`    | —          | 绑定值       |
| size        | `'small' \| 'medium' \| 'large'` | `'medium'` | 单选框组大小 |
| disabled    | `boolean`                        | `false`    | 是否禁用     |
| customClass | `string`                         | —          | 自定义类名   |
| customStyle | `string \| object`               | —          | 自定义样式   |

### Radio Events

| 名称   | 参数                                           | 说明               |
| ------ | ---------------------------------------------- | ------------------ |
| change | `(value: string \| number \| boolean) => void` | 当绑定值变化时触发 |

### RadioGroup Events

| 名称   | 参数                                           | 说明               |
| ------ | ---------------------------------------------- | ------------------ |
| change | `(value: string \| number \| boolean) => void` | 当绑定值变化时触发 |

### Radio Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 单选框的文本 |

### RadioGroup Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 单选框组的内容 |

### Radio Methods

| 名称  | 说明             |
| ----- | ---------------- |
| focus | 使单选框获取焦点 |
| blur  | 使单选框失去焦点 |

<script setup>
import { ref } from 'vue'

const radio1 = ref('1')
const uncontrolledRadio = ref('option1')
const controlledRadio = ref('controlled1')
const controlledRadio1 = ref('update1')
const radio2 = ref('selected')
const radio3 = ref('shanghai')
const radio4 = ref('small1')
const radio5 = ref('medium1')
const radio6 = ref('large1')

const setControlledRadio = (value) => {
  controlledRadio.value = value
}

const setControlledRadio1 = (value) => {
  controlledRadio1.value = value
}
</script>
