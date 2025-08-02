# isUrl

`isUrl` 是一个用于判断字符串是否为有效的 URL 格式的工具函数，支持检测多种 URL 类型：HTTP/HTTPS、Data URL、相对路径、绝对路径。

## 基本用法

```ts
import { isUrl } from "vakao-ui/utils";

// HTTP/HTTPS URL
console.log(isUrl("https://example.com")); // true
console.log(isUrl("http://localhost:3000")); // true

// Data URL
console.log(isUrl("data:image/png;base64,abc")); // true

// 相对路径
console.log(isUrl("./assets/image.png")); // true
console.log(isUrl("../components/Button.vue")); // true

// 绝对路径
console.log(isUrl("/static/logo.svg")); // true

// 无效格式
console.log(isUrl("")); // false
console.log(isUrl("invalid-url")); // false
console.log(isUrl("ftp://example.com")); // false
```

## API

### isUrl

```ts
function isUrl(str: string): boolean;
```

#### 参数

| 参数 | 类型   | 说明           |
| ---- | ------ | -------------- |
| str  | string | 要检查的字符串 |

#### 返回值

如果是有效的 URL 格式返回 `true`，否则返回 `false`。

## 支持的 URL 格式

- **HTTP/HTTPS URL**：以 `http://` 或 `https://` 开头的 URL
- **Data URL**：以 `data:` 开头的 URL，通常用于内联图片等资源
- **相对路径**：以 `./` 或 `../` 开头的路径
- **绝对路径**：以 `/` 开头的路径

## 示例

### 在组件中使用

```vue
<template>
  <div>
    <img v-if="isValidUrl(src)" :src="src" alt="图片" />
    <span v-else>无效的图片 URL</span>
  </div>
</template>

<script setup lang="ts">
import { isUrl } from "vakao-ui/utils";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
});

const isValidUrl = (url: string) => {
  return isUrl(url);
};
</script>
```

### 处理不同类型的 URL

```ts
import { isUrl } from "vakao-ui/utils";

// 检查图片 URL
const checkImageUrl = (url: string) => {
  if (!isUrl(url)) {
    return false;
  }

  // 进一步检查是否为图片 URL
  return url.match(/\.(jpeg|jpg|gif|png|svg)$/i) !== null || url.startsWith("data:image/");
};

// 检查 API URL
const checkApiUrl = (url: string) => {
  if (!isUrl(url)) {
    return false;
  }

  // 检查是否为 API URL
  return url.includes("/api/") || url.includes("/v1/") || url.includes("/v2/");
};

// 示例
console.log(checkImageUrl("https://example.com/image.jpg")); // true
console.log(checkImageUrl("data:image/png;base64,abc")); // true
console.log(checkImageUrl("https://example.com/data.json")); // false

console.log(checkApiUrl("https://api.example.com/v1/users")); // true
console.log(checkApiUrl("https://example.com/api/products")); // true
console.log(checkApiUrl("https://example.com/about")); // false
```

### 在表单验证中使用

```ts
import { isUrl } from "vakao-ui/utils";

// 表单验证规则
const urlValidationRule = {
  validator: (rule: any, value: string) => {
    if (!value || isUrl(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("请输入有效的 URL"));
  },
};

// 使用示例
const formRules = {
  website: [{ required: true, message: "请输入网站地址" }, urlValidationRule],
  avatar: [{ required: false }, urlValidationRule],
};
```

## 注意事项

1. `isUrl` 函数主要检查 URL 的格式，不会验证 URL 是否可访问或资源是否存在
2. 对于 FTP、SFTP 等其他协议的 URL，当前实现不会返回 `true`
3. 空字符串或 `null`/`undefined` 会返回 `false`
4. 该函数使用正则表达式进行检测，性能高效
