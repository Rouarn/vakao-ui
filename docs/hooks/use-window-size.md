# useWindowSize

一个窗口尺寸获取和监听 Hook，提供窗口尺寸的响应式获取和实时监听功能。支持防抖优化、服务端渲染，常用于响应式布局、媒体查询判断、组件尺寸适配等场景。

## 基础用法

<Demo>
  <template>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">📐 窗口尺寸监听</h3>
      <!-- 基础尺寸显示 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">实时窗口尺寸</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">宽度</div>
              <div style="font-size: 24px; font-weight: bold; color: #1890ff;">{{ windowSize.width }}px</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">高度</div>
              <div style="font-size: 24px; font-weight: bold; color: #52c41a;">{{ windowSize.height }}px</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">比例</div>
              <div style="font-size: 16px; font-weight: bold; color: #722ed1;">{{ aspectRatio }}</div>
            </div>
          </div>
          <div style="margin-top: 12px; padding: 8px; background: #e6f7ff; border-radius: 4px; font-size: 12px; color: #1890ff;">
            💡 调整浏览器窗口大小查看实时变化
          </div>
        </div>
      </div>
      <!-- 响应式断点 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">响应式断点检测</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin-bottom: 12px;">
            <div 
              v-for="(active, name) in breakpoints" 
              :key="name"
              style="padding: 8px 12px; border-radius: 4px; text-align: center; font-size: 12px; font-weight: bold; transition: all 0.2s;"
              :style="{
                background: active ? '#52c41a' : '#f0f0f0',
                color: active ? 'white' : '#666'
              }"
            >
              {{ name.toUpperCase() }}
            </div>
          </div>
          <div style="padding: 8px 12px; background: white; border-radius: 4px; border: 1px solid #e8e8e8; font-size: 12px;">
            <strong>当前断点:</strong> 
            <span style="color: #1890ff; font-weight: bold;">{{ currentBreakpoint.toUpperCase() }}</span>
            <span style="color: #666; margin-left: 8px;">({{ getBreakpointRange(currentBreakpoint) }})</span>
          </div>
        </div>
      </div>
      <!-- 设备类型检测 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">设备类型检测</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px;">
            <div 
              style="padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;"
              :style="{
                background: isMobile ? '#ff4d4f' : '#f0f0f0',
                color: isMobile ? 'white' : '#666'
              }"
            >
              📱 移动设备
            </div>
            <div 
              style="padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;"
              :style="{
                background: isTablet ? '#fa8c16' : '#f0f0f0',
                color: isTablet ? 'white' : '#666'
              }"
            >
              📟 平板设备
            </div>
            <div 
              style="padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;"
              :style="{
                background: isDesktop ? '#1890ff' : '#f0f0f0',
                color: isDesktop ? 'white' : '#666'
              }"
            >
              🖥️ 桌面设备
            </div>
          </div>
          <div style="padding: 8px 12px; background: white; border-radius: 4px; border: 1px solid #e8e8e8; font-size: 12px;">
            <div><strong>设备类型:</strong> {{ deviceType }}</div>
            <div><strong>屏幕密度:</strong> {{ screenDensity }}</div>
          </div>
        </div>
      </div>
      <!-- 手动控制 -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">手动控制</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
            <button 
              @click="updateSize"
              style="padding: 6px 12px; border: 1px solid #1890ff; border-radius: 4px; background: #1890ff; color: white; cursor: pointer; font-size: 12px;"
            >
              🔄 手动更新
            </button>
            <button 
              @click="toggleListening"
              style="padding: 6px 12px; border: 1px solid #52c41a; border-radius: 4px; background: white; color: #52c41a; cursor: pointer; font-size: 12px;"
              :style="{
                background: isListening ? '#52c41a' : 'white',
                color: isListening ? 'white' : '#52c41a'
              }"
            >
              {{ isListening ? '🔇 停止监听' : '🔊 开始监听' }}
            </button>
          </div>
          <div style="padding: 8px 12px; background: white; border-radius: 4px; border: 1px solid #e8e8e8; font-size: 12px; font-family: monospace;">
            <div>监听状态: {{ isListening ? '✅ 已启用' : '❌ 已禁用' }}</div>
            <div>更新次数: {{ updateCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
</Demo>

## 高级用法

<Demo>
  <template>
    <div style="padding: 20px; border: 1px solid #e8e8e8; border-radius: 8px; width: 100%;">
      <h3 style="margin-top: 0;">🚀 高级窗口尺寸功能</h3>
      <!-- 防抖优化 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">防抖优化</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 12px; color: #666;">防抖延迟:</span>
            <select 
              v-model.number="debounceDelay" 
              @change="updateDebounceSettings"
              style="padding: 4px 8px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 12px;"
            >
              <option :value="0">无防抖</option>
              <option :value="100">100ms</option>
              <option :value="300">300ms</option>
              <option :value="500">500ms</option>
              <option :value="1000">1000ms</option>
            </select>
            <span style="font-size: 12px; color: #666;">更新次数: {{ debouncedUpdateCount }}</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">实时尺寸</div>
              <div style="font-size: 14px; font-weight: bold; color: #1890ff;">{{ windowSize.width }} × {{ windowSize.height }}</div>
              <div style="font-size: 10px; color: #999;">无延迟更新</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">防抖尺寸</div>
              <div style="font-size: 14px; font-weight: bold; color: #52c41a;">{{ debouncedSize.width }} × {{ debouncedSize.height }}</div>
              <div style="font-size: 10px; color: #999;">{{ debounceDelay }}ms 延迟</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 响应式布局示例 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">响应式布局示例</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div 
            style="display: grid; gap: 8px; margin-bottom: 12px;"
            :style="{
              gridTemplateColumns: getGridColumns()
            }"
          >
            <div 
              v-for="i in 12" 
              :key="i"
              style="background: #1890ff; color: white; padding: 8px; border-radius: 4px; text-align: center; font-size: 12px; font-weight: bold;"
            >
              {{ i }}
            </div>
          </div>
          <div style="padding: 8px 12px; background: white; border-radius: 4px; border: 1px solid #e8e8e8; font-size: 12px;">
            <div><strong>当前列数:</strong> {{ getColumnCount() }}</div>
            <div><strong>布局模式:</strong> {{ getLayoutMode() }}</div>
          </div>
        </div>
      </div>
      <!-- 窗口比例分析 -->
      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">窗口比例分析</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px; margin-bottom: 12px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 12px;">
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8; text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">宽高比</div>
              <div style="font-size: 16px; font-weight: bold; color: #1890ff;">{{ aspectRatio }}</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8; text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">方向</div>
              <div style="font-size: 16px; font-weight: bold; color: #52c41a;">{{ orientation }}</div>
            </div>
            <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8; text-align: center;">
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">像素密度</div>
              <div style="font-size: 16px; font-weight: bold; color: #722ed1;">{{ pixelDensity }}</div>
            </div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 4px; border: 1px solid #e8e8e8;">
            <div style="font-size: 12px; color: #666; margin-bottom: 8px;">窗口尺寸可视化</div>
            <div
              style="background: linear-gradient(45deg, #1890ff, #52c41a); border-radius: 4px; position: relative; overflow: hidden;"
              :style="{
                width: '100%',
                height: '60px'
              }"
            >
              <div
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 12px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.5);"
              >
                {{ windowSize.width }} × {{ windowSize.height }}
              </div>
              <div
                style="position: absolute; bottom: 4px; right: 4px; color: white; font-size: 10px; opacity: 0.8;"
              >
                {{ Math.round(windowSize.width * windowSize.height / 1000) }}K 像素
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 性能监控 -->
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px;">性能监控</h4>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 6px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 12px;">
            <div style="background: white; padding: 8px; border-radius: 4px; border: 1px solid #e8e8e8; text-align: center;">
              <div style="font-size: 10px; color: #666;">总更新次数</div>
              <div style="font-size: 16px; font-weight: bold; color: #1890ff;">{{ performanceStats.totalUpdates }}</div>
            </div>
            <div style="background: white; padding: 8px; border-radius: 4px; border: 1px solid #e8e8e8; text-align: center;">
              <div style="font-size: 10px; color: #666;">平均间隔</div>
              <div style="font-size: 16px; font-weight: bold; color: #52c41a;">{{ performanceStats.averageInterval }}ms</div>
            </div>
            <div style="background: white; padding: 8px; border-radius: 4px; border: 1px solid #e8e8e8; text-align: center;">
              <div style="font-size: 10px; color: #666;">最后更新</div>
              <div style="font-size: 16px; font-weight: bold; color: #722ed1;">{{ performanceStats.lastUpdate }}</div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button
              @click="resetStats"
              style="padding: 4px 8px; border: 1px solid #ff4d4f; border-radius: 4px; background: white; color: #ff4d4f; cursor: pointer; font-size: 12px;"
            >
              重置统计
            </button>
            <div style="font-size: 12px; color: #666;">
              监听时长: {{ Math.round(performanceStats.duration / 1000) }}s
            </div>
          </div>
        </div>
      </div>
    </div>

  </template>
