# useAsync

一个强大的异步操作状态管理 Hook，提供统一的异步操作状态管理方案，支持加载状态、错误处理、手动执行等功能。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">📤 文件上传</h3>
    <div style="margin-bottom: 16px;">
      <input type="file" @change="handleFileSelect" accept=".txt,.json" style="margin-bottom: 12px;" />
      <div v-if="selectedFile" style="margin-bottom: 12px; padding: 8px; background: #f0f0f0; border-radius: 4px;">
        选中文件: {{ selectedFile.name }} ({{ (selectedFile.size / 1024).toFixed(2) }} KB)
      </div>
      <vk-button @click="uploadFile" :loading="uploading" :disabled="!selectedFile" type="primary">
        {{ uploading ? '上传中...' : '开始上传' }}
      </vk-button>
      <vk-button @click="resetUpload" :disabled="uploading" style="margin-left: 8px;">重置</vk-button>
    </div>
    <div v-if="uploading" style="padding: 16px; background: #e6f7ff; border: 1px solid #91d5ff; border-radius: 4px; margin-bottom: 16px;">
      ⏳ 正在上传文件，请稍候...
    </div>
    <div v-if="uploadError" style="padding: 16px; background: #fff2f0; border: 1px solid #ffccc7; border-radius: 4px; margin-bottom: 16px;">
      ❌ 上传失败: {{ uploadError.message }}
    </div>
    <div v-if="uploadData && status === 'success'" style="padding: 16px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px;">
      ✅ 上传成功！
      <div style="margin-top: 8px; font-family: monospace; font-size: 12px;">
        {{ JSON.stringify(uploadData, null, 2) }}
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <input type="file" @change="handleFileSelect" accept=".txt,.json" />
    <div v-if="selectedFile">
      选中文件: {{ selectedFile.name }} ({{
        (selectedFile.size / 1024).toFixed(2)
      }}
      KB)
    </div>

    <vk-button
      @click="uploadFile"
      :loading="uploading"
      :disabled="!selectedFile"
      type="primary"
    >
      {{ uploading ? "上传中..." : "开始上传" }}
    </vk-button>
    <vk-button @click="resetUpload" :disabled="uploading">重置</vk-button>

    <div v-if="uploading">⏳ 正在上传文件，请稍候...</div>
    <div v-if="uploadError">❌ 上传失败: {{ uploadError.message }}</div>
    <div v-if="uploadData && status === 'success'">✅ 上传成功！</div>
  </div>
</template>

<script setup lang="ts">
import { useAsync } from "@vakao-ui/hooks";
import { ref } from "vue";

interface UploadResult {
  id: string;
  filename: string;
  size: number;
  uploadTime: string;
}

const selectedFile = ref<File | null>(null);

const [uploadData, uploading, uploadError, uploadFile, resetUpload, status] =
  useAsync(
    async (file: File): Promise<UploadResult> => {
      // 模拟文件上传
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模拟上传失败（10% 概率）
      if (Math.random() < 0.1) {
        throw new Error("网络连接失败");
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        size: file.size,
        uploadTime: new Date().toLocaleString(),
      };
    },
    {
      onSuccess: result => {
        console.log("上传成功:", result);
      },
      onError: error => {
        console.error("上传失败:", error);
      },
    }
  );

const handleFileSelect = (event) => {
  const target = event.target;
  selectedFile.value = target.files?.[0] || null;
};

