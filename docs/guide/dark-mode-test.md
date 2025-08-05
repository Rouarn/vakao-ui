# 深色模式测试

本页面用于测试所有组件在深色模式下的显示效果。点击右上角的主题切换按钮可以在浅色和深色模式之间切换。

<div style="position: fixed; top: 18px; right: 20px; z-index: 1000;">
  <ThemeToggle />
</div>

## 基础组件

### Button 按钮

<Demo>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; width: 100%;">
    <vk-button>默认按钮</vk-button>
    <vk-button type="primary">主要按钮</vk-button>
    <vk-button type="success">成功按钮</vk-button>
    <vk-button type="warning">警告按钮</vk-button>
    <vk-button type="danger">危险按钮</vk-button>
    <vk-button type="info">信息按钮</vk-button>
    <vk-button disabled>禁用按钮</vk-button>
  </div>
</Demo>

### Icon 图标

<Demo>
  <div style="display: flex; gap: 16px; align-items: center; width: 100%;">
    <vk-icon name="mdi:home" size="24" />
    <vk-icon name="mdi:user" size="24" color="var(--vk-color-primary)" />
    <vk-icon name="mdi:heart" size="24" color="var(--vk-color-danger)" />
    <vk-icon name="mdi:star" size="24" color="var(--vk-color-warning)" />
    <vk-icon name="mdi:check" size="24" color="var(--vk-color-success)" />
  </div>
</Demo>

## 表单组件

### Input 输入框

<Demo>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px; width: 100%;">
    <vk-input placeholder="请输入内容" />
    <vk-input placeholder="禁用状态" disabled />
    <vk-input placeholder="带图标" prefix-icon="mdi:user" />
    <vk-input placeholder="密码输入" type="password" />
  </div>
</Demo>

### Select 选择器

<Demo>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px; width: 100%;">
    <vk-select placeholder="请选择">
      <vk-option label="选项一" value="1" />
      <vk-option label="选项二" value="2" />
      <vk-option label="选项三" value="3" />
    </vk-select>
    <vk-select placeholder="禁用状态" disabled>
      <vk-option label="选项一" value="1" />
    </vk-select>
  </div>
</Demo>

### Checkbox 多选框

<Demo>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
    <vk-checkbox>默认选项</vk-checkbox>
    <vk-checkbox :checked="true">已选中</vk-checkbox>
    <vk-checkbox disabled>禁用选项</vk-checkbox>
    <vk-checkbox :checked="true" disabled>禁用已选中</vk-checkbox>
  </div>
</Demo>

### Radio 单选框

<Demo>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
    <vk-radio name="test" value="1">选项一</vk-radio>
    <vk-radio name="test" value="2" :checked="true">选项二</vk-radio>
    <vk-radio name="test" value="3" disabled>禁用选项</vk-radio>
  </div>
</Demo>

### Switch 开关

<Demo>
  <div style="display: flex; gap: 16px; align-items: center; width: 100%;">
    <vk-switch />
    <vk-switch :checked="true" />
    <vk-switch disabled />
    <vk-switch :checked="true" disabled />
  </div>
</Demo>

## 数据展示

### Card 卡片

<Demo>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; width: 100%;">
    <vk-card>
      <template #header>
        <h4 style="margin: 0;">卡片标题</h4>
      </template>
      <p style="margin: 0; color: var(--vk-text-color-regular);">这是卡片的内容区域，可以放置任何内容。</p>
    </vk-card>
    <vk-card shadow="hover">
      <template #header>
        <h4 style="margin: 0;">悬停阴影</h4>
      </template>
      <p style="margin: 0; color: var(--vk-text-color-regular);">鼠标悬停时显示阴影效果。</p>
    </vk-card>
  </div>
</Demo>

### Tag 标签