</Demo>

## API 参考

### 参数

| 参数    | 类型                   | 默认值 | 说明     |
| ------- | ---------------------- | ------ | -------- |
| options | `UseWindowSizeOptions` | `{}`   | 配置选项 |

### UseWindowSizeOptions

| 属性          | 类型      | 默认值 | 说明                   |
| ------------- | --------- | ------ | ---------------------- |
| immediate     | `boolean` | `true` | 是否立即获取窗口尺寸   |
| listen        | `boolean` | `true` | 是否监听窗口尺寸变化   |
| debounce      | `number`  | `0`    | 防抖延迟时间（毫秒）   |
| initialWidth  | `number`  | `1024` | 初始宽度（SSR 时使用） |
| initialHeight | `number`  | `768`  | 初始高度（SSR 时使用） |

### 返回值

`useWindowSize` 返回一个包含窗口尺寸信息和控制函数的数组：

```javascript
const [size, updateSize, setEnabled] = useWindowSize(options);
```

| 索引 | 名称       | 类型                         | 说明             |
| ---- | ---------- | ---------------------------- | ---------------- |
| 0    | size       | `ComputedRef<WindowSize>`    | 窗口尺寸信息     |
| 1    | updateSize | `() => void`                 | 手动更新窗口尺寸 |
| 2    | setEnabled | `(enabled: boolean) => void` | 启用/禁用监听    |

