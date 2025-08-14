<template>
  <div class="tooltip-demo">
    <h1>Tooltip 文字提示</h1>
    <p>常用于展示鼠标 hover 时的提示信息。</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <p>在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。</p>
      <div class="demo-block">
        <div class="tooltip-grid">
          <div class="top">
            <VkTooltip content="Top Left 提示文字" placement="top-start">
              <VkButton>上左</VkButton>
            </VkTooltip>
            <VkTooltip content="Top Center 提示文字" placement="top">
              <VkButton>上边</VkButton>
            </VkTooltip>
            <VkTooltip content="Top Right 提示文字" placement="top-end">
              <VkButton>上右</VkButton>
            </VkTooltip>
          </div>
          <div class="left">
            <VkTooltip content="Left Top 提示文字" placement="left-start">
              <VkButton>左上</VkButton>
            </VkTooltip>
            <VkTooltip content="Left Center 提示文字" placement="left">
              <VkButton>左边</VkButton>
            </VkTooltip>
            <VkTooltip content="Left Bottom 提示文字" placement="left-end">
              <VkButton>左下</VkButton>
            </VkTooltip>
          </div>
          <div class="right">
            <VkTooltip content="Right Top 提示文字" placement="right-start">
              <VkButton>右上</VkButton>
            </VkTooltip>
            <VkTooltip content="Right Center 提示文字" placement="right">
              <VkButton>右边</VkButton>
            </VkTooltip>
            <VkTooltip content="Right Bottom 提示文字" placement="right-end">
              <VkButton>右下</VkButton>
            </VkTooltip>
          </div>
          <div class="bottom">
            <VkTooltip content="Bottom Left 提示文字" placement="bottom-start">
              <VkButton>下左</VkButton>
            </VkTooltip>
            <VkTooltip content="Bottom Center 提示文字" placement="bottom">
              <VkButton>下边</VkButton>
            </VkTooltip>
            <VkTooltip content="Bottom Right 提示文字" placement="bottom-end">
              <VkButton>下右</VkButton>
            </VkTooltip>
          </div>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTooltip content="提示文字" placement="top"&gt;
  &lt;VkButton&gt;上边&lt;/VkButton&gt;
&lt;/VkTooltip&gt;</code></pre>
      </div>
    </section>

    <!-- 主题 -->
    <section class="demo-section">
      <h2>主题</h2>
      <p>Tooltip 组件提供了两个不同的主题：dark 和 light。</p>
      <div class="demo-block">
        <VkTooltip content="Dark 主题" effect="dark">
          <VkButton>Dark</VkButton>
        </VkTooltip>
        <VkTooltip content="Light 主题" effect="light">
          <VkButton>Light</VkButton>
        </VkTooltip>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTooltip content="Dark 主题" effect="dark"&gt;
  &lt;VkButton&gt;Dark&lt;/VkButton&gt;
&lt;/VkTooltip&gt;
&lt;VkTooltip content="Light 主题" effect="light"&gt;
  &lt;VkButton&gt;Light&lt;/VkButton&gt;
&lt;/VkTooltip&gt;</code></pre>
      </div>
    </section>

    <!-- 更多内容的文字提示 -->
    <section class="demo-section">
      <h2>更多内容的文字提示</h2>
      <p>展示多行文本或者是设置文本内容的格式。</p>
      <div class="demo-block">
        <VkTooltip placement="top">
          <template #content>
            <div>多行信息</div>
            <div>第二行信息</div>
          </template>
          <VkButton>多行文本</VkButton>
        </VkTooltip>
        <VkTooltip placement="top">
          <template #content>
            <div style="color: #409eff; font-weight: bold">自定义样式</div>
            <div style="font-size: 12px; color: #909399">这是一个带样式的提示</div>
          </template>
          <VkButton>自定义内容</VkButton>
        </VkTooltip>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTooltip placement="top"&gt;
  &lt;template #content&gt;
    &lt;div&gt;多行信息&lt;/div&gt;
    &lt;div&gt;第二行信息&lt;/div&gt;
  &lt;/template&gt;
  &lt;VkButton&gt;多行文本&lt;/VkButton&gt;
