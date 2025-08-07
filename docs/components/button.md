# Button 按钮

按钮用于触发一个操作，如提交表单。

## 基础用法

使用 `type`、`size` 和其他属性来定义按钮的样式。

<Demo>
  <vk-button>默认按钮</vk-button>
  <vk-button type="primary">主要按钮</vk-button>
  <vk-button type="success">成功按钮</vk-button>
  <vk-button type="info">信息按钮</vk-button>
  <vk-button type="warning">警告按钮</vk-button>
  <vk-button type="danger">错误按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button>默认按钮</vk-button>
  <vk-button type="primary">主要按钮</vk-button>
  <vk-button type="success">成功按钮</vk-button>
  <vk-button type="info">信息按钮</vk-button>
  <vk-button type="warning">警告按钮</vk-button>
  <vk-button type="danger">错误按钮</vk-button>
</template>
```

  </template>
</Demo>

## 朴素按钮

使用 `plain` 属性创建朴素按钮，朴素按钮具有透明背景和彩色边框。

<Demo>
  <vk-button plain>朴素按钮</vk-button>
  <vk-button type="primary" plain>主要按钮</vk-button>
  <vk-button type="success" plain>成功按钮</vk-button>
  <vk-button type="info" plain>信息按钮</vk-button>
  <vk-button type="warning" plain>警告按钮</vk-button>
  <vk-button type="danger" plain>错误按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button plain>朴素按钮</vk-button>
  <vk-button type="primary" plain>主要按钮</vk-button>
  <vk-button type="success" plain>成功按钮</vk-button>
  <vk-button type="info" plain>信息按钮</vk-button>
  <vk-button type="warning" plain>警告按钮</vk-button>
  <vk-button type="danger" plain>错误按钮</vk-button>
</template>
```

  </template>
</Demo>

## 按钮尺寸

使用 `size` 属性设置按钮大小，可选值为 `tiny`、`small`、`medium`、`large`，默认为 `medium`。

<Demo>
  <vk-button size="tiny">超小按钮</vk-button>
  <vk-button size="small">小按钮</vk-button>
  <vk-button>默认按钮</vk-button>
  <vk-button size="large">大按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button size="tiny">超小按钮</vk-button>
  <vk-button size="small">小按钮</vk-button>
  <vk-button>默认按钮</vk-button>
  <vk-button size="large">大按钮</vk-button>
</template>
</template>
```

  </template>
</Demo>

## 禁用状态

使用 `disabled` 属性禁用按钮。

<Demo>
  <vk-button disabled>禁用按钮</vk-button>
  <vk-button type="primary" disabled>禁用主要按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button disabled>禁用按钮</vk-button>
  <vk-button type="primary" disabled>禁用主要按钮</vk-button>
</template>
```

  </template>
</Demo>

## 加载状态

使用 `loading` 属性设置按钮加载状态。

<Demo>
  <vk-button loading>加载中</vk-button>
  <vk-button type="primary" loading>加载中</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button loading>加载中</vk-button>
  <vk-button type="primary" loading>加载中</vk-button>
</template>
```

  </template>
</Demo>

## 图标按钮

使用 `icon` 属性设置按钮图标。

<Demo>
  <vk-button icon="mdi:magnify">搜索</vk-button>
  <vk-button type="primary" icon="mdi:plus">添加</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button icon="mdi:magnify">搜索</vk-button>
  <vk-button type="primary" icon="mdi:plus">添加</vk-button>
</template>
```

  </template>
</Demo>

## 圆形按钮

使用 `circle` 属性将按钮设置为圆形。

<Demo>
  <vk-button circle icon="mdi:magnify" />
  <vk-button type="primary" circle icon="mdi:plus" />
  <vk-button type="success" circle icon="mdi:check" />
  
  <template #code>

```vue
<template>
  <vk-button circle icon="mdi:magnify" />
  <vk-button type="primary" circle icon="mdi:plus" />
  <vk-button type="success" circle icon="mdi:check" />
</template>
```

  </template>
</Demo>

## 自定义样式

按钮组件支持通过 `customClass` 和 `customStyle` 属性自定义样式，同时也支持直接传递 `class` 和 `style` 属性。

<Demo>
  <vk-button customClass="my-button" customStyle="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border: none;">渐变按钮</vk-button>
  <vk-button class="shadow-button" style="box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 20px;">阴影按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button customClass="my-button" customStyle="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border: none;">
    渐变按钮
  </vk-button>
  <vk-button class="shadow-button" style="box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 20px;"> 阴影按钮 </vk-button>
</template>

