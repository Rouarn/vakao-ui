# Divider 分割线

分割线组件用于分隔内容区域，支持水平和垂直两种方向。

## 基础用法

分割线的基础用法，默认为水平分割线。

<Demo>
  <div style='width:100%;'>
    <p>这是第一段内容</p>
    <vk-divider />
    <p>这是第二段内容</p>
    <vk-divider />
    <p>这是第三段内容</p>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width:100%;">
    <p>这是第一段内容</p>
    <vk-divider />
    <p>这是第二段内容</p>
    <vk-divider />
    <p>这是第三段内容</p>
  </div>
</template>
```

  </template>
</Demo>

## 带文字的分割线

水平分割线可以包含文字内容。

<Demo>
  <div style='width:100%;'>
    <p>这是上方内容</p>
    <vk-divider>分割线文字</vk-divider>
    <p>这是下方内容</p>
    <vk-divider>更多内容</vk-divider>
    <p>这是最后的内容</p>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width:100%;">
    <p>这是上方内容</p>
    <vk-divider>分割线文字</vk-divider>
    <p>这是下方内容</p>
    <vk-divider>更多内容</vk-divider>
    <p>这是最后的内容</p>
  </div>
</template>
```

  </template>
</Demo>

## 文字位置

可以设置分割线文字的位置，支持左、中、右三种位置。

<Demo>
  <div style='width:100%;'>
    <p>左对齐文字</p>
    <vk-divider content-position="left">左侧文字</vk-divider>
    <p>居中文字</p>
    <vk-divider content-position="center">居中文字</vk-divider>
    <p>右对齐文字</p>
    <vk-divider content-position="right">右侧文字</vk-divider>
    <p>结束</p>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width:100%;">
    <p>左对齐文字</p>
    <vk-divider content-position="left">左侧文字</vk-divider>
    <p>居中文字</p>
    <vk-divider content-position="center">居中文字</vk-divider>
    <p>右对齐文字</p>
    <vk-divider content-position="right">右侧文字</vk-divider>
    <p>结束</p>
  </div>
</template>
```

  </template>
</Demo>

## 垂直分割线

设置 `direction` 为 `vertical` 可以使用垂直分割线。

<Demo>
  <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
    <span>选项一</span>
    <vk-divider direction="vertical" />
    <span>选项二</span>
    <vk-divider direction="vertical" />
    <span>选项三</span>
    <vk-divider direction="vertical" />
    <span>选项四</span>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
    <span>选项一</span>
    <vk-divider direction="vertical" />
    <span>选项二</span>
    <vk-divider direction="vertical" />
    <span>选项三</span>
    <vk-divider direction="vertical" />
    <span>选项四</span>
  </div>
</template>
```

  </template>
</Demo>

## 边框样式

可以自定义分割线的边框样式。

<Demo>
  <div style='width:100%;'>
    <p>实线分割线</p>
    <vk-divider border-style="solid">实线</vk-divider>
    <p>虚线分割线</p>
    <vk-divider border-style="dashed">虚线</vk-divider>
    <p>点线分割线</p>
    <vk-divider border-style="dotted">点线</vk-divider>
    <p>结束</p>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width:100%;">
    <p>实线分割线</p>
    <vk-divider border-style="solid">实线</vk-divider>
    <p>虚线分割线</p>
    <vk-divider border-style="dashed">虚线</vk-divider>
    <p>点线分割线</p>
    <vk-divider border-style="dotted">点线</vk-divider>
    <p>结束</p>
  </div>
</template>
```

  </template>
</Demo>

## 自定义颜色

可以自定义分割线的颜色。

<Demo>
  <div style='width:100%;'>
    <p>默认颜色</p>
    <vk-divider>默认</vk-divider>
    <p>蓝色分割线</p>
    <vk-divider border-color="#1890ff">蓝色</vk-divider>
    <p>绿色分割线</p>
    <vk-divider border-color="#52c41a">绿色</vk-divider>
    <p>红色分割线</p>
    <vk-divider border-color="#ff4d4f">红色</vk-divider>
    <p>结束</p>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width:100%;">
    <p>默认颜色</p>
    <vk-divider>默认</vk-divider>
    <p>蓝色分割线</p>
    <vk-divider border-color="#1890ff">蓝色</vk-divider>
    <p>绿色分割线</p>
    <vk-divider border-color="#52c41a">绿色</vk-divider>
    <p>红色分割线</p>
    <vk-divider border-color="#ff4d4f">红色</vk-divider>
    <p>结束</p>
  </div>
</template>
```

  </template>
</Demo>

## 组合使用

分割线的各种属性可以组合使用。

<Demo>
  <div style='width:100%;'>
    <p>组合示例</p>
    <vk-divider 
      content-position="left" 
      border-style="dashed" 
      border-color="#6554C0"
    >
      自定义样式
    </vk-divider>
    <p>中间内容</p>
    <vk-divider 
      content-position="right" 
      border-style="dotted" 
      border-color="#ff6b35"
    >
      右侧文字
    </vk-divider>
    <p>结束内容</p>
  </div>
  
  <template #code>

```vue
<template>
  <div style="width:100%;">
    <p>组合示例</p>
    <vk-divider content-position="left" border-style="dashed" border-color="#6554C0"> 自定义样式 </vk-divider>
    <p>中间内容</p>
    <vk-divider content-position="right" border-style="dotted" border-color="#ff6b35"> 右侧文字 </vk-divider>
    <p>结束内容</p>
  </div>
</template>
```

  </template>
</Demo>

## 在导航中使用

垂直分割线常用于导航菜单中。

<Demo>
  <div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; width: 100%;">
    <a href="#" style="text-decoration: none; color: #1890ff;">首页</a>
    <vk-divider direction="vertical" />
    <a href="#" style="text-decoration: none; color: #1890ff;">产品</a>
    <vk-divider direction="vertical" />
    <a href="#" style="text-decoration: none; color: #1890ff;">服务</a>
    <vk-divider direction="vertical" />
    <a href="#" style="text-decoration: none; color: #1890ff;">关于我们</a>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px; width: 100%;">
    <a href="#" style="text-decoration: none; color: #1890ff;">首页</a>
    <vk-divider direction="vertical" />
    <a href="#" style="text-decoration: none; color: #1890ff;">产品</a>
    <vk-divider direction="vertical" />
    <a href="#" style="text-decoration: none; color: #1890ff;">服务</a>
    <vk-divider direction="vertical" />
    <a href="#" style="text-decoration: none; color: #1890ff;">关于我们</a>
  </div>
</template>
```

  </template>
</Demo>

## API

### Divider Props

| 名称            | 类型                              | 默认值         | 说明                       |
| --------------- | --------------------------------- | -------------- | -------------------------- |
| direction       | `'horizontal' \| 'vertical'`      | `'horizontal'` | 分割线方向                 |
| borderStyle     | `'solid' \| 'dashed' \| 'dotted'` | `'solid'`      | 边框样式                   |
| contentPosition | `'left' \| 'center' \| 'right'`   | `'center'`     | 文字位置（仅水平方向有效） |
| borderColor     | `string`                          | —              | 边框颜色                   |

### Divider Slots

| 插槽名  | 说明                             |
| ------- | -------------------------------- |
| default | 分割线文字内容（仅水平方向有效） |
