<template>
  <div class="image-demo">
    <h1>Image 图片</h1>
    <p>图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等。</p>

    <!-- 基础用法 -->
    <section class="demo-section">
      <h2>基础用法</h2>
      <p>可通过 fit 确定图片如何适应到容器框，同原生 object-fit。</p>
      <div class="demo-block">
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" :src="imageUrl" fit="fill" />
          <span>fill</span>
        </div>
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" :src="imageUrl" fit="contain" />
          <span>contain</span>
        </div>
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" :src="imageUrl" fit="cover" />
          <span>cover</span>
        </div>
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" :src="imageUrl" fit="none" />
          <span>none</span>
        </div>
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" :src="imageUrl" fit="scale-down" />
          <span>scale-down</span>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkImage
  style="width: 100px; height: 100px"
  :src="imageUrl"
  fit="cover"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 占位内容 -->
    <section class="demo-section">
      <h2>占位内容</h2>
      <p>可通过 slot = placeholder 可自定义占位内容。</p>
      <div class="demo-block">
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" :src="slowImageUrl">
            <template #placeholder>
              <div class="image-placeholder">
                <VkIcon icon="material-symbols:image" size="30" />
                <span>加载中...</span>
              </div>
            </template>
          </VkImage>
          <span>自定义占位</span>
        </div>
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" :src="slowImageUrl">
            <template #placeholder>
              <div class="loading-placeholder">
                <div class="loading-spinner"></div>
              </div>
            </template>
          </VkImage>
          <span>加载动画</span>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkImage :src="imageUrl"&gt;
  &lt;template #placeholder&gt;
    &lt;div class="image-placeholder"&gt;
      &lt;Icon icon="material-symbols:image" /&gt;
      &lt;span&gt;加载中...&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/VkImage&gt;</code></pre>
      </div>
    </section>

    <!-- 加载失败 -->
    <section class="demo-section">
      <h2>加载失败</h2>
      <p>可通过 slot = error 可自定义加载失败内容。</p>
      <div class="demo-block">
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" src="https://invalid-url.jpg">
            <template #error>
              <div class="image-error">
                <VkIcon icon="material-symbols:image" size="30" />
                <span>加载失败</span>
              </div>
            </template>
          </VkImage>
          <span>自定义错误</span>
        </div>
        <div class="image-container">
          <VkImage style="width: 100px; height: 100px" src="https://invalid-url.jpg">
            <template #error>
              <div class="error-placeholder">
                <VkIcon icon="material-symbols:close" size="24" color="#f56c6c" />
                <span>图片无法显示</span>
              </div>
            </template>
          </VkImage>
          <span>错误提示</span>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkImage src="invalid-url.jpg"&gt;
  &lt;template #error&gt;
    &lt;div class="image-error"&gt;
      &lt;Icon icon="material-symbols:image" /&gt;
      &lt;span&gt;加载失败&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/VkImage&gt;</code></pre>
      </div>
    </section>

    <!-- 懒加载 -->
    <section class="demo-section">
      <h2>懒加载</h2>
      <p>可通过 lazy 开启懒加载功能，当图片滚动到可视范围内才会加载。</p>
      <div class="demo-block">
        <div class="lazy-container">
          <div v-for="(url, index) in lazyImages" :key="index" class="lazy-item">
            <VkImage style="width: 200px; height: 150px" :src="url" lazy fit="cover">
              <template #placeholder>
                <div class="lazy-placeholder">
                  <VkIcon icon="material-symbols:image" size="40" />
                  <span>图片 {{ index + 1 }}</span>
                </div>
              </template>
            </VkImage>
          </div>
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkImage
  :src="imageUrl"
  lazy
  fit="cover"
&gt;
  &lt;template #placeholder&gt;
    &lt;div class="lazy-placeholder"&gt;
      &lt;Icon icon="material-symbols:image" /&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/VkImage&gt;</code></pre>
      </div>
    </section>

    <!-- 图片预览 -->
    <section class="demo-section">
      <h2>图片预览</h2>
      <p>可通过 preview-src-list 开启预览大图的功能。</p>
      <div class="demo-block">
        <div class="preview-container">
          <VkImage
            v-for="(url, index) in previewImages"
            :key="index"
            style="width: 100px; height: 100px; margin-right: 10px"
            :src="url"
            :preview-src-list="previewImages"
            :initial-index="index"
            fit="cover"
          />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkImage
  :src="imageUrl"
  :preview-src-list="previewImages"
  :initial-index="0"
  fit="cover"
