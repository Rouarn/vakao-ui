<template>
  <div class="avatar-demo">
    <div class="demo-header">
      <h1>Avatar 头像</h1>
      <p>用图标、图片或者字符的形式展示用户或事物，支持多种尺寸和形状。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>支持三种类型：图片、图标和字符。</p>
      <div class="demo-block">
        <VkAvatar :size="50" src="https://picsum.photos/100/100?random=1" />
        <VkAvatar :size="50" icon="user" />
        <VkAvatar :size="50">用户</VkAvatar>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <p>使用 <code>size</code> 属性来设置头像的大小。</p>
      <div class="demo-block">
        <VkAvatar :size="64" src="https://picsum.photos/100/100?random=2" />
        <VkAvatar :size="50" src="https://picsum.photos/100/100?random=2" />
        <VkAvatar :size="40" src="https://picsum.photos/100/100?random=2" />
        <VkAvatar :size="30" src="https://picsum.photos/100/100?random=2" />
      </div>
      <div class="demo-block">
        <VkAvatar :size="64" icon="user" />
        <VkAvatar :size="50" icon="user" />
        <VkAvatar :size="40" icon="user" />
        <VkAvatar :size="30" icon="user" />
      </div>
      <div class="demo-block">
        <VkAvatar :size="64">大</VkAvatar>
        <VkAvatar :size="50">中</VkAvatar>
        <VkAvatar :size="40">小</VkAvatar>
        <VkAvatar :size="30">微</VkAvatar>
      </div>
    </div>

    <!-- 不同形状 -->
    <div class="demo-section">
      <h2>不同形状</h2>
      <p>使用 <code>shape</code> 属性来设置头像的形状。</p>
      <div class="demo-block">
        <VkAvatar shape="square" :size="50" src="https://picsum.photos/100/100?random=3" />
        <VkAvatar shape="circle" :size="50" src="https://picsum.photos/100/100?random=3" />
      </div>
      <div class="demo-block">
        <VkAvatar shape="square" :size="50" icon="user" />
        <VkAvatar shape="circle" :size="50" icon="user" />
      </div>
      <div class="demo-block">
        <VkAvatar shape="square" :size="50">方</VkAvatar>
        <VkAvatar shape="circle" :size="50">圆</VkAvatar>
      </div>
    </div>

    <!-- 图片加载失败的 fallback 行为 -->
    <div class="demo-section">
      <h2>图片加载失败的 fallback 行为</h2>
      <p>当头像图片加载失败时，会显示默认的 fallback 内容。</p>
      <div class="demo-block">
        <VkAvatar :size="50" src="invalid-url.jpg">
          <template #fallback>
            <VkIcon name="user" />
          </template>
        </VkAvatar>
        <VkAvatar :size="50" src="invalid-url.jpg">用户</VkAvatar>
        <VkAvatar :size="50" src="invalid-url.jpg" icon="user" />
      </div>
    </div>

    <!-- 头像组 -->
    <div class="demo-section">
      <h2>头像组</h2>
      <p>使用头像组来展示多个用户。</p>
      <div class="demo-block">
        <div class="avatar-group">
          <VkAvatar
            v-for="(user, index) in users"
            :key="user.id"
            :size="40"
            :src="user.avatar"
            :style="{ marginLeft: index > 0 ? '-8px' : '0', zIndex: users.length - index }"
          >
            {{ user.name.charAt(0) }}
          </VkAvatar>
        </div>
      </div>
    </div>

    <!-- 带状态的头像 -->
    <div class="demo-section">
      <h2>带状态的头像</h2>
      <p>在头像上显示在线状态或其他状态信息。</p>
      <div class="demo-block">
        <div class="status-avatar" v-for="user in statusUsers" :key="user.id">
          <VkAvatar :size="50" :src="user.avatar">{{ user.name.charAt(0) }}</VkAvatar>
          <span class="status-dot" :class="user.status"></span>
        </div>
      </div>
    </div>

    <!-- 可点击的头像 -->
    <div class="demo-section">
      <h2>可点击的头像</h2>
      <p>头像可以添加点击事件。</p>
      <div class="demo-block">
        <VkAvatar
          v-for="user in clickableUsers"
          :key="user.id"
          :size="50"
          :src="user.avatar"
          class="clickable-avatar"
          @click="handleAvatarClick(user)"
        >
          {{ user.name.charAt(0) }}
        </VkAvatar>
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

    <!-- 自定义颜色 -->
    <div class="demo-section">
      <h2>自定义颜色</h2>
      <p>可以自定义头像的背景颜色。</p>
      <div class="demo-block">
        <VkAvatar :size="50" :style="{ backgroundColor: '#87d068' }">A</VkAvatar>
        <VkAvatar :size="50" :style="{ backgroundColor: '#f56a00' }">B</VkAvatar>
        <VkAvatar :size="50" :style="{ backgroundColor: '#7265e6' }">C</VkAvatar>
        <VkAvatar :size="50" :style="{ backgroundColor: '#ffbf00' }">D</VkAvatar>
        <VkAvatar :size="50" :style="{ backgroundColor: '#00a2ae' }">E</VkAvatar>
      </div>
    </div>

    <!-- 头像墙 -->
    <div class="demo-section">
      <h2>头像墙</h2>
      <p>展示多个用户头像的网格布局。</p>
      <div class="demo-block">
        <div class="avatar-wall">
          <div v-for="user in wallUsers" :key="user.id" class="avatar-item" @click="handleWallAvatarClick(user)">
            <VkAvatar :size="60" :src="user.avatar">{{ user.name.charAt(0) }}</VkAvatar>
            <div class="avatar-name">{{ user.name }}</div>
            <div class="avatar-role">{{ user.role }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 头像与徽章组合 -->
    <div class="demo-section">
      <h2>头像与徽章组合</h2>
      <p>头像可以与徽章组件组合使用。</p>
      <div class="demo-block">
        <VkBadge :value="12" class="badge-avatar">
          <VkAvatar :size="50" src="https://picsum.photos/100/100?random=10" />
        </VkBadge>
        <VkBadge is-dot class="badge-avatar">
          <VkAvatar :size="50" src="https://picsum.photos/100/100?random=11" />
        </VkBadge>
        <VkBadge :value="'99+'" :max="99" class="badge-avatar">
          <VkAvatar :size="50" icon="user" />
        </VkBadge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 用户数据
const users = ref([
  { id: 1, name: "张三", avatar: "https://picsum.photos/100/100?random=1" },
  { id: 2, name: "李四", avatar: "https://picsum.photos/100/100?random=2" },
  { id: 3, name: "王五", avatar: "https://picsum.photos/100/100?random=3" },
  { id: 4, name: "赵六", avatar: "https://picsum.photos/100/100?random=4" },
  { id: 5, name: "钱七", avatar: "https://picsum.photos/100/100?random=5" },
]);

// 带状态的用户
const statusUsers = ref([
  { id: 1, name: "张三", avatar: "https://picsum.photos/100/100?random=6", status: "online" },
  { id: 2, name: "李四", avatar: "https://picsum.photos/100/100?random=7", status: "away" },
  { id: 3, name: "王五", avatar: "https://picsum.photos/100/100?random=8", status: "busy" },
  { id: 4, name: "赵六", avatar: "https://picsum.photos/100/100?random=9", status: "offline" },
]);

// 可点击的用户
const clickableUsers = ref([
  { id: 1, name: "用户A", avatar: "https://picsum.photos/100/100?random=10" },
  { id: 2, name: "用户B", avatar: "https://picsum.photos/100/100?random=11" },
  { id: 3, name: "用户C", avatar: "https://picsum.photos/100/100?random=12" },
  { id: 4, name: "用户D", avatar: "https://picsum.photos/100/100?random=13" },
]);

// 头像墙用户
const wallUsers = ref([
  { id: 1, name: "张三", role: "前端开发", avatar: "https://picsum.photos/100/100?random=20" },
  { id: 2, name: "李四", role: "后端开发", avatar: "https://picsum.photos/100/100?random=21" },
  { id: 3, name: "王五", role: "UI设计师", avatar: "https://picsum.photos/100/100?random=22" },
  { id: 4, name: "赵六", role: "产品经理", avatar: "https://picsum.photos/100/100?random=23" },
  { id: 5, name: "钱七", role: "测试工程师", avatar: "https://picsum.photos/100/100?random=24" },
  { id: 6, name: "孙八", role: "运维工程师", avatar: "https://picsum.photos/100/100?random=25" },
  { id: 7, name: "周九", role: "数据分析师", avatar: "https://picsum.photos/100/100?random=26" },
  { id: 8, name: "吴十", role: "项目经理", avatar: "https://picsum.photos/100/100?random=27" },
]);

// 点击日志
const clickLogs = ref<string[]>([]);

// 事件处理函数
const handleAvatarClick = (user: any) => {
  addClickLog(`点击了 ${user.name} 的头像`);
};

const handleWallAvatarClick = (user: any) => {
  addClickLog(`查看 ${user.name}（${user.role}）的详细信息`);
};

// 添加点击日志
const addClickLog = (message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  clickLogs.value.unshift(`[${timestamp}] ${message}`);
  if (clickLogs.value.length > 6) {
    clickLogs.value.pop();
  }
};
</script>

<style scoped>
.avatar-demo {
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
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.avatar-group {
  display: flex;
  align-items: center;
}

.status-avatar {
  position: relative;
  display: inline-block;
  margin-right: 16px;
}

.status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-dot.online {
  background-color: #52c41a;
}

.status-dot.away {
  background-color: #faad14;
}

.status-dot.busy {
  background-color: #f5222d;
}

.status-dot.offline {
  background-color: #d9d9d9;
}

.clickable-avatar {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable-avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.click-log {
  margin-top: 24px;
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

.avatar-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  width: 100%;
}

.avatar-item {
  text-align: center;
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.avatar-item:hover {
  background: #f0f2f5;
  transform: translateY(-2px);
}

.avatar-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
}

.avatar-role {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}

.badge-avatar {
  margin-right: 24px;
}

@media (max-width: 768px) {
  .demo-block {
    padding: 16px;
    gap: 12px;
  }

  .avatar-wall {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
  }

  .demo-header h1 {
    font-size: 28px;
  }

  .demo-section h2 {
    font-size: 20px;
  }

  .status-avatar {
    margin-right: 12px;
  }

  .badge-avatar {
    margin-right: 16px;
  }
}
</style>
