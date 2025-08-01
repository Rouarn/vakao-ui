# useLocalStorage

用于管理浏览器本地存储的 Hook，提供响应式的数据持久化功能，支持自动序列化、跨标签页同步等特性。

## 基础用法

最简单的用法是存储和读取字符串数据。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 500;">用户名:</label>
      <vk-input
        :value="username"
        @input="setUsername"
        placeholder="请输入用户名"
        style="width: 200px;"
      />
    </div>
    <div style="margin-bottom: 16px;">
      <vk-button @click="clearUsername" type="warning">清除用户名</vk-button>
    </div>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <strong>存储的值:</strong> {{ username || '(空)' }}
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 100%;">
    <div>
      <label>用户名:</label>
      <vk-input :value="username" @input="setUsername" placeholder="请输入用户名" />
    </div>
    <vk-button @click="clearUsername">清除用户名</vk-button>
    <p>存储的值: {{ username || "(空)" }}</p>
  </div>
</template>

<script setup>
import { useLocalStorage } from "vakao-ui";

const [username, setUsername, clearUsername] = useLocalStorage("username", "");
</script>
```

  </template>
</Demo>

## 存储对象数据

可以直接存储和管理复杂的对象数据，Hook 会自动处理序列化。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0 0 12px 0;">用户设置</h4>
      <div style="display: flex; flex-direction: row; gap: 12px;">
        <label style="display: flex; align-items: center; gap: 8px;">
          <vk-checkbox :checked="settings.darkMode" @change="(checked) => updateSettings('darkMode', checked)" />
          深色模式
        </label>
        <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
          <label style="min-width: 60px;">语言:</label>
          <vk-select :value="settings.language" @change="(value) => updateSettings('language', value)" style="padding: 4px 8px; border-radius: 4px;">
            <vk-option label="中文" value="zh"></vk-option>
            <vk-option label="English" value="en"></vk-option>
            <vk-option label="日本語" value="ja"></vk-option>
          </vk-select>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 16px;">
      <vk-button @click="resetSettings" type="warning">重置设置</vk-button>
    </div>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <strong>当前设置:</strong>
      <pre style="margin: 8px 0 0 0; font-size: 12px;">{{ JSON.stringify(settings, null, 2) }}</pre>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <h4>用户设置</h4>
    <div>
      <label>
        <vk-checkbox :checked="settings.darkMode" @change="(checked) => updateSettings('darkMode', checked)" />
        深色模式
      </label>
      <div>
        <label>语言:</label>
        <vk-select :value="settings.language" @change="(value) => updateSettings('language', value)">
          <vk-option label="中文" value="zh"></vk-option>
          <vk-option label="English" value="en"></vk-option>
          <vk-option label="日本語" value="ja"></vk-option>
        </vk-select>
      </div>
    </div>
    <vk-button @click="resetSettings">重置设置</vk-button>
    <pre>{{ JSON.stringify(settings, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { useLocalStorage } from "vakao-ui";

const defaultSettings = {
  darkMode: false,
  language: "zh",
};

const [settings, setSettings, resetSettings] = useLocalStorage("user-settings", defaultSettings);
</script>
```

  </template>
</Demo>

## 计数器演示

展示数值类型的持久化存储，页面刷新后数据依然保留。

<Demo>
  <div style="width: 100%;">
    <div style="text-align: center; margin-bottom: 20px;">
      <p style="font-size: 24px; margin: 0; font-weight: bold; color: #1890ff;">{{ count }}</p>
      <p style="margin: 8px 0 0 0; color: #666; font-size: 14px;">页面刷新后数值会保留</p>
    </div>
    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
      <vk-button @click="increment" type="primary">+1</vk-button>
      <vk-button @click="decrement">-1</vk-button>
      <vk-button @click="reset" type="warning">重置</vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 100%;">
    <p>计数: {{ count }}</p>
    <div>
      <vk-button @click="increment">+1</vk-button>
      <vk-button @click="decrement">-1</vk-button>
      <vk-button @click="reset">重置</vk-button>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from "vakao-ui";

const [count, setCount] = useLocalStorage("counter", 0);

