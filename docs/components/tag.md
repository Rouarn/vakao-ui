# Tag 标签

用于标记和分类的标签组件。

## 基础用法

基础的标签用法。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag>标签一</vk-tag>
    <vk-tag type="primary">标签二</vk-tag>
    <vk-tag type="success">标签三</vk-tag>
    <vk-tag type="warning">标签四</vk-tag>
    <vk-tag type="danger">标签五</vk-tag>
    <vk-tag type="info">标签六</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag>标签一</vk-tag>
    <vk-tag type="primary">标签二</vk-tag>
    <vk-tag type="success">标签三</vk-tag>
    <vk-tag type="warning">标签四</vk-tag>
    <vk-tag type="danger">标签五</vk-tag>
    <vk-tag type="info">标签六</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 可关闭标签

设置 `closable` 属性可以定义一个标签是否可移除。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag closable>标签一</vk-tag>
    <vk-tag type="primary" closable>标签二</vk-tag>
    <vk-tag type="success" closable>标签三</vk-tag>
    <vk-tag type="warning" closable>标签四</vk-tag>
    <vk-tag type="danger" closable>标签五</vk-tag>
    <vk-tag type="info" closable>标签六</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag closable>标签一</vk-tag>
    <vk-tag type="primary" closable>标签二</vk-tag>
    <vk-tag type="success" closable>标签三</vk-tag>
    <vk-tag type="warning" closable>标签四</vk-tag>
    <vk-tag type="danger" closable>标签五</vk-tag>
    <vk-tag type="info" closable>标签六</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 不同尺寸

Tag 组件提供除了默认值以外的四种尺寸，可以在不同场景下选择合适的标签尺寸。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag size="tiny">超小标签</vk-tag>
    <vk-tag size="small">小型标签</vk-tag>
    <vk-tag size="medium">中等标签</vk-tag>
    <vk-tag size="large">大型标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag size="tiny">超小标签</vk-tag>
    <vk-tag size="small">小型标签</vk-tag>
    <vk-tag size="medium">中等标签</vk-tag>
    <vk-tag size="large">大型标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 不同主题

Tag 组件提供了三种不同的主题：`light`、`dark` 和 `plain`。

<Demo>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <h4 style="margin: 0 0 8px 0;">浅色主题（默认）</h4>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <vk-tag theme="light">默认</vk-tag>
        <vk-tag theme="light" type="primary">主要</vk-tag>
        <vk-tag theme="light" type="success">成功</vk-tag>
        <vk-tag theme="light" type="warning">警告</vk-tag>
        <vk-tag theme="light" type="danger">危险</vk-tag>
        <vk-tag theme="light" type="info">信息</vk-tag>
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 8px 0;">深色主题</h4>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <vk-tag theme="dark">默认</vk-tag>
        <vk-tag theme="dark" type="primary">主要</vk-tag>
        <vk-tag theme="dark" type="success">成功</vk-tag>
        <vk-tag theme="dark" type="warning">警告</vk-tag>
        <vk-tag theme="dark" type="danger">危险</vk-tag>
        <vk-tag theme="dark" type="info">信息</vk-tag>
      </div>
    </div>
    <div>
      <h4 style="margin: 0 0 8px 0;">朴素主题</h4>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <vk-tag theme="plain">默认</vk-tag>
        <vk-tag theme="plain" type="primary">主要</vk-tag>
        <vk-tag theme="plain" type="success">成功</vk-tag>
        <vk-tag theme="plain" type="warning">警告</vk-tag>
        <vk-tag theme="plain" type="danger">危险</vk-tag>
        <vk-tag theme="plain" type="info">信息</vk-tag>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <h4>浅色主题（默认）</h4>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <vk-tag theme="light">默认</vk-tag>
        <vk-tag theme="light" type="primary">主要</vk-tag>
        <vk-tag theme="light" type="success">成功</vk-tag>
        <vk-tag theme="light" type="warning">警告</vk-tag>
        <vk-tag theme="light" type="danger">危险</vk-tag>
        <vk-tag theme="light" type="info">信息</vk-tag>
      </div>
    </div>
    <div>
      <h4>深色主题</h4>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <vk-tag theme="dark">默认</vk-tag>
        <vk-tag theme="dark" type="primary">主要</vk-tag>
        <vk-tag theme="dark" type="success">成功</vk-tag>
        <vk-tag theme="dark" type="warning">警告</vk-tag>
        <vk-tag theme="dark" type="danger">危险</vk-tag>
        <vk-tag theme="dark" type="info">信息</vk-tag>
      </div>
    </div>
    <div>
      <h4>朴素主题</h4>
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <vk-tag theme="plain">默认</vk-tag>
        <vk-tag theme="plain" type="primary">主要</vk-tag>
        <vk-tag theme="plain" type="success">成功</vk-tag>
        <vk-tag theme="plain" type="warning">警告</vk-tag>
        <vk-tag theme="plain" type="danger">危险</vk-tag>
        <vk-tag theme="plain" type="info">信息</vk-tag>
      </div>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 圆角标签

