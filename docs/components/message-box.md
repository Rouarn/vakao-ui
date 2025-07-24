# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

## 基础用法

从场景上说，MessageBox 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt`，因此适合展示较为简单的内容。

<Demo>
  <template #demo>
    <div class="demo-message-box">
      <vk-button @click="handleAlert">Alert</vk-button>
      <vk-button @click="handleConfirm" type="primary">Confirm</vk-button>
      <vk-button @click="handlePrompt" type="success">Prompt</vk-button>
    </div>
  </template>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="handleAlert">Alert</vk-button>
    <vk-button @click="handleConfirm" type="primary">Confirm</vk-button>
    <vk-button @click="handlePrompt" type="success">Prompt</vk-button>
  </div>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleAlert = () => {
  VkMessageBox.alert("这是一条消息提示", "提示", {
    type: "info",
  }).then(() => {
    console.log("确认");
  });
};

const handleConfirm = () => {
  VkMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    type: "warning",
  })
    .then(() => {
      console.log("确认删除");
    })
    .catch(() => {
      console.log("取消删除");
    });
};

const handlePrompt = () => {
  VkMessageBox.prompt("请输入邮箱", "提示", {
    type: "info",
  })
    .then(() => {
      console.log("确认输入");
    })
    .catch(() => {
      console.log("取消输入");
    });
};
</script>
```

  </template>
</Demo>

## 不同类型

用于显示「成功、警告、消息、错误」类的操作反馈。

<Demo>
  <template #demo>
    <div class="demo-message-box">
      <vk-button @click="handleSuccess" type="success">成功</vk-button>
      <vk-button @click="handleWarning" type="warning">警告</vk-button>
      <vk-button @click="handleInfo" type="info">消息</vk-button>
      <vk-button @click="handleError" type="danger">错误</vk-button>
    </div>
  </template>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="handleSuccess" type="success">成功</vk-button>
    <vk-button @click="handleWarning" type="warning">警告</vk-button>
    <vk-button @click="handleInfo" type="info">消息</vk-button>
    <vk-button @click="handleError" type="danger">错误</vk-button>
  </div>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleSuccess = () => {
  VkMessageBox.alert("操作成功！", "成功", {
    type: "success",
  });
};

const handleWarning = () => {
  VkMessageBox.alert("这是一条警告消息", "警告", {
    type: "warning",
  });
};

const handleInfo = () => {
  VkMessageBox.alert("这是一条消息提示", "消息", {
    type: "info",
  });
};

const handleError = () => {
  VkMessageBox.alert("操作失败！", "错误", {
    type: "error",
  });
};
</script>
```

  </template>
</Demo>

## 自定义按钮文字

可以自定义确认和取消按钮的文字。

<Demo>
  <template #demo>
    <div class="demo-message-box">
      <vk-button @click="handleCustomText" type="primary">自定义按钮文字</vk-button>
    </div>
  </template>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="handleCustomText" type="primary">
      自定义按钮文字
    </vk-button>
  </div>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleCustomText = () => {
  VkMessageBox.confirm("Switch to a new value. Continue?", "Warning", {
    confirmText: "Yes",
    cancelText: "No",
    type: "warning",
  })
    .then(() => {
      console.log("用户点击了 Yes");
    })
    .catch(() => {
      console.log("用户点击了 No");
    });
};
</script>
```

  </template>
</Demo>

## API

### MessageBox 方法

| 方法名  | 说明                | 参数                          | 返回值                      |
| ------- | ------------------- | ----------------------------- | --------------------------- |
| alert   | 显示警告对话框      | `(message, title?, options?)` | `Promise<MessageBoxAction>` |
| confirm | 显示确认对话框      | `(message, title?, options?)` | `Promise<MessageBoxAction>` |
| prompt  | 显示提示对话框      | `(message, title?, options?)` | `Promise<MessageBoxAction>` |
| close   | 关闭当前 MessageBox | —                             | —                           |

### MessageBox Options

| 名称               | 类型                                          | 默认值   | 说明                |
| ------------------ | --------------------------------------------- | -------- | ------------------- |
| title              | `string`                                      | `'提示'` | 标题                |
| message            | `string`                                      | —        | 消息内容            |
| type               | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | 消息类型            |
| confirmText        | `string`                                      | `'确定'` | 确认按钮文字        |
| cancelText         | `string`                                      | `'取消'` | 取消按钮文字        |
| showConfirmButton  | `boolean`                                     | `true`   | 是否显示确认按钮    |
| showCancelButton   | `boolean`                                     | `false`  | 是否显示取消按钮    |
| showClose          | `boolean`                                     | `true`   | 是否显示关闭按钮    |
| closeOnClickModal  | `boolean`                                     | `true`   | 点击遮罩层是否关闭  |
| closeOnPressEscape | `boolean`                                     | `true`   | 按下 ESC 键是否关闭 |
| customClass        | `string`                                      | —        | 自定义类名          |
| customStyle        | `string \| object`                            | —        | 自定义样式          |

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleAlert = () => {
  VkMessageBox.alert('这是一条消息提示', '提示', {
    type: 'info'
  }).then(() => {
    console.log('确认')
  })
}

const handleConfirm = () => {
  VkMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    type: 'warning'
  }).then(() => {
    console.log('确认删除')
  }).catch(() => {
    console.log('取消删除')
  })
}

const handlePrompt = () => {
  VkMessageBox.prompt('请输入邮箱', '提示', {
    type: 'info'
  }).then(() => {
    console.log('确认输入')
  }).catch(() => {
    console.log('取消输入')
  })
}

const handleSuccess = () => {
  VkMessageBox.alert('操作成功！', '成功', {
    type: 'success'
  })
}

const handleWarning = () => {
  VkMessageBox.alert('这是一条警告消息', '警告', {
    type: 'warning'
  })
}

const handleInfo = () => {
  VkMessageBox.alert('这是一条消息提示', '消息', {
    type: 'info'
  })
}

const handleError = () => {
  VkMessageBox.alert('操作失败！', '错误', {
    type: 'error'
  })
}

const handleCustomText = () => {
  VkMessageBox.confirm("Switch to a new value. Continue?", "Warning", {
    confirmText: "Yes",
    cancelText: "No",
    type: "warning",
  }).then(() => {
    console.log('用户点击了 Yes')
  }).catch(() => {
    console.log('用户点击了 No')
  })
}
</script>

<style scoped>
.demo-message-box {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
