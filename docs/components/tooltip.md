# Tooltip 工具提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来决定 hover 时的提示信息。由 `placement` 属性决定展示效果：`placement`属性值为：`[方向]-[对齐位置]`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<Demo>

  <div class="tooltip-demo">
    <div class="top">
      <vk-tooltip content="Top Left 提示文字" placement="top-start">
        <vk-button>上左</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Top Center 提示文字" placement="top">
        <vk-button>上边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Top Right 提示文字" placement="top-end">
        <vk-button>上右</vk-button>
      </vk-tooltip>
    </div>
    <div class="left">
      <vk-tooltip content="Left Top 提示文字" placement="left-start">
        <vk-button>左上</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Left Center 提示文字" placement="left">
        <vk-button>左边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Left Bottom 提示文字" placement="left-end">
        <vk-button>左下</vk-button>
      </vk-tooltip>
    </div>
    <div class="right">
      <vk-tooltip content="Right Top 提示文字" placement="right-start">
        <vk-button>右上</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Right Center 提示文字" placement="right">
        <vk-button>右边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Right Bottom 提示文字" placement="right-end">
        <vk-button>右下</vk-button>
      </vk-tooltip>
    </div>
    <div class="bottom">
      <vk-tooltip content="Bottom Left 提示文字" placement="bottom-start">
        <vk-button>下左</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Bottom Center 提示文字" placement="bottom">
        <vk-button>下边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Bottom Right 提示文字" placement="bottom-end">
        <vk-button>下右</vk-button>
      </vk-tooltip>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div class="tooltip-demo">
    <div class="top">
      <vk-tooltip content="Top Left 提示文字" placement="top-start">
        <vk-button>上左</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Top Center 提示文字" placement="top">
        <vk-button>上边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Top Right 提示文字" placement="top-end">
        <vk-button>上右</vk-button>
      </vk-tooltip>
    </div>
    <div class="left">
      <vk-tooltip content="Left Top 提示文字" placement="left-start">
        <vk-button>左上</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Left Center 提示文字" placement="left">
        <vk-button>左边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Left Bottom 提示文字" placement="left-end">
        <vk-button>左下</vk-button>
      </vk-tooltip>
    </div>
    <div class="right">
      <vk-tooltip content="Right Top 提示文字" placement="right-start">
        <vk-button>右上</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Right Center 提示文字" placement="right">
        <vk-button>右边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Right Bottom 提示文字" placement="right-end">
        <vk-button>右下</vk-button>
      </vk-tooltip>
    </div>
    <div class="bottom">
      <vk-tooltip content="Bottom Left 提示文字" placement="bottom-start">
        <vk-button>下左</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Bottom Center 提示文字" placement="bottom">
        <vk-button>下边</vk-button>
      </vk-tooltip>
      <vk-tooltip content="Bottom Right 提示文字" placement="bottom-end">
        <vk-button>下右</vk-button>
      </vk-tooltip>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 主题

Tooltip 组件内置了两个主题：`dark` 和 `light`。

通过设置 `effect` 来修改主题，默认值为 `dark`。

<Demo>
  <vk-tooltip content="Top center" placement="top">
    <vk-button>Dark</vk-button>
  </vk-tooltip>
  <vk-tooltip content="Bottom center" placement="bottom" effect="light">
    <vk-button>Light</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="Top center" placement="top">
    <vk-button>Dark</vk-button>
  </vk-tooltip>
  <vk-tooltip content="Bottom center" placement="bottom" effect="light">
    <vk-button>Light</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式。

用具名插槽 `content`，替代 `tooltip` 中的 `content` 属性。

<Demo>
  <vk-tooltip placement="top">
    <template #content>
      <div>多行信息</div>
      <div>第二行信息</div>
    </template>
    <vk-button>Top center</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip placement="top">
    <template #content>
      <div>多行信息</div>
      <div>第二行信息</div>
    </template>
    <vk-button>Top center</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## 过渡动画

Tooltip 组件支持多种过渡动画效果，通过 `transition` 属性可以定制显隐的动画效果。

### 基础动画

