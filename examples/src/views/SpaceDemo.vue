<template>
  <div class="space-demo">
    <h1>Space 间距</h1>
    <p>设置组件之间的间距。</p>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>相邻组件水平间距。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton>按钮1</VkButton>
          <VkButton type="primary">按钮2</VkButton>
          <VkButton type="success">按钮3</VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 垂直间距 -->
    <div class="demo-section">
      <h2>垂直间距</h2>
      <p>相邻组件垂直间距。</p>
      <div class="demo-block">
        <VkSpace vertical>
          <VkButton>按钮1</VkButton>
          <VkButton type="primary">按钮2</VkButton>
          <VkButton type="success">按钮3</VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 间距大小 -->
    <div class="demo-section">
      <h2>间距大小</h2>
      <p>支持 <code>tiny</code>、<code>small</code>、<code>medium</code>、<code>large</code> 四种预设尺寸，也可以自定义间距大小。</p>

      <h3>预设尺寸</h3>
      <div class="demo-block">
        <div class="size-demo">
          <h4>tiny</h4>
          <VkSpace size="tiny">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="size-demo">
          <h4>small</h4>
          <VkSpace size="small">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="size-demo">
          <h4>medium (默认)</h4>
          <VkSpace size="medium">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="size-demo">
          <h4>large</h4>
          <VkSpace size="large">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>
      </div>

      <h3>自定义尺寸</h3>
      <div class="demo-block">
        <div class="size-demo">
          <h4>数值: 30</h4>
          <VkSpace :size="30">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="size-demo">
          <h4>数组: [10, 20]</h4>
          <VkSpace :size="[10, 20]" wrap>
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
            <VkButton>按钮4</VkButton>
            <VkButton>按钮5</VkButton>
            <VkButton>按钮6</VkButton>
          </VkSpace>
        </div>
      </div>
    </div>

    <!-- 对齐方式 -->
    <div class="demo-section">
      <h2>对齐方式</h2>
      <p>设置子元素的对齐方式。</p>

      <h3>水平对齐 (align)</h3>
      <div class="demo-block">
        <div class="align-demo">
          <h4>start (默认)</h4>
          <VkSpace align="start" style="height: 100px; background: #f5f5f5">
            <VkButton>按钮1</VkButton>
            <VkButton size="large">大按钮</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="align-demo">
          <h4>center</h4>
          <VkSpace align="center" style="height: 100px; background: #f5f5f5">
            <VkButton>按钮1</VkButton>
            <VkButton size="large">大按钮</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="align-demo">
          <h4>end</h4>
          <VkSpace align="end" style="height: 100px; background: #f5f5f5">
            <VkButton>按钮1</VkButton>
            <VkButton size="large">大按钮</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>
      </div>

      <h3>主轴对齐 (justify)</h3>
      <div class="demo-block">
        <div class="justify-demo">
          <h4>start (默认)</h4>
          <VkSpace justify="start" style="width: 100%; background: #f5f5f5">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="justify-demo">
          <h4>center</h4>
          <VkSpace justify="center" style="width: 100%; background: #f5f5f5">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="justify-demo">
          <h4>space-between</h4>
          <VkSpace justify="space-between" style="width: 100%; background: #f5f5f5">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>

        <div class="justify-demo">
          <h4>space-around</h4>
          <VkSpace justify="space-around" style="width: 100%; background: #f5f5f5">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
          </VkSpace>
        </div>
      </div>
    </div>

    <!-- 自动换行 -->
    <div class="demo-section">
      <h2>自动换行</h2>
      <p>利用 <code>wrap</code> 控制是否自动换行。</p>
      <div class="demo-block">
        <div class="wrap-demo">
          <h4>换行 (wrap=true)</h4>
          <VkSpace wrap style="width: 300px; border: 1px dashed #ccc; padding: 10px">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
            <VkButton>按钮4</VkButton>
            <VkButton>按钮5</VkButton>
            <VkButton>按钮6</VkButton>
          </VkSpace>
        </div>

        <div class="wrap-demo">
          <h4>不换行 (wrap=false)</h4>
          <VkSpace :wrap="false" style="width: 300px; border: 1px dashed #ccc; padding: 10px; overflow: hidden">
            <VkButton>按钮1</VkButton>
            <VkButton>按钮2</VkButton>
            <VkButton>按钮3</VkButton>
            <VkButton>按钮4</VkButton>
            <VkButton>按钮5</VkButton>
            <VkButton>按钮6</VkButton>
          </VkSpace>
        </div>
      </div>
    </div>

    <!-- 行内模式 -->
    <div class="demo-section">
      <h2>行内模式</h2>
      <p>使用 <code>inline</code> 属性设置为行内元素。</p>
      <div class="demo-block">
        <div>
          前面的文字
          <VkSpace inline>
            <VkButton size="small">按钮1</VkButton>
            <VkButton size="small">按钮2</VkButton>
          </VkSpace>
          后面的文字
        </div>
      </div>
    </div>

    <!-- 分隔符 -->
    <div class="demo-section">
      <h2>分隔符</h2>
      <p>使用分隔符分隔元素。</p>
      <div class="demo-block">
        <VkSpace>
          <span>苹果</span>
          <VkDivider direction="vertical" />
          <span>香蕉</span>
          <VkDivider direction="vertical" />
          <span>橙子</span>
        </VkSpace>
      </div>
    </div>

    <!-- 复杂示例 -->
    <div class="demo-section">
      <h2>复杂示例</h2>
      <p>结合多种组件的复杂布局示例。</p>
      <div class="demo-block">
        <VkSpace vertical size="large">
          <!-- 标题区域 -->
          <VkSpace justify="space-between" style="width: 100%">
            <h3 style="margin: 0">用户管理</h3>
            <VkSpace>
              <VkButton type="primary" icon="material-symbols:add">新增用户</VkButton>
              <VkButton icon="material-symbols:refresh">刷新</VkButton>
            </VkSpace>
          </VkSpace>

          <!-- 搜索区域 -->
          <VkSpace wrap>
            <VkInput placeholder="请输入用户名" prefix-icon="material-symbols:search" style="width: 200px" />
            <VkButton type="primary">搜索</VkButton>
            <VkButton>重置</VkButton>
          </VkSpace>

          <!-- 操作区域 -->
          <VkSpace>
            <VkButton type="success" icon="material-symbols:download">导出</VkButton>
            <VkButton type="warning" icon="material-symbols:upload">导入</VkButton>
            <VkButton type="danger" icon="material-symbols:delete">批量删除</VkButton>
          </VkSpace>

          <!-- 状态区域 -->
          <VkSpace wrap>
            <VkBadge :value="5" type="primary">
              <VkButton>待审核</VkButton>
            </VkBadge>
            <VkBadge :value="12" type="success">
              <VkButton>已通过</VkButton>
            </VkBadge>
            <VkBadge :value="3" type="danger">
              <VkButton>已拒绝</VkButton>
            </VkBadge>
          </VkSpace>
        </VkSpace>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style scoped>
.space-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
}

.demo-section h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 8px;
}

.demo-section h3 {
  color: #666;
  font-size: 18px;
  margin: 20px 0 10px 0;
}

.demo-section h4 {
  color: #888;
  font-size: 14px;
  margin: 10px 0 5px 0;
}

.demo-section p {
  color: #666;
  margin-bottom: 16px;
  line-height: 1.6;
}

.demo-block {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 20px;
  background: #fff;
  margin-bottom: 20px;
}

.size-demo,
.align-demo,
.justify-demo,
.wrap-demo {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background: #fafafa;
}

.size-demo:last-child,
.align-demo:last-child,
.justify-demo:last-child,
.wrap-demo:last-child {
  margin-bottom: 0;
}

code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.9em;
  color: #e96900;
}
</style>
