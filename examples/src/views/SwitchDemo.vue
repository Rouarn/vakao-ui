<template>
  <div class="switch-demo">
    <div class="demo-header">
      <h1>Switch 开关</h1>
      <p>表示两种相互对立的状态间的切换，多用于触发「开/关」。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>绑定 v-model 到一个 Boolean 类型的变量。可以使用 active-color 属性与 inactive-color 属性来设置开关的背景色。</p>
      <div class="demo-block">
        <VkSwitch v-model="switch1" />
        <VkSwitch v-model="switch2" active-color="#13ce66" inactive-color="#ff4949" />
        <p class="result">开关1状态：{{ switch1 ? "开启" : "关闭" }}</p>
        <p class="result">开关2状态：{{ switch2 ? "开启" : "关闭" }}</p>
      </div>
    </div>

    <!-- 文字描述 -->
    <div class="demo-section">
      <h2>文字描述</h2>
      <p>使用 active-text 属性与 inactive-text 属性来设置开关的文字描述。</p>
      <div class="demo-block">
        <VkSwitch v-model="switch3" active-text="开启" inactive-text="关闭" />
        <VkSwitch v-model="switch4" active-text="按月付费" inactive-text="按年付费" />
        <p class="result">开关3状态：{{ switch3 ? "开启" : "关闭" }}</p>
        <p class="result">付费方式：{{ switch4 ? "按月付费" : "按年付费" }}</p>
      </div>
    </div>

    <!-- 扩展的 value 类型 -->
    <div class="demo-section">
      <h2>扩展的 value 类型</h2>
      <p>设置 active-value 和 inactive-value 属性，接受 Boolean, String 或 Number 类型的值。</p>
      <div class="demo-block">
        <VkSwitch v-model="switch5" active-color="#13ce66" inactive-color="#ff4949" active-value="100" inactive-value="0" />
        <VkSwitch v-model="switch6" active-value="on" inactive-value="off" />
        <p class="result">开关5值：{{ switch5 }}</p>
        <p class="result">开关6值：{{ switch6 }}</p>
      </div>
    </div>

    <!-- 禁用状态 -->
    <div class="demo-section">
      <h2>禁用状态</h2>
      <p>设置 disabled 属性，接受一个 Boolean，设置 true 即可禁用。</p>
      <div class="demo-block">
        <VkSwitch v-model="switch7" disabled />
        <VkSwitch v-model="switch8" disabled />
        <p class="result">禁用开关1：{{ switch7 ? "开启" : "关闭" }}</p>
        <p class="result">禁用开关2：{{ switch8 ? "开启" : "关闭" }}</p>
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div class="demo-section">
      <h2>不同尺寸</h2>
      <p>Switch 组件提供大、默认、小三种尺寸。</p>
      <div class="demo-block">
        <div class="size-group">
          <div class="size-item">
            <span class="size-label">大尺寸：</span>
            <VkSwitch v-model="switch9" size="large" />
          </div>
          <div class="size-item">
            <span class="size-label">默认尺寸：</span>
            <VkSwitch v-model="switch10" />
          </div>
          <div class="size-item">
            <span class="size-label">小尺寸：</span>
            <VkSwitch v-model="switch11" size="small" />
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div class="demo-section">
      <h2>加载状态</h2>
      <p>设置 loading 属性，接受一个 Boolean，设置 true 即可显示加载中状态。</p>
      <div class="demo-block">
        <VkSwitch v-model="switch12" loading />
        <VkSwitch v-model="switch13" loading />
        <VkButton @click="toggleLoading" size="small" style="margin-left: 20px">
          {{ isLoading ? "停止加载" : "开始加载" }}
        </VkButton>
        <VkSwitch v-model="switch14" :loading="isLoading" />
      </div>
    </div>

    <!-- 阻止切换 -->
    <div class="demo-section">
      <h2>阻止切换</h2>
      <p>设置 beforeChange 属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。</p>
      <div class="demo-block">
        <VkSwitch v-model="switch15" :before-change="beforeChange1" active-text="确认切换" inactive-text="需要确认" />
        <VkSwitch v-model="switch16" :before-change="beforeChange2" active-text="异步切换" inactive-text="模拟延迟" />
        <p class="result">开关15状态：{{ switch15 ? "开启" : "关闭" }}</p>
        <p class="result">开关16状态：{{ switch16 ? "开启" : "关闭" }}</p>
      </div>
    </div>

    <!-- 实际应用场景 -->
    <div class="demo-section">
      <h2>实际应用场景</h2>
      <p>开关在实际项目中的常见用法。</p>

      <!-- 系统设置 -->
      <div class="demo-block">
        <h3>系统设置</h3>
        <div class="settings-demo">
          <div class="setting-group">
            <h4>通知设置</h4>
            <div class="setting-item" v-for="setting in notificationSettings" :key="setting.key">
              <div class="setting-info">
                <VkIcon :name="setting.icon" size="20" :color="setting.color" />
                <div class="setting-text">
                  <div class="setting-title">{{ setting.title }}</div>
                  <div class="setting-desc">{{ setting.description }}</div>
                </div>
              </div>
              <VkSwitch v-model="settings[setting.key]" :active-color="setting.color" @change="handleSettingChange(setting.key, $event)" />
            </div>
          </div>

          <div class="setting-group">
            <h4>隐私设置</h4>
            <div class="setting-item" v-for="setting in privacySettings" :key="setting.key">
              <div class="setting-info">
                <VkIcon :name="setting.icon" size="20" :color="setting.color" />
                <div class="setting-text">
                  <div class="setting-title">{{ setting.title }}</div>
                  <div class="setting-desc">{{ setting.description }}</div>
                </div>
              </div>
              <VkSwitch v-model="settings[setting.key]" :active-color="setting.color" @change="handleSettingChange(setting.key, $event)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 功能开关 -->
      <div class="demo-block">
        <h3>功能开关</h3>
        <div class="feature-demo">
          <div class="feature-item" v-for="feature in features" :key="feature.key">
            <div class="feature-header">
              <div class="feature-info">
                <h4>{{ feature.title }}</h4>
                <p>{{ feature.description }}</p>
              </div>
              <VkSwitch
                v-model="featureStates[feature.key]"
                :disabled="feature.disabled"
                :before-change="feature.beforeChange"
                size="large"
                active-color="#67c23a"
              />
            </div>
            <div v-if="feature.options && featureStates[feature.key]" class="feature-options">
              <div class="option-item" v-for="option in feature.options" :key="option.key">
                <span>{{ option.label }}</span>
                <VkSwitch v-model="featureOptions[option.key]" size="small" :active-color="option.color || '#409eff'" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 权限控制 -->
      <div class="demo-block">
        <h3>权限控制</h3>
        <div class="permission-demo">
          <div class="user-card" v-for="user in users" :key="user.id">
            <div class="user-header">
              <VkAvatar :src="user.avatar" size="40" />
              <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-role">{{ user.role }}</div>
              </div>
              <div class="user-status">
                <span :class="['status-dot', user.active ? 'active' : 'inactive']"></span>
                <span>{{ user.active ? "在线" : "离线" }}</span>
              </div>
            </div>
            <div class="user-permissions">
              <div class="permission-item" v-for="permission in user.permissions" :key="permission.key">
                <span class="permission-name">{{ permission.name }}</span>
                <VkSwitch
                  v-model="permission.enabled"
                  size="small"
                  :disabled="!user.active"
                  :before-change="() => confirmPermissionChange(user, permission)"
                  active-color="#67c23a"
                  inactive-color="#f56c6c"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 状态监控 -->
      <div class="demo-block">
        <h3>状态监控</h3>
        <div class="monitor-demo">
          <div class="monitor-grid">
            <div class="monitor-item" v-for="service in services" :key="service.id">
              <div class="monitor-header">
                <VkIcon :name="service.icon" size="24" :color="service.status === 'running' ? '#67c23a' : '#f56c6c'" />
                <div class="monitor-info">
                  <div class="service-name">{{ service.name }}</div>
                  <div class="service-desc">{{ service.description }}</div>
                </div>
              </div>
              <div class="monitor-controls">
                <div class="status-info">
                  <span class="status-label">状态：</span>
                  <span :class="['status-text', service.status]">{{ getStatusText(service.status) }}</span>
                </div>
                <VkSwitch
                  v-model="service.enabled"
                  :loading="service.loading"
                  :before-change="() => toggleService(service)"
                  active-text="启用"
                  inactive-text="停用"
                  active-color="#67c23a"
                  inactive-color="#f56c6c"
                />
              </div>
              <div class="monitor-stats">
                <div class="stat-item">
                  <span class="stat-label">CPU:</span>
                  <span class="stat-value">{{ service.stats.cpu }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">内存:</span>
                  <span class="stat-value">{{ service.stats.memory }}%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">运行时间:</span>
                  <span class="stat-value">{{ service.stats.uptime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// 基础用法
const switch1 = ref(true);
const switch2 = ref(false);
const switch3 = ref(true);
const switch4 = ref(false);
const switch5 = ref("100");
const switch6 = ref("on");
const switch7 = ref(true);
const switch8 = ref(false);
const switch9 = ref(true);
const switch10 = ref(false);
const switch11 = ref(true);
const switch12 = ref(true);
const switch13 = ref(false);
const switch14 = ref(true);
const switch15 = ref(false);
const switch16 = ref(false);

// 加载状态
const isLoading = ref(false);
const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};

// 阻止切换
const beforeChange1 = () => {
  return confirm("确定要切换开关状态吗？");
};

const beforeChange2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(confirm("模拟异步操作，确定要切换吗？"));
    }, 1000);
  });
};

