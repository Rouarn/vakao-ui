# useFetch

一个强大的数据获取 Hook，提供了完整的请求状态管理、错误处理、重试机制等功能。

## 基础用法

<Demo>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">📋 用户列表</h3>
      <div style="margin-bottom: 16px;">
        <vk-button @click="refresh" :loading="loading" type="primary">
          {{ loading ? '加载中...' : '刷新数据' }}
        </vk-button>
      </div>
      <div v-if="loading && !data" style="text-align: center; padding: 40px; color: #1890ff;">
        ⏳ 正在加载用户数据...
      </div>
      <div v-else-if="error" style="text-align: center; padding: 40px; color: #ff4d4f; background: #fff2f0; border-radius: 4px;">
        ❌ 加载失败: {{ error?.message || '未知错误' }}
        <br>
        <vk-button @click="refresh" style="margin-top: 12px;" size="small">重试</vk-button>
      </div>
      <div v-else-if="data" style="background: #f5f5f5; border-radius: 4px; max-height: 300px; overflow-y: auto;">
        <div v-for="user in data" :key="user.id" style="padding: 12px; border-bottom: 1px solid #e8e8e8; display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(45deg, #1890ff, #52c41a); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
            {{ user.name}}
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 500; margin-bottom: 4px;">{{ user.name }}</div>
            <div style="color: #666; font-size: 14px;">{{ user.email }}</div>
          </div>
          <div style="color: #999; font-size: 12px;">
            ID: {{ user.id }}
          </div>
        </div>
      </div>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="refresh" :loading="loading"> 刷新数据 </vk-button>

    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error?.message || "未知错误" }}</div>
    <div v-else-if="data">
      <h3>用户列表</h3>
      <div v-for="user in data" :key="user.id">
        <p>{{ user.name }} - {{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';

interface User {
  id: number;
  name: string;
  email: string;
}

// 模拟用户数据
const mockUsers: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@gmail.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', email: 'zhaoliu@outlook.com' },
  { id: 5, name: '钱七', email: 'qianqi@gmail.com' }
];

// 使用Promise函数模拟API请求
const [data, loading, error, { refresh }] = useFetch(() => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 1000);
  });
});
</script>
```

  </template>
</Demo>

## 手动执行请求

<Demo>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">🔍 用户查询</h3>
      <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center;">
        <label style="font-weight: 500; min-width: 80px;">用户ID:</label>
        <vk-input 
          v-model="userId" 
          placeholder="请输入用户ID (1-5)" 
          style="flex: 1; max-width: 200px;"
          type="number"
        />
        <vk-button 
          @click="handleSearch" 
          :disabled="!userId || userLoading" 
          :loading="userLoading"
          type="primary"
        >
          {{ userLoading ? '查询中...' : '查询用户' }}
        </vk-button>
      </div>
      <div v-if="userLoading" style="text-align: center; padding: 30px; color: #1890ff; background: #f0f9ff; border-radius: 4px;">
        🔍 正在查询用户信息...
      </div>
      <div v-else-if="userError" style="text-align: center; padding: 30px; color: #ff4d4f; background: #fff2f0; border-radius: 4px;">
        ❌ 查询失败: {{ userError?.message || '未知错误' }}
      </div>
      <div v-else-if="userData" style="background: #f6ffed; padding: 20px; border-radius: 4px; border: 1px solid #b7eb8f;">
        <h4 style="margin: 0 0 16px; color: #52c41a; display: flex; align-items: center; gap: 8px;">
          ✅ 查询成功
        </h4>
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #52c41a, #1890ff); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">
            {{ userData.name}}
          </div>
          <div>
            <p style="margin: 4px 0; font-size: 16px;"><strong>姓名:</strong> {{ userData.name }}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #666;"><strong>邮箱:</strong> {{ userData.email }}</p>
            <p style="margin: 4px 0; font-size: 12px; color: #999;"><strong>ID:</strong> {{ userData.id }}</p>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 30px; color: #999; background: #fafafa; border-radius: 4px;">
        💡 请输入用户ID进行查询
      </div>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <div>
      <label>用户ID:</label>
      <vk-input v-model="userId" placeholder="请输入用户ID" />
      <vk-button @click="handleSearch" :disabled="!userId || loading">
        查询用户
      </vk-button>
    </div>

    <div v-if="loading">查询中...</div>
    <div v-else-if="error">错误: {{ error?.message || "未知错误" }}</div>
    <div v-else-if="data">
      <h3>用户信息</h3>
      <p>姓名: {{ data.name }}</p>
      <p>邮箱: {{ data.email }}</p>
      <p>ID: {{ data.id }}</p>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

// 模拟用户数据
const mockUsers: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@gmail.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', email: 'zhaoliu@outlook.com' },
  { id: 5, name: '钱七', email: 'qianqi@gmail.com' }
];

const userId = ref('');

// 使用Promise函数模拟API请求
const [data, loading, error, { execute }] = useFetch(
  () => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === parseInt(userId.value));
        if (user) {
          resolve(user);
        } else {
          reject(new Error('用户不存在'));
        }
      }, 800);
    });
  },
  { immediate: false }
);

const handleSearch = () => {
  if (userId.value) {
    execute();
  }
};
</script>
```

  </template>
