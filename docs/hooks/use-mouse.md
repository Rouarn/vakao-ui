# useMouse

一个鼠标位置和状态跟踪 Hook，提供实时的鼠标坐标、移动状态、按键状态等信息。支持相对定位、边界检测、自定义目标元素等功能。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🖱️ 鼠标位置跟踪</h3>
    <!-- 全局鼠标位置 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">全局鼠标位置</h4>
      <div style="padding: 16px; background: #f0f9ff; border: 1px solid #91d5ff; border-radius: 8px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; font-size: 14px;">
          <div>
            <span style="font-weight: bold; color: #1890ff;">X 坐标:</span>
            <span style="margin-left: 8px; font-family: monospace;">{{ globalMouse.x }}px</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #1890ff;">Y 坐标:</span>
            <span style="margin-left: 8px; font-family: monospace;">{{ globalMouse.y }}px</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #1890ff;">源元素:</span>
            <span style="margin-left: 8px; font-family: monospace;">{{ globalMouse.sourceType }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 相对位置跟踪 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">相对位置跟踪</h4>
      <div ref="trackingArea" 
           style="position: relative; width: 100%; height: 200px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 8px; overflow: hidden; cursor: crosshair;"
           @mouseenter="isInTrackingArea = true"
           @mouseleave="isInTrackingArea = false">
        <!-- 鼠标指针 -->
        <div v-if="isInTrackingArea && relativeMouse.x >= 0 && relativeMouse.y >= 0"
             style="position: absolute; width: 20px; height: 20px; background: #fff; border: 2px solid #1890ff; border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; z-index: 10; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"
             :style="{ left: relativeMouse.x + 'px', top: relativeMouse.y + 'px' }">
        </div>
        <!-- 网格线 -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.3;">
          <div v-for="i in 10" :key="'v' + i" 
               style="position: absolute; top: 0; bottom: 0; width: 1px; background: rgba(255,255,255,0.5);"
               :style="{ left: (i * 10) + '%' }">
          </div>
          <div v-for="i in 8" :key="'h' + i" 
               style="position: absolute; left: 0; right: 0; height: 1px; background: rgba(255,255,255,0.5);"
               :style="{ top: (i * 12.5) + '%' }">
          </div>
        </div>
        <!-- 坐标显示 -->
        <div style="position: absolute; top: 12px; left: 12px; color: white; font-size: 12px; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 4px; font-family: monospace;">
          <div>相对坐标: ({{ relativeMouse.x }}, {{ relativeMouse.y }})</div>
          <div>元素尺寸: {{ trackingAreaSize.width }} × {{ trackingAreaSize.height }}</div>
        </div>
        <!-- 中心提示 -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center; pointer-events: none;">
          <div style="font-size: 24px; margin-bottom: 8px;">🎯</div>
          <div style="font-size: 14px; font-weight: bold;">在此区域移动鼠标</div>
          <div style="font-size: 12px; opacity: 0.8;">查看相对位置跟踪</div>
        </div>
      </div>
      <!-- 相对位置信息 -->
      <div style="margin-top: 12px; padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; font-size: 13px;">
          <div>
            <span style="font-weight: bold; color: #52c41a;">相对 X:</span>
            <span style="margin-left: 8px; font-family: monospace;">{{ relativeMouse.x }}px</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #52c41a;">相对 Y:</span>
            <span style="margin-left: 8px; font-family: monospace;">{{ relativeMouse.y }}px</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #52c41a;">在区域内:</span>
            <span style="margin-left: 8px;">{{ isInTrackingArea ? '✅ 是' : '❌ 否' }}</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #52c41a;">百分比位置:</span>
            <span style="margin-left: 8px; font-family: monospace;">
              {{ trackingAreaSize.width ? Math.round((relativeMouse.x / trackingAreaSize.width) * 100) : 0 }}%, 
              {{ trackingAreaSize.height ? Math.round((relativeMouse.y / trackingAreaSize.height) * 100) : 0 }}%
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 鼠标按键状态 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">鼠标按键状态</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <div style="padding: 16px; border-radius: 8px; text-align: center; transition: all 0.3s;"
             :style="{
               background: mouseButtons.left ? 'linear-gradient(45deg, #ff6b6b, #ee5a24)' : '#f5f5f5',
               color: mouseButtons.left ? 'white' : '#666',
               transform: mouseButtons.left ? 'scale(1.05)' : 'scale(1)',
               boxShadow: mouseButtons.left ? '0 4px 12px rgba(255, 107, 107, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
             }">
          <div style="font-size: 24px; margin-bottom: 8px;">🖱️</div>
          <div style="font-size: 14px; font-weight: bold; margin-bottom: 4px;">左键</div>
          <div style="font-size: 12px; opacity: 0.8;">{{ mouseButtons.left ? '按下' : '释放' }}</div>
        </div>
        <div style="padding: 16px; border-radius: 8px; text-align: center; transition: all 0.3s;"
             :style="{
               background: mouseButtons.right ? 'linear-gradient(45deg, #4834d4, #686de0)' : '#f5f5f5',
               color: mouseButtons.right ? 'white' : '#666',
               transform: mouseButtons.right ? 'scale(1.05)' : 'scale(1)',
               boxShadow: mouseButtons.right ? '0 4px 12px rgba(72, 52, 212, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
             }">
          <div style="font-size: 24px; margin-bottom: 8px;">🖱️</div>
          <div style="font-size: 14px; font-weight: bold; margin-bottom: 4px;">右键</div>
          <div style="font-size: 12px; opacity: 0.8;">{{ mouseButtons.right ? '按下' : '释放' }}</div>
        </div>
        <div style="padding: 16px; border-radius: 8px; text-align: center; transition: all 0.3s;"
             :style="{
               background: mouseButtons.middle ? 'linear-gradient(45deg, #00d2d3, #54a0ff)' : '#f5f5f5',
               color: mouseButtons.middle ? 'white' : '#666',
               transform: mouseButtons.middle ? 'scale(1.05)' : 'scale(1)',
               boxShadow: mouseButtons.middle ? '0 4px 12px rgba(0, 210, 211, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
             }">
          <div style="font-size: 24px; margin-bottom: 8px;">🖱️</div>
          <div style="font-size: 14px; font-weight: bold; margin-bottom: 4px;">中键</div>
          <div style="font-size: 12px; opacity: 0.8;">{{ mouseButtons.middle ? '按下' : '释放' }}</div>
        </div>
      </div>
    </div>
    <!-- 鼠标移动轨迹 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">鼠标移动轨迹</h4>
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <button @click="startTracking" 
                :disabled="isTracking"
                style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
                :style="{ opacity: isTracking ? 0.5 : 1, cursor: isTracking ? 'not-allowed' : 'pointer' }">
          {{ isTracking ? '正在记录...' : '开始记录轨迹' }}
        </button>
        <button @click="stopTracking" 
                :disabled="!isTracking"
                style="padding: 8px 16px; background: #ff4d4f; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
                :style="{ opacity: !isTracking ? 0.5 : 1, cursor: !isTracking ? 'not-allowed' : 'pointer' }">
          停止记录
        </button>
        <button @click="clearTrail" 
                style="padding: 8px 16px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
          清除轨迹
        </button>
      </div>
      <div style="position: relative; width: 100%; height: 150px; background: #fafafa; border: 2px dashed #d9d9d9; border-radius: 8px; overflow: hidden;">
        <!-- 轨迹点 -->
        <div v-for="(point, index) in mouseTrail" :key="index"
             style="position: absolute; width: 6px; height: 6px; border-radius: 50%; pointer-events: none;"
             :style="{
               left: point.x + 'px',
               top: point.y + 'px',
               background: `hsl(${(index / mouseTrail.length) * 360}, 70%, 60%)`,
               opacity: 0.8 - (index / mouseTrail.length) * 0.6,
               transform: 'translate(-50%, -50%)'
             }">
        </div>
        <!-- 轨迹线 -->
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
          <path v-if="mouseTrail.length > 1"
                :d="getTrailPath()"
                stroke="#1890ff"
                stroke-width="2"
                fill="none"
                opacity="0.6">
          </path>
        </svg>
        <!-- 提示文字 -->
        <div v-if="mouseTrail.length === 0" 
             style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #999; pointer-events: none;">
          <div style="font-size: 18px; margin-bottom: 8px;">📍</div>
          <div style="font-size: 14px;">点击"开始记录轨迹"然后在此区域移动鼠标</div>
        </div>
        <!-- 轨迹信息 -->
        <div v-if="mouseTrail.length > 0" 
             style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 6px 10px; border-radius: 4px; font-size: 11px;">
          轨迹点数: {{ mouseTrail.length }}
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 全局鼠标位置 -->
    <div>
      <h4>全局鼠标位置</h4>
      <div class="mouse-info">
        <div>X 坐标: {{ globalMouse.x }}px</div>
        <div>Y 坐标: {{ globalMouse.y }}px</div>
        <div>源元素: {{ globalMouse.sourceType }}</div>
      </div>
    </div>

    <!-- 相对位置跟踪 -->
    <div>
      <h4>相对位置跟踪</h4>
      <div
        ref="trackingArea"
        class="tracking-area"
        @mouseenter="isInTrackingArea = true"
        @mouseleave="isInTrackingArea = false"
      >
        <!-- 鼠标指针 -->
        <div
          v-if="
            isInTrackingArea && relativeMouse.x >= 0 && relativeMouse.y >= 0
          "
          class="mouse-pointer"
          :style="{ left: relativeMouse.x + 'px', top: relativeMouse.y + 'px' }"
        ></div>

        <!-- 网格线 -->
        <div class="grid-overlay">
          <div
            v-for="i in 10"
            :key="'v' + i"
            class="grid-line vertical"
            :style="{ left: i * 10 + '%' }"
          ></div>
          <div
            v-for="i in 8"
            :key="'h' + i"
            class="grid-line horizontal"
            :style="{ top: i * 12.5 + '%' }"
          ></div>
        </div>

        <!-- 坐标显示 -->
        <div class="coordinate-display">
          <div>相对坐标: ({{ relativeMouse.x }}, {{ relativeMouse.y }})</div>
          <div>
            元素尺寸: {{ trackingAreaSize.width }} ×
            {{ trackingAreaSize.height }}
          </div>
        </div>

        <!-- 中心提示 -->
        <div class="center-hint">
          <div class="hint-icon">🎯</div>
          <div class="hint-title">在此区域移动鼠标</div>
          <div class="hint-subtitle">查看相对位置跟踪</div>
        </div>
      </div>

      <!-- 相对位置信息 -->
      <div class="relative-info">
        <div>相对 X: {{ relativeMouse.x }}px</div>
        <div>相对 Y: {{ relativeMouse.y }}px</div>
        <div>在区域内: {{ isInTrackingArea ? "✅ 是" : "❌ 否" }}</div>
        <div>
          百分比位置:
          {{
            trackingAreaSize.width
              ? Math.round((relativeMouse.x / trackingAreaSize.width) * 100)
              : 0
          }}%,
          {{
            trackingAreaSize.height
              ? Math.round((relativeMouse.y / trackingAreaSize.height) * 100)
              : 0
          }}%
        </div>
      </div>
    </div>

    <!-- 鼠标按键状态 -->
    <div>
      <h4>鼠标按键状态</h4>
      <div class="button-grid">
        <div class="button-card" :class="{ active: mouseButtons.left }">
          <div class="button-icon">🖱️</div>
          <div class="button-name">左键</div>
          <div class="button-status">
            {{ mouseButtons.left ? "按下" : "释放" }}
          </div>
        </div>

        <div class="button-card" :class="{ active: mouseButtons.right }">
          <div class="button-icon">🖱️</div>
          <div class="button-name">右键</div>
          <div class="button-status">
            {{ mouseButtons.right ? "按下" : "释放" }}
          </div>
        </div>

        <div class="button-card" :class="{ active: mouseButtons.middle }">
          <div class="button-icon">🖱️</div>
          <div class="button-name">中键</div>
          <div class="button-status">
            {{ mouseButtons.middle ? "按下" : "释放" }}
          </div>
        </div>
      </div>
    </div>

    <!-- 鼠标移动轨迹 -->
    <div>
      <h4>鼠标移动轨迹</h4>
      <div class="trail-controls">
        <button @click="startTracking" :disabled="isTracking" class="btn-start">
          {{ isTracking ? "正在记录..." : "开始记录轨迹" }}
        </button>
        <button @click="stopTracking" :disabled="!isTracking" class="btn-stop">
          停止记录
        </button>
        <button @click="clearTrail" class="btn-clear">清除轨迹</button>
      </div>

      <div class="trail-area">
        <!-- 轨迹点 -->
        <div
          v-for="(point, index) in mouseTrail"
          :key="index"
          class="trail-point"
          :style="{
            left: point.x + 'px',
            top: point.y + 'px',
            background: `hsl(${(index / mouseTrail.length) * 360}, 70%, 60%)`,
            opacity: 0.8 - (index / mouseTrail.length) * 0.6,
          }"
        ></div>

        <!-- 轨迹线 -->
        <svg class="trail-svg">
          <path
            v-if="mouseTrail.length > 1"
            :d="getTrailPath()"
            stroke="#1890ff"
            stroke-width="2"
            fill="none"
            opacity="0.6"
          ></path>
        </svg>

        <!-- 提示文字 -->
        <div v-if="mouseTrail.length === 0" class="trail-hint">
          <div class="trail-hint-icon">📍</div>
          <div class="trail-hint-text">
            点击"开始记录轨迹"然后在此区域移动鼠标
          </div>
        </div>

        <!-- 轨迹信息 -->
        <div v-if="mouseTrail.length > 0" class="trail-info">
          轨迹点数: {{ mouseTrail.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMouse } from "@vakao-ui/hooks";

// 全局鼠标位置
const globalMouse = useMouse();

// 相对位置跟踪
const trackingArea = ref<HTMLElement>();
const relativeMouse = useMouse({ target: trackingArea });
const isInTrackingArea = ref(false);

// 跟踪区域尺寸
const trackingAreaSize = computed(() => {
  if (!trackingArea.value) return { width: 0, height: 0 };
  const rect = trackingArea.value.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
});

// 鼠标按键状态
const mouseButtons = computed(() => ({
  left: globalMouse.buttons.value & 1,
  right: globalMouse.buttons.value & 2,
  middle: globalMouse.buttons.value & 4,
}));

// 鼠标轨迹
const mouseTrail = ref<Array<{ x: number; y: number }>>([]);
const isTracking = ref(false);

const startTracking = () => {
  isTracking.value = true;
  mouseTrail.value = [];
};

const stopTracking = () => {
  isTracking.value = false;
};

const clearTrail = () => {
  mouseTrail.value = [];
};

const getTrailPath = () => {
  if (mouseTrail.value.length < 2) return "";

  let path = `M ${mouseTrail.value[0].x} ${mouseTrail.value[0].y}`;
  for (let i = 1; i < mouseTrail.value.length; i++) {
    path += ` L ${mouseTrail.value[i].x} ${mouseTrail.value[i].y}`;
  }
  return path;
};

// 监听鼠标移动记录轨迹
const handleMouseMove = (event: MouseEvent) => {
  if (!isTracking.value) return;

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  mouseTrail.value.push({ x, y });

  // 限制轨迹点数量
  if (mouseTrail.value.length > 100) {
    mouseTrail.value.shift();
  }
};

onMounted(() => {
  const trailArea = document.querySelector(".trail-area");
  if (trailArea) {
    trailArea.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  const trailArea = document.querySelector(".trail-area");
  if (trailArea) {
    trailArea.removeEventListener("mousemove", handleMouseMove);
  }
});
</script>

<style scoped>
.mouse-info {
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #91d5ff;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  font-size: 14px;
}

.tracking-area {
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 8px;
  overflow: hidden;
  cursor: crosshair;
}

.mouse-pointer {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #fff;
  border: 2px solid #1890ff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
}

.grid-line {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
}

.grid-line.vertical {
  top: 0;
  bottom: 0;
  width: 1px;
}

.grid-line.horizontal {
  left: 0;
  right: 0;
  height: 1px;
}

.coordinate-display {
  position: absolute;
  top: 12px;
  left: 12px;
  color: white;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
}

.center-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  pointer-events: none;
}

.hint-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.hint-title {
  font-size: 14px;
  font-weight: bold;
}

.hint-subtitle {
  font-size: 12px;
  opacity: 0.8;
}

.relative-info {
  margin-top: 12px;
  padding: 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  font-size: 13px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.button-card {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s;
  color: #666;
}

.button-card.active {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.button-card.active:nth-child(1) {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
}

.button-card.active:nth-child(2) {
  background: linear-gradient(45deg, #4834d4, #686de0);
  color: white;
  box-shadow: 0 4px 12px rgba(72, 52, 212, 0.3);
}

.button-card.active:nth-child(3) {
  background: linear-gradient(45deg, #00d2d3, #54a0ff);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 210, 211, 0.3);
}

.button-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.button-name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}

.button-status {
  font-size: 12px;
  opacity: 0.8;
}

.trail-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.trail-controls button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-start {
  background: #1890ff;
  color: white;
}

.btn-start:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-stop {
  background: #ff4d4f;
  color: white;
}

.btn-stop:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-clear {
  background: #52c41a;
  color: white;
}

.trail-area {
  position: relative;
  width: 100%;
  height: 150px;
  background: #fafafa;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
}

.trail-point {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.trail-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.trail-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #999;
  pointer-events: none;
}

.trail-hint-icon {
  font-size: 18px;
  margin-bottom: 8px;
}

.trail-hint-text {
  font-size: 14px;
}

.trail-info {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 11px;
}
</style>
```

  </template>
</Demo>

## 高级用法示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🎯 高级鼠标交互</h3>
    <!-- 鼠标跟随效果 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">🌟 鼠标跟随效果</h4>
      <div ref="followArea" 
           style="position: relative; width: 100%; height: 200px; background: linear-gradient(45deg, #2c3e50, #3498db); border-radius: 8px; overflow: hidden; cursor: none;"
           @mouseenter="showFollower = true"
           @mouseleave="showFollower = false">
        <!-- 跟随光标 -->
        <div v-if="showFollower"
             style="position: absolute; pointer-events: none; z-index: 10; transition: all 0.1s ease-out;"
             :style="{
               left: followerMouse.x + 'px',
               top: followerMouse.y + 'px',
               transform: 'translate(-50%, -50%)'
             }">
          <!-- 外圈 -->
          <div style="width: 40px; height: 40px; border: 2px solid rgba(255,255,255,0.6); border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: pulse 2s infinite;"></div>
          <!-- 内圈 -->
          <div style="width: 12px; height: 12px; background: #fff; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 10px rgba(255,255,255,0.8);"></div>
        </div>
        <!-- 背景粒子 -->
        <div v-for="i in 20" :key="i"
             style="position: absolute; width: 4px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 50%;"
             :style="{
               left: Math.random() * 100 + '%',
               top: Math.random() * 100 + '%',
               animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`
             }">
        </div>
        <!-- 中心文字 -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center; pointer-events: none;">
          <div style="font-size: 24px; margin-bottom: 8px;">✨</div>
          <div style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">鼠标跟随效果</div>
          <div style="font-size: 12px; opacity: 0.8;">移动鼠标查看跟随光标</div>
        </div>
      </div>
    </div>
    <!-- 磁性吸附效果 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">🧲 磁性吸附效果</h4>
      <div ref="magnetArea" 
           style="position: relative; width: 100%; height: 200px; background: #f8f9fa; border: 2px solid #dee2e6; border-radius: 8px; overflow: hidden;">
        <!-- 磁性目标 -->
        <div v-for="(target, index) in magnetTargets" :key="index"
             style="position: absolute; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; cursor: pointer; transition: all 0.3s; user-select: none;"
             :style="{
               left: target.x + 'px',
               top: target.y + 'px',
               background: target.color,
               transform: `translate(-50%, -50%) scale(${target.scale})`,
               boxShadow: target.isNear ? '0 8px 25px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.1)'
             }">
          {{ target.label }}
        </div>
        <!-- 磁力线 -->
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
          <g v-for="(target, index) in magnetTargets" :key="'line-' + index">
            <line v-if="target.isNear"
                  :x1="magnetMouse.x"
                  :y1="magnetMouse.y"
                  :x2="target.x"
                  :y2="target.y"
                  stroke="#1890ff"
                  stroke-width="2"
                  opacity="0.6"
                  stroke-dasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
            </line>
          </g>
        </svg>
        <!-- 提示文字 -->
        <div style="position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.7); color: white; padding: 8px 12px; border-radius: 4px; font-size: 12px;">
          💡 靠近圆形目标体验磁性吸附效果
        </div>
      </div>
    </div>
    <!-- 绘画板 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">🎨 简易绘画板</h4>
      <div style="display: flex; gap: 12px; margin-bottom: 12px; align-items: center;">
        <div style="display: flex; gap: 8px;">
          <div v-for="color in paintColors" :key="color"
               @click="currentColor = color"
               style="width: 30px; height: 30px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: all 0.3s;"
               :style="{
                 background: color,
                 borderColor: currentColor === color ? '#1890ff' : 'transparent',
                 transform: currentColor === color ? 'scale(1.1)' : 'scale(1)'
               }">
          </div>
        </div>
        <div style="width: 1px; height: 30px; background: #d9d9d9;"></div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 12px; color: #666;">画笔大小:</span>
          <input v-model="brushSize" type="range" min="2" max="20" step="2" 
                 style="width: 100px;">
          <span style="font-size: 12px; color: #666; font-family: monospace;">{{ brushSize }}px</span>
        </div>
        <button @click="clearCanvas" 
                style="padding: 6px 12px; background: #ff4d4f; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
          清除画布
        </button>
      </div>
      <canvas ref="paintCanvas" 
              @mousedown="startPainting"
              @mousemove="paint"
              @mouseup="stopPainting"
              @mouseleave="stopPainting"
              style="width: 100%; height: 200px; border: 2px solid #d9d9d9; border-radius: 8px; cursor: crosshair; background: white;">
      </canvas>
      <div style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
        💡 按住鼠标左键拖拽进行绘画
      </div>
    </div>
    <!-- 鼠标手势识别 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">👋 鼠标手势识别</h4>
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <button @click="startGesture" 
                :disabled="isGesturing"
                style="padding: 8px 16px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
                :style="{ opacity: isGesturing ? 0.5 : 1, cursor: isGesturing ? 'not-allowed' : 'pointer' }">
          {{ isGesturing ? '正在识别手势...' : '开始手势识别' }}
        </button>
        <button @click="stopGesture" 
                :disabled="!isGesturing"
                style="padding: 8px 16px; background: #ff4d4f; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
                :style="{ opacity: !isGesturing ? 0.5 : 1, cursor: !isGesturing ? 'not-allowed' : 'pointer' }">
          停止识别
        </button>
        <div style="padding: 8px 12px; background: #f0f9ff; border: 1px solid #91d5ff; border-radius: 4px; font-size: 12px; color: #1890ff;">
          识别到的手势: <strong>{{ recognizedGesture || '无' }}</strong>
        </div>
      </div>
      <div ref="gestureArea" 
           style="position: relative; width: 100%; height: 150px; background: #fafafa; border: 2px dashed #d9d9d9; border-radius: 8px; overflow: hidden;">
        <!-- 手势轨迹 -->
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
          <path v-if="gesturePoints.length > 1"
                :d="getGesturePath()"
                stroke="#52c41a"
                stroke-width="3"
                fill="none"
                opacity="0.8">
          </path>
        </svg>
        <!-- 手势点 -->
        <div v-for="(point, index) in gesturePoints" :key="index"
             style="position: absolute; width: 8px; height: 8px; background: #52c41a; border-radius: 50%; pointer-events: none;"
             :style="{
               left: point.x + 'px',
               top: point.y + 'px',
               transform: 'translate(-50%, -50%)',
               opacity: 0.9 - (index / gesturePoints.length) * 0.5
             }">
        </div>
        <!-- 提示文字 -->
        <div v-if="!isGesturing" 
             style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #999; pointer-events: none;">
          <div style="font-size: 18px; margin-bottom: 8px;">👋</div>
          <div style="font-size: 14px; margin-bottom: 4px;">点击"开始手势识别"</div>
          <div style="font-size: 12px;">然后拖拽鼠标绘制手势（支持: ↑ ↓ ← → ○ ◇）</div>
        </div>
        <div v-else 
             style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #1890ff; pointer-events: none;">
          <div style="font-size: 18px; margin-bottom: 8px;">🎯</div>
          <div style="font-size: 14px; font-weight: bold;">拖拽鼠标绘制手势</div>
        </div>
        <!-- 手势信息 -->
        <div v-if="gesturePoints.length > 0" 
             style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 6px 10px; border-radius: 4px; font-size: 11px;">
          轨迹点数: {{ gesturePoints.length }}
        </div>
      </div>
      <!-- 支持的手势 -->
      <div style="margin-top: 12px; padding: 12px; background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 6px;">
        <div style="font-size: 12px; color: #52c41a; margin-bottom: 8px; font-weight: bold;">支持的手势:</div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; font-size: 12px;">
          <span>↑ 向上</span>
          <span>↓ 向下</span>
          <span>← 向左</span>
          <span>→ 向右</span>
          <span>○ 圆形</span>
          <span>◇ 菱形</span>
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 鼠标跟随效果 -->
    <div>
      <h4>🌟 鼠标跟随效果</h4>
      <div
        ref="followArea"
        class="follow-area"
        @mouseenter="showFollower = true"
        @mouseleave="showFollower = false"
      >
        <!-- 跟随光标 -->
        <div
          v-if="showFollower"
          class="follower-cursor"
          :style="{
            left: followerMouse.x + 'px',
            top: followerMouse.y + 'px',
          }"
        >
          <div class="follower-outer"></div>
          <div class="follower-inner"></div>
        </div>

        <!-- 背景粒子 -->
        <div
          v-for="i in 20"
          :key="i"
          class="particle"
          :style="{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: 2 + Math.random() * 3 + 's',
          }"
        ></div>

        <!-- 中心文字 -->
        <div class="follow-hint">
          <div class="follow-icon">✨</div>
          <div class="follow-title">鼠标跟随效果</div>
          <div class="follow-subtitle">移动鼠标查看跟随光标</div>
        </div>
      </div>
    </div>

    <!-- 磁性吸附效果 -->
    <div>
      <h4>🧲 磁性吸附效果</h4>
      <div ref="magnetArea" class="magnet-area">
        <!-- 磁性目标 -->
        <div
          v-for="(target, index) in magnetTargets"
          :key="index"
          class="magnet-target"
          :style="{
            left: target.x + 'px',
            top: target.y + 'px',
            background: target.color,
            transform: `translate(-50%, -50%) scale(${target.scale})`,
            boxShadow: target.isNear
              ? '0 8px 25px rgba(0,0,0,0.3)'
              : '0 4px 15px rgba(0,0,0,0.1)',
          }"
        >
          {{ target.label }}
        </div>

        <!-- 磁力线 -->
        <svg class="magnet-lines">
          <g v-for="(target, index) in magnetTargets" :key="'line-' + index">
            <line
              v-if="target.isNear"
              :x1="magnetMouse.x"
              :y1="magnetMouse.y"
              :x2="target.x"
              :y2="target.y"
              class="magnet-line"
            ></line>
          </g>
        </svg>

        <!-- 提示文字 -->
        <div class="magnet-hint">💡 靠近圆形目标体验磁性吸附效果</div>
      </div>
    </div>

    <!-- 绘画板 -->
    <div>
      <h4>🎨 简易绘画板</h4>
      <div class="paint-controls">
        <div class="color-palette">
          <div
            v-for="color in paintColors"
            :key="color"
            @click="currentColor = color"
            class="color-option"
            :class="{ active: currentColor === color }"
            :style="{ background: color }"
          ></div>
        </div>
        <div class="control-divider"></div>
        <div class="brush-controls">
          <span class="brush-label">画笔大小:</span>
          <input
            v-model="brushSize"
            type="range"
            min="2"
            max="20"
            step="2"
            class="brush-slider"
          />
          <span class="brush-size">{{ brushSize }}px</span>
        </div>
        <button @click="clearCanvas" class="clear-btn">清除画布</button>
      </div>

      <canvas
        ref="paintCanvas"
        @mousedown="startPainting"
        @mousemove="paint"
        @mouseup="stopPainting"
        @mouseleave="stopPainting"
        class="paint-canvas"
      >
      </canvas>

      <div class="paint-hint">💡 按住鼠标左键拖拽进行绘画</div>
    </div>

    <!-- 鼠标手势识别 -->
    <div>
      <h4>👋 鼠标手势识别</h4>
      <div class="gesture-controls">
        <button
          @click="startGesture"
          :disabled="isGesturing"
          class="gesture-btn start"
        >
          {{ isGesturing ? "正在识别手势..." : "开始手势识别" }}
        </button>
        <button
          @click="stopGesture"
          :disabled="!isGesturing"
          class="gesture-btn stop"
        >
          停止识别
        </button>
        <div class="gesture-result">
          识别到的手势: <strong>{{ recognizedGesture || "无" }}</strong>
        </div>
      </div>

      <div ref="gestureArea" class="gesture-area">
        <!-- 手势轨迹 -->
        <svg class="gesture-svg">
          <path
            v-if="gesturePoints.length > 1"
            :d="getGesturePath()"
            class="gesture-path"
          ></path>
        </svg>

        <!-- 手势点 -->
        <div
          v-for="(point, index) in gesturePoints"
          :key="index"
          class="gesture-point"
          :style="{
            left: point.x + 'px',
            top: point.y + 'px',
            opacity: 0.9 - (index / gesturePoints.length) * 0.5,
          }"
        ></div>

        <!-- 提示文字 -->
        <div v-if="!isGesturing" class="gesture-hint idle">
          <div class="gesture-hint-icon">👋</div>
          <div class="gesture-hint-title">点击"开始手势识别"</div>
          <div class="gesture-hint-subtitle">
            然后拖拽鼠标绘制手势（支持: ↑ ↓ ← → ○ ◇）
          </div>
        </div>

        <div v-else class="gesture-hint active">
          <div class="gesture-hint-icon">🎯</div>
          <div class="gesture-hint-title">拖拽鼠标绘制手势</div>
        </div>

        <!-- 手势信息 -->
        <div v-if="gesturePoints.length > 0" class="gesture-info">
          轨迹点数: {{ gesturePoints.length }}
        </div>
      </div>

      <!-- 支持的手势 -->
      <div class="gesture-help">
        <div class="gesture-help-title">支持的手势:</div>
        <div class="gesture-help-list">
          <span>↑ 向上</span>
          <span>↓ 向下</span>
          <span>← 向左</span>
          <span>→ 向右</span>
          <span>○ 圆形</span>
          <span>◇ 菱形</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useMouse } from "@vakao-ui/hooks";