<Demo>
  <vk-tooltip content="基础淡入淡出" transition="fade">
    <vk-button>Fade</vk-button>
  </vk-tooltip>
  <vk-tooltip content="淡入淡出 + 水平滑动" transition="fade-slide">
    <vk-button>Fade Slide</vk-button>
  </vk-tooltip>
  <vk-tooltip content="淡入淡出 + 垂直滑动" transition="fade-bottom">
    <vk-button>Fade Bottom</vk-button>
  </vk-tooltip>
  <vk-tooltip content="淡入淡出 + 缩放" transition="fade-scale">
    <vk-button>Fade Scale</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="基础淡入淡出" transition="fade">
    <vk-button>Fade</vk-button>
  </vk-tooltip>
  <vk-tooltip content="淡入淡出 + 水平滑动" transition="fade-slide">
    <vk-button>Fade Slide</vk-button>
  </vk-tooltip>
  <vk-tooltip content="淡入淡出 + 垂直滑动" transition="fade-bottom">
    <vk-button>Fade Bottom</vk-button>
  </vk-tooltip>
  <vk-tooltip content="淡入淡出 + 缩放" transition="fade-scale">
    <vk-button>Fade Scale</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

### 缩放动画

<Demo>
  <vk-tooltip content="精细缩放淡入淡出" transition="zoom-fade">
    <vk-button>Zoom Fade</vk-button>
  </vk-tooltip>
  <vk-tooltip content="缩放到零点" transition="zoom-out">
    <vk-button>Zoom Out</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="精细缩放淡入淡出" transition="zoom-fade">
    <vk-button>Zoom Fade</vk-button>
  </vk-tooltip>
  <vk-tooltip content="缩放到零点" transition="zoom-out">
    <vk-button>Zoom Out</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

### 滑动动画

<Demo>
  <vk-tooltip content="向上滑动" transition="slide-up">
    <vk-button>Slide Up</vk-button>
  </vk-tooltip>
  <vk-tooltip content="向下滑动" transition="slide-down">
    <vk-button>Slide Down</vk-button>
  </vk-tooltip>
  <vk-tooltip content="向左滑动" transition="slide-left">
    <vk-button>Slide Left</vk-button>
  </vk-tooltip>
  <vk-tooltip content="向右滑动" transition="slide-right">
    <vk-button>Slide Right</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="向上滑动" transition="slide-up">
    <vk-button>Slide Up</vk-button>
  </vk-tooltip>
  <vk-tooltip content="向下滑动" transition="slide-down">
    <vk-button>Slide Down</vk-button>
  </vk-tooltip>
  <vk-tooltip content="向左滑动" transition="slide-left">
    <vk-button>Slide Left</vk-button>
  </vk-tooltip>
  <vk-tooltip content="向右滑动" transition="slide-right">
    <vk-button>Slide Right</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

### 特殊效果

<Demo>
  <vk-tooltip content="弹跳效果，适合重要提示" transition="bounce">
    <vk-button>Bounce</vk-button>
  </vk-tooltip>
  <vk-tooltip content="弹性效果，愉悦的交互反馈" transition="elastic">
    <vk-button>Elastic</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="弹跳效果，适合重要提示" transition="bounce">
    <vk-button>Bounce</vk-button>
  </vk-tooltip>
  <vk-tooltip content="弹性效果，愉悦的交互反馈" transition="elastic">
    <vk-button>Elastic</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## 显示与隐藏的延迟

可以设置显示和隐藏的延迟时间。

<Demo>
  <vk-tooltip content="显示延迟 1000ms" :show-delay="1000">
    <vk-button>显示延迟</vk-button>
  </vk-tooltip>
  <vk-tooltip content="隐藏延迟 1000ms" :hide-delay="1000">
    <vk-button>隐藏延迟</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="显示延迟 1000ms" :show-delay="1000">
    <vk-button>显示延迟</vk-button>
  </vk-tooltip>
  <vk-tooltip content="隐藏延迟 1000ms" :hide-delay="1000">
    <vk-button>隐藏延迟</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## 手动控制

可以通过 `visible` 属性手动控制提示的显示。