</Demo>

## POST 请求示例

<Demo>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">👤 创建新用户</h3>
      <form @submit.prevent="handleSubmit" style="margin-bottom: 20px;">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">姓名:</label>
          <vk-input 
            v-model="form.name" 
            placeholder="请输入姓名" 
            required 
            style="width: 100%;"
          />
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">邮箱:</label>
          <vk-input 
            v-model="form.email" 
            type="email" 
            placeholder="请输入邮箱" 
            required 
            style="width: 100%;"
          />
        </div>
        <vk-button 
          type="primary" 
          html-type="submit" 
          :disabled="createLoading || !form.name || !form.email" 
          style="width: 100%;"
          @click="handleSubmit"
        >
          {{ createLoading ? '创建中...' : '创建用户' }}
        </vk-button>
      </form>
      <div v-if="createLoading" style="text-align: center; padding: 20px; color: #1890ff; background: #f0f9ff; border-radius: 4px;">
        ⏳ 正在创建用户...
      </div>
      <div v-else-if="createError" style="text-align: center; padding: 20px; color: #ff4d4f; background: #fff2f0; border-radius: 4px;">
        ❌ 创建失败: {{ createError?.message || '未知错误' }}
      </div>
      <div v-else-if="createData" style="background: #f6ffed; padding: 16px; border-radius: 4px; border: 1px solid #b7eb8f;">
        <h4 style="margin: 0 0 12px; color: #52c41a;">✅ 用户创建成功!</h4>
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(45deg, #52c41a, #1890ff); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
            {{ createData.name.charAt(0) }}
          </div>
          <div>
            <p style="margin: 2px 0; font-weight: 500;">{{ createData.name }}</p>
            <p style="margin: 2px 0; color: #666; font-size: 14px;">{{ createData.email }}</p>
            <p style="margin: 2px 0; color: #999; font-size: 12px;">ID: {{ createData.id }}</p>
          </div>
        </div>
        <vk-button @click="resetForm" size="small">重置表单</vk-button>
      </div>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>姓名:</label>
        <vk-input v-model="form.name" required />
      </div>
      <div>
        <label>邮箱:</label>
        <vk-input v-model="form.email" type="email" required />
      </div>
      <vk-button type="submit" :disabled="loading">创建用户</vk-button>
    </form>

    <div v-if="loading">创建中...</div>
    <div v-else-if="error">错误: {{ error?.message || "未知错误" }}</div>
    <div v-else-if="data">
      <h3>创建成功!</h3>
      <p>用户ID: {{ data.id }}</p>
      <p>姓名: {{ data.name }}</p>
      <p>邮箱: {{ data.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';
import { reactive } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

const form = reactive<CreateUserData>({
  name: '',
  email: ''
});

// 使用Promise函数模拟POST请求
const [data, loading, error, { execute }] = useFetch(
  () => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now(),
          name: form.name,
          email: form.email
        };
        resolve(newUser);
      }, 1200);
    });
  },
  { immediate: false }
);

