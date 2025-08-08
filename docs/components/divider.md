# Divider 分割线

分割线组件用于在不同内容区域之间创建清晰的视觉分隔，支持水平和垂直两种方向，可自定义样式和文字内容。

## 基础用法

最简单的分割线用法，默认为水平方向的实线分割线。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <p style="margin: 8px 0; color: #666;">上方内容区域</p>
    <vk-divider />
    <p style="margin: 8px 0; color: #666;">中间内容区域</p>
    <vk-divider />
    <p style="margin: 8px 0; color: #666;">下方内容区域</p>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <p>上方内容区域</p>
    <vk-divider />
    <p>中间内容区域</p>
    <vk-divider />
    <p>下方内容区域</p>
  </div>
</template>
```

  </template>
</Demo>

## 带文字的分割线

在水平分割线中添加文字内容，用于更清晰地标识不同区域的用途。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <div style="padding: 12px; background: white; border-radius: 4px; margin-bottom: 8px;">
      <h4 style="margin: 0; color: #333;">用户信息</h4>
      <p style="margin: 4px 0; color: #666;">姓名、邮箱等基本信息</p>
    </div>
    <vk-divider>账户设置</vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin: 8px 0;">
      <h4 style="margin: 0; color: #333;">安全设置</h4>
      <p style="margin: 4px 0; color: #666;">密码、二次验证等安全选项</p>
    </div>
    <vk-divider>通知偏好</vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin-top: 8px;">
      <h4 style="margin: 0; color: #333;">消息通知</h4>
      <p style="margin: 4px 0; color: #666;">邮件、短信等通知设置</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="section">
      <h4>用户信息</h4>
      <p>姓名、邮箱等基本信息</p>
    </div>
    <vk-divider>账户设置</vk-divider>
    <div class="section">
      <h4>安全设置</h4>
      <p>密码、二次验证等安全选项</p>
    </div>
    <vk-divider>通知偏好</vk-divider>
    <div class="section">
      <h4>消息通知</h4>
      <p>邮件、短信等通知设置</p>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 文字位置

通过 `content-position` 属性控制分割线文字的对齐方式，支持左对齐、居中和右对齐三种位置。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <div style="padding: 12px; background: white; border-radius: 4px; margin-bottom: 8px; text-align: center;">
      <span style="color: #666;">📋 任务列表</span>
    </div>
    <vk-divider content-position="left">🔥 紧急任务</vk-divider>
    <div style="padding: 8px 12px; background: #fff2f0; border-left: 3px solid #ff4d4f; margin: 8px 0;">
      <p style="margin: 0; color: #333;">修复生产环境Bug</p>
    </div>
    <vk-divider content-position="center">📅 今日计划</vk-divider>
    <div style="padding: 8px 12px; background: #f6ffed; border-left: 3px solid #52c41a; margin: 8px 0;">
      <p style="margin: 0; color: #333;">完成功能开发</p>
    </div>
    <vk-divider content-position="right">💡 想法记录</vk-divider>
    <div style="padding: 8px 12px; background: #f0f9ff; border-left: 3px solid #1890ff; margin-top: 8px;">
      <p style="margin: 0; color: #333;">优化用户体验</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="task-header">
      <span>📋 任务列表</span>
    </div>
    <vk-divider content-position="left">🔥 紧急任务</vk-divider>
    <div class="task-item urgent">
      <p>修复生产环境Bug</p>
    </div>
    <vk-divider content-position="center">📅 今日计划</vk-divider>
    <div class="task-item normal">
      <p>完成功能开发</p>
    </div>
    <vk-divider content-position="right">💡 想法记录</vk-divider>
    <div class="task-item idea">
      <p>优化用户体验</p>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 垂直分割线

设置 `direction="vertical"` 创建垂直分割线，常用于导航菜单、工具栏等水平布局中的元素分隔。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <!-- 导航菜单示例 -->
    <div style="display: flex; align-items: center; gap: 16px; padding: 12px; background: white; border-radius: 6px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <a href="#" style="text-decoration: none; color: #1890ff; font-weight: 500;">🏠 首页</a>
      <vk-divider direction="vertical" />
      <a href="#" style="text-decoration: none; color: #666;">📦 产品</a>
      <vk-divider direction="vertical" />
      <a href="#" style="text-decoration: none; color: #666;">🛠️ 服务</a>
      <vk-divider direction="vertical" />
      <a href="#" style="text-decoration: none; color: #666;">📞 联系我们</a>
    </div>
    <!-- 操作按钮示例 -->
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <button style="border: none; background: none; color: #1890ff; cursor: pointer; padding: 4px 8px;">✏️ 编辑</button>
      <vk-divider direction="vertical" />
      <button style="border: none; background: none; color: #52c41a; cursor: pointer; padding: 4px 8px;">👁️ 查看</button>
      <vk-divider direction="vertical" />
      <button style="border: none; background: none; color: #faad14; cursor: pointer; padding: 4px 8px;">📋 复制</button>
      <vk-divider direction="vertical" />
      <button style="border: none; background: none; color: #ff4d4f; cursor: pointer; padding: 4px 8px;">🗑️ 删除</button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 导航菜单 -->
    <nav class="nav-menu">
      <a href="#" class="nav-link active">首页</a>
      <vk-divider direction="vertical" />
      <a href="#" class="nav-link">产品</a>
      <vk-divider direction="vertical" />
      <a href="#" class="nav-link">服务</a>
      <vk-divider direction="vertical" />
      <a href="#" class="nav-link">联系我们</a>
    </nav>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="action-btn">编辑</button>
      <vk-divider direction="vertical" />
      <button class="action-btn">查看</button>
      <vk-divider direction="vertical" />
      <button class="action-btn">复制</button>
      <vk-divider direction="vertical" />
      <button class="action-btn">删除</button>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 边框样式

通过 `border-style` 属性自定义分割线的样式，支持实线、虚线和点线三种样式，适用于不同的设计需求。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <div style="padding: 12px; background: white; border-radius: 4px; margin-bottom: 8px;">
      <h4 style="margin: 0 0 8px 0; color: #333;">📄 正式文档</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">使用实线分割线表示正式的内容分隔</p>
    </div>
    <vk-divider border-style="solid">实线分割线</vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin: 8px 0;">
      <h4 style="margin: 0 0 8px 0; color: #333;">📝 草稿内容</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">使用虚线分割线表示临时或草稿状态</p>
    </div>
    <vk-divider border-style="dashed">虚线分割线</vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin: 8px 0;">
      <h4 style="margin: 0 0 8px 0; color: #333;">💡 提示信息</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">使用点线分割线表示轻量级的内容分隔</p>
    </div>
    <vk-divider border-style="dotted">点线分割线</vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin-top: 8px;">
      <p style="margin: 0; color: #999; font-size: 14px; text-align: center;">不同样式适用于不同的内容层级和重要程度</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="content-section">
      <h4>正式文档</h4>
      <p>使用实线分割线表示正式的内容分隔</p>
    </div>
    <vk-divider border-style="solid">实线分割线</vk-divider>

    <div class="content-section">
      <h4>草稿内容</h4>
      <p>使用虚线分割线表示临时或草稿状态</p>
    </div>
    <vk-divider border-style="dashed">虚线分割线</vk-divider>

    <div class="content-section">
      <h4>提示信息</h4>
      <p>使用点线分割线表示轻量级的内容分隔</p>
    </div>
    <vk-divider border-style="dotted">点线分割线</vk-divider>
  </div>
</template>
```

  </template>