&lt;/VkTooltip&gt;</code></pre>
      </div>
    </section>

    <!-- 高级扩展 -->
    <section class="demo-section">
      <h2>高级扩展</h2>
      <p>除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果。</p>
      <div class="demo-block">
        <div class="advanced-demo">
          <VkTooltip content="禁用状态的提示" :disabled="tooltipDisabled">
            <VkButton @click="tooltipDisabled = !tooltipDisabled"> 点击{{ tooltipDisabled ? "启用" : "禁用" }}提示 </VkButton>
          </VkTooltip>

          <VkTooltip content="延迟显示的提示" :open-delay="1000">
            <VkButton>延迟1秒显示</VkButton>
          </VkTooltip>

          <VkTooltip content="延迟隐藏的提示" :hide-after="3000">
            <VkButton>3秒后自动隐藏</VkButton>
          </VkTooltip>

          <VkTooltip content="手动控制的提示" :manual="true" :visible="manualVisible">
            <VkButton @click="manualVisible = !manualVisible"> 手动控制 ({{ manualVisible ? "显示" : "隐藏" }}) </VkButton>
          </VkTooltip>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTooltip
  content="禁用状态的提示"
  :disabled="disabled"
&gt;
  &lt;VkButton&gt;禁用提示&lt;/VkButton&gt;
&lt;/VkTooltip&gt;

&lt;VkTooltip
  content="延迟显示的提示"
  :open-delay="1000"
&gt;
  &lt;VkButton&gt;延迟显示&lt;/VkButton&gt;
&lt;/VkTooltip&gt;</code></pre>
      </div>
    </section>

    <!-- 触发方式 -->
    <section class="demo-section">
      <h2>触发方式</h2>
      <p>由 trigger 属性决定触发方式：hover | click | focus | manual。</p>
      <div class="demo-block">
        <VkTooltip content="Hover 触发" trigger="hover">
          <VkButton>Hover 触发</VkButton>
        </VkTooltip>
        <VkTooltip content="Click 触发" trigger="click">
          <VkButton>Click 触发</VkButton>
        </VkTooltip>
        <VkTooltip content="Focus 触发" trigger="focus">
          <VkButton>Focus 触发</VkButton>
        </VkTooltip>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTooltip content="Hover 触发" trigger="hover"&gt;
  &lt;VkButton&gt;Hover 触发&lt;/VkButton&gt;
&lt;/VkTooltip&gt;
&lt;VkTooltip content="Click 触发" trigger="click"&gt;
  &lt;VkButton&gt;Click 触发&lt;/VkButton&gt;
&lt;/VkTooltip&gt;</code></pre>
      </div>
    </section>

    <!-- 不同元素的提示 -->
    <section class="demo-section">
      <h2>不同元素的提示</h2>
      <p>Tooltip 可以包裹任何元素。</p>
      <div class="demo-block">
        <div class="element-demo">
          <VkTooltip content="这是一个文本提示">
            <span class="demo-text">悬停文本</span>
          </VkTooltip>

          <VkTooltip content="这是一个图标提示">
            <VkIcon icon="material-symbols:info" style="font-size: 20px; color: #409eff; cursor: pointer"></VkIcon>
          </VkTooltip>

          <VkTooltip content="这是一个输入框提示">
            <VkInput placeholder="悬停输入框" style="width: 200px"></VkInput>
          </VkTooltip>

          <VkTooltip content="这是一个标签提示">
            <VkTag>悬停标签</VkTag>
          </VkTooltip>

          <VkTooltip content="这是一个头像提示">
            <VkAvatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></VkAvatar>
          </VkTooltip>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkTooltip content="文本提示"&gt;
  &lt;span&gt;悬停文本&lt;/span&gt;
&lt;/VkTooltip&gt;

&lt;VkTooltip content="图标提示"&gt;
  &lt;VkIcon icon="material-symbols:info"&gt;&lt;/VkIcon&gt;
