# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

包含标题、内容和操作。

<Demo>
  <vk-card header="卡片标题" style="width: 100%;">
    <p>这是一个基础的卡片组件，包含标题和内容。</p>
    <p>卡片可以承载文字、列表、图片、段落等各种类型的内容。</p>
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card header="卡片标题" style="width: 100%;">
    <p>这是一个基础的卡片组件，包含标题和内容。</p>
    <p>卡片可以承载文字、列表、图片、段落等各种类型的内容。</p>
  </vk-card>
</template>
```

  </template>
</Demo>

## 简单卡片

卡片可以只有内容区域。

<Demo>
  <vk-card style="width: 100%;">
    <p>这是一个简单的卡片，只包含内容区域。</p>
    <p>适用于展示简单的信息内容。</p>
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card style="width: 100%;">
    <p>这是一个简单的卡片，只包含内容区域。</p>
    <p>适用于展示简单的信息内容。</p>
  </vk-card>
</template>
```

  </template>
</Demo>

## 带操作区域的卡片

卡片可以配置操作区域。

<Demo>
  <vk-card header="用户信息" style="width: 100%;">
    <p><strong>姓名：</strong>张三</p>
    <p><strong>邮箱：</strong>zhangsan@example.com</p>
    <p><strong>部门：</strong>技术部</p>
    <template #footer>
      <vk-button type="primary">编辑</vk-button>
      <vk-button>删除</vk-button>
    </template>
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card header="用户信息" style="width: 100%;">
    <p><strong>姓名：</strong>张三</p>
    <p><strong>邮箱：</strong>zhangsan@example.com</p>
    <p><strong>部门：</strong>技术部</p>
    <template #footer>
      <vk-button type="primary">编辑</vk-button>
      <vk-button>删除</vk-button>
    </template>
  </vk-card>
</template>
```

  </template>
</Demo>

## 自定义标题

使用具名插槽自定义卡片标题。

<Demo>
  <vk-card style="width: 100%;">
    <template #header>
        <span style="font-weight: 600; color: #1890ff;">📊 数据统计</span>
        <vk-badge :value="5" type="danger">
          <vk-button size="small" type="primary">查看详情</vk-button>
        </vk-badge>
    </template>
    <p>今日访问量：<strong>1,234</strong></p>
    <p>新增用户：<strong>56</strong></p>
    <p>活跃用户：<strong>789</strong></p>
  </vk-card>
  
  <template #code>

```vue
<template>
  <vk-card style="width: 100%;">
    <template #header>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-weight: 600; color: #1890ff;">📊 数据统计</span>
        <vk-badge :value="5" type="danger">
          <vk-button size="small" type="primary">查看详情</vk-button>
        </vk-badge>
      </div>
    </template>
    <p>今日访问量：<strong>1,234</strong></p>
    <p>新增用户：<strong>56</strong></p>
    <p>活跃用户：<strong>789</strong></p>
  </vk-card>
