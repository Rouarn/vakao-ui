# useFetch

数据获取钩子，提供强大的 HTTP 请求功能和状态管理。

## 基本用法

### 简单的 GET 请求

```vue
<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>
      <h3>用户列表</h3>
      <ul>
        <li v-for="user in data" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
    <button @click="refresh" :disabled="loading">刷新</button>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';

interface User {
  id: number;
  name: string;
  email: string;
}

const { data, loading, error, refresh } = useFetch<User[]>('/api/users');
</script>
```

### 手动执行请求

```vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="userId" placeholder="输入用户ID" type="number" />
      <button type="submit" :disabled="loading">获取用户</button>
    </form>
    
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else-if="data">
      <h3>用户信息</h3>
      <p>姓名: {{ data.name }}</p>
      <p>邮箱: {{ data.email }}</p>
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

const userId = ref('');

const { data, loading, error, execute } = useFetch<User>(
  () => `/api/users/${userId.value}`,
  { immediate: false }
);

const handleSubmit = () => {
  if (userId.value) {
    execute();
  }
};
</script>
```

## 高级用法

### POST 请求和数据提交

```vue
<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>姓名:</label>
        <input v-model="form.name" required />
      </div>
      <div>
        <label>邮箱:</label>
        <input v-model="form.email" type="email" required />
      </div>
      <button type="submit" :disabled="loading">创建用户</button>
    </form>
    
    <div v-if="loading">提交中...</div>
    <div v-if="error" class="error">错误: {{ error.message }}</div>
    <div v-if="data" class="success">用户创建成功: {{ data.name }}</div>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';
import { ref, reactive } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

const form = reactive<CreateUserRequest>({
  name: '',
  email: ''
});

const { data, loading, error, execute } = useFetch<User>('/api/users', {
  method: 'POST',
  immediate: false,
  beforeRequest: (options) => {
    options.body = JSON.stringify(form);
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    };
  },
  afterRequest: () => {
    // 重置表单
    form.name = '';
    form.email = '';
  }
});

const handleSubmit = () => {
  execute();
};
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}
</style>
```

### 带重试和超时的请求

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
      <p>请求失败: {{ error.message }}</p>
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