<style>
.my-button {
  transition: all 0.3s ease;
}

.my-button:hover {
  transform: translateY(-2px);
}

.shadow-button {
  transition: all 0.3s ease;
}

.shadow-button:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
```

  </template>
</Demo>

## 按钮组

使用 `vk-button-group` 将多个按钮组合在一起，形成一个按钮组。

<Demo>
  <vk-button-group>
    <vk-button>左</vk-button>
    <vk-button>中</vk-button>
    <vk-button>右</vk-button>
  </vk-button-group>
  
  <vk-button-group>
    <vk-button type="primary">保存</vk-button>
    <vk-button type="primary">编辑</vk-button>
    <vk-button type="primary">删除</vk-button>
  </vk-button-group>
  
  <template #code>

```vue
<template>
  <vk-button-group>
    <vk-button>左</vk-button>
    <vk-button>中</vk-button>
    <vk-button>右</vk-button>
  </vk-button-group>

  <vk-button-group>
    <vk-button type="primary">保存</vk-button>
    <vk-button type="primary">编辑</vk-button>
    <vk-button type="primary">删除</vk-button>
  </vk-button-group>
</template>
```

  </template>
</Demo>

## 属性继承

按钮组件支持标准的 HTML 属性继承，包括 `data-*`、`aria-*` 等属性。

<Demo>
  <vk-button data-testid="test-button" aria-label="测试按钮" title="这是一个测试按钮">可访问性按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button data-testid="test-button" aria-label="测试按钮" title="这是一个测试按钮"> 可访问性按钮 </vk-button>
</template>
```

  </template>
</Demo>

## API

### Props

| 名称         | 类型                                                                                   | 默认值      | 说明                                                                               |
| ------------ | -------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| type         | `'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` | 按钮类型                                                                           |
| size         | `'tiny' \| 'small' \| 'medium' \| 'large'`                                             | `'medium'`  | 按钮大小                                                                           |
| disabled     | `boolean`                                                                              | `false`     | 是否禁用                                                                           |
| loading      | `boolean`                                                                              | `false`     | 是否加载中                                                                         |
| color        | `string`                                                                               | —           | 按钮颜色                                                                           |
| textColor    | `string`                                                                               | —           | 按钮文字颜色                                                                       |
| customClass  | `string`                                                                               | —           | 自定义类名                                                                         |
| customStyle  | `string \| object`                                                                     | —           | 自定义样式                                                                         |
| tag          | `string`                                                                               | `'button'`  | 按钮标签                                                                           |
| ghost        | `boolean`                                                                              | `false`     | 是否为幽灵按钮                                                                     |
| round        | `boolean`                                                                              | `false`     | 是否为圆角按钮                                                                     |
| circle       | `boolean`                                                                              | `false`     | 是否为圆形按钮                                                                     |
| strong       | `boolean`                                                                              | `false`     | 是否加粗                                                                           |
| secondary    | `boolean`                                                                              | `false`     | 是否为次要按钮                                                                     |
| tertiary     | `boolean`                                                                              | `false`     | 是否为第三级按钮                                                                   |
| quaternary   | `boolean`                                                                              | `false`     | 是否为第四级按钮                                                                   |
| focusable    | `boolean`                                                                              | `true`      | 是否可聚焦                                                                         |
| keyboard     | `boolean`                                                                              | `true`      | 是否支持键盘操作                                                                   |
| dashed       | `boolean`                                                                              | `false`     | 是否为虚线边框                                                                     |
| icon         | `string \| VNode`                                                                      | —           | 图标名称或组件，支持 Iconify 图标名称（如 `mdi:magnify`）、图片 URL 或本地图片路径 |
| iconPosition | `'left' \| 'right'`                                                                    | `'left'`    | 图标位置                                                                           |
| wave         | `boolean`                                                                              | `true`      | 是否有波纹效果                                                                     |
| bordered     | `boolean`                                                                              | `true`      | 是否有边框                                                                         |
| plain        | `boolean`                                                                              | `false`     | 是否为朴素按钮（透明背景，有边框）                                                 |

### Events

| 名称  | 参数                      | 说明           |
| ----- | ------------------------- | -------------- |
| click | `(e: MouseEvent) => void` | 点击按钮时触发 |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |

## ButtonGroup API

### ButtonGroup Props

ButtonGroup 组件没有特定的 props，它只是一个容器组件，用于将多个按钮组合在一起。

### ButtonGroup Slots

| 名称    | 说明                         |
| ------- | ---------------------------- |
| default | 按钮组内容，通常包含多个按钮 |