// 鼠标跟随效果
const followArea = ref<HTMLElement>();
const followerMouse = useMouse({ target: followArea });
const showFollower = ref(false);

// 磁性吸附效果
const magnetArea = ref<HTMLElement>();
const magnetMouse = useMouse({ target: magnetArea });
const magnetTargets = ref([
  { x: 100, y: 60, color: "#ff6b6b", label: "A", scale: 1, isNear: false },
  { x: 300, y: 100, color: "#4ecdc4", label: "B", scale: 1, isNear: false },
  { x: 500, y: 80, color: "#45b7d1", label: "C", scale: 1, isNear: false },
  { x: 200, y: 140, color: "#96ceb4", label: "D", scale: 1, isNear: false },
  { x: 400, y: 160, color: "#feca57", label: "E", scale: 1, isNear: false },
]);

// 计算磁性效果
watch([magnetMouse.x, magnetMouse.y], () => {
  magnetTargets.value.forEach(target => {
    const distance = Math.sqrt(
      Math.pow(magnetMouse.x.value - target.x, 2) +
        Math.pow(magnetMouse.y.value - target.y, 2)
    );

    target.isNear = distance < 80;
    target.scale = target.isNear ? 1.2 : 1;
  });
});

// 绘画板
const paintCanvas = ref<HTMLCanvasElement>();
const isPainting = ref(false);
const currentColor = ref("#1890ff");
const brushSize = ref(6);
const paintColors = [
  "#1890ff",
  "#52c41a",
  "#ff4d4f",
  "#fa8c16",
  "#722ed1",
  "#13c2c2",
  "#eb2f96",
  "#000000",
];

