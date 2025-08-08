<template>
  <div class="card-demo">
    <div class="demo-header">
      <h1>Card 卡片</h1>
      <p>将信息聚合在卡片容器中展示，是页面内容的基础容器。</p>
    </div>

    <!-- 基础用法 -->
    <div class="demo-section">
      <h2>基础用法</h2>
      <p>卡片包含标题、内容和操作。</p>
      <div class="demo-block">
        <VkSpace>
          <VkCard class="demo-card">
            <template #header>
              <div class="card-header">
                <span>卡片名称</span>
                <VkButton text type="primary">操作按钮</VkButton>
              </div>
            </template>
            <div class="card-content">
              列表内容 1<br />
              列表内容 2<br />
              列表内容 3<br />
              列表内容 4
            </div>
          </VkCard>
        </VkSpace>
      </div>
    </div>

    <!-- 简单卡片 -->
    <div class="demo-section">
      <h2>简单卡片</h2>
      <p>卡片可以只有内容区域。</p>
      <div class="demo-block">
        <VkSpace>
          <VkCard class="demo-card">
            <div class="simple-content">
              <h3>简单卡片</h3>
              <p>这是一个简单的卡片示例，只包含内容区域，没有头部和底部。</p>
              <p>卡片内容可以是任意的 HTML 元素。</p>
            </div>
          </VkCard>
        </VkSpace>
      </div>
    </div>

    <!-- 带图片的卡片 -->
    <div class="demo-section">
      <h2>带图片的卡片</h2>
      <p>可配置定义更丰富的内容。</p>
      <div class="demo-block">
        <VkSpace wrap>
          <VkCard class="demo-card image-card">
            <div class="image-container">
              <img src="https://picsum.photos/300/200?random=1" alt="示例图片" />
            </div>
            <div class="card-content">
              <h3>图片标题</h3>
              <p>这里是图片的描述信息，可以包含更多的详细内容。</p>
              <VkSpace>
                <VkButton type="primary" size="small">查看详情</VkButton>
                <VkButton size="small">分享</VkButton>
              </VkSpace>
            </div>
          </VkCard>

          <VkCard class="demo-card image-card">
            <div class="image-container">
              <img src="https://picsum.photos/300/200?random=2" alt="示例图片" />
            </div>
            <div class="card-content">
              <h3>另一个标题</h3>
              <p>不同的图片和内容展示。</p>
              <VkSpace>
                <VkButton type="success" size="small">下载</VkButton>
                <VkButton size="small">收藏</VkButton>
              </VkSpace>
            </div>
          </VkCard>
        </VkSpace>
      </div>
    </div>

    <!-- 卡片阴影 -->
    <div class="demo-section">
      <h2>卡片阴影</h2>
      <p>可对阴影的显示进行配置。</p>
      <div class="demo-block">
        <VkSpace wrap>
          <VkCard shadow="always" class="demo-card">
            <div class="card-content">
              <h4>总是显示</h4>
              <p>shadow="always"</p>
            </div>
          </VkCard>

          <VkCard shadow="hover" class="demo-card">
            <div class="card-content">
              <h4>鼠标悬浮时显示</h4>
              <p>shadow="hover"</p>
            </div>
          </VkCard>

          <VkCard shadow="never" class="demo-card">
            <div class="card-content">
              <h4>从不显示</h4>
              <p>shadow="never"</p>
            </div>
          </VkCard>
        </VkSpace>
      </div>
    </div>

    <!-- 用户信息卡片 -->
    <div class="demo-section">
      <h2>用户信息卡片</h2>
      <p>展示用户信息的卡片示例。</p>
      <div class="demo-block">
        <VkSpace wrap>
          <VkCard v-for="user in users" :key="user.id" class="demo-card user-card">
            <div class="user-info">
              <VkAvatar :size="60" :src="user.avatar" />
              <div class="user-details">
                <h3>{{ user.name }}</h3>
                <p>{{ user.title }}</p>
                <div class="user-stats">
                  <span>关注者: {{ user.followers }}</span>
                  <span>关注: {{ user.following }}</span>
                </div>
              </div>
            </div>
            <VkSpace>
              <VkButton type="primary" size="small">关注</VkButton>
              <VkButton size="small">消息</VkButton>
            </VkSpace>
          </VkCard>
        </VkSpace>
      </div>
    </div>

    <!-- 产品卡片 -->
    <div class="demo-section">
      <h2>产品卡片</h2>
      <p>展示产品信息的卡片示例。</p>
      <div class="demo-block">
        <VkSpace wrap>
          <VkCard v-for="product in products" :key="product.id" class="demo-card product-card">
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
              <VkBadge v-if="product.discount" :value="product.discount" class="discount-badge" />
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">
                <span class="current-price">¥{{ product.price }}</span>
                <span v-if="product.originalPrice" class="original-price">¥{{ product.originalPrice }}</span>
              </div>
              <div class="product-rating">
                <span class="rating">★★★★☆</span>
                <span class="rating-text">({{ product.rating }})</span>
              </div>
            </div>
            <VkSpace>
              <VkButton type="primary" size="small" @click="addToCart(product)">加入购物车</VkButton>
              <VkButton size="small" @click="buyNow(product)">立即购买</VkButton>
            </VkSpace>
          </VkCard>
        </VkSpace>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="demo-section">
      <h2>统计卡片</h2>
      <p>展示统计数据的卡片示例。</p>
      <div class="demo-block">
        <VkSpace wrap>
          <VkCard v-for="stat in stats" :key="stat.title" class="demo-card stat-card">
            <div class="stat-content">
              <div class="stat-icon" :style="{ color: stat.color }">
                {{ stat.icon }}
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-title">{{ stat.title }}</div>
                <div class="stat-change" :class="stat.trend">
                  {{ stat.change }}
                </div>
              </div>
            </div>
          </VkCard>
        </VkSpace>
      </div>
    </div>

    <!-- 交互式卡片 -->
    <div class="demo-section">
      <h2>交互式卡片</h2>
      <p>支持点击、悬浮等交互效果的卡片。</p>
      <div class="demo-block">
        <VkSpace wrap>
          <VkCard v-for="item in interactiveItems" :key="item.id" class="demo-card interactive-card" @click="handleCardClick(item)">
            <div class="interactive-content">
              <div class="item-icon">{{ item.icon }}</div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <div class="item-status" :class="item.status">
                {{ item.statusText }}
              </div>
            </div>
          </VkCard>
        </VkSpace>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 用户数据