</Demo>

## 自定义颜色

使用 `border-color` 属性自定义分割线颜色，可以根据不同的内容主题或状态使用相应的颜色。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <div style="padding: 12px; background: white; border-radius: 4px; margin-bottom: 8px;">
      <h4 style="margin: 0 0 8px 0; color: #333;">🎨 设计系统</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">使用品牌色彩增强视觉层次</p>
    </div>
    <vk-divider>默认颜色</vk-divider>
    <div style="padding: 12px; background: #f0f9ff; border-radius: 4px; margin: 8px 0;">
      <h4 style="margin: 0 0 8px 0; color: #1890ff;">💼 商务信息</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">专业、可信赖的蓝色主题</p>
    </div>
    <vk-divider border-color="#1890ff">品牌蓝</vk-divider>
    <div style="padding: 12px; background: #f6ffed; border-radius: 4px; margin: 8px 0;">
      <h4 style="margin: 0 0 8px 0; color: #52c41a;">✅ 成功状态</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">表示成功、完成或正确的绿色</p>
    </div>
    <vk-divider border-color="#52c41a">成功绿</vk-divider>
    <div style="padding: 12px; background: #fff2f0; border-radius: 4px; margin: 8px 0;">
      <h4 style="margin: 0 0 8px 0; color: #ff4d4f;">⚠️ 警告提示</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">用于错误、警告或重要提醒</p>
    </div>
    <vk-divider border-color="#ff4d4f">警告红</vk-divider>
    <div style="padding: 12px; background: #fffbe6; border-radius: 4px; margin: 8px 0;">
      <h4 style="margin: 0 0 8px 0; color: #faad14;">💡 注意事项</h4>
      <p style="margin: 0; color: #666; font-size: 14px;">提醒用户注意的黄色主题</p>
    </div>
    <vk-divider border-color="#faad14">提醒黄</vk-divider>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <div class="section-default">
      <h4>设计系统</h4>
      <p>使用品牌色彩增强视觉层次</p>
    </div>
    <vk-divider>默认颜色</vk-divider>

    <div class="section-primary">
      <h4>商务信息</h4>
      <p>专业、可信赖的蓝色主题</p>
    </div>
    <vk-divider border-color="#1890ff">品牌蓝</vk-divider>

    <div class="section-success">
      <h4>成功状态</h4>
      <p>表示成功、完成或正确的绿色</p>
    </div>
    <vk-divider border-color="#52c41a">成功绿</vk-divider>

    <div class="section-danger">
      <h4>警告提示</h4>
      <p>用于错误、警告或重要提醒</p>
    </div>
    <vk-divider border-color="#ff4d4f">警告红</vk-divider>

    <div class="section-warning">
      <h4>注意事项</h4>
      <p>提醒用户注意的黄色主题</p>
    </div>
    <vk-divider border-color="#faad14">提醒黄</vk-divider>
  </div>
