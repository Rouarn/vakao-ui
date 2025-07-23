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
  <vk-button type="error">错误按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button>默认按钮</vk-button>
  <vk-button type="primary">主要按钮</vk-button>
  <vk-button type="success">成功按钮</vk-button>
  <vk-button type="info">信息按钮</vk-button>
  <vk-button type="warning">警告按钮</vk-button>
  <vk-button type="error">错误按钮</vk-button>
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

使用 `render-icon` 属性设置按钮图标。

<Demo>
  <vk-button :render-icon="renderSearchIcon">搜索</vk-button>
  <vk-button type="primary" :render-icon="renderAddIcon">添加</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button :render-icon="renderSearchIcon">搜索</vk-button>
  <vk-button type="primary" :render-icon="renderAddIcon">添加</vk-button>
</template>

<script setup lang="ts">
import { h } from "vue";
import { SearchOutline, AddOutline } from "@vicons/ionicons5";

const renderSearchIcon = () => h(SearchOutline);
const renderAddIcon = () => h(AddOutline);
</script>
```

  </template>
</Demo>

<script setup>
import { h } from 'vue'
import { SearchOutline, AddOutline, CheckmarkOutline } from '@vicons/ionicons5'

const renderSearchIcon = () => h(SearchOutline)
const renderAddIcon = () => h(AddOutline)
const renderCheckIcon = () => h(CheckmarkOutline)
</script>

## 圆形按钮

使用 `circle` 属性将按钮设置为圆形。

<Demo>
  <vk-button circle :render-icon="renderSearchIcon" />
  <vk-button type="primary" circle :render-icon="renderAddIcon" />
  <vk-button type="success" circle :render-icon="renderCheckIcon" />
  
  <template #code>

```vue
<template>
  <vk-button circle :render-icon="renderSearchIcon" />
  <vk-button type="primary" circle :render-icon="renderAddIcon" />
  <vk-button type="success" circle :render-icon="renderCheckIcon" />
</template>

<script setup lang="ts">
import { h } from "vue";
import { SearchOutline, AddOutline, CheckmarkOutline } from "@vicons/ionicons5";

const renderSearchIcon = () => h(SearchOutline);
const renderAddIcon = () => h(AddOutline);
const renderCheckIcon = () => h(CheckmarkOutline);
</script>
```

  </template>
</Demo>

## 按钮组

使用 Naive UI 的 `n-button-group` 组件组合多个按钮。

<Demo>
  <n-button-group>
    <vk-button>上一页</vk-button>
    <vk-button>下一页</vk-button>
  </n-button-group>
  <br /><br />
  <n-button-group>
    <vk-button type="primary">保存</vk-button>
    <vk-button>取消</vk-button>
  </n-button-group>
  
  <template #code>

```vue
<template>
  <n-button-group>
    <vk-button>上一页</vk-button>
    <vk-button>下一页</vk-button>
  </n-button-group>

  <n-button-group>
    <vk-button type="primary">保存</vk-button>
    <vk-button>取消</vk-button>
  </n-button-group>
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
  <vk-button 
    customClass="my-button" 
    customStyle="background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; border: none;"
  >
    渐变按钮
  </vk-button>
  <vk-button 
    class="shadow-button" 
    style="box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 20px;"
  >
    阴影按钮
  </vk-button>
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
  box-shadow: 0 6px 12px rgba(0,0,0,0.3);
}
</style>
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
  <vk-button 
    data-testid="test-button" 
    aria-label="测试按钮" 
    title="这是一个测试按钮"
  >
    可访问性按钮
  </vk-button>
</template>
```

  </template>
</Demo>

## API

### Props

| 名称          | 类型                                                                                  | 默认值      | 说明             |
| ------------- | ------------------------------------------------------------------------------------- | ----------- | ---------------- |
| type          | `'default' \| 'tertiary' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | 按钮类型         |
| size          | `'tiny' \| 'small' \| 'medium' \| 'large'`                                            | `'medium'`  | 按钮大小         |
| disabled      | `boolean`                                                                             | `false`     | 是否禁用         |
| loading       | `boolean`                                                                             | `false`     | 是否加载中       |
| color         | `string`                                                                              | —           | 按钮颜色         |
| textColor     | `string`                                                                              | —           | 按钮文字颜色     |
| customClass   | `string`                                                                              | —           | 自定义类名       |
| customStyle   | `string \| object`                                                                    | —           | 自定义样式       |
| tag           | `string`                                                                              | `'button'`  | 按钮标签         |
| ghost         | `boolean`                                                                             | `false`     | 是否为幽灵按钮   |
| round         | `boolean`                                                                             | `false`     | 是否为圆角按钮   |
| circle        | `boolean`                                                                             | `false`     | 是否为圆形按钮   |
| strong        | `boolean`                                                                             | `false`     | 是否加粗         |
| secondary     | `boolean`                                                                             | `false`     | 是否为次要按钮   |
| tertiary      | `boolean`                                                                             | `false`     | 是否为第三级按钮 |
| quaternary    | `boolean`                                                                             | `false`     | 是否为第四级按钮 |
| focusable     | `boolean`                                                                             | `true`      | 是否可聚焦       |
| keyboard      | `boolean`                                                                             | `true`      | 是否支持键盘操作 |
| dashed        | `boolean`                                                                             | `false`     | 是否为虚线边框   |
| renderIcon    | `() => VNode`                                                                         | —           | 图标渲染函数     |
| iconPlacement | `'left' \| 'right'`                                                                   | `'left'`    | 图标位置         |
| wave          | `boolean`                                                                             | `true`      | 是否有波纹效果   |
| bordered      | `boolean`                                                                             | `true`      | 是否有边框       |

### Events

| 名称  | 参数                      | 说明           |
| ----- | ------------------------- | -------------- |
| click | `(e: MouseEvent) => void` | 点击按钮时触发 |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |
