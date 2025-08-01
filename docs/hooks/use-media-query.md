# useMediaQuery

一个媒体查询检测 Hook，提供响应式的屏幕尺寸和设备特性检测。支持自定义媒体查询、预设断点、实时监听等功能，帮助构建响应式应用。

## 基础用法

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">📱 响应式屏幕检测</h3>
    <!-- 屏幕尺寸检测 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">屏幕尺寸检测</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
        <div v-for="breakpoint in breakpoints" :key="breakpoint.name"
             style="padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; transition: all 0.3s;"
             :style="{ 
               background: breakpoint.matches ? 'linear-gradient(45deg, #1890ff, #52c41a)' : '#f5f5f5',
               color: breakpoint.matches ? 'white' : '#666',
               transform: breakpoint.matches ? 'scale(1.05)' : 'scale(1)',
               boxShadow: breakpoint.matches ? '0 4px 12px rgba(24, 144, 255, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
             }">
          <div style="font-size: 24px; margin-bottom: 8px;">{{ breakpoint.icon }}</div>
          <div style="font-size: 14px; margin-bottom: 4px;">{{ breakpoint.name }}</div>
          <div style="font-size: 12px; opacity: 0.8;">{{ breakpoint.description }}</div>
          <div style="font-size: 10px; margin-top: 4px; opacity: 0.7;">{{ breakpoint.query }}</div>
        </div>
      </div>
    </div>
    <!-- 设备特性检测 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">设备特性检测</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
        <div v-for="feature in deviceFeatures" :key="feature.name"
             style="padding: 12px; border-radius: 6px; text-align: center; transition: all 0.3s;"
             :style="{ 
               background: feature.matches ? '#f6ffed' : '#fff2e8',
               border: feature.matches ? '1px solid #b7eb8f' : '1px solid #ffd591',
               color: feature.matches ? '#52c41a' : '#fa8c16'
             }">
          <div style="font-size: 18px; margin-bottom: 6px;">{{ feature.matches ? '✅' : '❌' }}</div>
          <div style="font-size: 12px; font-weight: bold; margin-bottom: 2px;">{{ feature.name }}</div>
          <div style="font-size: 10px; opacity: 0.8;">{{ feature.description }}</div>
        </div>
      </div>
    </div>
    <!-- 当前屏幕信息 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">当前屏幕信息</h4>
      <div style="padding: 16px; background: #f0f9ff; border: 1px solid #91d5ff; border-radius: 8px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; font-size: 14px;">
          <div>
            <span style="font-weight: bold; color: #1890ff;">宽度:</span>
            <span style="margin-left: 8px;">{{ screenWidth }}px</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #1890ff;">高度:</span>
            <span style="margin-left: 8px;">{{ screenHeight }}px</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #1890ff;">比例:</span>
            <span style="margin-left: 8px;">{{ aspectRatio }}</span>
          </div>
          <div>
            <span style="font-weight: bold; color: #1890ff;">方向:</span>
            <span style="margin-left: 8px;">{{ orientation }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 响应式布局演示 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">响应式布局演示</h4>
      <div style="padding: 16px; border: 1px solid #d9d9d9; border-radius: 8px; background: #fafafa;">
        <div style="margin-bottom: 12px; font-size: 12px; color: #666;">
          💡 调整浏览器窗口大小查看布局变化
        </div>
        <div :style="{
          display: 'grid',
          gridTemplateColumns: getGridColumns(),
          gap: '12px'
        }">
          <div v-for="i in 6" :key="i"
               style="padding: 20px; background: linear-gradient(45deg, #667eea, #764ba2); color: white; border-radius: 6px; text-align: center; font-weight: bold;">
            卡片 {{ i }}
          </div>
        </div>
        <div style="margin-top: 12px; padding: 8px; background: #e6f7ff; border-radius: 4px; font-size: 12px; color: #1890ff;">
          当前布局: {{ getCurrentLayout() }}
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 屏幕尺寸检测 -->
    <div>
      <h4>屏幕尺寸检测</h4>
      <div class="breakpoints-grid">
        <div
          v-for="breakpoint in breakpoints"
          :key="breakpoint.name"
          class="breakpoint-card"
          :class="{ active: breakpoint.matches }"
        >
          <div class="breakpoint-icon">{{ breakpoint.icon }}</div>
          <div class="breakpoint-name">{{ breakpoint.name }}</div>
          <div class="breakpoint-description">{{ breakpoint.description }}</div>
          <div class="breakpoint-query">{{ breakpoint.query }}</div>
        </div>
      </div>
    </div>

    <!-- 设备特性检测 -->
    <div>
      <h4>设备特性检测</h4>
      <div class="features-grid">
        <div
          v-for="feature in deviceFeatures"
          :key="feature.name"
          class="feature-card"
          :class="{ supported: feature.matches }"
        >
          <div class="feature-status">{{ feature.matches ? "✅" : "❌" }}</div>
          <div class="feature-name">{{ feature.name }}</div>
          <div class="feature-description">{{ feature.description }}</div>
        </div>
      </div>
    </div>

    <!-- 当前屏幕信息 -->
    <div>
      <h4>当前屏幕信息</h4>
      <div class="screen-info">
        <div>宽度: {{ screenWidth }}px</div>
        <div>高度: {{ screenHeight }}px</div>
        <div>比例: {{ aspectRatio }}</div>
        <div>方向: {{ orientation }}</div>
      </div>
    </div>

    <!-- 响应式布局演示 -->
    <div>
      <h4>响应式布局演示</h4>
      <div class="layout-demo">
        <div class="layout-tip">💡 调整浏览器窗口大小查看布局变化</div>
        <div
          class="responsive-grid"
          :style="{ gridTemplateColumns: getGridColumns() }"
        >
          <div v-for="i in 6" :key="i" class="grid-item">卡片 {{ i }}</div>
        </div>
        <div class="layout-info">当前布局: {{ getCurrentLayout() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMediaQuery } from "@vakao-ui/hooks";

// 屏幕尺寸检测
const breakpoints = [
  {
    name: "手机",
    icon: "📱",
    description: "小屏设备",
    query: "(max-width: 768px)",
    matches: useMediaQuery("(max-width: 768px)"),
  },
  {
    name: "平板",
    icon: "📟",
    description: "中等屏幕",
    query: "(min-width: 769px) and (max-width: 1024px)",
    matches: useMediaQuery("(min-width: 769px) and (max-width: 1024px)"),
  },
  {
    name: "桌面",
    icon: "🖥️",
    description: "大屏设备",
    query: "(min-width: 1025px)",
    matches: useMediaQuery("(min-width: 1025px)"),
  },
  {
    name: "超宽屏",
    icon: "🖥️",
    description: "超大屏幕",
    query: "(min-width: 1440px)",
    matches: useMediaQuery("(min-width: 1440px)"),
  },
];

// 设备特性检测
const deviceFeatures = [
  {
    name: "触摸屏",
    description: "支持触摸操作",
    matches: useMediaQuery("(pointer: coarse)"),
  },
  {
    name: "高分辨率",
    description: "Retina 显示屏",
    matches: useMediaQuery("(min-resolution: 2dppx)"),
  },
  {
    name: "深色模式",
    description: "系统深色主题",
    matches: useMediaQuery("(prefers-color-scheme: dark)"),
  },
  {
    name: "减少动画",
    description: "用户偏好减少动画",
    matches: useMediaQuery("(prefers-reduced-motion: reduce)"),
  },
  {
    name: "横屏模式",
    description: "设备横向放置",
    matches: useMediaQuery("(orientation: landscape)"),
  },
  {
    name: "悬停支持",
    description: "支持鼠标悬停",
    matches: useMediaQuery("(hover: hover)"),
  },
];

// 屏幕尺寸信息
const screenWidth = computed(() => window.innerWidth);
const screenHeight = computed(() => window.innerHeight);
const aspectRatio = computed(() => {
  const ratio = screenWidth.value / screenHeight.value;
  return `${Math.round(ratio * 100) / 100}:1`;
});
const orientation = computed(() => {
  return screenWidth.value > screenHeight.value ? "横屏" : "竖屏";
});

// 响应式布局
const isMobile = useMediaQuery("(max-width: 768px)");
const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
const isDesktop = useMediaQuery("(min-width: 1025px)");

const getGridColumns = () => {
  if (isMobile.value) return "repeat(1, 1fr)";
  if (isTablet.value) return "repeat(2, 1fr)";
  if (isDesktop.value) return "repeat(3, 1fr)";
  return "repeat(1, 1fr)";
};

const getCurrentLayout = () => {
  if (isMobile.value) return "单列布局 (手机)";
  if (isTablet.value) return "双列布局 (平板)";
  if (isDesktop.value) return "三列布局 (桌面)";
  return "未知布局";
};
</script>

<style scoped>
.breakpoints-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.breakpoint-card {
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s;
  color: #666;
}

.breakpoint-card.active {
  background: linear-gradient(45deg, #1890ff, #52c41a);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.breakpoint-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.breakpoint-name {
  font-size: 14px;
  margin-bottom: 4px;
}

.breakpoint-description {
  font-size: 12px;
  opacity: 0.8;
}

.breakpoint-query {
  font-size: 10px;
  margin-top: 4px;
  opacity: 0.7;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.feature-card {
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  transition: all 0.3s;
  background: #fff2e8;
  border: 1px solid #ffd591;
  color: #fa8c16;
}

.feature-card.supported {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  color: #52c41a;
}

.feature-status {
  font-size: 18px;
  margin-bottom: 6px;
}

.feature-name {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
}

.feature-description {
  font-size: 10px;
  opacity: 0.8;
}

.screen-info {
  padding: 16px;
  background: #f0f9ff;
  border: 1px solid #91d5ff;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  font-size: 14px;
}

.layout-demo {
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fafafa;
}

.layout-tip {
  margin-bottom: 12px;
  font-size: 12px;
  color: #666;
}

.responsive-grid {
  display: grid;
  gap: 12px;
}

.grid-item {
  padding: 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
}

.layout-info {
  margin-top: 12px;
  padding: 8px;
  background: #e6f7ff;
  border-radius: 4px;
  font-size: 12px;
  color: #1890ff;
}
</style>
```

  </template>
</Demo>

## 高级用法示例

<Demo>
  <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
    <h3 style="margin-top: 0;">🎯 高级媒体查询应用</h3>
    <!-- 主题适配 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">🎨 主题适配</h4>
      <div style="padding: 16px; border-radius: 8px; transition: all 0.3s;"
           :style="{
             background: prefersDark ? 'linear-gradient(45deg, #2c3e50, #34495e)' : 'linear-gradient(45deg, #74b9ff, #0984e3)',
             color: prefersDark ? '#ecf0f1' : '#2d3436'
           }">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h5 style="margin: 0; font-size: 16px;">{{ prefersDark ? '🌙 深色主题' : '☀️ 浅色主题' }}</h5>
          <div style="padding: 4px 12px; border-radius: 20px; font-size: 12px;"
               :style="{
                 background: prefersDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                 color: prefersDark ? '#ecf0f1' : '#2d3436'
               }">
            {{ prefersDark ? '系统深色模式' : '系统浅色模式' }}
          </div>
        </div>
        <p style="margin: 0; opacity: 0.9; font-size: 14px;">
          这个卡片会根据系统的深色模式偏好自动调整主题。
          在 macOS 上可以通过 系统偏好设置 > 通用 > 外观 来切换。
        </p>
      </div>
    </div>
    <!-- 动画偏好 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">🎬 动画偏好适配</h4>
      <div style="padding: 16px; border: 1px solid #d9d9d9; border-radius: 8px; background: #fafafa;">
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: bold;">动画状态:</span>
          <span :style="{ color: prefersReducedMotion ? '#ff4d4f' : '#52c41a' }">
            {{ prefersReducedMotion ? '❌ 已禁用' : '✅ 已启用' }}
          </span>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #ff6b6b, #ee5a24);"
               :style="{
                 animation: prefersReducedMotion ? 'none' : 'bounce 2s infinite',
                 transform: prefersReducedMotion ? 'none' : 'translateY(0)'
               }">
          </div>
          <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #4834d4, #686de0);"
               :style="{
                 animation: prefersReducedMotion ? 'none' : 'pulse 1.5s infinite',
                 transform: prefersReducedMotion ? 'none' : 'scale(1)'
               }">
          </div>
          <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #00d2d3, #54a0ff);"
               :style="{
                 animation: prefersReducedMotion ? 'none' : 'rotate 3s linear infinite',
                 transform: prefersReducedMotion ? 'none' : 'rotate(0deg)'
               }">
          </div>
        </div>
        <p style="margin: 0; font-size: 12px; color: #666;">
          💡 如果用户偏好减少动画，上面的动画效果会被禁用
        </p>
      </div>
    </div>
    <!-- 交互方式检测 -->
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">👆 交互方式检测</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
        <!-- 触摸设备 -->
        <div style="padding: 16px; border-radius: 8px;"
             :style="{
               background: hasTouch ? '#f6ffed' : '#fff2e8',
               border: hasTouch ? '1px solid #b7eb8f' : '1px solid #ffd591'
             }">
          <h5 style="margin: 0 0 8px 0; color: #1890ff;">{{ hasTouch ? '📱' : '🖱️' }} 输入方式</h5>
          <p style="margin: 0 0 8px 0; font-size: 14px;">
            <strong>{{ hasTouch ? '触摸设备' : '鼠标设备' }}</strong>
          </p>
          <p style="margin: 0; font-size: 12px; color: #666;">
            {{ hasTouch ? '检测到粗糙指针（手指触摸）' : '检测到精确指针（鼠标）' }}
          </p>
        </div>
        <!-- 悬停支持 -->
        <div style="padding: 16px; border-radius: 8px;"
             :style="{
               background: canHover ? '#f6ffed' : '#fff2e8',
               border: canHover ? '1px solid #b7eb8f' : '1px solid #ffd591'
             }">
          <h5 style="margin: 0 0 8px 0; color: #722ed1;">{{ canHover ? '🎯' : '👆' }} 悬停能力</h5>
          <p style="margin: 0 0 8px 0; font-size: 14px;">
            <strong>{{ canHover ? '支持悬停' : '不支持悬停' }}</strong>
          </p>
          <p style="margin: 0; font-size: 12px; color: #666;">
            {{ canHover ? '可以使用 hover 效果' : '应避免依赖 hover 效果' }}
          </p>
        </div>
      </div>
    </div>
    <!-- 自适应导航 -->
    <div>
      <h4 style="margin: 0 0 12px 0; font-size: 14px;">🧭 自适应导航</h4>
      <div style="padding: 16px; border: 1px solid #d9d9d9; border-radius: 8px; background: #fafafa;">
        <!-- 桌面导航 -->
        <div v-if="isLargeScreen" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #001529; border-radius: 6px; color: white;">
          <div style="display: flex; align-items: center; gap: 20px;">
            <div style="font-weight: bold; font-size: 18px;">🏠 Logo</div>
            <nav style="display: flex; gap: 16px;">
              <a href="#" style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px; transition: background 0.3s;"
                 @mouseover="$event.target.style.background = 'rgba(255,255,255,0.1)'"
                 @mouseleave="$event.target.style.background = 'transparent'">首页</a>
              <a href="#" style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px; transition: background 0.3s;"
                 @mouseover="$event.target.style.background = 'rgba(255,255,255,0.1)'"
                 @mouseleave="$event.target.style.background = 'transparent'">产品</a>
              <a href="#" style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px; transition: background 0.3s;"
                 @mouseover="$event.target.style.background = 'rgba(255,255,255,0.1)'"
                 @mouseleave="$event.target.style.background = 'transparent'">关于</a>
              <a href="#" style="color: white; text-decoration: none; padding: 8px 12px; border-radius: 4px; transition: background 0.3s;"
                 @mouseover="$event.target.style.background = 'rgba(255,255,255,0.1)'"
                 @mouseleave="$event.target.style.background = 'transparent'">联系</a>
            </nav>
          </div>
          <div style="display: flex; gap: 8px;">
            <button style="padding: 6px 12px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">登录</button>
            <button style="padding: 6px 12px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">注册</button>
          </div>
        </div>
        <!-- 移动端导航 -->
        <div v-else style="background: #001529; border-radius: 6px; color: white;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px;">
            <div style="font-weight: bold; font-size: 18px;">🏠 Logo</div>
            <button @click="mobileMenuOpen = !mobileMenuOpen" 
                    style="padding: 8px; background: transparent; color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; cursor: pointer;">
              {{ mobileMenuOpen ? '✕' : '☰' }}
            </button>
          </div>
          <div v-if="mobileMenuOpen" style="border-top: 1px solid rgba(255,255,255,0.1); padding: 12px 0;">
            <a href="#" style="display: block; color: white; text-decoration: none; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">首页</a>
            <a href="#" style="display: block; color: white; text-decoration: none; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">产品</a>
            <a href="#" style="display: block; color: white; text-decoration: none; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">关于</a>
            <a href="#" style="display: block; color: white; text-decoration: none; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">联系</a>
            <div style="padding: 12px 16px; display: flex; gap: 8px;">
              <button style="flex: 1; padding: 8px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">登录</button>
              <button style="flex: 1; padding: 8px; background: #52c41a; color: white; border: none; border-radius: 4px; cursor: pointer;">注册</button>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 12px; padding: 8px; background: #e6f7ff; border-radius: 4px; font-size: 12px; color: #1890ff;">
          当前使用: {{ isLargeScreen ? '桌面端导航' : '移动端导航' }}
        </div>
      </div>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <!-- 主题适配 -->
    <div>
      <h4>🎨 主题适配</h4>
      <div class="theme-card" :class="{ dark: prefersDark }">
        <div class="theme-header">
          <h5>{{ prefersDark ? "🌙 深色主题" : "☀️ 浅色主题" }}</h5>
          <div class="theme-badge">
            {{ prefersDark ? "系统深色模式" : "系统浅色模式" }}
          </div>
        </div>
        <p>这个卡片会根据系统的深色模式偏好自动调整主题。</p>
      </div>
    </div>

    <!-- 动画偏好 -->
    <div>
      <h4>🎬 动画偏好适配</h4>
      <div class="animation-demo">
        <div class="animation-status">
          动画状态:
          <span :class="{ disabled: prefersReducedMotion }">
            {{ prefersReducedMotion ? "❌ 已禁用" : "✅ 已启用" }}
          </span>
        </div>
        <div class="animation-balls">
          <div
            class="ball bounce"
            :class="{ 'no-animation': prefersReducedMotion }"
          ></div>
          <div
            class="ball pulse"
            :class="{ 'no-animation': prefersReducedMotion }"
          ></div>
          <div
            class="ball rotate"
            :class="{ 'no-animation': prefersReducedMotion }"
          ></div>
        </div>
        <p>💡 如果用户偏好减少动画，上面的动画效果会被禁用</p>
      </div>
    </div>

    <!-- 交互方式检测 -->
    <div>
      <h4>👆 交互方式检测</h4>
      <div class="interaction-grid">
        <div class="interaction-card" :class="{ active: hasTouch }">
          <h5>{{ hasTouch ? "📱" : "🖱️" }} 输入方式</h5>
          <p>
            <strong>{{ hasTouch ? "触摸设备" : "鼠标设备" }}</strong>
          </p>
          <p>
            {{
              hasTouch ? "检测到粗糙指针（手指触摸）" : "检测到精确指针（鼠标）"
            }}
          </p>
        </div>

        <div class="interaction-card" :class="{ active: canHover }">
          <h5>{{ canHover ? "🎯" : "👆" }} 悬停能力</h5>
          <p>
            <strong>{{ canHover ? "支持悬停" : "不支持悬停" }}</strong>
          </p>
          <p>
            {{ canHover ? "可以使用 hover 效果" : "应避免依赖 hover 效果" }}
          </p>
        </div>
      </div>
    </div>

    <!-- 自适应导航 -->
    <div>
      <h4>🧭 自适应导航</h4>
      <div class="navigation-demo">
        <!-- 桌面导航 -->
        <nav v-if="isLargeScreen" class="desktop-nav">
          <div class="nav-left">
            <div class="logo">🏠 Logo</div>
            <div class="nav-links">
              <a href="#">首页</a>
              <a href="#">产品</a>
              <a href="#">关于</a>
              <a href="#">联系</a>
            </div>
          </div>
          <div class="nav-actions">
            <button class="btn-login">登录</button>
            <button class="btn-register">注册</button>
          </div>
        </nav>

        <!-- 移动端导航 -->
        <nav v-else class="mobile-nav">
          <div class="mobile-header">
            <div class="logo">🏠 Logo</div>
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="menu-toggle"
            >
              {{ mobileMenuOpen ? "✕" : "☰" }}
            </button>
          </div>
          <div v-if="mobileMenuOpen" class="mobile-menu">
            <a href="#">首页</a>
            <a href="#">产品</a>
            <a href="#">关于</a>
            <a href="#">联系</a>
            <div class="mobile-actions">
              <button class="btn-login">登录</button>
              <button class="btn-register">注册</button>
            </div>
          </div>
        </nav>

        <div class="nav-info">
          当前使用: {{ isLargeScreen ? "桌面端导航" : "移动端导航" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMediaQuery } from "@vakao-ui/hooks";

// 系统偏好检测
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

// 交互方式检测
const hasTouch = useMediaQuery("(pointer: coarse)");
const canHover = useMediaQuery("(hover: hover)");

// 屏幕尺寸检测
const isLargeScreen = useMediaQuery("(min-width: 768px)");

// 移动端菜单状态
const mobileMenuOpen = ref(false);
</script>

<style scoped>
.theme-card {
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s;
  background: linear-gradient(45deg, #74b9ff, #0984e3);
  color: #2d3436;
}

.theme-card.dark {
  background: linear-gradient(45deg, #2c3e50, #34495e);
  color: #ecf0f1;
}

.theme-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.theme-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
}

.animation-demo {
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fafafa;
}

.animation-status {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.animation-status .disabled {
  color: #ff4d4f;
}

.animation-balls {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.ball {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.ball.bounce {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  animation: bounce 2s infinite;
}

.ball.pulse {
  background: linear-gradient(45deg, #4834d4, #686de0);
  animation: pulse 1.5s infinite;
}

.ball.rotate {
  background: linear-gradient(45deg, #00d2d3, #54a0ff);
  animation: rotate 3s linear infinite;
}

.ball.no-animation {
  animation: none !important;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.interaction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.interaction-card {
  padding: 16px;
  border-radius: 8px;
  background: #fff2e8;
  border: 1px solid #ffd591;
}

.interaction-card.active {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.navigation-demo {
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #fafafa;
}

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #001529;
  border-radius: 6px;
  color: white;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  font-weight: bold;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-actions {
  display: flex;
  gap: 8px;
}

.btn-login {
  padding: 6px 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-register {
  padding: 6px 12px;
  background: #52c41a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.mobile-nav {
  background: #001529;
  border-radius: 6px;
  color: white;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.menu-toggle {
  padding: 8px;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
}

.mobile-menu {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 0;
}

.mobile-menu a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-actions {
  padding: 12px 16px;
  display: flex;
  gap: 8px;
}

.mobile-actions button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.nav-info {
  margin-top: 12px;
  padding: 8px;
  background: #e6f7ff;
  border-radius: 4px;
  font-size: 12px;
  color: #1890ff;
}
</style>
```

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                   | 默认值 | 说明           |
| ------- | ---------------------- | ------ | -------------- |
| query   | `string`               | -      | 媒体查询字符串 |
| options | `UseMediaQueryOptions` | `{}`   | 配置选项       |

### UseMediaQueryOptions

| 属性         | 类型      | 默认值          | 说明     |
| ------------ | --------- | --------------- | -------- |
| window       | `Window`  | `defaultWindow` | 窗口对象 |
| initialValue | `boolean` | `false`         | 初始值   |

### 返回值

`useMediaQuery` 返回一个响应式的布尔值：

```typescript
const matches = useMediaQuery(query, options);
```

| 类型           | 说明             |
| -------------- | ---------------- |
| `Ref<boolean>` | 媒体查询是否匹配 |

### 类型定义

```typescript
export interface UseMediaQueryOptions {
  window?: Window;
  initialValue?: boolean;
}

export function useMediaQuery(
  query: string,
  options?: UseMediaQueryOptions,
): Ref<boolean>;
```

## 常用媒体查询

### 屏幕尺寸

```typescript
// 移动设备
const isMobile = useMediaQuery("(max-width: 768px)");

// 平板设备
const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

// 桌面设备
const isDesktop = useMediaQuery("(min-width: 1025px)");

// 大屏设备
const isLargeScreen = useMediaQuery("(min-width: 1440px)");
```

### 设备特性

```typescript
// 触摸设备
const hasTouch = useMediaQuery("(pointer: coarse)");

// 支持悬停
const canHover = useMediaQuery("(hover: hover)");

// 高分辨率屏幕
const isRetina = useMediaQuery("(min-resolution: 2dppx)");

// 设备方向
const isLandscape = useMediaQuery("(orientation: landscape)");
const isPortrait = useMediaQuery("(orientation: portrait)");
```

### 用户偏好

```typescript
// 深色模式
const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

// 浅色模式
const prefersLight = useMediaQuery("(prefers-color-scheme: light)");

// 减少动画
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

// 高对比度
const prefersHighContrast = useMediaQuery("(prefers-contrast: high)");
```

### 打印样式

```typescript
// 打印模式
const isPrint = useMediaQuery("print");

// 屏幕模式
const isScreen = useMediaQuery("screen");
```

## 使用场景

1. **响应式布局** - 根据屏幕尺寸调整布局
2. **主题适配** - 根据系统偏好切换主题
3. **交互优化** - 根据设备特性优化交互
4. **性能优化** - 根据设备能力调整功能
5. **无障碍访问** - 根据用户偏好调整体验

## 高级用法

### 组合多个媒体查询

```typescript
const isMobilePortrait = useMediaQuery(
  "(max-width: 768px) and (orientation: portrait)",
);
const isTabletLandscape = useMediaQuery(
  "(min-width: 769px) and (max-width: 1024px) and (orientation: landscape)",
);
```

### 动态媒体查询

```typescript
const breakpoint = ref("768px");
const query = computed(() => `(max-width: ${breakpoint.value})`);
const matches = useMediaQuery(query);
```

### 媒体查询工具函数

```typescript
// 创建断点检测器
const createBreakpoint = (size: string) => {
  return {
    up: useMediaQuery(`(min-width: ${size})`),
    down: useMediaQuery(`(max-width: ${size})`),
    only: useMediaQuery(
      `(min-width: ${size}) and (max-width: ${getNextSize(size)})`,
    ),
  };
};

const sm = createBreakpoint("576px");
const md = createBreakpoint("768px");
const lg = createBreakpoint("992px");
const xl = createBreakpoint("1200px");
```

### 条件渲染组件

```typescript
// 根据屏幕尺寸渲染不同组件
const MobileComponent = defineAsyncComponent(
  () => import("./MobileComponent.vue"),
);
const DesktopComponent = defineAsyncComponent(
  () => import("./DesktopComponent.vue"),
);

const isMobile = useMediaQuery("(max-width: 768px)");

// 在模板中使用
// <MobileComponent v-if="isMobile" />
// <DesktopComponent v-else />
```

## 注意事项

1. 媒体查询在服务端渲染时始终返回 `initialValue`
2. 组件卸载时会自动清理事件监听器
3. 避免在媒体查询中使用过于复杂的逻辑
4. 考虑使用 CSS 媒体查询处理样式相关的响应式需求
5. 注意不同浏览器对媒体查询特性的支持差异
6. 在移动设备上，屏幕方向变化可能有延迟

<script setup>
import { ref, computed } from 'vue';
import { useMediaQuery } from '@vakao-ui/hooks';

// 基础用法
const breakpoints = [
  {
    name: '手机',
    icon: '📱',
    description: '小屏设备',
    query: '(max-width: 768px)',
    matches: useMediaQuery('(max-width: 768px)')
  },
  {
    name: '平板',
    icon: '📟',
    description: '中等屏幕',
    query: '(min-width: 769px) and (max-width: 1024px)',
    matches: useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  },
  {
    name: '桌面',
    icon: '🖥️',
    description: '大屏设备',
    query: '(min-width: 1025px)',
    matches: useMediaQuery('(min-width: 1025px)')
  },
  {
    name: '超宽屏',
    icon: '🖥️',
    description: '超大屏幕',
    query: '(min-width: 1440px)',
    matches: useMediaQuery('(min-width: 1440px)')
  }
];

const deviceFeatures = [
  {
    name: '触摸屏',
    description: '支持触摸操作',
    matches: useMediaQuery('(pointer: coarse)')
  },
  {
    name: '高分辨率',
    description: 'Retina 显示屏',
    matches: useMediaQuery('(min-resolution: 2dppx)')
  },
  {
    name: '深色模式',
    description: '系统深色主题',
    matches: useMediaQuery('(prefers-color-scheme: dark)')
  },
  {
    name: '减少动画',
    description: '用户偏好减少动画',
    matches: useMediaQuery('(prefers-reduced-motion: reduce)')
  },
  {
    name: '横屏模式',
    description: '设备横向放置',
    matches: useMediaQuery('(orientation: landscape)')
  },
  {
    name: '悬停支持',
    description: '支持鼠标悬停',
    matches: useMediaQuery('(hover: hover)')
  }
];

const screenWidth = computed(() => window.innerWidth);
const screenHeight = computed(() => window.innerHeight);
const aspectRatio = computed(() => {
  const ratio = screenWidth.value / screenHeight.value;
  return `${Math.round(ratio * 100) / 100}:1`;
});
const orientation = computed(() => {
  return screenWidth.value > screenHeight.value ? '横屏' : '竖屏';
});

const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
const isDesktop = useMediaQuery('(min-width: 1025px)');

const getGridColumns = () => {
  if (isMobile.value) return 'repeat(1, 1fr)';
  if (isTablet.value) return 'repeat(2, 1fr)';
  if (isDesktop.value) return 'repeat(3, 1fr)';
  return 'repeat(1, 1fr)';
};

const getCurrentLayout = () => {
  if (isMobile.value) return '单列布局 (手机)';
  if (isTablet.value) return '双列布局 (平板)';
  if (isDesktop.value) return '三列布局 (桌面)';
  return '未知布局';
};

// 高级用法
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
const hasTouch = useMediaQuery('(pointer: coarse)');
const canHover = useMediaQuery('(hover: hover)');
const isLargeScreen = useMediaQuery('(min-width: 768px)');
const mobileMenuOpen = ref(false);
</script>