const handleSubmit = () => {
  execute();
};
</script>
```

  </template>
</Demo>

## 带重试和超时的请求

<Demo>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">🔄 不稳定的 API 请求</h3>
      <div style="margin-bottom: 20px; display: flex; gap: 12px;">
        <vk-button @click="retryExecute" :disabled="retryLoading" type="primary">
          {{ retryLoading ? '请求中...' : '发起请求' }}
        </vk-button>
        <vk-button @click="cancel" :disabled="!retryLoading" type="default">
          取消请求
        </vk-button>
      </div>
      <div v-if="retryLoading" style="background: #f0f9ff; padding: 20px; border-radius: 4px; border: 1px solid #91d5ff;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="width: 20px; height: 20px; border: 2px solid #1890ff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          <span style="color: #1890ff; font-weight: 500;">请求进行中...</span>
        </div>
        <p style="margin: 8px 0; color: #666;">重试次数: <strong>{{ retryCount }}</strong></p>
        <div style="background: #e6f7ff; border-radius: 4px; height: 8px; overflow: hidden;">
          <div 
            style="height: 100%; background: linear-gradient(90deg, #1890ff, #52c41a); transition: width 0.3s ease;"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p style="margin: 8px 0 0; font-size: 12px; color: #999;">进度: {{ progress }}%</p>
      </div>
      <div v-else-if="retryError" style="background: #fff2f0; padding: 20px; border-radius: 4px; border: 1px solid #ffccc7;">
        <h4 style="margin: 0 0 12px; color: #ff4d4f;">❌ 请求失败</h4>
        <p style="margin: 4px 0; color: #666;">错误信息: {{ retryError?.message || '未知错误' }}</p>
        <p v-if="retryError?.isTimeout" style="margin: 4px 0; color: #fa8c16;">⏰ 请求超时</p>
        <p v-if="retryError?.isCancel" style="margin: 4px 0; color: #722ed1;">🚫 请求已取消</p>
        <p style="margin: 8px 0 0; font-size: 12px; color: #999;">最终重试次数: {{ retryCount }}</p>
      </div>
      <div v-else-if="retryData" style="background: #f6ffed; padding: 20px; border-radius: 4px; border: 1px solid #b7eb8f;">
        <h4 style="margin: 0 0 12px; color: #52c41a;">✅ 请求成功</h4>
        <p style="margin: 4px 0; color: #666;">响应消息: <strong>{{ retryData.message }}</strong></p>
         <p style="margin: 4px 0; color: #999; font-size: 12px;">响应时间: {{ new Date(retryData.timestamp).toLocaleString() }}</p>
        <p style="margin: 8px 0 0; font-size: 12px; color: #999;">重试次数: {{ retryCount }}</p>
      </div>
      <div v-else style="text-align: center; padding: 30px; color: #999; background: #fafafa; border-radius: 4px;">
        💡 点击"发起请求"开始测试不稳定的 API
      </div>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <h3>不稳定的 API 请求</h3>
    <button @click="execute" :disabled="loading">发起请求</button>
    <button @click="cancel" :disabled="!loading">取消请求</button>

    <div v-if="loading">
      <p>加载中... (重试次数: {{ retryCount }})</p>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div v-if="error" class="error">
      <p>请求失败: {{ error?.message || "未知错误" }}</p>
      <p v-if="error.isTimeout">请求超时</p>
      <p v-if="error.isCancel">请求已取消</p>
    </div>

    <div v-if="data" class="success">
      <p>请求成功: {{ data.message }}</p>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';
import { ref, watch } from 'vue';

interface ApiResponse {
  message: string;
  timestamp: number;
}

const retryCount = ref(0);
const progress = ref(0);

// 使用Promise函数模拟不稳定的API请求
const [data, loading, error, { execute, cancel }] = useFetch(
  () => {
    return new Promise<ApiResponse>((resolve, reject) => {
      setTimeout(() => {
        // 模拟 70% 的失败率
        if (Math.random() < 0.7) {
          reject(new Error('网络不稳定，请求失败'));
        } else {
          resolve({
            message: '请求成功！',
            timestamp: Date.now()
          });
        }
      }, 2000);
    });
  },
  {
    immediate: false,
    timeout: 5000,
    retry: 3,
    retryDelay: 1000,
    beforeRequest: () => {
      progress.value = 0;
      retryCount.value = 0;
    },
    onRetry: (attempt) => {
      retryCount.value = attempt;
    }
  }
);

// 模拟进度条
watch(loading, (isLoading) => {
  if (isLoading) {
    const interval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 10;
      }
    }, 500);

    const stopWatch = watch(loading, (newLoading) => {
      if (!newLoading) {
        clearInterval(interval);
        progress.value = 100;
        setTimeout(() => {
          progress.value = 0;
        }, 500);
        stopWatch();
      }
    });
  }
});
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
```

  </template>
