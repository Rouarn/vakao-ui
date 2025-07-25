# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。可以使用 `--vk-switch-on-color` 属性与 `--vk-switch-off-color` 属性来设置开关的背景色。

<Demo>
  <vk-switch v-model="value1" />
  <vk-switch
    v-model="value2"
    class="ml-2"
    style="--vk-switch-on-color: #13ce66; --vk-switch-off-color: #ff4949"
  />
  
  <template #code>

```vue
<template>
  <vk-switch v-model="value1" />
  <vk-switch
    v-model="value2"
    class="ml-2"
    style="--vk-switch-on-color: #13ce66; --vk-switch-off-color: #ff4949"
  />
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(true);
const value2 = ref(true);
</script>
```

  </template>
</Demo>

## 尺寸

使用 `size` 属性改变开关大小。

<Demo>
  <vk-switch v-model="value3" size="large" />
  <vk-switch v-model="value4" class="ml-2" />
  <vk-switch v-model="value5" size="small" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-switch v-model="value1" size="large" />
  <vk-switch v-model="value2" class="ml-2" />
  <vk-switch v-model="value3" size="small" class="ml-2" />
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
</script>
```

  </template>
</Demo>

## 文字描述

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。使用 `inline-prompt` 属性来控制文本是否显示在点内。

<Demo>
  <vk-switch
    v-model="value6"
    class="mb-2"
    active-text="按月支付"
    inactive-text="按年支付"
  />
  <br />
  <vk-switch
    v-model="value7"
    class="mb-2"
    style="--vk-switch-on-color: #13ce66; --vk-switch-off-color: #ff4949"
    active-text="按月支付"
    inactive-text="按年支付"
  />
  <br />
  <vk-switch
    v-model="value8"
    inline-prompt
    active-text="Y"
    inactive-text="N"
  />
  <vk-switch
    v-model="value9"
    class="ml-2"
    inline-prompt
    style="--vk-switch-on-color: #13ce66; --vk-switch-off-color: #ff4949"
    active-text="是"
    inactive-text="否"
  />
  
  <template #code>

```vue
<template>
  <vk-switch
    v-model="value1"
    class="mb-2"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <vk-switch
    v-model="value2"
    class="mb-2"
    style="--vk-switch-on-color: #13ce66; --vk-switch-off-color: #ff4949"
    active-text="Pay by month"
    inactive-text="Pay by year"
  />
  <br />
  <vk-switch v-model="value3" inline-prompt active-text="Y" inactive-text="N" />
  <vk-switch
    v-model="value4"
    class="ml-2"
    inline-prompt
    style="--vk-switch-on-color: #13ce66; --vk-switch-off-color: #ff4949"
    active-text="是"
    inactive-text="否"
  />
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
const value4 = ref(true);
</script>
```

  </template>
</Demo>

## 显示自定义图标

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。使用 `inline-prompt` 属性来控制图标显示在点内。

<Demo>
  <vk-switch v-model="value10" active-icon="mdi:check" inactive-icon="mdi:close" />
  <br />
  <vk-switch
    v-model="value11"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    active-icon="mdi:check"
    inactive-icon="mdi:close"
  />
  
  <template #code>

```vue
<template>
  <vk-switch
    v-model="value1"
    active-icon="mdi:check"
    inactive-icon="mdi:close"
  />
  <br />
  <vk-switch
    v-model="value2"
    class="mt-2"
    style="margin-left: 24px"
    inline-prompt
    active-icon="mdi:check"
    inactive-icon="mdi:close"
  />
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(true);
const value2 = ref(true);
</script>
```

  </template>
</Demo>

## 扩展的 value 类型

设置 `active-value` 和 `inactive-value` 属性，接受 `Boolean`、`String` 或 `Number` 类型的值。

<Demo>
  <vk-switch
    v-model="value12"
    active-value="100"
    inactive-value="0"
  />
  
  <template #code>

```vue
<template>
  <vk-switch v-model="value" active-value="100" inactive-value="0" />
</template>

<script setup>
import { ref } from "vue";