<Demo>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; width: 100%;">
    <vk-tag>默认</vk-tag>
    <vk-tag type="primary">主要</vk-tag>
    <vk-tag type="success">成功</vk-tag>
    <vk-tag type="warning">警告</vk-tag>
    <vk-tag type="danger">危险</vk-tag>
    <vk-tag type="info">信息</vk-tag>
    <vk-tag closable>可关闭</vk-tag>
  </div>
</Demo>

### Badge 徽章

<Demo>
  <div style="display: flex; gap: 24px; align-items: center; width: 100%;">
    <vk-badge value="12">
      <vk-button>消息</vk-button>
    </vk-badge>
    <vk-badge value="3" type="primary">
      <vk-button>通知</vk-button>
    </vk-badge>
    <vk-badge value="Hot" type="danger">
      <vk-button>热门</vk-button>
    </vk-badge>
    <vk-badge dot type="warning">
      <vk-button>提醒</vk-button>
    </vk-badge>
  </div>
</Demo>

### Avatar 头像

<Demo>
  <div style="display: flex; gap: 16px; align-items: center; width: 100%;">
    <vk-avatar>U</vk-avatar>
    <vk-avatar size="large">VK</vk-avatar>
    <vk-avatar size="small" shape="square">S</vk-avatar>
    <vk-avatar src="https://via.placeholder.com/40" />
  </div>
</Demo>

### Image 图片

<Demo>
  <div style="display: flex; gap: 16px; align-items: center; width: 100%;">
    <vk-image 
      src="https://via.placeholder.com/150x100" 
      alt="示例图片"
      style="width: 150px; height: 100px;"
    />
    <vk-image 
      src="invalid-url" 
      alt="加载失败"
      style="width: 150px; height: 100px;"
    />
  </div>
</Demo>

## 布局组件

### Divider 分割线

<Demo>
  <div style="width: 100%;">
    <p style="margin: 0 0 16px 0; color: var(--vk-text-color-regular);">上方内容</p>
    <vk-divider />
    <p style="margin: 16px 0; color: var(--vk-text-color-regular);">中间内容</p>
    <vk-divider>带文字的分割线</vk-divider>
    <p style="margin: 16px 0 0 0; color: var(--vk-text-color-regular);">下方内容</p>
  </div>
</Demo>

## 反馈组件

### MessageBox 消息弹框

<Demo>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; width: 100%;">
    <vk-button>消息弹框</vk-button>
    <vk-button type="primary">确认弹框</vk-button>
    <vk-button type="success">输入弹框</vk-button>
  </div>
  <p style="margin-top: 12px; color: var(--vk-text-color-secondary); font-size: 14px;">注：MessageBox 组件需要在实际应用中通过 JavaScript 调用</p>
</Demo>

## 主题变量测试

<Demo>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; width: 100%;">
    <div style="padding: 16px; border: 1px solid var(--vk-border-color); border-radius: 8px; background: var(--vk-bg-color);">
      <h4 style="margin: 0 0 8px 0; color: var(--vk-text-color-primary);">主要文本</h4>
      <p style="margin: 0; color: var(--vk-text-color-regular);">常规文本颜色</p>
      <p style="margin: 8px 0 0 0; color: var(--vk-text-color-secondary);">次要文本颜色</p>
    </div>
    <div style="padding: 16px; border: 1px solid var(--vk-border-color-light); border-radius: 8px; background: var(--vk-fill-color-light);">
      <h4 style="margin: 0 0 8px 0; color: var(--vk-text-color-primary);">填充背景</h4>
      <p style="margin: 0; color: var(--vk-text-color-placeholder);">占位符文本</p>
      <p style="margin: 8px 0 0 0; color: var(--vk-text-color-disabled);">禁用文本</p>
    </div>
  </div>
</Demo>

<style scoped>
/* 确保在深色模式下的样式正确 */
:deep(.demo-container) {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
}

:deep(.demo-header) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

:deep(.demo-content) {
  background: var(--vp-c-bg);
}
</style>
