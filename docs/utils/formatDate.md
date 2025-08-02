# formatDate (日期格式化)

`formatDate` 是一个用于格式化日期的工具函数，支持多种日期格式、相对时间显示以及日期判断功能。

## 基本用法

```ts
import { formatDate, DATE_FORMATS } from "vakao-ui/utils";

// 使用预定义格式
const now = new Date();
console.log(formatDate(now, DATE_FORMATS.DATE)); // "2023-05-20"
console.log(formatDate(now, DATE_FORMATS.DATETIME)); // "2023-05-20 14:30:45"
console.log(formatDate(now, DATE_FORMATS.TIME)); // "14:30:45"

// 使用自定义格式
console.log(formatDate(now, "YYYY年MM月DD日 HH时mm分")); // "2023年05月20日 14时30分"
```

## API

### formatDate

```ts
function formatDate(date: Date | number | string, format: string = DATE_FORMATS.DATETIME, options?: FormatDateOptions): string;
```

#### 参数

| 参数    | 类型                     | 默认值                | 说明                                                 |
| ------- | ------------------------ | --------------------- | ---------------------------------------------------- |
| date    | Date \| number \| string | -                     | 要格式化的日期，可以是 Date 对象、时间戳或日期字符串 |
| format  | string                   | DATE_FORMATS.DATETIME | 格式化模板                                           |
| options | FormatDateOptions        | -                     | 格式化选项                                           |

#### 返回值

格式化后的日期字符串。

#### 格式化占位符

| 占位符 | 说明                | 示例 |
| ------ | ------------------- | ---- |
| YYYY   | 四位年份            | 2023 |
| YY     | 两位年份            | 23   |
| MM     | 两位月份（01-12）   | 05   |
| M      | 月份（1-12）        | 5    |
| DD     | 两位日期（01-31）   | 09   |
| D      | 日期（1-31）        | 9    |
| HH     | 两位小时（00-23）   | 14   |
| H      | 小时（0-23）        | 14   |
| hh     | 两位小时（01-12）   | 02   |
| h      | 小时（1-12）        | 2    |
| mm     | 两位分钟（00-59）   | 08   |
| m      | 分钟（0-59）        | 8    |
| ss     | 两位秒数（00-59）   | 09   |
| s      | 秒数（0-59）        | 9    |
| SSS    | 三位毫秒（000-999） | 078  |
| A      | AM/PM               | PM   |
| a      | am/pm               | pm   |

### formatRelativeTime

```ts
function formatRelativeTime(
  date: Date | number | string,
  baseDate: Date | number | string = new Date(),
  options?: FormatDateOptions,
): string;
```

#### 参数

| 参数     | 类型                     | 默认值     | 说明                     |
| -------- | ------------------------ | ---------- | ------------------------ |
| date     | Date \| number \| string | -          | 要格式化的日期           |
| baseDate | Date \| number \| string | new Date() | 基准日期，默认为当前时间 |
| options  | FormatDateOptions        | -          | 格式化选项               |

#### 返回值

相对时间字符串，如 "2小时前"、"3天后"。

### isToday

```ts
function isToday(date: Date | number | string): boolean;
```

#### 参数

| 参数 | 类型                     | 说明         |
| ---- | ------------------------ | ------------ |
| date | Date \| number \| string | 要检查的日期 |

#### 返回值

如果日期是今天返回 `true`，否则返回 `false`。

### isYesterday

```ts
function isYesterday(date: Date | number | string): boolean;
```

#### 参数

| 参数 | 类型                     | 说明         |
| ---- | ------------------------ | ------------ |
| date | Date \| number \| string | 要检查的日期 |

#### 返回值

如果日期是昨天返回 `true`，否则返回 `false`。

### isTomorrow

```ts
function isTomorrow(date: Date | number | string): boolean;
```

#### 参数

| 参数 | 类型                     | 说明         |
| ---- | ------------------------ | ------------ |
| date | Date \| number \| string | 要检查的日期 |

#### 返回值

如果日期是明天返回 `true`，否则返回 `false`。

## 预定义格式

`DATE_FORMATS` 提供了多种常用的日期格式：

