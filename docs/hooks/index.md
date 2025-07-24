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

### 即将推出

- `useCounter` - 计数器钩子
- `useLocalStorage` - 本地存储钩子
- `useDebounce` - 防抖钩子
- `useThrottle` - 节流钩子
- `useFetch` - 数据获取钩子

## 使用方式

### 全局引入

```ts
import { useToggle } from 'vakao-ui';

export default {
  setup() {
    const { state, toggle } = useToggle();
    
    return {
      state,
      toggle
    };
  }
};
```

### 按需引入

```ts
import { useToggle } from 'vakao-ui/hooks';

export default {
  setup() {
    const { state, toggle } = useToggle();
    
    return {
      state,
      toggle
    };
  }
};
```

## 类型支持

所有 hooks 都提供完整的 TypeScript 类型定义，确保开发时的类型安全和智能提示。

```ts
import type { UseToggleReturn } from 'vakao-ui';

const toggleResult: UseToggleReturn = useToggle();
```