<template>
  <view class="app-image" :style="{ width: containerWidth, height: containerHeight }">
    <!-- 加载中占位 -->
    <view v-if="loading && !error" class="image-placeholder">
      <view class="placeholder-shimmer" />
    </view>

    <!-- 加载失败占位 -->
    <view v-else-if="error" class="image-error">
      <view class="error-plate" />
      <text class="error-hint">图片加载失败</text>
    </view>

    <!-- 图片 -->
    <image
      v-show="!loading && !error"
      :class="['image-el', { 'image-loaded': imageLoaded }]"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="onLoad"
      @error="onError"
    />
  </view>
</template>

<script setup>
import { ref, watch } from 'vue'

defineOptions({ name: 'AppImage' })

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  mode: {
    type: String,
    default: 'aspectFill',
  },
  lazyLoad: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['load', 'error'])

const loading = ref(true)
const error = ref(false)
const imageLoaded = ref(false)

// 容器尺寸（可通过外部样式覆盖）
const containerWidth = ref('100%')
const containerHeight = ref('100%')

// src 变化时重置状态
watch(
  () => props.src,
  (newVal) => {
    if (newVal) {
      loading.value = true
      error.value = false
      imageLoaded.value = false
    }
  },
)

function onLoad(e) {
  loading.value = false
  error.value = false
  // 延迟触发渐入动画
  setTimeout(() => {
    imageLoaded.value = true
  }, 50)
  emit('load', e)
}

function onError(e) {
  loading.value = false
  error.value = true
  emit('error', e)
}
</script>

<style lang="scss" scoped>
.app-image {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--bg-overlay);
}

/* ========== 加载中占位 ========== */
.image-placeholder {
  position: absolute;
  inset: 0;
  background: var(--bg-overlay);
  overflow: hidden;
}

.placeholder-shimmer {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--bg-overlay) 25%,
    var(--bg-card) 50%,
    var(--bg-overlay) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ========== 加载失败占位 ========== */
.image-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  gap: var(--spacing-xs);
}

/* 用 CSS 渐变模拟一个简单的盘子图标 */
.error-plate {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 45%,
    var(--bg-overlay) 30%,
    var(--border-color) 32%,
    var(--bg-overlay) 34%,
    var(--border-color) 36%,
    var(--bg-overlay) 38%,
    var(--bg-card) 100%
  );
  opacity: 0.6;
}

.error-hint {
  font-size: 22rpx;
  color: var(--text-muted);
}

/* ========== 图片 ========== */
.image-el {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.image-loaded {
  opacity: 1;
}
</style>
