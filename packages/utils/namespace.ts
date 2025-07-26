/**
 * CSS 命名空间工具函数的返回类型
 * 基于 BEM (Block Element Modifier) 命名规范
 */
export interface UseNamespaceReturn {
  /** 获取块级类名 */
  block: () => string;
  /** 获取元素类名 */
  element: (_element: string) => string;
  /** 获取修饰符类名 */
  modifier: (_modifier: string, _value?: string | number | boolean) => string;
  /** 获取状态类名 */
  is: (_name: string, _state?: boolean) => string;
  /** 获取 BEM 格式的完整类名 */
  bem: (_element?: string, _modifier?: string) => string;
}

/** 默认命名空间前缀 */
const defaultNamespace = "vk";
/** 状态类名前缀 */
const statePrefix = "is-";

/**
 * 创建 CSS 命名空间工具函数
 * 基于 BEM (Block Element Modifier) 命名规范，用于生成一致的 CSS 类名
 *
 * @param block 块名称，通常是组件名称（如 'button', 'input'）
 * @param namespace 命名空间前缀，默认为 'vk'
 * @returns 命名空间工具函数集合
 *
 * @example
 * ```typescript
 * // 创建按钮组件的命名空间
 * const ns = useNamespace('button');
 *
 * // 生成类名
 * ns.block();                    // 'vk-button'
 * ns.element('icon');            // 'vk-button__icon'
 * ns.modifier('primary');        // 'vk-button--primary'
 * ns.modifier('size', 'large');  // 'vk-button--size-large'
 * ns.is('disabled');             // 'is-disabled'
 * ns.is('loading', true);        // 'is-loading'
 * ns.is('loading', false);       // ''
 * ns.bem('icon', 'primary');     // 'vk-button__icon--primary'
 * ```
 */
export const useNamespace = (
  block: string,
  namespace: string = defaultNamespace,
): UseNamespaceReturn => {
  const blockClass = `${namespace}-${block}`;

  /**
   * 获取块级类名
   * @returns 块级类名，格式：{namespace}-{block}
   */
  const block_ = () => blockClass;

  /**
   * 获取元素类名
   * @param element 元素名称
   * @returns 元素类名，格式：{namespace}-{block}__{element}
   */
  const element = (element: string) => {
    return element ? `${blockClass}__${element}` : "";
  };

  /**
   * 获取修饰符类名
   * @param modifier 修饰符名称
   * @param value 修饰符值，可以是布尔值、字符串或数字
   * @returns 修饰符类名
   * - 无值：{namespace}-{block}--{modifier}
   * - 有值：{namespace}-{block}--{modifier}-{value}
   * - 布尔值为 false：返回空字符串
   */
  const modifier = (modifier: string, value?: string | number | boolean) => {
    if (!modifier) return "";

    if (typeof value === "boolean") {
      return value ? `${blockClass}--${modifier}` : "";
    }

    if (typeof value === "string" || typeof value === "number") {
      return `${blockClass}--${modifier}-${value}`;
    }

    return `${blockClass}--${modifier}`;
  };

  /**
   * 获取状态类名
   * @param name 状态名称
   * @param state 状态值，可选的布尔值
   * @returns 状态类名，格式：is-{name}
   * - 当 state 为 false 时返回空字符串
   * - 当 state 为 true 或未提供时返回状态类名
   */
  const is = (name: string, state?: boolean) => {
    if (typeof state === "boolean") {
      return state ? `${statePrefix}${name}` : "";
    }
    return `${statePrefix}${name}`;
  };

  /**
   * 获取 BEM 格式的完整类名
   * @param element 可选的元素名称
   * @param modifier 可选的修饰符名称
   * @returns BEM 格式的类名
   * - 仅块：{namespace}-{block}
   * - 块+元素：{namespace}-{block}__{element}
   * - 块+修饰符：{namespace}-{block}--{modifier}
   * - 块+元素+修饰符：{namespace}-{block}__{element}--{modifier}
   */
  const bem = (element?: string, modifier?: string) => {
    let cls = blockClass;
    if (element) {
      cls += `__${element}`;
    }
    if (modifier) {
      cls += `--${modifier}`;
    }
    return cls;
  };

  return {
    block: block_,
    element,
    modifier,
    is,
    bem,
  };
};

/**
 * 导出默认命名空间前缀，供其他模块使用
 */
export { defaultNamespace, statePrefix };
