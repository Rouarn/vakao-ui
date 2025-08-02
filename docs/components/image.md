# Image 图片

图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等。

## 基础用法

可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

<Demo>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      fit="fill"
    />
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      fit="contain"
    />
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      fit="cover"
    />
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      fit="none"
    />
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      fit="scale-down"
    />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" fit="fill" />
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" fit="contain" />
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" fit="cover" />
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" fit="none" />
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" fit="scale-down" />
  </div>
</template>
```

  </template>
</Demo>

## 占位内容

可通过`slot = placeholder`可自定义占位内容。

<Demo>
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
    >
      <template #loading>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f7fa; color: #909399;">
          加载中...
        </div>
      </template>
    </vk-image>
    <vk-image
      style="width: 100px; height: 100px"
      src="https://empty"
    >
      <template #error>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f7fa; color: #909399;">
          加载失败
        </div>
      </template>
    </vk-image>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100">
      <template #loading>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f7fa; color: #909399;">
          加载中...
        </div>
      </template>
    </vk-image>

    <vk-image style="width: 100px; height: 100px" src="https://empty">
      <template #error>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f7fa; color: #909399;">
          加载失败
        </div>
      </template>
    </vk-image>
  </div>
</template>
```

  </template>
</Demo>

## 懒加载

可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。

<Demo>
  <div style="height: 200px; overflow-y: auto; border: 1px solid #dcdfe6; padding: 16px; width: 100%;">
    <div v-for="i in 10" :key="i" style="margin-bottom: 16px;">
      <vk-image
        style="width: 100px; height: 100px"
        :src="`https://picsum.photos/100/100`"
        lazy
      />
      <span style="margin-left: 16px;">图片 {{ i }}</span>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="height: 200px; overflow-y: auto; border: 1px solid #dcdfe6; padding: 16px; width: 100%;">
    <div v-for="i in 10" :key="i" style="margin-bottom: 16px;">
      <vk-image style="width: 100px; height: 100px" :src="`https://picsum.photos/100/100`" lazy />
      <span style="margin-left: 16px;">图片 {{ i }}</span>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 图片预览

可通过 `preview` 开启预览功能。

<Demo>
  <div style="display: flex; gap: 16px; width: 100%;">
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      preview
    />
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      preview
    />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" preview />
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" preview />
  </div>
</template>
```

  </template>
</Demo>

## 图片组预览

可通过 `preview-src-list` 开启图片组预览功能。

<Demo>
  <div style="display: flex; gap: 16px;">
    <vk-image
      v-for="(src, index) in imageList"
      :key="src"
      style="width: 100px; height: 100px"
      :src="src"
      :preview-src-list="imageList"
      :initial-index="index"
      preview
    />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px;">
    <vk-image
      v-for="(src, index) in imageList"
      :key="src"
      style="width: 100px; height: 100px"
      :src="src"
      :preview-src-list="imageList"
      :initial-index="index"
      preview
    />
  </div>
</template>

<script setup>
const imageList = [
  "https://picsum.photos/100/100",
  "https://picsum.photos/100/100",
  "https://picsum.photos/100/100",
  "https://picsum.photos/100/100",
];
</script>
```

  </template>
</Demo>

<script setup>
const imageList = [
  'https://picsum.photos/100/100',
  'https://picsum.photos/100/100',
  'https://picsum.photos/100/100',
  'https://picsum.photos/100/100',
]
</script>

## 不同尺寸

Image 组件提供四种尺寸，可以在不同场景下选择合适的图片尺寸。

<Demo>
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <div style="text-align: center;">
      <vk-image
        size="tiny"
        src="https://picsum.photos/100/100"
      />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">tiny</div>
    </div>
    <div style="text-align: center;">
      <vk-image
        size="small"
        src="https://picsum.photos/100/100"
      />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">small</div>
    </div>
    <div style="text-align: center;">
      <vk-image
        size="medium"
        src="https://picsum.photos/100/100"
      />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">medium</div>
    </div>
    <div style="text-align: center;">
      <vk-image
        size="large"
        src="https://picsum.photos/100/100"
      />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">large</div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <div style="text-align: center;">
      <vk-image size="tiny" src="https://picsum.photos/100/100" />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">tiny</div>
    </div>
    <div style="text-align: center;">
      <vk-image size="small" src="https://picsum.photos/100/100" />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">small</div>
    </div>
    <div style="text-align: center;">
      <vk-image size="medium" src="https://picsum.photos/100/100" />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">medium</div>
    </div>
    <div style="text-align: center;">
      <vk-image size="large" src="https://picsum.photos/100/100" />
      <div style="margin-top: 8px; font-size: 12px; color: #909399;">large</div>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 圆形图片