### WindowSize

| 属性   | 类型     | 说明             |
| ------ | -------- | ---------------- |
| width  | `number` | 窗口宽度（像素） |
| height | `number` | 窗口高度（像素） |

### 类型定义

```javascript
// 类型定义（仅供参考）
// WindowSize: { width: number, height: number }
// UseWindowSizeOptions: {
//   immediate?: boolean,
//   listen?: boolean,
//   debounce?: number,
//   initialWidth?: number,
//   initialHeight?: number
// }
// 
// 返回值: [windowSize, refresh, setEnabled]
```

## 使用场景

1. **响应式布局** - 根据窗口尺寸调整布局
2. **媒体查询** - JavaScript 中的断点检测
3. **组件适配** - 组件根据屏幕尺寸调整行为
4. **性能优化** - 防抖处理频繁的尺寸变化
5. **设备检测** - 判断移动端、平板、桌面设备
6. **图表自适应** - 图表组件根据容器尺寸调整

## 高级用法

### 响应式断点系统

```javascript
// 响应式断点系统
const [windowSize] = useWindowSize();

// 定义断点
const breakpoints = computed(() => {
  const { width } = windowSize.value;
  return {
    xs: width < 576,
    sm: width >= 576 && width < 768,
    md: width >= 768 && width < 992,
    lg: width >= 992 && width < 1200,
    xl: width >= 1200 && width < 1920,
    xxl: width >= 1920,
  };
});

// 获取当前断点
const currentBreakpoint = computed(() => {
  const bp = breakpoints.value;
  if (bp.xs) return "xs";
  if (bp.sm) return "sm";
  if (bp.md) return "md";
  if (bp.lg) return "lg";
  if (bp.xl) return "xl";
  return "xxl";
});

// 设备类型检测
const deviceType = computed(() => {
  const { width } = windowSize.value;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
});
```