// 系统设置
const notificationSettings = [
  {
    key: "emailNotification",
    title: "邮件通知",
    description: "接收重要邮件通知",
    icon: "mail",
    color: "#409eff",
  },
  {
    key: "smsNotification",
    title: "短信通知",
    description: "接收短信验证码和通知",
    icon: "message",
    color: "#67c23a",
  },
  {
    key: "pushNotification",
    title: "推送通知",
    description: "接收应用推送消息",
    icon: "bell",
    color: "#e6a23c",
  },
];

const privacySettings = [
  {
    key: "profileVisible",
    title: "公开个人资料",
    description: "允许其他用户查看您的个人资料",
    icon: "user",
    color: "#409eff",
  },
  {
    key: "onlineStatus",
    title: "显示在线状态",
    description: "向其他用户显示您的在线状态",
    icon: "eye",
    color: "#67c23a",
  },
  {
    key: "dataCollection",
    title: "数据收集",
    description: "允许收集使用数据以改善服务",
    icon: "chart",
    color: "#f56c6c",
  },
];

const settings = reactive({
  emailNotification: true,
  smsNotification: false,
  pushNotification: true,
  profileVisible: true,
  onlineStatus: false,
  dataCollection: false,
});

const handleSettingChange = (key: string, value: boolean) => {
  console.log(`设置 ${key} 已${value ? "开启" : "关闭"}`);
};