通过设置 `round` 属性，可以让标签变为圆角风格。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag round>标签一</vk-tag>
    <vk-tag type="primary" round>标签二</vk-tag>
    <vk-tag type="success" round>标签三</vk-tag>
    <vk-tag type="warning" round>标签四</vk-tag>
    <vk-tag type="danger" round closable>标签五</vk-tag>
    <vk-tag type="info" round closable>标签六</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag round>标签一</vk-tag>
    <vk-tag type="primary" round>标签二</vk-tag>
    <vk-tag type="success" round>标签三</vk-tag>
    <vk-tag type="warning" round>标签四</vk-tag>
    <vk-tag type="danger" round closable>标签五</vk-tag>
    <vk-tag type="info" round closable>标签六</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 自定义颜色

可以自定义标签的背景色和文字颜色。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag color="#6554C0" text-color="#ffffff">自定义颜色</vk-tag>
    <vk-tag color="#FF6B6B" text-color="#ffffff" closable>粉红标签</vk-tag>
    <vk-tag color="#4ECDC4" text-color="#ffffff" round>青色标签</vk-tag>
    <vk-tag color="#45B7D1" text-color="#ffffff" round closable>蓝色标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag color="#6554C0" text-color="#ffffff">自定义颜色</vk-tag>
    <vk-tag color="#FF6B6B" text-color="#ffffff" closable>粉红标签</vk-tag>
    <vk-tag color="#4ECDC4" text-color="#ffffff" round>青色标签</vk-tag>
    <vk-tag color="#45B7D1" text-color="#ffffff" round closable>蓝色标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 禁用状态

通过设置 `disabled` 属性来禁用标签。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag disabled>禁用标签</vk-tag>
    <vk-tag type="primary" disabled>禁用标签</vk-tag>
    <vk-tag type="success" disabled closable>禁用标签</vk-tag>
    <vk-tag type="warning" disabled round>禁用标签</vk-tag>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag disabled>禁用标签</vk-tag>
    <vk-tag type="primary" disabled>禁用标签</vk-tag>
    <vk-tag type="success" disabled closable>禁用标签</vk-tag>
    <vk-tag type="warning" disabled round>禁用标签</vk-tag>
  </div>
</template>
```

  </template>
</Demo>

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的事件来实现。

<Demo>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      @close="handleClose(tag)"
    >
      {{ tag }}
    </vk-tag>
    <div v-if="inputVisible" style="display: flex; gap: 4px; align-items: center;">
      <vk-input
        v-model="inputValue"
        size="small"
        placeholder="输入标签名称"
        style="width: 120px;"
        @keyup.enter="handleInputConfirm"
      />
      <vk-button size="small" @click="handleInputConfirm">
        确定
      </vk-button>
      <vk-button size="small" @click="handleInputCancel">
        取消
      </vk-button>
    </div>
    <vk-button v-else size="small" @click="showInput">
      + 新标签
    </vk-button>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
    <vk-tag v-for="tag in dynamicTags" :key="tag" closable @close="handleClose(tag)">
      {{ tag }}
    </vk-tag>
    <div v-if="inputVisible" style="display: flex; gap: 4px; align-items: center;">
      <vk-input v-model="inputValue" size="small" placeholder="输入标签名称" style="width: 120px;" @keyup.enter="handleInputConfirm" />
      <vk-button size="small" @click="handleInputConfirm"> 确定 </vk-button>
      <vk-button size="small" @click="handleInputCancel"> 取消 </vk-button>
    </div>
    <vk-button v-else size="small" @click="showInput"> + 新标签 </vk-button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const dynamicTags = ref(["标签一", "标签二", "标签三"]);
const inputVisible = ref(false);
const inputValue = ref("");

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const handleInputCancel = () => {
  inputVisible.value = false;
  inputValue.value = "";
};
</script>
```

  </template>
</Demo>

<script setup>
import { ref } from 'vue';

const dynamicTags = ref(['标签一', '标签二', '标签三']);
const inputVisible = ref(false);
const inputValue = ref('');

const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};

const handleInputCancel = () => {
  inputVisible.value = false;
  inputValue.value = '';
};
</script>

## API

### Tag 属性

| 属性名       | 说明           | 类型                | 可选值                                                            | 默认值    |
| ------------ | -------------- | ------------------- | ----------------------------------------------------------------- | --------- |
| type         | 标签类型       | `string`            | `default` / `primary` / `success` / `warning` / `danger` / `info` | `default` |
| size         | 标签尺寸       | `string`            | `tiny` / `small` / `medium` / `large`                             | `medium`  |
| theme        | 标签主题       | `string`            | `light` / `dark` / `plain`                                        | `light`   |
| closable     | 是否可关闭     | `boolean`           | —                                                                 | `false`   |
| disabled     | 是否禁用       | `boolean`           | —                                                                 | `false`   |
| round        | 是否为圆角     | `boolean`           | —                                                                 | `false`   |
| bordered     | 是否显示边框   | `boolean`           | —                                                                 | `true`    |
| color        | 自定义背景色   | `string`            | —                                                                 | —         |
| text-color   | 自定义文字颜色 | `string`            | —                                                                 | —         |
| custom-class | 自定义类名     | `string`            | —                                                                 | —         |
| custom-style | 自定义样式     | `string` / `object` | —                                                                 | —         |

### Tag 事件

| 事件名 | 说明           | 回调参数              |
| ------ | -------------- | --------------------- |
| click  | 点击标签时触发 | `(event: MouseEvent)` |
| close  | 关闭标签时触发 | `(event: MouseEvent)` |

### Tag 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 标签内容 |
