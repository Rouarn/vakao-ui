# Tooltip 文字提示

文字提示组件，用于在用户与元素交互时显示额外信息。支持多种触发方式、位置和主题。

## 基础用法

最简单的用法，鼠标悬停时显示提示信息。

<Demo>
  <vk-tooltip content="这是一个提示信息">
    <vk-button>悬停查看提示</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="这是一个提示信息">
    <vk-button>悬停查看提示</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## 不同位置

通过 `placement` 属性设置提示框的显示位置。

<Demo>
  <div style="display: grid; grid-template-areas: '. top .' 'left . right' '. bottom .'; gap: 20px; width: 300px; text-align: center;">
    <div style="grid-area: top;">
      <vk-tooltip content="顶部提示" placement="top">
        <vk-button>顶部</vk-button>
      </vk-tooltip>
    </div>
    <div style="grid-area: left;">
      <vk-tooltip content="左侧提示" placement="left">
        <vk-button>左侧</vk-button>
      </vk-tooltip>
    </div>
    <div style="grid-area: right;">
      <vk-tooltip content="右侧提示" placement="right">
        <vk-button>右侧</vk-button>
      </vk-tooltip>
    </div>
    <div style="grid-area: bottom;">
      <vk-tooltip content="底部提示" placement="bottom">
        <vk-button>底部</vk-button>
      </vk-tooltip>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div class="demo-tooltip-placement">
    <div class="top">
      <vk-tooltip content="顶部提示" placement="top">
        <vk-button>顶部</vk-button>
      </vk-tooltip>
    </div>

    <div class="left">
      <vk-tooltip content="左侧提示" placement="left">
        <vk-button>左侧</vk-button>
      </vk-tooltip>
    </div>

    <div class="right">
      <vk-tooltip content="右侧提示" placement="right">
        <vk-button>右侧</vk-button>
      </vk-tooltip>
    </div>

    <div class="bottom">
      <vk-tooltip content="底部提示" placement="bottom">
        <vk-button>底部</vk-button>
      </vk-tooltip>
    </div>
  </div>
</template>

<style scoped>
.demo-tooltip-placement {
  display: grid;
  grid-template-areas:
    ". top ."
    "left . right"
    ". bottom .";
  gap: 20px;
  width: 300px;
  text-align: center;
}

.top {
  grid-area: top;
}
.left {
  grid-area: left;
}
.right {
  grid-area: right;
}
.bottom {
  grid-area: bottom;
}
</style>
```

  </template>
</Demo>

## 触发方式

通过 `trigger` 属性设置不同的触发方式。

<Demo>
  <div style="display: flex; gap: 16px;">
    <vk-tooltip content="悬停触发" trigger="hover">
      <vk-button>悬停触发</vk-button>
    </vk-tooltip>
    <vk-tooltip content="点击触发" trigger="click">
      <vk-button>点击触发</vk-button>
    </vk-tooltip>
    <vk-tooltip content="聚焦触发" trigger="focus">
      <vk-button>聚焦触发</vk-button>
    </vk-tooltip>
  </div>
  
  <template #code>

```vue
<template>
  <div class="demo-tooltip-trigger">
    <vk-tooltip content="悬停触发" trigger="hover">
      <vk-button>悬停触发</vk-button>
    </vk-tooltip>

    <vk-tooltip content="点击触发" trigger="click">
      <vk-button>点击触发</vk-button>
    </vk-tooltip>

    <vk-tooltip content="聚焦触发" trigger="focus">
      <vk-button>聚焦触发</vk-button>
    </vk-tooltip>
  </div>
</template>

<style scoped>
.demo-tooltip-trigger {
  display: flex;
  gap: 16px;
}
</style>
```

  </template>
</Demo>

## 主题

通过 `theme` 属性设置提示框的主题。

<Demo>
  <div style="display: flex; gap: 16px;">
    <vk-tooltip content="暗色主题" theme="dark">
      <vk-button>暗色主题</vk-button>
    </vk-tooltip>
    <vk-tooltip content="亮色主题" theme="light">
      <vk-button>亮色主题</vk-button>
    </vk-tooltip>
  </div>
  
  <template #code>

```vue
<template>
  <div class="demo-tooltip-theme">
    <vk-tooltip content="暗色主题" theme="dark">
      <vk-button>暗色主题</vk-button>
    </vk-tooltip>

    <vk-tooltip content="亮色主题" theme="light">
      <vk-button>亮色主题</vk-button>
    </vk-tooltip>
  </div>
</template>

<style scoped>
.demo-tooltip-theme {
  display: flex;
  gap: 16px;
}
</style>
```

  </template>
</Demo>

## 延迟显示

通过 `showDelay` 和 `hideDelay` 属性设置显示和隐藏的延迟时间。

<Demo>
  <div style="display: flex; gap: 16px;">
    <vk-tooltip content="延迟 500ms 显示" :show-delay="500">
      <vk-button>延迟显示</vk-button>
    </vk-tooltip>
    <vk-tooltip content="延迟 1000ms 隐藏" :hide-delay="1000">
      <vk-button>延迟隐藏</vk-button>
    </vk-tooltip>
  </div>
  
  <template #code>

```vue
<template>
  <div class="demo-tooltip-delay">
    <vk-tooltip content="延迟 500ms 显示" :show-delay="500">
      <vk-button>延迟显示</vk-button>
    </vk-tooltip>

    <vk-tooltip content="延迟 1000ms 隐藏" :hide-delay="1000">
      <vk-button>延迟隐藏</vk-button>
    </vk-tooltip>
  </div>
