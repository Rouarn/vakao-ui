# formatDate

日期格式化函数，支持多种格式和相对时间。

## 基础用法

```ts
import { formatDate, DATE_FORMATS } from "vakao-ui/utils";

const date = new Date("2023-12-25 15:30:45");

// 使用预定义格式
formatDate(date, DATE_FORMATS.DATE); // "2023-12-25"
formatDate(date, DATE_FORMATS.DATETIME); // "2023-12-25 15:30:45"
formatDate(date, DATE_FORMATS.TIME); // "15:30:45"

// 自定义格式
formatDate(date, "YYYY年MM月DD日"); // "2023年12月25日"
formatDate(date, "MM/DD/YYYY HH:mm"); // "12/25/2023 15:30"
```

## 预定义格式

```ts
const DATE_FORMATS = {
  DATE: "YYYY-MM-DD", // 2023-12-25
  DATETIME: "YYYY-MM-DD HH:mm:ss", // 2023-12-25 15:30:45
  DATETIME_SHORT: "YYYY-MM-DD HH:mm", // 2023-12-25 15:30
  TIME: "HH:mm:ss", // 15:30:45
  TIME_SHORT: "HH:mm", // 15:30
  DATE_CN: "YYYY年MM月DD日", // 2023年12月25日
  DATETIME_CN: "YYYY年MM月DD日 HH:mm:ss", // 2023年12月25日 15:30:45
  DATE_US: "MM/DD/YYYY", // 12/25/2023
  DATETIME_US: "MM/DD/YYYY HH:mm:ss", // 12/25/2023 15:30:45
};
```

## 格式化占位符

| 占位符 | 说明                 | 示例    |
| ------ | -------------------- | ------- |
| YYYY   | 四位年份             | 2023    |
| YY     | 两位年份             | 23      |
| MM     | 两位月份             | 01-12   |
| M      | 月份                 | 1-12    |
| DD     | 两位日期             | 01-31   |
| D      | 日期                 | 1-31    |
| HH     | 两位小时（24小时制） | 00-23   |
| H      | 小时（24小时制）     | 0-23    |
| hh     | 两位小时（12小时制） | 01-12   |
| h      | 小时（12小时制）     | 1-12    |
| mm     | 两位分钟             | 00-59   |
| m      | 分钟                 | 0-59    |
| ss     | 两位秒数             | 00-59   |
| s      | 秒数                 | 0-59    |
| SSS    | 三位毫秒             | 000-999 |
| A      | AM/PM                | AM/PM   |
| a      | am/pm                | am/pm   |

## 自定义格式示例

```ts
const date = new Date("2023-12-25 15:30:45.123");

// 基础格式
formatDate(date, "YYYY-MM-DD"); // "2023-12-25"
formatDate(date, "YY/M/D"); // "23/12/25"

// 时间格式
formatDate(date, "HH:mm:ss"); // "15:30:45"
formatDate(date, "H:m:s"); // "15:30:45"
formatDate(date, "hh:mm A"); // "03:30 PM"

// 包含毫秒
formatDate(date, "HH:mm:ss.SSS"); // "15:30:45.123"

// 中文格式
formatDate(date, "YYYY年M月D日 H时m分"); // "2023年12月25日 15时30分"

// 自定义分隔符
formatDate(date, "YYYY.MM.DD HH-mm-ss"); // "2023.12.25 15-30-45"
```

## 相对时间格式化

```ts
import { formatRelativeTime } from "vakao-ui/utils";

const now = new Date();
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

// 中文环境（默认）
formatRelativeTime(oneHourAgo); // "1小时前"
formatRelativeTime(tomorrow); // "1天后"

// 英文环境
formatRelativeTime(oneHourAgo, now, { locale: "en-US" }); // "1 hour ago"
formatRelativeTime(tomorrow, now, { locale: "en-US" }); // "in 1 day"
```

### 相对时间示例

