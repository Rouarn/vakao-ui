# Hooks

Vakao UI 提供了一系列实用的 Vue 3 Composition API hooks，帮助您更高效地开发应用。

## 设计理念

- **简洁易用** - 提供简单直观的 API
- **类型安全** - 完整的 TypeScript 类型支持
- **高度复用** - 可在不同组件间复用的逻辑
- **性能优化** - 基于 Vue 3 响应式系统优化

## Hooks 列表

### 状态管理

- [useToggle](/hooks/use-toggle) - 布尔值切换钩子
- [useCounter](/hooks/use-counter) - 计数器钩子
- [useLocalStorage](/hooks/use-local-storage) - 本地存储钩子

### 性能优化

- [useDebounce](/hooks/use-debounce) - 防抖钩子
- [useThrottle](/hooks/use-throttle) - 节流钩子

### 数据获取

- [useFetch](/hooks/use-fetch) - 数据获取钩子

## 使用方式

### 全局引入

```ts
import { useToggle, useCounter, useFetch } from "vakao-ui";

export default {
  setup() {
    const [isVisible, toggle] = useToggle();
    const [count, increment, decrement] = useCounter(0);
    const [data, loading] = useFetch("/api/users");

    return {
      isVisible,
      toggle,
      count,
      increment,
      decrement,
      data,
      loading,
    };
  },
};
```

### 按需引入

```ts
import { useToggle, useLocalStorage, useDebounce } from "vakao-ui/hooks";
import { ref } from "vue";

export default {
  setup() {
    const [isVisible, toggle] = useToggle();
    const [username, setUsername] = useLocalStorage("username", "");

    const searchText = ref("");
    const debouncedSearchText = useDebounce(searchText, 300);

    return {
      isVisible,
      toggle,
      username,
      setUsername,
      searchText,
      debouncedSearchText,
    };
  },
};
```

## 特性

- **响应式** - 基于 Vue 3 响应式系统
- **类型安全** - 完整的 TypeScript 支持
- **轻量级** - 按需引入，减少包体积
- **易于测试** - 纯函数设计，便于单元测试
- **SSR 友好** - 支持服务端渲染

## 最佳实践

1. **按需引入** - 只引入需要的 hooks
2. **类型注解** - 充分利用 TypeScript 类型推导
3. **组合使用** - 多个 hooks 可以组合使用
4. **性能优化** - 合理使用防抖和节流 hooks

## 类型支持

所有 hooks 都提供完整的 TypeScript 类型定义，确保开发时的类型安全和智能提示。

```ts
import type { UseToggleReturn } from "vakao-ui";

const toggleResult: UseToggleReturn = useToggle();
```