/&gt;</code></pre>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="demo-section">
      <h2>不同尺寸</h2>
      <p>支持不同的图片尺寸展示。</p>
      <div class="demo-block">
        <div class="size-container">
          <div class="size-item">
            <VkImage style="width: 50px; height: 50px" :src="imageUrl" fit="cover" />
            <span>小图 50x50</span>
          </div>
          <div class="size-item">
            <VkImage style="width: 100px; height: 100px" :src="imageUrl" fit="cover" />
            <span>中图 100x100</span>
          </div>
          <div class="size-item">
            <VkImage style="width: 150px; height: 150px" :src="imageUrl" fit="cover" />
            <span>大图 150x150</span>
          </div>
          <div class="size-item">
            <VkImage style="width: 200px; height: 120px" :src="imageUrl" fit="cover" />
            <span>矩形 200x120</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 圆形图片 -->
    <section class="demo-section">
      <h2>圆形图片</h2>
      <p>通过样式设置实现圆形图片效果。</p>
      <div class="demo-block">
        <div class="circle-container">
          <VkImage class="circle-image" style="width: 80px; height: 80px" :src="avatarUrl" fit="cover" />
          <VkImage class="circle-image" style="width: 100px; height: 100px" :src="avatarUrl" fit="cover" />
          <VkImage class="circle-image" style="width: 120px; height: 120px" :src="avatarUrl" fit="cover" />
        </div>
      </div>
      <div class="demo-code">
        <pre><code>&lt;VkImage
  class="circle-image"
  style="width: 100px; height: 100px"
  :src="avatarUrl"
  fit="cover"
/&gt;