let paintCtx: CanvasRenderingContext2D | null = null;

const startPainting = (event: MouseEvent) => {
  isPainting.value = true;
  paint(event);
};

const paint = (event: MouseEvent) => {
  if (!isPainting.value || !paintCtx) return;

  const rect = paintCanvas.value!.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  paintCtx.globalCompositeOperation = "source-over";
  paintCtx.fillStyle = currentColor.value;
  paintCtx.beginPath();
  paintCtx.arc(x, y, brushSize.value / 2, 0, Math.PI * 2);
  paintCtx.fill();
};

const stopPainting = () => {
  isPainting.value = false;
};

const clearCanvas = () => {
  if (paintCtx) {
    paintCtx.clearRect(
      0,
      0,
      paintCanvas.value!.width,
      paintCanvas.value!.height
    );
  }
};

// 手势识别
const gestureArea = ref<HTMLElement>();
const gesturePoints = ref<Array<{ x: number; y: number }>>([]);
const isGesturing = ref(false);
const recognizedGesture = ref("");

const startGesture = () => {
  isGesturing.value = true;
  gesturePoints.value = [];
  recognizedGesture.value = "";
};

const stopGesture = () => {
  isGesturing.value = false;
  if (gesturePoints.value.length > 5) {
    recognizeGesture();
  }
};

