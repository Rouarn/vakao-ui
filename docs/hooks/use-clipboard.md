# useClipboard

一个剪贴板操作 Hook，提供剪贴板读取和写入功能，支持现代 Clipboard API 和旧版后备方案。自动处理权限请求和错误处理。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">📋 文本复制</h3>
    <div style="margin-bottom: 16px;">
      <vk-input 
        :value="textToCopy" 
        @input="(value) => textToCopy = value"
        placeholder="输入要复制的文本"
        style="width: 100%; margin-bottom: 12px;"
      />
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <vk-button @click="handleCopy" :disabled="!textToCopy.trim()" type="primary">
          📋 复制文本
        </vk-button>
        <vk-button @click="handleRead" :disabled="!isSupported">
          📖 读取剪贴板
        </vk-button>
        <vk-button @click="copyPreset('Hello, World!')" type="success">
          复制预设文本
        </vk-button>
      </div>
    </div>
    <div v-if="!isSupported" style="padding: 12px; background: #fff7e6; border: 1px solid #ffd591; border-radius: 4px; margin-bottom: 16px;">
      ⚠️ 当前浏览器不支持剪贴板操作
    </div>
    <div v-if="!isSecureContext" style="padding: 12px; background: #fff2f0; border: 1px solid #ffccc7; border-radius: 4px; margin-bottom: 16px;">
      🔒 剪贴板 API 需要在安全上下文（HTTPS）中使用
    </div>
    <div v-if="copyMessage" style="padding: 12px; border-radius: 4px; margin-bottom: 16px;"
         :style="{ background: copySuccess ? '#f6ffed' : '#fff2f0', border: `1px solid ${copySuccess ? '#b7eb8f' : '#ffccc7'}` }">
      {{ copyMessage }}
    </div>
    <div v-if="text" style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <strong>剪贴板内容:</strong>
      <div style="margin-top: 8px; padding: 8px; background: white; border: 1px solid #d9d9d9; border-radius: 4px; font-family: monospace; word-break: break-all;">
        {{ text }}
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-input v-model="textToCopy" placeholder="输入要复制的文本" />

    <vk-button
      @click="handleCopy"
      :disabled="!textToCopy.trim()"
      type="primary"
    >
      📋 复制文本
    </vk-button>
    <vk-button @click="handleRead" :disabled="!isSupported">
      📖 读取剪贴板
    </vk-button>
    <vk-button @click="copyPreset('Hello, World!')" type="success">
      复制预设文本
    </vk-button>

    <div v-if="!isSupported">⚠️ 当前浏览器不支持剪贴板操作</div>

    <div v-if="!isSecureContext">
      🔒 剪贴板 API 需要在安全上下文（HTTPS）中使用
    </div>

    <div v-if="copyMessage">
      {{ copyMessage }}
    </div>

    <div v-if="text">
      <strong>剪贴板内容:</strong>
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vakao-ui/hooks";
import { ref } from "vue";

const textToCopy = ref("");
const copyMessage = ref("");
const copySuccess = ref(false);

const [text, copy, read, isSupported, isSecureContext] = useClipboard({
  onCopy: copiedText => {
    copyMessage.value = `✅ 复制成功: ${copiedText}`;
    copySuccess.value = true;
    setTimeout(() => {
      copyMessage.value = "";
    }, 3000);
  },
  onError: error => {
    copyMessage.value = `❌ 复制失败: ${error.message}`;
    copySuccess.value = false;
    setTimeout(() => {
      copyMessage.value = "";
    }, 3000);
  },
});

const handleCopy = async () => {
  if (textToCopy.value.trim()) {
    await copy(textToCopy.value.trim());
  }
};

const handleRead = async () => {
  try {
    await read();
  } catch (error) {
    copyMessage.value = `❌ 读取失败: ${error.message}`;
    copySuccess.value = false;
    setTimeout(() => {
      copyMessage.value = "";
    }, 3000);
  }
};

const copyPreset = async (preset: string) => {
  await copy(preset);
};
</script>
```

  </template>
</Demo>

## 代码复制示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">💻 代码片段复制</h3>
    <div v-for="(snippet, index) in codeSnippets" :key="index" style="margin-bottom: 16px; border: 1px solid #d9d9d9; border-radius: 8px; overflow: hidden;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #fafafa; border-bottom: 1px solid #d9d9d9;">
        <span style="font-weight: 500;">{{ snippet.title }}</span>
        <vk-button @click="() => copyCode(snippet.code)" size="small" type="primary">
          {{ copiedIndex === index ? '✅ 已复制' : '📋 复制代码' }}
        </vk-button>
      </div>
      <pre style="margin: 0; padding: 16px; background: #f8f8f8; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5; overflow-x: auto;"><code>{{ snippet.code }}</code></pre>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div v-for="(snippet, index) in codeSnippets" :key="index" class="code-block">
      <div class="code-header">
        <span>{{ snippet.title }}</span>
        <vk-button @click="() => copyCode(snippet.code)" size="small" type="primary">
          {{ copiedIndex === index ? '✅ 已复制' : '📋 复制代码' }}
        </vk-button>
      </div>
      <pre class="code-content"><code>{{ snippet.code }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vakao-ui/hooks';
import { ref } from 'vue';

interface CodeSnippet {
  title: string;
  code: string;
}

const copiedIndex = ref<number | null>(null);

const codeSnippets: CodeSnippet[] = [
  {
    title: 'Vue 3 组件',
    code: `<template>
  <div>{{ message }}</div>
</template>

<script setup>
const message = ref('Hello Vue 3!');
</script>`
  },
  {
    title: 'JavaScript 函数',
    code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`
  }
];

