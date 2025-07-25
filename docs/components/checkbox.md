# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

<Demo>
  <vk-checkbox v-model="checked1" label="备选项" />
  
  <template #code>

```vue
<template>
  <vk-checkbox v-model="checked" label="备选项" />
</template>

<script setup>
import { ref } from "vue";

const checked = ref(false);
</script>
```

  </template>
</Demo>

## 禁用状态

多选框不可用状态。

<Demo>
  <vk-checkbox v-model="checked2" disabled label="禁用状态" />
  <vk-checkbox v-model="checked3" disabled label="禁用且选中" />
  
  <template #code>

```vue
<template>
  <vk-checkbox v-model="checked1" disabled label="禁用状态" />
  <vk-checkbox v-model="checked2" disabled label="禁用且选中" />
</template>

<script setup>
import { ref } from "vue";

const checked1 = ref(false);
const checked2 = ref(true);
</script>
```

  </template>
</Demo>

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

<Demo>
  <vk-checkbox-group v-model="checkList1">
    <vk-checkbox label="复选框 A" value="A" />
    <vk-checkbox label="复选框 B" value="B" />
    <vk-checkbox label="复选框 C" value="C" />
    <vk-checkbox label="禁用" value="disabled" disabled />
    <vk-checkbox label="选中且禁用" value="selected" disabled />
  </vk-checkbox-group>
  
  <template #code>

```vue
<template>
  <vk-checkbox-group v-model="checkList">
    <vk-checkbox label="复选框 A" value="A" />
    <vk-checkbox label="复选框 B" value="B" />
    <vk-checkbox label="复选框 C" value="C" />
    <vk-checkbox label="禁用" value="disabled" disabled />
    <vk-checkbox label="选中且禁用" value="selected" disabled />
  </vk-checkbox-group>
</template>

<script setup>
import { ref } from "vue";

const checkList = ref(["selected"]);
</script>
```

  </template>
</Demo>

## 不确定状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

<Demo>
  <vk-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </vk-checkbox>
  <div style="margin: 15px 0;"></div>
  <vk-checkbox-group
    v-model="checkedCities"
    @change="handleCheckedCitiesChange"
  >
    <vk-checkbox v-for="city in cities" :key="city" :label="city" :value="city" />
  </vk-checkbox-group>
  
  <template #code>

```vue
<template>
  <vk-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
    全选
  </vk-checkbox>
  <div style="margin: 15px 0;"></div>
  <vk-checkbox-group
    v-model="checkedCities"
    @change="handleCheckedCitiesChange"
  >
    <vk-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
      :value="city"
    />
  </vk-checkbox-group>
</template>

<script setup>
import { ref, computed } from "vue";

const checkAll = ref(false);
const checkedCities = ref(["上海", "北京"]);
const cities = ["上海", "北京", "广州", "深圳"];

const isIndeterminate = computed(() => {
  const checkedCount = checkedCities.value.length;
  return checkedCount > 0 && checkedCount < cities.length;
});

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cities : [];
};

const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
};
</script>
```

  </template>
</Demo>

## 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

<Demo>
  <vk-checkbox-group v-model="checkedCities2" :min="1" :max="2">
    <vk-checkbox v-for="city in cities" :key="city" :label="city" :value="city" />
  </vk-checkbox-group>
  
  <template #code>

```vue
<template>
  <vk-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <vk-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
      :value="city"
    />
  </vk-checkbox-group>
</template>

<script setup>
import { ref } from "vue";

const checkedCities = ref(["上海", "北京"]);
const cities = ["上海", "北京", "广州", "深圳"];
</script>
```

  </template>
</Demo>

## 尺寸

使用 `size` 属性改变多选框大小。

