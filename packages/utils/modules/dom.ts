import { isClient } from "./typeTool";

/**
 * 获取 DOM 元素的计算样式
 * @param element - 目标 DOM 元素
 * @param styleName - 样式属性名（驼峰式或短横线式）
 * @returns 样式属性值
 * @example
 * const el = document.getElementById('my-element');
 * getStyle(el, 'fontSize'); // '16px'
 * getStyle(el, 'background-color'); // 'rgb(255, 255, 255)'
 */
export const getStyle = (element: HTMLElement, styleName: string): string => {
  if (!isClient || !element || !styleName) return "";

  // 将驼峰式命名转换为短横线式
  const camelizedName = styleName.replace(/([A-Z])/g, "-$1").toLowerCase();
  const style = window.getComputedStyle(element, null);
  return style.getPropertyValue(camelizedName);
};

/**
 * 设置 DOM 元素的样式
 * @param element - 目标 DOM 元素
 * @param styleName - 样式属性名或包含多个样式的对象
 * @param value - 样式值（当 styleName 为字符串时）
 * @example
 * const el = document.getElementById('my-element');
 * setStyle(el, 'fontSize', '20px');
 * setStyle(el, { color: 'red', fontWeight: 'bold' });
 */
export const setStyle = (element: HTMLElement, styleName: string | Record<string, string>, value?: string) => {
  if (!isClient || !element || !styleName) return;

  if (typeof styleName === "object") {
    for (const prop in styleName) {
      if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    Object.assign(element.style, { [styleName]: value ?? "" });
  }
};

/**
 * 为 DOM 元素添加 CSS 类
 * @param element - 目标 DOM 元素
 * @param className - 要添加的类名，可以是用空格分隔的多个类名
 * @example
 * addClass(el, 'class1 class2');
 */
export const addClass = (element: HTMLElement, className: string) => {
  if (!isClient || !element || !className) return;
  element.classList.add(...className.split(" ").filter(Boolean));
};

/**
 * 从 DOM 元素移除 CSS 类
 * @param element - 目标 DOM 元素
 * @param className - 要移除的类名，可以是用空格分隔的多个类名
 * @example
 * removeClass(el, 'class1 class2');
 */
export const removeClass = (element: HTMLElement, className: string) => {
  if (!isClient || !element || !className) return;
  element.classList.remove(...className.split(" ").filter(Boolean));
};

/**
 * 检查 DOM 元素是否含有指定的 CSS 类
 * @param element - 目标 DOM 元素
 * @param className - 要检查的类名
 * @returns 如果含有该类名则返回 true，否则返回 false
 * @example
 * hasClass(el, 'class1'); // true
 */
export const hasClass = (element: HTMLElement, className: string): boolean => {
  if (!isClient || !element || !className) return false;
  return element.classList.contains(className);
};

/**
 * 获取元素的垂直滚动位置
 * @param el - 目标元素，可以是 window、document 或普通元素
 * @returns 垂直滚动位置
 */
export const getScrollTop = (el: Window | Document | HTMLElement): number => {
  if (!isClient) return 0;
  if (el === window) {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
  if (el instanceof Document) {
    return document.documentElement.scrollTop;
  }
  return (el as HTMLElement).scrollTop;
};

/**
 * 设置元素的垂直滚动位置
 * @param el - 目标元素，可以是 window 或普通元素
 * @param top - 要设置的垂直滚动位置
 */
export const setScrollTop = (el: Window | HTMLElement, top: number) => {
  if (!isClient) return;
  if (el === window) {
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  } else {
    (el as HTMLElement).scrollTop = top;
  }
};

/**
 * 检查元素是否在视口内
 * @param element - 目标 DOM 元素
 * @param partiallyVisible - 是否部分可见就算作在视口内，默认为 false
 * @returns 如果在视口内则返回 true，否则返回 false
 */
export const isInView = (element: HTMLElement, partiallyVisible = false): boolean => {
  if (!isClient || !element) return false;

  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;

  if (partiallyVisible) {
    return rect.top < viewHeight && rect.bottom > 0 && rect.left < viewWidth && rect.right > 0;
  }

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= viewHeight && rect.right <= viewWidth;
};
