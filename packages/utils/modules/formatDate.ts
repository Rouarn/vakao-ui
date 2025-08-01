/**
 * 日期格式化选项
 */
export interface FormatDateOptions {
  /** 语言环境，默认为 'zh-CN' */
  locale?: string;
  /** 时区，默认为本地时区 */
  timeZone?: string;
  /** 是否使用12小时制，默认为 false */
  hour12?: boolean;
}

/**
 * 预定义的日期格式
 */
export const DATE_FORMATS = {
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
} as const;

/**
 * 格式化日期
 * @param date 要格式化的日期，可以是 Date 对象、时间戳或日期字符串
 * @param format 格式化模板，支持以下占位符：
 *   - YYYY: 四位年份
 *   - YY: 两位年份
 *   - MM: 两位月份（01-12）
 *   - M: 月份（1-12）
 *   - DD: 两位日期（01-31）
 *   - D: 日期（1-31）
 *   - HH: 两位小时（00-23）
 *   - H: 小时（0-23）
 *   - hh: 两位小时（01-12）
 *   - h: 小时（1-12）
 *   - mm: 两位分钟（00-59）
 *   - m: 分钟（0-59）
 *   - ss: 两位秒数（00-59）
 *   - s: 秒数（0-59）
 *   - SSS: 三位毫秒（000-999）
 *   - A: AM/PM
 *   - a: am/pm
 * @param options 格式化选项
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | number | string, format: string = DATE_FORMATS.DATETIME, _options?: FormatDateOptions): string => {
  // 转换为 Date 对象
  const dateObj = new Date(date);

  // 检查日期是否有效
  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date");
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();
  const milliseconds = dateObj.getMilliseconds();

  // 12小时制转换
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const ampm = hours >= 12 ? "PM" : "AM";
  const ampmLower = ampm.toLowerCase();

  // 格式化映射
  const formatMap: Record<string, string> = {
    YYYY: year.toString(),
    YY: year.toString().slice(-2),
    MM: month.toString().padStart(2, "0"),
    M: month.toString(),
    DD: day.toString().padStart(2, "0"),
    D: day.toString(),
    HH: hours.toString().padStart(2, "0"),
    H: hours.toString(),
    hh: hours12.toString().padStart(2, "0"),
    h: hours12.toString(),
    mm: minutes.toString().padStart(2, "0"),
    m: minutes.toString(),
    ss: seconds.toString().padStart(2, "0"),
    s: seconds.toString(),
    SSS: milliseconds.toString().padStart(3, "0"),
    A: ampm,
    a: ampmLower,
  };

  // 替换格式化占位符
  let result = format;
  for (const [key, value] of Object.entries(formatMap)) {
    result = result.replace(new RegExp(key, "g"), value);
  }

  return result;
};

/**
 * 相对时间格式化
 * @param date 要格式化的日期
 * @param baseDate 基准日期，默认为当前时间
 * @param options 格式化选项
 * @returns 相对时间字符串，如 "2小时前"、"3天后"
 */
export const formatRelativeTime = (
  date: Date | number | string,
  baseDate: Date | number | string = new Date(),
  options?: FormatDateOptions
): string => {
  const dateObj = new Date(date);
  const baseDateObj = new Date(baseDate);

  // 检查日期是否有效
  if (isNaN(dateObj.getTime()) || isNaN(baseDateObj.getTime())) {
    throw new Error("Invalid date");
  }

  const diff = dateObj.getTime() - baseDateObj.getTime();
  const absDiff = Math.abs(diff);
  const isPast = diff < 0;

  const locale = options?.locale || "zh-CN";

  // 时间单位（毫秒）
  const units = {
    year: 365 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  // 中文时间单位
  const cnUnits = {
    year: "年",
    month: "个月",
    week: "周",
    day: "天",
    hour: "小时",
    minute: "分钟",
    second: "秒",
  };

  // 英文时间单位
  const enUnits = {
    year: "year",
    month: "month",
    week: "week",
    day: "day",
    hour: "hour",
    minute: "minute",
    second: "second",
  };

  // 选择时间单位
  const timeUnits = locale.startsWith("zh") ? cnUnits : enUnits;
  const suffix = locale.startsWith("zh") ? (isPast ? "前" : "后") : isPast ? " ago" : " later";

  // 计算最合适的时间单位
  for (const [unit, ms] of Object.entries(units)) {
    if (absDiff >= ms) {
      const value = Math.floor(absDiff / ms);
      const unitText = timeUnits[unit as keyof typeof timeUnits];

      if (locale.startsWith("zh")) {
        return `${value}${unitText}${suffix}`;
      } else {
        const plural = value > 1 ? "s" : "";
        return `${value} ${unitText}${plural}${suffix}`;
      }
    }
  }

  // 小于1秒的情况
  return locale.startsWith("zh") ? "刚刚" : "just now";
};

/**
 * 判断是否为今天
 * @param date 要检查的日期
 * @returns 是否为今天
 */
export const isToday = (date: Date | number | string): boolean => {
  const dateObj = new Date(date);
  const today = new Date();

  return dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth() === today.getMonth() && dateObj.getDate() === today.getDate();
};

/**
 * 判断是否为昨天
 * @param date 要检查的日期
 * @returns 是否为昨天
 */
export const isYesterday = (date: Date | number | string): boolean => {
  const dateObj = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    dateObj.getFullYear() === yesterday.getFullYear() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getDate() === yesterday.getDate()
  );
};

/**
 * 判断是否为明天
 * @param date 要检查的日期
 * @returns 是否为明天
 */
export const isTomorrow = (date: Date | number | string): boolean => {
  const dateObj = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    dateObj.getFullYear() === tomorrow.getFullYear() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getDate() === tomorrow.getDate()
  );
};