### 防抖优化

```javascript
// 防抖处理，避免频繁更新
const [debouncedSize] = useWindowSize({
  debounce: 300, // 300ms 防抖
});

// 用于性能敏感的场景
watch(
  debouncedSize,
  newSize => {
    // 重新计算布局
    recalculateLayout(newSize);
  },
  { immediate: true }
);
```

### 条件监听

```javascript
const [size, updateSize, setEnabled] = useWindowSize({
  listen: false, // 初始不监听
});

// 根据需要启用/禁用监听
const needResize = ref(false);

watch(needResize, need => {
  setEnabled(need);
});

// 手动更新
const handleRefresh = () => {
  updateSize();
};
```

### 服务端渲染支持

```javascript
// SSR 环境下的初始尺寸
const [size] = useWindowSize({
  initialWidth: 1920,
  initialHeight: 1080,
});

// 避免水合不匹配
const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});
```

### 响应式网格系统

```javascript
const [windowSize] = useWindowSize();

// 动态列数
const gridColumns = computed(() => {
  const { width } = windowSize.value;
  if (width < 576) return 1;
  if (width < 768) return 2;
  if (width < 992) return 3;
  if (width < 1200) return 4;
  return 6;
});

// 网格样式
const gridStyle = computed(() => ({
  display: "grid",
  gridTemplateColumns: `repeat(${gridColumns.value}, 1fr)`,
  gap: "16px",
}));
```

### 图表自适应

```javascript
const [windowSize] = useWindowSize({ debounce: 200 });

// 图表尺寸计算
const chartSize = computed(() => {
  const { width, height } = windowSize.value;
  const padding = 40;

  return {
    width: Math.max(300, width - padding * 2),
    height: Math.max(200, height * 0.6),
  };
});

// 监听尺寸变化，重新渲染图表
watch(
  chartSize,
  newSize => {
    chart.resize(newSize);
  },
  { immediate: true }
);
```

### 性能监控

```javascript
const [windowSize] = useWindowSize();
const resizeCount = ref(0);
const lastResizeTime = ref(Date.now());

watch(windowSize, () => {
  resizeCount.value++;
  lastResizeTime.value = Date.now();
});

// 性能统计
const performanceStats = computed(() => ({
  totalResizes: resizeCount.value,
  averageInterval:
    resizeCount.value > 1
      ? Math.round((Date.now() - startTime) / resizeCount.value)
      : 0,
}));
```

## 注意事项

1. **性能考虑** - 窗口 resize 事件触发频繁，建议使用防抖优化
2. **服务端渲染** - 提供合理的初始尺寸，避免水合不匹配
3. **内存泄漏** - 组件卸载时会自动清理事件监听器
4. **浏览器兼容性** - 使用标准的 `window.innerWidth/innerHeight`
5. **响应式设计** - 结合 CSS 媒体查询使用效果更佳
6. **防抖设置** - 根据具体需求调整防抖延迟时间
7. **初始值** - SSR 环境下的初始值应该与实际设备匹配

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useWindowSize } from '@vakao-ui/hooks';

// 基础用法
const [windowSize, updateSize, setEnabled] = useWindowSize();
const updateCount = ref(0);
const isListening = ref(true);

// 监听尺寸变化
watch(windowSize, () => {
  updateCount.value++;
}, { immediate: true });

// 宽高比计算
const aspectRatio = computed(() => {
  const ratio = windowSize.value.width / windowSize.value.height;
  return ratio.toFixed(2);
});

// 响应式断点
const breakpoints = computed(() => {
  const { width } = windowSize.value;
  return {
    xs: width < 576,
    sm: width >= 576 && width < 768,
    md: width >= 768 && width < 992,
    lg: width >= 992 && width < 1200,
    xl: width >= 1200 && width < 1920,
    xxl: width >= 1920
  };
});