</template>
```

  </template>
</Demo>

## 不同尺寸

Card 组件提供四种尺寸，可以在不同场景下选择合适的卡片尺寸。

<Demo>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <vk-card header="超小卡片" size="tiny">
      <p>这是一个超小尺寸的卡片。</p>
    </vk-card>
    <vk-card header="小型卡片" size="small">
      <p>这是一个小尺寸的卡片。</p>
    </vk-card>
    <vk-card header="中等卡片" size="medium">
      <p>这是一个中等尺寸的卡片（默认）。</p>
    </vk-card>
    <vk-card header="大型卡片" size="large">
      <p>这是一个大尺寸的卡片。</p>
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <vk-card header="超小卡片" size="tiny">
      <p>这是一个超小尺寸的卡片。</p>
    </vk-card>

    <vk-card header="小型卡片" size="small">
      <p>这是一个小尺寸的卡片。</p>
    </vk-card>

    <vk-card header="中等卡片" size="medium">
      <p>这是一个中等尺寸的卡片（默认）。</p>
    </vk-card>

    <vk-card header="大型卡片" size="large">
      <p>这是一个大尺寸的卡片。</p>
    </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 阴影效果

可以设置卡片的阴影显示时机。

<Demo>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <vk-card header="总是显示阴影" shadow="always">
      <p>这个卡片总是显示阴影效果。</p>
    </vk-card>
    <vk-card header="悬停显示阴影" shadow="hover">
      <p>这个卡片在悬停时显示阴影效果。</p>
    </vk-card>
    <vk-card header="从不显示阴影" shadow="never">
      <p>这个卡片从不显示阴影效果。</p>
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <vk-card header="总是显示阴影" shadow="always">
      <p>这个卡片总是显示阴影效果。</p>
    </vk-card>

    <vk-card header="悬停显示阴影" shadow="hover">
      <p>这个卡片在悬停时显示阴影效果。</p>
    </vk-card>

    <vk-card header="从不显示阴影" shadow="never">
      <p>这个卡片从不显示阴影效果。</p>
    </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 可悬停卡片

设置 `hoverable` 属性使卡片可悬停，悬停时会有轻微的上移效果。

<Demo>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; width: 100%;">
    <vk-card header="产品 A" hoverable shadow="hover" @click="() => alert('点击了产品 A')">
      <p>这是产品 A 的详细描述信息。</p>
      <p><strong>价格：</strong>¥299</p>
    </vk-card>
    <vk-card header="产品 B" hoverable shadow="hover" @click="() => alert('点击了产品 B')">
      <p>这是产品 B 的详细描述信息。</p>
      <p><strong>价格：</strong>¥399</p>
    </vk-card>
    <vk-card header="产品 C" hoverable shadow="hover" @click="() => alert('点击了产品 C')">
      <p>这是产品 C 的详细描述信息。</p>
      <p><strong>价格：</strong>¥499</p>
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; width: 100%;">
    <vk-card header="产品 A" hoverable shadow="hover" @click="handleClick('产品 A')">
      <p>这是产品 A 的详细描述信息。</p>
      <p><strong>价格：</strong>¥299</p>
    </vk-card>

    <vk-card header="产品 B" hoverable shadow="hover" @click="handleClick('产品 B')">
      <p>这是产品 B 的详细描述信息。</p>
      <p><strong>价格：</strong>¥399</p>
    </vk-card>

    <vk-card header="产品 C" hoverable shadow="hover" @click="handleClick('产品 C')">
      <p>这是产品 C 的详细描述信息。</p>
      <p><strong>价格：</strong>¥499</p>
    </vk-card>
  </div>
</template>

<script setup>
const handleClick = (product) => {
  alert(`点击了${product}`);
};
</script>
```

  </template>
</Demo>

## 自定义内边距

可以自定义卡片主体的内边距。

<Demo>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <vk-card header="默认内边距">
      <p>这个卡片使用默认的内边距。</p>
    </vk-card>
    <vk-card header="自定义内边距" :body-padding="32">
      <p>这个卡片使用 32px 的内边距。</p>
    </vk-card>
    <vk-card header="字符串内边距" body-padding="8px 16px">
      <p>这个卡片使用 8px 16px 的内边距。</p>
    </vk-card>
    <vk-card header="无内边距" :body-padding="0">
      <div style="background: #f5f5f5; padding: 16px; margin: -1px;">
        <p style="margin: 0;">这个卡片主体没有内边距，内容区域有自定义背景。</p>
      </div>
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <vk-card header="默认内边距">
      <p>这个卡片使用默认的内边距。</p>
    </vk-card>

    <vk-card header="自定义内边距" :body-padding="32">
      <p>这个卡片使用 32px 的内边距。</p>
    </vk-card>

    <vk-card header="字符串内边距" body-padding="8px 16px">
      <p>这个卡片使用 8px 16px 的内边距。</p>
    </vk-card>

    <vk-card header="无内边距" :body-padding="0">
      <div style="background: #f5f5f5; padding: 16px; margin: -1px;">
        <p style="margin: 0;">这个卡片主体没有内边距，内容区域有自定义背景。</p>
      </div>
    </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 无边框卡片

设置 `:border="false"` 可以移除卡片边框。

<Demo>
  <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; width: 100%;">
    <vk-card header="无边框卡片" :border="false" shadow="never">
      <p>这个卡片没有边框，适合在有背景的容器中使用。</p>
      <p>通常与阴影效果配合使用来区分层次。</p>
      <template #footer>
        <vk-button type="primary">确认</vk-button>
        <vk-button>取消</vk-button>
      </template>
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; width: 100%;">
    <vk-card header="无边框卡片" :border="false" shadow="never">
      <p>这个卡片没有边框，适合在有背景的容器中使用。</p>
      <p>通常与阴影效果配合使用来区分层次。</p>
      <template #footer>
        <vk-button type="primary">确认</vk-button>
        <vk-button>取消</vk-button>
      </template>
    </vk-card>
  </div>
