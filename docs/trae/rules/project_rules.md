# Vakao UI 项目规则

## 1. 项目概述

Vakao UI 是一个基于 Vue 3 + TypeScript 的现代化组件库，致力于提供高质量、易用性强的 UI 组件。项目采用 Monorepo 架构，使用 pnpm workspace 管理多包依赖，支持按需导入和 Tree Shaking。

### 1.1 技术栈

- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **包管理**：pnpm workspace
- **样式**：SCSS + CSS Variables
- **图标**：Iconify
- **文档**：VitePress
- **代码规范**：ESLint + Prettier

### 1.2 项目结构

```
vakao-ui/
├── docs/                 # 文档站点
├── packages/             # 核心包
│   ├── components/       # 组件库
│   ├── hooks/           # 组合式函数
│   ├── utils/           # 工具函数
│   ├── styles/          # 样式文件
│   └── types/           # 类型定义
├── scripts/             # 构建脚本
└── .trae/              # 项目规则
```

## 2. 代码规范

### 2.1 命名规范

#### 组件命名

- 组件名使用 PascalCase，以 `Vk` 前缀开头
- 示例：`VkButton`、`VkInput`、`VkMessageBox`
- 组件文件夹结构：`VkComponentName/src/index.vue`

#### 文件命名

- Vue 组件文件：`index.vue`
- 类型定义文件：`types.ts`
- 样式文件：`vk-component-name.scss`
- 测试文件：`component-name.test.ts`

#### 变量命名

- 使用 camelCase
- Props 使用 camelCase
- 事件名使用 kebab-case
- CSS 类名使用 BEM 规范：`vk-component__element--modifier`

### 2.2 TypeScript 规范

#### Props 定义

```typescript
// 统一使用 defineProps 和常量定义
export const componentProps = {
  size: {
    type: String as PropType<ComponentSize>,
    default: "medium",
  },
} as const;

// 导出类型
export type ComponentProps = ExtractPropTypes<typeof componentProps>;
```

#### Emits 定义

```typescript
// 统一使用常量定义
export const componentEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
  change: (value: string) => typeof value === "string",
} as const;

// 导出类型
export type ComponentEmits = ExtractPublicPropTypes<typeof componentEmits>;
```

#### 类型安全规范

**核心原则**：在开发中非必要的地方不要使用 `any` 类型，优先使用泛型和具体类型定义。

**推荐做法**：

- **优先使用泛型**：当类型不确定时，使用泛型而不是 `any`
- **联合类型**：当有多种可能的类型时，使用联合类型
- **类型断言**：在确定类型的情况下使用类型断言
- **unknown 类型**：对于真正未知的类型，使用 `unknown` 而不是 `any`

```typescript
// ❌ 避免使用 any
function processData(data: any): any {
  return data.someProperty;
}

// ✅ 推荐使用泛型
function processData<T>(data: T): T {
  return data;
}

// ✅ 推荐使用具体类型
function processUserData(data: { name: string; age: number }): string {
  return data.name;
}

// ✅ 推荐使用联合类型
type Status = "loading" | "success" | "error";
function handleStatus(status: Status): void {
  // 处理逻辑
}

// ✅ 对于未知类型使用 unknown
function parseJson(json: string): unknown {
  return JSON.parse(json);
}
```

**允许使用 `any` 的场景**：

- 第三方库没有类型定义且无法推断类型时
- 动态内容处理（如 JSON 解析后的复杂对象）
- 渐进式迁移 JavaScript 代码到 TypeScript 时的临时方案
- 与原生 DOM API 交互时的特殊情况

```typescript
// ✅ 合理使用 any 的场景

// 第三方库无类型定义
declare const legacyLibrary: any;

// 复杂的动态内容
function handleDynamicConfig(config: any): void {
  // 处理复杂的动态配置
}

// 临时迁移方案（应添加 TODO 注释）
// TODO: 为此函数添加具体类型定义
function legacyFunction(param: any): any {
  // 待重构的遗留代码
}
```

### 2.3 代码注释规范

#### 2.3.1 注释原则

**核心要求**：所有生成的代码都必须包含详尽的注释，确保代码的可读性和可维护性。

- **完整性**：每个函数、组件、工具类都必须有完整的功能说明
- **准确性**：注释内容必须与代码实现保持一致
- **实用性**：注释应该帮助开发者快速理解代码意图和使用方法
- **标准化**：统一使用 JSDoc 格式，确保 IDE 智能提示支持

#### 2.3.2 JSDoc 注释格式

