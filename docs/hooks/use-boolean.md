# useBoolean

一个简单的布尔值状态管理 Hook，提供布尔状态的设置和控制功能。相比 useToggle，useBoolean 更专注于状态设置而非切换操作。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🔄 加载状态管理</h3>
    <div style="margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
      <vk-button @click="startLoading" :disabled="isLoading" type="primary">
        开始加载
      </vk-button>
      <vk-button @click="stopLoading" :disabled="!isLoading">
        停止加载
      </vk-button>
      <vk-button @click="() => setLoading(true)" :disabled="isLoading" type="success">
        设置为 true
      </vk-button>
      <vk-button @click="() => setLoading(false)" :disabled="!isLoading" type="warning">
        设置为 false
      </vk-button>
    </div>
    <div style="padding: 16px; border-radius: 8px; text-align: center;"
         :style="{ background: isLoading ? '#e6f7ff' : '#f6ffed', border: `1px solid ${isLoading ? '#91d5ff' : '#b7eb8f'}` }">
      <div style="font-size: 18px; margin-bottom: 8px;">
        {{ isLoading ? '⏳ 正在加载...' : '✅ 加载完成' }}
      </div>
      <div style="color: #666; font-size: 14px;">
        当前状态: <code>{{ isLoading }}</code>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="startLoading" :disabled="isLoading" type="primary">
      开始加载
    </vk-button>
    <vk-button @click="stopLoading" :disabled="!isLoading">
      停止加载
    </vk-button>
    <vk-button
      @click="() => setLoading(true)"
      :disabled="isLoading"
      type="success"
    >
      设置为 true
    </vk-button>
    <vk-button
      @click="() => setLoading(false)"
      :disabled="!isLoading"
      type="warning"
    >
      设置为 false
    </vk-button>

    <div :style="{ background: isLoading ? '#e6f7ff' : '#f6ffed' }">
      {{ isLoading ? "⏳ 正在加载..." : "✅ 加载完成" }}
      <div>当前状态: {{ isLoading }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoolean } from "@vakao-ui/hooks";

const [isLoading, setLoading, startLoading, stopLoading] = useBoolean(false);
</script>
```

  </template>
</Demo>

## 表单验证示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">📝 表单验证</h3>
    <div style="margin-bottom: 16px;">
      <div style="margin-bottom: 12px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">用户名:</label>
        <vk-input 
          :value="username" 
          @input="(value) => { username = value; validateUsername(); }"
          placeholder="请输入用户名（至少3个字符）"
          style="width: 100%;"
          :class="{ 'error': hasUsernameError }"
        />
        <div v-if="hasUsernameError" style="color: #ff4d4f; font-size: 12px; margin-top: 4px;">
          用户名至少需要3个字符
        </div>
      </div>
      <div style="margin-bottom: 12px;">
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">邮箱:</label>
        <vk-input 
          :value="email" 
          @input="(value) => { email = value; validateEmail(); }"
          placeholder="请输入邮箱地址"
          style="width: 100%;"
          :class="{ 'error': hasEmailError }"
        />
        <div v-if="hasEmailError" style="color: #ff4d4f; font-size: 12px; margin-top: 4px;">
          请输入有效的邮箱地址
        </div>
      </div>
      <div style="margin-bottom: 16px;">
        <vk-button @click="submitForm" :disabled="!isFormValid" type="primary">
          提交表单
        </vk-button>
        <vk-button @click="resetForm" style="margin-left: 8px;">重置</vk-button>
      </div>
    </div>
    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <div style="margin-bottom: 8px;"><strong>验证状态:</strong></div>
      <div style="font-family: monospace; font-size: 12px;">
        用户名错误: <span :style="{ color: hasUsernameError ? '#ff4d4f' : '#52c41a' }">{{ hasUsernameError }}</span><br>
        邮箱错误: <span :style="{ color: hasEmailError ? '#ff4d4f' : '#52c41a' }">{{ hasEmailError }}</span><br>
        表单有效: <span :style="{ color: isFormValid ? '#52c41a' : '#ff4d4f' }">{{ isFormValid }}</span>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div>
      <label>用户名:</label>
      <vk-input
        v-model="username"
        @input="validateUsername"
        placeholder="请输入用户名（至少3个字符）"
        :class="{ error: hasUsernameError }"
      />
      <div v-if="hasUsernameError">用户名至少需要3个字符</div>
    </div>

    <div>
      <label>邮箱:</label>
      <vk-input
        v-model="email"
        @input="validateEmail"
        placeholder="请输入邮箱地址"
        :class="{ error: hasEmailError }"
      />
      <div v-if="hasEmailError">请输入有效的邮箱地址</div>
    </div>

    <vk-button @click="submitForm" :disabled="!isFormValid" type="primary">
      提交表单
    </vk-button>
    <vk-button @click="resetForm">重置</vk-button>

    <div>
      <div>验证状态:</div>
      <div>用户名错误: {{ hasUsernameError }}</div>
      <div>邮箱错误: {{ hasEmailError }}</div>
      <div>表单有效: {{ isFormValid }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoolean } from "@vakao-ui/hooks";
import { ref, computed } from "vue";

const username = ref("");
const email = ref("");

const [
  hasUsernameError,
  setUsernameError,
  showUsernameError,
  hideUsernameError,
] = useBoolean(false);
const [hasEmailError, setEmailError, showEmailError, hideEmailError] =
  useBoolean(false);

const isFormValid = computed(() => {
  return (
    !hasUsernameError.value &&
    !hasEmailError.value &&
    username.value &&
    email.value
  );
});

const validateUsername = () => {
  if (username.value.length < 3) {
    showUsernameError();
  } else {
    hideUsernameError();
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showEmailError();
  } else {
    hideEmailError();
  }
};

const submitForm = () => {
  if (isFormValid.value) {
    alert("表单提交成功！");
  }
};

const resetForm = () => {
  username.value = "";
  email.value = "";
  hideUsernameError();
  hideEmailError();
};
</script>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数         | 类型      | 默认值  | 说明       |
| ------------ | --------- | ------- | ---------- |
| initialValue | `boolean` | `false` | 初始布尔值 |

### 返回值

`useBoolean` 返回一个数组，包含以下元素：

```typescript
const [state, setValue, setTrue, setFalse] = useBoolean(initialValue);
```

| 索引 | 名称     | 类型                       | 说明                 |
| ---- | -------- | -------------------------- | -------------------- |
| 0    | state    | `ComputedRef<boolean>`     | 只读的响应式布尔状态 |
| 1    | setValue | `(value: boolean) => void` | 设置布尔值的函数     |
| 2    | setTrue  | `() => void`               | 设置为 true 的函数   |
| 3    | setFalse | `() => void`               | 设置为 false 的函数  |

## 类型定义

```typescript
export type SetValueFunction = (value: boolean) => void;
export type SetTrueFunction = () => void;
export type SetFalseFunction = () => void;

