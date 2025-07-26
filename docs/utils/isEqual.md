# isEqual

深度比较函数，支持各种数据类型的深度比较。

## 基础用法

```ts
import { isEqual } from "vakao-ui/utils";

// 基本类型比较
isEqual(1, 1); // true
isEqual("hello", "hello"); // true
isEqual(NaN, NaN); // true
isEqual(null, null); // true
isEqual(undefined, undefined); // true

// 对象比较
const obj1 = { name: "张三", age: 25 };
const obj2 = { name: "张三", age: 25 };
const obj3 = { age: 25, name: "张三" }; // 属性顺序不同

isEqual(obj1, obj2); // true
isEqual(obj1, obj3); // true

// 数组比较
isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual([1, [2, 3]], [1, [2, 3]]); // true
```

## 复杂数据类型比较

### Date 对象

```ts
const date1 = new Date("2023-12-25");
const date2 = new Date("2023-12-25");
const date3 = new Date("2023-12-26");

isEqual(date1, date2); // true
isEqual(date1, date3); // false
```

### RegExp 对象

```ts
const regex1 = /test/gi;
const regex2 = /test/gi;
const regex3 = /test/g;

isEqual(regex1, regex2); // true
isEqual(regex1, regex3); // false（flags 不同）
```

### Map 对象

```ts
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
const map2 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
const map3 = new Map([
  ["key2", "value2"],
  ["key1", "value1"],
]); // 顺序不同

isEqual(map1, map2); // true
isEqual(map1, map3); // true（Map 比较不考虑顺序）
```

### Set 对象

```ts
const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);
const set3 = new Set([3, 2, 1]); // 顺序不同
const set4 = new Set([1, 2, 3, 4]);

isEqual(set1, set2); // true
isEqual(set1, set3); // true（Set 比较不考虑顺序）
isEqual(set1, set4); // false
```

## 嵌套结构比较

```ts
const complex1 = {
  users: [
    { id: 1, name: "张三", tags: new Set(["admin", "user"]) },
    { id: 2, name: "李四", tags: new Set(["user"]) },
  ],
  metadata: {
    total: 2,
    created: new Date("2023-12-25"),
    config: new Map([
      ["theme", "dark"],
      ["lang", "zh-CN"],
    ]),
  },
};

const complex2 = {
  users: [
    { id: 1, name: "张三", tags: new Set(["user", "admin"]) }, // Set 顺序不同
    { id: 2, name: "李四", tags: new Set(["user"]) },
  ],
  metadata: {
    total: 2,
    created: new Date("2023-12-25"),
    config: new Map([
      ["lang", "zh-CN"],
      ["theme", "dark"],
    ]), // Map 顺序不同
  },
};

isEqual(complex1, complex2); // true
```

## 浅比较

对于只需要比较对象第一层属性的场景，可以使用 `shallowEqual`：

```ts
import { shallowEqual } from "vakao-ui/utils";

const obj1 = { name: "张三", info: { age: 25 } };
const obj2 = { name: "张三", info: { age: 25 } };
const obj3 = { name: "张三", info: obj1.info }; // 共享引用

shallowEqual(obj1, obj2); // false（info 是不同的对象引用）
shallowEqual(obj1, obj3); // true（info 是相同的引用）
isEqual(obj1, obj2); // true（深度比较）
```

### 浅比较的使用场景

```ts
// React props 比较
function MyComponent(props: { name: string; config: Config }) {
  const prevProps = usePrevious(props);

  // 只比较第一层属性，性能更好
  if (shallowEqual(props, prevProps)) {
    return; // 跳过重新渲染
  }
}

// 状态更新检查
function updateState(newState: State) {
  if (!shallowEqual(currentState, newState)) {
    setCurrentState(newState);
  }
}
```

## 数组比较

```ts
import { arrayEqual } from "vakao-ui/utils";

// 浅比较数组元素
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = [{ a: 1 }, { b: 2 }];
const arr4 = [{ a: 1 }, { b: 2 }];

arrayEqual(arr1, arr2); // true
arrayEqual(arr3, arr4); // false（对象引用不同）

// 深度比较数组
isEqual(arr3, arr4); // true
```

### 数组比较的性能优化

```ts
// 对于大数组，先比较长度
function fastArrayEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  return arrayEqual(a, b);
}

// 对于已排序的数组
function sortedArrayEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
```

## 处理循环引用

对于包含循环引用的对象，请使用 `isEqualWithCircular`：

