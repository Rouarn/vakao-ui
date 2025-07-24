# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

## 基础用法

从场景上说，MessageBox 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt`，因此适合展示较为简单的内容。

<Demo>
  <vk-button @click="handleAlert">点击打开 Message Box</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleAlert">点击打开 Message Box</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleAlert = () => {
  VkMessageBox.alert('这是一段内容', '标题名称')
    .then(() => {
      console.log('确认')
    })
    .catch(() => {
      console.log('取消')
    })
}
</script>
```

  </template>
</Demo>

## 确认消息

调用 `VkMessageBox.confirm` 方法即可打开消息提示，它模拟了系统的 `confirm`。

<Demo>
  <vk-button @click="handleConfirm">点击打开确认框</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleConfirm">点击打开确认框</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleConfirm = () => {
  VkMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    type: 'warning'
  })
    .then(() => {
      console.log('确认删除')
    })
    .catch(() => {
      console.log('取消删除')
    })
}
</script>
```

  </template>
</Demo>

## 提交内容

调用 `VkMessageBox.prompt` 方法即可打开消息提示，它模拟了系统的 `prompt`。可以用 `inputPattern` 字段或 `inputValidator` 字段来规定用户的输入。

<Demo>
  <vk-button @click="handlePrompt">点击打开输入框</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handlePrompt">点击打开输入框</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handlePrompt = () => {
  VkMessageBox.prompt('请输入邮箱', '提示', {
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '邮箱格式不正确'
  })
    .then(({ value }) => {
      console.log('输入的邮箱:', value)
    })
    .catch(() => {
      console.log('取消输入')
    })
}
</script>
```

  </template>
</Demo>

## 自定义验证

使用 `inputValidator` 属性可以自定义验证逻辑。

<Demo>
  <vk-button @click="handleCustomValidator">自定义验证</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCustomValidator">自定义验证</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleCustomValidator = () => {
  VkMessageBox.prompt('请输入用户名', '提示', {
    inputValidator: (value) => {
      if (!value) {
        return '用户名不能为空'
      }
      if (value.length < 3) {
        return '用户名至少3个字符'
      }
      if (value.length > 20) {
        return '用户名不能超过20个字符'
      }
      return true
    }
  })
    .then(({ value }) => {
      console.log('输入的用户名:', value)
    })
    .catch(() => {
      console.log('取消输入')
    })
}
</script>
```

  </template>
</Demo>

## 不同类型

用于显示「成功、警告、消息、错误」类的操作反馈。

<Demo>
  <vk-button @click="() => showMessage('success')">成功</vk-button>
  <vk-button @click="() => showMessage('warning')">警告</vk-button>
  <vk-button @click="() => showMessage('info')">消息</vk-button>
  <vk-button @click="() => showMessage('error')">错误</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="() => showMessage('success')">成功</vk-button>
  <vk-button @click="() => showMessage('warning')">警告</vk-button>
  <vk-button @click="() => showMessage('info')">消息</vk-button>
  <vk-button @click="() => showMessage('error')">错误</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const showMessage = (type) => {
  const messages = {
    success: '恭喜你，这是一条成功消息',
    warning: '警告哦，这是一条警告消息',
    info: '这是一条消息提示',
    error: '错了哦，这是一条错误消息'
  }
  
  VkMessageBox.alert(messages[type], '提示', {
    type
  })
}
</script>
```

  </template>
</Demo>

## 自定义按钮文字

可以自定义确认和取消按钮的文字。

<Demo>
  <vk-button @click="handleCustomButtons">自定义按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCustomButtons">自定义按钮</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleCustomButtons = () => {
  VkMessageBox.confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
    confirmText: '保存',
    cancelText: '放弃修改',
    type: 'warning'
  })
    .then(() => {
      console.log('保存修改')
    })
    .catch(() => {
      console.log('放弃修改')
    })
}
</script>
```

  </template>
</Demo>

## 关闭行为配置

可以配置点击遮罩层和按下 ESC 键的关闭行为。

<Demo>
  <vk-button @click="handleNoModalClose">禁用遮罩关闭</vk-button>
  <vk-button @click="handleNoEscClose">禁用ESC关闭</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleNoModalClose">禁用遮罩关闭</vk-button>
  <vk-button @click="handleNoEscClose">禁用ESC关闭</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleNoModalClose = () => {
  VkMessageBox.alert('点击遮罩层无法关闭', '提示', {
    closeOnClickModal: false
  })
}

const handleNoEscClose = () => {
  VkMessageBox.alert('按下ESC键无法关闭', '提示', {
    closeOnPressEscape: false
  })
}
</script>
```

  </template>
