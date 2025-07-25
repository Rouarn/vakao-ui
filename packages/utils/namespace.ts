// CSS 命名空间工具函数
export interface UseNamespaceReturn {
  block: () => string;
  element: (element: string) => string;
  modifier: (modifier: string, value?: string | number | boolean) => string;
  is: (name: string, state?: boolean) => string;
  bem: (element?: string, modifier?: string) => string;
}

// 默认命名空间前缀
const defaultNamespace = "vk";
const statePrefix = "is-";

/**
 * 创建 CSS 命名空间工具函数
 * @param block 块名称
 * @param namespace 命名空间前缀，默认为 'vk'
 * @returns 命名空间工具函数集合
 */
export const useNamespace = (
  block: string,
  namespace: string = defaultNamespace,
): UseNamespaceReturn => {
  const blockClass = `${namespace}-${block}`;

  const block_ = () => blockClass;

  const element = (element: string) => {
    return element ? `${blockClass}__${element}` : "";
  };

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

  const is = (name: string, state?: boolean) => {
    if (typeof state === "boolean") {
      return state ? `${statePrefix}${name}` : "";
    }
    return `${statePrefix}${name}`;
  };

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

// 类型已在上面导出，无需重复导出