const [, copy] = useClipboard();

const copyCode = async (code: string) => {
  const success = await copy(code);
  if (success) {
    const index = codeSnippets.findIndex(snippet => snippet.code === code);
    copiedIndex.value = index;
    setTimeout(() => {
      copiedIndex.value = null;
    }, 2000);
  }
};
</script>

<style scoped>
.code-block {
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fafafa;
  border-bottom: 1px solid #d9d9d9;
}

.code-content {
  margin: 0;
  padding: 16px;
  background: #f8f8f8;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                  | 默认值 | 说明     |
| ------- | --------------------- | ------ | -------- |
| options | `UseClipboardOptions` | `{}`   | 配置选项 |

### UseClipboardOptions

| 属性        | 类型                     | 默认值 | 说明                 |
| ----------- | ------------------------ | ------ | -------------------- |
| legacy      | `boolean`                | `true` | 是否启用旧版后备方案 |
| onCopy      | `(text: string) => void` | -      | 复制成功回调         |
| onError     | `(error: Error) => void` | -      | 复制失败回调         |
| onRead      | `(text: string) => void` | -      | 读取成功回调         |
| onReadError | `(error: Error) => void` | -      | 读取失败回调         |

### 返回值

`useClipboard` 返回一个数组，包含以下元素：

```typescript
const [text, copy, read, isSupported, isSecureContext] = useClipboard(options);
```

| 索引 | 名称            | 类型                                 | 说明               |
| ---- | --------------- | ------------------------------------ | ------------------ |
| 0    | text            | `Ref<string>`                        | 剪贴板文本内容     |
| 1    | copy            | `(text: string) => Promise<boolean>` | 复制文本到剪贴板   |
| 2    | read            | `() => Promise<string>`              | 读取剪贴板内容     |
| 3    | isSupported     | `ComputedRef<boolean>`               | 是否支持剪贴板操作 |
| 4    | isSecureContext | `ComputedRef<boolean>`               | 是否在安全上下文中 |

## 类型定义

```typescript
export interface UseClipboardOptions {
  legacy?: boolean;
  onCopy?: (text: string) => void;
  onError?: (error: Error) => void;
  onRead?: (text: string) => void;
  onReadError?: (error: Error) => void;
}

export type CopyFunction = (text: string) => Promise<boolean>;
export type ReadFunction = () => Promise<string>;

export type UseClipboardReturn = [
  Ref<string>,
  CopyFunction,
  ReadFunction,
  ComputedRef<boolean>,
  ComputedRef<boolean>,
];
```

## 使用场景

1. **代码复制** - 复制代码片段到剪贴板
2. **文本分享** - 复制链接、文本等内容
3. **表单操作** - 复制表单数据或结果
4. **内容管理** - 复制文章、评论等内容
5. **开发工具** - 复制配置、命令等

## 浏览器兼容性

### 现代 Clipboard API

- Chrome 66+
- Firefox 63+
- Safari 13.1+
- Edge 79+

### 旧版后备方案

- 使用 `document.execCommand('copy')`
- 支持更多旧版浏览器
- 需要用户交互触发

## 安全限制

1. **HTTPS 要求** - 现代 Clipboard API 需要在安全上下文中使用
2. **用户权限** - 读取剪贴板需要用户授权
3. **用户交互** - 复制操作需要用户交互触发
4. **跨域限制** - 不能访问其他域的剪贴板内容

## 注意事项

1. 在 HTTP 环境下可能无法使用现代 Clipboard API
2. 读取剪贴板可能需要用户授权
3. 复制操作必须在用户交互事件中触发
4. 旧版后备方案的兼容性更好但功能有限
5. 建议提供用户反馈，告知操作结果

<script setup>
import { useClipboard } from '@vakao-ui/hooks';
import { ref } from 'vue';

// 基础用法示例
const textToCopy = ref('');
const copyMessage = ref('');
const copySuccess = ref(false);

const [text, copy, read, isSupported, isSecureContext] = useClipboard({
  onCopy: (copiedText) => {
    copyMessage.value = `✅ 复制成功: ${copiedText}`;
    copySuccess.value = true;
    setTimeout(() => {
      copyMessage.value = '';
    }, 3000);
  },
  onError: (error) => {
    copyMessage.value = `❌ 复制失败: ${error.message}`;
    copySuccess.value = false;
    setTimeout(() => {
      copyMessage.value = '';
    }, 3000);
  }
});

const handleCopy = async () => {
  if (textToCopy.value.trim()) {
    await copy(textToCopy.value.trim());
  }
};

const handleRead = async () => {
  try {
    await read();
  } catch (error) {
    copyMessage.value = `❌ 读取失败: ${error.message}`;
    copySuccess.value = false;
    setTimeout(() => {
      copyMessage.value = '';
    }, 3000);
  }
};

const copyPreset = async (preset: string) => {
  await copy(preset);
};

// 代码复制示例
interface CodeSnippet {
  title: string;
  code: string;
}

const copiedIndex = ref<number | null>(null);

const codeSnippets: CodeSnippet[] = [
  {
    title: 'Vue 3 组件',
    code: `<template>
  <div>{{ message }}</div>
</template>

<script setup>
const message = ref('Hello Vue 3!');
</script>`

},
{
title: 'JavaScript 函数',
code: `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`
}
];

const [, copyCode] = useClipboard();

const handleCopyCode = async (code: string) => {
const success = await copyCode(code);
if (success) {
const index = codeSnippets.findIndex(snippet => snippet.code === code);
copiedIndex.value = index;
setTimeout(() => {
copiedIndex.value = null;
}, 2000);
}
};
</script>
