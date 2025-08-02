# Tag 标签

标签组件用于标记和分类，支持多种颜色、尺寸和样式。

## 基础用法

标签的基础用法，展示不同类型的标签。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag>默认标签</vk-tag>
    <vk-tag type="primary">主要标签</vk-tag>
    <vk-tag type="success">成功标签</vk-tag>
    <vk-tag type="warning">警告标签</vk-tag>
    <vk-tag type="danger">危险标签</vk-tag>
    <vk-tag type="info">信息标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag>默认标签</vk-tag>
    <vk-tag type="primary">主要标签</vk-tag>
    <vk-tag type="success">成功标签</vk-tag>
    <vk-tag type="warning">警告标签</vk-tag>
    <vk-tag type="danger">危险标签</vk-tag>
    <vk-tag type="info">信息标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 可关闭标签

设置 `closable` 属性可以定义一个标签是否可移除。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag closable @close="handleClose">可关闭标签</vk-tag>
    <vk-tag type="primary" closable @close="handleClose">主要标签</vk-tag>
    <vk-tag type="success" closable @close="handleClose">成功标签</vk-tag>
    <vk-tag type="warning" closable @close="handleClose">警告标签</vk-tag>
    <vk-tag type="danger" closable @close="handleClose">危险标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag closable @close="handleClose">可关闭标签</vk-tag>
    <vk-tag type="primary" closable @close="handleClose">主要标签</vk-tag>
    <vk-tag type="success" closable @close="handleClose">成功标签</vk-tag>
    <vk-tag type="warning" closable @close="handleClose">警告标签</vk-tag>
    <vk-tag type="danger" closable @close="handleClose">危险标签</vk-tag>
  </div>
</template>

<script setup>
const handleClose = () => {
  console.log('标签被关闭');
};
</script>
```

  </template>
</Demo>

## 不同尺寸

标签提供三种尺寸：小、中、大。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag size="small">小标签</vk-tag>
    <vk-tag size="medium">中标签</vk-tag>
    <vk-tag size="large">大标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag size="small">小标签</vk-tag>
    <vk-tag size="medium">中标签</vk-tag>
    <vk-tag size="large">大标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 不同主题

标签提供了两种主题：`light` 和 `dark`。

<Demo>
  <div style="display: flex; gap: 16px; flex-direction: column;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span style="margin-right: 8px;">浅色主题：</span>
      <vk-tag effect="light">默认</vk-tag>
      <vk-tag type="primary" effect="light">主要</vk-tag>
      <vk-tag type="success" effect="light">成功</vk-tag>
      <vk-tag type="warning" effect="light">警告</vk-tag>
      <vk-tag type="danger" effect="light">危险</vk-tag>
      <vk-tag type="info" effect="light">信息</vk-tag>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span style="margin-right: 8px;">深色主题：</span>
      <vk-tag effect="dark">默认</vk-tag>
      <vk-tag type="primary" effect="dark">主要</vk-tag>
      <vk-tag type="success" effect="dark">成功</vk-tag>
      <vk-tag type="warning" effect="dark">警告</vk-tag>
      <vk-tag type="danger" effect="dark">危险</vk-tag>
      <vk-tag type="info" effect="dark">信息</vk-tag>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; flex-direction: column;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span style="margin-right: 8px;">浅色主题：</span>
      <vk-tag effect="light">默认</vk-tag>
      <vk-tag type="primary" effect="light">主要</vk-tag>
      <vk-tag type="success" effect="light">成功</vk-tag>
      <vk-tag type="warning" effect="light">警告</vk-tag>
      <vk-tag type="danger" effect="light">危险</vk-tag>
      <vk-tag type="info" effect="light">信息</vk-tag>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <span style="margin-right: 8px;">深色主题：</span>
      <vk-tag effect="dark">默认</vk-tag>
      <vk-tag type="primary" effect="dark">主要</vk-tag>
      <vk-tag type="success" effect="dark">成功</vk-tag>
      <vk-tag type="warning" effect="dark">警告</vk-tag>
      <vk-tag type="danger" effect="dark">危险</vk-tag>
      <vk-tag type="info" effect="dark">信息</vk-tag>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 圆角标签

设置 `round` 属性可以使标签变为圆角。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag round>圆角标签</vk-tag>
    <vk-tag type="primary" round>主要标签</vk-tag>
    <vk-tag type="success" round>成功标签</vk-tag>
    <vk-tag type="warning" round>警告标签</vk-tag>
    <vk-tag type="danger" round>危险标签</vk-tag>
    <vk-tag type="info" round>信息标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag round>圆角标签</vk-tag>
    <vk-tag type="primary" round>主要标签</vk-tag>
    <vk-tag type="success" round>成功标签</vk-tag>
    <vk-tag type="warning" round>警告标签</vk-tag>
    <vk-tag type="danger" round>危险标签</vk-tag>
    <vk-tag type="info" round>信息标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 边框标签

设置 `bordered` 属性可以显示边框。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag bordered>边框标签</vk-tag>
    <vk-tag type="primary" bordered>主要标签</vk-tag>
    <vk-tag type="success" bordered>成功标签</vk-tag>
    <vk-tag type="warning" bordered>警告标签</vk-tag>
    <vk-tag type="danger" bordered>危险标签</vk-tag>
    <vk-tag type="info" bordered>信息标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag bordered>边框标签</vk-tag>
    <vk-tag type="primary" bordered>主要标签</vk-tag>
    <vk-tag type="success" bordered>成功标签</vk-tag>
    <vk-tag type="warning" bordered>警告标签</vk-tag>
    <vk-tag type="danger" bordered>危险标签</vk-tag>
    <vk-tag type="info" bordered>信息标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 自定义颜色

可以自定义标签的颜色。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag color="#6554C0">紫色标签</vk-tag>
    <vk-tag color="#ff6b35">橙色标签</vk-tag>
    <vk-tag color="#1abc9c">青色标签</vk-tag>
    <vk-tag color="#e74c3c">红色标签</vk-tag>
    <vk-tag color="#f39c12">黄色标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag color="#6554C0">紫色标签</vk-tag>
    <vk-tag color="#ff6b35">橙色标签</vk-tag>
    <vk-tag color="#1abc9c">青色标签</vk-tag>
    <vk-tag color="#e74c3c">红色标签</vk-tag>
    <vk-tag color="#f39c12">黄色标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 可点击标签

设置 `clickable` 属性可以使标签可点击。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag clickable @click="handleTagClick">可点击标签</vk-tag>
    <vk-tag type="primary" clickable @click="handleTagClick">主要标签</vk-tag>
    <vk-tag type="success" clickable @click="handleTagClick">成功标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag clickable @click="handleTagClick">可点击标签</vk-tag>
    <vk-tag type="primary" clickable @click="handleTagClick">主要标签</vk-tag>
    <vk-tag type="success" clickable @click="handleTagClick">成功标签</vk-tag>
  </div>
</template>

<script setup>
const handleTagClick = () => {
  console.log('标签被点击');
};
</script>
```

  </template>
