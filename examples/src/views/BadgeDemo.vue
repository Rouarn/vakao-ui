<template>
  <div class="badge-demo">
    <h1>Badge 徽章</h1>
    <p>出现在按钮、图标旁的数字或状态标记。</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <p>适用于产品化的设计语言。</p>
      <div class="demo-block">
        <VkBadge :value="12">
          <VkButton>评论</VkButton>
        </VkBadge>
        <VkBadge :value="3">
          <VkButton>回复</VkButton>
        </VkBadge>
        <VkBadge :value="1" type="primary">
          <VkButton>主要</VkButton>
        </VkBadge>
        <VkBadge :value="2" type="warning">
          <VkButton>警告</VkButton>
        </VkBadge>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkBadge :value="12"&gt;
  &lt;VkButton&gt;评论&lt;/VkButton&gt;
&lt;/VkBadge&gt;
&lt;VkBadge :value="3"&gt;
  &lt;VkButton&gt;回复&lt;/VkButton&gt;
&lt;/VkBadge&gt;</code></pre>
      </div>
    </section>

    <!-- 最大值 -->
    <section class="demo-section">
      <h2>最大值</h2>
      <p>可自定义最大值。</p>
      <div class="demo-block">
        <VkBadge :value="200" :max="99">
          <VkButton>评论</VkButton>
        </VkBadge>
        <VkBadge :value="1000" :max="999">
          <VkButton>点赞</VkButton>
        </VkBadge>
        <VkBadge :value="10" :max="9">
          <VkButton>收藏</VkButton>
        </VkBadge>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkBadge :value="200" :max="99"&gt;
  &lt;VkButton&gt;评论&lt;/VkButton&gt;
&lt;/VkBadge&gt;</code></pre>
      </div>
    </section>

    <!-- 自定义内容 -->
    <section class="demo-section">
      <h2>自定义内容</h2>
      <p>可以显示数字以外的文本内容。</p>
      <div class="demo-block">
        <VkBadge value="new">
          <VkButton>最新</VkButton>
        </VkBadge>
        <VkBadge value="hot">
          <VkButton>热门</VkButton>
        </VkBadge>
        <VkBadge value="!">
          <VkButton>重要</VkButton>
        </VkBadge>
        <VkBadge value="VIP">
          <VkButton>会员</VkButton>
        </VkBadge>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkBadge value="new"&gt;
  &lt;VkButton&gt;最新&lt;/VkButton&gt;
&lt;/VkBadge&gt;</code></pre>
      </div>
    </section>

    <!-- 小红点 -->
    <section class="demo-section">
      <h2>小红点</h2>
      <p>以红点的形式标注需要关注的内容。</p>
      <div class="demo-block">
        <VkBadge is-dot>
          <VkButton>数据查询</VkButton>
        </VkBadge>
        <VkBadge is-dot>
          <VkButton>消息中心</VkButton>
        </VkBadge>
        <VkBadge is-dot>
          <VkIcon name="bell" size="24" />
        </VkBadge>
        <VkBadge is-dot>
          <VkIcon name="message" size="24" />
        </VkBadge>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkBadge is-dot&gt;
  &lt;VkButton&gt;数据查询&lt;/VkButton&gt;
&lt;/VkBadge&gt;</code></pre>
      </div>
    </section>

    <!-- 独立使用 -->
    <section class="demo-section">
      <h2>独立使用</h2>
      <p>不包裹任何元素即为独立使用，可自定义样式。</p>
      <div class="demo-block">
        <VkBadge :value="25" />
        <VkBadge :value="4" type="primary" />
        <VkBadge :value="10" type="warning" />
        <VkBadge :value="16" type="danger" />
        <VkBadge :value="6" type="info" />
        <VkBadge value="new" />
        <VkBadge is-dot />
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkBadge :value="25" /&gt;
&lt;VkBadge :value="4" type="primary" /&gt;</code></pre>
      </div>
    </section>

    <!-- 不同类型 -->
    <section class="demo-section">
      <h2>不同类型</h2>
      <p>用不同的颜色来代表不同的含义。</p>
      <div class="demo-block">
        <VkBadge :value="5" type="primary">
          <VkButton>主要</VkButton>
        </VkBadge>
        <VkBadge :value="5" type="success">
          <VkButton>成功</VkButton>
        </VkBadge>
        <VkBadge :value="5" type="warning">
          <VkButton>警告</VkButton>
        </VkBadge>
        <VkBadge :value="5" type="danger">
          <VkButton>危险</VkButton>
        </VkBadge>
        <VkBadge :value="5" type="info">
          <VkButton>信息</VkButton>
        </VkBadge>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkBadge :value="5" type="primary"&gt;
  &lt;VkButton&gt;主要&lt;/VkButton&gt;
