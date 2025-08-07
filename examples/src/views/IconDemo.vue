<template>
  <div class="icon-demo">
    <div class="demo-header">
      <h1>Icon 图标</h1>
      <p>提供了一套常用的图标集合，支持多种尺寸和颜色。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>使用 <code>name</code> 属性来指定图标。</p>
      <div class="demo-block">
        <VkIcon name="home" />
        <VkIcon name="user" />
        <VkIcon name="setting" />
        <VkIcon name="search" />
        <VkIcon name="edit" />
        <VkIcon name="delete" />
        <VkIcon name="check" />
        <VkIcon name="close" />
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <p>使用 <code>size</code> 属性来设置图标大小。</p>
      <div class="demo-block">
        <VkIcon name="star" size="12" />
        <VkIcon name="star" size="16" />
        <VkIcon name="star" size="20" />
        <VkIcon name="star" size="24" />
        <VkIcon name="star" size="32" />
        <VkIcon name="star" size="48" />
      </div>
    </div>

    <!-- 不同颜色 -->
    <div class="demo-section">
      <h2>不同颜色</h2>
      <p>使用 <code>color</code> 属性来设置图标颜色。</p>
      <div class="demo-block">
        <VkIcon name="heart" color="#f56c6c" size="24" />
        <VkIcon name="heart" color="#67c23a" size="24" />
        <VkIcon name="heart" color="#409eff" size="24" />
        <VkIcon name="heart" color="#e6a23c" size="24" />
        <VkIcon name="heart" color="#909399" size="24" />
        <VkIcon name="heart" color="#c71585" size="24" />
      </div>
    </div>

    <!-- 常用图标集合 -->
    <div class="demo-section">
      <h2>常用图标</h2>
      <p>展示常用的图标集合。</p>
      <div class="demo-block icon-grid">
        <div v-for="icon in commonIcons" :key="icon.name" class="icon-item" @click="copyIconName(icon.name)">
          <VkIcon :name="icon.name" size="24" />
          <span class="icon-name">{{ icon.name }}</span>
        </div>
      </div>
    </div>

    <!-- 方向图标 -->
    <div class="demo-section">
      <h2>方向图标</h2>
      <p>各种方向指示图标。</p>
      <div class="demo-block icon-grid">
        <div v-for="icon in directionIcons" :key="icon.name" class="icon-item" @click="copyIconName(icon.name)">
          <VkIcon :name="icon.name" size="24" />
          <span class="icon-name">{{ icon.name }}</span>
        </div>
      </div>
    </div>

    <!-- 操作图标 -->
    <div class="demo-section">
      <h2>操作图标</h2>
      <p>常用的操作类图标。</p>
      <div class="demo-block icon-grid">
        <div v-for="icon in actionIcons" :key="icon.name" class="icon-item" @click="copyIconName(icon.name)">
          <VkIcon :name="icon.name" size="24" />
          <span class="icon-name">{{ icon.name }}</span>
        </div>
      </div>
    </div>

    <!-- 状态图标 -->
    <div class="demo-section">
      <h2>状态图标</h2>
      <p>表示不同状态的图标。</p>
      <div class="demo-block icon-grid">
        <div v-for="icon in statusIcons" :key="icon.name" class="icon-item" @click="copyIconName(icon.name)">
          <VkIcon :name="icon.name" size="24" :color="icon.color" />
          <span class="icon-name">{{ icon.name }}</span>
        </div>
      </div>
    </div>

    <!-- 图标与文字组合 -->
    <div class="demo-section">
      <h2>图标与文字组合</h2>
      <p>图标与文字的常见组合用法。</p>
      <div class="demo-block">
        <div class="text-icon-group">
          <div class="text-icon-item">
            <VkIcon name="home" size="16" />
            <span>首页</span>
          </div>
          <div class="text-icon-item">
            <VkIcon name="user" size="16" />
            <span>用户中心</span>
          </div>
          <div class="text-icon-item">
            <VkIcon name="setting" size="16" />
            <span>设置</span>
          </div>
          <div class="text-icon-item">
            <VkIcon name="message" size="16" />
            <span>消息</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 可点击图标 -->
    <div class="demo-section">
      <h2>可点击图标</h2>
      <p>添加点击事件的图标示例。</p>
      <div class="demo-block">
        <div class="clickable-icons">
          <VkIcon
            v-for="icon in clickableIcons"
            :key="icon.name"
            :name="icon.name"
            size="32"
            class="clickable-icon"
            @click="handleIconClick(icon)"
          />
        </div>
        <div class="click-log">
          <h4>点击日志：</h4>
          <div class="log-content">
            <div v-for="(log, index) in clickLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图标动画 -->
    <div class="demo-section">
      <h2>图标动画</h2>
      <p>带有动画效果的图标。</p>
      <div class="demo-block">
        <VkIcon name="loading" size="24" class="rotating" />
        <VkIcon name="heart" size="24" class="beating" color="#f56c6c" />
        <VkIcon name="star" size="24" class="twinkling" color="#e6a23c" />
        <VkIcon name="bell" size="24" class="shaking" />
      </div>
    </div>

    <!-- 复制提示 -->
    <div v-if="copyMessage" class="copy-message">
      {{ copyMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 常用图标
const commonIcons = ref([
  { name: "home" },
  { name: "user" },
  { name: "setting" },
  { name: "search" },
  { name: "message" },
  { name: "bell" },
  { name: "star" },
  { name: "heart" },
  { name: "bookmark" },
  { name: "calendar" },
  { name: "clock" },
  { name: "location" },
]);

// 方向图标
const directionIcons = ref([
  { name: "arrow-up" },
  { name: "arrow-down" },
  { name: "arrow-left" },
  { name: "arrow-right" },
  { name: "chevron-up" },
  { name: "chevron-down" },
  { name: "chevron-left" },
  { name: "chevron-right" },
]);

// 操作图标
const actionIcons = ref([
  { name: "edit" },
  { name: "delete" },
  { name: "copy" },
  { name: "share" },
  { name: "download" },
  { name: "upload" },
  { name: "refresh" },
  { name: "print" },
  { name: "save" },
  { name: "undo" },
  { name: "redo" },
  { name: "zoom-in" },
  { name: "zoom-out" },
  { name: "fullscreen" },
]);

// 状态图标
const statusIcons = ref([
  { name: "check", color: "#67c23a" },
  { name: "close", color: "#f56c6c" },
  { name: "warning", color: "#e6a23c" },
  { name: "info", color: "#409eff" },
  { name: "loading", color: "#909399" },
  { name: "success", color: "#67c23a" },
  { name: "error", color: "#f56c6c" },
  { name: "question", color: "#909399" },
]);

// 可点击图标
const clickableIcons = ref([
  { name: "like", action: "点赞" },
  { name: "share", action: "分享" },
  { name: "comment", action: "评论" },
  { name: "bookmark", action: "收藏" },
  { name: "download", action: "下载" },
  { name: "print", action: "打印" },
]);

// 点击日志
const clickLogs = ref<string[]>([]);

// 复制消息
const copyMessage = ref("");

// 事件处理函数
const copyIconName = (iconName: string) => {
  navigator.clipboard.writeText(iconName).then(() => {
    copyMessage.value = `已复制图标名称: ${iconName}`;
    setTimeout(() => {
      copyMessage.value = "";
    }, 2000);
  });
};

const handleIconClick = (icon: any) => {
  const timestamp = new Date().toLocaleTimeString();
  clickLogs.value.unshift(`[${timestamp}] ${icon.action} - ${icon.name}`);
  if (clickLogs.value.length > 6) {
    clickLogs.value.pop();
  }
};
</script>

<style scoped>
.icon-demo {
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

.demo-block .vk-icon {
  margin: 0 12px 12px 0;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.icon-item:hover {
  background: #f0f2f5;
  border-color: #409eff;
}

.icon-name {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: center;
  word-break: break-all;
}

.text-icon-group {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.text-icon-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  transition: all 0.3s ease;
}

.text-icon-item:hover {
  border-color: #409eff;
  color: #409eff;
}

.clickable-icons {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.clickable-icon {
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.clickable-icon:hover {
  background: #f0f2f5;
  transform: scale(1.1);
}

.click-log {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.click-log h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 16px;
}

.log-content {
  max-height: 150px;
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

.copy-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #67c23a;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 图标动画 */
.rotating {
  animation: rotate 2s linear infinite;
}

.beating {
  animation: beat 1s ease-in-out infinite;
}

.twinkling {
  animation: twinkle 1.5s ease-in-out infinite;
}

.shaking {
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes beat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  75% {
    transform: translateX(2px);
  }
}

@media (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 12px;
  }

  .text-icon-group {
    gap: 16px;
  }

  .clickable-icons {
    gap: 12px;
  }

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
