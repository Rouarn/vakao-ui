# Message 消息

消息组件用于显示全局提示信息，通常从页面顶部滑入显示。支持多种类型、自动关闭、手动关闭等功能。

## 基础用法

最简单的用法，显示一条信息消息。

<Demo>
  <vk-button @click="showMessage">显示消息</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showMessage">显示消息</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showMessage = () => {
  VkMessage("这是一条消息");
};
</script>
```

  </template>
</Demo>

## 不同类型

消息支持多种类型，用于表示不同的语义。

<Demo>
  <vk-button @click="showSuccess" type="success">成功</vk-button>
  <vk-button @click="showWarning" type="warning">警告</vk-button>
  <vk-button @click="showError" type="danger">错误</vk-button>
  <vk-button @click="showInfo" type="info">信息</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showSuccess" type="success">成功</vk-button>
  <vk-button @click="showWarning" type="warning">警告</vk-button>
  <vk-button @click="showError" type="danger">错误</vk-button>
  <vk-button @click="showInfo" type="info">信息</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showSuccess = () => {
  VkMessage.success("操作成功！");
};

const showWarning = () => {
  VkMessage.warning("请注意检查输入内容");
};

const showError = () => {
  VkMessage.error("操作失败，请重试");
};

const showInfo = () => {
  VkMessage.info("这是一条信息提示");
};
</script>
```

  </template>
</Demo>

## 可关闭

可以添加关闭按钮，允许用户手动关闭消息。

<Demo>
  <vk-button @click="showClosableMessage">可关闭消息</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showClosableMessage">可关闭消息</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showClosableMessage = () => {
  VkMessage({
    message: "这是一条可关闭的消息",
    type: "success",
    closable: true,
    duration: 0, // 设置为 0 表示不自动关闭
  });
};
</script>
```

  </template>
</Demo>

## 自定义持续时间

可以自定义消息的显示时长。

<Demo>
  <vk-button @click="showLongMessage">长时间显示</vk-button>
  <vk-button @click="showShortMessage">短时间显示</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showLongMessage">长时间显示</vk-button>
  <vk-button @click="showShortMessage">短时间显示</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showLongMessage = () => {
  VkMessage({
    message: "这条消息会显示 10 秒",
    type: "info",
    duration: 10000,
  });
};

const showShortMessage = () => {
  VkMessage({
    message: "这条消息会显示 1 秒",
    type: "warning",
    duration: 1000,
  });
};
</script>
```

  </template>
</Demo>

## 不同位置

可以设置消息显示的位置。

<Demo>
  <vk-button @click="showTopMessage">顶部居中</vk-button>
  <vk-button @click="showTopLeftMessage">左上角</vk-button>
  <vk-button @click="showTopRightMessage">右上角</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showTopMessage">顶部显示</vk-button>
  <vk-button @click="showTopLeftMessage">左上角显示</vk-button>
  <vk-button @click="showTopRightMessage">右上角显示</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showTopMessage = () => {
  VkMessage({
    message: "顶部居中显示",
    position: "top",
  });
};

const showTopLeftMessage = () => {
  VkMessage({
    message: "左上角显示",
    position: "top-left",
  });
};

const showTopRightMessage = () => {
  VkMessage({
    message: "右上角显示",
    position: "top-right",
  });
};
</script>
```

  </template>
</Demo>

## 自定义图标

可以自定义消息的图标。

<Demo>
  <vk-button @click="showCustomIconMessage">自定义图标</vk-button>
  <vk-button @click="showNoIconMessage">无图标</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showCustomIconMessage">自定义图标</vk-button>
  <vk-button @click="showNoIconMessage">无图标</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showCustomIconMessage = () => {
  VkMessage({
    message: "自定义图标消息",
    icon: "mdi:heart",
    type: "primary",
  });
};

const showNoIconMessage = () => {
  VkMessage({
    message: "无图标消息",
    showIcon: false,
  });
};
</script>
```

  </template>
</Demo>

## 消息堆叠

同一位置的多个消息会自动堆叠显示，最新的消息在上方。

<Demo>
  <vk-button @click="showStackedMessages">显示堆叠消息</vk-button>
  <vk-button @click="showDifferentPositions">不同位置消息</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showStackedMessages">显示堆叠消息</vk-button>
  <vk-button @click="showDifferentPositions">不同位置消息</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showStackedMessages = () => {
  VkMessage.success("第一条消息");
  setTimeout(() => VkMessage.warning("第二条消息"), 500);
  setTimeout(() => VkMessage.info("第三条消息"), 1000);
};