const increment = () => setCount(count.value + 1);
const decrement = () => setCount(count.value - 1);
const reset = () => setCount(0);
</script>
```

  </template>
</Demo>

## 表单数据持久化

在表单填写过程中自动保存数据，避免意外丢失。

<Demo>
  <div style="width: 100%;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">姓名:</label>
        <vk-input :value="userForm.name" @input="(value) => updateForm('name', value)" placeholder="请输入姓名" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">年龄:</label>
        <vk-input :value="userForm.age" @input="(value) => updateForm('age', value)" placeholder="请输入年龄" type="number" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">邮箱:</label>
        <vk-input :value="userForm.email" @input="(value) => updateForm('email', value)" placeholder="请输入邮箱" type="email" />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">城市:</label>
        <vk-select :value="userForm.city" @change="(value) => updateForm('city', value)" placeholder="请选择城市" style="width: 100%;">
          <vk-option label="北京" value="beijing"></vk-option>
          <vk-option label="上海" value="shanghai"></vk-option>
          <vk-option label="广州" value="guangzhou"></vk-option>
          <vk-option label="深圳" value="shenzhen"></vk-option>
        </vk-select>
      </div>
    </div>
    <div style="margin-bottom: 16px; display: flex; gap: 8px;">
      <vk-button @click="clearForm" type="warning">清空表单</vk-button>
      <vk-button @click="fillDemo" type="primary">填充示例数据</vk-button>
    </div>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <strong>表单数据:</strong>
      <pre style="margin: 8px 0 0 0; font-size: 12px;">{{ JSON.stringify(userForm, null, 2) }}</pre>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 100%;">
    <div>
      <label>姓名: <vk-input :value="userForm.name" @input="(value) => updateForm('name', value)" /></label>
      <label>年龄: <vk-input :value="userForm.age" @input="(value) => updateForm('age', value)" type="number" /></label>
      <label>邮箱: <vk-input :value="userForm.email" @input="(value) => updateForm('email', value)" type="email" /></label>
      <label>
        城市:
        <vk-select :value="userForm.city" @change="(value) => updateForm('city', value)" placeholder="请选择城市">
          <vk-option label="北京" value="beijing"></vk-option>
          <vk-option label="上海" value="shanghai"></vk-option>
          <vk-option label="广州" value="guangzhou"></vk-option>
          <vk-option label="深圳" value="shenzhen"></vk-option>
        </vk-select>
      </label>
    </div>
    <div>
      <vk-button @click="clearForm">清空表单</vk-button>
      <vk-button @click="fillDemo">填充示例数据</vk-button>
    </div>
    <pre>{{ JSON.stringify(userForm, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { useLocalStorage } from "vakao-ui";

const defaultForm = {
  name: "",
  age: "",
  email: "",
  city: "",
};

const [userForm, setUserForm, clearForm] = useLocalStorage("user-form", defaultForm);

// 更新表单字段
const updateForm = (field, value) => {
  setUserForm({
    ...userForm.value,
    [field]: value,
  });
};

const fillDemo = () => {
  setUserForm({
    name: "张三",
    age: "25",
    email: "zhangsan@example.com",
    city: "beijing",
  });
};
</script>
```

  </template>
</Demo>

## 数组数据管理

