<template>
  <div :class="mergedClass" :style="mergedStyle" @click="handleClick">
    <!-- 图片容器 -->
    <div :class="ns.element('wrapper')" :style="wrapperStyle">
      <!-- 占位符图片 -->
      <img
        v-if="placeholder && loadStatus === 'loading'"
        :src="placeholder"
        :alt="alt"
        :class="[ns.element('inner'), ns.element('placeholder')]"
        :style="{ ...imageStyle, filter: 'blur(2px)', opacity: 0.8 }"
      />

      <!-- 加载中状态 -->
      <div v-if="loadStatus === 'loading' && loading && !placeholder" :class="ns.element('loading')">
        <slot name="loading">
          <div :class="ns.element('loading-icon')">
            <VkIcon icon="mdi:loading" :class="ns.element('loading-spinner')" />
          </div>
          <div v-if="$slots['loading-text']" :class="ns.element('loading-text')">
            <slot name="loading-text">加载中...</slot>
          </div>
        </slot>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="loadStatus === 'error'" :class="ns.element('error')">
        <slot name="error">
          <div :class="ns.element('error-icon')">
            <VkIcon icon="mdi:image-broken-variant" />
          </div>
          <div v-if="$slots['error-text']" :class="ns.element('error-text')">
            <slot name="error-text">加载失败</slot>
          </div>
        </slot>
      </div>

      <!-- 实际图片 -->
      <img
        v-show="currentSrc && (loadStatus === 'loaded' || (loadStatus === 'loading' && currentSrc))"
        ref="imageRef"
        :src="currentSrc"
        :alt="alt"
        :class="ns.element('inner')"
        :style="imageStyle"
        :loading="lazy && supportsNativeLazyLoading ? 'lazy' : undefined"
        @load="handleLoad"
        @error="handleError"
        @click="handleImageClick"
      />

      <!-- 懒加载占位元素 -->
      <div
        v-if="lazy && loadStatus === 'loading' && !supportsNativeLazyLoading && !currentSrc"
        ref="lazyRef"
        :class="ns.element('lazy-placeholder')"
        :style="{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }"
      />

      <!-- 预览遮罩 -->
      <div v-if="preview && loadStatus === 'loaded'" :class="ns.element('preview-mask')" @click="handlePreviewClick">
        <div :class="ns.element('preview-icon')">
          <VkIcon icon="mdi:eye" />
        </div>
      </div>
    </div>

    <!-- 预览组件 -->
    <Teleport v-if="previewTeleported" to="body">
      <div v-if="showPreview" :class="ns.element('preview')" @click="handlePreviewClose">
        <div :class="ns.element('preview-wrapper')">
          <!-- 预览工具栏 -->
          <div :class="ns.element('preview-toolbar')">
            <div :class="ns.element('preview-actions')">
              <button :class="ns.element('preview-action')" @click.stop="handleZoomOut">
                <VkIcon icon="mdi:magnify-minus" />
              </button>
              <button :class="ns.element('preview-action')" @click.stop="handleZoomIn">
                <VkIcon icon="mdi:magnify-plus" />
              </button>
              <button :class="ns.element('preview-action')" @click.stop="handleRotateLeft">
                <VkIcon icon="mdi:rotate-left" />
              </button>
              <button :class="ns.element('preview-action')" @click.stop="handleRotateRight">
                <VkIcon icon="mdi:rotate-right" />
              </button>
              <button :class="ns.element('preview-action')" @click.stop="handleReset">
                <VkIcon icon="mdi:refresh" />
              </button>
            </div>
            <button :class="ns.element('preview-close')" @click.stop="handlePreviewClose">
              <VkIcon icon="mdi:close" />
            </button>
          </div>

          <!-- 预览图片容器 -->
          <div :class="ns.element('preview-canvas')" @wheel="handleWheel">
            <!-- 上一张按钮 -->
            <button
              v-if="previewList.length > 1"
              :class="[ns.element('preview-arrow'), ns.element('preview-arrow--left')]"
              @click.stop="handlePrevImage"
            >
              <VkIcon icon="mdi:chevron-left" />
            </button>

            <!-- 预览图片 -->
            <img
              :src="currentPreviewSrc"
              :class="ns.element('preview-image')"
              :style="previewImageStyle"
              @mousedown="handleMouseDown"
              @dragstart.prevent
            />

            <!-- 下一张按钮 -->
            <button
              v-if="previewList.length > 1"
              :class="[ns.element('preview-arrow'), ns.element('preview-arrow--right')]"
              @click.stop="handleNextImage"
            >
              <VkIcon icon="mdi:chevron-right" />
            </button>
          </div>

          <!-- 预览信息 -->
          <div v-if="previewList.length > 1" :class="ns.element('preview-info')">
            {{ currentPreviewIndex + 1 }} / {{ previewList.length }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/**
 * VkImage 图片组件
 *
 * 图片组件提供了丰富的图片展示功能，包括懒加载、错误处理、预览等。
 * 支持多种适应模式、尺寸配置、状态控制等功能。
 *
 * 主要特性：
 * - 支持懒加载和错误处理
 * - 多种图片适应模式
 * - 内置预览功能，支持缩放、旋转、拖拽
 * - 支持图片组预览
 * - 灵活的插槽系统
 * - 完整的无障碍支持
 *
 * 使用示例：
 * ```vue
 * <template>
 *   <!-- 基础图片 -->
 *   <VkImage src="https://example.com/image.jpg" alt="示例图片" />
 *
 *   <!-- 懒加载图片 -->
 *   <VkImage src="https://example.com/image.jpg" lazy />
 *
 *   <!-- 预览图片 -->
 *   <VkImage
 *     src="https://example.com/image.jpg"
 *     preview
 *     :preview-src-list="[
 *       'https://example.com/image1.jpg',
 *       'https://example.com/image2.jpg'
 *     ]"
 *   />
 *
 *   <!-- 自定义尺寸 -->
 *   <VkImage
 *     src="https://example.com/image.jpg"
 *     :width="200"
 *     :height="150"
 *     fit="cover"
 *   />
 * </template>
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

// ==================== 模块导入 ====================

/** Vue 3 核心 API */
import { computed, ref, useAttrs, onMounted, onUnmounted, nextTick, watch } from "vue";
import type { CSSProperties } from "vue";

/** 组件类型定义 */
import { imageProps, imageEmits } from "./types";
import type { ImageLoadStatus, ImageInstance } from "./types";

/** 工具函数 */
import { useNamespace } from "@vakao-ui/utils";

/** 子组件 */
import VkIcon from "../../VkIcon";

// ==================== 组件定义 ====================

/** 组件名称 */
defineOptions({
  name: "VkImage",
  inheritAttrs: false,
});

/** 组件属性 */
const props = defineProps(imageProps);

/** 组件事件 */
const emit = defineEmits(imageEmits);

// ==================== 组合式 API ====================

/** 获取组件属性和命名空间工具 */
const attrs = useAttrs();
const ns = useNamespace("image");

// ==================== 响应式数据 ====================

/** 图片元素引用 */
const imageRef = ref<HTMLImageElement>();

/** 懒加载占位元素引用 */
const lazyRef = ref<HTMLDivElement>();

/** 加载状态 */
const loadStatus = ref<ImageLoadStatus>("loading");

/** 当前图片源 */
const currentSrc = ref(props.src);

/** 是否显示预览 */
const showPreview = ref(false);

/** 当前预览图片索引 */
const currentPreviewIndex = ref(props.initialIndex);

/** 预览图片变换状态 */
const previewTransform = ref({
  scale: 1,
  rotate: 0,
  translateX: 0,
  translateY: 0,
});

/** 拖拽状态 */
const dragState = ref({
  isDragging: false,
  startX: 0,
  startY: 0,
  startTranslateX: 0,
  startTranslateY: 0,
});

/** 懒加载观察器 */
let intersectionObserver: IntersectionObserver | null = null;

/** 重试计数器 */
const retryCount = ref(0);

/** 最大重试次数 */
const MAX_RETRY_COUNT = 3;

// ==================== 计算属性 ====================

/**
 * 预览图片列表
 */
const previewList = computed(() => {
  if (props.previewSrcList.length > 0) {
    return props.previewSrcList;
  }
  return [props.src];
});

/**
 * 当前预览图片源
 */
const currentPreviewSrc = computed(() => {
  return previewList.value[currentPreviewIndex.value] || props.src;
});

/**
 * 合并的CSS类名
 */
const mergedClass = computed(() => {
  const { class: attrClass } = attrs;
  return [
    ns.block(),
    ns.modifier("size", props.size),
    ns.is("round", props.round),
    ns.is("disabled", props.disabled),
    ns.is("preview", props.preview),
    props.customClass,
    attrClass,
  ];
});

/**
 * 合并的样式
 */
const mergedStyle = computed(() => {
  const { style: attrStyle } = attrs;
  const customStyle = typeof props.customStyle === "string" ? props.customStyle : props.customStyle;

  const baseStyle: CSSProperties = {};

  if (props.width) {
    baseStyle.width = typeof props.width === "number" ? `${props.width}px` : props.width;
  }

  if (props.height) {
    baseStyle.height = typeof props.height === "number" ? `${props.height}px` : props.height;
  }

  if (props.radius && !props.round) {
    baseStyle.borderRadius = typeof props.radius === "number" ? `${props.radius}px` : props.radius;
  }

  // 合并所有样式为单个对象
  return {
    ...baseStyle,
    ...(typeof customStyle === "object" ? customStyle : {}),
    ...(typeof attrStyle === "object" ? attrStyle : {}),
  };
});

/**
 * 包装器样式
 */
const wrapperStyle = computed(() => {
  const style: CSSProperties = {
    position: "relative",
    overflow: "hidden",
  };

  if (props.round) {
    style.borderRadius = "50%";
  } else if (props.radius) {
    style.borderRadius = typeof props.radius === "number" ? `${props.radius}px` : props.radius;
  }

  return style;
});

/**
 * 图片样式
 */
const imageStyle = computed(() => {
  const style: CSSProperties = {
    objectFit: props.fit,
    width: "100%",
    height: "100%",
    display: "block",
  };

  return style;
});

/**
 * 预览图片样式
 */
const previewImageStyle = computed(() => {
  const { scale, rotate, translateX, translateY } = previewTransform.value;
  return {
    transform: `scale(${scale}) rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`,
    transition: dragState.value.isDragging ? "none" : "transform 0.3s ease",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain" as const,
  };
});

/**
 * 检测浏览器是否支持原生懒加载
 */
const supportsNativeLazyLoading = computed(() => {
  // 检查是否在浏览器环境中，避免在SSR环境中报错
  return typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype;
});

// ==================== 事件处理 ====================

/**
 * 处理图片加载成功
 */
const handleLoad = (event: Event) => {
  loadStatus.value = "loaded";
  emit("load", event);
};

/**
 * 处理图片加载失败
 */
const handleError = (event: Event) => {
  // 如果还有重试次数且不是fallback图片，则尝试重试
  if (retryCount.value < MAX_RETRY_COUNT && currentSrc.value === props.src) {
    retryCount.value++;
    // 延迟重试，避免频繁请求
    setTimeout(
      () => {
        loadStatus.value = "loading";
        // 添加时间戳避免缓存
        const separator = props.src.includes("?") ? "&" : "?";
        currentSrc.value = `${props.src}${separator}_retry=${retryCount.value}&_t=${Date.now()}`;
      },
      Math.pow(2, retryCount.value) * 1000,
    ); // 指数退避
    return;
  }

  // 重试失败或达到最大重试次数，尝试使用fallback
  if (props.fallback && currentSrc.value !== props.fallback) {
    currentSrc.value = props.fallback;
    loadStatus.value = "loading";
    retryCount.value = 0; // 重置重试计数
  } else {
    loadStatus.value = "error";
    // 如果是懒加载模式且加载失败，重新启动懒加载观察
    if (props.lazy && !supportsNativeLazyLoading.value) {
      restartLazyLoad();
    }
    emit("error", event);
  }
};

/**
 * 处理图片点击
 */
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
  }
};