&lt;/VkTooltip&gt;</code></pre>
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section">
      <h2>实际应用场景</h2>
      <p>在实际项目中的常见使用场景。</p>

      <!-- 表格操作提示 -->
      <div class="demo-subsection">
        <h3>表格操作提示</h3>
        <div class="demo-block">
          <div class="table-demo">
            <table class="demo-table">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>邮箱</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>
                    <VkTooltip :content="user.email" placement="top">
                      <span class="email-text">{{ user.email.length > 20 ? user.email.substring(0, 20) + "..." : user.email }}</span>
                    </VkTooltip>
                  </td>
                  <td>
                    <VkTooltip :content="user.status === 'active' ? '用户活跃' : '用户已禁用'">
                      <VkTag :type="user.status === 'active' ? 'success' : 'danger'">
                        {{ user.status === "active" ? "活跃" : "禁用" }}
                      </VkTag>
                    </VkTooltip>
                  </td>
                  <td>
                    <VkTooltip content="编辑用户信息">
                      <VkButton type="primary" size="small" @click="editUser(user)">
                        <VkIcon icon="material-symbols:edit"></VkIcon>
                      </VkButton>
                    </VkTooltip>
                    <VkTooltip content="删除用户">
                      <VkButton type="danger" size="small" @click="deleteUser(user)">
                        <VkIcon icon="material-symbols:delete"></VkIcon>
                      </VkButton>
                    </VkTooltip>
                    <VkTooltip :content="user.status === 'active' ? '禁用用户' : '启用用户'">
                      <VkButton :type="user.status === 'active' ? 'warning' : 'success'" size="small" @click="toggleUserStatus(user)">
                        <VkIcon :icon="user.status === 'active' ? 'material-symbols:lock' : 'material-symbols:lock-open'"></VkIcon>
                      </VkButton>
                    </VkTooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 表单帮助提示 -->
      <div class="demo-subsection">
        <h3>表单帮助提示</h3>
        <div class="demo-block">
          <div class="form-demo">
            <div class="form-item">
              <label
                >用户名
                <VkTooltip content="用户名长度应在3-20个字符之间，只能包含字母、数字和下划线" placement="right">
                  <VkIcon icon="material-symbols:help" class="help-icon"></VkIcon>
                </VkTooltip>
              </label>
              <VkInput v-model="formData.username" placeholder="请输入用户名"></VkInput>
            </div>
            <div class="form-item">
              <label
                >密码强度
                <VkTooltip placement="right">
                  <template #content>
                    <div>密码强度要求：</div>
                    <div>• 至少8个字符</div>
                    <div>• 包含大小写字母</div>
                    <div>• 包含数字和特殊字符</div>
                  </template>
                  <VkIcon icon="material-symbols:help" class="help-icon"></VkIcon>
                </VkTooltip>
              </label>
              <VkInput v-model="formData.password" type="password" placeholder="请输入密码"></VkInput>
            </div>
            <div class="form-item">
              <label
                >邮箱验证
                <VkTooltip content="我们将向此邮箱发送验证码，请确保邮箱地址正确" placement="right">
                  <VkIcon icon="material-symbols:help" class="help-icon"></VkIcon>
                </VkTooltip>
              </label>
              <VkInput v-model="formData.email" placeholder="请输入邮箱地址"></VkInput>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能按钮提示 -->
      <div class="demo-subsection">
        <h3>功能按钮提示</h3>
        <div class="demo-block">
          <div class="toolbar-demo">
            <div class="toolbar">
              <VkTooltip content="新建文档 (Ctrl+N)" placement="bottom">
                <VkButton type="primary" @click="createDocument">
                  <VkIcon icon="material-symbols:add"></VkIcon>
                </VkButton>
              </VkTooltip>
              <VkTooltip content="保存文档 (Ctrl+S)" placement="bottom">
                <VkButton @click="saveDocument">
                  <VkIcon icon="material-symbols:save"></VkIcon>
                </VkButton>
              </VkTooltip>
              <VkTooltip content="打印文档 (Ctrl+P)" placement="bottom">
                <VkButton @click="printDocument">
                  <VkIcon icon="material-symbols:print"></VkIcon>
                </VkButton>
              </VkTooltip>
              <VkTooltip content="撤销操作 (Ctrl+Z)" placement="bottom">
                <VkButton :disabled="!canUndo" @click="undoAction">
                  <VkIcon icon="material-symbols:undo"></VkIcon>
                </VkButton>
              </VkTooltip>
              <VkTooltip content="重做操作 (Ctrl+Y)" placement="bottom">
                <VkButton :disabled="!canRedo" @click="redoAction">
                  <VkIcon icon="material-symbols:redo"></VkIcon>
                </VkButton>
              </VkTooltip>
              <VkTooltip content="全屏模式 (F11)" placement="bottom">
                <VkButton @click="toggleFullscreen">
                  <VkIcon icon="material-symbols:fullscreen"></VkIcon>
                </VkButton>
              </VkTooltip>
            </div>
          </div>
        </div>
      </div>

      <!-- 状态指示器 -->
      <div class="demo-subsection">
        <h3>状态指示器</h3>
        <div class="demo-block">
          <div class="status-demo">
            <div class="status-item">
              <VkTooltip content="服务器运行正常，响应时间: 45ms">
                <div class="status-indicator status-success"></div>
              </VkTooltip>
              <span>Web 服务器</span>
            </div>
            <div class="status-item">
              <VkTooltip content="数据库连接异常，正在重试连接">
                <div class="status-indicator status-warning"></div>
              </VkTooltip>
              <span>数据库</span>
            </div>
            <div class="status-item">
              <VkTooltip content="缓存服务离线，请检查 Redis 配置">
                <div class="status-indicator status-error"></div>
              </VkTooltip>
              <span>缓存服务</span>
            </div>
            <div class="status-item">
              <VkTooltip content="消息队列运行正常，待处理任务: 23">
                <div class="status-indicator status-success"></div>
              </VkTooltip>
              <span>消息队列</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 事件处理 -->
    <section class="demo-section">
      <h2>事件处理</h2>
      <p>Tooltip 的各种事件处理。</p>
      <div class="demo-block">
        <div class="event-demo">
          <VkTooltip content="事件监听提示" @show="handleTooltipShow" @hide="handleTooltipHide">
            <VkButton>监听显示/隐藏事件</VkButton>
          </VkTooltip>
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
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 类型定义
interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

