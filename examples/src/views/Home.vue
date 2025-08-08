<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="hero-title">Vakao UI 组件库</h1>
      <p class="hero-description">
        一套基于 Vue 3 + TypeScript 的现代化组件库，提供丰富的组件和工具函数， 帮助开发者快速构建美观、易用的用户界面。
      </p>

      <div class="stats">
        <div class="stat-item">
          <div class="stat-number">15+</div>
          <div class="stat-label">组件</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">20+</div>
          <div class="stat-label">Hooks</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-label">TypeScript</div>
        </div>
      </div>
    </div>

    <div class="features-section">
      <h2 class="section-title">特性</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3 class="feature-title">现代设计</h3>
          <p class="feature-description">精心设计的组件，遵循现代 UI 设计规范</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3 class="feature-title">高性能</h3>
          <p class="feature-description">基于 Vue 3 Composition API，性能优异</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔧</div>
          <h3 class="feature-title">易于使用</h3>
          <p class="feature-description">简洁的 API 设计，支持按需导入</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3 class="feature-title">响应式</h3>
          <p class="feature-description">完美适配各种屏幕尺寸</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🛠️</div>
          <h3 class="feature-title">TypeScript</h3>
          <p class="feature-description">完整的类型定义，开发体验更佳</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">可定制</h3>
          <p class="feature-description">支持主题定制和样式覆盖</p>
        </div>
      </div>
    </div>

    <div class="quick-start-section">
      <h2 class="section-title">快速开始</h2>
      <div class="code-example">
        <h3>安装</h3>
        <pre><code>npm install @vakao-ui/components</code></pre>

        <h3>使用</h3>
        <pre><code>import { createApp } from 'vue'
import VakaoUI from '@vakao-ui/components'
import '@vakao-ui/components/dist/index.css'

const app = createApp(App)
app.use(VakaoUI)
app.mount('#app')</code></pre>
      </div>
    </div>

    <div class="navigation-section">
      <h2 class="section-title">组件导航</h2>
      <p class="section-description">点击左侧导航栏查看各个组件的详细示例和用法</p>

      <div class="component-grid">
        <router-link to="/button" class="component-card">
          <h4>Button 按钮</h4>
          <p>基础的按钮组件，支持多种样式和状态</p>
        </router-link>

        <router-link to="/input" class="component-card">
          <h4>Input 输入框</h4>
          <p>文本输入组件，支持多种输入类型</p>
        </router-link>

        <router-link to="/card" class="component-card">
          <h4>Card 卡片</h4>
          <p>通用卡片容器，用于内容分组展示</p>
        </router-link>

        <router-link to="/avatar" class="component-card">
          <h4>Avatar 头像</h4>
          <p>用户头像展示组件，支持图片和文字</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 首页组件，展示组件库概览
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
}

.hero-section {
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin: -20px -20px 40px -20px;
  border-radius: 0 0 16px 16px;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  margin: 0 0 20px 0;
  background: linear-gradient(45deg, #fff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin: 0 auto 40px auto;
  max-width: 600px;
  opacity: 0.9;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.features-section,
.quick-start-section,
.navigation-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  margin: 0 0 20px 0;
  color: #2c3e50;
  text-align: center;
}

.section-description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #2c3e50;
}

.feature-description {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.code-example {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  margin-top: 20px;
}

.code-example h3 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 18px;
}

.code-example h3:not(:first-child) {
  margin-top: 24px;
}

.code-example pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 14px;
  line-height: 1.5;
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.component-card {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.component-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-color: #409eff;
}

.component-card h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
}

.component-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .stats {
    gap: 30px;
  }

  .stat-number {
    font-size: 28px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .component-grid {
    grid-template-columns: 1fr;
  }
}
</style>