const getGesturePath = () => {
  if (gesturePoints.value.length < 2) return "";

  let path = `M ${gesturePoints.value[0].x} ${gesturePoints.value[0].y}`;
  for (let i = 1; i < gesturePoints.value.length; i++) {
    path += ` L ${gesturePoints.value[i].x} ${gesturePoints.value[i].y}`;
  }
  return path;
};

const recognizeGesture = () => {
  if (gesturePoints.value.length < 5) return;

  const points = gesturePoints.value;
  const startPoint = points[0];
  const endPoint = points[points.length - 1];

  // 计算总体方向
  const deltaX = endPoint.x - startPoint.x;
  const deltaY = endPoint.y - startPoint.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  // 检测圆形手势
  if (isCircularGesture(points)) {
    recognizedGesture.value = "圆形 ○";
    return;
  }

  // 检测菱形手势
  if (isDiamondGesture(points)) {
    recognizedGesture.value = "菱形 ◇";
    return;
  }

  // 检测直线手势
  if (distance > 50) {
    const angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

    if (angle >= -45 && angle <= 45) {
      recognizedGesture.value = "向右 →";
    } else if (angle >= 45 && angle <= 135) {
      recognizedGesture.value = "向下 ↓";
    } else if (angle >= 135 || angle <= -135) {
      recognizedGesture.value = "向左 ←";
    } else if (angle >= -135 && angle <= -45) {
      recognizedGesture.value = "向上 ↑";
    }
  }
};

