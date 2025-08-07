<template>
  <div class="divider-demo">
    <div class="demo-header">
      <h1>Divider 分割线</h1>
      <p>区隔内容的分割线，可以是水平的，也可以是垂直的。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>默认为水平分割线，可在中间加入文字。</p>
      <div class="demo-block">
        <div class="content-block">
          <p>这是第一段内容，用于演示分割线的基础用法。</p>
          <VkDivider />
          <p>这是第二段内容，分割线将内容进行了分隔。</p>
        </div>
      </div>
    </div>

    <!-- 带文字的分割线 -->
    <div class="demo-section">
      <h2>带文字的分割线</h2>
      <p>可以在分割线中间插入文字。</p>
      <div class="demo-block">
        <div class="content-block">
          <p>这是上方的内容区域。</p>
          <VkDivider>分割线文字</VkDivider>
          <p>这是下方的内容区域。</p>
        </div>
      </div>
    </div>

    <!-- 文字位置 -->
    <div class="demo-section">
      <h2>文字位置</h2>
      <p>使用 <code>content-position</code> 属性设置文字位置。</p>
      <div class="demo-block">
        <div class="content-block">
          <p>左对齐文字</p>
          <VkDivider content-position="left">左侧文字</VkDivider>
          <p>居中文字（默认）</p>
          <VkDivider content-position="center">居中文字</VkDivider>
          <p>右对齐文字</p>
          <VkDivider content-position="right">右侧文字</VkDivider>
          <p>结束内容</p>
        </div>
      </div>
    </div>

    <!-- 垂直分割线 -->
    <div class="demo-section">
      <h2>垂直分割线</h2>
      <p>使用 <code>direction</code> 属性设置为垂直分割线。</p>
      <div class="demo-block">
        <div class="vertical-content">
          <span>选项一</span>
          <VkDivider direction="vertical" />
          <span>选项二</span>
          <VkDivider direction="vertical" />
          <span>选项三</span>
          <VkDivider direction="vertical" />
          <span>选项四</span>
        </div>
      </div>
    </div>

    <!-- 不同样式 -->
    <div class="demo-section">
      <h2>不同样式</h2>
      <p>使用 <code>border-style</code> 属性设置分割线样式。</p>
      <div class="demo-block">
        <div class="content-block">
          <p>实线分割线（默认）</p>
          <VkDivider border-style="solid">实线</VkDivider>
          <p>虚线分割线</p>
          <VkDivider border-style="dashed">虚线</VkDivider>
          <p>点线分割线</p>
          <VkDivider border-style="dotted">点线</VkDivider>
          <p>结束内容</p>
        </div>
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <h2>自定义颜色</h2>
      <p>使用 <code>color</code> 属性自定义分割线颜色。</p>
      <div class="demo-block">
        <div class="content-block">
          <p>默认颜色</p>
          <VkDivider>默认</VkDivider>
          <p>主色调</p>
          <VkDivider color="#409eff">主色调</VkDivider>
          <p>成功色</p>
          <VkDivider color="#67c23a">成功</VkDivider>
          <p>警告色</p>
          <VkDivider color="#e6a23c">警告</VkDivider>
          <p>危险色</p>
          <VkDivider color="#f56c6c">危险</VkDivider>
          <p>结束内容</p>
        </div>
      </div>
    </div>

    <!-- 自定义厚度 -->
    <div class="demo-section">
      <h2>自定义厚度</h2>
      <p>使用 <code>thickness</code> 属性设置分割线厚度。</p>
      <div class="demo-block">
        <div class="content-block">
          <p>1px 厚度（默认）</p>
          <VkDivider thickness="1px">1px</VkDivider>
          <p>2px 厚度</p>
          <VkDivider thickness="2px">2px</VkDivider>
          <p>3px 厚度</p>
          <VkDivider thickness="3px">3px</VkDivider>
          <p>5px 厚度</p>
          <VkDivider thickness="5px">5px</VkDivider>
          <p>结束内容</p>
        </div>
      </div>
    </div>

    <!-- 自定义间距 -->
    <div class="demo-section">
      <h2>自定义间距</h2>
      <p>使用 <code>margin</code> 属性设置分割线上下间距。</p>
      <div class="demo-block">
        <div class="content-block">
          <p>默认间距</p>
          <VkDivider>默认</VkDivider>
          <p>小间距</p>
          <VkDivider margin="8px">小间距</VkDivider>
          <p>大间距</p>
          <VkDivider margin="32px">大间距</VkDivider>
          <p>超大间距</p>
          <VkDivider margin="48px">超大间距</VkDivider>
          <p>结束内容</p>
        </div>
      </div>
    </div>

    <!-- 实际应用场景 -->
    <div class="demo-section">
      <h2>实际应用场景</h2>
      <p>分割线在实际项目中的常见用法。</p>

      <!-- 文章内容分割 -->
      <div class="demo-block">
        <h3>文章内容分割</h3>
        <div class="article-demo">
          <h4>第一章：开始</h4>
          <p>这是第一章的内容，介绍了项目的基本概念和使用方法。在这一章中，我们将学习如何快速上手使用组件库。</p>
          <VkDivider content-position="center">
            <VkIcon name="star" size="16" color="#e6a23c" />
          </VkDivider>
          <h4>第二章：进阶</h4>
          <p>这是第二章的内容，深入探讨了组件的高级用法和最佳实践。我们将学习如何自定义组件样式和行为。</p>
          <VkDivider content-position="center">
            <VkIcon name="star" size="16" color="#e6a23c" />
          </VkDivider>
          <h4>第三章：总结</h4>
          <p>这是第三章的内容，总结了前面学到的知识点，并提供了一些实用的开发技巧。</p>
        </div>
      </div>

      <!-- 导航菜单分割 -->
      <div class="demo-block">
        <h3>导航菜单分割</h3>
        <div class="nav-demo">
          <div class="nav-group">
            <a href="#">首页</a>
            <VkDivider direction="vertical" />
            <a href="#">产品</a>
            <VkDivider direction="vertical" />
            <a href="#">服务</a>
            <VkDivider direction="vertical" />
            <a href="#">关于我们</a>
            <VkDivider direction="vertical" />
            <a href="#">联系我们</a>
          </div>
        </div>
      </div>

      <!-- 表单分组 -->
      <div class="demo-block">
        <h3>表单分组</h3>
        <div class="form-demo">
          <div class="form-group">
            <h4>基本信息</h4>
            <div class="form-row">
              <label>姓名：</label>
              <input type="text" placeholder="请输入姓名" />
            </div>
            <div class="form-row">
              <label>邮箱：</label>
              <input type="email" placeholder="请输入邮箱" />
            </div>
          </div>

          <VkDivider>联系方式</VkDivider>

          <div class="form-group">
            <div class="form-row">
              <label>电话：</label>
              <input type="tel" placeholder="请输入电话" />
            </div>
            <div class="form-row">
              <label>地址：</label>
              <input type="text" placeholder="请输入地址" />
            </div>
          </div>

          <VkDivider>其他信息</VkDivider>

          <div class="form-group">
            <div class="form-row">
              <label>备注：</label>
              <textarea placeholder="请输入备注信息"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 卡片内容分割 -->
      <div class="demo-block">
        <h3>卡片内容分割</h3>
        <div class="card-demo">
          <div class="user-card">
            <div class="user-header">
              <VkAvatar src="https://avatars.githubusercontent.com/u/1?v=4" :size="60" />
              <div class="user-info">
                <h4>张三</h4>
                <p>前端开发工程师</p>
              </div>
            </div>

            <VkDivider margin="16px" />

            <div class="user-stats">
              <div class="stat-item">
                <span class="stat-number">128</span>
                <span class="stat-label">项目</span>
              </div>
              <VkDivider direction="vertical" />
              <div class="stat-item">
                <span class="stat-number">1.2k</span>
                <span class="stat-label">关注者</span>
              </div>
              <VkDivider direction="vertical" />
              <div class="stat-item">
                <span class="stat-number">89</span>
                <span class="stat-label">关注</span>
              </div>
            </div>

            <VkDivider margin="16px" />

            <div class="user-actions">
              <VkButton type="primary" size="small">关注</VkButton>
              <VkButton size="small">私信</VkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这个组件主要展示 Divider 的各种用法，不需要复杂的逻辑
