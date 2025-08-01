# useClickOutside

一个点击外部区域检测 Hook，用于检测用户是否点击了指定元素外部的区域。常用于关闭下拉菜单、模态框等组件。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">📋 下拉菜单</h3>
    <div style="position: relative; display: inline-block;">
      <vk-button @click="toggleDropdown" type="primary">
        {{ isDropdownOpen ? '关闭菜单' : '打开菜单' }} ▼
      </vk-button>
      <div v-if="isDropdownOpen" ref="dropdownRef" 
           style="position: absolute; top: 100%; left: 0; min-width: 200px; background: white; border: 1px solid #d9d9d9; border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); z-index: 1000; margin-top: 4px;">
        <div style="padding: 8px 0;">
          <div @click="handleMenuClick('profile')" style="padding: 8px 16px; cursor: pointer; transition: background-color 0.2s;" 
               @mouseover="(e) => e.target.style.backgroundColor = '#f5f5f5'" 
               @mouseleave="(e) => e.target.style.backgroundColor = 'transparent'">
            👤 个人资料
          </div>
          <div @click="handleMenuClick('settings')" style="padding: 8px 16px; cursor: pointer; transition: background-color 0.2s;" 
               @mouseover="(e) => e.target.style.backgroundColor = '#f5f5f5'" 
               @mouseleave="(e) => e.target.style.backgroundColor = 'transparent'">
            ⚙️ 设置
          </div>
          <div style="height: 1px; background: #f0f0f0; margin: 4px 0;"></div>
          <div @click="handleMenuClick('logout')" style="padding: 8px 16px; cursor: pointer; color: #ff4d4f; transition: background-color 0.2s;" 
               @mouseover="(e) => e.target.style.backgroundColor = '#fff2f0'" 
               @mouseleave="(e) => e.target.style.backgroundColor = 'transparent'">
            🚪 退出登录
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedAction" style="margin-top: 16px; padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px;">
      ✅ 选择了: {{ selectedAction }}
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div style="position: relative; display: inline-block;">
    <vk-button @click="toggleDropdown" type="primary">
      {{ isDropdownOpen ? "关闭菜单" : "打开菜单" }} ▼
    </vk-button>

    <div v-if="isDropdownOpen" ref="dropdownRef" class="dropdown-menu">
      <div class="menu-item" @click="handleMenuClick('profile')">
        👤 个人资料
      </div>
      <div class="menu-item" @click="handleMenuClick('settings')">⚙️ 设置</div>
      <div class="divider"></div>
      <div class="menu-item danger" @click="handleMenuClick('logout')">
        🚪 退出登录
      </div>
    </div>
  </div>

  <div v-if="selectedAction">✅ 选择了: {{ selectedAction }}</div>
</template>

<script setup lang="ts">
import { useClickOutside } from "@vakao-ui/hooks";
import { ref } from "vue";

const isDropdownOpen = ref(false);
const selectedAction = ref("");