```ts
const DATE_FORMATS = {
  /** YYYY-MM-DD */
  DATE: "YYYY-MM-DD",
  /** YYYY-MM-DD HH:mm:ss */
  DATETIME: "YYYY-MM-DD HH:mm:ss",
  /** YYYY-MM-DD HH:mm */
  DATETIME_SHORT: "YYYY-MM-DD HH:mm",
  /** HH:mm:ss */
  TIME: "HH:mm:ss",
  /** HH:mm */
  TIME_SHORT: "HH:mm",
  /** YYYY年MM月DD日 */
  DATE_CN: "YYYY年MM月DD日",
  /** YYYY年MM月DD日 HH:mm:ss */
  DATETIME_CN: "YYYY年MM月DD日 HH:mm:ss",
  /** MM/DD/YYYY */
  DATE_US: "MM/DD/YYYY",
  /** MM/DD/YYYY HH:mm:ss */
  DATETIME_US: "MM/DD/YYYY HH:mm:ss",
};
```

## 格式化选项

```ts
interface FormatDateOptions {
  /** 语言环境，默认为 'zh-CN' */
  locale?: string;
  /** 时区，默认为本地时区 */
  timeZone?: string;
  /** 是否使用12小时制，默认为 false */
  hour12?: boolean;
}
```

## 示例

### 基本日期格式化

```ts
import { formatDate, DATE_FORMATS } from "vakao-ui/utils";

const date = new Date(2023, 4, 20, 14, 30, 45);

// 使用预定义格式
console.log(formatDate(date, DATE_FORMATS.DATE)); // "2023-05-20"
console.log(formatDate(date, DATE_FORMATS.DATETIME)); // "2023-05-20 14:30:45"
console.log(formatDate(date, DATE_FORMATS.TIME)); // "14:30:45"
console.log(formatDate(date, DATE_FORMATS.DATE_CN)); // "2023年05月20日"

// 使用自定义格式
console.log(formatDate(date, "YYYY/MM/DD")); // "2023/05/20"
console.log(formatDate(date, "HH:mm")); // "14:30"
console.log(formatDate(date, "M月D日 HH时mm分")); // "5月20日 14时30分"
console.log(formatDate(date, "YY年M月D日 h:mm a")); // "23年5月20日 2:30 pm"
```

### 相对时间格式化

```ts
import { formatRelativeTime } from "vakao-ui/utils";

const now = new Date();
const pastDate = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2小时前
const futureDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3天后

// 中文环境（默认）
console.log(formatRelativeTime(pastDate)); // "2小时前"
console.log(formatRelativeTime(futureDate)); // "3天后"

// 英文环境
console.log(formatRelativeTime(pastDate, now, { locale: "en-US" })); // "2 hours ago"
console.log(formatRelativeTime(futureDate, now, { locale: "en-US" })); // "3 days later"
```

### 日期判断

```ts
import { isToday, isYesterday, isTomorrow } from "vakao-ui/utils";

const now = new Date();

// 今天
console.log(isToday(now)); // true

// 昨天
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
console.log(isYesterday(yesterday)); // true

// 明天
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
console.log(isTomorrow(tomorrow)); // true
```

### 处理不同类型的输入

```ts
import { formatDate, DATE_FORMATS } from "vakao-ui/utils";

// Date 对象
const dateObj = new Date(2023, 4, 20);
console.log(formatDate(dateObj, DATE_FORMATS.DATE)); // "2023-05-20"

// 时间戳（毫秒）
const timestamp = dateObj.getTime();
console.log(formatDate(timestamp, DATE_FORMATS.DATE)); // "2023-05-20"

// 日期字符串
const dateStr = "2023-05-20T14:30:45";
console.log(formatDate(dateStr, DATE_FORMATS.DATETIME)); // "2023-05-20 14:30:45"
```

## 注意事项

1. 传入无效的日期会抛出 "Invalid date" 错误
2. 相对时间格式化支持中文和英文两种语言环境，默认为中文
3. 日期判断函数只比较年、月、日，不考虑时间部分
4. 格式化函数支持多种输入类型，包括 Date 对象、时间戳和日期字符串
