# deepClone

深拷贝函数，支持对象、数组、Date、RegExp、Map、Set 等类型的深度拷贝。

## 基础用法

```ts
import { deepClone } from "vakao-ui/utils";

const original = {
  name: "张三",
  age: 25,
  hobbies: ["读书", "游泳"],
  info: {
    city: "北京",
    job: "工程师"
  }
};

const cloned = deepClone(original);
cloned.hobbies.push("跑步");
console.log(original.hobbies); // ["读书", "游泳"]
console.log(cloned.hobbies); // ["读书", "游泳", "跑步"]
```

## 支持的数据类型

### 基本类型

```ts
// 基本类型
deepClone("hello"); // "hello"
deepClone(123); // 123
deepClone(true); // true
deepClone(null); // null
deepClone(undefined); // undefined
```

### 对象和数组

```ts
// 对象
const obj = { name: "张三", age: 25 };
const clonedObj = deepClone(obj);

// 数组
const arr = [1, 2, { name: "李四" }];
const clonedArr = deepClone(arr);

// 嵌套结构
const nested = {
  users: [
    { id: 1, name: "张三" },
    { id: 2, name: "李四" }
  ],
  config: {
    theme: "dark",
    settings: {
      autoSave: true
    }
  }
};
const clonedNested = deepClone(nested);
```

### 特殊对象类型

```ts
// 日期对象
const date = new Date("2023-12-25");
const clonedDate = deepClone(date);
console.log(clonedDate instanceof Date); // true

// 正则表达式
const regex = /test/gi;
const clonedRegex = deepClone(regex);
console.log(clonedRegex instanceof RegExp); // true

// Map 对象
const map = new Map([["key1", "value1"], ["key2", "value2"]]);
const clonedMap = deepClone(map);
console.log(clonedMap instanceof Map); // true

// Set 对象
const set = new Set([1, 2, 3, 4]);
const clonedSet = deepClone(set);
console.log(clonedSet instanceof Set); // true
```

## 处理循环引用

对于包含循环引用的对象，请使用 `deepCloneWithCircular` 函数：

```ts
import { deepCloneWithCircular } from "vakao-ui/utils";

const obj: any = { name: "test" };
obj.self = obj; // 创建循环引用

const cloned = deepCloneWithCircular(obj);
console.log(cloned.self === cloned); // true
console.log(cloned !== obj); // true
```

## 性能考虑

### 选择合适的函数

```ts
// 对于没有循环引用的对象，使用 deepClone（性能更好）
const simpleObj = { name: "张三", hobbies: ["读书"] };
const cloned1 = deepClone(simpleObj);

// 对于可能包含循环引用的对象，使用 deepCloneWithCircular
const complexObj: any = { name: "李四" };
complexObj.parent = complexObj;
const cloned2 = deepCloneWithCircular(complexObj);
```

### 大对象处理

```ts
// 对于大型对象，考虑是否真的需要深拷贝
const largeData = {
  users: new Array(10000).fill(null).map((_, i) => ({ id: i, name: `User${i}` })),
  metadata: { total: 10000, page: 1 }
};

// 如果只需要修改 metadata，可以考虑浅拷贝 + 部分深拷贝
const partialClone = {
  ...largeData,
  metadata: deepClone(largeData.metadata)
};
```

## 类型定义

```ts
/**
 * 深拷贝函数（不支持循环引用）
 * @param obj 要拷贝的对象
 * @returns 拷贝后的新对象
 */
function deepClone<T>(obj: T): T;

/**
 * 深拷贝函数（支持循环引用）
 * @param obj 要拷贝的对象
 * @param visited 已访问对象的映射表（内部使用）
 * @returns 拷贝后的新对象
 */
function deepCloneWithCircular<T>(
  obj: T, 
  visited?: WeakMap<object, any>
): T;
```

## 注意事项

1. **函数拷贝**：函数会被直接复制引用，不会进行深拷贝
2. **Symbol 属性**：Symbol 作为属性键的情况下会被忽略
3. **原型链**：不会拷贝对象的原型链
4. **不可枚举属性**：只拷贝可枚举属性
5. **循环引用**：普通 `deepClone` 不支持循环引用，需要使用 `deepCloneWithCircular`
6. **性能**：对于大型对象，深拷贝可能会消耗较多内存和时间

## 使用建议

- 优先使用 `deepClone`，性能更好
- 只有在确定存在循环引用时才使用 `deepCloneWithCircular`
- 对于简单的对象，可以考虑使用 `JSON.parse(JSON.stringify())` 或结构化克隆
- 在 React/Vue 等框架中，通常用于状态管理和数据处理