&lt;style&gt;
.circle-image {
  border-radius: 50%;
}
&lt;/style&gt;</code></pre>
      </div>
    </section>

    <!-- 实际应用场景 -->
    <section class="demo-section">
      <h2>实际应用场景</h2>
      <p>在实际项目中的常见使用场景。</p>

      <!-- 商品展示 -->
      <div class="demo-subsection">
        <h3>商品展示</h3>
        <div class="demo-block">
          <div class="product-grid">
            <div v-for="product in products" :key="product.id" class="product-card">
              <VkImage class="product-image" :src="product.image" fit="cover" :preview-src-list="[product.image]">
                <template #placeholder>
                  <div class="product-placeholder">
                    <VkIcon icon="material-symbols:image" size="30" />
                  </div>
                </template>
                <template #error>
                  <div class="product-error">
                    <VkIcon icon="material-symbols:image" size="30" />
                    <span>图片加载失败</span>
                  </div>
                </template>
              </VkImage>
              <div class="product-info">
                <h4>{{ product.name }}</h4>
                <p class="product-price">¥{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 用户头像 -->
      <div class="demo-subsection">
        <h3>用户头像</h3>
        <div class="demo-block">
          <div class="avatar-list">
            <div v-for="user in users" :key="user.id" class="user-item">
              <VkImage class="user-avatar" :src="user.avatar" fit="cover">
                <template #error>
                  <div class="avatar-fallback">
                    {{ user.name.charAt(0) }}
                  </div>
                </template>
              </VkImage>
              <span class="user-name">{{ user.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 图片画廊 -->
      <div class="demo-subsection">
        <h3>图片画廊</h3>
        <div class="demo-block">
          <div class="gallery-grid">
            <VkImage
              v-for="(image, index) in galleryImages"
              :key="index"
              class="gallery-item"
              :src="image"
              :preview-src-list="galleryImages"
              :initial-index="index"
              fit="cover"
              lazy
            >
              <template #placeholder>
                <div class="gallery-placeholder">
                  <div class="loading-spinner"></div>
                </div>
              </template>
            </VkImage>
          </div>
        </div>
      </div>
    </section>

    <!-- 事件处理 -->
    <section class="demo-section">
      <h2>事件处理</h2>
      <p>图片的各种事件处理。</p>
      <div class="demo-block">
        <div class="event-demo">
          <VkImage
            style="width: 200px; height: 150px"
            :src="eventImageUrl"
            fit="cover"
            @load="handleLoad"
            @error="handleError"
            @click="handleClick"
          >
            <template #placeholder>
              <div class="event-placeholder">
                <VkIcon icon="material-symbols:image" size="40" />
                <span>点击刷新</span>
              </div>
            </template>
          </VkImage>
          <div class="event-controls">
            <VkButton @click="refreshImage">刷新图片</VkButton>
            <VkButton type="warning" @click="loadErrorImage">加载错误图片</VkButton>
            <VkButton type="danger" @click="clearLogs">清空日志</VkButton>
          </div>
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
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

// 图片数据
const imageUrl = ref<string>("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
const slowImageUrl = ref<string>("https://picsum.photos/400/300?random=1");
const avatarUrl = ref<string>("https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png");
const eventImageUrl = ref<string>("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");

// 懒加载图片列表
const lazyImages = ref<string[]>([
  "https://picsum.photos/400/300?random=1",
  "https://picsum.photos/400/300?random=2",
  "https://picsum.photos/400/300?random=3",
  "https://picsum.photos/400/300?random=4",
  "https://picsum.photos/400/300?random=5",
  "https://picsum.photos/400/300?random=6",
]);

// 预览图片列表
const previewImages = ref<string[]>([
  "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
]);

// 商品数据
const products = ref<Product[]>([
  {
    id: 1,
    name: "时尚T恤",
    price: 99,
    image: "https://picsum.photos/200/200?random=10",
  },
  {
    id: 2,
    name: "休闲裤",
    price: 199,
    image: "https://picsum.photos/200/200?random=11",
  },
  {
    id: 3,
    name: "运动鞋",
    price: 299,
    image: "https://picsum.photos/200/200?random=12",
  },
  {
    id: 4,
    name: "背包",
    price: 159,
    image: "https://picsum.photos/200/200?random=13",
  },
]);

// 用户数据
const users = ref<User[]>([
  {
    id: 1,
    name: "张三",
    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
  {
    id: 2,
    name: "李四",
    avatar: "https://invalid-avatar-url.jpg",
  },
  {
    id: 3,
    name: "王五",
    avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
  },
  {
    id: 4,
    name: "赵六",
    avatar: "https://invalid-avatar-url-2.jpg",
  },
]);

// 画廊图片
const galleryImages = ref<string[]>([
  "https://picsum.photos/300/200?random=20",
  "https://picsum.photos/300/200?random=21",
  "https://picsum.photos/300/200?random=22",
  "https://picsum.photos/300/200?random=23",
  "https://picsum.photos/300/200?random=24",
  "https://picsum.photos/300/200?random=25",
  "https://picsum.photos/300/200?random=26",
  "https://picsum.photos/300/200?random=27",
  "https://picsum.photos/300/200?random=28",
]);

// 事件日志
const eventLogs = ref<string[]>([]);

// 事件处理方法
const handleLoad = (): void => {
  addLog("图片加载成功");
};

const handleError = (): void => {
  addLog("图片加载失败");
};

const handleClick = (): void => {
  addLog("图片被点击");
};

const refreshImage = (): void => {
  eventImageUrl.value = `https://picsum.photos/400/300?random=${Date.now()}`;
  addLog("刷新图片");
};

const loadErrorImage = (): void => {
  eventImageUrl.value = "https://invalid-image-url.jpg";
  addLog("尝试加载错误图片");
};

const clearLogs = (): void => {
  eventLogs.value = [];
  addLog("日志已清空");
};

const addLog = (message: string): void => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop();
  }
};
</script>

<style lang="scss" scoped>
.image-demo {
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

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
}

.image-container span {
  font-size: 12px;
  color: #666;
}

.image-placeholder,
.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 12px;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #e4e7ed;
  border-top: 2px solid #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fef0f0;
  color: #f56c6c;
  font-size: 12px;
}

.lazy-container {
  max-height: 400px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.lazy-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lazy-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 12px;
}

.preview-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.size-container {
  display: flex;
  gap: 20px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.size-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.size-item span {
  font-size: 12px;
  color: #666;
}

.circle-container {
  display: flex;
  gap: 20px;
  align-items: center;
}

.circle-image {
  border-radius: 50%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 150px;
}

.product-placeholder,
.product-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 12px;
}

.product-info {
  padding: 15px;
}

.product-info h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #303133;
}

.product-price {
  margin: 0;
  font-size: 16px;
  color: #f56c6c;
  font-weight: bold;
}

.avatar-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.avatar-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #409eff;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.user-name {
  font-size: 14px;
  color: #303133;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
}

.gallery-item {
  width: 100%;
  height: 120px;
  cursor: pointer;
  transition: transform 0.3s;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
}

.event-demo {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.event-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 12px;
  cursor: pointer;
}

.event-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
