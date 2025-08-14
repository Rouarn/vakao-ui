<template>
  <div class="message-demo">
    <h1>Message 消息组件演示</h1>
    <p>消息组件用于显示全局提示信息，通常从页面顶部滑入显示。</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <div class="demo-buttons">
        <VkButton @click="showBasicMessage">显示基础消息</VkButton>
      </div>
    </section>

    <!-- 不同类型 -->
    <section class="demo-section">
      <h2>不同类型</h2>
      <div class="demo-buttons">
        <VkButton type="primary" @click="showPrimaryMessage">主要消息</VkButton>
        <VkButton type="success" @click="showSuccessMessage">成功消息</VkButton>
        <VkButton type="warning" @click="showWarningMessage">警告消息</VkButton>
        <VkButton type="danger" @click="showErrorMessage">错误消息</VkButton>
        <VkButton @click="showInfoMessage">信息消息</VkButton>
      </div>
    </section>

    <!-- 可关闭消息 -->
    <section class="demo-section">
      <h2>可关闭消息</h2>
      <div class="demo-buttons">
        <VkButton @click="showClosableMessage">可关闭消息</VkButton>
        <VkButton @click="showPersistentMessage">持久消息（不自动关闭）</VkButton>
      </div>
    </section>

    <!-- 自定义持续时间 -->
    <section class="demo-section">
      <h2>自定义持续时间</h2>
      <div class="demo-buttons">
        <VkButton @click="showShortMessage">短时间显示（1秒）</VkButton>
        <VkButton @click="showLongMessage">长时间显示（10秒）</VkButton>
      </div>
    </section>

    <!-- 不同位置 -->
    <section class="demo-section">
      <h2>不同位置</h2>
      <div class="demo-buttons">
        <VkButton @click="showTopMessage">顶部居中</VkButton>
        <VkButton @click="showTopLeftMessage">左上角</VkButton>
        <VkButton @click="showTopRightMessage">右上角</VkButton>
      </div>
    </section>

    <!-- 自定义图标 -->
    <section class="demo-section">
      <h2>自定义图标</h2>
      <div class="demo-buttons">
        <VkButton @click="showCustomIconMessage">自定义图标</VkButton>
        <VkButton @click="showNoIconMessage">无图标</VkButton>
      </div>
    </section>

    <!-- 批量操作 -->
    <section class="demo-section">
      <h2>批量操作</h2>
      <div class="demo-buttons">
        <VkButton @click="showMultipleMessages">显示多条消息</VkButton>
        <VkButton @click="closeAllMessages" type="danger">关闭所有消息</VkButton>
        <VkButton @click="getMessageCount">获取消息数量</VkButton>
      </div>
    </section>

    <!-- 组件方式使用 -->
    <section class="demo-section">
      <h2>组件方式使用</h2>
      <div class="demo-buttons">
        <VkButton @click="toggleComponentMessage">切换组件消息</VkButton>
      </div>
      
      <!-- 使用组件方式 -->
      <VkMessage
        v-if="showComponentMessage"
        type="success"
        message="这是通过组件方式显示的消息"
        :closable="true"
        :duration="0"
        position="top-right"
        @close="handleComponentMessageClose"
      />
    </section>

    <!-- HTML 内容 -->
    <section class="demo-section">
      <h2>HTML 内容</h2>
      <div class="demo-buttons">
        <VkButton @click="showHTMLMessage">显示 HTML 消息</VkButton>
      </div>
      <p class="demo-warning">
        <strong>警告：</strong>启用 HTML 内容时请确保内容安全，避免 XSS 攻击。
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VkButton, VkMessage, Message } from '@vakao-ui/components';

// 组件消息的显示状态
const showComponentMessage = ref(false);

// 基础消息
const showBasicMessage = () => {
  Message('这是一条基础消息');
};

// 不同类型的消息
const showPrimaryMessage = () => {
  Message.primary('这是一条主要消息');
};

const showSuccessMessage = () => {
  Message.success('操作成功！');
};

const showWarningMessage = () => {
  Message.warning('请注意检查输入内容');
};

const showErrorMessage = () => {
  Message.error('操作失败，请重试');
};

const showInfoMessage = () => {
  Message.info('这是一条信息提示');
};

// 可关闭消息
const showClosableMessage = () => {
  Message({
    message: '这是一条可关闭的消息',
    type: 'success',
    closable: true,
    duration: 5000
  });
};

const showPersistentMessage = () => {
  Message({
    message: '这条消息不会自动关闭，请手动关闭',
    type: 'warning',
    closable: true,
    duration: 0 // 设置为 0 表示不自动关闭
  });
};

// 自定义持续时间
const showShortMessage = () => {
  Message({
    message: '这条消息会显示 1 秒',
    type: 'info',
    duration: 1000
  });
};

const showLongMessage = () => {
  Message({
    message: '这条消息会显示 10 秒',
    type: 'primary',
    duration: 10000
  });
};

// 不同位置
const showTopMessage = () => {
  Message({
    message: '顶部居中显示',
    type: 'success',
    position: 'top'
  });
};

const showTopLeftMessage = () => {
  Message({
    message: '左上角显示',
    type: 'warning',
    position: 'top-left'
  });
};

const showTopRightMessage = () => {
  Message({
    message: '右上角显示',
    type: 'danger',
    position: 'top-right'
  });
};

// 自定义图标
const showCustomIconMessage = () => {
  Message({
    message: '自定义图标消息',
    type: 'primary',
    icon: 'mdi:heart'
  });
};

const showNoIconMessage = () => {
  Message({
    message: '无图标消息',
    type: 'info',
    showIcon: false
  });
};

// 批量操作
const showMultipleMessages = () => {
  Message.success('第一条消息');
  setTimeout(() => {
    Message.warning('第二条消息');
  }, 500);
  setTimeout(() => {
    Message.info('第三条消息');
  }, 1000);
};

const closeAllMessages = () => {
  Message.closeAll();
  Message.success('已关闭所有消息');
};

const getMessageCount = () => {
  const count = Message.getCount();
  Message.info(`当前有 ${count} 条活跃消息`);
};

// 组件方式
const toggleComponentMessage = () => {
  showComponentMessage.value = !showComponentMessage.value;
};

const handleComponentMessageClose = () => {
  showComponentMessage.value = false;
};

// HTML 内容
const showHTMLMessage = () => {
  Message({
    message: '<strong>这是粗体文本</strong> 和 <em>斜体文本</em>',
    type: 'info',
    dangerouslyUseHTMLString: true,
    duration: 5000
  });
};
</script>

<style scoped>
.message-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fff;
}

.demo-section h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

.demo-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

.demo-warning {
  margin-top: 16px;
  padding: 12px;
  background-color: #fdf6ec;
  border: 1px solid #faecd8;
  border-radius: 4px;
  color: #e6a23c;
  font-size: 14px;
}

.demo-warning strong {
  color: #cf711f;
}

h1 {
  color: #303133;
  margin-bottom: 16px;
}

p {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 24px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-demo {
    padding: 16px;
  }
  
  .demo-section {
    padding: 16px;
  }
  
  .demo-buttons {
    flex-direction: column;
  }
}
</style>