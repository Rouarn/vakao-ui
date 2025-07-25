# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

基本的输入框用法。

<Demo>
  <vk-input v-model="value1" placeholder="请输入内容" />
  
  <template #code>

```vue
<template>
  <vk-input v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件。

<Demo>
  <vk-input v-model="value2" disabled placeholder="禁用状态" />
  
  <template #code>

```vue
<template>
  <vk-input v-model="value" disabled placeholder="禁用状态" />
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 一键清空

使用 `clearable` 属性即可得到一个可清空的输入框。

<Demo>
  <vk-input v-model="value3" clearable placeholder="可清空" />
  
  <template #code>

```vue
<template>
  <vk-input v-model="value" clearable placeholder="可清空" />
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 密码框

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框。

<Demo>
  <vk-input v-model="value4" type="password" show-password placeholder="请输入密码" />
  
  <template #code>

```vue
<template>
  <vk-input
    v-model="value"
    type="password"
    show-password
    placeholder="请输入密码"
  />
</template>

<script setup>
import { ref } from "vue";

const value = ref("");
</script>
```

  </template>
</Demo>

## 带图标的输入框

可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标。

<Demo>
  <vk-input v-model="value5" prefix-icon="mdi:magnify" placeholder="请输入搜索内容" />
  <vk-input v-model="value6" suffix-icon="mdi:calendar" placeholder="请选择日期" />
  
  <template #code>

```vue
<template>
  <vk-input
    v-model="value1"
    prefix-icon="mdi:magnify"
    placeholder="请输入搜索内容"
  />
  <vk-input
    v-model="value2"
    suffix-icon="mdi:calendar"
    placeholder="请选择日期"
  />
</template>

<script setup>
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
</script>
```

  </template>
</Demo>

## 尺寸

使用 `size` 属性改变输入框大小。除了默认大小外，还有另外两个选项：`small`、`large`。

<Demo>
  <vk-input v-model="value7" size="small" placeholder="小尺寸" />
  <vk-input v-model="value8" placeholder="默认尺寸" />
  <vk-input v-model="value9" size="large" placeholder="大尺寸" />
  
  <template #code>

```vue
<template>
  <vk-input v-model="value1" size="small" placeholder="小尺寸" />
  <vk-input v-model="value2" placeholder="默认尺寸" />
  <vk-input v-model="value3" size="large" placeholder="大尺寸" />
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

## 复合型输入框

可前置或后置元素，一般为标签或按钮。

<Demo>
  <vk-input v-model="value10" placeholder="请输入内容">
    <template #prefix>
      <span>Http://</span>
    </template>
  </vk-input>
  
  <vk-input v-model="value11" placeholder="请输入内容">
    <template #suffix>
      <span>.com</span>
    </template>
  </vk-input>
  
  <template #code>

```vue
<template>
  <vk-input v-model="value1" placeholder="请输入内容">
    <template #prefix>
      <span>Http://</span>
    </template>
  </vk-input>

  <vk-input v-model="value2" placeholder="请输入内容">
    <template #suffix>
      <span>.com</span>
    </template>
  </vk-input>
</template>

<script setup>
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
</script>
```

  </template>
</Demo>

## API

### Props

| 名称         | 类型                                                            | 默认值        | 说明                 |
| ------------ | --------------------------------------------------------------- | ------------- | -------------------- |
| type         | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'` | `'text'`      | 输入框类型           |
| size         | `'small' \| 'medium' \| 'large'`                                | `'medium'`    | 输入框大小           |
| disabled     | `boolean`                                                       | `false`       | 是否禁用             |
| placeholder  | `string`                                                        | `'请输入...'` | 输入框占位文本       |
| maxlength    | `number \| string`                                              | —             | 最大输入长度         |
| clearable    | `boolean`                                                       | `false`       | 是否可清空           |
| showPassword | `boolean`                                                       | `false`       | 是否显示切换密码图标 |
| prefixIcon   | `string`                                                        | —             | 输入框头部图标，支持 iconify 图标格式（如 `mdi:magnify`）       |
| suffixIcon   | `string`                                                        | —             | 输入框尾部图标，支持 iconify 图标格式（如 `mdi:calendar`）       |
| readonly     | `boolean`                                                       | `false`       | 是否只读             |
| customClass  | `string`                                                        | —             | 自定义类名           |
| customStyle  | `string \| object`                                              | —             | 自定义样式           |
| autofocus    | `boolean`                                                       | `false`       | 是否自动获取焦点     |

### Events

| 名称   | 参数                          | 说明               |
| ------ | ----------------------------- | ------------------ |
| input  | `(value: string) => void`     | 输入时触发         |
| change | `(value: string) => void`     | 值改变时触发       |
| focus  | `(event: FocusEvent) => void` | 获取焦点时触发     |
| blur   | `(event: FocusEvent) => void` | 失去焦点时触发     |
| clear  | `() => void`                  | 点击清空按钮时触发 |

### Slots

| 名称   | 说明           |
| ------ | -------------- |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

### Methods

| 名称  | 说明             |
| ----- | ---------------- |
| focus | 使输入框获取焦点 |
| blur  | 使输入框失去焦点 |

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('')
const value8 = ref('')
const value9 = ref('')
const value10 = ref('')
const value11 = ref('')
</script>
