# useFullscreen

一个全屏控制 Hook，提供简洁的 API 来进入和退出全屏模式。支持元素全屏和整个页面全屏，自动处理浏览器兼容性和状态管理。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🖥️ 基础全屏控制</h3>
    <!-- 页面全屏 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">页面全屏</h4>
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
        <vk-button @click="() => pageToggle()" :type="pageIsFullscreen ? 'primary' : 'default'" size="small">
          {{ pageIsFullscreen ? '退出全屏' : '进入全屏' }}
        </vk-button>
        <vk-button @click="() => pageEnter()" :disabled="pageIsFullscreen" size="small">进入</vk-button>
        <vk-button @click="() => pageExit()" :disabled="!pageIsFullscreen" size="small">退出</vk-button>
      </div>
      <div style="padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px; font-size: 14px;">
        <div style="margin-bottom: 4px;">状态: <strong>{{ pageIsFullscreen ? '全屏模式' : '普通模式' }}</strong></div>
        <div style="font-size: 12px; color: #666;">支持: {{ pageIsSupported ? '✅ 是' : '❌ 否' }}</div>
      </div>
    </div>
    <!-- 元素全屏 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">元素全屏</h4>
      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
        <vk-button @click="() => elementToggle()" :type="elementIsFullscreen ? 'primary' : 'default'" size="small">
          {{ elementIsFullscreen ? '退出全屏' : '元素全屏' }}
        </vk-button>
        <vk-button @click="() => elementEnter()" :disabled="elementIsFullscreen" size="small">进入</vk-button>
        <vk-button @click="() => elementExit()" :disabled="!elementIsFullscreen" size="small">退出</vk-button>
      </div>
      <div ref="fullscreenElementRef" 
           style="width: 100%; height: 200px; border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-weight: bold; user-select: none; transition: all 0.3s; position: relative;"
           :style="{ 
             background: elementIsFullscreen 
               ? 'linear-gradient(45deg, #722ed1, #eb2f96)' 
               : 'linear-gradient(45deg, #1890ff, #52c41a)'
           }">
        <div style="font-size: 18px; margin-bottom: 8px;">{{ elementIsFullscreen ? '🎯 全屏中' : '📱 点击全屏' }}</div>
        <div style="font-size: 14px; opacity: 0.9;">{{ elementIsFullscreen ? '按 ESC 退出' : '或使用按钮控制' }}</div>
        <div v-if="elementIsFullscreen" style="position: absolute; top: 20px; right: 20px; font-size: 12px; opacity: 0.8;">
          全屏模式
        </div>
      </div>
      <div style="margin-top: 12px; padding: 12px; background: #f0f0f0; border-radius: 6px; font-size: 14px;">
        <div style="margin-bottom: 4px;">元素状态: <strong>{{ elementIsFullscreen ? '全屏模式' : '普通模式' }}</strong></div>
        <div style="font-size: 12px; color: #666;">支持: {{ elementIsSupported ? '✅ 是' : '❌ 否' }}</div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 页面全屏 -->
    <div>
      <h4>页面全屏</h4>
      <div>
        <vk-button
          @click="pageToggle"
          :type="pageIsFullscreen ? 'primary' : 'default'"
        >
          {{ pageIsFullscreen ? "退出全屏" : "进入全屏" }}
        </vk-button>
        <vk-button @click="pageEnter" :disabled="pageIsFullscreen"
          >进入</vk-button
        >
        <vk-button @click="pageExit" :disabled="!pageIsFullscreen"
          >退出</vk-button
        >
      </div>
      <div class="status-info">
        <div>
          状态:
          <strong>{{ pageIsFullscreen ? "全屏模式" : "普通模式" }}</strong>
        </div>
        <div>支持: {{ pageIsSupported ? "✅ 是" : "❌ 否" }}</div>
      </div>
    </div>

    <!-- 元素全屏 -->
    <div>
      <h4>元素全屏</h4>
      <div>
        <vk-button
          @click="elementToggle"
          :type="elementIsFullscreen ? 'primary' : 'default'"
        >
          {{ elementIsFullscreen ? "退出全屏" : "元素全屏" }}
        </vk-button>
        <vk-button @click="elementEnter" :disabled="elementIsFullscreen"
          >进入</vk-button
        >
        <vk-button @click="elementExit" :disabled="!elementIsFullscreen"
          >退出</vk-button
        >
      </div>
      <div
        ref="fullscreenElementRef"
        class="fullscreen-target"
        :class="{ fullscreen: elementIsFullscreen }"
        @click="elementToggle"
      >
        <div>{{ elementIsFullscreen ? "🎯 全屏中" : "📱 点击全屏" }}</div>
        <div>{{ elementIsFullscreen ? "按 ESC 退出" : "或使用按钮控制" }}</div>
        <div v-if="elementIsFullscreen" class="fullscreen-indicator">
          全屏模式
        </div>
      </div>
      <div class="element-status">
        <div>
          元素状态:
          <strong>{{ elementIsFullscreen ? "全屏模式" : "普通模式" }}</strong>
        </div>
        <div>支持: {{ elementIsSupported ? "✅ 是" : "❌ 否" }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from "@vakao-ui/hooks";
import { ref } from "vue";

// 页面全屏
const [pageIsFullscreen, pageToggle, pageEnter, pageExit, pageIsSupported] =
  useFullscreen();

// 元素全屏
const fullscreenElementRef = ref<HTMLElement>();
const [
  elementIsFullscreen,
  elementToggle,
  elementEnter,
  elementExit,
  elementIsSupported,
] = useFullscreen(fullscreenElementRef);
</script>

<style scoped>
.status-info {
  padding: 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  font-size: 14px;
}

.status-info > div:first-child {
  margin-bottom: 4px;
}

.status-info > div:last-child {
  font-size: 12px;
  color: #666;
}

.fullscreen-target {
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #1890ff, #52c41a);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  user-select: none;
  transition: all 0.3s;
  position: relative;
}

.fullscreen-target.fullscreen {
  background: linear-gradient(45deg, #722ed1, #eb2f96);
}

.fullscreen-target > div:first-child {
  font-size: 18px;
  margin-bottom: 8px;
}

.fullscreen-target > div:nth-child(2) {
  font-size: 14px;
  opacity: 0.9;
}

.fullscreen-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  opacity: 0.8;
}

.element-status {
  margin-top: 12px;
  padding: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 14px;
}

.element-status > div:first-child {
  margin-bottom: 4px;
}

.element-status > div:last-child {
  font-size: 12px;
  color: #666;
}
</style>
```

  </template>
</Demo>

## 高级用法示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">⚡ 高级全屏功能</h3>
    <!-- 视频播放器示例 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">视频播放器</h4>
      <div ref="videoPlayerRef" 
           style="position: relative; width: 100%; height: 240px; background: #000; border-radius: 8px; overflow: hidden; cursor: pointer;"
           @click="() => videoToggle()">
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white;">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 12px;">{{ videoIsPlaying ? '⏸️' : '▶️' }}</div>
            <div style="font-size: 16px; margin-bottom: 8px;">{{ videoIsFullscreen ? '全屏播放中' : '模拟视频播放器' }}</div>
            <div style="font-size: 14px; opacity: 0.8;">点击{{ videoIsFullscreen ? '退出' : '进入' }}全屏</div>
          </div>
        </div>
        <div v-if="videoIsFullscreen" style="position: absolute; top: 20px; left: 20px; color: white; font-size: 12px; opacity: 0.8;">
          全屏模式 - 按 ESC 退出
        </div>
        <div style="position: absolute; bottom: 20px; right: 20px; display: flex; gap: 8px;">
          <button @click.stop="() => togglePlay()" 
                  style="padding: 8px 12px; background: rgba(255,255,255,0.2); border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 12px;">
            {{ videoIsPlaying ? '暂停' : '播放' }}
          </button>
          <button @click.stop="() => videoToggle()" 
                  style="padding: 8px 12px; background: rgba(255,255,255,0.2); border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 12px;">
            {{ videoIsFullscreen ? '退出全屏' : '全屏' }}
          </button>
        </div>
      </div>
    </div>
    <!-- 图片查看器示例 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">图片查看器</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
        <div v-for="(image, index) in images" :key="index"
             @click="() => openImageViewer(index)"
             style="aspect-ratio: 1; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 24px; transition: transform 0.2s; user-select: none;"
             :style="{ transform: 'scale(1)' }"
             @mouseenter="(e) => e.target.style.transform = 'scale(1.05)'"
             @mouseleave="(e) => e.target.style.transform = 'scale(1)'">
          {{ image.emoji }}
        </div>
      </div>
    </div>
    <!-- 图片查看器全屏模态框 -->
    <div v-if="imageViewerVisible" 
         ref="imageViewerRef"
         style="position: fixed; inset: 0; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000;"
         @click="() => closeImageViewer()">
      <div style="position: relative; max-width: 80%; max-height: 80%; background: white; border-radius: 12px; overflow: hidden;"
           @click.stop>
        <div style="padding: 20px; text-align: center;">
          <div style="font-size: 120px; margin-bottom: 16px;">{{ currentImage?.emoji }}</div>
          <h3 style="margin: 0 0 8px 0;">{{ currentImage?.name }}</h3>
          <p style="margin: 0; color: #666; font-size: 14px;">{{ currentImage?.description }}</p>
        </div>
        <div style="position: absolute; top: 12px; right: 12px; display: flex; gap: 8px;">
          <button @click="() => imageViewerToggle()" 
                  style="padding: 8px 12px; background: #1890ff; border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 12px;">
            {{ imageViewerIsFullscreen ? '退出全屏' : '全屏查看' }}
          </button>
          <button @click="() => closeImageViewer()" 
                  style="padding: 8px 12px; background: #ff4d4f; border: none; border-radius: 4px; color: white; cursor: pointer; font-size: 12px;">
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 视频播放器示例 -->
    <div>
      <h4>视频播放器</h4>
      <div ref="videoPlayerRef" class="video-player" @click="videoToggle">
        <div class="video-content">
          <div class="play-button">{{ videoIsPlaying ? "⏸️" : "▶️" }}</div>
          <div class="video-title">
            {{ videoIsFullscreen ? "全屏播放中" : "模拟视频播放器" }}
          </div>
          <div class="video-subtitle">
            点击{{ videoIsFullscreen ? "退出" : "进入" }}全屏
          </div>
        </div>
        <div v-if="videoIsFullscreen" class="fullscreen-tip">
          全屏模式 - 按 ESC 退出
        </div>
        <div class="video-controls">
          <button @click.stop="togglePlay" class="control-btn">
            {{ videoIsPlaying ? "暂停" : "播放" }}
          </button>
          <button @click.stop="videoToggle" class="control-btn">
            {{ videoIsFullscreen ? "退出全屏" : "全屏" }}
          </button>
        </div>
      </div>
    </div>

    <!-- 图片查看器示例 -->
    <div>
      <h4>图片查看器</h4>
      <div class="image-grid">
        <div
          v-for="(image, index) in images"
          :key="index"
          @click="openImageViewer(index)"
          class="image-thumbnail"
        >
          {{ image.emoji }}
        </div>
      </div>
    </div>

    <!-- 图片查看器全屏模态框 -->
    <div
      v-if="imageViewerVisible"
      ref="imageViewerRef"
      class="image-viewer-modal"
      @click="closeImageViewer"
    >
      <div class="image-viewer-content" @click.stop>
        <div class="image-display">
          <div class="image-emoji">{{ currentImage?.emoji }}</div>
          <h3>{{ currentImage?.name }}</h3>
          <p>{{ currentImage?.description }}</p>
        </div>
        <div class="image-viewer-controls">
          <button @click="imageViewerToggle" class="control-btn primary">
            {{ imageViewerIsFullscreen ? "退出全屏" : "全屏查看" }}
          </button>
          <button @click="closeImageViewer" class="control-btn danger">
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFullscreen } from "@vakao-ui/hooks";

// 视频播放器
const videoPlayerRef = ref<HTMLElement>();
const videoIsPlaying = ref(false);
const [videoIsFullscreen, videoToggle] = useFullscreen(videoPlayerRef);

const togglePlay = () => {
  videoIsPlaying.value = !videoIsPlaying.value;
};

// 图片查看器
const images = [
  { emoji: "🌅", name: "日出", description: "美丽的日出景色" },
  { emoji: "🌊", name: "海浪", description: "汹涌的海浪" },
  { emoji: "🏔️", name: "雪山", description: "壮丽的雪山" },
  { emoji: "🌸", name: "樱花", description: "粉色的樱花" },
];

const imageViewerVisible = ref(false);
const currentImageIndex = ref(0);
const currentImage = computed(() => images[currentImageIndex.value]);
const imageViewerRef = ref<HTMLElement>();
const [imageViewerIsFullscreen, imageViewerToggle] =
  useFullscreen(imageViewerRef);

const openImageViewer = (index: number) => {
  currentImageIndex.value = index;
  imageViewerVisible.value = true;
};

const closeImageViewer = () => {
  imageViewerVisible.value = false;
  if (imageViewerIsFullscreen.value) {
    imageViewerToggle();
  }
};
</script>

<style scoped>
.video-player {
  position: relative;
  width: 100%;
  height: 240px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.video-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.play-button {
  font-size: 48px;
  margin-bottom: 12px;
}

.video-title {
  font-size: 16px;
  margin-bottom: 8px;
}

.video-subtitle {
  font-size: 14px;
  opacity: 0.8;
}

.fullscreen-tip {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 12px;
  opacity: 0.8;
}

.video-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 8px;
}

.control-btn {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 12px;
}

.control-btn.primary {
  background: #1890ff;
}

.control-btn.danger {
  background: #ff4d4f;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.image-thumbnail {
  aspect-ratio: 1;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: transform 0.2s;
  user-select: none;
}

.image-thumbnail:hover {
  transform: scale(1.05);
}

.image-viewer-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.image-viewer-content {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.image-display {
  padding: 20px;
  text-align: center;
}

.image-emoji {
  font-size: 120px;
  margin-bottom: 16px;
}

.image-display h3 {
  margin: 0 0 8px 0;
}

.image-display p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.image-viewer-controls {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                       | 默认值 | 说明                       |
| ------- | -------------------------- | ------ | -------------------------- |
| target  | `Ref<HTMLElement \| null>` | -      | 目标元素，不传则为整个页面 |
| options | `UseFullscreenOptions`     | `{}`   | 配置选项                   |

### UseFullscreenOptions

| 属性    | 类型                     | 默认值 | 说明         |
| ------- | ------------------------ | ------ | ------------ |
| onEnter | `() => void`             | -      | 进入全屏回调 |
| onExit  | `() => void`             | -      | 退出全屏回调 |
| onError | `(error: Error) => void` | -      | 错误回调     |

### 返回值

`useFullscreen` 返回一个数组，包含以下元素：

```typescript
const [isFullscreen, toggle, enter, exit, isSupported] = useFullscreen(
  target,
  options
);
```

| 索引 | 名称         | 类型                  | 说明             |
| ---- | ------------ | --------------------- | ---------------- |
| 0    | isFullscreen | `Ref<boolean>`        | 是否处于全屏状态 |
| 1    | toggle       | `() => Promise<void>` | 切换全屏状态     |
| 2    | enter        | `() => Promise<void>` | 进入全屏         |
| 3    | exit         | `() => Promise<void>` | 退出全屏         |
| 4    | isSupported  | `Ref<boolean>`        | 是否支持全屏 API |

### 类型定义

```typescript
export interface UseFullscreenOptions {
  onEnter?: () => void;
  onExit?: () => void;
  onError?: (error: Error) => void;
}

export type UseFullscreenReturn = [
  Ref<boolean>,
  () => Promise<void>,
  () => Promise<void>,
  () => Promise<void>,
  Ref<boolean>,
];

export function useFullscreen(
  target?: Ref<HTMLElement | null>,
  options?: UseFullscreenOptions
): UseFullscreenReturn;
```

## 使用场景

1. **视频播放器** - 视频全屏播放功能
2. **图片查看器** - 图片全屏查看
3. **游戏应用** - 游戏全屏模式
4. **演示文稿** - 幻灯片全屏展示
5. **数据可视化** - 图表全屏查看

## 高级用法

### 带回调的全屏控制

```typescript
const [isFullscreen, toggle] = useFullscreen(elementRef, {
  onEnter: () => {
    console.log("进入全屏模式");
    // 隐藏其他 UI 元素
  },
  onExit: () => {
    console.log("退出全屏模式");
    // 恢复 UI 元素
  },
  onError: error => {
    console.error("全屏操作失败:", error);
  },
});
```

### 条件全屏

```typescript
const handleFullscreen = async () => {
  if (isSupported.value) {
    try {
      await toggle();
    } catch (error) {
      console.error("全屏失败:", error);
    }
  } else {
    alert("浏览器不支持全屏 API");
  }
};
```

### 键盘快捷键

```typescript
import { useEventListener } from "@vakao-ui/hooks";

const [isFullscreen, toggle] = useFullscreen();

useEventListener(window, "keydown", (event: KeyboardEvent) => {
  if (event.key === "F11") {
    event.preventDefault();
    toggle();
  }
});
```

## 浏览器兼容性

| 浏览器  | 支持版本 |
| ------- | -------- |
| Chrome  | 15+      |
| Firefox | 10+      |
| Safari  | 5.1+     |
| Edge    | 12+      |
| IE      | 11+      |

## 注意事项

1. 全屏 API 需要用户手势触发（如点击事件）
2. 某些浏览器可能有安全限制
3. 移动设备上的全屏行为可能有所不同
4. 组件卸载时会自动退出全屏状态
5. 使用 ESC 键可以退出全屏模式
6. 全屏状态会自动同步到响应式状态

<script setup>
import { ref, computed } from 'vue';
import { useFullscreen } from '@vakao-ui/hooks';

// 基础用法
const [pageIsFullscreen, pageToggle, pageEnter, pageExit, pageIsSupported] = useFullscreen();

const fullscreenElementRef = ref<HTMLElement>();
const [elementIsFullscreen, elementToggle, elementEnter, elementExit, elementIsSupported] = useFullscreen(fullscreenElementRef);

// 高级用法 - 视频播放器
const videoPlayerRef = ref<HTMLElement>();
const videoIsPlaying = ref(false);
const [videoIsFullscreen, videoToggle] = useFullscreen(videoPlayerRef);

const togglePlay = () => {
  videoIsPlaying.value = !videoIsPlaying.value;
};

// 图片查看器
const images = [
  { emoji: '🌅', name: '日出', description: '美丽的日出景色' },
  { emoji: '🌊', name: '海浪', description: '汹涌的海浪' },
  { emoji: '🏔️', name: '雪山', description: '壮丽的雪山' },
  { emoji: '🌸', name: '樱花', description: '粉色的樱花' }
];

const imageViewerVisible = ref(false);
const currentImageIndex = ref(0);
const currentImage = computed(() => images[currentImageIndex.value]);
const imageViewerRef = ref<HTMLElement>();
const [imageViewerIsFullscreen, imageViewerToggle] = useFullscreen(imageViewerRef);

const openImageViewer = (index) => {
  currentImageIndex.value = index;
  imageViewerVisible.value = true;
};

const closeImageViewer = () => {
  imageViewerVisible.value = false;
  if (imageViewerIsFullscreen.value) {
    imageViewerToggle();
  }
};
</script>
