<template>
  <div class="layout">
    <header class="layout-header">
      <div class="header-content">
        <h1 class="logo">Vakao UI</h1>
        <p class="subtitle">组件库测试用例</p>
      </div>
    </header>

    <div class="layout-body">
      <aside class="layout-sidebar">
        <nav class="nav-menu">
          <div class="nav-group">
            <h3 class="nav-title">基础组件</h3>
            <router-link to="/button" class="nav-item">Button 按钮</router-link>
            <router-link to="/icon" class="nav-item">Icon 图标</router-link>
            <router-link to="/divider" class="nav-item">Divider 分割线</router-link>
          </div>

          <div class="nav-group">
            <h3 class="nav-title">表单组件</h3>
            <router-link to="/input" class="nav-item">Input 输入框</router-link>
            <router-link to="/checkbox" class="nav-item">Checkbox 复选框</router-link>
            <router-link to="/radio" class="nav-item">Radio 单选框</router-link>
            <router-link to="/switch" class="nav-item">Switch 开关</router-link>
            <router-link to="/select" class="nav-item">Select 选择器</router-link>
          </div>

          <div class="nav-group">
            <h3 class="nav-title">数据展示</h3>
            <router-link to="/avatar" class="nav-item">Avatar 头像</router-link>
            <router-link to="/badge" class="nav-item">Badge 徽章</router-link>
            <router-link to="/card" class="nav-item">Card 卡片</router-link>
            <router-link to="/image" class="nav-item">Image 图片</router-link>
            <router-link to="/tag" class="nav-item">Tag 标签</router-link>
          </div>

          <div class="nav-group">
            <h3 class="nav-title">布局组件</h3>
            <router-link to="/space" class="nav-item">Space 间距</router-link>
          </div>

          <div class="nav-group">
            <h3 class="nav-title">反馈组件</h3>
            <router-link to="/message" class="nav-item">Message 消息</router-link>
            <router-link to="/message-box" class="nav-item">MessageBox 消息弹框</router-link>
            <router-link to="/tooltip" class="nav-item">Tooltip 文字提示</router-link>
          </div>
        </nav>
      </aside>

      <main class="layout-main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 布局组件，提供统一的页面结构和导航
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background: #f5f7fa;
}

.layout-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(45deg, #fff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin: 8px 0 0 0;
  opacity: 0.9;
  font-size: 16px;
}

.layout-body {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  position: relative;
}

.layout-sidebar {
  width: 240px;
  background: white;
  border-radius: 8px;
  margin: 20px 0 20px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 50px);
  overflow-y: auto;
  z-index: 100;
}

.nav-menu {
  padding: 20px 0;
}

.nav-group {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.nav-title {
  font-size: 14px;
  font-weight: 600;
  color: #909399;
  margin: 0 0 12px 0;
  padding: 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-item {
  display: block;
  padding: 12px 20px;
  color: #606266;
  text-decoration: none;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  font-size: 14px;
}

.nav-item:hover {
  background: #f5f7fa;
  color: #409eff;
  border-left-color: #409eff;
}

.nav-item.router-link-active {
  background: linear-gradient(90deg, rgba(64, 158, 255, 0.1), transparent);
  color: #409eff;
  border-left-color: #409eff;
  font-weight: 500;
}

.layout-main {
  flex: 1;
  padding: 20px;
  background: white;
  margin: 20px 20px 20px 10px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