管理列表数据，支持增删改查操作。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0 0 12px 0;">待办事项列表</h4>
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <vk-input 
          :value="newTodo" 
          @input="(value) => newTodo = value"
          placeholder="输入新的待办事项"
          @keyup.enter="addTodo"
          style="flex: 1;"
        />
        <vk-button @click="addTodo" type="primary" :disabled="!newTodo.trim()">添加</vk-button>
      </div>
    </div>
    <div v-if="todoList.length === 0" style="text-align: center; padding: 40px; color: #999; background: #fafafa; border-radius: 4px;">
      📝 暂无待办事项，添加一个开始吧！
    </div>
    <div v-else>
      <div v-for="(todo, index) in todoList" :key="todo.id" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e8e8e8; border-radius: 4px; margin-bottom: 8px;">
        <vk-checkbox :checked="todo.completed" @change="() => toggleTodo(index)" />
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : '#333', flex: 1 }">{{ todo.text }}</span>
        <vk-button @click="removeTodo(index)" size="small" type="danger">删除</vk-button>
      </div>
    </div>
    <div v-if="todoList.length > 0" style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="clearCompleted" :disabled="!hasCompleted" type="warning">清除已完成</vk-button>
      <vk-button @click="clearAll" type="danger">清空全部</vk-button>
    </div>
    <div v-if="todoList.length > 0" style="margin-top: 12px; padding: 8px; background: #f0f9ff; border-radius: 4px; font-size: 14px; color: #1890ff;">
      📊 总计: {{ todoList.length }}, 已完成: {{ completedCount }}
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 100%;">
    <h3>待办事项列表</h3>
    <div>
      <vk-input :value="newTodo" @input="(value) => (newTodo = value)" @keyup.enter="addTodo" placeholder="输入新的待办事项" />
      <vk-button @click="addTodo" :disabled="!newTodo.trim()">添加</vk-button>
    </div>

    <div v-if="todoList.length === 0">暂无待办事项</div>
    <div v-else>
      <div v-for="(todo, index) in todoList" :key="todo.id">
        <vk-checkbox :checked="todo.completed" @change="() => toggleTodo(index)" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <vk-button @click="removeTodo(index)">删除</vk-button>
      </div>
    </div>

    <div>
      <vk-button @click="clearCompleted">清除已完成</vk-button>
      <vk-button @click="clearAll">清空全部</vk-button>
    </div>

    <p>总计: {{ todoList.length }}, 已完成: {{ completedCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLocalStorage } from "vakao-ui";

const [todoList, setTodoList] = useLocalStorage("todo-list", []);
const newTodo = ref("");

// 计算属性
const completedCount = computed(() => todoList.value.filter((todo) => todo.completed).length);

const hasCompleted = computed(() => todoList.value.some((todo) => todo.completed));

// 添加待办事项
const addTodo = () => {
  if (!newTodo.value.trim()) return;

  const newItem = {
    id: Date.now(),
    text: newTodo.value.trim(),
    completed: false,
  };

  setTodoList([...todoList.value, newItem]);
  newTodo.value = "";
};

// 切换完成状态
const toggleTodo = (index) => {
  setTodoList(todoList.value.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)));
};

// 删除待办事项
const removeTodo = (index) => {
  setTodoList(todoList.value.filter((_, i) => i !== index));
};

// 清除已完成
const clearCompleted = () => {
  setTodoList(todoList.value.filter((todo) => !todo.completed));
};

// 清空全部
const clearAll = () => {
  setTodoList([]);
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: #999;
}
</style>
```

  </template>
</Demo>

## 自定义序列化器

对于特殊数据类型（如 Date），可以提供自定义的序列化器。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 500;">上次访问时间:</label>
      <vk-input 
        type="date"
        :value="lastVisit?.toISOString().split('T')[0] || ''"
        @input="updateLastVisit"
        style="padding: 8px; border: 1px solid #d9d9d9; border-radius: 4px;"
      />
    </div>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <strong>存储的时间:</strong> {{ lastVisit?.toLocaleString() || '未设置' }}
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 100%;">
    <vk-input type="date" :value="lastVisit?.toISOString().split('T')[0]" @input="updateLastVisit" />
    <p>上次访问: {{ lastVisit?.toLocaleString() }}</p>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from "vakao-ui";

const dateSerializer = {
  read: (value: string) => {
    return value ? new Date(value) : null;
  },
  write: (value: Date | null) => {
    return value ? value.toISOString() : "";
  },
};

const [lastVisit, setLastVisit] = useLocalStorage("last-visit", null, {
  serializer: dateSerializer,
});

const updateLastVisit = (value: string) => {
  setLastVisit(new Date(value));
};
</script>
```

  </template>
</Demo>

## 跨标签页同步

启用跨标签页同步功能，多个标签页之间的数据会自动同步。

