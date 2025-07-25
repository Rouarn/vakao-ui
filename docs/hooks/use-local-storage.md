# useLocalStorage

本地存储钩子，提供响应式的 localStorage 操作。

## 基本用法

```vue
<template>
  <div>
    <input v-model="username" placeholder="输入用户名" />
    <p>存储的用户名: {{ username }}</p>
    <button @click="removeUsername">清除用户名</button>
  </div>
</template>

<script setup>
import { useLocalStorage } from 'vakao-ui';

const [username, setUsername, removeUsername] = useLocalStorage('username', '');
</script>
```

## 存储对象数据

```vue
<template>
  <div>
    <h3>用户设置</h3>
    <label>
      <input 
        type="checkbox" 
        v-model="settings.darkMode" 
        @change="updateSettings"
      />
      深色模式
    </label>
    <br>
    <label>
      语言:
      <select v-model="settings.language" @change="updateSettings">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </label>
    <br>
    <button @click="resetSettings">重置设置</button>
  </div>
</template>

<script setup>
import { useLocalStorage } from 'vakao-ui';
import { watch } from 'vue';

const defaultSettings = {
  darkMode: false,
  language: 'zh'
};

const [settings, setSettings, removeSettings] = useLocalStorage(
  'user-settings',
  defaultSettings
);

const updateSettings = () => {
  setSettings(settings.value);
};

const resetSettings = () => {
  setSettings(defaultSettings);
};
</script>
```

## 自定义序列化器

```vue
<template>
  <div>
    <input 
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
      <button @click="removeFromCart(item.id)">移除</button>
    </div>
    <button @click="addToCart">添加商品</button>
    <button @click="clearCart">清空购物车</button>
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

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| key | `string` | - | localStorage 的键名 |
| defaultValue | `T` | - | 默认值 |
| options | `UseLocalStorageOptions<T>` | `{}` | 配置选项 |

### UseLocalStorageOptions

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| serializer | `StorageSerializer<T>` | `JSON` | 自定义序列化器 |
| syncAcrossTabs | `boolean` | `false` | 是否跨标签页同步 |
| onError | `(error: Error) => void` | `console.error` | 错误处理函数 |

### StorageSerializer

```ts
interface StorageSerializer<T> {
  read: (value: string) => T;
  write: (value: T) => string;
}
```

### 返回值

返回一个数组 `[storedValue, setValue, removeValue]`：

| 索引 | 名称 | 类型 | 说明 |
| --- | --- | --- | --- |
| 0 | storedValue | `Ref<T>` | 存储的值 |
| 1 | setValue | `SetStorageFunction<T>` | 设置值函数 |
| 2 | removeValue | `RemoveStorageFunction` | 移除值函数 |

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
  /** 存储的值 */ Ref<T>,
  /** 设置值函数 */ SetStorageFunction<T>,
  /** 移除值函数 */ RemoveStorageFunction
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