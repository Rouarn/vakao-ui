# Icon 图标

用于显示图标的组件，支持自定义图片和 Iconify 图标库。

## 基础用法

<Demo>
  <vk-icon>
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon class="ml-2">
    <Icon icon="mdi:heart" />
  </vk-icon>
  <vk-icon class="ml-2">
    <Icon icon="mdi:star" />
  </vk-icon>
  <vk-icon class="ml-2">
    <Icon icon="mdi:cog" />
  </vk-icon>

<template #code>

```vue
<template>
  <vk-icon>
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon class="ml-2">
    <Icon icon="mdi:heart" />
  </vk-icon>
  <vk-icon class="ml-2">
    <Icon icon="mdi:star" />
  </vk-icon>
  <vk-icon class="ml-2">
    <Icon icon="mdi:cog" />
  </vk-icon>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
```

  </template>
</Demo>

## 自定义图片

使用 `src` 属性指定图片地址。

<Demo>
  <vk-icon src="https://api.iconify.design/simple-icons/gitee.svg" />
  <vk-icon src="https://api.iconify.design/simple-icons/github.svg" />
  
  <template #code>

```vue
<template>
  <vk-icon src="https://api.iconify.design/simple-icons/gitee.svg" />
  <vk-icon src="https://api.iconify.design/simple-icons/github.svg" />
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
```

  </template>
</Demo>

## 尺寸

使用 `size` 属性设置图标大小。

<Demo>
  <vk-icon size="14px">
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon size="18px" class="ml-2">
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon size="32px" class="ml-2">
    <Icon icon="mdi:home" />
  </vk-icon>
  
  <template #code>

```vue
<template>
  <vk-icon size="14px">
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon size="18px" class="ml-2">
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <Icon icon="mdi:home" />
  </vk-icon>
  <vk-icon size="32px" class="ml-2">
    <Icon icon="mdi:home" />
  </vk-icon>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
```

  </template>
</Demo>

## 颜色

使用 `color` 属性设置图标颜色。

<Demo>
  <vk-icon color="red">
    <Icon icon="mdi:heart" />
  </vk-icon>
  <vk-icon color="#ffd700" class="ml-2">
    <Icon icon="mdi:star" />
  </vk-icon>
  <vk-icon color="#007bff" class="ml-2">
    <Icon icon="mdi:cog" />
  </vk-icon>
  
  <template #code>

```vue
<template>
  <vk-icon color="red">
    <Icon icon="mdi:heart" />
  </vk-icon>
  <vk-icon color="#ffd700" class="ml-2">
    <Icon icon="mdi:star" />
  </vk-icon>
  <vk-icon color="#007bff" class="ml-2">
    <Icon icon="mdi:cog" />
  </vk-icon>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
-
```

  </template>
</Demo>

## 插槽内容

当没有指定 `src` 时，可以使用插槽自定义内容。支持 Iconify 图标组件和普通模板内容。

<Demo>
  <vk-icon size="24px">
    <span style="color: #007bff;">📱</span>
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <span style="color: #28a745;">🎉</span>
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <Icon icon="mdi:vuejs" />
  </vk-icon>
  
  <template #code>

```vue
<template>
  <vk-icon size="24px">
    <span style="color: #007bff;">📱</span>
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <span style="color: #28a745;">🎉</span>
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <Icon icon="mdi:vuejs" />
  </vk-icon>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
```

  </template>
</Demo>

## API

### Icon Props

| 名称        | 类型               | 默认值           | 说明                  |
| ----------- | ------------------ | ---------------- | --------------------- |
| src         | `string`           | —                | 自定义图标 URL 或路径 |
| size        | `string \| number` | `'1em'`          | 图标大小              |
| color       | `string`           | `'currentColor'` | 图标颜色              |
| customClass | `string`           | —                | 自定义类名            |
| customStyle | `string \| object` | —                | 自定义样式            |

### Icon Slots

| 名称    | 说明                                                |
| ------- | --------------------------------------------------- |
| default | 自定义图标内容，支持 Iconify 图标组件和普通模板内容 |

<script setup>
import { Icon } from '@iconify/vue';
</script>
