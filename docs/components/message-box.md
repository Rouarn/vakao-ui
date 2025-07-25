# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。MessageBox 提供了 `alert`、`confirm` 和 `prompt` 三种基本类型，支持多种自定义配置。

:::tip 提示
从场景上说，MessageBox 的作用是美化系统自带的 `alert`、`confirm` 和 `prompt`，因此适合展示较为简单的内容。如果需要更复杂的交互，建议使用 Dialog 组件。
:::

## 基础用法

最简单的消息提示，类似于系统的 `alert`。

<Demo>
  <vk-button @click="handleAlert">点击打开 Message Box</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleAlert">点击打开 Message Box</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleAlert = () => {
  VkMessageBox.alert("这是一段内容", "标题名称")
    .then(() => {
      console.log("确认");
    })
    .catch(() => {
      console.log("取消");
    });
};
</script>
```

  </template>
</Demo>

## 确认消息

用于需要用户确认的操作，提供确认和取消两个选项。

<Demo>
  <vk-button type="warning" @click="handleConfirm">点击打开确认框</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button type="warning" @click="handleConfirm">点击打开确认框</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

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
</script>
```

  </template>
</Demo>

## 提交内容

用于需要用户输入内容的场景，支持输入验证。可以使用 `inputPattern` 正则表达式或 `inputValidator` 函数来验证用户输入。

<Demo>
  <vk-button type="info" @click="handlePrompt">点击打开输入框</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button type="info" @click="handlePrompt">点击打开输入框</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handlePrompt = () => {
  VkMessageBox.prompt("请输入邮箱", "提示", {
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: "邮箱格式不正确",
  })
    .then(({ value }) => {
      console.log("输入的邮箱:", value);
    })
    .catch(() => {
      console.log("取消输入");
    });
};
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
import { VkMessageBox } from "vakao-ui";

const handleCustomValidator = () => {
  VkMessageBox.prompt("请输入用户名", "提示", {
    inputValidator: value => {
      if (!value) {
        return "用户名不能为空";
      }
      if (value.length < 3) {
        return "用户名至少3个字符";
      }
      if (value.length > 20) {
        return "用户名不能超过20个字符";
      }
      return true;
    },
  })
    .then(({ value }) => {
      console.log("输入的用户名:", value);
    })
    .catch(() => {
      console.log("取消输入");
    });
};
</script>
```

  </template>
</Demo>

## 消息类型

支持四种消息类型：`success`（成功）、`warning`（警告）、`info`（信息）、`error`（错误），每种类型都有对应的图标和颜色。

<Demo>
  <vk-button type="success" @click="() => showMessage('success')">成功</vk-button>
  <vk-button type="warning" @click="() => showMessage('warning')">警告</vk-button>
  <vk-button type="info" @click="() => showMessage('info')">消息</vk-button>
  <vk-button type="danger" @click="() => showMessage('error')">错误</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button type="success" @click="() => showMessage('success')">
    成功
  </vk-button>
  <vk-button type="warning" @click="() => showMessage('warning')">
    警告
  </vk-button>
  <vk-button type="info" @click="() => showMessage('info')">消息</vk-button>
  <vk-button type="danger" @click="() => showMessage('error')">错误</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const showMessage = type => {
  const messages = {
    success: "恭喜你，这是一条成功消息",
    warning: "警告哦，这是一条警告消息",
    info: "这是一条消息提示",
    error: "错了哦，这是一条错误消息",
  };

  VkMessageBox.alert(messages[type], "提示", {
    type,
  });
};
</script>
```

  </template>
</Demo>

## 自定义按钮

可以自定义确认和取消按钮的文字内容，以适应不同的业务场景。

<Demo>
  <vk-button @click="handleCustomButtons">自定义按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCustomButtons">自定义按钮</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleCustomButtons = () => {
  VkMessageBox.confirm(
    "检测到未保存的内容，是否在离开页面前保存修改？",
    "确认信息",
    {
      confirmText: "保存",
      cancelText: "放弃修改",
      type: "warning",
    }
  )
    .then(() => {
      console.log("保存修改");
    })
    .catch(() => {
      console.log("放弃修改");
    });
};
</script>
```

  </template>
</Demo>

## 关闭行为

可以控制用户通过点击遮罩层或按下 ESC 键关闭弹框的行为。

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
import { VkMessageBox } from "vakao-ui";

const handleNoModalClose = () => {
  VkMessageBox.alert("点击遮罩层无法关闭", "提示", {
    closeOnClickModal: false,
  });
};

const handleNoEscClose = () => {
  VkMessageBox.alert("按下ESC键无法关闭", "提示", {
    closeOnPressEscape: false,
  });
};
</script>
```

  </template>
</Demo>

## 隐藏关闭按钮

在某些场景下，可以隐藏右上角的关闭按钮，强制用户通过底部按钮进行操作。