将 `trigger` 设置为 `manual` 来手动控制提示的显示。

<Demo>
  <vk-tooltip 
    content="手动控制提示" 
    trigger="manual" 
    v-model:visible="manualVisible"
  >
    <vk-button @click="manualVisible = !manualVisible">点击切换</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="手动控制提示" trigger="manual" v-model:visible="visible">
    <vk-button @click="visible = !visible">点击切换</vk-button>
  </vk-tooltip>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
```

  </template>
</Demo>

## 触发方式

可以设置不同的触发方式。

通过 `trigger` 属性设置触发方式，支持 `hover`、`click`、`focus`、`manual`。

<Demo>
  <vk-tooltip content="Hover 触发" trigger="hover">
    <vk-button>Hover</vk-button>
  </vk-tooltip>
  <vk-tooltip content="Click 触发" trigger="click">
    <vk-button>Click</vk-button>
  </vk-tooltip>
  <vk-tooltip content="Focus 触发" trigger="focus">
    <vk-button>Focus</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="Hover 触发" trigger="hover">
    <vk-button>Hover</vk-button>
  </vk-tooltip>
  <vk-tooltip content="Click 触发" trigger="click">
    <vk-button>Click</vk-button>
  </vk-tooltip>
  <vk-tooltip content="Focus 触发" trigger="focus">
    <vk-button>Focus</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## 禁用状态

可以通过 `disabled` 属性禁用 Tooltip。

<Demo>
  <vk-tooltip content="禁用的提示" disabled>
    <vk-button>禁用状态</vk-button>
  </vk-tooltip>
  <vk-tooltip content="正常的提示">
    <vk-button>正常状态</vk-button>
  </vk-tooltip>
  
  <template #code>

```vue
<template>
  <vk-tooltip content="禁用的提示" disabled>
    <vk-button>禁用状态</vk-button>
  </vk-tooltip>
  <vk-tooltip content="正常的提示">
    <vk-button>正常状态</vk-button>
  </vk-tooltip>
</template>
```

  </template>
</Demo>

## API

### Props

| 属性名                    | 说明                                            | 类型                                | 默认值   |
| ------------------------- | ----------------------------------------------- | ----------------------------------- | -------- |
| content                   | 显示的内容，也可被 `slot#content` 覆盖          | `string`                            | —        |
| raw-content               | 内容是否为 HTML 字符串                          | `boolean`                           | `false`  |
| placement                 | Tooltip 组件出现的位置                          | `TooltipPlacement`                  | `bottom` |
| trigger                   | 触发方式                                        | `hover \| click \| focus \| manual` | `hover`  |
| effect                    | 主题，内置了 `dark` / `light` 两种              | `dark \| light`                     | `dark`   |
| show-arrow                | 是否显示箭头                                    | `boolean`                           | `true`   |
| disabled                  | 是否禁用                                        | `boolean`                           | `false`  |
| show-delay                | 显示延迟，单位毫秒                              | `number`                            | `0`      |
| hide-delay                | 隐藏延迟，单位毫秒                              | `number`                            | `200`    |
| auto-close                | 自动关闭延迟，单位毫秒，设置为 0 表示不自动关闭 | `number`                            | `0`      |
| offset                    | 出现位置的偏移量                                | `[number, number]`                  | `[0, 8]` |
| transition                | 过渡动画                                        | `TooltipTransition`                 | `fade`   |
| append-to                 | Tooltip 挂载的容器                              | `string \| HTMLElement`             | `body`   |
| popper-class              | 为 Tooltip 的 popper 添加类名                   | `string`                            | —        |
| popper-style              | 为 Tooltip 的 popper 添加样式                   | `string \| CSSProperties`           | —        |
| visible / v-model:visible | 是否可见                                        | `boolean`                           | —        |
| max-width                 | 最大宽度                                        | `string \| number`                  | `200px`  |
| hide-on-empty             | 内容为空时是否隐藏                              | `boolean`                           | `true`   |
| hide-on-click-outside     | 点击外部时是否关闭                              | `boolean`                           | `true`   |
| hide-on-escape            | 按下 ESC 键时是否关闭                           | `boolean`                           | `true`   |
| virtual-triggering        | 是否启用虚拟触发                                | `boolean`                           | `false`  |
| virtual-ref               | 虚拟触发元素                                    | `HTMLElement`                       | —        |