</Demo>

## 隐藏关闭按钮

可以隐藏右上角的关闭按钮。

<Demo>
  <vk-button @click="handleNoClose">隐藏关闭按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleNoClose">隐藏关闭按钮</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleNoClose = () => {
  VkMessageBox.confirm('没有关闭按钮，只能通过底部按钮操作', '提示', {
    showClose: false
  })
}
</script>
```

  </template>
</Demo>

## 自定义样式

支持通过 `customClass` 和 `customStyle` 属性自定义样式。

<Demo>
  <vk-button @click="handleCustomStyle">自定义样式</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCustomStyle">自定义样式</vk-button>
</template>

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleCustomStyle = () => {
  VkMessageBox.alert('这是一个自定义样式的消息框', '自定义样式', {
    customClass: 'custom-message-box',
    customStyle: {
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
    }
  })
}
</script>

<style>
.custom-message-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-message-box .vk-message-box__title {
  color: white;
}

.custom-message-box .vk-message-box__message {
  color: rgba(255, 255, 255, 0.9);
}
</style>
```

  </template>
</Demo>

## 全局方法

VkMessageBox 提供了全局方法，可以通过应用实例的全局属性访问。

```javascript
// 完整引入 Vakao UI
import { createApp } from 'vue'
import VakaoUI from '@vakao-ui/components'

const app = createApp(App)
app.use(VakaoUI)

// 在组件中使用 (Composition API)
<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const open = () => {
  // 使用全局方法
  proxy.$alert('这是一段内容', '标题名称', {
    confirmText: '确定'
  }).then(() => {
    console.log('确认')
  }).catch(() => {
    console.log('取消')
  })
}
</script>

// 或者直接导入使用 (推荐)
<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const open = () => {
  VkMessageBox.alert('这是一段内容', '标题名称', {
    confirmText: '确定'
  }).then(() => {
    console.log('确认')
  }).catch(() => {
    console.log('取消')
  })
}
</script>
```

## 单独引用

单独引入 MessageBox：

```javascript
import { VkMessageBox } from '@vakao-ui/components'
```

对应的方法为：`VkMessageBox`、`VkMessageBox.alert`、`VkMessageBox.confirm` 和 `VkMessageBox.prompt`。

## API

### Options

| 参数                | 说明                                                         | 类型                                        | 可选值                                | 默认值  |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------- | ------------------------------------- | ------- |
| title               | MessageBox 标题                                              | string                                      | —                                     | 提示    |
| message             | MessageBox 消息正文内容                                      | string                                      | —                                     | —       |
| type                | 消息类型，用于显示图标                                       | string                                      | success / info / warning / error     | info    |
| customClass         | MessageBox 的自定义类名                                      | string                                      | —                                     | —       |
| customStyle         | MessageBox 的自定义样式                                      | string / object                             | —                                     | —       |
| showClose           | 是否显示右上角关闭按钮                                       | boolean                                     | —                                     | true    |
| showConfirmButton   | 是否显示确定按钮                                             | boolean                                     | —                                     | true    |
| showCancelButton    | 是否显示取消按钮                                             | boolean                                     | —                                     | false   |
| confirmText         | 确定按钮的文本内容                                           | string                                      | —                                     | 确定    |
| cancelText          | 取消按钮的文本内容                                           | string                                      | —                                     | 取消    |
| closeOnClickModal   | 是否可通过点击遮罩关闭 MessageBox                            | boolean                                     | —                                     | true    |
| closeOnPressEscape  | 是否可通过按下 ESC 键关闭 MessageBox                        | boolean                                     | —                                     | true    |
| showInput           | 是否显示输入框                                               | boolean                                     | —                                     | false   |
| inputPlaceholder    | 输入框的占位符                                               | string                                      | —                                     | —       |
| inputValue          | 输入框的初始文本                                             | string                                      | —                                     | —       |
| inputPattern        | 输入框的校验表达式                                           | regexp                                      | —                                     | —       |
| inputValidator      | 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage | function                                    | —                                     | —       |
| inputErrorMessage   | 校验失败时的提示文本                                         | string                                      | —                                     | —       |