/**
 * 处理图片区域点击
 */
const handleImageClick = (event: MouseEvent) => {
  if (props.preview && !props.disabled) {
    event.stopPropagation();
    openPreview();
  }
};

/**
 * 处理预览点击
 */
const handlePreviewClick = (event: MouseEvent) => {
  event.stopPropagation();
  openPreview();
};

/**
 * 打开预览
 */
const openPreview = () => {
  if (props.disabled) return;

  showPreview.value = true;
  currentPreviewIndex.value = Math.max(0, Math.min(props.initialIndex, previewList.value.length - 1));
  resetPreviewTransform();
  emit("preview", currentPreviewIndex.value);

  // 禁用页面滚动
  document.body.style.overflow = "hidden";
};

/**
 * 关闭预览
 */
const handlePreviewClose = () => {
  showPreview.value = false;
  emit("preview-close");

  // 恢复页面滚动
  document.body.style.overflow = "";
};

/**
 * 上一张图片
 */
const handlePrevImage = () => {
  if (currentPreviewIndex.value > 0) {
    currentPreviewIndex.value--;
    resetPreviewTransform();
    emit("preview-switch", currentPreviewIndex.value);
  }
};

/**
 * 下一张图片
 */
const handleNextImage = () => {
  if (currentPreviewIndex.value < previewList.value.length - 1) {
    currentPreviewIndex.value++;
    resetPreviewTransform();
    emit("preview-switch", currentPreviewIndex.value);
  }
};