</template>
```

  </template>
</Demo>

## 组合使用

分割线的各种属性可以灵活组合，创造出符合特定设计需求的分割效果。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <!-- 创意工作流示例 -->
    <div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; margin-bottom: 12px;">
      <h3 style="margin: 0 0 8px 0;">🎨 创意工作流</h3>
      <p style="margin: 0; opacity: 0.9;">展示不同阶段的创意过程</p>
    </div>
    <vk-divider 
      content-position="left" 
      border-style="dashed" 
      border-color="#667eea"
    >
      💡 灵感收集
    </vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin: 8px 0; border-left: 3px solid #667eea;">
      <p style="margin: 0; color: #666;">收集和整理创意想法，建立灵感库</p>
    </div>
    <vk-divider 
      content-position="center" 
      border-style="solid" 
      border-color="#52c41a"
    >
      🛠️ 设计开发
    </vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin: 8px 0; border-left: 3px solid #52c41a;">
      <p style="margin: 0; color: #666;">将想法转化为具体的设计方案</p>
    </div>
    <vk-divider 
      content-position="right" 
      border-style="dotted" 
      border-color="#faad14"
    >
      🚀 发布上线
    </vk-divider>
    <div style="padding: 12px; background: white; border-radius: 4px; margin-top: 8px; border-left: 3px solid #faad14;">
      <p style="margin: 0; color: #666;">完成测试并正式发布产品</p>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div class="workflow-container">
    <div class="workflow-header">
      <h3>创意工作流</h3>
      <p>展示不同阶段的创意过程</p>
    </div>

    <vk-divider content-position="left" border-style="dashed" border-color="#667eea"> 💡 灵感收集 </vk-divider>
    <div class="workflow-step">
      <p>收集和整理创意想法，建立灵感库</p>
    </div>

    <vk-divider content-position="center" border-style="solid" border-color="#52c41a"> 🛠️ 设计开发 </vk-divider>
    <div class="workflow-step">
      <p>将想法转化为具体的设计方案</p>
    </div>

    <vk-divider content-position="right" border-style="dotted" border-color="#faad14"> 🚀 发布上线 </vk-divider>
    <div class="workflow-step">
      <p>完成测试并正式发布产品</p>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 实际应用场景

分割线在实际项目中的常见应用场景展示。

<Demo>
  <div style="width: 100%; padding: 16px; background: #fafafa; border-radius: 8px;">
    <!-- 面包屑导航 -->
    <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: white; border-radius: 6px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <span style="color: #1890ff; cursor: pointer;">🏠 首页</span>
      <vk-divider direction="vertical" border-color="#d9d9d9" />
      <span style="color: #1890ff; cursor: pointer;">📦 产品中心</span>
      <vk-divider direction="vertical" border-color="#d9d9d9" />
      <span style="color: #1890ff; cursor: pointer;">💻 软件开发</span>
      <vk-divider direction="vertical" border-color="#d9d9d9" />
      <span style="color: #666;">UI组件库</span>
    </div>
    <!-- 用户信息卡片 -->
    <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <div style="width: 60px; height: 60px; background: linear-gradient(45deg, #1890ff, #52c41a); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">👤</div>
        <div>
          <h3 style="margin: 0 0 4px 0; color: #333;">张三</h3>
          <p style="margin: 0; color: #666;">高级前端工程师</p>
        </div>
      </div>
      <vk-divider content-position="left" border-color="#1890ff">📧 联系方式</vk-divider>
      <div style="margin: 12px 0;">
        <p style="margin: 4px 0; color: #666;">📧 zhangsan@example.com</p>
        <p style="margin: 4px 0; color: #666;">📱 +86 138 0013 8000</p>
      </div>
      <vk-divider content-position="left" border-color="#52c41a">🏢 工作信息</vk-divider>
      <div style="margin: 12px 0;">
        <p style="margin: 4px 0; color: #666;">🏢 阿里巴巴集团</p>
        <p style="margin: 4px 0; color: #666;">📍 杭州市余杭区</p>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 面包屑导航 -->
    <nav class="breadcrumb">
      <span class="breadcrumb-item">首页</span>
      <vk-divider direction="vertical" />
      <span class="breadcrumb-item">产品中心</span>
      <vk-divider direction="vertical" />
      <span class="breadcrumb-item">软件开发</span>
      <vk-divider direction="vertical" />
      <span class="breadcrumb-current">UI组件库</span>
    </nav>

    <!-- 用户信息卡片 -->
    <div class="user-card">
      <div class="user-header">
        <div class="user-avatar">👤</div>
        <div class="user-info">
          <h3>张三</h3>
          <p>高级前端工程师</p>
        </div>
      </div>

      <vk-divider content-position="left" border-color="#1890ff"> 📧 联系方式 </vk-divider>
      <div class="contact-info">
        <p>📧 zhangsan@example.com</p>
        <p>📱 +86 138 0013 8000</p>
      </div>

      <vk-divider content-position="left" border-color="#52c41a"> 🏢 工作信息 </vk-divider>
      <div class="work-info">
        <p>🏢 阿里巴巴集团</p>
        <p>📍 杭州市余杭区</p>
      </div>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## API

### Divider Props

| 属性名           | 类型     | 默认值         | 说明                       | 可选值                        |
| ---------------- | -------- | -------------- | -------------------------- | ----------------------------- |
| direction        | `string` | `'horizontal'` | 分割线方向                 | `horizontal` / `vertical`     |
| border-style     | `string` | `'solid'`      | 边框样式                   | `solid` / `dashed` / `dotted` |
| content-position | `string` | `'center'`     | 文字位置（仅水平方向有效） | `left` / `center` / `right`   |
| border-color     | `string` | —              | 自定义边框颜色             | 任意有效的CSS颜色值           |

### Divider Slots

| 插槽名  | 说明                             | 参数 |
| ------- | -------------------------------- | ---- |
| default | 分割线文字内容（仅水平方向有效） | —    |

### 使用示例

```vue
<!-- 基础用法 -->
<vk-divider />

