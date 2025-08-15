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
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
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
    inputValidator: (value) => {
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
  <vk-button type="success" @click="() => showMessage('success')"> 成功 </vk-button>
  <vk-button type="warning" @click="() => showMessage('warning')"> 警告 </vk-button>
  <vk-button type="info" @click="() => showMessage('info')">消息</vk-button>
  <vk-button type="danger" @click="() => showMessage('error')">错误</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const showMessage = (type) => {
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
  VkMessageBox.confirm("检测到未保存的内容，是否在离开页面前保存修改？", "确认信息", {
    confirmText: "保存",
    cancelText: "放弃修改",
    type: "warning",
  })
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

### 组件形式使用

除了函数式调用，也可以直接在模板中使用组件：

```vue
<template>
  <VkMessageBox v-model:visible="visible" title="标题" message="消息内容" type="info" @action="handleAction" />
</template>

<script setup>
import { ref } from "vue";
import { VkMessageBox } from "vakao-ui";

const visible = ref(false);

const handleAction = (action, instance) => {
  console.log("用户操作:", action);
  visible.value = false;
};
</script>
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
| `VkMessageBox.alert`   | 警告框       | `(message, title?, options?)` | `Promise<{ action: 'confirm', instance, value? }>`           |
| `VkMessageBox.confirm` | 确认框       | `(message, title?, options?)` | `Promise<{ action: 'confirm'\|'cancel', instance, value? }>` |
| `VkMessageBox.prompt`  | 输入框       | `(message, title?, options?)` | `Promise<{ action: 'confirm'\|'cancel', instance, value? }>` |
| `VkMessageBox.close`   | 关闭当前弹框 | `()`                          | `void`                                                       |

### 参数说明

- **message**: 消息内容（必填）
- **title**: 标题（可选，默认为 "提示"）
- **options**: 配置选项（可选）

## 回调模式使用

除了 Promise 模式，MessageBox 还支持回调模式，通过配置回调函数来处理用户操作。回调模式特别适合需要在用户操作后执行异步任务的场景。

<Demo>
  <vk-button @click="handleCallbackDemo">回调模式演示</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCallbackDemo">回调模式演示</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleCallbackDemo = () => {
  VkMessageBox.confirm("确认删除这条记录吗？", "删除确认", {
    type: "warning",
    onAction: (action, instance, done) => {
      if (action === "confirm") {
        console.log("开始删除...");
        // 模拟异步删除操作
        setTimeout(() => {
          console.log("删除完成");
          done(); // 关闭弹框
        }, 1500);
      } else {
        console.log("用户取消删除");
        done(); // 关闭弹框
      }
    },
    onClose: () => {
      console.log("弹框已关闭");
    },
  });
};
</script>
```

  </template>
</Demo>

### onAction 回调

当用户点击按钮时触发，提供三个参数：

- `action`: 用户操作类型 ('confirm' | 'cancel')
- `instance`: MessageBox 实例对象
- `done`: 关闭弹框的函数

```javascript
VkMessageBox.confirm("确认提交表单吗？", "提交确认", {
  onAction: (action, instance, done) => {
    if (action === "confirm") {
      // 执行提交操作
      submitForm()
        .then(() => {
          console.log("提交成功");
          done(); // 关闭弹框
        })
        .catch(() => {
          console.log("提交失败");
          // 不调用 done()，保持弹框打开
        });
    } else {
      done(); // 直接关闭
    }
  },
});
```

### onClose 回调

当弹框关闭时触发，适合执行清理操作：

<Demo>
  <vk-button @click="handleCloseCallback">onClose 回调演示</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCloseCallback">onClose 回调演示</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleCloseCallback = () => {
  VkMessageBox.alert("操作完成", "提示", {
    onClose: () => {
      console.log("弹框已关闭，执行清理操作");
      // 可以在这里执行页面跳转、数据刷新等操作
    },
  });
};
</script>
```

  </template>
</Demo>

### beforeClose 回调

在弹框关闭前触发，可以进行验证或阻止关闭：

<Demo>
  <vk-button @click="handleBeforeClose">beforeClose 回调演示</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleBeforeClose">beforeClose 回调演示</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleBeforeClose = () => {
  VkMessageBox.prompt("请输入用户名（至少3个字符）", "验证输入", {
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        const value = instance.value;
        if (!value || value.length < 3) {
          instance.inputErrorMessage = "用户名至少3个字符";
          return false; // 阻止关闭
        }
      }
      done(); // 允许关闭
    },
  });
};
</script>
```

  </template>
</Demo>

### 回调函数组合使用

多个回调可以同时使用，实现复杂的交互逻辑：

<Demo>
  <vk-button @click="handleCombinedCallbacks">组合回调演示</vk-button>
  
  <template #code>

```vue
<template>
  <vk-button @click="handleCombinedCallbacks">组合回调演示</vk-button>
</template>

<script setup>
import { VkMessageBox } from "vakao-ui";

const handleCombinedCallbacks = () => {
  VkMessageBox.confirm("确认提交表单吗？", "提交确认", {
    type: "info",
    onAction: (action, instance, done) => {
      if (action === "confirm") {
        console.log("用户确认提交，开始处理...");
        // 这里不调用 done()，让 beforeClose 处理异步操作
      } else {
        console.log("用户取消提交");
        done();
      }
    },
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        // 模拟异步提交操作
        console.log("正在提交...");
        setTimeout(() => {
          console.log("提交成功");
          done(); // 异步操作完成后关闭
        }, 2000);
      } else {
        done();
      }
    },
    onClose: () => {
      console.log("操作完成，弹框已关闭");
    },
  });
};
</script>
```

  </template>
</Demo>

### Promise 返回值

所有方法都返回 Promise 对象，便于处理用户操作结果：

```javascript
// alert 方法
VkMessageBox.alert("操作成功", "提示")
  .then(({ action, instance, value }) => {
    console.log("用户点击了确定按钮", action); // 'confirm'
  })
  .catch(() => {
    console.log("用户关闭了弹框");
  });

// confirm 方法
VkMessageBox.confirm("确认删除吗？", "删除确认")
  .then(({ action, instance, value }) => {
    if (action === "confirm") {
      console.log("用户确认删除");
    } else {
      console.log("用户取消删除");
    }
  })
  .catch(() => {
    console.log("用户关闭了弹框");
  });

// prompt 方法
VkMessageBox.prompt("请输入用户名", "登录")
  .then(({ action, instance, value }) => {
    if (action === "confirm") {
      console.log("用户输入的内容:", value);
    }
  })
  .catch(() => {
    console.log("用户取消了输入");
  });

// 使用 async/await
async function handleConfirm() {
  try {
    const { action, value } = await VkMessageBox.prompt("请输入密码", "验证");
    if (action === "confirm") {
      console.log("密码:", value);
    }
  } catch (error) {
    console.log("用户取消操作");
  }
}
```

### 返回值说明

| 属性     | 说明                                   | 类型   |
| -------- | -------------------------------------- | ------ |
| action   | 用户操作类型 ('confirm' \| 'cancel')   | string |
| instance | MessageBox 实例对象                    | object |
| value    | 输入框的值（仅 prompt 方法或有输入时） | string |

## 常见用法示例

```javascript
// 简单警告
VkMessageBox.alert("操作成功！");

// 带标题的确认
VkMessageBox.confirm("确定要删除吗？", "危险操作", {
  type: "warning",
});

// 输入验证
VkMessageBox.prompt("请输入用户名", "注册", {
  inputValidator: (value) => {
    if (!value) return "用户名不能为空";
    if (value.length < 3) return "用户名至少3个字符";
    return true;
  },
});

// 自定义样式
VkMessageBox.confirm("确认提交吗？", "提交确认", {
  customClass: "my-message-box",
  customStyle: { borderRadius: "10px" },
  confirmText: "立即提交",
  cancelText: "稍后再说",
});
```

## HTML 内容渲染

如果需要在消息内容中使用 HTML，需要使用 VNode 而不是 HTML 字符串：

```javascript
import { h } from "vue";
import { VkMessageBox } from "vakao-ui";

// ❌ 错误：HTML 字符串不会被解析
VkMessageBox.alert("<strong>警告：</strong>此操作不可逆！", "提示");

// ✅ 正确：使用 VNode
VkMessageBox.alert(h("div", [h("strong", { style: { color: "red" } }, "警告："), "此操作不可逆！"]), "提示");

// ✅ 或者使用 JSX（需要配置 JSX 支持）
VkMessageBox.alert(
  <div>
    <strong style={{ color: "red" }}>警告：</strong>
    此操作不可逆！
  </div>,
  "提示",
);
```

### 复杂 HTML 内容示例

```javascript
import { h } from "vue";

// 创建包含多种元素的复杂内容
const complexMessage = h(
  "div",
  {
    style: { lineHeight: "1.6" },
  },
  [
    h("p", { style: { margin: "0 0 10px 0" } }, [h("strong", { style: { color: "#e74c3c" } }, "重要提醒："), "以下操作将会："]),
    h("ul", { style: { margin: "10px 0", paddingLeft: "20px" } }, [
      h("li", "删除所有相关数据"),
      h("li", "清空缓存信息"),
      h("li", "重置用户配置"),
    ]),
    h("p", { style: { margin: "10px 0 0 0", fontSize: "12px", color: "#666" } }, "此操作不可撤销，请谨慎操作！"),
  ],
);

VkMessageBox.confirm(complexMessage, "确认删除", {
  type: "warning",
  confirmText: "确认删除",
  cancelText: "取消",
});
```

## API

### 配置选项 (Options)

| 参数               | 说明                                                                                               | 类型            | 可选值                           | 默认值 |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------- | -------------------------------- | ------ |
| title              | MessageBox 标题                                                                                    | string          | —                                | 提示   |
| message            | MessageBox 消息正文内容，支持字符串或 VNode                                                        | string / VNode  | —                                | —      |
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
| onAction           | 当用户点击按钮时的回调函数                                                                         | function        | —                                | —      |
| onClose            | 当弹框关闭时的回调函数                                                                             | function        | —                                | —      |
| beforeClose        | 关闭前的回调，返回 false 或 Promise.reject 时阻止关闭                                              | function        | —                                | —      |
| inputErrorMessage  | 校验失败时的提示文本                                                                               | string          | —                                | —      |

## 注意事项

1. **Promise vs 回调**: 可以选择使用 Promise 模式或回调模式，两者可以同时使用
2. **实例管理**: 同一时间只能显示一个 MessageBox 实例
3. **输入验证**: 使用 `inputValidator` 进行输入验证，返回字符串表示错误信息
4. **样式定制**: 通过 `customClass` 和 `customStyle` 进行样式定制
5. **关闭控制**: 使用 `beforeClose` 可以阻止弹框关闭，适用于异步操作场景
6. **HTML 渲染**: 不支持 HTML 字符串解析，需要使用 VNode 来实现富文本内容

<script setup>
import { VkMessageBox } from "@vakao-ui/components";
import { h } from "vue";

// 基础用法 - Alert
const handleAlert = () => {
  VkMessageBox.alert("这是一段内容", "标题名称")
    .then(() => {
      console.log("确认");
    })
    .catch(() => {
      console.log("取消");
    });
};

// 确认消息
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

// 提交内容 - Prompt
const handlePrompt = () => {
  VkMessageBox.prompt("请输入邮箱", "提示", {
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: "邮箱格式不正确",
  })
    .then(({ value }) => {
      console.log("输入的邮箱:", value);
    })
    .catch(() => {
      console.log("取消输入");
    });
};

// 自定义验证
const handleCustomValidator = () => {
  VkMessageBox.prompt("请输入用户名", "提示", {
    inputValidator: (value) => {
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

// 消息类型
const showMessage = (type) => {
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

// 自定义按钮
const handleCustomButtons = () => {
  VkMessageBox.confirm("检测到未保存的内容，是否在离开页面前保存修改？", "确认信息", {
    confirmText: "保存",
    cancelText: "放弃修改",
    type: "warning",
  })
    .then(() => {
      console.log("保存修改");
    })
    .catch(() => {
      console.log("放弃修改");
    });
};

// 禁用遮罩关闭
const handleNoModalClose = () => {
  VkMessageBox.alert("点击遮罩层无法关闭", "提示", {
    closeOnClickModal: false,
  });
};

// 禁用ESC关闭
const handleNoEscClose = () => {
  VkMessageBox.alert("按下ESC键无法关闭", "提示", {
    closeOnPressEscape: false,
  });
};

// 隐藏关闭按钮
const handleNoClose = () => {
  VkMessageBox.confirm("没有关闭按钮，只能通过底部按钮操作", "提示", {
    showClose: false,
  });
};

// 自定义样式
const handleCustomStyle = () => {
  VkMessageBox.alert("这是一个自定义样式的消息框", "自定义样式", {
    customClass: "custom-message-box",
    customStyle: {
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },
  });
};

// 回调模式演示
const handleCallbackDemo = () => {
  VkMessageBox.confirm("确认删除这条记录吗？", "删除确认", {
    type: "warning",
    onAction: (action, instance, done) => {
      if (action === "confirm") {
        console.log("开始删除...");
        // 模拟异步删除操作
        setTimeout(() => {
          console.log("删除完成");
          done(); // 关闭弹框
        }, 1500);
      } else {
        console.log("用户取消删除");
        done(); // 关闭弹框
      }
    },
    onClose: () => {
      console.log("弹框已关闭");
    },
  });
};

// onClose 回调演示
const handleCloseCallback = () => {
  VkMessageBox.alert("操作完成", "提示", {
    onClose: () => {
      console.log("弹框已关闭，执行清理操作");
      // 可以在这里执行页面跳转、数据刷新等操作
    },
  });
};

// beforeClose 回调演示
const handleBeforeClose = () => {
  VkMessageBox.prompt("请输入用户名（至少3个字符）", "验证输入", {
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        const value = instance.value;
        if (!value || value.length < 3) {
          instance.inputErrorMessage = "用户名至少3个字符";
          return false; // 阻止关闭
        }
      }
      done(); // 允许关闭
    },
  });
};

// 组合回调演示
const handleCombinedCallbacks = () => {
  VkMessageBox.confirm("确认提交表单吗？", "提交确认", {
    type: "info",
    onAction: (action, instance, done) => {
      if (action === "confirm") {
        console.log("用户确认提交，开始处理...");
        // 这里不调用 done()，让 beforeClose 处理异步操作
      } else {
        console.log("用户取消提交");
        done();
      }
    },
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        // 模拟异步提交操作
        console.log("正在提交...");
        setTimeout(() => {
          console.log("提交成功");
          done(); // 异步操作完成后关闭
        }, 2000);
      } else {
        done();
      }
    },
    onClose: () => {
      console.log("操作完成，弹框已关闭");
    },
  });
};
</script>