// 功能开关
const features = [
  {
    key: "darkMode",
    title: "深色模式",
    description: "启用深色主题以减少眼部疲劳",
    disabled: false,
    beforeChange: null,
    options: [
      { key: "autoDarkMode", label: "自动切换", color: "#409eff" },
      { key: "darkModeSchedule", label: "定时切换", color: "#67c23a" },
    ],
  },
  {
    key: "experimentalFeatures",
    title: "实验性功能",
    description: "启用正在开发中的新功能（可能不稳定）",
    disabled: false,
    beforeChange: () => {
      return confirm("实验性功能可能不稳定，确定要启用吗？");
    },
    options: [
      { key: "betaUI", label: "Beta UI", color: "#e6a23c" },
      { key: "advancedSearch", label: "高级搜索", color: "#409eff" },
    ],
  },
  {
    key: "premiumFeatures",
    title: "高级功能",
    description: "需要升级到高级版本才能使用",
    disabled: true,
    beforeChange: null,
    options: null,
  },
];

const featureStates = reactive({
  darkMode: false,
  experimentalFeatures: false,
  premiumFeatures: false,
});

const featureOptions = reactive({
  autoDarkMode: false,
  darkModeSchedule: false,
  betaUI: false,
  advancedSearch: false,
});

// 权限控制
const users = reactive([
  {
    id: 1,
    name: "张三",
    role: "管理员",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    active: true,
    permissions: [
      { key: "read", name: "读取权限", enabled: true },
      { key: "write", name: "写入权限", enabled: true },
      { key: "delete", name: "删除权限", enabled: false },
    ],
  },
  {
    id: 2,
    name: "李四",
    role: "编辑",
    avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    active: true,
    permissions: [
      { key: "read", name: "读取权限", enabled: true },
      { key: "write", name: "写入权限", enabled: false },
      { key: "delete", name: "删除权限", enabled: false },
    ],
  },
  {
    id: 3,
    name: "王五",
    role: "访客",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    active: false,
    permissions: [
      { key: "read", name: "读取权限", enabled: true },
      { key: "write", name: "写入权限", enabled: false },
      { key: "delete", name: "删除权限", enabled: false },
    ],
  },
]);

const confirmPermissionChange = (user: any, permission: any) => {
  return confirm(`确定要${permission.enabled ? "禁用" : "启用"}用户 ${user.name} 的${permission.name}吗？`);
};

