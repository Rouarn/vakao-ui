# Space 间距

设置组件之间的间距。

## 基础用法

相邻组件水平间距。

<Demo>
  <vk-space>
    <vk-button>按钮1</vk-button>
    <vk-button>按钮2</vk-button>
    <vk-button>按钮3</vk-button>
  </vk-space>
  
  <template #code>

```vue
<template>
  <vk-space>
    <vk-button>按钮1</vk-button>
    <vk-button>按钮2</vk-button>
    <vk-button>按钮3</vk-button>
  </vk-space>
</template>
```

  </template>
</Demo>

## 垂直间距

使用 `vertical` 属性设置垂直方向的间距。

<Demo>
  <vk-space vertical>
    <vk-button>按钮1</vk-button>
    <vk-button>按钮2</vk-button>
    <vk-button>按钮3</vk-button>
  </vk-space>
  
  <template #code>

```vue
<template>
  <vk-space vertical>
    <vk-button>按钮1</vk-button>
    <vk-button>按钮2</vk-button>
    <vk-button>按钮3</vk-button>
  </vk-space>
</template>
```

  </template>
</Demo>

## 间距大小

使用 `size` 属性控制间距的大小，支持预设尺寸和自定义数值。

<Demo>
  <div>
    <p>tiny 间距：</p>
    <vk-space size="tiny">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
    <p>small 间距：</p>
    <vk-space size="small">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
    <p>medium 间距：</p>
    <vk-space size="medium">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
    <p>large 间距：</p>
    <vk-space size="large">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
    <p>自定义间距（32px）：</p>
    <vk-space :size="32">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>tiny 间距：</p>
    <vk-space size="tiny">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>

    <p>small 间距：</p>
    <vk-space size="small">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>

    <p>medium 间距：</p>
    <vk-space size="medium">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>

    <p>large 间距：</p>
    <vk-space size="large">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>

    <p>自定义间距（32px）：</p>
    <vk-space :size="32">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
  </div>
</template>
```

  </template>
</Demo>

## 自定义水平和垂直间距

使用数组形式的 `size` 属性分别设置水平和垂直间距。

<Demo>
  <vk-space :size="[20, 10]" wrap>
    <vk-button>按钮1</vk-button>
    <vk-button>按钮2</vk-button>
    <vk-button>按钮3</vk-button>
    <vk-button>按钮4</vk-button>
    <vk-button>按钮5</vk-button>
    <vk-button>按钮6</vk-button>
  </vk-space>
  
  <template #code>

```vue
<template>
  <vk-space :size="[20, 10]" wrap>
    <vk-button>按钮1</vk-button>
    <vk-button>按钮2</vk-button>
    <vk-button>按钮3</vk-button>
    <vk-button>按钮4</vk-button>
    <vk-button>按钮5</vk-button>
    <vk-button>按钮6</vk-button>
  </vk-space>
</template>
```

  </template>
</Demo>

## 对齐方式

使用 `align` 和 `justify` 属性控制子元素的对齐方式。

<Demo>
  <div>
    <p>居中对齐：</p>
    <vk-space align="center" justify="center" style="height: 100px; border: 1px dashed #ccc;">
      <vk-button>按钮1</vk-button>
      <vk-button size="large">大按钮</vk-button>
      <vk-button size="small">小按钮</vk-button>
    </vk-space>
    <p>两端对齐：</p>
    <vk-space justify="space-between" style="width: 100%; border: 1px dashed #ccc;">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>居中对齐：</p>
    <vk-space align="center" justify="center" style="height: 100px; border: 1px dashed #ccc;">
      <vk-button>按钮1</vk-button>
      <vk-button size="large">大按钮</vk-button>
      <vk-button size="small">小按钮</vk-button>
    </vk-space>

    <p>两端对齐：</p>
    <vk-space justify="space-between" style="width: 100%; border: 1px dashed #ccc;">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
    </vk-space>
  </div>
</template>
```

  </template>
</Demo>

## 换行

使用 `wrap` 属性控制是否允许换行。

