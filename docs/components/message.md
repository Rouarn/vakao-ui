# Message 消息

消息组件用于显示全局提示信息，通常从页面顶部滑入显示。支持多种类型、自动关闭、手动关闭等功能。

## 基础用法

最简单的用法，显示一条信息消息。

```vue
<template>
  <div>
    <VkButton @click="showMessage">显示消息</VkButton>
  </div>
</template>

<script setup>
import { Message } from '@vakao-ui/components';

const showMessage = () => {
  Message('这是一条消息');
};
</script>
```

## 不同类型

消息支持多种类型，用于表示不同的语义。

```vue
<template>
  <div>
    <VkButton @click="showSuccess">成功</VkButton>
    <VkButton @click="showWarning">警告</VkButton>
    <VkButton @click="showError">错误</VkButton>
    <VkButton @click="showInfo">信息</VkButton>
  </div>
</template>

<script setup>
import { Message } from '@vakao-ui/components';

const showSuccess = () => {
  Message.success('操作成功！');
};

const showWarning = () => {
  Message.warning('请注意检查输入内容');
};

const showError = () => {
  Message.error('操作失败，请重试');
};

const showInfo = () => {
  Message.info('这是一条信息提示');
};
</script>
```

## 可关闭

可以添加关闭按钮，允许用户手动关闭消息。

```vue
<template>
  <div>
    <VkButton @click="showClosableMessage">可关闭消息</VkButton>
  </div>
</template>

<script setup>
import { Message } from '@vakao-ui/components';

const showClosableMessage = () => {
  Message({
    message: '这是一条可关闭的消息',
    type: 'success',
    closable: true,
    duration: 0 // 设置为 0 表示不自动关闭
  });
};
</script>
```

## 自定义持续时间

可以自定义消息的显示时长。

```vue
<template>
  <div>
    <VkButton @click="showLongMessage">长时间显示</VkButton>
    <VkButton @click="showShortMessage">短时间显示</VkButton>
  </div>
</template>

<script setup>
import { Message } from '@vakao-ui/components';

const showLongMessage = () => {
  Message({
    message: '这条消息会显示 10 秒',
    type: 'info',
    duration: 10000
  });
};

const showShortMessage = () => {
  Message({
    message: '这条消息会显示 1 秒',
    type: 'warning',
    duration: 1000
  });
};
</script>
```

## 不同位置

可以设置消息显示的位置。

```vue
<template>
  <div>
    <VkButton @click="showTopMessage">顶部居中</VkButton>
    <VkButton @click="showTopLeftMessage">左上角</VkButton>
    <VkButton @click="showTopRightMessage">右上角</VkButton>
  </div>
</template>

<script setup>
import { Message } from '@vakao-ui/components';

const showTopMessage = () => {
  Message({
    message: '顶部居中显示',
    position: 'top'
  });
};

const showTopLeftMessage = () => {
  Message({
    message: '左上角显示',
    position: 'top-left'
  });
};

const showTopRightMessage = () => {
  Message({
    message: '右上角显示',
    position: 'top-right'
  });
};
</script>
```

## 自定义图标

可以自定义消息的图标。

```vue
<template>
  <div>
    <VkButton @click="showCustomIconMessage">自定义图标</VkButton>
    <VkButton @click="showNoIconMessage">无图标</VkButton>
  </div>
</template>

<script setup>
import { Message } from '@vakao-ui/components';

const showCustomIconMessage = () => {
  Message({
    message: '自定义图标消息',
    icon: 'mdi:heart',
    type: 'primary'
  });
};

const showNoIconMessage = () => {
  Message({
    message: '无图标消息',
    showIcon: false
  });
};
</script>
```

## 组件方式使用

除了函数式调用，也可以直接在模板中使用组件。

```vue
<template>
  <div>
    <VkMessage
      v-if="showMessageComponent"
      type="success"
      message="这是组件方式的消息"
      :closable="true"
      @close="handleClose"
    />
    <VkButton @click="toggleMessage">切换消息显示</VkButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VkMessage, VkButton } from '@vakao-ui/components';

const showMessageComponent = ref(false);

const toggleMessage = () => {
  showMessageComponent.value = !showMessageComponent.value;
};

const handleClose = () => {
  showMessageComponent.value = false;
};
</script>
```

## 全局方法

Message 提供了一些全局方法来管理消息。

```vue
<template>
  <div>
    <VkButton @click="showMultipleMessages">显示多条消息</VkButton>
    <VkButton @click="closeAllMessages">关闭所有消息</VkButton>
    <VkButton @click="getMessageCount">获取消息数量</VkButton>
  </div>
</template>

<script setup>
import { Message } from '@vakao-ui/components';

const showMultipleMessages = () => {
  Message.success('第一条消息');
  Message.warning('第二条消息');
  Message.info('第三条消息');
};

const closeAllMessages = () => {
  Message.closeAll();
};

const getMessageCount = () => {
  const count = Message.getCount();
  Message.info(`当前有 ${count} 条活跃消息`);
};
</script>
```

## API

### Message Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 消息类型 | string | default / primary / success / warning / danger / info | info |
| message | 消息内容 | string | — | — |
| duration | 显示时长，单位毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| closable | 是否可关闭 | boolean | — | true |
| showIcon | 是否显示图标 | boolean | — | true |
| icon | 自定义图标 | string / VNode | — | — |
| position | 消息位置 | string | top / top-left / top-right | top |
| offset | 距离顶部的偏移量 | number | — | 20 |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false |
| customClass | 自定义类名 | string | — | — |
| customStyle | 自定义样式 | string / object | — | — |
| zIndex | 层级 | number | — | 2000 |

### Message Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | — |
| destroy | 销毁时触发 | — |

### Message Methods

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Message | 显示消息 | (message: string) 或 (options: MessageOptions) | MessageInstance |
| Message.success | 显示成功消息 | (message: string) 或 (options: MessageOptions) | MessageInstance |
| Message.warning | 显示警告消息 | (message: string) 或 (options: MessageOptions) | MessageInstance |
| Message.info | 显示信息消息 | (message: string) 或 (options: MessageOptions) | MessageInstance |
| Message.error | 显示错误消息 | (message: string) 或 (options: MessageOptions) | MessageInstance |
| Message.danger | 显示危险消息 | (message: string) 或 (options: MessageOptions) | MessageInstance |
| Message.primary | 显示主要消息 | (message: string) 或 (options: MessageOptions) | MessageInstance |
| Message.close | 关闭指定消息 | (id: string) | — |
| Message.closeAll | 关闭所有消息 | — | — |
| Message.getInstance | 获取指定消息实例 | (id: string) | MessageInstance \| undefined |
| Message.getAllInstances | 获取所有消息实例 | — | MessageInstance[] |
| Message.getCount | 获取消息数量 | — | number |

### MessageInstance

| 属性/方法 | 说明 | 类型 |
| --- | --- | --- |
| id | 消息唯一标识 | string |
| close | 关闭消息 | () => void |