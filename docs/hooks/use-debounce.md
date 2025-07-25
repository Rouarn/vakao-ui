# useDebounce

防抖钩子，用于延迟执行函数或响应式值的更新。

## 基本用法

### 防抖响应式值

```vue
<template>
  <div>
    <input 
      v-model="searchText" 
      placeholder="输入搜索关键词"
    />
    <p>实时输入: {{ searchText }}</p>
    <p>防抖后的值: {{ debouncedSearchText }}</p>
    <p>搜索结果: {{ searchResults }}</p>
  </div>
</template>

<script setup>
import { useDebounce } from 'vakao-ui';
import { ref, watch } from 'vue';

const searchText = ref('');
const debouncedSearchText = useDebounce(searchText, 500);
const searchResults = ref([]);

// 监听防抖后的值进行搜索
watch(debouncedSearchText, async (newValue) => {
  if (newValue) {
    // 模拟 API 调用
    searchResults.value = [`结果1: ${newValue}`, `结果2: ${newValue}`];
  } else {
    searchResults.value = [];
  }
});
</script>
```

### 防抖函数

```vue
<template>
  <div>
    <button @click="debouncedSave">保存 (防抖)</button>
    <button @click="cancelSave">取消保存</button>
    <button @click="flushSave">立即保存</button>
    <p v-if="saving">正在保存...</p>
    <p v-if="saved">保存成功!</p>
  </div>
</template>

<script setup>
import { useDebounce } from 'vakao-ui';
import { ref } from 'vue';

const saving = ref(false);
const saved = ref(false);

const saveData = async () => {
  saving.value = true;
  saved.value = false;
  
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  saving.value = false;
  saved.value = true;
  
  setTimeout(() => {
    saved.value = false;
  }, 2000);
};

const [debouncedSave, cancelSave, flushSave] = useDebounce(saveData, 1000);
</script>
```

## 高级用法

### 配置 leading 和 trailing

```vue
<template>
  <div>
    <h3>不同的防抖配置</h3>
    
    <div>
      <button @click="leadingDebounce">Leading (立即执行)</button>
      <p>{{ leadingCount }} 次点击</p>
    </div>
    
    <div>
      <button @click="trailingDebounce">Trailing (延迟执行)</button>
      <p>{{ trailingCount }} 次点击</p>
    </div>
    
    <div>
      <button @click="bothDebounce">Both (首次立即，后续延迟)</button>
      <p>{{ bothCount }} 次点击</p>
    </div>
  </div>
</template>

<script setup>
import { useDebounce } from 'vakao-ui';
import { ref } from 'vue';

const leadingCount = ref(0);
const trailingCount = ref(0);
const bothCount = ref(0);

const [leadingDebounce] = useDebounce(
  () => leadingCount.value++,
  500,
  { leading: true, trailing: false }
);

const [trailingDebounce] = useDebounce(
  () => trailingCount.value++,
  500,
  { leading: false, trailing: true }
);

const [bothDebounce] = useDebounce(
  () => bothCount.value++,
  500,
  { leading: true, trailing: true }
);
</script>
```

### 表单验证防抖

