# isEqual

`isEqual` 是一个用于深度比较两个值是否相等的工具函数，支持对象、数组、Date、RegExp、Map、Set 等类型的深度比较。

## 基本用法

```ts
import { isEqual } from "vakao-ui/utils";

const obj1 = { name: "张三", age: 30, hobbies: ["读书", "游泳"] };
const obj2 = { name: "张三", age: 30, hobbies: ["读书", "游泳"] };
const obj3 = { name: "李四", age: 30, hobbies: ["读书", "游泳"] };

console.log(isEqual(obj1, obj2)); // true
console.log(isEqual(obj1, obj3)); // false
```

## API

### isEqual

```ts
function isEqual(a: unknown, b: unknown): boolean;
```

#### 参数

| 参数 | 类型    | 说明     |
| ---- | ------- | -------- |
| a    | unknown | 第一个值 |
| b    | unknown | 第二个值 |

#### 返回值

如果两个值相等返回 `true`，否则返回 `false`。

### isEqualWithCircular

支持循环引用的深度比较函数。

```ts
function isEqualWithCircular(a: unknown, b: unknown, visitedA?: WeakMap<object, object>, visitedB?: WeakMap<object, object>): boolean;
```

#### 参数

| 参数     | 类型                    | 默认值        | 说明                |
| -------- | ----------------------- | ------------- | ------------------- |
| a        | unknown                 | -             | 第一个值            |
| b        | unknown                 | -             | 第二个值            |
| visitedA | WeakMap<object, object> | new WeakMap() | 已访问的 a 对象映射 |
| visitedB | WeakMap<object, object> | new WeakMap() | 已访问的 b 对象映射 |

#### 返回值

如果两个值相等返回 `true`，否则返回 `false`。

### shallowEqual

浅比较两个对象是否相等，只比较第一层属性，不进行深度比较。

```ts
function shallowEqual(a: unknown, b: unknown): boolean;
```

#### 参数

| 参数 | 类型    | 说明     |
| ---- | ------- | -------- |
| a    | unknown | 第一个值 |
| b    | unknown | 第二个值 |

#### 返回值

如果两个对象的第一层属性相等返回 `true`，否则返回 `false`。

### arrayEqual

比较两个数组是否相等（浅比较）。

```ts
function arrayEqual<T>(a: T[], b: T[]): boolean;
```

#### 参数

| 参数 | 类型 | 说明       |
| ---- | ---- | ---------- |
| a    | T[]  | 第一个数组 |
| b    | T[]  | 第二个数组 |

#### 返回值

如果两个数组相等返回 `true`，否则返回 `false`。

## 支持的数据类型

- 基本类型（number、string、boolean、null、undefined）
- 对象（Object）
- 数组（Array）
- 日期（Date）
- 正则表达式（RegExp）
- Map
- Set

## 示例

### 基本对象和数组比较

```ts
import { isEqual } from "vakao-ui/utils";

// 对象比较
const user1 = {
  id: 1,
  name: "张三",
  address: {
    city: "北京",
    district: "海淀区",
  },
};

const user2 = {
  id: 1,
  name: "张三",
  address: {
    city: "北京",
    district: "海淀区",
  },
};

console.log(isEqual(user1, user2)); // true

// 数组比较
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4]];
const arr3 = [1, 2, [3, 5]];

console.log(isEqual(arr1, arr2)); // true
console.log(isEqual(arr1, arr3)); // false
```

### 特殊对象类型比较

```ts
import { isEqual } from "vakao-ui/utils";

// Date 对象比较
const date1 = new Date(2023, 0, 1);
const date2 = new Date(2023, 0, 1);
const date3 = new Date(2023, 0, 2);

console.log(isEqual(date1, date2)); // true
console.log(isEqual(date1, date3)); // false

// RegExp 对象比较
const regex1 = /test/gi;
const regex2 = /test/gi;
const regex3 = /test/i;

console.log(isEqual(regex1, regex2)); // true
console.log(isEqual(regex1, regex3)); // false

// Map 对象比较
const map1 = new Map();
map1.set("key1", "value1");
map1.set("key2", { nested: "value" });

const map2 = new Map();
map2.set("key1", "value1");
map2.set("key2", { nested: "value" });

const map3 = new Map();
map3.set("key1", "value1");
map3.set("key2", { nested: "different" });

console.log(isEqual(map1, map2)); // true
console.log(isEqual(map1, map3)); // false

// Set 对象比较
const set1 = new Set([1, 2, { id: 3 }]);
const set2 = new Set([1, 2, { id: 3 }]);
const set3 = new Set([1, 2, { id: 4 }]);

console.log(isEqual(set1, set2)); // true
console.log(isEqual(set1, set3)); // false
```

### 浅比较和数组比较

```ts
import { shallowEqual, arrayEqual } from "vakao-ui/utils";

// 浅比较
const obj1 = { a: 1, b: 2, c: { d: 3 } };
const obj2 = { a: 1, b: 2, c: { d: 3 } };
const obj3 = { a: 1, b: 2, c: { d: 4 } };

console.log(shallowEqual(obj1, obj2)); // true (c 属性引用不同，但浅比较只比较引用)
console.log(isEqual(obj1, obj3)); // false (深比较会检查 c.d 的值)

// 数组浅比较
const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
const array3 = [1, 2, 4];

console.log(arrayEqual(array1, array2)); // true
console.log(arrayEqual(array1, array3)); // false
```

### 处理循环引用

```ts
import { isEqualWithCircular } from "vakao-ui/utils";

// 创建带有循环引用的对象
const circular1 = { name: "循环对象" };
circular1.self = circular1;

const circular2 = { name: "循环对象" };
circular2.self = circular2;

const circular3 = { name: "不同的循环对象" };
circular3.self = circular3;

// 使用支持循环引用的比较函数
console.log(isEqualWithCircular(circular1, circular2)); // true
console.log(isEqualWithCircular(circular1, circular3)); // false
```

## 注意事项

1. 普通的 `isEqual` 函数不支持循环引用，如果对象中存在循环引用，请使用 `isEqualWithCircular` 函数
2. `shallowEqual` 只比较对象的第一层属性，对于嵌套对象，只比较引用是否相同
3. `arrayEqual` 使用 `Object.is` 进行元素比较，适用于基本类型数组，对于对象数组可能需要使用 `isEqual`
4. 对于大型对象，深度比较可能会消耗较多性能，请谨慎使用