// 状态监控
const services = reactive([
  {
    id: 1,
    name: "Web 服务器",
    description: "Nginx 反向代理服务",
    icon: "server",
    status: "running",
    enabled: true,
    loading: false,
    stats: {
      cpu: 15,
      memory: 32,
      uptime: "7天 12小时",
    },
  },
  {
    id: 2,
    name: "数据库",
    description: "MySQL 数据库服务",
    icon: "database",
    status: "running",
    enabled: true,
    loading: false,
    stats: {
      cpu: 8,
      memory: 45,
      uptime: "15天 6小时",
    },
  },
  {
    id: 3,
    name: "缓存服务",
    description: "Redis 缓存服务",
    icon: "cache",
    status: "stopped",
    enabled: false,
    loading: false,
    stats: {
      cpu: 0,
      memory: 0,
      uptime: "已停止",
    },
  },
  {
    id: 4,
    name: "消息队列",
    description: "RabbitMQ 消息服务",
    icon: "queue",
    status: "running",
    enabled: true,
    loading: false,
    stats: {
      cpu: 5,
      memory: 18,
      uptime: "3天 8小时",
    },
  },
]);

const getStatusText = (status: string) => {
  const statusMap = {
    running: "运行中",
    stopped: "已停止",
    error: "错误",
    starting: "启动中",
    stopping: "停止中",
  };
  return statusMap[status as keyof typeof statusMap] || "未知";
};

const toggleService = (service: any) => {
  return new Promise((resolve) => {
    service.loading = true;

    // 模拟异步操作
    setTimeout(() => {
      if (service.enabled) {
        service.status = "stopping";
        setTimeout(() => {
          service.status = "stopped";
          service.stats.cpu = 0;
          service.stats.memory = 0;
          service.stats.uptime = "已停止";
          service.loading = false;
          resolve(true);
        }, 1000);
      } else {
        service.status = "starting";
        setTimeout(() => {
          service.status = "running";
          service.stats.cpu = Math.floor(Math.random() * 30) + 5;
          service.stats.memory = Math.floor(Math.random() * 50) + 10;
          service.stats.uptime = "刚刚启动";
          service.loading = false;
          resolve(true);
        }, 1500);
      }
    }, 500);
  });
};
</script>

<style scoped>
.switch-demo {
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

.demo-section h4 {
  font-size: 16px;
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

.demo-block .vk-switch {
  margin: 0 12px 12px 0;
}

.result {
  margin-top: 16px;
  padding: 12px;
  background: #f0f2f5;
  border-radius: 4px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 14px;
  color: #2c3e50;
}

.size-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.size-label {
  width: 100px;
  color: #2c3e50;
  font-weight: 500;
}

/* 系统设置样式 */
.settings-demo {
  background: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  overflow: hidden;
}

.setting-group {
  padding: 24px;
  border-bottom: 1px solid #f0f2f5;
}

.setting-group:last-child {
  border-bottom: none;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f8f9fa;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.setting-text {
  flex: 1;
}

.setting-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.setting-desc {
  font-size: 14px;
  color: #666;
}

/* 功能开关样式 */
.feature-demo {
  background: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.feature-item {
  padding: 24px;
  border-bottom: 1px solid #f0f2f5;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.feature-info {
  flex: 1;
}

.feature-info h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.feature-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.feature-options {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f2f5;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
}

/* 权限控制样式 */
.permission-demo {
  display: grid;
  gap: 16px;
}

.user-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.user-role {
  font-size: 14px;
  color: #666;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.active {
  background: #67c23a;
}

.status-dot.inactive {
  background: #f56c6c;
}

.user-permissions {
  display: grid;
  gap: 12px;
}

.permission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.permission-name {
  font-size: 14px;
  color: #2c3e50;
}

/* 状态监控样式 */
.monitor-demo {
  background: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  padding: 24px;
}

.monitor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.monitor-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.monitor-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.monitor-info {
  flex: 1;
}

.service-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.service-desc {
  font-size: 14px;
  color: #666;
}

.monitor-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.status-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.status-label {
  color: #666;
}

.status-text {
  font-weight: 600;
}

.status-text.running {
  color: #67c23a;
}

.status-text.stopped {
  color: #f56c6c;
}

.status-text.starting,
.status-text.stopping {
  color: #e6a23c;
}

.monitor-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-item {
  text-align: center;
  padding: 8px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-weight: 600;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .demo-block {
    padding: 16px;
  }

  .size-group {
    gap: 12px;
  }

  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .feature-header {
    flex-direction: column;
    gap: 12px;
  }

  .user-header {
    flex-wrap: wrap;
    gap: 8px;
  }

  .monitor-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .monitor-grid {
    grid-template-columns: 1fr;
  }

  .monitor-stats {
    grid-template-columns: 1fr;
  }

  .demo-header h1 {
    font-size: 28px;
  }

  .demo-section h2 {
    font-size: 20px;
  }
}
</style>