```vue
<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>邮箱:</label>
        <input 
          v-model="email" 
          type="email" 
          :class="{ error: emailError }"
        />
        <span v-if="emailError" class="error-text">{{ emailError }}</span>
      </div>
      
      <div>
        <label>用户名:</label>
        <input 
          v-model="username" 
          :class="{ error: usernameError }"
        />
        <span v-if="usernameError" class="error-text">{{ usernameError }}</span>
      </div>
      
      <button type="submit" :disabled="hasErrors">提交</button>
    </form>
  </div>
</template>

<script setup>
import { useDebounce } from 'vakao-ui';
import { ref, computed, watch } from 'vue';

const email = ref('');
const username = ref('');
const emailError = ref('');
const usernameError = ref('');

const debouncedEmail = useDebounce(email, 300);
const debouncedUsername = useDebounce(username, 300);

const hasErrors = computed(() => {
  return !!(emailError.value || usernameError.value);
});

// 防抖验证邮箱
watch(debouncedEmail, async (newEmail) => {
  if (!newEmail) {
    emailError.value = '';
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    emailError.value = '邮箱格式不正确';
    return;
  }
  
  // 模拟检查邮箱是否已存在
  const exists = await checkEmailExists(newEmail);
  emailError.value = exists ? '邮箱已存在' : '';
});

// 防抖验证用户名
watch(debouncedUsername, async (newUsername) => {
  if (!newUsername) {
    usernameError.value = '';
    return;
  }
  
  if (newUsername.length < 3) {
    usernameError.value = '用户名至少3个字符';
    return;
  }
  
  // 模拟检查用户名是否已存在
  const exists = await checkUsernameExists(newUsername);
  usernameError.value = exists ? '用户名已存在' : '';
});

const checkEmailExists = async (email: string) => {
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));
  return email === 'test@example.com';
};

const checkUsernameExists = async (username: string) => {
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500));
  return username === 'admin';
};

const submitForm = () => {
  if (!hasErrors.value) {
    console.log('提交表单', { email: email.value, username: username.value });
  }
};
</script>

<style scoped>
.error {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 12px;
}
</style>
```

## API

### 参数

#### 防抖响应式值

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | `Ref<T>` | - | 要防抖的响应式值 |
| delay | `number` | - | 延迟时间（毫秒） |
| options | `UseDebounceOptions` | `{}` | 配置选项 |

#### 防抖函数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| fn | `Function` | - | 要防抖的函数 |
| delay | `number` | - | 延迟时间（毫秒） |
| options | `UseDebounceOptions` | `{}` | 配置选项 |

### UseDebounceOptions

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| leading | `boolean` | `false` | 是否在延迟开始前调用 |
| trailing | `boolean` | `true` | 是否在延迟结束后调用 |

### 返回值

#### 防抖响应式值

返回防抖后的响应式值 `Ref<T>`。

#### 防抖函数

返回一个数组 `[debouncedFn, cancel, flush]`：

| 索引 | 名称 | 类型 | 说明 |
| --- | --- | --- | --- |
| 0 | debouncedFn | `DebouncedFunction` | 防抖后的函数 |
| 1 | cancel | `DebounceCancelFunction` | 取消执行函数 |
| 2 | flush | `DebounceFlushFunction` | 立即执行函数 |

### 类型定义

```ts
/**
 * 防抖函数类型
 */
type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

/**
 * 取消函数类型
 */
type DebounceCancelFunction = () => void;

/**
 * 立即执行函数类型
 */
type DebounceFlushFunction = () => void;

/**
 * useDebounce 配置选项
 */
interface UseDebounceOptions {
  /** 是否在延迟开始前调用 */
  leading?: boolean;
  /** 是否在延迟结束后调用 */
  trailing?: boolean;
}

/**
 * 防抖钩子 - 响应式值版本
 * @param value 要防抖的响应式值
 * @param delay 延迟时间（毫秒）
 * @param options 配置选项
 * @returns 防抖后的响应式值
 * @example
 * const debouncedValue = useDebounce(inputValue, 300);
 */
function useDebounce<T>(
  value: Ref<T>,
  delay: number,
  options?: UseDebounceOptions
): Ref<T>;

/**
 * 防抖钩子 - 函数版本
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @param options 配置选项
 * @returns [防抖函数, 取消函数, 立即执行函数]
 * @example
 * const [debouncedFn, cancel, flush] = useDebounce(saveData, 1000);
 */
function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options?: UseDebounceOptions
): [DebouncedFunction<T>, DebounceCancelFunction, DebounceFlushFunction];
```

## 注意事项

1. **延迟时间** - 合理设置延迟时间，过短可能无效，过长影响用户体验
2. **内存泄漏** - 组件卸载时会自动清理定时器
3. **leading/trailing** - 根据需求选择合适的触发时机
4. **取消和立即执行** - 函数版本提供了更多控制选项
5. **响应式** - 值版本返回的是响应式引用，可以直接在模板中使用

## 使用场景

- 搜索框输入防抖
- 按钮点击防抖
- 表单验证防抖
- 窗口大小调整防抖
- API 调用防抖
- 自动保存功能