export type UseBooleanReturn = [
  ComputedRef<boolean>,
  SetValueFunction,
  SetTrueFunction,
  SetFalseFunction,
];
```

## 使用场景

1. **加载状态** - 控制加载、提交等状态
2. **表单验证** - 管理表单字段的错误状态
3. **UI 控制** - 控制组件的显示/隐藏状态
4. **权限控制** - 管理用户权限相关的布尔状态

## 与 useToggle 的区别

| 特性     | useBoolean         | useToggle      |
| -------- | ------------------ | -------------- |
| 主要用途 | 状态设置           | 状态切换       |
| 切换函数 | ❌                 | ✅             |
| 设置函数 | ✅                 | ✅             |
| 使用场景 | 加载状态、验证错误 | 开关、显示隐藏 |

## 注意事项

1. 返回的 `state` 是只读的计算属性，只能通过提供的函数修改
2. `setValue` 函数接受布尔值参数，可以直接设置状态
3. `setTrue` 和 `setFalse` 是便捷函数，等同于 `setValue(true)` 和 `setValue(false)`
4. 所有状态变化都是响应式的，会自动触发视图更新

<script setup>
import { useBoolean } from '@vakao-ui/hooks';
import { ref, computed } from 'vue';

// 加载状态示例
const [isLoading, setLoading, startLoading, stopLoading] = useBoolean(false);

// 表单验证示例
const username = ref('');
const email = ref('');

const [hasUsernameError, setUsernameError, showUsernameError, hideUsernameError] = useBoolean(false);
const [hasEmailError, setEmailError, showEmailError, hideEmailError] = useBoolean(false);

const isFormValid = computed(() => {
  return !hasUsernameError.value && !hasEmailError.value && username.value && email.value;
});

const validateUsername = () => {
  if (username.value.length < 3) {
    showUsernameError();
  } else {
    hideUsernameError();
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showEmailError();
  } else {
    hideEmailError();
  }
};

const submitForm = () => {
  if (isFormValid.value) {
    alert('表单提交成功！');
  }
};

const resetForm = () => {
  username.value = '';
  email.value = '';
  hideUsernameError();
  hideEmailError();
};
</script>

<style scoped>
.error {
  border-color: #ff4d4f !important;
}
</style>