&lt;/VkBadge&gt;</code></pre>
      </div>
    </section>

    <!-- 动态效果 -->
    <section class="demo-section">
      <h2>动态效果</h2>
      <p>展示动态变化的徽章效果。</p>
      <div class="demo-block">
        <VkBadge :value="dynamicValue">
          <VkButton @click="increaseDynamic">点击增加</VkButton>
        </VkBadge>
        <VkBadge :value="messageCount" :max="99">
          <VkButton @click="addMessage">新消息</VkButton>
        </VkBadge>
        <VkBadge :is-dot="showDot">
          <VkButton @click="toggleDot">切换红点</VkButton>
        </VkBadge>
        <VkButton @click="resetAll" type="danger">重置所有</VkButton>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkBadge :value="dynamicValue"&gt;
  &lt;VkButton @click="increaseDynamic"&gt;点击增加&lt;/VkButton&gt;
&lt;/VkBadge&gt;</code></pre>
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section">
      <h2>实际应用场景</h2>
      <p>在实际项目中的常见使用场景。</p>

      <!-- 导航菜单 -->
      <div class="demo-subsection">
        <h3>导航菜单</h3>
        <div class="demo-block navigation-demo">
          <div class="nav-item">
            <VkBadge :value="unreadMessages" :max="99">
              <VkIcon name="message" size="20" />
              <span>消息</span>
            </VkBadge>
          </div>
          <div class="nav-item">
            <VkBadge :value="notifications" :max="9">
              <VkIcon name="bell" size="20" />
              <span>通知</span>
            </VkBadge>
          </div>
          <div class="nav-item">
            <VkBadge is-dot v-if="hasUpdate">
              <VkIcon name="settings" size="20" />
              <span>设置</span>
            </VkBadge>
            <div v-else class="nav-content">
              <VkIcon name="settings" size="20" />
              <span>设置</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 购物车 -->
      <div class="demo-subsection">
        <h3>购物车</h3>
        <div class="demo-block cart-demo">
          <VkBadge :value="cartItems" :max="99">
            <VkButton type="primary">
              <VkIcon name="shopping-cart" />
              购物车
            </VkButton>
          </VkBadge>
          <VkButton @click="addToCart" style="margin-left: 10px">添加商品</VkButton>
          <VkButton @click="clearCart" type="danger" style="margin-left: 10px">清空购物车</VkButton>
        </div>
      </div>

      <!-- 状态标记 -->
      <div class="demo-subsection">
        <h3>状态标记</h3>
        <div class="demo-block status-demo">
          <div class="status-item">
            <VkBadge value="在线" type="success">
              <VkAvatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </VkBadge>
            <span>张三</span>
          </div>
          <div class="status-item">
            <VkBadge value="忙碌" type="warning">
              <VkAvatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </VkBadge>
            <span>李四</span>
          </div>
          <div class="status-item">
            <VkBadge value="离线" type="info">
              <VkAvatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </VkBadge>
            <span>王五</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 事件处理 -->
    <section class="demo-section">
      <h2>事件处理</h2>
      <p>徽章的点击事件处理。</p>
      <div class="demo-block">
        <VkBadge :value="clickCount" @click="handleBadgeClick">
          <VkButton>点击徽章</VkButton>
        </VkBadge>
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

<script setup>
import { ref } from "vue";

// 动态数据
const dynamicValue = ref(1);
const messageCount = ref(5);
const showDot = ref(true);
const unreadMessages = ref(12);
const notifications = ref(3);
const hasUpdate = ref(true);
const cartItems = ref(2);
const clickCount = ref(0);
const eventLogs = ref([]);

// 方法
const increaseDynamic = () => {
  dynamicValue.value++;
  addLog(`动态值增加到: ${dynamicValue.value}`);
};

const addMessage = () => {
  messageCount.value++;
  addLog(`消息数量增加到: ${messageCount.value}`);
};

const toggleDot = () => {
  showDot.value = !showDot.value;
  addLog(`红点状态切换为: ${showDot.value ? "显示" : "隐藏"}`);
};

const resetAll = () => {
  dynamicValue.value = 1;
  messageCount.value = 5;
  showDot.value = true;
  clickCount.value = 0;
  addLog("所有数据已重置");
};

const addToCart = () => {
  cartItems.value++;
  addLog(`购物车商品数量: ${cartItems.value}`);
};

const clearCart = () => {
  cartItems.value = 0;
  addLog("购物车已清空");
};

const handleBadgeClick = () => {
  clickCount.value++;
  addLog(`徽章被点击，点击次数: ${clickCount.value}`);
};

const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};
</script>

<style scoped>
.badge-demo {
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
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
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

.navigation-demo {
  display: flex;
  gap: 30px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #f0f9ff;
}

.nav-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.cart-demo {
  align-items: center;
}

.status-demo {
  display: flex;
  gap: 30px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.event-log {
  margin-left: 30px;
  flex: 1;
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