const handleUpload = () => {
  if (selectedFile.value) {
    uploadFile(selectedFile.value);
  }
};
</script>
```

  </template>
</Demo>

## 立即执行示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">📊 数据统计</h3>
    <div style="margin-bottom: 16px;">
      <vk-button @click="refreshStats" :loading="statsLoading" type="primary">
        {{ statsLoading ? '刷新中...' : '刷新统计' }}
      </vk-button>
      <vk-button @click="resetStats" :disabled="statsLoading" style="margin-left: 8px;">重置</vk-button>
    </div>
    <div v-if="statsLoading && !statsData" style="text-align: center; padding: 40px; color: #1890ff;">
      📈 正在加载统计数据...
    </div>
    <div v-else-if="statsError" style="padding: 16px; background: #fff2f0; border: 1px solid #ffccc7; border-radius: 4px;">
      ❌ 加载失败: {{ statsError.message }}
      <br>
      <vk-button @click="refreshStats" style="margin-top: 8px;" size="small">重试</vk-button>
    </div>
    <div v-else-if="statsData" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
      <div v-for="(stat, key) in statsData" :key="key" style="padding: 16px; background: #f5f5f5; border-radius: 8px; text-align: center;">
        <div style="font-size: 24px; font-weight: bold; color: #1890ff; margin-bottom: 8px;">{{ stat.value }}</div>
        <div style="color: #666; font-size: 14px;">{{ stat.label }}</div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="refreshStats" :loading="statsLoading" type="primary">
      {{ statsLoading ? "刷新中..." : "刷新统计" }}
    </vk-button>
    <vk-button @click="resetStats" :disabled="statsLoading">重置</vk-button>

    <div v-if="statsLoading && !statsData">📈 正在加载统计数据...</div>
    <div v-else-if="statsError">❌ 加载失败: {{ statsError.message }}</div>
    <div v-else-if="statsData">
      <div v-for="(stat, key) in statsData" :key="key">
        <div>{{ stat.value }}</div>
        <div>{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsync } from "@vakao-ui/hooks";

interface StatItem {
  value: number;
  label: string;
}

interface StatsData {
  users: StatItem;
  orders: StatItem;
  revenue: StatItem;
  growth: StatItem;
}

const [statsData, statsLoading, statsError, refreshStats, resetStats] =
  useAsync(
    async (): Promise<StatsData> => {
      // 模拟 API 请求
      await new Promise(resolve => setTimeout(resolve, 1500));

      return {
        users: { value: Math.floor(Math.random() * 10000), label: "总用户数" },
        orders: { value: Math.floor(Math.random() * 5000), label: "订单总数" },
        revenue: {
          value: Math.floor(Math.random() * 100000),
          label: "总收入 (¥)",
        },
        growth: { value: Math.floor(Math.random() * 100), label: "增长率 (%)" },
      };
    },
    { immediate: true } // 立即执行
  );
</script>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                  | 默认值 | 说明               |
| ------- | --------------------- | ------ | ------------------ |
| asyncFn | `AsyncFunction<T, P>` | -      | 异步函数，支持参数 |
| options | `UseAsyncOptions`     | `{}`   | 配置选项           |

### UseAsyncOptions

| 属性       | 类型                     | 默认值  | 说明                         |
| ---------- | ------------------------ | ------- | ---------------------------- |
| immediate  | `boolean`                | `false` | 是否立即执行异步函数         |
| resetDelay | `number`                 | `0`     | 重置延迟时间（毫秒）         |
| onSuccess  | `(data: T) => void`      | -       | 成功回调函数                 |
| onError    | `(error: Error) => void` | -       | 错误回调函数                 |
| onFinally  | `() => void`             | -       | 完成回调函数（无论成功失败） |

### 返回值

`useAsync` 返回一个数组，包含以下元素：

```typescript
const [data, loading, error, execute, reset, status] = useAsync(
  asyncFn,
  options
);
```

| 索引 | 名称    | 类型                         | 说明               |
| ---- | ------- | ---------------------------- | ------------------ |
| 0    | data    | `ComputedRef<T \| null>`     | 异步操作的结果数据 |
| 1    | loading | `ComputedRef<boolean>`       | 是否正在加载       |
| 2    | error   | `ComputedRef<Error \| null>` | 错误信息           |
| 3    | execute | `AsyncExecuteFunction<P>`    | 手动执行异步函数   |
| 4    | reset   | `ResetFunction`              | 重置状态函数       |
| 5    | status  | `ComputedRef<AsyncStatus>`   | 当前状态           |

### AsyncStatus

```typescript
type AsyncStatus = "idle" | "pending" | "success" | "error";
```

- `idle` - 初始状态
- `pending` - 执行中
- `success` - 执行成功
- `error` - 执行失败

## 类型定义

```javascript
// 异步函数类型
// AsyncFunction<T, P> = (...args: P) => Promise<T>

// 执行函数类型
// AsyncExecuteFunction<P> = (...args: P) => Promise<void>

// 重置函数类型
// ResetFunction = () => void

// 配置选项
// UseAsyncOptions = {
//   immediate?: boolean,
//   resetDelay?: number,
//   onSuccess?: (data: any) => void,
//   onError?: (error: Error) => void,
//   onFinally?: () => void
// }

// 返回值类型
// UseAsyncReturn<T, P> = [
//   ComputedRef<T | null>,     // data
//   ComputedRef<boolean>,      // loading
//   ComputedRef<Error | null>, // error
//   AsyncExecuteFunction<P>,   // execute
//   ResetFunction,             // reset
//   ComputedRef<AsyncStatus>   // status
// ]
```

## 使用场景

1. **数据提交** - 表单提交、文件上传等
2. **数据加载** - 页面初始化数据加载
3. **用户操作** - 删除、更新等需要异步处理的操作
4. **状态管理** - 统一管理异步操作的各种状态

## 注意事项

1. `execute` 函数支持传递参数给异步函数
2. 设置 `immediate: true` 时会在组件挂载时自动执行
3. `reset` 函数会清除所有状态，恢复到初始状态
4. 回调函数在相应的状态变化时触发
5. 组件卸载时会自动取消正在进行的异步操作

<script setup>
import { useAsync } from '@vakao-ui/hooks';
import { ref } from 'vue';

// 文件上传示例
const selectedFile = ref(null);

const [uploadData, uploading, uploadError, uploadFile, resetUpload, status] = useAsync(
  async (file) => {
    // 模拟文件上传
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟上传失败（10% 概率）
    if (Math.random() < 0.1) {
      throw new Error('网络连接失败');
    }
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      filename: file.name,
      size: file.size,
      uploadTime: new Date().toLocaleString()
    };
  },
  {
    onSuccess: (result) => {
      console.log('上传成功:', result);
    },
    onError: (error) => {
      console.error('上传失败:', error);
    }
  }
);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files?.[0] || null;
};

// 统计数据示例
const [statsData, statsLoading, statsError, refreshStats, resetStats] = useAsync(
  async () => {
    // 模拟 API 请求
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      users: { value: Math.floor(Math.random() * 10000), label: '总用户数' },
      orders: { value: Math.floor(Math.random() * 5000), label: '订单总数' },
      revenue: { value: Math.floor(Math.random() * 100000), label: '总收入 (¥)' },
      growth: { value: Math.floor(Math.random() * 100), label: '增长率 (%)' }
    };
  },
  { immediate: true }
);
</script>
