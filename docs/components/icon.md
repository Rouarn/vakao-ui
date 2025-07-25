# Icon 图标

用于显示图标的组件，支持自定义图片和 Iconify 图标库。

:::tip 推荐使用方式
推荐直接使用 `icon` 属性传入 Iconify 图标名称，这是最简单和高效的使用方式。
:::

## 基础用法

### 使用 icon 属性

直接通过 `icon` 属性传入 Iconify 图标名称，这是最简单的使用方式。

<Demo>
  <vk-icon icon="mdi:home" />
  <vk-icon icon="mdi:heart" class="ml-2" />
  <vk-icon icon="mdi:star" class="ml-2" />
  <vk-icon icon="mdi:cog" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-icon icon="mdi:home" />
  <vk-icon icon="mdi:heart" class="ml-2" />
  <vk-icon icon="mdi:star" class="ml-2" />
  <vk-icon icon="mdi:cog" class="ml-2" />
</template>
```

  </template>
</Demo>

### 使用 Iconify 图标组件

也可以通过插槽使用 Iconify 图标组件，适合需要更多控制的场景。

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
  <vk-icon icon="mdi:home" size="14px" />
  <vk-icon icon="mdi:home" size="18px" class="ml-2" />
  <vk-icon icon="mdi:home" size="24px" class="ml-2" />
  <vk-icon icon="mdi:home" size="32px" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-icon icon="mdi:home" size="14px" />
  <vk-icon icon="mdi:home" size="18px" class="ml-2" />
  <vk-icon icon="mdi:home" size="24px" class="ml-2" />
  <vk-icon icon="mdi:home" size="32px" class="ml-2" />
</template>
```

  </template>
</Demo>

## 颜色

使用 `color` 属性设置图标颜色。

<Demo>
  <vk-icon icon="mdi:heart" color="red" />
  <vk-icon icon="mdi:star" color="#ffd700" class="ml-2" />
  <vk-icon icon="mdi:cog" color="#007bff" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-icon icon="mdi:heart" color="red" />
  <vk-icon icon="mdi:star" color="#ffd700" class="ml-2" />
  <vk-icon icon="mdi:cog" color="#007bff" class="ml-2" />
</template>
```

  </template>
</Demo>

## 插槽内容

当没有指定 `icon` 或 `src` 时，可以使用插槽自定义内容。推荐使用 emoji 或其他文本内容，而不是 Iconify 组件。

<Demo>
  <vk-icon size="24px">
    <span style="color: #007bff;">📱</span>
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <span style="color: #28a745;">🎉</span>
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <span style="color: #ff6b6b;">❤️</span>
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
    <span style="color: #ff6b6b;">❤️</span>
  </vk-icon>
</template>
```

  </template>
</Demo>

## API

### Icon Props

| 名称        | 类型               | 默认值           | 说明                  |
| ----------- | ------------------ | ---------------- | --------------------- |
| icon        | `string`           | —                | Iconify 图标名称      |
| src         | `string`           | —                | 自定义图标 URL 或路径 |
| size        | `string \| number` | `'1em'`          | 图标大小              |
| color       | `string`           | `'currentColor'` | 图标颜色              |
| customClass | `string`           | —                | 自定义类名            |
| customStyle | `string \| object` | —                | 自定义样式            |

### Icon Slots

| 名称    | 说明                                                               |
| ------- | ------------------------------------------------------------------ |
| default | 自定义图标内容，推荐使用 emoji 或其他文本内容，而不是 Iconify 组件 |

<script setup>
import { Icon } from '@iconify/vue';
</script>