const [dropdownRef] = useClickOutside(() => {
  isDropdownOpen.value = false;
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleMenuClick = (action: string) => {
  selectedAction.value = action;
  isDropdownOpen.value = false;
};
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.danger {
  color: #ff4d4f;
}

.menu-item.danger:hover {
  background-color: #fff2f0;
}

.divider {
  height: 1px;
  background: #f0f0f0;
  margin: 4px 0;
}
</style>
```

  </template>
</Demo>

## 模态框示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🪟 模态框</h3>
    <vk-button @click="openModal" type="primary">打开模态框</vk-button>
    <!-- 模态框遮罩 -->
    <div v-if="isModalOpen" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
      <div ref="modalRef" style="background: white; border-radius: 8px; padding: 24px; min-width: 400px; max-width: 90vw; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);">
        <h4 style="margin: 0 0 16px 0; font-size: 18px;">📝 编辑信息</h4>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">姓名:</label>
          <vk-input :value="formData.name" @input="(value) => formData.name = value" placeholder="请输入姓名" style="width: 100%;" />
        </div>
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">邮箱:</label>
          <vk-input :value="formData.email" @input="(value) => formData.email = value" placeholder="请输入邮箱" style="width: 100%;" />
        </div>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <vk-button @click="closeModal">取消</vk-button>
          <vk-button @click="saveAndClose" type="primary">保存</vk-button>
        </div>
      </div>
    </div>
    <div v-if="savedData.name" style="margin-top: 16px; padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 4px;">
      <strong>已保存的信息:</strong><br>
      姓名: {{ savedData.name }}<br>
      邮箱: {{ savedData.email }}
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <vk-button @click="openModal" type="primary">打开模态框</vk-button>

    <!-- 模态框遮罩 -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div ref="modalRef" class="modal-content">
        <h4>📝 编辑信息</h4>
        <div class="form-item">
          <label>姓名:</label>
          <vk-input v-model="formData.name" placeholder="请输入姓名" />
        </div>
        <div class="form-item">
          <label>邮箱:</label>
          <vk-input v-model="formData.email" placeholder="请输入邮箱" />
        </div>
        <div class="modal-actions">
          <vk-button @click="closeModal">取消</vk-button>
          <vk-button @click="saveAndClose" type="primary">保存</vk-button>
        </div>
      </div>
    </div>

    <div v-if="savedData.name">
      <strong>已保存的信息:</strong><br />
      姓名: {{ savedData.name }}<br />
      邮箱: {{ savedData.email }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClickOutside } from "@vakao-ui/hooks";
import { ref, reactive, watch } from "vue";

const isModalOpen = ref(false);
const formData = reactive({ name: "", email: "" });
const savedData = reactive({ name: "", email: "" });

const [modalRef, setModalEnabled] = useClickOutside(
  () => {
    closeModal();
  },
  { immediate: false },
);

// 当模态框打开时启用点击外部检测
watch(isModalOpen, (open) => {
  setModalEnabled(open);
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveAndClose = () => {
  savedData.name = formData.name;
  savedData.email = formData.email;
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 24px;
  min-width: 400px;
  max-width: 90vw;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数     | 类型                     | 默认值 | 说明                 |
| -------- | ------------------------ | ------ | -------------------- |
| callback | `(event: Event) => void` | -      | 点击外部时的回调函数 |
| options  | `UseClickOutsideOptions` | `{}`   | 配置选项             |

### UseClickOutsideOptions

| 属性      | 类型                              | 默认值                        | 说明                   |
| --------- | --------------------------------- | ----------------------------- | ---------------------- |
| events    | `string[]`                        | `['mousedown', 'touchstart']` | 监听的事件类型         |
| immediate | `boolean`                         | `true`                        | 是否立即启用检测       |
| capture   | `boolean`                         | `true`                        | 是否在捕获阶段监听事件 |
| exclude   | `MaybeRefOrGetter<HTMLElement>[]` | `[]`                          | 排除的元素列表         |

### 返回值

`useClickOutside` 返回一个数组，包含以下元素：

```typescript
const [targetRef, setEnabled] = useClickOutside(callback, options);
```

| 索引 | 名称       | 类型                         | 说明                 |
| ---- | ---------- | ---------------------------- | -------------------- |
| 0    | targetRef  | `Ref<HTMLElement \| null>`   | 目标元素的响应式引用 |
| 1    | setEnabled | `(enabled: boolean) => void` | 启用/禁用检测的函数  |

## 类型定义

```typescript
export interface UseClickOutsideOptions {
  events?: string[];
  immediate?: boolean;
  capture?: boolean;
  exclude?: MaybeRefOrGetter<HTMLElement>[];
}

export type SetEnabledFunction = (enabled: boolean) => void;

export type UseClickOutsideReturn = [
  Ref<HTMLElement | null>,
  SetEnabledFunction,
];
```

## 使用场景

1. **下拉菜单** - 点击外部关闭下拉菜单
2. **模态框** - 点击遮罩层关闭模态框
3. **弹出框** - 点击外部关闭弹出框
4. **侧边栏** - 点击外部收起侧边栏
5. **搜索建议** - 点击外部隐藏搜索建议

## 高级用法

### 排除特定元素

```typescript
const triggerRef = ref<HTMLElement>();
const [targetRef] = useClickOutside(
  () => {
    // 点击外部的回调
  },
  {
    exclude: [triggerRef], // 排除触发元素
  },
);
```

### 条件启用

```typescript
const [targetRef, setEnabled] = useClickOutside(
  () => {
    // 回调函数
  },
  { immediate: false },
);

// 根据条件启用/禁用
watch(isVisible, (visible) => {
  setEnabled(visible);
});
```

### 自定义事件

```typescript
const [targetRef] = useClickOutside(
  () => {
    // 回调函数
  },
  {
    events: ["click", "contextmenu"], // 监听点击和右键菜单
  },
);
```

## 注意事项

1. 需要将 `targetRef` 绑定到目标元素上
2. 回调函数会在点击目标元素外部时触发
3. 可以通过 `setEnabled` 动态控制检测的启用状态
4. 支持排除特定元素，避免误触发
5. 组件卸载时会自动清理事件监听器

<script setup lang="ts">
import { useClickOutside } from '@vakao-ui/hooks';
import { ref, reactive, watch } from 'vue';

// 下拉菜单示例
const isDropdownOpen = ref(false);
const selectedAction = ref('');

const [dropdownRef] = useClickOutside(() => {
  isDropdownOpen.value = false;
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleMenuClick = (action: string) => {
  selectedAction.value = action;
  isDropdownOpen.value = false;
};

// 模态框示例
const isModalOpen = ref(false);
const formData = reactive({ name: '', email: '' });
const savedData = reactive({ name: '', email: '' });

const [modalRef, setModalEnabled] = useClickOutside(
  () => {
    closeModal();
  },
  { immediate: false }
);

// 当模态框打开时启用点击外部检测
watch(isModalOpen, (open) => {
  setModalEnabled(open);
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveAndClose = () => {
  savedData.name = formData.name;
  savedData.email = formData.email;
  closeModal();
};
</script>