<Demo>
  <vk-checkbox-group v-model="checkList2" size="small">
    <vk-checkbox label="小尺寸" value="small" />
    <vk-checkbox label="小尺寸" value="small2" />
  </vk-checkbox-group>
  
  <vk-checkbox-group v-model="checkList3">
    <vk-checkbox label="默认尺寸" value="medium" />
    <vk-checkbox label="默认尺寸" value="medium2" />
  </vk-checkbox-group>
  
  <vk-checkbox-group v-model="checkList4" size="large">
    <vk-checkbox label="大尺寸" value="large" />
    <vk-checkbox label="大尺寸" value="large2" />
  </vk-checkbox-group>
  
  <template #code>

```vue
<template>
  <vk-checkbox-group v-model="checkList1" size="small">
    <vk-checkbox label="小尺寸" value="small" />
    <vk-checkbox label="小尺寸" value="small2" />
  </vk-checkbox-group>

  <vk-checkbox-group v-model="checkList2">
    <vk-checkbox label="默认尺寸" value="medium" />
    <vk-checkbox label="默认尺寸" value="medium2" />
  </vk-checkbox-group>

  <vk-checkbox-group v-model="checkList3" size="large">
    <vk-checkbox label="大尺寸" value="large" />
    <vk-checkbox label="大尺寸" value="large2" />
  </vk-checkbox-group>
</template>

<script setup>
import { ref } from "vue";

const checkList1 = ref([]);
const checkList2 = ref([]);
const checkList3 = ref([]);
</script>
```

  </template>
</Demo>

## API

### Checkbox Props

| 名称          | 类型                             | 默认值     | 说明                                     |
| ------------- | -------------------------------- | ---------- | ---------------------------------------- |
| size          | `'small' \| 'medium' \| 'large'` | `'medium'` | 多选框大小                               |
| disabled      | `boolean`                        | `false`    | 是否禁用                                 |
| value         | `string \| number \| boolean`    | —          | 选中状态的值（在 checkbox-group 下有效） |
| label         | `string`                         | —          | 多选框的文本                             |
| indeterminate | `boolean`                        | `false`    | 设置不确定状态，仅负责样式控制           |
| checked       | `boolean`                        | `false`    | 当前是否勾选                             |
| customClass   | `string`                         | —          | 自定义类名                               |
| customStyle   | `string \| object`               | —          | 自定义样式                               |

### CheckboxGroup Props

| 名称        | 类型                             | 默认值     | 说明                           |
| ----------- | -------------------------------- | ---------- | ------------------------------ |
| size        | `'small' \| 'medium' \| 'large'` | `'medium'` | 多选框组大小                   |
| disabled    | `boolean`                        | `false`    | 是否禁用                       |
| min         | `number`                         | —          | 可被勾选的 checkbox 的最小数量 |
| max         | `number`                         | —          | 可被勾选的 checkbox 的最大数量 |
| customClass | `string`                         | —          | 自定义类名                     |
| customStyle | `string \| object`               | —          | 自定义样式                     |

### Checkbox Events

| 名称   | 参数                       | 说明               |
| ------ | -------------------------- | ------------------ |
| change | `(value: boolean) => void` | 当绑定值变化时触发 |

### CheckboxGroup Events

| 名称   | 参数                               | 说明               |
| ------ | ---------------------------------- | ------------------ |
| change | `(value: CheckboxValue[]) => void` | 当绑定值变化时触发 |

### Checkbox Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 多选框的文本 |

### CheckboxGroup Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 多选框组的内容 |

### Checkbox Methods

| 名称  | 说明             |
| ----- | ---------------- |
| focus | 使多选框获取焦点 |
| blur  | 使多选框失去焦点 |

<script setup>
import { ref, computed } from 'vue'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
const checkList1 = ref(['selected'])
const checkList2 = ref([])
const checkList3 = ref([])
const checkList4 = ref([])

const checkAll = ref(false)
const checkedCities = ref(['上海', '北京'])
const checkedCities2 = ref(['上海', '北京'])
const cities = ['上海', '北京', '广州', '深圳']

const isIndeterminate = computed(() => {
  const checkedCount = checkedCities.value.length
  return checkedCount > 0 && checkedCount < cities.length
})

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cities : []
}

const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
}
</script>
