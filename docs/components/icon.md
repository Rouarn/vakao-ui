# Icon 图标

用于显示图标的组件，支持自定义图片和内置图标库。

## 基础用法

使用 `name` 属性指定内置图标名称。

<Demo>
  <vk-icon name="Home" />
  <vk-icon name="Heart" class="ml-2" />
  <vk-icon name="Star" class="ml-2" />
  <vk-icon name="Settings" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-icon name="Home" />
  <vk-icon name="Heart" class="ml-2" />
  <vk-icon name="Star" class="ml-2" />
  <vk-icon name="Settings" class="ml-2" />
</template>
```

  </template>
</Demo>

## 自定义图片

使用 `src` 属性指定图片地址。

<Demo>
  <vk-icon src="https://via.placeholder.com/24x24/007bff/ffffff?text=A" />
  <vk-icon src="https://via.placeholder.com/24x24/28a745/ffffff?text=B" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-icon src="https://via.placeholder.com/24x24/007bff/ffffff?text=A" />
  <vk-icon src="https://via.placeholder.com/24x24/28a745/ffffff?text=B" class="ml-2" />
</template>
```

  </template>
</Demo>

## 尺寸

使用 `size` 属性设置图标大小。

<Demo>
  <vk-icon name="Home" size="14px" />
  <vk-icon name="Home" size="18px" class="ml-2" />
  <vk-icon name="Home" size="24px" class="ml-2" />
  <vk-icon name="Home" size="32px" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-icon name="Home" size="14px" />
  <vk-icon name="Home" size="18px" class="ml-2" />
  <vk-icon name="Home" size="24px" class="ml-2" />
  <vk-icon name="Home" size="32px" class="ml-2" />
</template>
```

  </template>
</Demo>

## 颜色

使用 `color` 属性设置图标颜色。

<Demo>
  <vk-icon name="Heart" color="red" />
  <vk-icon name="Star" color="#ffd700" class="ml-2" />
  <vk-icon name="Settings" color="#007bff" class="ml-2" />
  
  <template #code>

```vue
<template>
  <vk-icon name="Heart" color="red" />
  <vk-icon name="Star" color="#ffd700" class="ml-2" />
  <vk-icon name="Settings" color="#007bff" class="ml-2" />
</template>
```

  </template>
</Demo>

## 插槽内容

当没有指定 `name` 或 `src` 时，可以使用插槽自定义内容。

<Demo>
  <vk-icon size="24px">
    <span style="color: #007bff;">📱</span>
  </vk-icon>
  <vk-icon size="24px" class="ml-2">
    <span style="color: #28a745;">🎉</span>
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
</template>
```

  </template>
</Demo>

<script setup>
import { ref } from 'vue'
</script>

## API

### Icon Props

| 名称        | 类型                              | 默认值        | 说明                                    |
| ----------- | --------------------------------- | ------------- | --------------------------------------- |
| name        | `string`                          | —             | 图标名称（来自 @vicons/ionicons5）     |
| src         | `string`                          | —             | 自定义图标 URL 或路径                   |
| size        | `string \| number`                | `'1em'`       | 图标大小                                |
| color       | `string`                          | `'currentColor'` | 图标颜色                             |
| customClass | `string`                          | —             | 自定义类名                              |
| customStyle | `string \| object`                | —             | 自定义样式                              |

### Icon Slots

| 名称    | 说明                                          |
| ------- | --------------------------------------------- |
| default | 自定义图标内容，当没有指定 name 或 src 时显示 |