const showDifferentPositions = () => {
  VkMessage({ message: "顶部居中", position: "top" });
  VkMessage({ message: "左上角", position: "top-left" });
  VkMessage({ message: "右上角", position: "top-right" });
};
</script>
```

  </template>
</Demo>

## 最大消息数量配置

可以配置同时显示的最大消息数量，超出时会自动关闭最旧的消息。

<Demo>
  <vk-button @click="setMaxCount3">设置最大3条</vk-button>
  <vk-button @click="setMaxCount5">设置最大5条</vk-button>
  <vk-button @click="showManyMessages">显示多条消息</vk-button>
  <vk-button @click="getCurrentMaxCount">获取当前最大数量</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="setMaxCount3">设置最大3条</vk-button>
  <vk-button @click="setMaxCount5">设置最大5条</vk-button>
  <vk-button @click="showManyMessages">显示多条消息</vk-button>
  <vk-button @click="getCurrentMaxCount">获取当前最大数量</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const setMaxCount3 = () => {
  VkMessage.setMaxCount(3);
  VkMessage.success("已设置最大消息数量为3条");
};

const setMaxCount5 = () => {
  VkMessage.setMaxCount(5);
  VkMessage.success("已设置最大消息数量为5条");
};

const showManyMessages = () => {
  for (let i = 1; i <= 8; i++) {
    setTimeout(() => {
      VkMessage.info(`第${i}条消息`);
    }, i * 200);
  }
};

const getCurrentMaxCount = () => {
  const maxCount = VkMessage.getMaxCount();
  VkMessage.info(`当前最大消息数量：${maxCount}`);
};
</script>
```

  </template>
</Demo>

## 全局方法

Message 提供了一些全局方法来管理消息。

<Demo>
  <vk-button @click="showMultipleMessages">显示多条消息</vk-button>
  <vk-button @click="closeAllMessages">关闭所有消息</vk-button>
  <vk-button @click="getMessageCount">获取消息数量</vk-button>
  <vk-button @click="getPositionCount">获取顶部消息数量</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="showMultipleMessages">显示多条消息</vk-button>
  <vk-button @click="closeAllMessages">关闭所有消息</vk-button>
  <vk-button @click="getMessageCount">获取消息数量</vk-button>
  <vk-button @click="getPositionCount">获取顶部消息数量</vk-button>
</template>

<script setup>
import { VkMessage } from "vakao-ui";

const showMultipleMessages = () => {
  VkMessage.success("消息1");
  VkMessage.warning("消息2");
  VkMessage.danger("消息3");
};

const closeAllMessages = () => {
  VkMessage.closeAll();
};

const getMessageCount = () => {
  const count = VkMessage.getCount();
  VkMessage.info(`当前消息数量：${count}`);
};