<Demo>
  <vk-button @click="handleNoClose">隐藏关闭按钮</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleNoClose">隐藏关闭按钮</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleNoClose = () => {
  VkMessageBox.confirm("没有关闭按钮，只能通过底部按钮操作", "提示", {
    showClose: false,
  });
};
</script>
```

  </template>
</Demo>

## 自定义样式

支持通过 `customClass` 和 `customStyle` 属性自定义弹框的外观样式。

<Demo>
  <vk-button @click="handleCustomStyle">自定义样式</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCustomStyle">自定义样式</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleCustomStyle = () => {
  VkMessageBox.alert("这是一个自定义样式的消息框", "自定义样式", {
    customClass: "custom-message-box",
    customStyle: {
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },
  });
};
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

## 使用方式

### 直接导入（推荐）

```javascript
import { VkMessageBox } from "vakao-ui";

// 使用
VkMessageBox.alert("消息内容", "标题");
VkMessageBox.confirm("确认内容", "标题");
VkMessageBox.prompt("输入提示", "标题");
```

### 全局方法

完整引入 Vakao UI 后，可以通过全局属性访问：

```javascript
// main.js
import { createApp } from 'vue'
import VakaoUI from 'vakao-ui'

const app = createApp(App)
app.use(VakaoUI)

// 组件中使用
<script setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const showAlert = () => {
  proxy.$alert('消息内容', '标题')
}
</script>
```

## 方法说明

### 基本方法

| 方法                   | 说明         | 参数                          | 返回值                                                       |
| ---------------------- | ------------ | ----------------------------- | ------------------------------------------------------------ |
| `VkMessageBox.alert`   | 警告框       | `(message, title?, options?)` | `Promise<{ action: 'confirm', instance }>`                   |
| `VkMessageBox.confirm` | 确认框       | `(message, title?, options?)` | `Promise<{ action: 'confirm'\|'cancel', instance }>`         |
| `VkMessageBox.prompt`  | 输入框       | `(message, title?, options?)` | `Promise<{ action: 'confirm'\|'cancel', instance, value? }>` |
| `VkMessageBox.close`   | 关闭当前弹框 | `()`                          | `void`                                                       |

### 参数说明

- **message**: 消息内容（必填）
- **title**: 标题（可选，默认为 "提示"）
- **options**: 配置选项（可选）

## API

### 配置选项 (Options)

| 参数               | 说明                                                                                               | 类型            | 可选值                           | 默认值 |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------- | -------------------------------- | ------ |
| title              | MessageBox 标题                                                                                    | string          | —                                | 提示   |
| message            | MessageBox 消息正文内容                                                                            | string          | —                                | —      |
| type               | 消息类型，用于显示图标                                                                             | string          | success / info / warning / error | info   |
| customClass        | MessageBox 的自定义类名                                                                            | string          | —                                | —      |
| customStyle        | MessageBox 的自定义样式                                                                            | string / object | —                                | —      |
| showClose          | 是否显示右上角关闭按钮                                                                             | boolean         | —                                | true   |
| showConfirmButton  | 是否显示确定按钮                                                                                   | boolean         | —                                | true   |
| showCancelButton   | 是否显示取消按钮                                                                                   | boolean         | —                                | false  |
| confirmText        | 确定按钮的文本内容                                                                                 | string          | —                                | 确定   |
| cancelText         | 取消按钮的文本内容                                                                                 | string          | —                                | 取消   |
| closeOnClickModal  | 是否可通过点击遮罩关闭 MessageBox                                                                  | boolean         | —                                | true   |
| closeOnPressEscape | 是否可通过按下 ESC 键关闭 MessageBox                                                               | boolean         | —                                | true   |
| showInput          | 是否显示输入框                                                                                     | boolean         | —                                | false  |
| inputPlaceholder   | 输入框的占位符                                                                                     | string          | —                                | —      |
| inputValue         | 输入框的初始文本                                                                                   | string          | —                                | —      |
| inputPattern       | 输入框的校验表达式                                                                                 | regexp          | —                                | —      |
| inputValidator     | 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage | function        | —                                | —      |
| inputErrorMessage  | 校验失败时的提示文本                                                                               | string          | —                                | —      |

### Promise 返回值

所有方法都返回 Promise 对象，便于处理用户操作结果：

```javascript
// 成功时 resolve
VkMessageBox.alert("消息").then(result => {
  console.log(result.action); // 'confirm'
});

// 取消时 reject
VkMessageBox.confirm("确认吗？").catch(result => {
  console.log(result.action); // 'cancel' 或 'close'
});

// prompt 返回输入值
VkMessageBox.prompt("请输入").then(result => {
  console.log(result.value); // 用户输入的内容
});
```

### 常见用法示例

```javascript
// 简单警告
VkMessageBox.alert("操作成功！");

// 带标题的确认
VkMessageBox.confirm("确定要删除吗？", "危险操作", {
  type: "warning",
});

// 输入验证
VkMessageBox.prompt("请输入用户名", "注册", {
  inputValidator: value => {
    if (!value) return "用户名不能为空";
    if (value.length < 3) return "用户名至少3个字符";
    return true;
  },
});

// 自定义按钮
VkMessageBox.confirm("是否保存？", "提示", {
  confirmText: "保存",
  cancelText: "不保存",
  type: "info",
});
```

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
