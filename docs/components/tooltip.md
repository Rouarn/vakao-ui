# Tooltip 文字提示

简洁的信息提示组件，鼠标悬停、点击或聚焦时显示。

## 基础用法

最简单的用法，提供一段文本作为提示内容。

```vue
<template>
  <VkTooltip content="这是一个提示文本">
    <VkButton>鼠标悬停查看提示</VkButton>
  </VkTooltip>
</template>
```

## 不同位置

通过 `placement` 属性控制提示出现的位置，支持四个方向：`top`、`right`、`bottom` 和 `left`。

```vue
<template>
  <div class="tooltip-demo-row">
    <VkTooltip content="顶部提示" placement="top">
      <VkButton>顶部</VkButton>
    </VkTooltip>

    <VkTooltip content="右侧提示" placement="right">
      <VkButton>右侧</VkButton>
    </VkTooltip>

    <VkTooltip content="底部提示" placement="bottom">
      <VkButton>底部</VkButton>
    </VkTooltip>

    <VkTooltip content="左侧提示" placement="left">
      <VkButton>左侧</VkButton>
    </VkTooltip>
  </div>
</template>

<style>
.tooltip-demo-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
</style>
```

## 主题

提供了两种主题：`dark`（默认）和 `light`。

```vue
<template>
  <div class="tooltip-demo-row">
    <VkTooltip content="暗色主题" theme="dark">
      <VkButton>暗色主题</VkButton>
    </VkTooltip>

    <VkTooltip content="亮色主题" theme="light">
      <VkButton>亮色主题</VkButton>
    </VkTooltip>
  </div>
</template>
```

## 触发方式

通过 `trigger` 属性控制触发方式，支持 `hover`（默认）、`click` 和 `focus`。

```vue
<template>
  <div class="tooltip-demo-row">
    <VkTooltip content="悬停触发" trigger="hover">
      <VkButton>悬停触发</VkButton>
    </VkTooltip>

    <VkTooltip content="点击触发" trigger="click">
      <VkButton>点击触发</VkButton>
    </VkTooltip>

    <VkTooltip content="聚焦触发" trigger="focus">
      <VkInput placeholder="聚焦触发" />
    </VkTooltip>
  </div>
</template>
```

## 显示延迟

通过 `showDelay` 和 `hideDelay` 属性控制提示显示和隐藏的延迟时间（毫秒）。

```vue
<template>
  <VkTooltip content="延迟 500ms 显示，延迟 1000ms 隐藏" :showDelay="500" :hideDelay="1000">
    <VkButton>延迟显示和隐藏</VkButton>
  </VkTooltip>
</template>
```

## 自定义内容

使用 `content` 插槽自定义提示内容，支持 HTML。

```vue
<template>
  <VkTooltip>
    <VkButton>自定义内容</VkButton>
    <template #content>
      <div>
        <h4 style="margin: 0 0 8px;">自定义标题</h4>
        <p style="margin: 0;">这是一段<strong>自定义内容</strong>，支持 HTML。</p>
      </div>
    </template>
  </VkTooltip>
</template>
```

## 禁用状态

通过 `disabled` 属性禁用提示。

```vue
<template>
  <VkTooltip content="这个提示不会显示" :disabled="true">
    <VkButton>禁用提示</VkButton>
  </VkTooltip>
</template>
```

## API

### 属性

| 属性名      | 说明                 | 类型    | 可选值                | 默认值  |
| ----------- | -------------------- | ------- | --------------------- | ------- |
| content     | 提示内容             | string  | —                     | ''      |
| placement   | 提示框位置           | string  | top/right/bottom/left | 'top'   |
| disabled    | 是否禁用提示         | boolean | —                     | false   |
| trigger     | 触发方式             | string  | hover/click/focus     | 'hover' |
| showDelay   | 显示延迟（毫秒）     | number  | —                     | 0       |
| hideDelay   | 隐藏延迟（毫秒）     | number  | —                     | 200     |
| theme       | 提示框主题           | string  | dark/light            | 'dark'  |
| customClass | 自定义类名           | string  | —                     | ''      |
| customStyle | 自定义样式           | string  | —                     | ''      |
| showArrow   | 是否显示箭头         | boolean | —                     | true    |
| offset      | 偏移量（像素）       | number  | —                     | 8       |
| inline      | 是否可用于纯文本内容 | boolean | —                     | false   |

### 事件

| 事件名 | 说明                 | 回调参数          |
| ------ | -------------------- | ----------------- |
| show   | 提示框显示时触发     | —                 |
| hide   | 提示框隐藏时触发     | —                 |
| click  | 点击提示框内容时触发 | event: MouseEvent |

### 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 触发元素       |
| content | 自定义提示内容 |

### 方法

通过 ref 获取组件实例后，可以调用以下方法：

| 方法名 | 说明           | 参数 |
| ------ | -------------- | ---- |
| show   | 手动显示提示框 | —    |
| hide   | 手动隐藏提示框 | —    |