</template>

<style scoped>
.demo-tooltip-delay {
  display: flex;
  gap: 16px;
}
</style>
```

  </template>
</Demo>

## 自定义内容

通过 `content` 插槽可以自定义提示框的内容。

<Demo>
  <vk-tooltip>
    <template #content>
      <div style="text-align: center;">
        <vk-icon name="info" style="color: #409eff; margin-bottom: 4px;" />
        <div>自定义内容</div>
        <div style="font-size: 12px; color: #999;">支持任意 HTML 内容</div>
      </div>
    </template>
    <vk-button>自定义内容</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip>
    <template #content>
      <div style="text-align: center;">
        <vk-icon name="info" style="color: #409eff; margin-bottom: 4px;" />
        <div>自定义内容</div>
        <div style="font-size: 12px; color: #999;">支持任意 HTML 内容</div>
      </div>
    </template>
    <vk-button>自定义内容</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## 禁用状态

通过 `disabled` 属性禁用提示框。

<Demo>
  <div style="display: flex; gap: 16px;">
    <vk-tooltip content="正常提示" :disabled="false">
      <vk-button>正常状态</vk-button>
    </vk-tooltip>
    <vk-tooltip content="禁用提示" :disabled="true">
      <vk-button>禁用状态</vk-button>
    </vk-tooltip>
  </div>
  
  <template #code>

```vue
<template>
  <div class="demo-tooltip-disabled">
    <vk-tooltip content="正常提示" :disabled="false">
      <vk-button>正常状态</vk-button>
    </vk-tooltip>

    <vk-tooltip content="禁用提示" :disabled="true">
      <vk-button>禁用状态</vk-button>
    </vk-tooltip>
  </div>
</template>

<style scoped>
.demo-tooltip-disabled {
  display: flex;
  gap: 16px;
}
</style>
```

  </template>
</Demo>

## 内联模式

通过 `inline` 属性设置为内联模式，适用于文本中的提示。

<Demo>
  <p>
    这是一段文本，其中包含
    <vk-tooltip content="这是内联提示" inline>
      <span style="color: #409eff; cursor: pointer;">内联提示</span>
    </vk-tooltip>
    的示例。
  </p>
  
  <template #code>

```vue
<template>
  <p>
    这是一段文本，其中包含
    <vk-tooltip content="这是内联提示" inline>
      <span style="color: #409eff; cursor: pointer;">内联提示</span>
    </vk-tooltip>
    的示例。
  </p>
</template>
```

  </template>
</Demo>

## 自定义样式

通过 `customClass` 和 `customStyle` 属性自定义提示框的样式。

<Demo>
  <vk-tooltip 
    content="自定义样式提示" 
    custom-class="custom-tooltip"
    custom-style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border: none;"
  >
    <vk-button>自定义样式</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip
    content="自定义样式提示"
    custom-class="custom-tooltip"
    custom-style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border: none;"
  >
    <vk-button>自定义样式</vk-button>
  </vk-tooltip>
</template>

<style>
.custom-tooltip {
  border-radius: 12px !important;
  font-weight: bold;
}
</style>
```

  </template>
</Demo>

## 隐藏箭头

通过 `showArrow` 属性控制是否显示箭头。

<Demo>
  <div style="display: flex; gap: 16px;">
    <vk-tooltip content="显示箭头" :show-arrow="true">
      <vk-button>显示箭头</vk-button>
    </vk-tooltip>
    <vk-tooltip content="隐藏箭头" :show-arrow="false">
      <vk-button>隐藏箭头</vk-button>
    </vk-tooltip>
  </div>
  
  <template #code>

```vue
<template>
  <div class="demo-tooltip-arrow">
    <vk-tooltip content="显示箭头" :show-arrow="true">
      <vk-button>显示箭头</vk-button>
    </vk-tooltip>

    <vk-tooltip content="隐藏箭头" :show-arrow="false">
      <vk-button>隐藏箭头</vk-button>
    </vk-tooltip>
  </div>
</template>

<style scoped>
.demo-tooltip-arrow {
  display: flex;
  gap: 16px;
}
</style>
```

  </template>
</Demo>

## API

### Props

| 名称        | 类型                                     | 默认值    | 说明             |
| ----------- | ---------------------------------------- | --------- | ---------------- |
| content     | `string`                                 | `''`      | 提示内容         |
| placement   | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`   | 提示框位置       |
| disabled    | `boolean`                                | `false`   | 是否禁用提示     |
| trigger     | `'hover' \| 'click' \| 'focus'`          | `'hover'` | 触发方式         |
| showDelay   | `number`                                 | `0`       | 显示延迟（毫秒） |
| hideDelay   | `number`                                 | `200`     | 隐藏延迟（毫秒） |
| theme       | `'dark' \| 'light'`                      | `'dark'`  | 提示框主题       |
| customClass | `string`                                 | `''`      | 自定义类名       |
| customStyle | `string`                                 | `''`      | 自定义样式       |
| showArrow   | `boolean`                                | `true`    | 是否显示箭头     |
| offset      | `number`                                 | `8`       | 提示框偏移量     |
| inline      | `boolean`                                | `false`   | 是否为内联模式   |

### Events

| 名称  | 参数                      | 说明             |
| ----- | ------------------------- | ---------------- |
| show  | —                         | 提示框显示时触发 |
| hide  | —                         | 提示框隐藏时触发 |
| click | `(e: MouseEvent) => void` | 点击提示框时触发 |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 触发元素内容 |
| content | 提示框内容   |