</Demo>

## 数据转换和缓存

<Demo>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">📊 数据转换示例</h3>
      <div style="margin-bottom: 16px;">
        <vk-button @click="refreshStats" :loading="statsLoading" type="primary">
          {{ statsLoading ? '加载中...' : '获取统计数据' }}
        </vk-button>
      </div>
      <div v-if="statsLoading" style="text-align: center; padding: 30px; color: #1890ff;">
        📈 正在处理数据...
      </div>
      <div v-else-if="statsError" style="text-align: center; padding: 30px; color: #ff4d4f; background: #fff2f0; border-radius: 4px;">
        ❌ 数据加载失败: {{ statsError?.message || '未知错误' }}
      </div>
      <div v-else-if="statsData" style="background: #f6ffed; padding: 20px; border-radius: 4px;">
        <h4 style="margin: 0 0 16px; color: #52c41a;">📊 用户统计数据</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #d9f7be; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #1890ff; margin-bottom: 4px;">{{ statsData.totalUsers }}</div>
            <div style="color: #666; font-size: 14px;">总用户数</div>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #d9f7be; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #52c41a; margin-bottom: 4px;">{{ statsData.activeUsers }}</div>
            <div style="color: #666; font-size: 14px;">活跃用户</div>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #d9f7be; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #fa8c16; margin-bottom: 4px;">{{ statsData.averageAge }}</div>
            <div style="color: #666; font-size: 14px;">平均年龄</div>
          </div>
        </div>
        <div style="margin-top: 16px; padding: 12px; background: white; border-radius: 4px; border: 1px solid #d9f7be;">
          <h5 style="margin: 0 0 8px; color: #666;">🏆 最受欢迎的域名</h5>
          <div v-for="(count, domain) in statsData.emailDomains" :key="domain" 
               style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0;">
            <span style="color: #333;">{{ domain }}</span>
            <span style="background: #1890ff; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">{{ count }}</span>
          </div>
        </div>
        <p style="margin: 12px 0 0; font-size: 12px; color: #999; text-align: center;">
          数据更新时间: {{ new Date(statsData.lastUpdated).toLocaleString() }}
        </p>
      </div>
    </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="refresh" :loading="loading"> 获取统计数据 </vk-button>

    <div v-if="loading">处理数据中...</div>
    <div v-else-if="error">错误: {{ error?.message || "未知错误" }}</div>
    <div v-else-if="data">
      <h3>用户统计</h3>
      <p>总用户数: {{ data.totalUsers }}</p>
      <p>活跃用户: {{ data.activeUsers }}</p>
      <p>平均年龄: {{ data.averageAge }}</p>

      <h4>邮箱域名分布</h4>
      <div v-for="(count, domain) in data.emailDomains" :key="domain">
        {{ domain }}: {{ count }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  averageAge: number;
  emailDomains: Record<string, number>;
  lastUpdated: string;
}

// 模拟用户数据
const mockUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@gmail.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', email: 'zhaoliu@outlook.com' },
  { id: 5, name: '钱七', email: 'qianqi@gmail.com' }
];

