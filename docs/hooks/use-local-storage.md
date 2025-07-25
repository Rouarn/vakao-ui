# useLocalStorage

本地存储钩子，提供响应式的 localStorage 操作。

## 基本用法

最简单的用法是存储字符串值，数据会自动持久化到 localStorage。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <div style="margin-bottom: 16px;">
      <vk-input 
        :value="username" 
        @input="setUsername"
        placeholder="输入用户名"
        style="width: 200px;"
      />
      <vk-button @click="removeUsername" type="warning" style="margin-left: 8px;">清除</vk-button>
    </div>
    <div style="background: #f5f5f5; padding: 12px; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;"><strong>存储的用户名:</strong> 
        <span style="color: #1890ff;">{{ username || '(空)' }}</span>
      </p>
      <p style="margin: 8px 0 0; font-size: 12px; color: #666;">刷新页面数据依然存在</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-input :value="username" @input="setUsername" placeholder="输入用户名" />
    <p>存储的用户名: {{ username }}</p>
    <vk-button @click="removeUsername">清除用户名</vk-button>
  </div>
</template>

<script setup>
import { useLocalStorage } from "vakao-ui";

const [username, setUsername, removeUsername] = useLocalStorage("username", "");
</script>
```

  </template>
</Demo>

## 存储对象数据

可以存储复杂的对象数据，自动进行 JSON 序列化和反序列化。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <h4 style="margin-top: 0; margin-bottom: 16px;">用户设置</h4>
    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
      <label style="display: flex; align-items: center; gap: 8px;">
        <vk-checkbox 
          :checked="settings.darkMode" 
          @change="toggleDarkMode"
        >
          深色模式
        </vk-checkbox>
      </label>
      <label style="display: flex; align-items: center; gap: 8px;">
        <span>语言:</span>
        <select :value="settings.language" @change="updateLanguage" style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px;">
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </label>
    </div>
    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <vk-button @click="resetSettings" type="warning">重置设置</vk-button>
    </div>
    <div style="background: #f5f5f5; padding: 12px; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;"><strong>当前设置:</strong></p>
      <pre style="margin: 8px 0 0; font-size: 12px; color: #666;">{{ JSON.stringify(settings, null, 2) }}</pre>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <h3>用户设置</h3>
    <label>
      <vk-checkbox
        :checked="settings.darkMode"
        @change="toggleDarkMode"
      >
        深色模式
      </vk-checkbox>
    </label>
    <br />
    <label>
      语言:
      <select :value="settings.language" @change="updateLanguage">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </label>
    <br />
    <vk-button @click="resetSettings">重置设置</vk-button>
  </div>
</template>

<script setup>
import { useLocalStorage } from "vakao-ui";
import { watch } from "vue";

const defaultSettings = {
  darkMode: false,
  language: "zh",
};

const [settings, setSettings, removeSettings] = useLocalStorage(
  "user-settings",
  defaultSettings
);

const toggleDarkMode = (checked) => {
  setSettings(prev => ({ ...prev, darkMode: checked }));
};

const updateLanguage = (event) => {
  setSettings(prev => ({ ...prev, language: event.target.value }));
};

const resetSettings = () => {
  setSettings(defaultSettings);
};
</script>
```

  </template>
</Demo>

## 只读状态演示

展示第一个返回值是只读的，只能通过 setter 函数修改，符合 React Hook 设计模式。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <h4 style="margin-top: 0; margin-bottom: 16px;">计数器演示</h4>
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <span style="font-size: 18px; font-weight: bold; color: #1890ff;">当前计数: {{ count }}</span>
      <vk-button @click="increment" type="primary">+1</vk-button>
      <vk-button @click="decrement">-1</vk-button>
      <vk-button @click="reset" type="warning">重置</vk-button>
    </div>
    <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px;">
      <p style="margin: 0; color: #666;">✅ 正确方式：通过 setCount() 修改</p>
      <p style="margin: 4px 0 0; color: #666;">❌ 错误方式：count.value = newValue（只读属性）</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>当前计数: {{ count }}</p>
    <vk-button @click="increment">+1</vk-button>
    <vk-button @click="decrement">-1</vk-button>
    <vk-button @click="reset">重置</vk-button>
  </div>