/**
 * 放大
 */
const handleZoomIn = () => {
  previewTransform.value.scale = Math.min(previewTransform.value.scale * 1.2, 5);
};

/**
 * 缩小
 */
const handleZoomOut = () => {
  previewTransform.value.scale = Math.max(previewTransform.value.scale / 1.2, 0.2);
};

/**
 * 向左旋转
 */
const handleRotateLeft = () => {
  previewTransform.value.rotate -= 90;
};

/**
 * 向右旋转
 */
const handleRotateRight = () => {
  previewTransform.value.rotate += 90;
};

/**
 * 重置变换
 */
const handleReset = () => {
  resetPreviewTransform();
};

/**
 * 重置预览变换状态
 */
const resetPreviewTransform = () => {
  previewTransform.value = {
    scale: 1,
    rotate: 0,
    translateX: 0,
    translateY: 0,
  };
};

/**
 * 处理鼠标滚轮
 */
const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  if (event.deltaY < 0) {
    handleZoomIn();
  } else {
    handleZoomOut();
  }
};

/**
 * 处理鼠标按下
 */
const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault();
  dragState.value = {
    isDragging: true,
    startX: event.clientX,
    startY: event.clientY,
    startTranslateX: previewTransform.value.translateX,
    startTranslateY: previewTransform.value.translateY,
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
};

