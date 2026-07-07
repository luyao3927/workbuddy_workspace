<template>
  <view class="app-loading">
    <!-- 骨架屏模式 -->
    <view v-if="type === 'skeleton'" class="skeleton-container">
      <view
        v-for="i in rows"
        :key="i"
        class="skeleton-row"
        :style="{ animationDelay: (i - 1) * 0.1 + 's' }"
      />
    </view>

    <!-- 旋转加载模式 -->
    <view v-else class="spinner-container">
      <view class="spinner" />
      <text class="spinner-text">加载中...</text>
    </view>
  </view>
</template>

<script setup>
defineOptions({ name: 'AppLoading' })

defineProps({
  type: {
    type: String,
    default: 'skeleton',
    validator: (val) => ['skeleton', 'spinner'].includes(val),
  },
  rows: {
    type: Number,
    default: 3,
  },
})
</script>

<style lang="scss" scoped>
.app-loading {
  width: 100%;
  padding: var(--spacing-md);
  box-sizing: border-box;
}

/* ========== 骨架屏模式 ========== */
.skeleton-container {
  width: 100%;
}

.skeleton-row {
  height: 32rpx;
  margin-bottom: var(--spacing-sm);
  border-radius: var(--radius-sm);
  background: linear-gradient(
    90deg,
    var(--bg-overlay) 25%,
    var(--bg-card) 50%,
    var(--bg-overlay) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite, fade-in 0.3s ease;

  &:last-child {
    width: 60%;
    margin-bottom: 0;
  }
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ========== 旋转加载模式 ========== */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 0;
  animation: fade-in 0.3s ease;
}

.spinner {
  width: 60rpx;
  height: 60rpx;
  border: 4rpx solid var(--bg-overlay);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner-text {
  margin-top: var(--spacing-sm);
  font-size: 26rpx;
  color: var(--text-muted);
  font-family: var(--font-handwrite);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ========== 共用渐入动画 ========== */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