</template>

<script setup>
import { useLocalStorage } from "vakao-ui";

const [count, setCount] = useLocalStorage("counter", 0);

// ✅ 正确：通过 setter 函数修改
const increment = () => setCount(count.value + 1);
const decrement = () => setCount(count.value - 1);
const reset = () => setCount(0);

// ❌ 错误：直接修改会报错（只读属性）
// count.value = 10; // TypeError: Cannot set property value
</script>
```

  </template>
</Demo>

## 表单数据持久化

展示如何使用函数式更新和复杂对象的持久化存储。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <h4 style="margin-top: 0; margin-bottom: 16px;">用户信息表单</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px;">姓名:</label>
        <vk-input 
          :value="userForm.name" 
          @input="updateName"
          placeholder="请输入姓名"
          style="width: 100%;"
        />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px;">年龄:</label>
        <vk-input 
          :value="userForm.age" 
          @input="updateAge"
          type="number"
          placeholder="请输入年龄"
          style="width: 100%;"
        />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px;">邮箱:</label>
        <vk-input 
          :value="userForm.email" 
          @input="updateEmail"
          type="email"
          placeholder="请输入邮箱"
          style="width: 100%;"
        />
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-size: 14px;">城市:</label>
        <vk-select 
          :value="userForm.city" 
          @change="updateCity"
          placeholder="请选择城市"
          style="width: 100%;"
        >
          <vk-option value="beijing">北京</vk-option>
          <vk-option value="shanghai">上海</vk-option>
          <vk-option value="guangzhou">广州</vk-option>
          <vk-option value="shenzhen">深圳</vk-option>
        </vk-select>
      </div>
    </div>
    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <vk-button @click="clearForm" type="warning">清空表单</vk-button>
      <vk-button @click="fillDemo" type="primary">填充示例数据</vk-button>
    </div>
    <div style="background: #f5f5f5; padding: 12px; border-radius: 4px;">
      <p style="margin: 0; font-size: 14px;"><strong>表单数据:</strong></p>
      <pre style="margin: 8px 0 0; font-size: 12px; color: #666;">{{ JSON.stringify(userForm, null, 2) }}</pre>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <h3>用户信息表单</h3>
    <div>
      <label>姓名: <vk-input :value="userForm.name" @input="updateName" /></label>
      <label
        >年龄: <vk-input :value="userForm.age" @input="updateAge" type="number"
      /></label>
      <label
        >邮箱: <vk-input :value="userForm.email" @input="updateEmail" type="email"
      /></label>
      <label>
        城市:
        <vk-select :value="userForm.city" @change="updateCity" placeholder="请选择城市">
          <vk-option value="beijing">北京</vk-option>
          <vk-option value="shanghai">上海</vk-option>
          <vk-option value="guangzhou">广州</vk-option>
          <vk-option value="shenzhen">深圳</vk-option>
        </vk-select>
      </label>
    </div>
    <vk-button @click="clearForm">清空表单</vk-button>
    <vk-button @click="fillDemo">填充示例数据</vk-button>
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

const [userForm, setUserForm] = useLocalStorage("user-form", defaultForm);

// 使用函数式更新，只修改特定字段
const updateName = event => {
  const value = event.target ? event.target.value : event;
  setUserForm(prev => ({ ...prev, name: value }));
};

const updateAge = event => {
  const value = event.target ? event.target.value : event;
  setUserForm(prev => ({ ...prev, age: value }));
};

const updateEmail = event => {
  const value = event.target ? event.target.value : event;
  setUserForm(prev => ({ ...prev, email: value }));
};

const updateCity = (value) => {
  const cityValue = value && typeof value === 'object' && value.target ? value.target.value : value;
  setUserForm(prev => ({ ...prev, city: cityValue }));
};

const clearForm = () => {
  setUserForm(defaultForm);
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

展示如何使用 useLocalStorage 管理列表数据，包括增删改查操作。

<Demo>
  <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; width: 100%;">
    <h4 style="margin-top: 0; margin-bottom: 16px;">待办事项列表</h4>
    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
      <vk-input 
        :value="newTodo" 
        @input="updateNewTodo" 
        placeholder="输入新的待办事项"
        style="flex: 1;"
        @keyup.enter="addTodo"
      />
      <vk-button @click="addTodo" type="primary" :disabled="!newTodo.trim()">添加</vk-button>
    </div>
    <div v-if="todoList.length === 0" style="text-align: center; color: #999; padding: 20px;">
      暂无待办事项
    </div>
    <div v-else>
      <div v-for="(todo, index) in todoList" :key="todo.id" style="display: flex; align-items: center; gap: 8px; padding: 8px; border: 1px solid #e8e8e8; border-radius: 4px; margin-bottom: 8px;">
        <vk-checkbox 
          :checked="todo.completed" 
          @change="(checked) => toggleTodo(index, checked)"
        />
        <span 
          :style="{ 
            flex: 1, 
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#999' : '#333'
          }"
        >
          {{ todo.text }}
        </span>
        <vk-button @click="removeTodo(index)" size="small" type="danger">删除</vk-button>
      </div>
    </div>
    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <vk-button @click="clearCompleted" :disabled="!hasCompleted">清除已完成</vk-button>
      <vk-button @click="clearAll" type="warning" :disabled="todoList.length === 0">清空全部</vk-button>
    </div>
    <div style="background: #f5f5f5; padding: 12px; border-radius: 4px; margin-top: 16px;">
      <p style="margin: 0; font-size: 14px;">
        <strong>统计:</strong> 
        总计 {{ todoList.length }} 项，
        已完成 {{ completedCount }} 项，
        未完成 {{ todoList.length - completedCount }} 项
      </p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <h3>待办事项列表</h3>
    <div>
      <vk-input
        v-model="newTodo"
        placeholder="输入新的待办事项"
        @keyup.enter="addTodo"
      />
      <vk-button @click="addTodo" :disabled="!newTodo.trim()">添加</vk-button>
    </div>

    <div v-if="todoList.length === 0">暂无待办事项</div>
    <div v-else>
      <div v-for="(todo, index) in todoList" :key="todo.id">
        <vk-checkbox
          :checked="todo.completed"
          @change="(checked) => toggleTodo(index, checked)"
        />
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
const completedCount = computed(
  () => todoList.value.filter(todo => todo.completed).length
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
    completed: false,
  };

  setTodoList(prev => [...prev, newItem]);
  newTodo.value = "";
};

// 切换完成状态
const toggleTodo = (index, checked) => {
  // 如果第二个参数是事件对象，提取checked值；否则直接使用
  const isChecked = typeof checked === 'boolean' ? checked : !todoList.value[index].completed;
  setTodoList(prev =>
    prev.map((todo, i) =>
      i === index ? { ...todo, completed: isChecked } : todo
    )
  );
};

// 删除待办事项
const removeTodo = index => {
  setTodoList(prev => prev.filter((_, i) => i !== index));
};

// 清除已完成
const clearCompleted = () => {
  setTodoList(prev => prev.filter(todo => !todo.completed));
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

```vue
<template>
  <div>
    <vk-input
      type="date"
      :value="lastVisit?.toISOString().split('T')[0]"
      @input="updateLastVisit"
    />
    <p>上次访问: {{ lastVisit?.toLocaleString() }}</p>
  </div>