```ts
const now = new Date();

// 过去时间
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

formatRelativeTime(fiveMinutesAgo); // "5分钟前"
formatRelativeTime(twoHoursAgo); // "2小时前"
formatRelativeTime(threeDaysAgo); // "3天前"

// 未来时间
const inTenMinutes = new Date(now.getTime() + 10 * 60 * 1000);
const inFourHours = new Date(now.getTime() + 4 * 60 * 60 * 1000);
const inOneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

formatRelativeTime(inTenMinutes); // "10分钟后"
formatRelativeTime(inFourHours); // "4小时后"
formatRelativeTime(inOneWeek); // "7天后"
```

## 日期判断函数

```ts
import { isToday, isYesterday, isTomorrow } from "vakao-ui/utils";

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

// 判断是否为今天
isToday(today); // true
isToday(yesterday); // false

// 判断是否为昨天
isYesterday(yesterday); // true
isYesterday(today); // false

// 判断是否为明天
isTomorrow(tomorrow); // true
isTomorrow(today); // false

// 支持字符串和时间戳
isToday("2023-12-25"); // 取决于当前日期
isToday(Date.now()); // true
```

## 格式化选项

```ts
interface FormatDateOptions {
  locale?: string; // 语言环境
  timeZone?: string; // 时区
  hour12?: boolean; // 是否使用12小时制
}

// 使用选项
const date = new Date("2023-12-25 15:30:45");

// 指定时区
formatDate(date, "YYYY-MM-DD HH:mm", { timeZone: "UTC" });

// 指定语言环境
formatRelativeTime(date, new Date(), { locale: "en-US" });

// 使用12小时制
formatDate(date, "hh:mm A", { hour12: true });
```

## 实际应用场景

### 列表显示

```ts
// 文章列表
const articles = [
  { title: "文章1", createdAt: new Date("2023-12-25 10:30:00") },
  { title: "文章2", createdAt: new Date("2023-12-24 15:20:00") },
];

articles.forEach((article) => {
  console.log(
    `${article.title} - ${formatDate(article.createdAt, DATE_FORMATS.DATETIME_SHORT)}`,
  );
});
```

### 聊天消息

```ts
// 消息时间显示
function formatMessageTime(timestamp: number) {
  const date = new Date(timestamp);

  if (isToday(date)) {
    return formatDate(date, "HH:mm");
  } else if (isYesterday(date)) {
    return `昨天 ${formatDate(date, "HH:mm")}`;
  } else {
    return formatDate(date, "MM-DD HH:mm");
  }
}
```

### 动态时间更新

```ts
// 实时更新相对时间
function updateRelativeTime(element: HTMLElement, timestamp: number) {
  const update = () => {
    element.textContent = formatRelativeTime(timestamp);
  };

  update(); // 立即更新
  setInterval(update, 60000); // 每分钟更新
}
```

## 类型定义

```ts
interface FormatDateOptions {
  locale?: string;
  timeZone?: string;
  hour12?: boolean;
}

/**
 * 格式化日期
 * @param date 日期对象、时间戳或日期字符串
 * @param format 格式化模板
 * @param options 格式化选项
 * @returns 格式化后的日期字符串
 */
function formatDate(
  date: Date | number | string,
  format?: string,
  options?: FormatDateOptions,
): string;

/**
 * 格式化相对时间
 * @param date 目标日期
 * @param baseDate 基准日期（默认为当前时间）
 * @param options 格式化选项
 * @returns 相对时间字符串
 */
function formatRelativeTime(
  date: Date | number | string,
  baseDate?: Date | number | string,
  options?: FormatDateOptions,
): string;

/**
 * 判断是否为今天
 */
function isToday(date: Date | number | string): boolean;

/**
 * 判断是否为昨天
 */
function isYesterday(date: Date | number | string): boolean;

/**
 * 判断是否为明天
 */
function isTomorrow(date: Date | number | string): boolean;
```

## 注意事项

1. **时区处理**：默认使用本地时区，可通过 `timeZone` 选项指定
2. **语言环境**：相对时间格式化支持多语言，默认为中文
3. **性能考虑**：频繁格式化时建议缓存格式化结果
4. **输入验证**：函数会自动处理无效日期，返回 "Invalid Date"
5. **浏览器兼容性**：基于原生 Date 对象，兼容性良好
6. **日期判断**：基于本地时区进行比较，不考虑具体时间