const value = ref("100");
</script>
```

  </template>
</Demo>

## 禁用状态

设置 `disabled` 属性，接受一个 `Boolean`，设置 `true` 即可禁用。

<Demo>
  <vk-switch v-model="value13" disabled />
  <vk-switch v-model="value14" class="ml-2" disabled />
  
  <template #code>

```vue
<template>
  <vk-switch v-model="value1" disabled />
  <vk-switch v-model="value2" class="ml-2" disabled />
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(true);
const value2 = ref(false);
</script>
```

  </template>
</Demo>

## 加载状态

设置 `loading` 属性，接受一个 `Boolean`，设置 `true` 即可加载中状态。

<Demo>
  <vk-switch v-model="value15" loading />
  <vk-switch v-model="value16" class="ml-2" loading />
  
  <template #code>

```vue
<template>
  <vk-switch v-model="value1" loading />
  <vk-switch v-model="value2" class="ml-2" loading />
</template>

<script setup>
import { ref } from "vue";

const value1 = ref(true);
const value2 = ref(false);
</script>
```

  </template>
</Demo>

## 阻止切换

设置 `beforeChange` 属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。

<Demo>
  <vk-switch
    v-model="value17"
    :before-change="beforeChange"
  />
  
  <template #code>

```vue
<template>
  <vk-switch v-model="value" :before-change="beforeChange" />
</template>

<script setup>
import { ref } from "vue";
import { VkMessageBox } from '@vakao-ui/components'

const value = ref(false);

const beforeChange = () => {
  return VkMessageBox.confirm("切换到新的值，是否继续？", "警告", {
    confirmText: "确定",
    cancelText: "取消",
    type: "warning",
  })
};
</script>
```

  </template>
</Demo>

## API

### Switch Props

| 名称          | 类型                                | 默认值     | 说明                                                                        |
| ------------- | ----------------------------------- | ---------- | --------------------------------------------------------------------------- |
| size          | `'small' \| 'medium' \| 'large'`    | `'medium'` | 开关大小                                                                    |
| disabled      | `boolean`                           | `false`    | 是否禁用                                                                    |
| loading       | `boolean`                           | `false`    | 是否显示加载中                                                              |
| activeValue   | `boolean \| string \| number`       | `true`     | switch 打开时的值                                                           |
| inactiveValue | `boolean \| string \| number`       | `false`    | switch 关闭时的值                                                           |
| activeText    | `string`                            | —          | switch 打开时的文字描述                                                     |
| inactiveText  | `string`                            | —          | switch 关闭时的文字描述                                                     |
| activeIcon    | `string`                            | —          | switch 打开时所显示图标，支持 Iconify 图标名称（如 `mdi:check`）、图片 URL 或本地图片路径，设置此项会忽略 `active-text`                       |
| inactiveIcon  | `string`                            | —          | switch 关闭时所显示图标，支持 Iconify 图标名称（如 `mdi:close`）、图片 URL 或本地图片路径，设置此项会忽略 `inactive-text`                     |
| inlinePrompt  | `boolean`                           | `false`    | 无论图标或文本是否显示在点内，只会呈现文本的第一个字符                      |
| beforeChange  | `() => boolean \| Promise<boolean>` | —          | switch 状态改变前的钩子，返回 false 或者返回 Promise 且被 reject 则停止切换 |
| customClass   | `string`                            | —          | 自定义类名                                                                  |
| customStyle   | `string \| object`                  | —          | 自定义样式                                                                  |

### Switch Events

| 名称   | 参数                           | 说明               |
| ------ | ------------------------------ | ------------------ |
| change | `(value: SwitchValue) => void` | 当绑定值变化时触发 |

### Switch Methods

| 名称  | 说明           |
| ----- | -------------- |
| focus | 使开关获取焦点 |
| blur  | 使开关失去焦点 |

<script setup>
import { ref } from 'vue'
import { VkMessageBox } from '@vakao-ui/components'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
const value4 = ref(true)
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref(true)
const value8 = ref(true)
const value9 = ref(true)
const value10 = ref(true)
const value11 = ref(true)
const value12 = ref('100')
const value13 = ref(true)
const value14 = ref(false)
const value15 = ref(true)
const value16 = ref(false)
const value17 = ref(false)

const beforeChange = () => {
  return VkMessageBox.confirm("切换到新的值，是否继续？", "警告", {
    confirmText: "确定",
    cancelText: "取消",
    type: "warning",
  })
}
</script>