### Events

| 名称           | 参数                         | 说明               |
| -------------- | ---------------------------- | ------------------ |
| update:visible | `(visible: boolean) => void` | 显示状态改变时触发 |
| before-show    | `() => void`                 | 显示前触发         |
| show           | `() => void`                 | 显示后触发         |
| before-hide    | `() => void`                 | 隐藏前触发         |
| hide           | `() => void`                 | 隐藏后触发         |

### Slots

| 名称    | 说明                    |
| ------- | ----------------------- |
| default | 触发 Tooltip 显示的元素 |
| content | 自定义内容              |

### Methods

| 名称         | 说明                  | 类型         |
| ------------ | --------------------- | ------------ |
| show         | 显示 Tooltip          | `() => void` |
| hide         | 隐藏 Tooltip          | `() => void` |
| toggle       | 切换 Tooltip 显示状态 | `() => void` |
| updatePopper | 更新 Tooltip 位置     | `() => void` |
| destroy      | 销毁 Tooltip          | `() => void` |

### 类型定义

#### TooltipPlacement 位置类型

| 值             | 说明       | 位置示意 |
| -------------- | ---------- | -------- |
| `top`          | 顶部居中   | ⬆️       |
| `top-start`    | 顶部左对齐 | ↖️       |
| `top-end`      | 顶部右对齐 | ↗️       |
| `bottom`       | 底部居中   | ⬇️       |
| `bottom-start` | 底部左对齐 | ↙️       |
| `bottom-end`   | 底部右对齐 | ↘️       |
| `left`         | 左侧居中   | ⬅️       |
| `left-start`   | 左侧上对齐 | ↖️       |
| `left-end`     | 左侧下对齐 | ↙️       |
| `right`        | 右侧居中   | ➡️       |
| `right-start`  | 右侧上对齐 | ↗️       |
| `right-end`    | 右侧下对齐 | ↘️       |

#### TooltipTransition 动画类型

| 值            | 说明                    | 动画效果               |
| ------------- | ----------------------- | ---------------------- |
| `fade`        | 基础淡入淡出效果        | 💫 透明度变化          |
| `fade-slide`  | 淡入淡出 + 水平滑动效果 | 💫↔️ 透明度 + 水平移动 |
| `fade-bottom` | 淡入淡出 + 垂直滑动效果 | 💫↕️ 透明度 + 垂直移动 |
| `fade-scale`  | 淡入淡出 + 缩放效果     | 💫🔍 透明度 + 缩放     |
| `zoom-fade`   | 精细缩放淡入淡出效果    | 🔍💫 精细缩放 + 透明度 |
| `zoom-out`    | 缩放到零点效果          | 🔍➡️⚫ 缩放至消失      |
| `slide-up`    | 向上滑动效果            | ⬆️ 向上移动            |
| `slide-down`  | 向下滑动效果            | ⬇️ 向下移动            |
| `slide-left`  | 向左滑动效果            | ⬅️ 向左移动            |
| `slide-right` | 向右滑动效果            | ➡️ 向右移动            |
| `bounce`      | 弹跳效果                | 🏀 弹性动画            |
| `elastic`     | 弹性效果                | 🎯 弹性回弹            |

#### TypeScript 类型定义

```typescript
type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

type TooltipTransition =
  | "fade"
  | "fade-slide"
  | "fade-bottom"
  | "fade-scale"
  | "zoom-fade"
  | "zoom-out"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "bounce"
  | "elastic";
```

<script setup>
import { ref } from 'vue'

const manualVisible = ref(false)
</script>

<style>
.tooltip-demo {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  width:70%;
  margin: 20px auto;
}

.top {
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.left {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right {
  grid-column: 3;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.bottom {
  grid-column: 1 / 4;
  grid-row: 3;
  display: flex;
  justify-content: space-around;
  align-items: center;

}
</style>
