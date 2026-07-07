<template>
  <view class="app-error">
    <!-- 错误图标 -->
    <view class="error-icon-wrap">
      <text class="error-icon">&#9888;</text>
    </view>

    <!-- 错误信息 -->
    <text class="error-message">{{ message }}</text>

    <!-- 重试按钮 -->
    <view v-if="showRetry" class="retry-btn" @click="handleRetry">
      <text class="retry-btn-text">重试</text>
    </view>
  </view>
</template>

<script setup>
defineOptions({ name: 'AppError' })

const props = defineProps({
  message: {
    type: String,
    default: '加载失败',
  },
  showRetry: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['retry'])

function handleRetry() {
  emit('retry')
}
</script>

<style lang="scss" scoped>
.app-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx var(--spacing-md);
  animation: error-fade-in 0.4s ease;
}

/* 错误图标容器 */
.error-icon-wrap {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: var(--bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.error-icon {
  font-size: 52rpx;
  color: var(--color-accent);
  line-height: 1;
}

/* 错误信息 */
.error-message {
  margin-top: var(--spacing-lg);
  font-size: 28rpx;
  color: var(--text-secondary);
  font-family: var(--font-handwrite);
  text-align: center;
  line-height: 1.6;
}

/* 重试按钮 — 手帐风格圆角边框 */
.retry-btn {
  margin-top: var(--spacing-xl);
  padding: 16rpx 56rpx;
  border-radius: var(--radius-lg);
  border: 2rpx solid var(--color-accent);
  background: transparent;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;

  &:active {
    background: var(--color-accent);
    .retry-btn-text {
      color: #fff;
    }
  }
}

.retry-btn-text {
  font-size: 28rpx;
  color: var(--color-accent);
  font-family: var(--font-handwrite);
  letter-spacing: 2rpx;
}

@keyframes error-fade-in {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
