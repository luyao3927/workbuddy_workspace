<template>
  <view
    class="app-nav-bar"
    :style="{
      paddingTop: statusBarHeight,
      backgroundColor: bgColor,
    }"
  >
    <view class="nav-content">
      <!-- 左侧返回按钮 -->
      <view class="nav-left" @click="handleBack">
        <view v-if="showBack" class="back-btn">
          <text class="back-arrow">&larr;</text>
          <text class="back-text">返回</text>
        </view>
      </view>

      <!-- 中间标题 -->
      <view class="nav-center">
        <text class="nav-title">{{ title }}</text>
      </view>

      <!-- 右侧占位，保持标题居中 -->
      <view class="nav-right" />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'AppNavBar' })

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: 'transparent',
  },
})

const emit = defineEmits(['back'])

// 获取系统状态栏高度
const statusBarHeight = computed(() => {
  // #ifdef MP-WEIXIN
  const sysInfo = uni.getSystemInfoSync()
  return sysInfo.statusBarHeight + 'px'
  // #endif
  // #ifndef MP-WEIXIN
  return 'var(--status-bar-height)'
  // #endif
})

function handleBack() {
  if (props.showBack) {
    emit('back')
  }
}
</script>

<style lang="scss" scoped>
.app-nav-bar {
  position: relative;
  width: 100%;
  z-index: 100;

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--nav-height, 88rpx);
    padding: 0 var(--spacing-md);
  }

  .nav-left,
  .nav-right {
    flex: 0 0 120rpx;
    display: flex;
    align-items: center;
  }

  .nav-right {
    justify-content: flex-end;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 4rpx;
    padding: 8rpx 12rpx;
    border-radius: var(--radius-sm);

    &:active {
      background: var(--bg-overlay);
    }
  }

  .back-arrow {
    font-size: 36rpx;
    color: var(--text-primary);
    line-height: 1;
  }

  .back-text {
    font-size: 28rpx;
    color: var(--text-primary);
    font-family: var(--font-handwrite);
  }

  .nav-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .nav-title {
    font-size: 36rpx;
    font-weight: 500;
    color: var(--text-primary);
    font-family: var(--font-handwrite);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
}
</style>
