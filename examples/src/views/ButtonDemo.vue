<template>
  <div class="button-demo">
    <div class="demo-header">
      <h1>Button 按钮</h1>
      <p>基础的按钮组件，支持多种样式、尺寸和状态。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>使用 <code>type</code> 属性来定义按钮的样式。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton>默认按钮</VkButton>
          <VkButton type="primary">主要按钮</VkButton>
          <VkButton type="success">成功按钮</VkButton>
          <VkButton type="info">信息按钮</VkButton>
          <VkButton type="warning">警告按钮</VkButton>
          <VkButton type="danger">危险按钮</VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 朴素按钮 -->
    <div class="demo-section">
      <h2>朴素按钮</h2>
      <p>使用 <code>plain</code> 属性创建朴素按钮。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton plain>朴素按钮</VkButton>
          <VkButton type="primary" plain>主要按钮</VkButton>
          <VkButton type="success" plain>成功按钮</VkButton>
          <VkButton type="info" plain>信息按钮</VkButton>
          <VkButton type="warning" plain>警告按钮</VkButton>
          <VkButton type="danger" plain>危险按钮</VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 圆角按钮 -->
    <div class="demo-section">
      <h2>圆角按钮</h2>
      <p>使用 <code>round</code> 属性创建圆角按钮。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton round>圆角按钮</VkButton>
          <VkButton type="primary" round>主要按钮</VkButton>
          <VkButton type="success" round>成功按钮</VkButton>
          <VkButton type="info" round>信息按钮</VkButton>
          <VkButton type="warning" round>警告按钮</VkButton>
          <VkButton type="danger" round>危险按钮</VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 圆形按钮 -->
    <div class="demo-section">
      <h2>圆形按钮</h2>
      <p>使用 <code>circle</code> 属性创建圆形按钮。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton circle icon="material-symbols:search"></VkButton>
          <VkButton type="primary" circle icon="material-symbols:edit"></VkButton>
          <VkButton type="success" circle icon="material-symbols:check"></VkButton>
          <VkButton type="info" circle icon="ph:chat-centered-dots"></VkButton>
          <VkButton type="warning" circle icon="material-symbols:star"></VkButton>
          <VkButton type="danger" circle icon="material-symbols:delete"></VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <p>使用 <code>disabled</code> 属性来禁用按钮。</p>
      <VkSpace>
        <VkSpace>
          <VkButton disabled>默认按钮</VkButton>
          <VkButton type="primary" disabled>主要按钮</VkButton>
          <VkButton type="success" disabled>成功按钮</VkButton>
          <VkButton type="info" disabled>信息按钮</VkButton>
          <VkButton type="warning" disabled>警告按钮</VkButton>
          <VkButton type="danger" disabled>危险按钮</VkButton>
        </VkSpace>
        <VkSpace>
          <VkButton plain disabled>朴素按钮</VkButton>
          <VkButton type="primary" plain disabled>主要按钮</VkButton>
          <VkButton type="success" plain disabled>成功按钮</VkButton>
          <VkButton type="info" plain disabled>信息按钮</VkButton>
          <VkButton type="warning" plain disabled>警告按钮</VkButton>
          <VkButton type="danger" plain disabled>危险按钮</VkButton>
        </VkSpace>
      </VkSpace>
    </div>

    <!-- 文字按钮 -->
    <div class="demo-section">
      <h2>文字按钮</h2>
      <p>使用 <code>text</code> 属性创建文字按钮。</p>
      <VkSpace>
        <VkSpace>
          <VkButton text>文字按钮</VkButton>
          <VkButton type="primary" text>主要按钮</VkButton>
          <VkButton type="success" text>成功按钮</VkButton>
          <VkButton type="info" text>信息按钮</VkButton>
          <VkButton type="warning" text>警告按钮</VkButton>
          <VkButton type="danger" text>危险按钮</VkButton>
        </VkSpace>
        <VkSpace>
          <VkButton text disabled>禁用文字按钮</VkButton>
          <VkButton type="primary" text disabled>禁用主要按钮</VkButton>
          <VkButton type="danger" text disabled>禁用危险按钮</VkButton>
        </VkSpace>
      </VkSpace>
    </div>

    <!-- 链接按钮 -->
    <div class="demo-section">
      <h2>链接按钮</h2>
      <p>使用 <code>link</code> 属性创建链接样式的按钮。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton link>链接按钮</VkButton>
          <VkButton type="primary" link>主要链接</VkButton>
          <VkButton type="success" link>成功链接</VkButton>
          <VkButton type="info" link>信息链接</VkButton>
          <VkButton type="warning" link>警告链接</VkButton>
          <VkButton type="danger" link>危险链接</VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 图标按钮 -->
    <div class="demo-section">
      <h2>图标按钮</h2>
      <p>使用 <code>icon</code> 属性为按钮添加图标。</p>
      <VkSpace>
        <VkSpace>
          <VkButton icon="material-symbols:edit"></VkButton>
          <VkButton type="primary" icon="material-symbols:share"></VkButton>
          <VkButton type="success" icon="material-symbols:delete"></VkButton>
          <VkButton type="info" icon="material-symbols:search">搜索</VkButton>
          <VkButton type="warning" icon="material-symbols:upload">上传</VkButton>
          <VkButton type="danger" icon="material-symbols:download">下载</VkButton>
        </VkSpace>
        <VkSpace>
          <VkButton icon="material-symbols:edit" icon-position="right">编辑</VkButton>
          <VkButton type="primary" icon="material-symbols:share" icon-position="right">分享</VkButton>
          <VkButton type="success" icon="material-symbols:check" icon-position="right">确认</VkButton>
        </VkSpace>
      </VkSpace>
    </div>

    <!-- 按钮尺寸 -->
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <p>使用 <code>size</code> 属性来设置按钮的尺寸。</p>
      <VkSpace vertical>
        <VkSpace>
          <VkButton size="large">大型按钮</VkButton>
          <VkButton>默认按钮</VkButton>
          <VkButton size="small">小型按钮</VkButton>
          <VkButton size="tiny">超小按钮</VkButton>
        </VkSpace>
        <VkSpace>
          <VkButton type="primary" size="large" round>大型按钮</VkButton>
          <VkButton type="primary" round>默认按钮</VkButton>
          <VkButton type="primary" size="small" round>小型按钮</VkButton>
          <VkButton type="primary" size="tiny" round>超小按钮</VkButton>
        </VkSpace>
      </VkSpace>
    </div>

    <!-- 加载状态 -->
    <div class="demo-section">
      <h2>加载状态</h2>
      <p>使用 <code>loading</code> 属性设置按钮为加载状态。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton :loading="loading1" @click="handleLoading1">点击加载</VkButton>
          <VkButton type="primary" :loading="loading2" @click="handleLoading2">提交数据</VkButton>
          <VkButton type="success" loading>加载中</VkButton>
          <VkButton type="warning" loading icon="material-symbols:upload">上传中</VkButton>
        </VkSpace>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="demo-section">
      <h2>按钮组</h2>
      <p>使用 <code>VkButtonGroup</code> 组件来组合按钮。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButtonGroup>
            <VkButton type="primary">上一页</VkButton>
            <VkButton type="primary">下一页</VkButton>
          </VkButtonGroup>
          <VkButtonGroup>
            <VkButton type="primary" icon="material-symbols:edit"></VkButton>
            <VkButton type="primary" icon="material-symbols:share"></VkButton>
            <VkButton type="primary" icon="material-symbols:delete"></VkButton>
          </VkButtonGroup>
        </VkSpace>
      </div>
    </div>

    <!-- 事件处理 -->
    <div class="demo-section">
      <h2>事件处理</h2>
      <p>按钮支持点击事件处理。</p>
      <div class="demo-block">
        <VkSpace>
          <VkButton @click="handleClick">点击我</VkButton>
          <VkButton type="primary" @click="handlePrimaryClick">主要操作</VkButton>
          <VkButton type="success" @click="handleSuccessClick">成功操作</VkButton>
          <VkButton type="danger" @click="handleDangerClick">危险操作</VkButton>
        </VkSpace>
      </div>
      <div class="event-log">
        <h4>事件日志：</h4>
        <div class="log-content">
          <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
            {{ log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 加载状态
const loading1 = ref(false);
const loading2 = ref(false);

// 事件日志
const eventLogs = ref<string[]>([]);

// 加载处理函数
const handleLoading1 = () => {
  loading1.value = true;
  setTimeout(() => {
    loading1.value = false;
    addLog("加载完成");
  }, 2000);
};

const handleLoading2 = () => {
  loading2.value = true;
  setTimeout(() => {
    loading2.value = false;
    addLog("数据提交完成");
  }, 3000);
};

// 事件处理函数
const handleClick = () => {
  addLog("默认按钮被点击");
};

const handlePrimaryClick = () => {
  addLog("主要按钮被点击");
};

const handleSuccessClick = () => {
  addLog("成功按钮被点击");
};

const handleDangerClick = () => {
  if (confirm("确定要执行危险操作吗？")) {
    addLog("危险操作已确认执行");
  } else {
    addLog("危险操作已取消");
  }
};

// 添加日志
const addLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};
</script>

<style lang="scss" scoped>
.button-demo {
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

.event-log {
  margin-top: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.event-log h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 16px;
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  padding: 6px 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 13px;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
}

.log-item:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .demo-block {
    padding: 16px;
  }

  .demo-header h1 {
    font-size: 28px;
  }

  .demo-section h2 {
    font-size: 20px;
  }
}
</style>
