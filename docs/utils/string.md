# 字符串操作 (String Utilities)

提供了一系列用于常见字符串格式转换和处理的函数。

## capitalize

将字符串的第一个字符转换为大写。

- **定义**: `(str: string): string`
- **示例**:

  ```ts
  import { capitalize } from "vakao-ui/utils";

  capitalize("hello"); // 'Hello'
  capitalize("WORLD"); // 'WORLD'
  ```

## camelCase

将短横线命名（kebab-case）或下划线命名（snake_case）的字符串转换为驼峰命名（camelCase）。

- **定义**: `(str: string): string`
- **示例**:

  ```ts
  import { camelCase } from "vakao-ui/utils";

  camelCase("foo-bar"); // 'fooBar'
  camelCase("foo_bar"); // 'fooBar'
  camelCase("--foo-bar--"); // 'fooBar'
  ```

## kebabCase

将驼峰命名（camelCase）的字符串转换为短横线命名（kebab-case）。

- **定义**: `(str: string): string`
- **示例**:

  ```ts
  import { kebabCase } from "vakao-ui/utils";

  kebabCase("fooBar"); // 'foo-bar'
  kebabCase("FooBar"); // 'foo-bar'
  kebabCase("__FOO_BAR__"); // '--foo-bar--'
  ```

## truncate

如果字符串超过指定长度，则截断字符串并添加指定的省略符号。

- **定义**: `(str: string, length: number, omission?: string): string`
- **参数**:
  - `length`: `number`，最大长度。
  - `omission` (可选): `string`，用于表示省略的字符串，默认为 `'...'`。
- **示例**:

  ```ts
  import { truncate } from "vakao-ui/utils";

  truncate("hello world", 5); // 'hello...'
  truncate("hello world", 5, ">>"); // 'hello>>'
  truncate("hello", 10); // 'hello'
  ```