const getPositionCount = () => {
  const count = VkMessage.getCountByPosition("top");
  VkMessage.info(`顶部消息数量：${count}`);
};
</script>
```

  </template>
</Demo>

## API

### Props

| 名称                     | 类型                                                                                         | 默认值   | 说明                                      |
| ------------------------ | -------------------------------------------------------------------------------------------- | -------- | ----------------------------------------- |
| type                     | `'default' &vert; 'primary' &vert; 'success' &vert; 'warning' &vert; 'danger' &vert; 'info'` | `'info'` | 消息类型                                  |
| message                  | `string`                                                                                     | —        | 消息内容                                  |
| duration                 | `number`                                                                                     | `3000`   | 显示时长，单位毫秒。设为 0 则不会自动关闭 |
| closable                 | `boolean`                                                                                    | `true`   | 是否可关闭                                |
| showIcon                 | `boolean`                                                                                    | `true`   | 是否显示图标                              |
| icon                     | `string &vert; VNode`                                                                        | —        | 自定义图标                                |
| position                 | `'top' &vert; 'top-left' &vert; 'top-right'`                                                 | `'top'`  | 消息位置                                  |
| offset                   | `number`                                                                                     | `20`     | 距离顶部的偏移量                          |
| dangerouslyUseHTMLString | `boolean`                                                                                    | `false`  | 是否将 message 属性作为 HTML 片段处理     |
| customClass              | `string`                                                                                     | —        | 自定义类名                                |
| customStyle              | `string &vert; object`                                                                       | —        | 自定义样式                                |
| zIndex                   | `number`                                                                                     | `2000`   | 层级                                      |

### Events

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| close   | —    | 关闭时触发 |
| destroy | —    | 销毁时触发 |

### Methods

| 方法名                       | 说明                   | 参数                                               | 返回值                             |
| ---------------------------- | ---------------------- | -------------------------------------------------- | ---------------------------------- |
| VkMessage                    | 显示消息               | `(message: string)` 或 `(options: MessageOptions)` | `MessageInstance`                  |
| VkMessage.success            | 显示成功消息           | `(message: string)` 或 `(options: MessageOptions)` | `MessageInstance`                  |
| VkMessage.warning            | 显示警告消息           | `(message: string)` 或 `(options: MessageOptions)` | `MessageInstance`                  |
| VkMessage.info               | 显示信息消息           | `(message: string)` 或 `(options: MessageOptions)` | `MessageInstance`                  |
| VkMessage.error              | 显示错误消息           | `(message: string)` 或 `(options: MessageOptions)` | `MessageInstance`                  |
| VkMessage.danger             | 显示危险消息           | `(message: string)` 或 `(options: MessageOptions)` | `MessageInstance`                  |
| VkMessage.primary            | 显示主要消息           | `(message: string)` 或 `(options: MessageOptions)` | `MessageInstance`                  |
| VkMessage.close              | 关闭指定消息           | `(id: string)`                                     | —                                  |
| VkMessage.closeAll           | 关闭所有消息           | —                                                  | —                                  |
| VkMessage.getInstance        | 获取指定消息实例       | `(id: string)`                                     | `MessageInstance &vert; undefined` |
| VkMessage.getAllInstances    | 获取所有消息实例       | —                                                  | `MessageInstance[]`                |
| VkMessage.getCount           | 获取消息数量           | —                                                  | `number`                           |
| VkMessage.getCountByPosition | 获取指定位置的消息数量 | `(position: string)`                               | `number`                           |
| VkMessage.setMaxCount        | 设置最大消息数量       | `(count: number)`                                  | —                                  |
| VkMessage.getMaxCount        | 获取最大消息数量       | —                                                  | `number`                           |
| VkMessage.setMessageGap      | 设置消息间距           | `(gap: number)`                                    | —                                  |
| VkMessage.getMessageGap      | 获取消息间距           | —                                                  | `number`                           |

### MessageInstance

| 属性/方法 | 说明         | 类型         |
| --------- | ------------ | ------------ |
| id        | 消息唯一标识 | `string`     |
| close     | 关闭消息     | `() => void` |

<script setup>
import { VkMessage, VkButton } from '@vakao-ui/components';
import { ref } from 'vue';

// 基础用法
const showMessage = () => {
  VkMessage('这是一条消息');
};

// 不同类型
const showSuccess = () => {
  VkMessage.success('操作成功！');
};

const showWarning = () => {
  VkMessage.warning('请注意检查输入内容');
};

const showError = () => {
  VkMessage.error('操作失败，请重试');
};

const showInfo = () => {
  VkMessage.info('这是一条信息提示');
};

// 可关闭消息
const showClosableMessage = () => {
  VkMessage({
    message: '这是一条可关闭的消息',
    type: 'success',
    closable: true,
    duration: 0 // 设置为 0 表示不自动关闭
  });
};

// 自定义持续时间
const showLongMessage = () => {
  VkMessage({
    message: '这条消息会显示 10 秒',
    type: 'info',
    duration: 10000
  });
};

const showShortMessage = () => {
  VkMessage({
    message: '这条消息会显示 1 秒',
    type: 'warning',
    duration: 1000
  });
};

// 不同位置
const showTopMessage = () => {
  VkMessage({
    message: '顶部居中显示',
    position: 'top'
  });
};

const showTopLeftMessage = () => {
  VkMessage({
    message: '左上角显示',
    position: 'top-left'
  });
};

const showTopRightMessage = () => {
  VkMessage({
    message: '右上角显示',
    position: 'top-right'
  });
};

// 自定义图标
const showCustomIconMessage = () => {
  VkMessage({
    message: '自定义图标消息',
    icon: 'mdi:heart',
    type: 'primary'
  });
};

const showNoIconMessage = () => {
  VkMessage({
    message: '无图标消息',
    showIcon: false
  });
};

// 消息堆叠
const showStackedMessages = () => {
  VkMessage.success("第一条消息");
  setTimeout(() => VkMessage.warning("第二条消息"), 500);
  setTimeout(() => VkMessage.info("第三条消息"), 1000);
};

const showDifferentPositions = () => {
  VkMessage({ message: "顶部居中", position: "top" });
  VkMessage({ message: "左上角", position: "top-left" });
  VkMessage({ message: "右上角", position: "top-right" });
};

// 最大消息数量配置
const setMaxCount3 = () => {
  VkMessage.setMaxCount(3);
  VkMessage.success("已设置最大消息数量为3条");
};

const setMaxCount5 = () => {
  VkMessage.setMaxCount(5);
  VkMessage.success("已设置最大消息数量为5条");
};

const showManyMessages = () => {
  for (let i = 1; i <= 8; i++) {
    setTimeout(() => {
      VkMessage.info(`第${i}条消息`);
    }, i * 200);
  }
};

const getCurrentMaxCount = () => {
  const maxCount = VkMessage.getMaxCount();
  VkMessage.info(`当前最大消息数量：${maxCount}`);
};

// 多条消息和管理
const showMultipleMessages = () => {
  VkMessage.success('第一条消息');
  VkMessage.warning('第二条消息');
  VkMessage.info('第三条消息');
};

const closeAllMessages = () => {
  VkMessage.closeAll();
};

const getMessageCount = () => {
  const count = VkMessage.getCount();
  VkMessage.info(`当前有 ${count} 条活跃消息`);
};

const getPositionCount = () => {
  const count = VkMessage.getCountByPosition("top");
  VkMessage.info(`顶部消息数量：${count}`);
};
</script>