<Demo>
  <div style="width: 200px;">
    <p>允许换行：</p>
    <vk-space wrap>
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
      <vk-button>按钮4</vk-button>
      <vk-button>按钮5</vk-button>
    </vk-space>
    <p>不允许换行：</p>
    <vk-space :wrap="false">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
      <vk-button>按钮4</vk-button>
      <vk-button>按钮5</vk-button>
    </vk-space>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 200px;">
    <p>允许换行：</p>
    <vk-space wrap>
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
      <vk-button>按钮4</vk-button>
      <vk-button>按钮5</vk-button>
    </vk-space>

    <p>不允许换行：</p>
    <vk-space :wrap="false">
      <vk-button>按钮1</vk-button>
      <vk-button>按钮2</vk-button>
      <vk-button>按钮3</vk-button>
      <vk-button>按钮4</vk-button>
      <vk-button>按钮5</vk-button>
    </vk-space>
  </div>
</template>
```

  </template>
</Demo>

## 行内模式

使用 `inline` 属性将间距组件设置为行内元素。

<Demo>
  <div>
    这是一段文字，
    <vk-space inline size="small">
      <vk-button size="small">按钮1</vk-button>
      <vk-button size="small">按钮2</vk-button>
    </vk-space>
    ，这是另一段文字。
  </div>
  
  <template #code>

```vue
<template>
  <div>
    这是一段文字，
    <vk-space inline size="small">
      <vk-button size="small">按钮1</vk-button>
      <vk-button size="small">按钮2</vk-button>
    </vk-space>
    ，这是另一段文字。
  </div>
</template>
```

  </template>
</Demo>

## 反向排列

使用 `reverse` 属性反向排列子元素。

<Demo>
  <div>
    <p>正常排列：</p>
    <vk-space>
      <vk-button>第一个</vk-button>
      <vk-button>第二个</vk-button>
      <vk-button>第三个</vk-button>
    </vk-space>
    <p>反向排列：</p>
    <vk-space reverse>
      <vk-button>第一个</vk-button>
      <vk-button>第二个</vk-button>
      <vk-button>第三个</vk-button>
    </vk-space>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>正常排列：</p>
    <vk-space>
      <vk-button>第一个</vk-button>
      <vk-button>第二个</vk-button>
      <vk-button>第三个</vk-button>
    </vk-space>

    <p>反向排列：</p>
    <vk-space reverse>
      <vk-button>第一个</vk-button>
      <vk-button>第二个</vk-button>
      <vk-button>第三个</vk-button>
    </vk-space>
  </div>
</template>
```

  </template>
</Demo>

## 分隔符

使用分隔符分隔子元素。

<Demo>
  <vk-space>
    <vk-button>按钮1</vk-button>
    <vk-divider vertical />
    <vk-button>按钮2</vk-button>
    <vk-divider vertical />
    <vk-button>按钮3</vk-button>
  </vk-space>
  
  <template #code>

```vue
<template>
  <vk-space>
    <vk-button>按钮1</vk-button>
    <vk-divider vertical />
    <vk-button>按钮2</vk-button>
    <vk-divider vertical />
    <vk-button>按钮3</vk-button>
  </vk-space>
</template>
```

  </template>
</Demo>

## API

### Props

| 名称     | 类型                                          | 默认值    | 说明                               |
| -------- | --------------------------------------------- | --------- | ---------------------------------- |
| size     | `ComponentSize \| number \| [number, number]` | `'small'` | 间距大小，可以是预设值或自定义数值 |
| vertical | `boolean`                                     | `false`   | 是否为垂直布局                     |
| align    | `SpaceAlign`                                  | `'start'` | 对齐方式                           |
| justify  | `SpaceJustify`                                | `'start'` | 主轴对齐方式                       |
| wrap     | `boolean`                                     | `false`   | 是否自动换行                       |
| inline   | `boolean`                                     | `false`   | 是否为行内元素                     |
| reverse  | `boolean`                                     | `false`   | 是否反向排列                       |

### 类型定义

```typescript
type ComponentSize = "tiny" | "small" | "medium" | "large";

type SpaceAlign = "start" | "end" | "center" | "baseline" | "stretch";

type SpaceJustify = "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
```