// 使用Promise函数模拟数据转换和缓存
const [data, loading, error, { refresh }] = useFetch(
  () => {
    return new Promise<UserStats>((resolve) => {
      setTimeout(() => {
        // 模拟原始数据转换
        const rawData = mockUsers.map(user => ({
          ...user,
          age: Math.floor(Math.random() * 40) + 20,
          active: Math.random() > 0.3
        }));

        const totalUsers = rawData.length;
        const activeUsers = rawData.filter(user => user.active).length;
        const averageAge = Math.round(
          rawData.reduce((sum, user) => sum + user.age, 0) / totalUsers
        );

        const emailDomains = rawData.reduce((acc, user) => {
          const domain = user.email.split('@')[1];
          acc[domain] = (acc[domain] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        resolve({
          totalUsers,
          activeUsers,
          averageAge,
          emailDomains,
          lastUpdated: new Date().toISOString()
        });
      }, 1500);
    });
  },
  {
    immediate: false,
    cache: true,
    cacheTime: 5 * 60 * 1000 // 5分钟缓存
  }
);
</script>
```

  </template>
</Demo>

## API 参考

### useFetch

```javascript
function useFetch<T = any>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
): UseFetchReturn<T>;
```

### 配置选项

| 参数          | 类型       | 默认值   | 说明             |
| ------------- | ---------- | -------- | ---------------- |
| method        | `string`   | `'GET'`  | 请求方法         |
| immediate     | `boolean`  | `true`   | 是否立即执行请求 |
| timeout       | `number`   | `0`      | 请求超时时间(ms) |
| retry         | `number`   | `0`      | 重试次数         |
| retryDelay    | `number`   | `1000`   | 重试延迟(ms)     |
| transform     | `Function` | -        | 数据转换函数     |
| beforeRequest | `Function` | -        | 请求前钩子       |
| afterRequest  | `Function` | -        | 请求后钩子       |
| onError       | `Function` | -        | 错误处理钩子     |
| onRetry       | `Function` | -        | 重试钩子         |
| cache         | `boolean`  | `false`  | 是否启用缓存     |
| cacheTime     | `number`   | `300000` | 缓存时间(ms)     |

### 返回值

返回一个数组，包含以下元素：

| 索引 | 类型                      | 说明                                                                                                                                                                                                           |
| ---- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [0]  | `ComputedRef<T \| null>`  | 响应数据（只读）                                                                                                                                                                                               |
| [1]  | `Ref<boolean>`            | 加载状态                                                                                                                                                                                                       |
| [2]  | `Ref<FetchError \| null>` | 错误信息                                                                                                                                                                                                       |
| [3]  | `Object`                  | 控制函数和状态对象，包含以下属性：<br/>• `status`: 请求状态 (idle/loading/success/error/canceled)<br/>• `execute`: 手动执行请求函数<br/>• `cancel`: 取消当前请求函数<br/>• `refresh`: 刷新请求函数（重新执行） |

### 类型定义

```ts
/**
 * 请求状态枚举
 */
enum FetchStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  CANCELED = "canceled",
}

/**
 * 请求错误接口
 */
interface FetchError {
  message: string;
  status?: number;
  statusText?: string;
  isTimeout: boolean;
  isCancel: boolean;
  isNetwork: boolean;
}

/**
 * 执行函数类型
 */
type ExecuteFunction = () => Promise<void>;

/**
 * 取消函数类型
 */
type CancelFunction = () => void;

/**
 * 刷新函数类型
 */
type RefreshFunction = () => Promise<void>;

/**
 * useFetch 返回值类型（数组形式）
 */
type UseFetchReturn<T> = [
  /** 响应数据（只读） */
  ComputedRef<T | null>,
  /** 加载状态 */
  Ref<boolean>,
  /** 错误信息 */
  Ref<FetchError | null>,
  /** 控制函数和状态对象 */
  {
    /** 请求状态 */
    status: Ref<FetchStatus>;
    /** 执行请求函数 */
    execute: ExecuteFunction;
    /** 取消请求函数 */
    cancel: CancelFunction;
    /** 刷新请求函数 */
    refresh: RefreshFunction;
  },
];

/**
 * 数据获取钩子
 * @param url 请求 URL 或返回 URL 的函数
 * @param options 配置选项
 * @returns UseFetchReturn
 * @example
 * const [data, loading, error] = useFetch('/api/users');
 */
function useFetch<T = any>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
): UseFetchReturn<T>;

/**
 * 创建可复用的 fetch 实例
 * @param config 全局配置
 * @returns useFetch 函数
 * @example
 * const useApi = createFetch({ baseUrl: 'https://api.example.com' });
 */
