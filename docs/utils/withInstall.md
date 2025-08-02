# withInstall 组件安装工具

`withInstall` 是一个用于为 Vue 组件添加全局安装方法的工具函数集合。它解决了 Vue 组件库开发中的一个常见需求：让组件既可以按需引入使用，又可以通过 `app.use()` 方法进行全局注册。

## 工具介绍

该模块提供了两个主要功能：

1. **withInstall** - 为单个组件添加 `install` 方法
2. **installAll** - 批量注册多个组件

## 为什么需要这个工具？

在 Vue 3 中，组件默认不带有 `install` 方法，无法直接使用 `app.use()` 进行注册。通过 `withInstall` 工具，我们可以：

- 使组件支持 `app.use()` 全局注册方式
- 保持组件的原始功能和属性
- 简化组件库的注册流程
- 支持链式调用

## API 详解

### withInstall

为单个组件添加 `install` 方法，使其可以通过 `app.use()` 全局注册。

```ts
function withInstall<T extends Component>(component: T): WithInstall<T>;
```

#### 参数

| 参数      | 类型      | 必填 | 说明                      |
| --------- | --------- | ---- | ------------------------- |
| component | Component | 是   | 要添加安装方法的 Vue 组件 |

#### 返回值

返回添加了 `install` 方法的原始组件。

#### 工作原理

`withInstall` 函数会：

1. 接收一个 Vue 组件作为参数
2. 为该组件添加 `install` 方法
3. 在 `install` 方法中，通过组件的 `name` 属性自动注册组件
4. 返回增强后的组件

### installAll

批量注册多个组件，简化多组件注册流程。

```ts
function installAll(app: App, components: Record<string, WithInstall<Component>>): App;
```

#### 参数

| 参数       | 类型                                               | 必填 | 说明                                 |
| ---------- | -------------------------------------------------- | ---- | ------------------------------------ |
| app        | App                                                | 是   | Vue 应用实例                         |
| components | Record&lt;string, WithInstall&lt;Component&gt;&gt; | 是   | 组件集合对象，键为名称，值为组件对象 |

#### 返回值

返回 Vue 应用实例，支持链式调用。

#### 工作原理

`installAll` 函数会：

1. 接收 Vue 应用实例和组件集合对象
2. 遍历组件集合中的每个组件
3. 检查组件是否有 `install` 方法
4. 如果有，则调用 `app.use()` 注册该组件
5. 返回应用实例，支持链式调用

## 类型定义

```ts
// 为组件添加 install 方法的类型
type WithInstall<T> = T & {
  install(app: App): void;
};
```

## 使用示例

### 单个组件注册

```ts
import { createApp } from "vue";
import { withInstall } from "vakao-ui/utils";
import Button from "./Button.vue";

// 步骤 1: 为组件添加 install 方法
const VkButton = withInstall(Button);

// 步骤 2: 创建 Vue 应用
const app = createApp(App);

// 步骤 3: 使用 app.use() 全局注册组件
app.use(VkButton);

// 现在可以在任何组件中直接使用 &lt;vk-button&gt; 标签
```

### 批量注册组件

```ts
import { createApp } from "vue";
import { withInstall, installAll } from "vakao-ui/utils";
import Button from "./Button.vue";
import Input from "./Input.vue";
import Select from "./Select.vue";

// 步骤 1: 为各个组件添加 install 方法
const VkButton = withInstall(Button);
const VkInput = withInstall(Input);
const VkSelect = withInstall(Select);

// 步骤 2: 创建 Vue 应用
const app = createApp(App);

// 步骤 3: 使用 installAll 批量注册组件
installAll(app, {
  Button: VkButton,
  Input: VkInput,
  Select: VkSelect,
});

// 也可以使用链式调用
installAll(app, { Button: VkButton }).use(OtherPlugin).mount("#app");
```

### 在组件库入口文件中使用

```ts
// 组件库入口文件 index.ts
import { App } from "vue";
import { withInstall, installAll } from "./utils";

// 导入组件
import Button from "./components/Button.vue";
import Input from "./components/Input.vue";

// 添加 install 方法
export const VkButton = withInstall(Button);
export const VkInput = withInstall(Input);

// 组件集合
const components = {
  Button: VkButton,
  Input: VkInput,
};

// 默认导出，支持整体引入
export default {
  install: (app: App) => {
    installAll(app, components);
  },
};

// 支持按需引入
export { VkButton, VkInput };
```

## 注意事项

1. **组件必须有 name 属性**：`withInstall` 依赖组件的 `name` 属性进行注册，请确保组件定义了 `name` 属性
2. **类型安全**：工具函数使用 TypeScript 泛型，提供完整的类型推导和类型安全
3. **按需引入**：即使使用了 `withInstall`，组件仍然支持按需引入
4. **组件名称**：全局注册后，组件可以通过其 `name` 属性定义的名称在模板中使用

## 高级用法

### 自定义组件名称

如果需要自定义组件注册的名称，可以这样扩展 `withInstall` 函数：

```ts
const withCustomInstall = <T extends Component>(component: T, customName: string) => {
  (component as WithInstall<T>).install = (app: App) => {
    app.component(customName, component);
  };
  return component as WithInstall<T>;
};

// 使用
const VkCustomButton = withCustomInstall(Button, "vk-custom-button");
```

### 添加额外的安装逻辑

如果需要在组件安装时执行额外的逻辑，可以这样扩展：

```ts
const withExtendedInstall = <T extends Component>(component: T, callback: (app: App) => void) => {
  (component as WithInstall<T>).install = (app: App) => {
    const { name } = component;
    if (name) {
      app.component(name, component);
    }
    // 执行额外的回调函数
    callback(app);
  };
  return component as WithInstall<T>;
};
```