</template>

<script setup>
import { useLocalStorage } from 'vakao-ui';

const dateSerializer = {
  read: (value: string) => {
    return value ? new Date(value) : null;
  },
  write: (value: Date | null) => {
    return value ? value.toISOString() : '';
  }
};

const [lastVisit, setLastVisit] = useLocalStorage(
  'last-visit',
  null,
  { serializer: dateSerializer }
);

const updateLastVisit = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setLastVisit(new Date(target.value));
};
</script>
```

## 跨标签页同步

```vue
<template>
  <div>
    <h3>购物车 (跨标签页同步)</h3>
    <div v-for="item in cart" :key="item.id">
      {{ item.name }} - 数量: {{ item.quantity }}
      <vk-button @click="removeFromCart(item.id)" size="small" type="danger">移除</vk-button>
    </div>
    <vk-button @click="addToCart" type="primary">添加商品</vk-button>
    <vk-button @click="clearCart" type="warning">清空购物车</vk-button>
  </div>
</template>

<script setup>
import { useLocalStorage } from 'vakao-ui';
import { ref } from 'vue';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
}

const [cart, setCart, removeCart] = useLocalStorage<CartItem[]>(
  'shopping-cart',
  [],
  { syncAcrossTabs: true }
);

const addToCart = () => {
  const newItem: CartItem = {
    id: Date.now(),
    name: `商品 ${cart.value.length + 1}`,
    quantity: 1
  };
  setCart([...cart.value, newItem]);
};