<Demo>
  <div style="width: 100%;">
    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0 0 12px 0;">购物车 (跨标签页同步)</h4>
      <p style="margin: 0 0 12px 0; color: #666; font-size: 14px;">💡 打开多个标签页测试同步效果</p>
    </div>
    <div v-if="cart.length === 0" style="text-align: center; padding: 30px; color: #999; background: #fafafa; border-radius: 4px;">
      🛒 购物车为空
    </div>
    <div v-else style="margin-bottom: 16px;">
      <div v-for="item in cart" :key="item.id" style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid #e8e8e8; border-radius: 4px; margin-bottom: 8px;">
        <div>
          <span style="font-weight: 500;">{{ item.name }}</span>
          <span style="margin-left: 12px; color: #666;">数量: {{ item.quantity }}</span>
        </div>
        <vk-button @click="removeFromCart(item.id)" size="small" type="danger">移除</vk-button>
      </div>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="addToCart" type="primary">添加商品</vk-button>
      <vk-button @click="clearCart" type="warning" :disabled="cart.length === 0">清空购物车</vk-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width: 100%;">
    <h3>购物车 (跨标签页同步)</h3>
    <div v-for="item in cart" :key="item.id">
      {{ item.name }} - 数量: {{ item.quantity }}
      <vk-button @click="removeFromCart(item.id)" size="small" type="danger"> 移除 </vk-button>
    </div>
    <vk-button @click="addToCart" type="primary">添加商品</vk-button>
    <vk-button @click="clearCart" type="warning">清空购物车</vk-button>
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from "vakao-ui";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

const [cart, setCart, clearCart] = useLocalStorage<CartItem[]>("shopping-cart", [], { syncAcrossTabs: true });

const addToCart = () => {
  const newItem: CartItem = {
    id: Date.now(),
    name: `商品 ${cart.value.length + 1}`,
    quantity: 1,
  };
  setCart([...cart.value, newItem]);
};

const removeFromCart = (id: number) => {
  setCart(cart.value.filter((item) => item.id !== id));
};
</script>
```

  </template>
</Demo>

## API

### 参数

| 参数         | 类型                        | 默认值 | 说明                |
| ------------ | --------------------------- | ------ | ------------------- |
| key          | `string`                    | -      | localStorage 的键名 |
| defaultValue | `T`                         | -      | 默认值              |
| options      | `UseLocalStorageOptions<T>` | `{}`   | 配置选项            |

### UseLocalStorageOptions

| 属性           | 类型                     | 默认值          | 说明             |
| -------------- | ------------------------ | --------------- | ---------------- |
| serializer     | `StorageSerializer<T>`   | `JSON`          | 自定义序列化器   |
| syncAcrossTabs | `boolean`                | `false`         | 是否跨标签页同步 |
| onError        | `(error: Error) => void` | `console.error` | 错误处理函数     |

### 返回值

返回一个数组 `[storedValue, setValue, removeValue]`：

| 索引 | 名称        | 类型                    | 说明               |
| ---- | ----------- | ----------------------- | ------------------ |
| 0    | storedValue | `Ref<T>`                | 存储的值（响应式） |
| 1    | setValue    | `SetStorageFunction<T>` | 设置值函数         |
| 2    | removeValue | `RemoveStorageFunction` | 移除值函数         |

### 类型定义

```ts
/**
 * 设置存储值函数类型
 * @param value 要设置的值
 */
type SetStorageFunction<T> = (value: T) => void;

/**
 * 移除存储值函数类型
 */
type RemoveStorageFunction = () => void;

/**
 * useLocalStorage 返回值类型
 * @example
 * const [value, setValue, removeValue] = useLocalStorage('key', 'default');
 */
type UseLocalStorageReturn<T> = [
  /** 存储的值（响应式） */ Ref<T>,
  /** 设置值函数 */ SetStorageFunction<T>,
  /** 移除值函数 */ RemoveStorageFunction,
];

/**
 * 存储序列化器接口
 */
interface StorageSerializer<T> {
  /** 读取时的反序列化函数 */
  read: (value: string) => T;
  /** 写入时的序列化函数 */
  write: (value: T) => string;
}

/**
 * useLocalStorage 配置选项
 */
interface UseLocalStorageOptions<T> {
  /** 自定义序列化器 */
  serializer?: StorageSerializer<T>;
  /** 是否跨标签页同步 */
  syncAcrossTabs?: boolean;
  /** 错误处理函数 */
  onError?: (error: Error) => void;
}

/**
 * 本地存储钩子
 * @param key localStorage 的键名
 * @param defaultValue 默认值
 * @param options 配置选项
 * @returns UseLocalStorageReturn
 * @example
 * const [username, setUsername, removeUsername] = useLocalStorage('username', '');
 */
