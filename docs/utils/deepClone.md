# deepClone

`deepClone` 是一个用于深度克隆对象的工具函数，支持对象、数组、Date、RegExp、Map、Set 等类型的深度拷贝。

## 基本用法

```ts
import { deepClone } from "vakao-ui/utils";

const original = {
  name: "张三",
  hobbies: ["读书", "游泳"],
  birthday: new Date(1990, 0, 1),
};

const cloned = deepClone(original);

// 修改克隆对象不会影响原始对象
cloned.name = "李四";
cloned.hobbies.push("跑步");
console.log(original.name); // "张三"
console.log(original.hobbies); // ["读书", "游泳"]
```

## API

### deepClone

```ts
function deepClone<T>(obj: T): T;
```

#### 参数

| 参数 | 类型 | 说明         |
| ---- | ---- | ------------ |
| obj  | T    | 要拷贝的对象 |

#### 返回值

返回深拷贝后的对象。

### deepCloneWithCircular

支持循环引用的深拷贝函数。

```ts
function deepCloneWithCircular<T>(obj: T, visited?: WeakMap<object, unknown>): T;
```

#### 参数

| 参数    | 类型                     | 默认值        | 说明                               |
| ------- | ------------------------ | ------------- | ---------------------------------- |
| obj     | T                        | -             | 要拷贝的对象                       |
| visited | WeakMap<object, unknown> | new WeakMap() | 已访问的对象映射，用于处理循环引用 |

#### 返回值

返回深拷贝后的对象。

## 支持的数据类型

- 基本类型（number、string、boolean、null、undefined）
- 对象（Object）
- 数组（Array）
- 日期（Date）
- 正则表达式（RegExp）
- Map
- Set

## 示例

### 基本对象和数组

```ts
import { deepClone } from "vakao-ui/utils";

// 对象
const user = {
  id: 1,
  name: "张三",
  address: {
    city: "北京",
    district: "海淀区",
  },
};

const clonedUser = deepClone(user);
clonedUser.address.city = "上海";
console.log(user.address.city); // "北京"

// 数组
const numbers = [1, 2, [3, 4]];
const clonedNumbers = deepClone(numbers);
clonedNumbers[2][0] = 5;
console.log(numbers[2][0]); // 3
```

### 特殊对象类型

```ts
import { deepClone } from "vakao-ui/utils";

// Date 对象
const date = new Date();
const clonedDate = deepClone(date);
console.log(date === clonedDate); // false
console.log(date.getTime() === clonedDate.getTime()); // true

// RegExp 对象
const regex = /test/gi;
const clonedRegex = deepClone(regex);
console.log(regex === clonedRegex); // false
console.log(regex.source === clonedRegex.source); // true
console.log(regex.flags === clonedRegex.flags); // true

// Map 对象
const map = new Map();
map.set("key1", "value1");
map.set("key2", { nested: "value" });
const clonedMap = deepClone(map);
clonedMap.get("key2").nested = "changed";
console.log(map.get("key2").nested); // "value"

// Set 对象
const set = new Set([1, 2, { id: 3 }]);
const clonedSet = deepClone(set);
const originalObj = Array.from(set)[2];
const clonedObj = Array.from(clonedSet)[2];
clonedObj.id = 4;
console.log(originalObj.id); // 3
```

### 处理循环引用

```ts
import { deepCloneWithCircular } from "vakao-ui/utils";

// 创建一个带有循环引用的对象
const circular = {
  name: "循环对象",
  self: null as any,
};
circular.self = circular; // 创建循环引用

// 使用支持循环引用的深拷贝函数
const clonedCircular = deepCloneWithCircular(circular);

console.log(clonedCircular.name); // "循环对象"
console.log(clonedCircular.self === clonedCircular); // true
console.log(clonedCircular !== circular); // true
```

## 注意事项

1. 普通的 `deepClone` 函数不支持循环引用，如果对象中存在循环引用，请使用 `deepCloneWithCircular` 函数
2. 函数对象会被直接引用而不是克隆
3. 对于 DOM 节点、Window 对象等特殊对象，不保证能正确克隆
4. 对于大型对象，深拷贝可能会消耗较多性能，请谨慎使用
