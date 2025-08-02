# DOM 操作 (DOM Utilities)

提供了一系列用于简化 DOM 操作的函数，例如样式管理、类名操作和事件处理。

## getStyle

获取 DOM 元素的最终计算样式，可以处理驼峰式和短横线式的样式名。

- **定义**: `(element: HTMLElement, styleName: string): string`
- **示例**:

  ```ts
  import { getStyle } from "vakao-ui/utils";

  const el = document.getElementById("my-element");
  // 获取字体大小
  console.log(getStyle(el, "fontSize")); // '16px'
  // 获取背景颜色
  console.log(getStyle(el, "background-color")); // 'rgb(255, 255, 255)'
  ```

## setStyle

设置 DOM 元素的样式，支持单个样式设置和对象批量设置。

- **定义**: `(element: HTMLElement, styleName: string | Record<string, string>, value?: string)`
- **示例**:

  ```ts
  import { setStyle } from "vakao-ui/utils";

  const el = document.getElementById("my-element");
  // 单个设置
  setStyle(el, "fontSize", "20px");
  // 批量设置
  setStyle(el, { color: "red", fontWeight: "bold" });
  ```

## addClass / removeClass / hasClass

方便地添加、移除和检查元素的 CSS 类。

- **addClass**: `(element: HTMLElement, className: string)`
- **removeClass**: `(element: HTMLElement, className: string)`
- **hasClass**: `(element: HTMLElement, className: string): boolean`
- **示例**:

  ```ts
  import { addClass, removeClass, hasClass } from "vakao-ui/utils";

  const el = document.getElementById("my-element");
  addClass(el, "class1 class2");
  console.log(hasClass(el, "class1")); // true
  removeClass(el, "class1");
  console.log(hasClass(el, "class1")); // false
  ```

## getScrollTop / setScrollTop

获取或设置元素（包括 `window`）的垂直滚动位置。

- **getScrollTop**: `(el: Window | Document | HTMLElement): number`
- **setScrollTop**: `(el: Window | HTMLElement, top: number)`
- **示例**:

  ```ts
  import { getScrollTop, setScrollTop } from "vakao-ui/utils";

  // 获取页面滚动高度
  const scrollTop = getScrollTop(window);
  // 滚动到页面顶部
  setScrollTop(window, 0);
  ```

## isInView

检查一个元素是否在当前浏览器视口内。

- **定义**: `(element: HTMLElement, partiallyVisible?: boolean): boolean`
- **参数**:
  - `partiallyVisible` (可选): `boolean`，如果为 `true`，则元素部分可见即返回 `true`。默认为 `false`。
- **示例**:

  ```ts
  import { isInView } from "vakao-ui/utils";

  const el = document.getElementById("my-element");
  // 检查元素是否完全在视口内
  const isFullyVisible = isInView(el);
  // 检查元素是否部分在视口内
  const isPartiallyVisible = isInView(el, true);
  ```