```ts
import { isEqualWithCircular } from "vakao-ui/utils";

const obj1: any = { name: "test" };
obj1.self = obj1; // 创建循环引用

const obj2: any = { name: "test" };
obj2.self = obj2; // 创建循环引用

const obj3: any = { name: "different" };
obj3.self = obj3;

isEqualWithCircular(obj1, obj2); // true
isEqualWithCircular(obj1, obj3); // false

// 普通 isEqual 会导致栈溢出
// isEqual(obj1, obj2); // ❌ 不要这样做
```

## 特殊值处理

```ts
// NaN 比较
isEqual(NaN, NaN); // true（与 === 不同）
NaN === NaN; // false

// +0 和 -0
isEqual(+0, -0); // false
+0 === -0; // true

// undefined 和 null
isEqual(undefined, null); // false
isEqual(undefined, undefined); // true
isEqual(null, null); // true

// 空对象和空数组
isEqual({}, {}); // true
isEqual([], []); // true
isEqual({}, []); // false
```

## 性能考虑

### 选择合适的比较函数

```ts
// 基本类型：使用 === 或 Object.is
if (typeof a === "string" && typeof b === "string") {
  return a === b;
}

// 浅比较：使用 shallowEqual
if (needsShallowComparison) {
  return shallowEqual(a, b);
}

// 数组浅比较：使用 arrayEqual
if (Array.isArray(a) && Array.isArray(b)) {
  return arrayEqual(a, b);
}

// 深度比较：使用 isEqual
return isEqual(a, b);
```

### 优化大对象比较

```ts
// 先比较引用
if (a === b) return true;

// 再比较类型
if (typeof a !== typeof b) return false;

// 对于数组，先比较长度
if (Array.isArray(a) && Array.isArray(b)) {
  if (a.length !== b.length) return false;
}

// 对于对象，先比较键的数量
if (typeof a === "object" && a !== null && b !== null) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
}

// 最后进行深度比较
return isEqual(a, b);
```

## 实际应用场景

### React 组件优化

```ts
import { memo } from "react";
import { shallowEqual } from "vakao-ui/utils";

const MyComponent = memo(
  (props) => {
    // 组件逻辑
  },
  (prevProps, nextProps) => {
    // 自定义比较逻辑
    return shallowEqual(prevProps, nextProps);
  },
);
```

### Vue 组件监听

```ts
import { watch } from "vue";
import { isEqual } from "vakao-ui/utils";

// 深度监听对象变化
watch(
  () => state.complexObject,
  (newVal, oldVal) => {
    if (!isEqual(newVal, oldVal)) {
      // 处理变化
    }
  },
  { deep: true },
);
```

### 缓存和记忆化

```ts
const cache = new Map();

function memoizedFunction(args: any[]) {
  // 查找缓存
  for (const [cachedArgs, result] of cache) {
    if (isEqual(args, cachedArgs)) {
      return result;
    }
  }

  // 计算结果
  const result = expensiveOperation(...args);
  cache.set(args, result);
  return result;
}
```

## 类型定义

```ts
/**
 * 深度比较两个值是否相等
 * @param a 第一个值
 * @param b 第二个值
 * @returns 是否相等
 */
function isEqual(a: any, b: any): boolean;

/**
 * 深度比较两个值是否相等（支持循环引用）
 * @param a 第一个值
 * @param b 第二个值
 * @param visitedA 已访问的对象映射（内部使用）
 * @param visitedB 已访问的对象映射（内部使用）
 * @returns 是否相等
 */
function isEqualWithCircular(
  a: any,
  b: any,
  visitedA?: WeakMap<object, object>,
  visitedB?: WeakMap<object, object>,
): boolean;

/**
 * 浅比较两个对象的第一层属性
 * @param a 第一个对象
 * @param b 第二个对象
 * @returns 是否相等
 */
function shallowEqual(a: any, b: any): boolean;

/**
 * 浅比较两个数组的元素
 * @param a 第一个数组
 * @param b 第二个数组
 * @returns 是否相等
 */
function arrayEqual(a: any[], b: any[]): boolean;
```

## 注意事项

1. **性能**：深度比较可能消耗较多性能，对于大对象建议先进行浅比较
2. **循环引用**：普通 `isEqual` 不支持循环引用，需要使用 `isEqualWithCircular`
3. **函数比较**：函数只比较引用，不比较函数体内容
4. **Symbol 属性**：不会比较 Symbol 作为键的属性
5. **原型链**：不会比较对象的原型链
6. **特殊值**：正确处理 NaN、+0/-0 等特殊值
7. **类型检查**：建议在 TypeScript 中使用以获得更好的类型安全

## 使用建议

- 优先使用 `===` 进行引用比较
- 对于 React props 比较，使用 `shallowEqual`
- 对于状态管理，根据需要选择浅比较或深比较
- 对于可能存在循环引用的场景，使用 `isEqualWithCircular`
- 在性能敏感的场景中，考虑实现自定义的比较逻辑