interface FormData {
  username: string;
  password: string;
  email: string;
}

// 基础数据
const tooltipDisabled = ref<boolean>(false);
const manualVisible = ref<boolean>(false);

// 表格数据
const users = ref<User[]>([
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "李四",
    email: "lisi@verylongdomainname.com",
    status: "inactive",
  },
  {
    id: 3,
    name: "王五",
    email: "wangwu@company.example.org",
    status: "active",
  },
]);

// 表单数据
const formData = ref<FormData>({
  username: "",
  password: "",
  email: "",
});

// 工具栏状态
const canUndo = ref<boolean>(true);
const canRedo = ref<boolean>(false);

// 事件日志
const eventLogs = ref<string[]>([]);

// 表格操作方法
const editUser = (user: User): void => {
  addLog(`编辑用户: ${user.name}`);
};

const deleteUser = (user: User): void => {
  addLog(`删除用户: ${user.name}`);
};

const toggleUserStatus = (user: User): void => {
  user.status = user.status === "active" ? "inactive" : "active";
  addLog(`${user.status === "active" ? "启用" : "禁用"}用户: ${user.name}`);
};

// 工具栏方法
const createDocument = (): void => {
  addLog("创建新文档");
};

const saveDocument = (): void => {
  addLog("保存文档");
};

const printDocument = (): void => {
  addLog("打印文档");
};

const undoAction = (): void => {
  addLog("撤销操作");
  canUndo.value = false;
  canRedo.value = true;
};

const redoAction = (): void => {
  addLog("重做操作");
  canUndo.value = true;
  canRedo.value = false;
};

const toggleFullscreen = (): void => {
  addLog("切换全屏模式");
};

// 事件处理方法
const handleTooltipShow = (): void => {
  addLog("Tooltip 显示");
};

const handleTooltipHide = (): void => {
  addLog("Tooltip 隐藏");
};

const addLog = (message: string): void => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};
</script>

<style scoped>
.tooltip-demo {
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
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #303133;
}

.demo-section p {
  margin: 0 0 20px 0;
  color: #606266;
  font-size: 14px;
}

.demo-block {
  padding: 20px;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  background-color: #fafafa;
  margin-bottom: 20px;
}

.demo-code {
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 15px;
}

.demo-code pre {
  margin: 0;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 12px;
  color: #525252;
}

.demo-subsection {
  margin-bottom: 30px;
}

.demo-subsection h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #409eff;
}

.tooltip-grid {
  width: 400px;
  margin: 0 auto;
}

.tooltip-grid .top {
  text-align: center;
  margin-bottom: 20px;
}

.tooltip-grid .left {
  float: left;
  width: 60px;
}

.tooltip-grid .right {
  float: right;
  width: 60px;
}

.tooltip-grid .bottom {
  clear: both;
  text-align: center;
  margin-top: 20px;
}

.tooltip-grid .vk-button {
  margin: 5px;
  width: 80px;
}

.advanced-demo .vk-button {
  margin-right: 15px;
  margin-bottom: 10px;
}

.element-demo {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.demo-text {
  padding: 8px 12px;
  background-color: #f0f9ff;
  border: 1px solid #409eff;
  border-radius: 4px;
  cursor: pointer;
  color: #409eff;
}

.demo-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e4e7ed;
}

.demo-table th,
.demo-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e4e7ed;
}

.demo-table th {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #303133;
}

.email-text {
  cursor: pointer;
  color: #409eff;
}

.form-demo {
  max-width: 400px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.help-icon {
  margin-left: 5px;
  color: #909399;
  cursor: pointer;
  font-size: 14px;
}

.help-icon:hover {
  color: #409eff;
}

.toolbar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.status-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.status-success {
  background-color: #67c23a;
}

.status-warning {
  background-color: #e6a23c;
}

.status-error {
  background-color: #f56c6c;
}

.event-demo {
  margin-bottom: 20px;
}

.event-log {
  margin-top: 20px;
}

.event-log h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #303133;
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 10px;
}

.log-item {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
  padding: 2px 0;
  border-bottom: 1px solid #eee;
}

.log-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
</style>