const { data, loading, error, execute, cancel } = useFetch<ApiResponse>(
  '/api/unstable',
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

### 数据转换和缓存

```vue
<template>
  <div>
    <h3>用户统计 (带缓存)</h3>
    <button @click="refresh" :disabled="loading">刷新数据</button>
    
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else-if="data">
      <div class="stats">
        <div class="stat-item">
          <h4>总用户数</h4>
          <p>{{ data.totalUsers }}</p>
        </div>
        <div class="stat-item">
          <h4>活跃用户</h4>
          <p>{{ data.activeUsers }}</p>
        </div>
        <div class="stat-item">
          <h4>活跃率</h4>
          <p>{{ data.activeRate }}%</p>
        </div>
      </div>
      <p class="cache-info">数据来源: {{ data.fromCache ? '缓存' : 'API' }}</p>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from 'vakao-ui';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  activeRate: number;
  fromCache: boolean;
}

interface ApiUserStats {
  total: number;
  active: number;
}

// 简单的内存缓存
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

const { data, loading, error, refresh } = useFetch<UserStats>('/api/user-stats', {
  beforeRequest: (options) => {
    const cacheKey = options.url;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      // 返回缓存数据
      return Promise.resolve({
        ...cached.data,
        fromCache: true
      });
    }
  },
  transform: (response: ApiUserStats): UserStats => {
    const transformed = {
      totalUsers: response.total,
      activeUsers: response.active,
      activeRate: Math.round((response.active / response.total) * 100),
      fromCache: false
    };
    
    // 缓存转换后的数据
    cache.set('/api/user-stats', {
      data: transformed,
      timestamp: Date.now()
    });
    
    return transformed;
  }
});
</script>

<style scoped>
.stats {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.stat-item {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  flex: 1;
}

.stat-item h4 {
  margin: 0 0 10px 0;
  color: #666;
}

.stat-item p {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.cache-info {
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>
```

### 创建可复用的 Fetch 实例

```vue
<template>
  <div>
    <h3>API 管理</h3>
    
    <!-- 用户管理 -->
    <div class="section">
      <h4>用户列表</h4>
      <button @click="loadUsers" :disabled="usersLoading">加载用户</button>
      <div v-if="usersLoading">加载中...</div>
      <ul v-else-if="users">
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
    
    <!-- 文章管理 -->
    <div class="section">
      <h4>文章列表</h4>
      <button @click="loadPosts" :disabled="postsLoading">加载文章</button>
      <div v-if="postsLoading">加载中...</div>
      <ul v-else-if="posts">
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { createFetch } from 'vakao-ui';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

// 创建带认证的 API 实例
const useAuthenticatedFetch = createFetch({
  baseUrl: 'https://api.example.com',
  options: {
    beforeRequest: (options) => {
      const token = localStorage.getItem('auth-token');
      if (token) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        };
      }
    },
    onError: (error) => {
      if (error.status === 401) {
        // 处理认证失败
        localStorage.removeItem('auth-token');
        window.location.href = '/login';
      }
    }
  }
});

// 使用认证实例
const {
  data: users,
  loading: usersLoading,
  execute: loadUsers
} = useAuthenticatedFetch<User[]>('/users', { immediate: false });

const {
  data: posts,
  loading: postsLoading,
  execute: loadPosts
} = useAuthenticatedFetch<Post[]>('/posts', { immediate: false });
</script>

<style scoped>
.section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.section h4 {
  margin-top: 0;
}
</style>
```

## API

### 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| url | `string \| (() => string)` | - | 请求 URL 或返回 URL 的函数 |
| options | `UseFetchOptions<T>` | `{}` | 配置选项 |

### UseFetchOptions

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| method | `string` | `'GET'` | HTTP 方法 |
| immediate | `boolean` | `true` | 是否立即执行 |
| timeout | `number` | `10000` | 超时时间（毫秒） |
| retry | `number` | `0` | 重试次数 |
| retryDelay | `number` | `1000` | 重试延迟（毫秒） |
| beforeRequest | `(options: RequestInit) => void \| Promise<any>` | - | 请求前钩子 |
| afterRequest | `(response: Response) => void` | - | 请求后钩子 |
| onError | `(error: FetchError) => void` | - | 错误处理钩子 |
| onRetry | `(attempt: number) => void` | - | 重试钩子 |
| transform | `(data: any) => T` | - | 数据转换函数 |

### 返回值

返回一个对象，包含以下属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| data | `Ref<T \| null>` | 响应数据 |
| loading | `Ref<boolean>` | 加载状态 |
| error | `Ref<FetchError \| null>` | 错误信息 |
| status | `Ref<FetchStatus>` | 请求状态 |
| execute | `ExecuteFunction` | 执行请求函数 |
| cancel | `CancelFunction` | 取消请求函数 |
| refresh | `RefreshFunction` | 刷新请求函数 |

### 类型定义

```ts
/**
 * 请求状态枚举
 */
enum FetchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  CANCELED = 'canceled'
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
 * useFetch 返回值类型
 */
interface UseFetchReturn<T> {
  /** 响应数据 */
  data: Ref<T | null>;
  /** 加载状态 */
  loading: Ref<boolean>;
  /** 错误信息 */
  error: Ref<FetchError | null>;
  /** 请求状态 */
  status: Ref<FetchStatus>;
  /** 执行请求函数 */
  execute: ExecuteFunction;
  /** 取消请求函数 */
  cancel: CancelFunction;
  /** 刷新请求函数 */
  refresh: RefreshFunction;
}

/**
 * 数据获取钩子
 * @param url 请求 URL 或返回 URL 的函数
 * @param options 配置选项
 * @returns UseFetchReturn
 * @example
 * const { data, loading, error } = useFetch('/api/users');
 */
function useFetch<T = any>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
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