**文件级注释**：

````typescript
/**
 * 组件/工具的整体描述
 *
 * 详细说明组件的功能、特性和使用场景。
 * 可以包含多行描述，解释设计思路和注意事项。
 *
 * 主要特性：
 * - 特性1：具体说明
 * - 特性2：具体说明
 * - 特性3：具体说明
 *
 * 使用示例：
 * ```typescript
 * // 基础用法示例
 * const example = useFunction();
 *
 * // 高级用法示例
 * const advanced = useFunction({
 *   option1: 'value1',
 *   option2: true
 * });
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 * @since 2025-07-27
 */
````

**函数/方法注释**：

````typescript
/**
 * 函数功能的简要描述
 *
 * 详细描述函数的作用、算法逻辑、使用场景等。
 * 如果有复杂的业务逻辑，需要详细说明。
 *
 * @param param1 - 参数1的描述，包括类型和作用
 * @param param2 - 参数2的描述，可选参数需要标明
 * @param options - 配置选项对象
 * @param options.immediate - 是否立即执行，默认为 true
 * @param options.timeout - 超时时间（毫秒），默认为 5000
 *
 * @returns 返回值的详细描述，包括数据结构
 *
 * @throws {Error} 可能抛出的错误类型和条件
 *
 * @example
 * ```typescript
 * // 基础用法
 * const result = myFunction('input', { immediate: true });
 *
 * // 错误处理
 * try {
 *   const result = myFunction('invalid');
 * } catch (error) {
 *   console.error('处理失败:', error.message);
 * }
 * ```
 *
 * @see {@link RelatedFunction} 相关函数
 * @since 1.0.0
 */
function myFunction(param1: string, options?: Options): Result {
  // 函数实现
}
````

**类型定义注释**：

````typescript
/**
 * 组件属性接口定义
 *
 * 定义了组件所有可接受的属性及其类型约束。
 * 遵循 Vue 3 组件属性设计规范。
 *
 * @interface ComponentProps
 */
export interface ComponentProps {
  /**
   * 组件尺寸
   *
   * 控制组件的整体大小，影响内边距、字体大小等样式。
   *
   * @default 'medium'
   * @example
   * ```vue
   * <VkButton size="large">大按钮</VkButton>
   * <VkButton size="small">小按钮</VkButton>
   * ```
   */
  size?: "small" | "medium" | "large";

  /**
   * 是否禁用组件
   *
   * 禁用后组件不响应用户交互，并显示禁用状态样式。
   *
   * @default false
   */
  disabled?: boolean;
}
````

#### 2.3.3 Vue 组件注释规范

**组件文件结构注释**：

````vue
<template>
  <!-- 
    组件模板结构说明
    
    主要元素：
    - 根容器：包含所有组件内容
    - 内容区域：显示主要内容
    - 操作区域：包含交互按钮等
  -->
  <div class="vk-component">
    <!-- 内容插槽：允许用户自定义内容 -->
    <slot name="content">
      <!-- 默认内容 -->
    </slot>
  </div>
</template>

<script setup lang="ts">
/**
 * VkComponent 组件
 *
 * 这是一个通用的 UI 组件，提供了基础的交互功能。
 * 支持多种尺寸、状态和自定义样式。
 *
 * 主要特性：
 * - 响应式设计：适配不同屏幕尺寸
 * - 主题支持：支持亮色/暗色主题
 * - 无障碍性：完整的键盘导航和屏幕阅读器支持
 * - TypeScript：完整的类型定义和智能提示
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <VkComponent
 *     size="large"
 *     :disabled="false"
 *     @click="handleClick"
 *   >
 *     组件内容
 *   </VkComponent>
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, ref } from "vue";
/** 组件属性和事件定义 */
import { componentProps, componentEmits } from "./types";
/** CSS 命名空间工具 */
import { useNamespace } from "../../utils/namespace";

// ==================== 组件配置 ====================

/** 组件选项配置 */
defineOptions({
  name: "VkComponent",
  inheritAttrs: false,
});

/** 组件属性定义 */
const props = defineProps(componentProps);

/** 组件事件定义 */
const emit = defineEmits(componentEmits);

// ==================== 响应式状态 ====================

/**
 * 组件内部状态
 *
 * 管理组件的内部状态，如焦点状态、激活状态等。
 */
const state = ref({
  focused: false,
  active: false,
});

// ==================== 计算属性 ====================

/**
 * CSS 命名空间
 *
 * 生成组件的 CSS 类名前缀，确保样式隔离。
 */