const currentBreakpoint = computed(() => {
  const bp = breakpoints.value;
  if (bp.xs) return 'xs';
  if (bp.sm) return 'sm';
  if (bp.md) return 'md';
  if (bp.lg) return 'lg';
  if (bp.xl) return 'xl';
  return 'xxl';
});

const getBreakpointRange = (bp) => {
  const ranges = {
    xs: '< 576px',
    sm: '576px - 768px',
    md: '768px - 992px',
    lg: '992px - 1200px',
    xl: '1200px - 1920px',
    xxl: '≥ 1920px'
  };
  return ranges[bp] || '';
};

// 设备类型检测
const isMobile = computed(() => windowSize.value.width < 768);
const isTablet = computed(() => windowSize.value.width >= 768 && windowSize.value.width < 1024);
const isDesktop = computed(() => windowSize.value.width >= 1024);

const deviceType = computed(() => {
  if (isMobile.value) return '移动设备';
  if (isTablet.value) return '平板设备';
  return '桌面设备';
});

const screenDensity = computed(() => {
  if (typeof window !== 'undefined') {
    return `${window.devicePixelRatio || 1}x`;
  }
  return '1x';
});

// 手动控制
const toggleListening = () => {
  isListening.value = !isListening.value;
  setEnabled(isListening.value);
};

// 高级用法
const debounceDelay = ref(300);
const debouncedUpdateCount = ref(0);
const [debouncedSize] = useWindowSize({ debounce: debounceDelay.value });

watch(debouncedSize, () => {
  debouncedUpdateCount.value++;
});

const updateDebounceSettings = () => {
  // 重新创建防抖实例（实际使用中可能需要更复杂的逻辑）
  debouncedUpdateCount.value = 0;
};

// 响应式布局
const getGridColumns = () => {
  const width = windowSize.value.width;
  if (width < 576) return 'repeat(2, 1fr)';
  if (width < 768) return 'repeat(3, 1fr)';
  if (width < 992) return 'repeat(4, 1fr)';
  if (width < 1200) return 'repeat(6, 1fr)';
  return 'repeat(6, 1fr)';
};

const getColumnCount = () => {
  const width = windowSize.value.width;
  if (width < 576) return 2;
  if (width < 768) return 3;
  if (width < 992) return 4;
  return 6;
};

const getLayoutMode = () => {
  const width = windowSize.value.width;
  if (width < 576) return '紧凑模式';
  if (width < 768) return '标准模式';
  if (width < 1200) return '宽松模式';
  return '超宽模式';
};

// 窗口比例分析
const orientation = computed(() => {
  return windowSize.value.width > windowSize.value.height ? '横屏' : '竖屏';
});

const pixelDensity = computed(() => {
  if (typeof window !== 'undefined') {
    const dpr = window.devicePixelRatio || 1;
    if (dpr >= 3) return '超高密度';
    if (dpr >= 2) return '高密度';
    if (dpr >= 1.5) return '中密度';
    return '标准密度';
  }
  return '标准密度';
});

// 性能监控
const performanceStats = ref({
  totalUpdates: 0,
  averageInterval: 0,
  lastUpdate: '未更新',
  duration: 0,
  startTime: Date.now()
});

const updateTimes = ref([]);

watch(windowSize, () => {
  const now = Date.now();
  updateTimes.value.push(now);
  
  performanceStats.value.totalUpdates++;
  performanceStats.value.lastUpdate = new Date(now).toLocaleTimeString();
  performanceStats.value.duration = now - performanceStats.value.startTime;
  
  if (updateTimes.value.length > 1) {
    const intervals = [];
    for (let i = 1; i < updateTimes.value.length; i++) {
      intervals.push(updateTimes.value[i] - updateTimes.value[i - 1]);
    }
    performanceStats.value.averageInterval = Math.round(
      intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
    );
  }
  
  // 保持最近50次记录
  if (updateTimes.value.length > 50) {
    updateTimes.value = updateTimes.value.slice(-50);
  }
});

const resetStats = () => {
  performanceStats.value = {
    totalUpdates: 0,
    averageInterval: 0,
    lastUpdate: '未更新',
    duration: 0,
    startTime: Date.now()
  };
  updateTimes.value = [];
};
</script>
