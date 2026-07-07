<template>
  <view class="app-empty">
    <!-- 圆形容器（虚线边框） -->
    <view class="empty-circle">
      <text v-if="icon" class="empty-icon">{{ icon }}</text>
      <text v-else class="empty-default-icon">&#9744;</text>
    </view>

    <!-- 提示文字 -->
    <text class="empty-text">{{ text }}</text>

    <!-- 操作按钮 -->
    <view v-if="showBtn" class="empty-btn" @click="handleAction">
      <text class="empty-btn-text">{{ btnText }}</text>
    </view>
  </view>
</template>

<script setup>
defineOptions({ name: 'AppEmpty' })

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '暂无数据',
  },
  showBtn: {
    type: Boolean,
    default: false,
  },
  btnText: {
    type: String,
    default: '刷新',
  },
})

const emit = defineEmits(['action'])

function handleAction() {
  emit('action')
}
</script>

<style lang="scss" scoped>
.app-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx var(--spacing-md);
}

/* 虚线边框圆形区域 */
.empty-circle {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  border: 3rpx dashed var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.3s ease;
}

.empty-icon {
  font-size: 56rpx;
  color: var(--text-muted);
  line-height: 1;
}

.empty-default-icon {
  font-size: 64rpx;
  color: var(--text-muted);
  opacity: 0.4;
  line-height: 1;
}

/* 提示文字 */
.empty-text {
  margin-top: var(--spacing-lg);
  font-size: 28rpx;
  color: var(--text-secondary);
  font-family: var(--font-handwrite);
  letter-spacing: 2rpx;
}

/* 操作按钮 */
.empty-btn {
  margin-top: var(--spacing-xl);
  padding: 16rpx 48rpx;
  border-radius: var(--radius-lg);
  border: 2rpx solid var(--color-primary);
  background: transparent;
  transition: all 0.2s ease;

  &:active {
    background: var(--color-primary);
    .empty-btn-text {
      color: #fff;
    }
  }
}

.empty-btn-text {
  font-size: 28rpx;
  color: var(--color-primary);
  font-family: var(--font-handwrite);
}
</style>