</template>
```

  </template>
</Demo>

## 卡片网格

使用 CSS Grid 布局展示多个卡片。

<Demo>
  <div class="vk-card-grid" style="width: 100%;">
    <vk-card header="📈 销售数据" hoverable shadow="hover">
      <p>本月销售额：<strong>¥125,000</strong></p>
      <p>环比增长：<strong style="color: #52c41a;">+12.5%</strong></p>
      <template #footer>
        <vk-button size="small" type="primary">查看详情</vk-button>
      </template>
    </vk-card>
    <vk-card header="👥 用户统计" hoverable shadow="hover">
      <p>活跃用户：<strong>8,456</strong></p>
      <p>新增用户：<strong style="color: #1890ff;">+234</strong></p>
      <template #footer>
        <vk-button size="small" type="primary">查看详情</vk-button>
      </template>
    </vk-card>
    <vk-card header="📦 订单管理" hoverable shadow="hover">
      <p>待处理订单：<strong>23</strong></p>
      <p>今日完成：<strong style="color: #52c41a;">156</strong></p>
      <template #footer>
        <vk-button size="small" type="primary">查看详情</vk-button>
      </template>
    </vk-card>
    <vk-card header="⚠️ 系统警告" hoverable shadow="hover">
      <p>磁盘使用率：<strong style="color: #ff4d4f;">85%</strong></p>
      <p>内存使用率：<strong style="color: #faad14;">72%</strong></p>
      <template #footer>
        <vk-button size="small" type="danger">立即处理</vk-button>
      </template>
    </vk-card>
  </div>
  
  <template #code>

```vue
<template>
  <div class="vk-card-grid">
    <vk-card header="📈 销售数据" hoverable shadow="hover">
      <p>本月销售额：<strong>¥125,000</strong></p>
      <p>环比增长：<strong style="color: #52c41a;">+12.5%</strong></p>
      <template #footer>
        <vk-button size="small" type="primary">查看详情</vk-button>
      </template>
    </vk-card>

    <vk-card header="👥 用户统计" hoverable shadow="hover">
      <p>活跃用户：<strong>8,456</strong></p>
      <p>新增用户：<strong style="color: #1890ff;">+234</strong></p>
      <template #footer>
        <vk-button size="small" type="primary">查看详情</vk-button>
      </template>
    </vk-card>

    <vk-card header="📦 订单管理" hoverable shadow="hover">
      <p>待处理订单：<strong>23</strong></p>
      <p>今日完成：<strong style="color: #52c41a;">156</strong></p>
      <template #footer>
        <vk-button size="small" type="primary">查看详情</vk-button>
      </template>
    </vk-card>

    <vk-card header="⚠️ 系统警告" hoverable shadow="hover">
      <p>磁盘使用率：<strong style="color: #ff4d4f;">85%</strong></p>
      <p>内存使用率：<strong style="color: #faad14;">72%</strong></p>
      <template #footer>
        <vk-button size="small" type="danger">立即处理</vk-button>
      </template>
    </vk-card>
  </div>
</template>

<style>
.vk-card-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  width: 100%;
}

@media (max-width: 768px) {
  .vk-card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

  </template>
</Demo>

## API

### Card Props

| 名称        | 类型                                       | 默认值     | 说明           |
| ----------- | ------------------------------------------ | ---------- | -------------- |
| header      | `string`                                   | —          | 卡片标题       |
| size        | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | 卡片尺寸       |
| shadow      | `'always' \| 'hover' \| 'never'`           | `'always'` | 阴影显示时机   |
| bodyPadding | `number \| string`                         | —          | 卡片主体内边距 |
| border      | `boolean`                                  | `true`     | 是否显示边框   |
| hoverable   | `boolean`                                  | `false`    | 是否可悬停     |
| customClass | `string`                                   | —          | 自定义类名     |
| customStyle | `string \| object`                         | —          | 自定义样式     |

### Card Events

| 名称  | 参数                          | 说明         |
| ----- | ----------------------------- | ------------ |
| click | `(event: MouseEvent) => void` | 卡片点击事件 |

### Card Slots

| 名称    | 说明                             |
| ------- | -------------------------------- |
| default | 卡片主体内容                     |
| header  | 卡片标题内容，会覆盖 header 属性 |
| footer  | 卡片底部内容，通常放置操作按钮   |

## 设计指南

### 何时使用

- 需要将相关信息组织在一起展示时
- 作为其他组件的容器使用
- 需要突出显示某块内容时
- 构建仪表板或数据展示界面时

### 最佳实践

1. **内容组织**：将相关的信息放在同一张卡片中，保持内容的逻辑性
2. **操作按钮**：将主要操作放在卡片底部，次要操作可以放在标题区域
3. **响应式设计**：在移动端使用单列布局，桌面端可以使用网格布局
4. **视觉层次**：使用不同的阴影效果来区分卡片的重要性
5. **交互反馈**：对于可点击的卡片，使用 `hoverable` 属性提供视觉反馈

### 无障碍性

- 卡片支持键盘导航和屏幕阅读器
- 使用语义化的 HTML 结构
- 为交互元素提供适当的焦点样式
- 支持高对比度模式和减少动画模式