function useLocalStorage<T>(key: string, defaultValue: T, options?: UseLocalStorageOptions<T>): UseLocalStorageReturn<T>;
```

## 注意事项

1. **浏览器兼容性** - 需要浏览器支持 localStorage API
2. **序列化** - 默认使用 JSON 序列化，复杂对象需要自定义序列化器
3. **存储限制** - localStorage 有大小限制（通常 5-10MB）
4. **错误处理** - 当 localStorage 不可用时会使用内存存储
5. **跨标签页同步** - 启用后会监听 storage 事件实现同步
6. **SSR 支持** - 在服务端渲染时会使用默认值

## 使用场景

- 用户偏好设置
- 表单数据持久化
- 购物车状态保存
- 主题切换状态
- 用户登录状态
- 应用配置信息

<script setup>
import { ref, computed } from 'vue';
import { useLocalStorage } from '@vakao-ui/hooks';

// 基础用法示例
const [username, setUsername, clearUsername] = useLocalStorage('demo-username', '');

// 存储对象数据示例
const defaultSettings = {
  darkMode: false,
  language: 'zh'
};

const [settings, setSettings, resetSettings] = useLocalStorage(
  'demo-user-settings',
  defaultSettings
);

// 更新设置字段
const updateSettings = (field, value) => {
  console.log('更新设置字段', field, value);
  setSettings({
    ...settings.value,
    [field]: value
  });
};

// 计数器演示
const [count, setCount] = useLocalStorage('demo-counter', 0);

const increment = () => setCount(count.value + 1);
const decrement = () => setCount(count.value - 1);
const reset = () => setCount(0);

// 表单数据持久化演示
const defaultForm = {
  name: '',
  age: '',
  email: '',
  city: ''
};

const [userForm, setUserForm, clearForm] = useLocalStorage('demo-user-form', defaultForm);

// 更新表单字段
const updateForm = (field, value) => {
  setUserForm({
    ...userForm.value,
    [field]: value
  });
};

const fillDemo = () => {
  setUserForm({
    name: '张三',
    age: '25',
    email: 'zhangsan@example.com',
    city: 'beijing'
  });
};

// 待办事项列表演示
const [todoList, setTodoList] = useLocalStorage('demo-todo-list', []);
const newTodo = ref('');

// 计算属性
const completedCount = computed(() => 
  todoList.value.filter(todo => todo.completed).length
);

const hasCompleted = computed(() => 
  todoList.value.some(todo => todo.completed)
);

// 添加待办事项
const addTodo = () => {
  if (!newTodo.value.trim()) return;
  
  const newItem = {
    id: Date.now(),
    text: newTodo.value.trim(),
    completed: false
  };
  
  setTodoList([...todoList.value, newItem]);
  newTodo.value = '';
};

// 切换完成状态
const toggleTodo = (index) => {
  setTodoList(
    todoList.value.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

// 删除待办事项
const removeTodo = (index) => {
  setTodoList(todoList.value.filter((_, i) => i !== index));
};

// 清除已完成
const clearCompleted = () => {
  setTodoList(todoList.value.filter(todo => !todo.completed));
};

// 清空全部
const clearAll = () => {
  setTodoList([]);
};

// 自定义序列化器示例
const dateSerializer = {
  read: (value) => {
    return value ? new Date(value) : null;
  },
  write: (value) => {
    return value ? value.toISOString() : '';
  }
};

const [lastVisit, setLastVisit] = useLocalStorage(
  'demo-last-visit',
  null,
  { serializer: dateSerializer }
);

const updateLastVisit = (value) => {
  setLastVisit(new Date(value));
};

// 跨标签页同步示例
const [cart, setCart, clearCart] = useLocalStorage(
  'demo-shopping-cart',
  [],
  { syncAcrossTabs: true }
);

const addToCart = () => {
  const newItem = {
    id: Date.now(),
    name: `商品 ${cart.value.length + 1}`,
    quantity: 1
  };
  setCart([...cart.value, newItem]);
};

const removeFromCart = (id) => {
  setCart(cart.value.filter(item => item.id !== id));
};
</script>