const isCircularGesture = (points: Array<{ x: number; y: number }>) => {
  if (points.length < 10) return false;

  // 计算中心点
  const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  // 计算平均半径
  const avgRadius =
    points.reduce((sum, p) => {
      return sum + Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
    }, 0) / points.length;

  // 检查点是否大致在圆周上
  let validPoints = 0;
  points.forEach(p => {
    const radius = Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
    if (Math.abs(radius - avgRadius) < avgRadius * 0.3) {
      validPoints++;
    }
  });

  return validPoints / points.length > 0.7;
};

const isDiamondGesture = (points: Array<{ x: number; y: number }>) => {
  if (points.length < 8) return false;

  // 简化的菱形检测：检查是否有4个明显的转折点
  const corners = [];
  for (let i = 2; i < points.length - 2; i++) {
    const prev = points[i - 2];
    const curr = points[i];
    const next = points[i + 2];

    const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
    const angleDiff = Math.abs(angle2 - angle1);

    if (angleDiff > Math.PI / 3 && angleDiff < (2 * Math.PI) / 3) {
      corners.push(curr);
    }
  }

  return corners.length >= 3;
};

// 手势区域鼠标事件
const handleGestureMouseDown = (event: MouseEvent) => {
  if (!isGesturing.value) return;

  const rect = gestureArea.value!.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  gesturePoints.value = [{ x, y }];

  const handleMouseMove = (e: MouseEvent) => {
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;

    // 避免点太密集
    const lastPoint = gesturePoints.value[gesturePoints.value.length - 1];
    const distance = Math.sqrt(
      (newX - lastPoint.x) ** 2 + (newY - lastPoint.y) ** 2
    );

    if (distance > 5) {
      gesturePoints.value.push({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (gesturePoints.value.length > 5) {
      recognizeGesture();
    }
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

onMounted(() => {
  // 初始化画布
  if (paintCanvas.value) {
    const rect = paintCanvas.value.getBoundingClientRect();
    paintCanvas.value.width = rect.width;
    paintCanvas.value.height = rect.height;
    paintCtx = paintCanvas.value.getContext("2d");
  }

  // 绑定手势事件
  if (gestureArea.value) {
    gestureArea.value.addEventListener("mousedown", handleGestureMouseDown);
  }
});

onUnmounted(() => {
  if (gestureArea.value) {
    gestureArea.value.removeEventListener("mousedown", handleGestureMouseDown);
  }
});
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.follow-area {
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #2c3e50, #3498db);
  border-radius: 8px;
  overflow: hidden;
  cursor: none;
}

.follower-cursor {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  transition: all 0.1s ease-out;
  transform: translate(-50%, -50%);
}

.follower-outer {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 2s infinite;
}

.follower-inner {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float ease-in-out infinite;
}

.follow-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  pointer-events: none;
}

.follow-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.follow-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.follow-subtitle {
  font-size: 12px;
  opacity: 0.8;
}

.magnet-area {
  position: relative;
  width: 100%;
  height: 200px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.magnet-target {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.magnet-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.magnet-line {
  stroke: #1890ff;
  stroke-width: 2;
  opacity: 0.6;
  stroke-dasharray: 5, 5;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

.magnet-hint {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
}

.paint-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;
}

.color-palette {
  display: flex;
  gap: 8px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s;
}

.color-option.active {
  border-color: #1890ff;
  transform: scale(1.1);
}

.control-divider {
  width: 1px;
  height: 30px;
  background: #d9d9d9;
}

.brush-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.brush-label {
  font-size: 12px;
  color: #666;
}

.brush-slider {
  width: 100px;
}

.brush-size {
  font-size: 12px;
  color: #666;
  font-family: monospace;
}

.clear-btn {
  padding: 6px 12px;
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.paint-canvas {
  width: 100%;
  height: 200px;
  border: 2px solid #d9d9d9;
  border-radius: 8px;
  cursor: crosshair;
  background: white;
}

.paint-hint {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
  text-align: center;
}

.gesture-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.gesture-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.gesture-btn.start {
  background: #1890ff;
  color: white;
}

.gesture-btn.start:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gesture-btn.stop {
  background: #ff4d4f;
  color: white;
}

.gesture-btn.stop:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gesture-result {
  padding: 8px 12px;
  background: #f0f9ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  font-size: 12px;
  color: #1890ff;
}

.gesture-area {
  position: relative;
  width: 100%;
  height: 150px;
  background: #fafafa;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
}

.gesture-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.gesture-path {
  stroke: #52c41a;
  stroke-width: 3;
  fill: none;
  opacity: 0.8;
}

.gesture-point {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #52c41a;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.gesture-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.gesture-hint.idle {
  color: #999;
}

.gesture-hint.active {
  color: #1890ff;
}

.gesture-hint-icon {
  font-size: 18px;
  margin-bottom: 8px;
}

.gesture-hint-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.gesture-hint.active .gesture-hint-title {
  font-weight: bold;
}

.gesture-hint-subtitle {
  font-size: 12px;
}

.gesture-info {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 11px;
}

.gesture-help {
  margin-top: 12px;
  padding: 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
}

.gesture-help-title {
  font-size: 12px;
  color: #52c41a;
  margin-bottom: 8px;
  font-weight: bold;
}

.gesture-help-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                        | 默认值   | 说明     |
| ------- | --------------------------- | -------- | -------- |
| target  | `MaybeRefOrGetter<Element>` | `window` | 目标元素 |
| options | `UseMouseOptions`           | `{}`     | 配置选项 |

### UseMouseOptions

| 属性             | 类型       | 默认值           | 说明                   |
| ---------------- | ---------- | ---------------- | ---------------------- |
| touch            | `boolean`  | `true`           | 是否监听触摸事件       |
| resetOnTouchEnds | `boolean`  | `false`          | 触摸结束时是否重置坐标 |
| initialValue     | `Position` | `{ x: 0, y: 0 }` | 初始坐标值             |

### 返回值

`useMouse` 返回一个包含鼠标状态的响应式对象：

```javascript
const mouse = useMouse(target, options);
```

| 属性       | 类型                   | 说明        |
| ---------- | ---------------------- | ----------- |
| x          | `Ref<number>`          | 鼠标 X 坐标 |
| y          | `Ref<number>`          | 鼠标 Y 坐标 |
| sourceType | `Ref<MouseSourceType>` | 事件源类型  |

### 类型定义

```javascript
// 类型定义（仅供参考）
// Position: { x: number, y: number }
// MouseSourceType: "mouse" | "touch" | null
// UseMouseOptions: {
//   touch?: boolean,
//   resetOnTouchEnds?: boolean,
//   initialValue?: Position
// }
// UseMouseReturn: {
//   x: Ref<number>,
//   y: Ref<number>,
//   sourceType: Ref<MouseSourceType>
// }
```

## 使用场景

1. **鼠标跟随效果** - 创建跟随鼠标的动画元素
2. **拖拽操作** - 实现元素拖拽功能
3. **绘图应用** - 构建画板、签名等功能
4. **游戏开发** - 鼠标控制的游戏交互
5. **数据可视化** - 鼠标悬停显示详细信息
6. **手势识别** - 识别鼠标绘制的手势

## 高级用法

### 相对坐标计算

```javascript
const container = ref();
const mouse = useMouse(container);

// 获取相对于容器的坐标
const relativePosition = computed(() => {
  if (!container.value) return { x: 0, y: 0 };

  const rect = container.value.getBoundingClientRect();
  return {
    x: mouse.x.value,
    y: mouse.y.value,
  };
});
```

### 鼠标按键检测

```javascript
const mouse = useMouse();
const mouseButtons = ref(0);

// 监听鼠标按键
const handleMouseDown = (event: MouseEvent) => {
  mouseButtons.value = event.buttons;
};

const handleMouseUp = () => {
  mouseButtons.value = 0;
};

// 检测特定按键
const isLeftPressed = computed(() => mouseButtons.value & 1);
const isRightPressed = computed(() => mouseButtons.value & 2);
const isMiddlePressed = computed(() => mouseButtons.value & 4);
```

### 鼠标移动距离

```typescript
const mouse = useMouse();
const previousPosition = ref({ x: 0, y: 0 });

const distance = computed(() => {
  const dx = mouse.x.value - previousPosition.value.x;
  const dy = mouse.y.value - previousPosition.value.y;
  return Math.sqrt(dx * dx + dy * dy);
});

watch([mouse.x, mouse.y], ([newX, newY]) => {
  previousPosition.value = { x: newX, y: newY };
});
```

### 鼠标速度计算

```typescript
const mouse = useMouse();
const velocity = ref({ x: 0, y: 0 });
const lastTime = ref(Date.now());
const lastPosition = ref({ x: 0, y: 0 });

watch([mouse.x, mouse.y], ([newX, newY]) => {
  const now = Date.now();
  const dt = now - lastTime.value;

  if (dt > 0) {
    velocity.value = {
      x: (newX - lastPosition.value.x) / dt,
      y: (newY - lastPosition.value.y) / dt,
    };
  }

  lastTime.value = now;
  lastPosition.value = { x: newX, y: newY };
});
```

### 边界检测

```typescript
const container = ref<HTMLElement>();
const mouse = useMouse(container);

const isInBounds = computed(() => {
  if (!container.value) return false;

  const rect = container.value.getBoundingClientRect();
  return (
    mouse.x.value >= 0 &&
    mouse.y.value >= 0 &&
    mouse.x.value <= rect.width &&
    mouse.y.value <= rect.height
  );
});
```

## 注意事项

1. 在服务端渲染时，鼠标坐标始终为初始值
2. 组件卸载时会自动清理事件监听器
3. 触摸设备上会同时监听触摸事件
4. 相对坐标计算需要确保目标元素已挂载
5. 高频率的鼠标移动可能影响性能，考虑使用节流
6. 在某些浏览器中，鼠标离开窗口时坐标可能不准确

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useMouse } from '@vakao-ui/hooks';

// 基础用法
const globalMouse = useMouse();

const trackingArea = ref<HTMLElement>();
const relativeMouse = useMouse({ target: trackingArea });
const isInTrackingArea = ref(false);

const trackingAreaSize = computed(() => {
  if (!trackingArea.value) return { width: 0, height: 0 };
  const rect = trackingArea.value.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height
  };
});

const mouseButtons = computed(() => ({
  left: globalMouse.buttons?.value & 1,
  right: globalMouse.buttons?.value & 2,
  middle: globalMouse.buttons?.value & 4
}));

const mouseTrail = ref<Array<{ x: number; y: number }>>([]);
const isTracking = ref(false);

const startTracking = () => {
  isTracking.value = true;
  mouseTrail.value = [];
};

const stopTracking = () => {
  isTracking.value = false;
};

const clearTrail = () => {
  mouseTrail.value = [];
};

const getTrailPath = () => {
  if (mouseTrail.value.length < 2) return '';
  
  let path = `M ${mouseTrail.value[0].x} ${mouseTrail.value[0].y}`;
  for (let i = 1; i < mouseTrail.value.length; i++) {
    path += ` L ${mouseTrail.value[i].x} ${mouseTrail.value[i].y}`;
  }
  return path;
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isTracking.value) return;
  
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  mouseTrail.value.push({ x, y });
  
  if (mouseTrail.value.length > 100) {
    mouseTrail.value.shift();
  }
};

// 高级用法
const followArea = ref<HTMLElement>();
const followerMouse = useMouse({ target: followArea });
const showFollower = ref(false);

const magnetArea = ref<HTMLElement>();
const magnetMouse = useMouse({ target: magnetArea });
const magnetTargets = ref([
  { x: 100, y: 60, color: '#ff6b6b', label: 'A', scale: 1, isNear: false },
  { x: 300, y: 100, color: '#4ecdc4', label: 'B', scale: 1, isNear: false },
  { x: 500, y: 80, color: '#45b7d1', label: 'C', scale: 1, isNear: false },
  { x: 200, y: 140, color: '#96ceb4', label: 'D', scale: 1, isNear: false },
  { x: 400, y: 160, color: '#feca57', label: 'E', scale: 1, isNear: false }
]);

watch([magnetMouse.x, magnetMouse.y], () => {
  magnetTargets.value.forEach(target => {
    const distance = Math.sqrt(
      Math.pow(magnetMouse.x.value - target.x, 2) + 
      Math.pow(magnetMouse.y.value - target.y, 2)
    );
    
    target.isNear = distance < 80;
    target.scale = target.isNear ? 1.2 : 1;
  });
});

const paintCanvas = ref<HTMLCanvasElement>();
const isPainting = ref(false);
const currentColor = ref('#1890ff');
const brushSize = ref(6);
const paintColors = ['#1890ff', '#52c41a', '#ff4d4f', '#fa8c16', '#722ed1', '#13c2c2', '#eb2f96', '#000000'];

let paintCtx: CanvasRenderingContext2D | null = null;

const startPainting = (event: MouseEvent) => {
  isPainting.value = true;
  paint(event);
};

const paint = (event: MouseEvent) => {
  if (!isPainting.value || !paintCtx) return;
  
  const rect = paintCanvas.value!.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  paintCtx.globalCompositeOperation = 'source-over';
  paintCtx.fillStyle = currentColor.value;
  paintCtx.beginPath();
  paintCtx.arc(x, y, brushSize.value / 2, 0, Math.PI * 2);
  paintCtx.fill();
};

const stopPainting = () => {
  isPainting.value = false;
};

const clearCanvas = () => {
  if (paintCtx) {
    paintCtx.clearRect(0, 0, paintCanvas.value!.width, paintCanvas.value!.height);
  }
};

const gestureArea = ref<HTMLElement>();
const gesturePoints = ref<Array<{ x: number; y: number }>>([]);
const isGesturing = ref(false);
const recognizedGesture = ref('');

const startGesture = () => {
  isGesturing.value = true;
  gesturePoints.value = [];
  recognizedGesture.value = '';
};

const stopGesture = () => {
  isGesturing.value = false;
  if (gesturePoints.value.length > 5) {
    recognizeGesture();
  }
};

const getGesturePath = () => {
  if (gesturePoints.value.length < 2) return '';
  
  let path = `M ${gesturePoints.value[0].x} ${gesturePoints.value[0].y}`;
  for (let i = 1; i < gesturePoints.value.length; i++) {
    path += ` L ${gesturePoints.value[i].x} ${gesturePoints.value[i].y}`;
  }
  return path;
};

const recognizeGesture = () => {
  if (gesturePoints.value.length < 5) return;
  
  const points = gesturePoints.value;
  const startPoint = points[0];
  const endPoint = points[points.length - 1];
  
  const deltaX = endPoint.x - startPoint.x;
  const deltaY = endPoint.y - startPoint.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  if (isCircularGesture(points)) {
    recognizedGesture.value = '圆形 ○';
    return;
  }
  
  if (isDiamondGesture(points)) {
    recognizedGesture.value = '菱形 ◇';
    return;
  }
  
  if (distance > 50) {
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    if (angle >= -45 && angle <= 45) {
      recognizedGesture.value = '向右 →';
    } else if (angle >= 45 && angle <= 135) {
      recognizedGesture.value = '向下 ↓';
    } else if (angle >= 135 || angle <= -135) {
      recognizedGesture.value = '向左 ←';
    } else if (angle >= -135 && angle <= -45) {
      recognizedGesture.value = '向上 ↑';
    }
  }
};

const isCircularGesture = (points: Array<{ x: number; y: number }>) => {
  if (points.length < 10) return false;
  
  const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  
  const avgRadius = points.reduce((sum, p) => {
    return sum + Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
  }, 0) / points.length;
  
  let validPoints = 0;
  points.forEach(p => {
    const radius = Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
    if (Math.abs(radius - avgRadius) < avgRadius * 0.3) {
      validPoints++;
    }
  });
  
  return validPoints / points.length > 0.7;
};

const isDiamondGesture = (points: Array<{ x: number; y: number }>) => {
  if (points.length < 8) return false;
  
  const corners = [];
  for (let i = 2; i < points.length - 2; i++) {
    const prev = points[i - 2];
    const curr = points[i];
    const next = points[i + 2];
    
    const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
    const angleDiff = Math.abs(angle2 - angle1);
    
    if (angleDiff > Math.PI / 3 && angleDiff < 2 * Math.PI / 3) {
      corners.push(curr);
    }
  }
  
  return corners.length >= 3;
};

onMounted(() => {
  const trailArea = document.querySelector('.trail-area');
  if (trailArea) {
    trailArea.addEventListener('mousemove', handleMouseMove);
  }
  
  if (paintCanvas.value) {
    const rect = paintCanvas.value.getBoundingClientRect();
    paintCanvas.value.width = rect.width;
    paintCanvas.value.height = rect.height;
    paintCtx = paintCanvas.value.getContext('2d');
  }
});

onUnmounted(() => {
  const trailArea = document.querySelector('.trail-area');
  if (trailArea) {
    trailArea.removeEventListener('mousemove', handleMouseMove);
  }
});
</script>
