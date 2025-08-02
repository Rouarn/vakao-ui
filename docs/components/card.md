# Card 卡片

卡片组件用于信息的分组展示，支持标题、内容和底部操作区域。

## 基础用法

卡片的基础用法，包含标题和内容。

<Demo>
  <vk-card title="卡片标题">
    这是卡片的内容区域，可以放置任何内容。
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card title="卡片标题"> 这是卡片的内容区域，可以放置任何内容。 </vk-card>
</template>
```

  </template>
</Demo>

## 带副标题

卡片可以同时显示标题和副标题。

<Demo>
  <vk-card title="主标题" subtitle="这是副标题">
    卡片内容区域，支持标题和副标题的组合显示。
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card title="主标题" subtitle="这是副标题"> 卡片内容区域，支持标题和副标题的组合显示。 </vk-card>
</template>
```

  </template>
</Demo>

## 阴影效果

卡片支持多种阴影效果，包括始终显示、悬停显示和从不显示。

<Demo>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="始终显示" shadow="always">
      始终显示阴影效果
    </vk-card>
    <vk-card title="悬停显示" shadow="hover">
      悬停时显示阴影效果
    </vk-card>
    <vk-card title="从不显示" shadow="never">
      从不显示阴影效果
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="始终显示" shadow="always"> 始终显示阴影效果 </vk-card>
    <vk-card title="悬停显示" shadow="hover"> 悬停时显示阴影效果 </vk-card>
    <vk-card title="从不显示" shadow="never"> 从不显示阴影效果 </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 边框样式

可以控制卡片是否显示边框。

<Demo>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="有边框" :bordered="true">
      显示边框的卡片
    </vk-card>
    <vk-card title="无边框" :bordered="false">
      不显示边框的卡片
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="有边框" :bordered="true"> 显示边框的卡片 </vk-card>
    <vk-card title="无边框" :bordered="false"> 不显示边框的卡片 </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 自定义圆角

可以自定义卡片的圆角大小。

<Demo>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="默认圆角">
      默认圆角大小
    </vk-card>
    <vk-card title="大圆角" radius="12px">
      自定义大圆角
    </vk-card>
    <vk-card title="无圆角" radius="0">
      无圆角效果
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="默认圆角"> 默认圆角大小 </vk-card>
    <vk-card title="大圆角" radius="12px"> 自定义大圆角 </vk-card>
    <vk-card title="无圆角" radius="0"> 无圆角效果 </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 自定义头部

可以通过插槽自定义卡片头部内容。

<Demo>
  <vk-card>
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: bold;">自定义头部</span>
        <vk-button size="small">操作</vk-button>
      </div>
    </template>
    这是使用自定义头部插槽的卡片内容。
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card>
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: bold;">自定义头部</span>
        <vk-button size="small">操作</vk-button>
      </div>
    </template>
    这是使用自定义头部插槽的卡片内容。
  </vk-card>
</template>
```

  </template>
</Demo>

## 底部操作区

可以通过底部插槽添加操作按钮。

<Demo>
  <vk-card title="用户信息" subtitle="管理用户账户">
    <p>用户名：张三</p>
    <p>邮箱：zhangsan@example.com</p>
    <p>角色：管理员</p>
    
    <template #footer>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <vk-button size="small">编辑</vk-button>
        <vk-button size="small" type="danger">删除</vk-button>
      </div>
    </template>
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card title="用户信息" subtitle="管理用户账户">
    <p>用户名：张三</p>
    <p>邮箱：zhangsan@example.com</p>
    <p>角色：管理员</p>

    <template #footer>
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <vk-button size="small">编辑</vk-button>
        <vk-button size="small" type="danger">删除</vk-button>
      </div>
    </template>
  </vk-card>
</template>
```

  </template>
</Demo>

## 内容区域填充

可以控制卡片内容区域是否有内边距。

<Demo>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="有填充" :body-padding="true">
      内容区域有内边距
    </vk-card>
    <vk-card title="无填充" :body-padding="false">
      内容区域无内边距
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
    <vk-card title="有填充" :body-padding="true"> 内容区域有内边距 </vk-card>
    <vk-card title="无填充" :body-padding="false"> 内容区域无内边距 </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 可点击卡片

卡片支持点击事件。

<Demo>
  <vk-card title="可点击卡片" @click="handleCardClick">
    点击这个卡片试试看！
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card title="可点击卡片" @click="handleCardClick"> 点击这个卡片试试看！ </vk-card>
</template>

<script setup>
const handleCardClick = () => {
  console.log("卡片被点击了！");
};
</script>
```

  </template>
</Demo>

## API

### Card Props

| 名称        | 类型                             | 默认值     | 说明                 |
| ----------- | -------------------------------- | ---------- | -------------------- |
| title       | `string`                         | —          | 卡片标题             |
| subtitle    | `string`                         | —          | 卡片副标题           |
| shadow      | `'always' \| 'hover' \| 'never'` | `'always'` | 阴影显示时机         |
| bordered    | `boolean`                        | `true`     | 是否显示边框         |
| radius      | `string`                         | —          | 自定义圆角大小       |
| bodyPadding | `boolean`                        | `true`     | 内容区域是否有内边距 |

### Card Events

| 事件名 | 说明           | 回调参数              |
| ------ | -------------- | --------------------- |
| click  | 点击卡片时触发 | `(event: MouseEvent)` |

### Card Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 卡片内容 |
| header  | 卡片头部 |
| footer  | 卡片底部 |

<script setup>
const handleCardClick = () => {
  console.log('卡片被点击了！');
};
</script>