const users = ref([
  {
    id: 1,
    name: "张三",
    title: "前端开发工程师",
    avatar: "https://picsum.photos/120/120?random=10",
    followers: 1234,
    following: 567,
  },
  {
    id: 2,
    name: "李四",
    title: "UI/UX 设计师",
    avatar: "https://picsum.photos/120/120?random=11",
    followers: 2345,
    following: 123,
  },
  {
    id: 3,
    name: "王五",
    title: "产品经理",
    avatar: "https://picsum.photos/120/120?random=12",
    followers: 3456,
    following: 234,
  },
]);

// 产品数据
const products = ref([
  {
    id: 1,
    name: "无线蓝牙耳机",
    description: "高品质音效，长续航，舒适佩戴",
    price: 299,
    originalPrice: 399,
    discount: "-25%",
    rating: 4.8,
    image: "https://picsum.photos/200/150?random=20",
  },
  {
    id: 2,
    name: "智能手表",
    description: "健康监测，运动追踪，智能提醒",
    price: 1299,
    originalPrice: null,
    discount: null,
    rating: 4.6,
    image: "https://picsum.photos/200/150?random=21",
  },
  {
    id: 3,
    name: "便携充电宝",
    description: "大容量，快充技术，轻薄便携",
    price: 89,
    originalPrice: 129,
    discount: "-31%",
    rating: 4.9,
    image: "https://picsum.photos/200/150?random=22",
  },
]);

// 统计数据
const stats = ref([
  {
    title: "总用户数",
    value: "12,345",
    icon: "👥",
    color: "#409eff",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "总收入",
    value: "¥234,567",
    icon: "💰",
    color: "#67c23a",
    change: "+8.2%",
    trend: "up",
  },
  {
    title: "订单数量",
    value: "3,456",
    icon: "📦",
    color: "#e6a23c",
    change: "-2.1%",
    trend: "down",
  },
  {
    title: "活跃用户",
    value: "8,901",
    icon: "⚡",
    color: "#f56c6c",
    change: "+15.3%",
    trend: "up",
  },
]);

// 交互式项目
const interactiveItems = ref([
  {
    id: 1,
    title: "项目 Alpha",
    description: "正在开发中的新功能",
    icon: "🚀",
    status: "active",
    statusText: "进行中",
  },
  {
    id: 2,
    title: "项目 Beta",
    description: "即将发布的版本",
    icon: "🎯",
    status: "pending",
    statusText: "待发布",
  },
  {
    id: 3,
    title: "项目 Gamma",
    description: "已完成的项目",
    icon: "✅",
    status: "completed",
    statusText: "已完成",
  },
]);

// 事件处理函数
const addToCart = (product: any) => {
  alert(`已将 ${product.name} 加入购物车`);
};

const buyNow = (product: any) => {
  alert(`立即购买 ${product.name}`);
};

const handleCardClick = (item: any) => {
  alert(`点击了 ${item.title}`);
};
</script>

<style scoped>
.card-demo {
  max-width: 1200px;
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

.demo-block {
  padding: 24px;
  background: #fafbfc;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  margin-bottom: 16px;
}

.demo-card {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  padding: 16px 0;
  line-height: 1.6;
}

.simple-content h3 {
  margin: 0 0 12px 0;
  color: #2c3e50;
}

.simple-content p {
  margin: 0 0 12px 0;
  color: #666;
  line-height: 1.6;
}

.image-card {
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-card {
  padding: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-details {
  margin-left: 16px;
  flex: 1;
}

.user-details h3 {
  margin: 0 0 4px 0;
  color: #2c3e50;
  font-size: 18px;
}

.user-details p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.user-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
}

.product-card {
  overflow: hidden;
}

.product-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

.product-info {
  padding: 16px;
}

.product-info h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 16px;
}

.product-description {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.product-price {
  margin-bottom: 8px;
}

.current-price {
  color: #e74c3c;
  font-size: 18px;
  font-weight: bold;
}

.original-price {
  margin-left: 8px;
  color: #999;
  text-decoration: line-through;
  font-size: 14px;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.rating {
  color: #f39c12;
  margin-right: 4px;
}

.rating-text {
  color: #666;
  font-size: 12px;
}

.stat-card {
  padding: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  font-size: 32px;
  margin-right: 16px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 4px;
}

.stat-title {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
}

.stat-change.up {
  color: #67c23a;
}

.stat-change.down {
  color: #f56c6c;
}

.interactive-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.interactive-card:hover {
  transform: translateY(-4px);
}

.interactive-content {
  text-align: center;
  padding: 20px;
}

.item-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.interactive-content h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.interactive-content p {
  margin: 0 0 16px 0;
  color: #666;
  font-size: 14px;
}

.item-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.item-status.active {
  background: #e1f3d8;
  color: #67c23a;
}

.item-status.pending {
  background: #fdf6ec;
  color: #e6a23c;
}

.item-status.completed {
  background: #e1f3ff;
  color: #409eff;
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