### Methods

调用 `VkMessageBox` 会返回一个 `Promise` 对象，便于进行后续操作的处理。如果用户确认，返回的 `Promise` 对象会 resolve，否则会 reject。

| 方法名  | 说明                                                         | 参数                                                         |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| alert   | 显示警告框                                                   | message, title, options 或 message, options                 |
| confirm | 显示确认框                                                   | message, title, options 或 message, options                 |
| prompt  | 显示输入框                                                   | message, title, options 或 message, options                 |
| close   | 关闭当前的 MessageBox                                        | —                                                            |

### 返回值

- **confirm**: 返回 Promise，resolve 时返回 `{ action: 'confirm', instance, value? }`
- **alert**: 返回 Promise，resolve 时返回 `{ action: 'confirm', instance }`  
- **prompt**: 返回 Promise，resolve 时返回 `{ action: 'confirm', instance, value }`，其中 `value` 为输入框的值

当用户取消操作时，Promise 会 reject，返回 `{ action: 'cancel' | 'close', instance, value? }`。

<script setup>
import { VkMessageBox } from '@vakao-ui/components'

const handleAlert = () => {
  VkMessageBox.alert('这是一段内容', '标题名称')
    .then(() => {
      console.log('确认')
    })
    .catch(() => {
      console.log('取消')
    })
}

const handleConfirm = () => {
  VkMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    type: 'warning'
  })
    .then(() => {
      console.log('确认删除')
    })
    .catch(() => {
      console.log('取消删除')
    })
}

const handlePrompt = () => {
  VkMessageBox.prompt('请输入邮箱', '提示', {
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '邮箱格式不正确'
  })
    .then(({ value }) => {
      console.log('输入的邮箱:', value)
    })
    .catch(() => {
      console.log('取消输入')
    })
}

const handleCustomValidator = () => {
  VkMessageBox.prompt('请输入用户名', '提示', {
    inputValidator: (value) => {
      if (!value) {
        return '用户名不能为空'
      }
      if (value.length < 3) {
        return '用户名至少3个字符'
      }
      if (value.length > 20) {
        return '用户名不能超过20个字符'
      }
      return true
    }
  })
    .then(({ value }) => {
      console.log('输入的用户名:', value)
    })
    .catch(() => {
      console.log('取消输入')
    })
}

const showMessage = (type) => {
  const messages = {
    success: '恭喜你，这是一条成功消息',
    warning: '警告哦，这是一条警告消息',
    info: '这是一条消息提示',
    error: '错了哦，这是一条错误消息'
  }
  
  VkMessageBox.alert(messages[type], '提示', {
    type
  })
}

const handleCustomButtons = () => {
  VkMessageBox.confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
    confirmText: '保存',
    cancelText: '放弃修改',
    type: 'warning'
  })
    .then(() => {
      console.log('保存修改')
    })
    .catch(() => {
      console.log('放弃修改')
    })
}

const handleNoModalClose = () => {
  VkMessageBox.alert('点击遮罩层无法关闭', '提示', {
    closeOnClickModal: false
  })
}

const handleNoEscClose = () => {
  VkMessageBox.alert('按下ESC键无法关闭', '提示', {
    closeOnPressEscape: false
  })
}

const handleNoClose = () => {
  VkMessageBox.confirm('没有关闭按钮，只能通过底部按钮操作', '提示', {
    showClose: false
  })
}

const handleCustomStyle = () => {
  VkMessageBox.alert('这是一个自定义样式的消息框', '自定义样式', {
    customClass: 'custom-message-box',
    customStyle: {
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
    }
  })
}
</script>

<style>
.custom-message-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-message-box .vk-message-box__title {
  color: white;
}

.custom-message-box .vk-message-box__message {
  color: rgba(255, 255, 255, 0.9);
}
</style>