<!-- 带文字的水平分割线 -->
<vk-divider>分割线文字</vk-divider>

<!-- 垂直分割线 -->
<vk-divider direction="vertical" />

<!-- 自定义样式 -->
<vk-divider content-position="left" border-style="dashed" border-color="#1890ff">
  自定义分割线
</vk-divider>
```

### 设计指南

#### 何时使用

- 对不同章节的文本段落进行分割
- 对行内文字/链接进行分割，例如表格的操作列
- 对不同区块的内容进行分割

#### 使用建议

- **水平分割线**：用于分隔不同的内容区域，可以添加文字说明
- **垂直分割线**：用于分隔水平排列的元素，如导航菜单、操作按钮等
- **样式选择**：实线用于正式分隔，虚线用于临时或草稿状态，点线用于轻量级分隔
- **颜色使用**：可以根据内容主题或状态使用相应的颜色，增强视觉层次

#### 无障碍性

- 分割线具有适当的语义化标记
- 支持屏幕阅读器识别
- 颜色对比度符合WCAG标准

### 样式变量

组件提供了以下 CSS 变量用于自定义样式：

| 变量名                    | 默认值                         | 说明               |
| ------------------------- | ------------------------------ | ------------------ |
| --vk-divider-margin       | `16px 0`                       | 水平分割线的外边距 |
| --vk-divider-text-padding | `0 16px`                       | 分割线文字的内边距 |
| --vk-divider-border-color | `var(--vk-border-color)`       | 分割线的颜色       |
| --vk-divider-text-color   | `var(--vk-text-color-regular)` | 分割线文字的颜色   |