可通过 `round` 属性设置为圆形图片。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <div style="width: 100px; height: 100px;">
      <vk-image
        style="width: 100px; height: 100px"
        src="https://picsum.photos/100/100"
        round
      />
    </div>
    <div style="width: 100px; height: 100px;">
      <vk-image
        style="width: 100px; height: 100px"
        src="https://picsum.photos/100/100"
        round
      />
    </div>
    <div style="width: 100px; height: 100px;">
      <vk-image
        style="width: 100px; height: 100px"
        src="https://picsum.photos/100/100"
        round
      />
    </div>
    <div style="width: 100px; height: 100px;">
      <vk-image
        size="large"
        src="https://picsum.photos/100/100"
        round
      />
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" round />
    <vk-image size="large" src="https://picsum.photos/100/100" round />
  </div>
</template>
```

  </template>
</Demo>

## 自定义圆角

可通过 `radius` 属性自定义圆角大小。

<Demo>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      :radius="4"
    />
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      :radius="12"
    />
    <vk-image
      style="width: 100px; height: 100px"
      src="https://picsum.photos/100/100"
      radius="20px"
    />
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" :radius="4" />
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" :radius="12" />
    <vk-image style="width: 100px; height: 100px" src="https://picsum.photos/100/100" radius="20px" />
  </div>
</template>
```

  </template>
</Demo>

## API

### Image 属性

| 属性名             | 说明                                                                                                     | 类型                    | 可选值                                     | 默认值 |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------ | ------ |
| src                | 图片源地址，同原生属性一致                                                                               | string                  | —                                          | —      |
| alt                | 原生 alt 属性                                                                                            | string                  | —                                          | —      |
| fit                | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string                  | fill / contain / cover / none / scale-down | cover  |
| width              | 图片宽度                                                                                                 | string / number         | —                                          | —      |
| height             | 图片高度                                                                                                 | string / number         | —                                          | —      |
| size               | 图片尺寸                                                                                                 | string                  | tiny / small / medium / large              | medium |
| lazy               | 是否开启懒加载                                                                                           | boolean                 | —                                          | false  |
| preview            | 是否开启图片预览功能                                                                                     | boolean                 | —                                          | false  |
| preview-src-list   | 开启图片预览功能时，预览的图片链接列表                                                                   | Array                   | —                                          | —      |
| initial-index      | 初始预览图片索引，小于等于 `preview-src-list` 的长度                                                     | number                  | —                                          | 0      |
| preview-teleported | 预览弹窗是否插入至 body 元素下                                                                           | boolean                 | —                                          | true   |
| placeholder        | 自定义加载中占位图片                                                                                     | string                  | —                                          | —      |
| fallback           | 自定义加载失败占位图片                                                                                   | string                  | —                                          | —      |
| loading            | 是否显示加载状态                                                                                         | boolean                 | —                                          | true   |
| radius             | 图片圆角大小                                                                                             | string / number         | —                                          | —      |
| round              | 是否为圆形图片                                                                                           | boolean                 | —                                          | false  |
| disabled           | 是否禁用图片                                                                                             | boolean                 | —                                          | false  |
| custom-class       | 自定义样式类名                                                                                           | string / Array / Object | —                                          | —      |
| custom-style       | 自定义样式                                                                                               | string / Object         | —                                          | —      |
| scroll-container   | 懒加载时的滚动容器                                                                                       | string / Object         | —                                          | —      |

### Image 事件

| 事件名         | 说明             | 回调参数        |
| -------------- | ---------------- | --------------- |
| load           | 图片加载成功触发 | (e: Event)      |
| error          | 图片加载失败触发 | (e: Event)      |
| click          | 图片点击事件     | (e: MouseEvent) |
| preview        | 预览打开时触发   | (index: number) |
| preview-close  | 预览关闭时触发   | —               |
| preview-switch | 预览切换时触发   | (index: number) |

### Image 插槽

| 插槽名       | 说明               |
| ------------ | ------------------ |
| loading      | 自定义加载中内容   |
| error        | 自定义加载失败内容 |
| loading-text | 自定义加载中文本   |
| error-text   | 自定义加载失败文本 |

### Image 方法

通过 ref 可以获取到 Image 实例并调用实例方法。

| 方法名        | 说明                 | 参数 | 返回值          |
| ------------- | -------------------- | ---- | --------------- |
| reload        | 手动触发图片重新加载 | —    | —               |
| openPreview   | 打开预览             | —    | —               |
| closePreview  | 关闭预览             | —    | —               |
| getLoadStatus | 获取当前加载状态     | —    | ImageLoadStatus |

## 类型定义

```typescript
type ImageFit = "fill" | "contain" | "cover" | "none" | "scale-down";
type ImageSize = "tiny" | "small" | "medium" | "large";
type ImageLoadStatus = "loading" | "loaded" | "error";

interface ImageInstance {
  reload: () => void;
  openPreview: () => void;
  closePreview: () => void;
  getLoadStatus: () => ImageLoadStatus;
}
```

## 主题定制

Image 组件使用了以下 CSS 变量，可以进行主题定制：

```css
:root {
  --vk-image-bg-color: var(--vk-bg-color-page);
  --vk-image-loading-color: var(--vk-color-primary);
  --vk-image-error-color: var(--vk-color-danger);
  --vk-image-preview-bg-color: rgba(0, 0, 0, 0.8);
  --vk-image-preview-toolbar-bg: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
}
```