</script>

<style scoped>
.divider-demo {
  max-width: 1000px;
}

.demo-header {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.demo-header h1 {
  font-size: 32px;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.demo-header p {
  font-size: 16px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  font-size: 24px;
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.demo-section h3 {
  font-size: 18px;
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-weight: 600;
}

.demo-section p {
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

.demo-section code {
  background: #f1f2f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 14px;
  color: #e74c3c;
}

.demo-block {
  padding: 24px;
  background: #fafbfc;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  margin-bottom: 16px;
}

.content-block {
  background: white;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.content-block p {
  margin: 0;
  color: #2c3e50;
  line-height: 1.6;
}

.vertical-content {
  display: flex;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.vertical-content span {
  color: #2c3e50;
  cursor: pointer;
  transition: color 0.3s ease;
}

.vertical-content span:hover {
  color: #409eff;
}

/* 实际应用场景样式 */
.article-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.article-demo h4 {
  color: #2c3e50;
  margin: 0 0 12px 0;
  font-size: 18px;
}

.article-demo p {
  color: #666;
  line-height: 1.8;
  margin: 0 0 16px 0;
}

.nav-demo {
  background: white;
  padding: 20px;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.nav-group {
  display: flex;
  align-items: center;
}

.nav-group a {
  color: #2c3e50;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-group a:hover {
  color: #409eff;
  background: #f0f2f5;
}

.form-demo {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.form-group {
  margin-bottom: 16px;
}

.form-group h4 {
  color: #2c3e50;
  margin: 0 0 16px 0;
  font-size: 16px;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.form-row label {
  width: 80px;
  color: #2c3e50;
  font-weight: 500;
}

.form-row input,
.form-row textarea {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-row input:focus,
.form-row textarea:focus {
  outline: none;
  border-color: #409eff;
}

.form-row textarea {
  resize: vertical;
  min-height: 80px;
}

.card-demo {
  display: flex;
  justify-content: center;
}

.user-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info h4 {
  margin: 0 0 4px 0;
  color: #2c3e50;
  font-size: 18px;
}

.user-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.user-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.user-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

@media (max-width: 768px) {
  .demo-block {
    padding: 16px;
  }

  .content-block {
    padding: 16px;
  }

  .article-demo,
  .form-demo {
    padding: 16px;
  }

  .user-card {
    width: 100%;
    max-width: 280px;
  }

  .nav-group {
    flex-wrap: wrap;
    gap: 8px;
  }

  .vertical-content {
    flex-wrap: wrap;
    gap: 8px;
  }

  .demo-header h1 {
    font-size: 28px;
  }

  .demo-section h2 {
    font-size: 20px;
  }
}
</style>