const ns = useNamespace("component");

/**
 * 合并后的 CSS 类名
 *
 * 根据组件状态和属性生成最终的 CSS 类名。
 * 包含基础类名、尺寸类名、状态类名等。
 *
 * @returns 完整的 CSS 类名字符串
 */
const mergedClass = computed(() => {
  return [
    ns.b(), // 基础类名
    ns.m(props.size), // 尺寸修饰符
    {
      [ns.is("disabled")]: props.disabled, // 禁用状态
      [ns.is("focused")]: state.value.focused, // 焦点状态
    },
  ];
});

// ==================== 事件处理 ====================

/**
 * 处理点击事件
 *
 * 当组件被点击时触发，会进行状态检查并发出相应事件。
 * 如果组件处于禁用状态，则不会处理点击事件。
 *
 * @param event - 鼠标点击事件对象
 */
const handleClick = (event: MouseEvent) => {
  // 禁用状态下不处理点击
  if (props.disabled) {
    return;
  }

  // 发出点击事件
  emit("click", event);
};

/**
 * 处理焦点获得事件
 *
 * 当组件获得焦点时更新内部状态。
 */
const handleFocus = () => {
  state.value.focused = true;
};

/**
 * 处理焦点失去事件
 *
 * 当组件失去焦点时更新内部状态。
 */
const handleBlur = () => {
  state.value.focused = false;
};

// ==================== 暴露的方法 ====================

/**
 * 暴露给父组件的方法
 *
 * 允许父组件通过模板引用调用这些方法。
 */
defineExpose({
  /**
   * 手动设置组件焦点
   *
   * @example
   * ```vue
   * <template>
   *   <VkComponent ref="componentRef" />
   *   <button @click="() => componentRef.focus()">设置焦点</button>
   * </template>
   * ```
   */
  focus: () => {
    // 焦点设置逻辑
  },
});
</script>

<style lang="scss">
/**
 * VkComponent 组件样式
 * 
 * 使用 BEM 命名规范和 SCSS 预处理器。
 * 支持主题变量和响应式设计。
 */

// 导入样式依赖
@use "../../../styles/mixins.scss" as *;
@use "../../../styles/variables.scss" as *;