const removeFromCart = (id: number) => {
  setCart(cart.value.filter(item => item.id !== id));
};

const clearCart = () => {
  removeCart();
};
</script>
```

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

### StorageSerializer

```ts
interface StorageSerializer<T> {
  read: (value: string) => T;
  write: (value: T) => string;
}
```

### 返回值

返回一个数组 `[storedValue, setValue, removeValue]`：

| 索引 | 名称        | 类型                    | 说明             |
| ---- | ----------- | ----------------------- | ---------------- |
| 0    | storedValue | `ComputedRef<T>`        | 存储的值（只读） |
| 1    | setValue    | `SetStorageFunction<T>` | 设置值函数       |
| 2    | removeValue | `RemoveStorageFunction` | 移除值函数       |

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
  /** 存储的值（只读） */ ComputedRef<T>,
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
function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options?: UseLocalStorageOptions<T>
): UseLocalStorageReturn<T>;
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

// 基本用法示例
const [username, setUsername, removeUsername] = useLocalStorage('demo-username', '');

// 存储对象数据示例
const defaultSettings = {
  darkMode: false,
  language: 'zh'
};

const [settings, setSettings, removeSettings] = useLocalStorage(
  'demo-user-settings',
  defaultSettings
);

const toggleDarkMode = (checked) => {
  setSettings(prev => ({ ...prev, darkMode: checked }));
};

const updateLanguage = (event) => {
  setSettings(prev => ({ ...prev, language: event.target.value }));
};

const resetSettings = () => {
  setSettings(defaultSettings);
};

// 计数器演示
const [count, setCount] = useLocalStorage("counter", 0);

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

const [userForm, setUserForm] = useLocalStorage('user-form', defaultForm);

const updateName = (event) => {
  const value = event.target ? event.target.value : event;
  setUserForm(prev => ({ ...prev, name: value }));
};

const updateAge = (event) => {
  const value = event.target ? event.target.value : event;
  setUserForm(prev => ({ ...prev, age: value }));
};

const updateEmail = (event) => {
  const value = event.target ? event.target.value : event;
  setUserForm(prev => ({ ...prev, email: value }));
};

const updateCity = (value) => {
  const cityValue = value && typeof value === 'object' && value.target ? value.target.value : value;
  setUserForm(prev => ({ ...prev, city: cityValue }));
};

const clearForm = () => {
  setUserForm(defaultForm);
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
const [todoList, setTodoList] = useLocalStorage('todo-list', []);
const newTodo = ref('');

// 更新新待办事项
const updateNewTodo = (event) => {
  const value = event.target ? event.target.value : event;
  newTodo.value = value;
};

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
  
  setTodoList(prev => [...prev, newItem]);
  newTodo.value = '';
};

// 切换完成状态
const toggleTodo = (index, checked) => {
  // 如果第二个参数是事件对象，提取checked值；否则直接使用
  const isChecked = typeof checked === 'boolean' ? checked : !todoList.value[index].completed;
  setTodoList(prev => 
    prev.map((todo, i) => 
      i === index ? { ...todo, completed: isChecked } : todo
    )
  );
};

// 删除待办事项
const removeTodo = (index) => {
  setTodoList(prev => prev.filter((_, i) => i !== index));
};

// 清除已完成
const clearCompleted = () => {
  setTodoList(prev => prev.filter(todo => !todo.completed));
};

// 清空全部
const clearAll = () => {
  setTodoList([]);
};
</script>