</Demo>

## 禁用动画

设置 `disable-transitions` 属性可以禁用标签的过渡动画。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag>有动画</vk-tag>
    <vk-tag disable-transitions>无动画</vk-tag>
    <vk-tag closable disable-transitions @close="handleClose">无动画可关闭</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag>有动画</vk-tag>
    <vk-tag disable-transitions>无动画</vk-tag>
    <vk-tag closable disable-transitions @close="handleClose">无动画可关闭</vk-tag>
  </div>
</template>

<script setup>
const handleClose = () => {
  console.log('标签被关闭');
};
</script>
```

  </template>
</Demo>

## 组合使用

标签的各种属性可以组合使用。

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag type="primary" size="large" round bordered closable @close="handleClose">组合标签</vk-tag>
    <vk-tag type="success" effect="light" round clickable @click="handleTagClick">浅色圆角</vk-tag>
    <vk-tag color="#6554C0" size="small" bordered closable @close="handleClose">自定义小标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <vk-tag type="primary" size="large" round bordered closable @close="handleClose">组合标签</vk-tag>
    <vk-tag type="success" effect="light" round clickable @click="handleTagClick">浅色圆角</vk-tag>
    <vk-tag color="#6554C0" size="small" bordered closable @close="handleClose">自定义小标签</vk-tag>
  </div>
</template>

<script setup>
const handleClose = () => {
  console.log('标签被关闭');
};

const handleTagClick = () => {
  console.log('标签被点击');
};
</script>
```

  </template>
</Demo>

## API

### Tag Props

| 名称               | 类型                                                    | 默认值     | 说明                                           |
| ------------------ | ------------------------------------------------------- | ---------- | ---------------------------------------------- |
| type               | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'`| 标签类型                                       |
| size               | `'small' \| 'medium' \| 'large'`                       | `'medium'` | 标签尺寸                                       |
| effect             | `'light' \| 'dark'`                                     | `'light'`  | 标签主题                                       |
| closable           | `boolean`                                               | `false`    | 是否可关闭                                     |
| round              | `boolean`                                               | `false`    | 是否为圆角                                     |
| bordered           | `boolean`                                               | `false`    | 是否显示边框                                   |
| clickable          | `boolean`                                               | `false`    | 是否可点击                                     |
| color              | `string`                                                | —          | 自定义颜色                                     |
| disableTransitions | `boolean`                                               | `false`    | 是否禁用渐变动画                               |

### Tag Events

| 事件名 | 说明           | 回调参数              |
| ------ | -------------- | --------------------- |
| click  | 点击标签时触发 | `(event: MouseEvent)` |
| close  | 关闭标签时触发 | `(event: MouseEvent)` |

### Tag Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 标签内容 |

<script setup>
const handleClose = () => {
  console.log('标签被关闭');
};

const handleTagClick = () => {
  console.log('标签被点击');
};
</script>