// 组件根样式
.vk-component {
  /* 基础样式定义 */
  position: relative;
  display: inline-flex;
  align-items: center;

  /* 尺寸变体 */
  &--small {
    /* 小尺寸样式 */
  }

  &--medium {
    /* 中等尺寸样式 */
  }

  &--large {
    /* 大尺寸样式 */
  }

  /* 状态样式 */
  &.is-disabled {
    /* 禁用状态样式 */
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.is-focused {
    /* 焦点状态样式 */
    outline: 2px solid var(--vk-color-primary);
  }
}
</style>
````

#### 2.3.4 工具函数注释规范

````typescript
/**
 * 深度克隆对象
 *
 * 创建对象的深度副本，支持嵌套对象、数组、Date、RegExp 等类型。
 * 使用递归算法实现，能够正确处理循环引用。
 *
 * 支持的数据类型：
 * - 基础类型：string, number, boolean, null, undefined
 * - 对象类型：Object, Array, Date, RegExp, Map, Set
 * - 函数：直接返回原函数引用
 *
 * @template T - 要克隆的对象类型
 * @param obj - 要克隆的对象
 * @param visited - 已访问对象的 WeakMap，用于处理循环引用
 *
 * @returns 克隆后的对象
 *
 * @throws {TypeError} 当传入不支持的数据类型时抛出错误
 *
 * @example
 * ```typescript
 * // 克隆简单对象
 * const original = { name: 'John', age: 30 };
 * const cloned = deepClone(original);
 *
 * // 克隆嵌套对象
 * const complex = {
 *   user: { name: 'John' },
 *   dates: [new Date(), new Date()],
 *   settings: new Map([['theme', 'dark']])
 * };
 * const clonedComplex = deepClone(complex);
 *
 * // 处理循环引用
 * const circular: any = { name: 'test' };
 * circular.self = circular;
 * const clonedCircular = deepClone(circular); // 不会导致无限递归
 * ```
 *
 * @see {@link isEqual} 用于比较两个对象是否相等
 * @since 1.0.0
 */
export function deepClone<T>(obj: T, visited = new WeakMap()): T {
  // 实现细节...
}
````

#### 2.3.5 Hooks 注释规范

````typescript
/**
 * 布尔值切换 Hook
 *
 * 提供布尔状态管理功能，支持切换、设置真值、设置假值等操作。
 * 遵循 React Hooks 设计模式，返回数组格式便于解构使用。
 *
 * 设计特点：
 * - 响应式：基于 Vue 3 ref 实现，自动触发视图更新
 * - 类型安全：完整的 TypeScript 类型定义
 * - 灵活性：支持初始值设置和多种操作方法
 * - 一致性：API 设计与其他 Hooks 保持一致
 * - 数组返回：避免对象形式，便于用户自定义命名
 *
 * @param initialValue - 初始布尔值，默认为 false
 *
 * @returns 返回包含状态和操作函数的数组
 * - [0] state: ComputedRef<boolean> - 只读的响应式布尔状态（计算属性）
 * - [1] toggle: () => void - 切换状态函数
 * - [2] setTrue: () => void - 设置为 true 的函数
 * - [3] setFalse: () => void - 设置为 false 的函数
 *
 * @example
 * ```typescript
 * // 基础用法 - 只需要状态和切换功能
 * const [isVisible, toggle] = useToggle(false);
 *
 * // 完整用法 - 使用所有返回值
 * const [isOpen, toggle, setTrue, setFalse] = useToggle(true);
 *
 * // 自定义命名 - 便于多次使用
 * const [isLoading, toggleLoading, startLoading, stopLoading] = useToggle();
 * const [isModalOpen, toggleModal, openModal, closeModal] = useToggle();
 *
 * // 异步操作示例
 * const handleSubmit = async () => {
 *   startLoading();
 *   try {
 *     await submitForm();
 *   } finally {
 *     stopLoading();
 *   }
 * };
 *
 * // 模态框控制示例
 * const handleOpenModal = () => {
 *   openModal();
 * };
 * ```
 *
 * @see {@link useCounter} 数值状态管理
 * @see {@link useLocalStorage} 持久化状态管理
 * @since 1.0.0
 */
export function useToggle(initialValue = false): UseToggleReturn {
  // 实现细节...
}
````

#### 2.3.6 注释质量要求

**必须包含的内容**：

1. **功能描述**：清晰说明代码的作用和目的
2. **参数说明**：每个参数的类型、作用、默认值
3. **返回值说明**：返回值的类型和结构
4. **使用示例**：至少一个完整的使用示例
5. **注意事项**：重要的使用限制或注意点

**推荐包含的内容**：

1. **设计思路**：解释为什么这样设计
2. **性能考虑**：性能相关的说明
3. **兼容性**：浏览器或版本兼容性说明
4. **相关链接**：相关函数或文档的引用
5. **版本信息**：添加时间和版本号

**注释更新要求**：

- 代码修改时必须同步更新注释
- 新增功能时必须添加相应注释
- 定期审查注释的准确性和完整性
- 保持注释风格的一致性

### 2.4 Vue 组件规范

#### 组件结构

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 1. 导入
import { computed, ref } from "vue";
import { componentProps, componentEmits } from "./types";

// 2. Props 和 Emits
const props = defineProps(componentProps);
const emit = defineEmits(componentEmits);

// 3. 响应式数据
const state = ref();

// 4. 计算属性
const computedValue = computed(() => {});

// 5. 方法
const handleClick = () => {};

// 6. 生命周期
// 7. 暴露给父组件的方法
defineExpose({
  focus: () => {},
});
</script>

<style lang="scss">
@use "../../../styles/mixins.scss" as *;
@use "../../../styles/variables.scss" as *;

.vk-component {
  // 样式内容
}
</style>
```

## 4. 组件设计原则

### 4.1 API 设计

- **一致性**：相同功能的 Props 在不同组件中保持一致的命名和类型
- **可预测性**：API 行为应该符合用户直觉
- **可扩展性**：为未来功能扩展预留空间
- **向后兼容**：新版本应保持向后兼容

### 4.2 Props 设计

- 必需的 Props 应该尽可能少
- 提供合理的默认值
- 使用 TypeScript 严格类型检查
- 支持响应式更新

### 4.3 事件设计

- 事件名使用动词形式：`click`、`change`、`input`
- 提供必要的事件参数
- 支持事件修饰符

### 4.4 插槽设计

- 提供默认插槽用于主要内容
- 命名插槽使用描述性名称
- 提供插槽作用域参数

## 5. 样式规范

### 5.1 CSS 架构

- 使用 SCSS 预处理器
- 采用 BEM 命名规范
- 使用 CSS 变量支持主题定制

### 5.2 样式组织

```scss
// 1. 导入
@use "../../../styles/mixins.scss" as *;
@use "../../../styles/variables.scss" as *;

// 2. 组件根样式
.vk-component {
  // 基础样式

  // 3. 元素样式
  &__element {
    // 元素样式
  }

  // 4. 修饰符样式
  &--modifier {
    // 修饰符样式
  }

  // 5. 状态样式
  &.is-disabled {
    // 状态样式
  }
}
```

### 5.3 主题变量

- 使用 CSS 自定义属性
- 变量命名：`--vk-component-property`
- 支持暗色主题

## 6. Hooks 设计规范

### 6.1 设计原则

参考 React Hooks 设计模式，Vakao UI 的组合式函数（Hooks）应遵循以下设计原则：

- **函数式编程**：Hooks 应该是纯函数，避免副作用
- **可组合性**：Hooks 可以相互组合使用
- **可重用性**：Hooks 应该具有良好的可重用性
- **一致性**：所有 Hooks 应遵循统一的 API 设计模式

### 6.2 命名规范

- Hooks 函数名使用 `use` 前缀，采用 camelCase 命名
- 示例：`useFetch`、`useToggle`、`useLocalStorage`
- 文件名与函数名保持一致：`useFetch.ts`

### 6.3 返回值规范

**核心要求**：所有 Hooks 的返回值必须使用数组格式，参考 React Hooks 设计模式。

#### 设计原则

- **第一项必须是只读状态**：使用计算属性（ComputedRef）确保状态只读且自动追踪依赖
- **避免对象形式**：便于用户自定义命名，避免命名冲突
- **数组解构**：支持按需解构，提高使用灵活性
- **一致性**：所有 Hooks 遵循相同的返回格式
- **响应式最佳实践**：内部使用 ref 处理逻辑，对外暴露计算属性保证只读

#### 基础返回格式

```typescript
// 基础格式：[只读状态, 操作函数1, 操作函数2, ...]
const [state, action1, action2] = useHook();

// 扩展格式：[只读状态, 操作函数1, 操作函数2, 元数据]
const [state, action1, action2, meta] = useHook();
```

#### 具体示例

```typescript
// useToggle - 布尔状态切换
const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
// 自定义命名示例
const [isLoading, toggleLoading, startLoading, stopLoading] = useToggle();
const [isModalOpen, toggleModal, openModal, closeModal] = useToggle();

// useFetch - 数据获取
const [data, loading, error, refetch, cancel] = useFetch("/api/users");
// 或者包含元数据
const [data, loading, error, refetch, cancel, meta] = useFetch("/api/users");

// useCounter - 计数器
const [count, increment, decrement, reset, setValue] = useCounter(0);
// 自定义命名示例
const [pageNum, nextPage, prevPage, resetPage, setPage] = useCounter(1);

// useLocalStorage - 本地存储
const [value, setValue, remove, clear] = useLocalStorage("key", defaultValue);
// 自定义命名示例
const [theme, setTheme, removeTheme, clearTheme] = useLocalStorage(
  "theme",
  "light"
);
const [userInfo, setUserInfo, removeUserInfo, clearUserInfo] = useLocalStorage(
  "user",
  null
);
```

### 6.4 TypeScript 类型定义

#### 返回值类型定义

```typescript
// 基础类型定义 - useToggle
type UseToggleReturn = [
  ComputedRef<boolean>, // 只读状态（计算属性）
  () => void, // toggle 函数
  () => void, // setTrue 函数
  () => void, // setFalse 函数
];

// 泛型类型定义 - useFetch
type UseFetchReturn<T> = [
  ComputedRef<T | null>, // 只读数据状态（计算属性）
  ComputedRef<boolean>, // 只读加载状态（计算属性）
  ComputedRef<Error | null>, // 只读错误状态（计算属性）
  () => Promise<void>, // refetch 函数
  () => void, // cancel 函数
];

// useCounter 类型定义
type UseCounterReturn = [
  ComputedRef<number>, // 只读计数状态（计算属性）
  () => void, // increment 函数
  () => void, // decrement 函数
  () => void, // reset 函数
  (value: number) => void, // setValue 函数
];

// useLocalStorage 类型定义
type UseLocalStorageReturn<T> = [
  ComputedRef<T>, // 只读存储值（计算属性）
  (value: T) => void, // setValue 函数
  () => void, // remove 函数
  () => void, // clear 函数
];
```

#### 参数类型定义

```typescript
// 配置选项类型
interface UseFetchOptions {
  immediate?: boolean;
  timeout?: number;
  retry?: number;
}

// Hook 函数签名
function useFetch<T>(
  url: string | (() => string),
  options?: UseFetchOptions
): UseFetchReturn<T>;
```

### 6.5 实现规范

#### 基本结构

```typescript
import { ref, computed, type Ref, type ComputedRef } from "vue";

// 类型定义
interface UseExampleOptions {
  // 配置选项
}

type UseExampleReturn = [
  ComputedRef<any>, // 只读状态（计算属性）
  (newValue: any) => void, // 更新函数
  () => void, // 重置函数
];

// Hook 实现
export function useExample(
  initialValue?: any,
  options?: UseExampleOptions
): UseExampleReturn {
  // 1. 内部响应式状态
  const state = ref(initialValue);

  // 2. 只读的计算属性状态
  const readonlyState = computed(() => state.value);

  // 3. 操作函数
  const update = (newValue: any) => {
    state.value = newValue;
  };

  const reset = () => {
    state.value = initialValue;
  };

  // 4. 返回数组格式 - 第一项是计算属性，确保只读
  return [
    readonlyState, // 只读状态（计算属性），自动追踪依赖变化
    update, // 更新函数
    reset, // 重置函数
  ] as const;
}
```

#### 完整示例 - useToggle 实现

```typescript
import { ref, computed, type ComputedRef } from "vue";

type UseToggleReturn = [
  ComputedRef<boolean>,
  () => void,
  () => void,
  () => void,
];

export function useToggle(initialValue = false): UseToggleReturn {
  // 内部响应式状态
  const state = ref(initialValue);

  // 只读的计算属性状态
  const readonlyState = computed(() => state.value);

  // 操作函数
  const toggle = () => {
    state.value = !state.value;
  };

  const setTrue = () => {
    state.value = true;
  };

  const setFalse = () => {
    state.value = false;
  };

  // 返回数组格式 - 第一项是计算属性
  return [
    readonlyState, // 只读状态（计算属性）
    toggle, // 切换函数
    setTrue, // 设置为 true
    setFalse, // 设置为 false
  ] as const;
}
```

#### 错误处理示例 - useFetch 实现

```typescript
import { ref, computed, type ComputedRef } from "vue";

type UseFetchReturn<T> = [
  ComputedRef<T | null>,
  ComputedRef<boolean>,
  ComputedRef<Error | null>,
  () => Promise<void>,
  () => void,
];

export function useFetch<T>(url: string): UseFetchReturn<T> {
  // 内部响应式状态
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  let abortController: AbortController | null = null;

  // 只读的计算属性状态
  const readonlyData = computed(() => data.value);
  const readonlyLoading = computed(() => loading.value);
  const readonlyError = computed(() => error.value);

  const execute = async () => {
    try {
      loading.value = true;
      error.value = null;

      // 创建新的 AbortController
      abortController = new AbortController();

      // 模拟请求逻辑
      const response = await fetch(url, {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      data.value = result;
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        error.value = err;
      }
    } finally {
      loading.value = false;
      abortController = null;
    }
  };

  const cancel = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  // 返回数组格式 - 所有状态都是计算属性
  return [
    readonlyData, // 只读数据状态（计算属性）
    readonlyLoading, // 只读加载状态（计算属性）
    readonlyError, // 只读错误状态（计算属性）
    execute, // 执行请求函数
    cancel, // 取消请求函数
  ] as const;
}
```

### 6.6 文档规范

#### API 文档格式

```markdown
## useToggle

用于管理布尔值状态的 Hook。

### 语法

\`\`\`typescript
const [state, toggle, setTrue, setFalse] = useToggle(initialValue?);
\`\`\`

### 参数

- `initialValue` (可选): `boolean` - 初始值，默认为 `false`

### 返回值

返回一个数组，包含以下元素：

- `[0] state`: `ComputedRef<boolean>` - 只读的当前状态值（计算属性）
- `[1] toggle`: `() => void` - 切换状态函数
- `[2] setTrue`: `() => void` - 设置为 true 的函数
- `[3] setFalse`: `() => void` - 设置为 false 的函数

### 特性

- ✅ 状态为只读，防止意外修改
- ✅ 支持数组解构，可自定义变量名
- ✅ TypeScript 类型安全
- ✅ 轻量级，无额外依赖

### 示例

\`\`\`vue
<template>

  <div>
    <p>状态: {{ isVisible }}</p>
    <button @click="toggleVisibility">切换</button>
    <button @click="show">显示</button>
    <button @click="hide">隐藏</button>
  </div>
</template>

<script setup>
import { useToggle } from '@/hooks/useToggle';

// 数组解构，可自定义变量名
const [isVisible, toggleVisibility, show, hide] = useToggle(false);
</script>

\`\`\`

### 多实例使用

\`\`\`vue

<script setup>
import { useToggle } from '@/hooks/useToggle';

// 多个独立的状态管理
const [isModalOpen, toggleModal, openModal, closeModal] = useToggle();
const [isLoading, toggleLoading, startLoading, stopLoading] = useToggle();
const [isExpanded, toggleExpand, expand, collapse] = useToggle(true);
</script>

\`\`\`
```

### 6.7 测试规范

```typescript
import { describe, it, expect } from "vitest";
import { useToggle } from "../useToggle";

describe("useToggle", () => {
  it("should return array with initial state and actions", () => {
    const [state, actions] = useToggle(false);

    expect(Array.isArray([state, actions])).toBe(true);
    expect(state.value).toBe(false);
    expect(typeof actions.toggle).toBe("function");
  });

  it("should toggle state correctly", () => {
    const [state, { toggle }] = useToggle(false);

    toggle();
    expect(state.value).toBe(true);

    toggle();
    expect(state.value).toBe(false);
  });
});
```

## 7. 图标规范

### 7.1 图标系统

- 优先使用 Iconify 图标库
- 图标格式：`mdi:icon-name`
- 支持自定义 SVG 图标

### 7.2 图标使用

```vue
<!-- Iconify 图标 -->
<VkIcon icon="mdi:check-circle" />

<!-- 自定义 SVG -->
<VkIcon src="/path/to/icon.svg" />
```

## 8. 文档规范

### 8.1 组件文档结构

1. 组件描述
2. 基础用法
3. 高级用法
4. API 文档
5. 主题定制

### 8.2 示例代码

- 提供完整可运行的示例
- 包含 HTML、JavaScript 和 CSS
- 示例应该简洁明了

### 8.3 API 文档

- Props 表格：参数、说明、类型、可选值、默认值
- Events 表格：事件名、说明、参数
- Slots 表格：插槽名、说明、作用域参数
- Methods 表格：方法名、说明、参数、返回值

### 8.4 文档编写注意事项

#### 8.4.1 导入路径规范

**文档示例代码中的导入**：

- 在 `<Demo>` 组件的 `<template #code>` 中展示给用户的代码，应使用用户实际安装后的导入路径
- 组件导入：`import { VkMessageBox } from "vakao-ui"`
- 样式导入：`import 'vakao-ui/style.css'`

**文档内部实际使用**：

- 在文档的 `<script setup>` 中，使用开发环境的导入路径
- 组件导入：`import { VkMessageBox } from "@vakao-ui/components"`
- 样式导入：根据实际文档环境配置

#### 8.4.2 组件标签使用规范

**支持的组件标签格式**：

- PascalCase：`<VkButton></VkButton>`、`<VkMessageBox></VkMessageBox>`
- kebab-case：`<vk-button></vk-button>`、`<vk-message-box></vk-message-box>`

**不支持的格式**：

- 全大写：`<VKBUTTON></VKBUTTON>`、`<VKMESSAGEBOX></VKMESSAGEBOX>`

#### 8.4.4 文档一致性要求

- 示例代码必须与用户实际使用场景保持一致
- 确保所有示例都能在用户环境中直接运行
- 区分开发环境和生产环境的不同配置

## 9. 测试规范

### 9.1 单元测试

- 使用 Vitest 测试框架
- 测试覆盖率不低于 80%
- 测试文件命名：`component-name.test.ts`

### 9.2 测试内容

- Props 验证
- 事件触发
- 插槽渲染
- 边界情况

## 10. 版本管理

### 10.1 语义化版本

- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 10.2 变更日志

- 记录每个版本的变更内容
- 分类：新增、修改、修复、移除
- 提供迁移指南

## 11. 依赖管理

### 11.1 工作空间配置

项目使用 pnpm workspace 管理 Monorepo，配置文件：`pnpm-workspace.yaml`

```yaml
packages:
  - "packages/*"
  - "docs"
```

### 11.2 依赖分类

**核心依赖**：

- `@iconify/vue`：图标系统
- `vue`：框架（peerDependency）

**开发依赖**：

- `@typescript-eslint/*`：TypeScript ESLint 支持
- `eslint`、`prettier`：代码质量工具
- `typescript`：类型检查
- `vite`、`vite-plugin-dts`：构建工具

**工作空间依赖**：

- `@vakao-ui/components`
- `@vakao-ui/hooks`
- `@vakao-ui/utils`

### 11.3 依赖安装

```bash
# 安装所有依赖
pnpm install

# 为特定包添加依赖
pnpm add <package> --filter @vakao-ui/components

# 添加开发依赖到根目录
pnpm add -D <package> -w
```

## 12. 构建和发布

### 12.1 构建流程

1. 代码检查（ESLint + Prettier）
2. 类型检查（TypeScript）
3. 单元测试（待实现）
4. 构建产物（UMD + ESM + 类型声明）
5. 文档生成

### 12.2 构建产物

```
dist/
├── vakao-ui.es.js      # ESM 格式
├── vakao-ui.umd.js     # UMD 格式
├── style.css           # 样式文件
└── types/              # 类型声明文件
    ├── index.d.ts
    └── resolver.d.ts
```

### 12.3 发布流程

1. 版本号更新
2. 变更日志更新
3. 构建验证（`pnpm build`）
4. 发布预检（`pnpm publish:dry-run`）
5. NPM 发布（`pnpm publish:only`）
6. 文档部署（GitHub Actions）

## 13. 代码审查

### 13.1 审查要点

- 代码规范遵循
- API 设计合理性
- 性能影响
- 向后兼容性
- 文档完整性

### 13.2 审查流程

1. 自测验证
2. 同行评审
3. 集成测试
4. 合并主分支

## 14. 性能优化

### 14.1 优化原则

- 按需加载
- Tree Shaking 支持
- 最小化包体积
- 运行时性能优化

### 14.2 性能监控

- Bundle 大小监控
- 渲染性能测试
- 内存泄漏检查

### 14.3 构建优化

**Vite 配置优化**：

- 启用 Tree Shaking
- CSS 代码分割：`cssCodeSplit: false`（统一样式文件）
- 生成 Source Map：便于调试
- 外部化 Vue：减少包体积

**类型声明优化**：

- 使用 `vite-plugin-dts` 生成类型声明
- 路径别名处理：确保类型导入正确
- 排除内部依赖：避免类型污染

## 15. 无障碍性

### 15.1 可访问性要求

- 支持键盘导航
- 提供 ARIA 属性
- 支持屏幕阅读器
- 颜色对比度符合标准

### 15.2 实现指南

- 使用语义化 HTML
- 提供焦点管理
- 支持高对比度模式

## 16. 国际化

- 当前项目暂不支持国际化。
- 未来可考虑使用 Vue I18n 实现多语言支持。

## 17. 贡献指南

### 17.1 贡献流程

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 创建 Pull Request
5. 代码审查
6. 合并代码

### 17.2 提交规范

- 使用 Conventional Commits
- 格式：`type(scope): description`
- 类型：feat、fix、docs、style、refactor、test、chore

### 17.3 开发环境设置

```bash
# 1. 克隆项目
git clone <repository-url>
cd vakao-ui

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 运行代码检查
pnpm lint
pnpm format
```

## 18. 工具配置

### 18.1 开发工具

- **IDE**：VS Code（推荐）
- **代码格式化**：Prettier
- **代码检查**：ESLint + @typescript-eslint
- **类型检查**：TypeScript
- **构建工具**：Vite + vite-plugin-dts
- **包管理器**：pnpm

### 18.2 配置文件

**注意**：当前项目配置通过 package.json 管理，未使用独立配置文件。

- `package.json`：包含 ESLint 和 Prettier 配置
- `tsconfig.json`：TypeScript 配置
- `packages/vite.config.ts`：构建配置
- `pnpm-workspace.yaml`：工作空间配置

### 18.3 脚本命令

```bash
# 开发
pnpm dev              # 启动文档开发服务器

# 构建
pnpm build            # 构建组件库
pnpm build:docs       # 构建文档

# 代码质量
pnpm lint             # ESLint 检查和修复
pnpm format           # Prettier 格式化

# 发布
pnpm publish:dry-run  # 模拟发布
pnpm publish:only     # 发布到 npm
```

### 18.4 IDE 配置建议

**VS Code 扩展**：

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- ESLint
- Prettier - Code formatter
- SCSS IntelliSense

**工作区设置**：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["vue", "typescript", "javascript"]
}
```

---

**注意**：本规则文档会根据项目发展持续更新，所有团队成员都应该遵循这些规范，确保代码质量和项目的可维护性。
