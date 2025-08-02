# Avatar 头像

头像组件用于展示用户或事物的头像，支持图片、图标和文字三种显示方式。

## 基础用法

头像的基础用法，支持图片、图标和文字三种显示方式。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <vk-avatar icon="user" />
    <vk-avatar>U</vk-avatar>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <!-- 图片头像 -->
    <vk-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    
    <!-- 图标头像 -->
    <vk-avatar icon="user" />
    
    <!-- 文字头像 -->
    <vk-avatar>U</vk-avatar>
  </div>
</template>
```

  </template>
</Demo>

## 尺寸

头像支持多种尺寸，包括预设尺寸和自定义数值。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar size="small" icon="user" />
    <vk-avatar size="default" icon="user" />
    <vk-avatar size="large" icon="user" />
    <vk-avatar :size="64" icon="user" />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar size="small" icon="user" />
    <vk-avatar size="default" icon="user" />
    <vk-avatar size="large" icon="user" />
    <vk-avatar :size="64" icon="user" />
  </div>
</template>
```

  </template>
</Demo>

## 形状

头像支持圆形和方形两种形状。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar shape="circle" icon="user" />
    <vk-avatar shape="square" icon="user" />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar shape="circle" icon="user" />
    <vk-avatar shape="square" icon="user" />
  </div>
</template>
```

  </template>
</Demo>

## 图片适应

当使用图片头像时，可以设置图片的适应方式。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="fill" />
    <vk-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="contain" />
    <vk-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="cover" />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar src="/path/to/image.jpg" fit="fill" />
    <vk-avatar src="/path/to/image.jpg" fit="contain" />
    <vk-avatar src="/path/to/image.jpg" fit="cover" />
  </div>
</template>
```

  </template>
</Demo>

## 自定义颜色

可以自定义头像的背景色、文字颜色和图标颜色。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar background-color="#6554C0" color="#ffffff">V</vk-avatar>
    <vk-avatar background-color="#52c41a" icon="user" icon-color="#ffffff" />
    <vk-avatar background-color="#ff4d4f" color="#ffffff">K</vk-avatar>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar background-color="#6554C0" color="#ffffff">V</vk-avatar>
    <vk-avatar background-color="#52c41a" icon="user" icon-color="#ffffff" />
    <vk-avatar background-color="#ff4d4f" color="#ffffff">K</vk-avatar>
  </div>
</template>
```

  </template>
</Demo>

## 图片加载失败

当图片加载失败时，可以显示回退内容。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar src="invalid-url.jpg" fallback="失败" />
    <vk-avatar src="invalid-url.jpg" icon="user" />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-avatar src="invalid-url.jpg" fallback="失败" />
    <vk-avatar src="invalid-url.jpg" icon="user" />
  </div>
</template>
```

  </template>
</Demo>

## 可点击

设置 `clickable` 属性使头像可点击。

<Demo>
  <vk-avatar clickable icon="user" @click="handleClick" />
  
  <template #code>

```vue
<template>
  <vk-avatar clickable icon="user" @click="handleClick" />
</template>

<script setup>
const handleClick = () => {
  console.log('头像被点击');
};
</script>
```

  </template>
</Demo>

## API

### Avatar Props

| 名称             | 类型                                    | 默认值      | 说明                                           |
| ---------------- | --------------------------------------- | ----------- | ---------------------------------------------- |
| size             | `'small' \| 'default' \| 'large' \| number` | `'default'` | 头像大小                                       |
| shape            | `'circle' \| 'square'`                  | `'circle'`  | 头像形状                                       |
| src              | `string`                                | —           | 图片地址                                       |
| alt              | `string`                                | —           | 图片替代文本                                   |
| icon             | `string`                                | —           | 图标名称                                       |
| fit              | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'`   | 图片适应方式                                   |
| lazy             | `boolean`                               | `false`     | 是否懒加载图片                                 |
| clickable        | `boolean`                               | `false`     | 是否可点击                                     |
| backgroundColor | `string`                                | —           | 背景颜色                                       |
| color            | `string`                                | —           | 文字颜色                                       |
| iconColor        | `string`                                | —           | 图标颜色                                       |
| iconSize         | `number`                                | —           | 图标大小                                       |
| border           | `string`                                | —           | 边框样式                                       |
| fallback         | `string`                                | —           | 图片加载失败时的回退文本                       |

### Avatar Events

| 事件名 | 说明           | 回调参数        |
| ------ | -------------- | --------------- |
| click  | 点击头像时触发 | `(event: MouseEvent)` |
| error  | 图片加载失败时触发 | `(event: Event)` |
| load   | 图片加载成功时触发 | `(event: Event)` |

### Avatar Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 默认内容 |

<script setup>
const handleClick = () => {
  console.log('头像被点击');
};
</script>