/**
 * 处理鼠标移动
 */
const handleMouseMove = (event: MouseEvent) => {
  if (!dragState.value.isDragging) return;

  const deltaX = event.clientX - dragState.value.startX;
  const deltaY = event.clientY - dragState.value.startY;

  previewTransform.value.translateX = dragState.value.startTranslateX + deltaX;
  previewTransform.value.translateY = dragState.value.startTranslateY + deltaY;
};

/**
 * 处理鼠标释放
 */
const handleMouseUp = () => {
  dragState.value.isDragging = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
};

/**
 * 重新加载图片
 */
const reload = () => {
  loadStatus.value = "loading";
  retryCount.value = 0; // 重置重试计数器

  if (props.lazy && !supportsNativeLazyLoading.value) {
    // 懒加载模式，重新启动观察
    restartLazyLoad();
  } else {
    // 非懒加载模式，直接设置src
    currentSrc.value = props.src;
    if (imageRef.value) {
      imageRef.value.src = props.src;
    }
  }
};

/**
 * 获取当前加载状态
 */
const getLoadStatus = (): ImageLoadStatus => {
  return loadStatus.value;
};

// ==================== 懒加载 ====================

/**
 * 初始化懒加载（仅用于IntersectionObserver实现）
 */
const initLazyLoad = () => {
  if (!props.lazy || !lazyRef.value || supportsNativeLazyLoading.value) return;

  // 使用 IntersectionObserver 实现懒加载
  const options = {
    root: props.scrollContainer
      ? typeof props.scrollContainer === "string"
        ? document.querySelector(props.scrollContainer)
        : props.scrollContainer
      : null,
    rootMargin: "50px",
    threshold: 0.01, // 当1%的元素可见时触发
  };

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && loadStatus.value === "loading" && !currentSrc.value) {
        // 开始加载图片
        currentSrc.value = props.src;
        loadStatus.value = "loading";
        // 停止观察，避免重复触发
        if (intersectionObserver && entry.target) {
          intersectionObserver.unobserve(entry.target);
        }
      }
    });
  }, options);

  intersectionObserver.observe(lazyRef.value);
};

/**
 * 重新启动懒加载观察
 */
const restartLazyLoad = () => {
  if (!props.lazy || supportsNativeLazyLoading.value || !lazyRef.value) return;

  // 重置状态
  currentSrc.value = "";
  loadStatus.value = "loading";

  // 重新开始观察
  if (intersectionObserver && lazyRef.value) {
    intersectionObserver.observe(lazyRef.value);
  }
};

/**
 * 清理懒加载
 */
const cleanupLazyLoad = () => {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
    intersectionObserver = null;
  }
};

// ==================== 生命周期 ====================

onMounted(() => {
  if (props.lazy) {
    if (supportsNativeLazyLoading.value) {
      // 浏览器支持原生懒加载，直接设置src
      currentSrc.value = props.src;
      loadStatus.value = "loading";
    } else {
      // 使用IntersectionObserver实现懒加载
      currentSrc.value = "";
      loadStatus.value = "loading";
      nextTick(() => {
        initLazyLoad();
      });
    }
  } else {
    // 非懒加载模式，直接加载图片
    currentSrc.value = props.src;
    loadStatus.value = "loading";
  }
});

onUnmounted(() => {
  cleanupLazyLoad();
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);

  // 确保恢复页面滚动
  if (showPreview.value) {
    document.body.style.overflow = "";
  }
});

// ==================== 监听器 ====================

watch(
  () => props.src,
  (newSrc) => {
    if (newSrc !== currentSrc.value) {
      retryCount.value = 0; // 重置重试计数器
      reload();
    }
  },
);

// ==================== 暴露的方法 ====================

defineExpose<ImageInstance>({
  reload,
  openPreview,
  closePreview: handlePreviewClose,
  getLoadStatus,
});
</script>