function createFetch(config: CreateFetchConfig): typeof useFetch;
```

## 注意事项

1. **取消请求** - 组件卸载时会自动取消进行中的请求
2. **错误处理** - 提供详细的错误信息和类型判断
3. **重试机制** - 支持自定义重试次数和延迟
4. **数据转换** - 可以在获取数据后进行转换
5. **类型安全** - 完整的 TypeScript 类型支持
6. **缓存策略** - 可以通过 beforeRequest 钩子实现缓存

## 使用场景

- RESTful API 调用
- 表单数据提交
- 文件上传下载
- 实时数据获取
- 分页数据加载
- 搜索和过滤
- 数据同步

<script>
// 类型定义
// 类型定义（仅供参考）
// User: { id: number, name: string, email: string }
// CreateUserData: { name: string, email: string }
// ApiResponse: { message: string, timestamp: number }
// UserStats: { totalUsers: number, activeUsers: number, averageAge: number, emailDomains: object, lastUpdated: string }
</script>

<script setup lang="ts">
import { useFetch } from '@vakao-ui/hooks';
import { ref, reactive, watch } from 'vue';

// 模拟用户数据
const mockUsers: User[] = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@gmail.com' },
  { id: 3, name: '王五', email: 'wangwu@example.com' },
  { id: 4, name: '赵六', email: 'zhaoliu@outlook.com' },
  { id: 5, name: '钱七', email: 'qianqi@gmail.com' }
];

// 基本用法 - 用户列表
const [data, loading, error, { refresh }] = useFetch(() => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 1000);
  });
});

// 手动执行请求
const userId = ref('');
const [userData, userLoading, userError, { execute }] = useFetch(
  () => {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === parseInt(userId.value));
        if (user) {
          resolve(user);
        } else {
          reject(new Error('用户不存在'));
        }
      }, 800);
    });
  },
  { immediate: false }
);

const handleSearch = () => {
  if (userId.value) {
    execute();
  }
};

// POST 请求示例
const form = reactive<CreateUserData>({
  name: '',
  email: ''
});

const [createData, createLoading, createError, { execute: createExecute }] = useFetch(
  () => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now(),
          name: form.name,
          email: form.email
        };
        resolve(newUser);
      }, 1200);
    });
  },
  { immediate: false }
);

const handleSubmit = () => {
  createExecute();
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  // 重置创建结果
  createData.value = null;
  createError.value = null;
};

// 带重试和超时的请求
const retryCount = ref(0);
const progress = ref(0);

const [
  retryData, 
  retryLoading, 
  retryError, 
  { execute: retryExecute, cancel }
] = useFetch(
  () => {
    return new Promise<ApiResponse>((resolve, reject) => {
      setTimeout(() => {
        // 模拟 70% 的失败率
        if (Math.random() < 0.7) {
          reject(new Error('网络不稳定，请求失败'));
        } else {
          resolve({
            message: '请求成功！',
            timestamp: Date.now()
          });
        }
      }, 2000);
    });
  },
  { 
    immediate: false,
    retry: 3,
    retryDelay: 1000,
    beforeRequest: () => {
      progress.value = 0;
      retryCount.value = 0;
    },
    onRetry: (attempt) => {
      retryCount.value = attempt;
    }
  }
);

// 模拟进度条
watch(retryLoading, (isLoading) => {
  if (isLoading) {
    const interval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += 10;
      }
    }, 500);

    const stopWatch = watch(retryLoading, (newLoading) => {
      if (!newLoading) {
        clearInterval(interval);
        progress.value = 100;
        setTimeout(() => {
          progress.value = 0;
        }, 500);
        stopWatch();
      }
    });
  }
});

// 数据转换和缓存
const [statsData, statsLoading, statsError, { refresh: refreshStats }] = useFetch(
  () => {
    return new Promise<UserStats>((resolve) => {
      setTimeout(() => {
        // 模拟原始数据转换
        const rawData = mockUsers.map(user => ({
          ...user,
          age: Math.floor(Math.random() * 40) + 20,
          active: Math.random() > 0.3
        }));
        
        const totalUsers = rawData.length;
        const activeUsers = rawData.filter(user => user.active).length;
        const averageAge = Math.round(
          rawData.reduce((sum, user) => sum + user.age, 0) / totalUsers
        );
        
        const emailDomains = rawData.reduce((acc, user) => {
          const domain = user.email.split('@')[1];
          acc[domain] = (acc[domain] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        resolve({
          totalUsers,
          activeUsers,
          averageAge,
          emailDomains,
          lastUpdated: new Date().toISOString()
        });
      }, 1500);
    });
  },
  { immediate: false }
);
</script>

<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
