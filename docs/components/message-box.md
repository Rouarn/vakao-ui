# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

## 基础用法

从场景上说，MessageBox 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt`，因此适合展示较为简单的内容。

<Demo>
  <div class="demo-message-box">
    <vk-button @click="handleAlert">Alert</vk-button>
    <vk-button @click="handleConfirm" type="primary">Confirm</vk-button>
    <vk-button @click="handlePrompt" type="success">Prompt</vk-button>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="handleAlert">Alert</vk-button>
    <vk-button @click="handleConfirm" type="primary">Confirm</vk-button>
    <vk-button @click="handlePrompt" type="success">Prompt</vk-button>
  </div>
</template>


```

  </template>
</Demo>

## 不同类型

用于显示「成功、警告、消息、错误」类的操作反馈。

<Demo>
  <div class="demo-message-box">
    <vk-button @click="handleSuccess" type="success">成功</vk-button>
    <vk-button @click="handleWarning" type="warning">警告</vk-button>
    <vk-button @click="handleInfo" type="info">消息</vk-button>
    <vk-button @click="handleError" type="danger">错误</vk-button>
  </div>
  
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
```

  </template>
</Demo>

## Prompt 输入验证

可以对用户输入进行验证，支持自定义验证函数和正则表达式验证。

<Demo>
  <div class="demo-message-box">
    <vk-button @click="handlePromptBasic" type="primary">基础输入</vk-button>
    <vk-button @click="handlePromptValidator" type="success">自定义验证</vk-button>
    <vk-button @click="handlePromptPattern" type="warning">正则验证</vk-button>
  </div>
  
  <script setup>
  import { VkMessageBox } from "@vakao-ui/components";
  
  const handlePromptBasic = () => {
    VkMessageBox.prompt("请输入您的姓名", "用户信息", {
      inputPlaceholder: "请输入姓名"
    })
      .then((result) => {
        console.log("输入的姓名：", result.value);
      })
      .catch(() => {
        console.log("取消输入");
      });
  };
  
  const handlePromptValidator = () => {
    VkMessageBox.prompt("请输入您的邮箱地址", "邮箱验证", {
      inputPlaceholder: "example@domain.com",
      inputValidator: (value) => {
        if (!value) {
          return "邮箱地址不能为空";
        }
        if (!value.includes("@")) {
          return "请输入有效的邮箱地址";
        }
        return true;
      }
    })
      .then((result) => {
        console.log("验证通过，邮箱：", result.value);
      })
      .catch(() => {
        console.log("取消输入");
      });
  };
  
  const handlePromptPattern = () => {
    VkMessageBox.prompt("请输入手机号码（11位数字）", "手机号验证", {
      inputPlaceholder: "13800138000",
      inputPattern: /^1[3-9]\\d{9}$/
    })
      .then((result) => {
        console.log("手机号验证通过：", result.value);
      })
      .catch(() => {
        console.log("取消输入");
      });
  };
  </script>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="handlePromptBasic" type="primary">基础输入</vk-button>
    <vk-button @click="handlePromptValidator" type="success"
      >自定义验证</vk-button
    >
    <vk-button @click="handlePromptPattern" type="warning">正则验证</vk-button>
  </div>
</template>


```

  </template>
</Demo>

## 自定义按钮文字

可以自定义确认和取消按钮的文字。

<Demo>
  <div class="demo-message-box">
    <vk-button @click="handleCustomText" type="primary">自定义按钮文字</vk-button>
  </div>
  
  <script setup>
  import { VkMessageBox } from "@vakao-ui/components";
  
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
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="handleCustomText" type="primary">
      自定义按钮文字
    </vk-button>
  </div>
</template>
```

  </template>
</Demo>

## API

### MessageBox 方法

| 方法名  | 说明                | 参数                          | 返回值                      |
| ------- | ------------------- | ----------------------------- | --------------------------- |
| alert   | 显示警告对话框      | `(message, title?, options?)` | `Promise<MessageBoxResult>` |
| confirm | 显示确认对话框      | `(message, title?, options?)` | `Promise<MessageBoxResult>` |
| prompt  | 显示提示对话框      | `(message, title?, options?)` | `Promise<MessageBoxResult>` |
| close   | 关闭当前 MessageBox | —                             | —                           |

### MessageBoxResult

| 名称     | 类型                  | 说明                                             |
| -------- | --------------------- | ------------------------------------------------ |
| action   | `MessageBoxAction`    | 用户操作类型：`'confirm' \| 'cancel' \| 'close'` |
| instance | `MessageBoxInstance`  | MessageBox 实例                                  |
| value    | `string \| undefined` | 用户输入的值（仅 prompt 方法返回）               |

### MessageBox Options

| 名称               | 类型                                          | 默认值   | 说明                                       |
| ------------------ | --------------------------------------------- | -------- | ------------------------------------------ |
| title              | `string`                                      | `'提示'` | 标题                                       |
| message            | `string`                                      | —        | 消息内容                                   |
| type               | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` | 消息类型                                   |
| confirmText        | `string`                                      | `'确定'` | 确认按钮文字                               |
| cancelText         | `string`                                      | `'取消'` | 取消按钮文字                               |
| showConfirmButton  | `boolean`                                     | `true`   | 是否显示确认按钮                           |
| showCancelButton   | `boolean`                                     | `false`  | 是否显示取消按钮                           |
| showClose          | `boolean`                                     | `true`   | 是否显示关闭按钮                           |
| closeOnClickModal  | `boolean`                                     | `true`   | 点击遮罩层是否关闭                         |
| closeOnPressEscape | `boolean`                                     | `true`   | 按下 ESC 键是否关闭                        |
| customClass        | `string`                                      | —        | 自定义类名                                 |
| customStyle        | `string \| object`                            | —        | 自定义样式                                 |
| showInput          | `boolean`                                     | `false`  | 是否显示输入框（prompt 方法自动设为 true） |
| inputPlaceholder   | `string`                                      | —        | 输入框占位符                               |
| inputValue         | `string`                                      | —        | 输入框默认值                               |
| inputPattern       | `RegExp`                                      | —        | 输入验证正则表达式                         |
| inputValidator     | `(value: string) => boolean \| string`        | —        | 自定义验证函数，返回 true 或错误信息       |
| inputErrorMessage  | `string`                                      | —        | 输入错误提示信息                           |

<style scoped>
.demo-message-box {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
