<!--
  下单成功页 — pages/order-success/index.vue
  功能：成功提示 + 订单信息 + 返回首页 + 手帐风格装饰 + 弹跳动画
-->
<template>
  <view class="page-order-success" :class="{ 'collage-paper-bg': true }">
    <!-- 导航栏（无返回按钮） -->
    <app-nav-bar :show-back="false" />

    <!-- 成功内容 -->
    <view class="success-content">
      <collage-paper variant="plain" :rotation="0" padding="var(--spacing-xl)">
        <!-- 成功图标 -->
        <view class="success-icon-wrapper">
          <view class="success-icon">✅</view>
        </view>

        <!-- 成功标题 -->
        <text class="success-title">下单成功！</text>

        <!-- 订单编号 -->
        <view class="order-info">
          <collage-label text="📦 订单编号" color="var(--color-primary)" size="sm" :rotation="-1" />
          <view class="order-id-box">
            <text class="order-id">{{ displayOrderId }}</text>
          </view>
          <text class="order-hint">请截图保存订单编号以备查询</text>
        </view>

        <!-- 装饰贴纸 -->
        <collage-sticker
          type="star"
          color="var(--color-accent)"
          size="44rpx"
          top="-15rpx"
          right="-10rpx"
        />
        <collage-sticker
          type="heart"
          color="var(--color-highlight)"
          size="32rpx"
          bottom="-8rpx"
          left="5%"
        />

        <!-- 装饰胶带 -->
        <collage-tape
          color="var(--color-highlight)"
          :angle="-4"
          width="70rpx"
          top="-12rpx"
          left="15%"
        />
        <collage-tape
          color="var(--color-accent)"
          :angle="3"
          width="55rpx"
          top="-10rpx"
          right="20%"
        />
      </collage-paper>

      <!-- 返回首页按钮 -->
      <button class="home-btn" @click="handleGoHome">
        返回首页
      </button>

      <!-- 装饰贴纸散布 -->
      <collage-sticker
        type="star"
        color="var(--color-primary)"
        size="28rpx"
        top="15%"
        left="8%"
      />
      <collage-sticker
        type="heart"
        color="var(--color-highlight)"
        size="30rpx"
        top="25%"
        right="6%"
      />
      <collage-sticker
        type="star"
        color="var(--color-accent)"
        size="24rpx"
        top="70%"
        left="5%"
      />
      <collage-sticker
        type="heart"
        color="var(--color-primary)"
        size="26rpx"
        top="65%"
        right="8%"
      />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useOrder } from '@/composables/useOrder'
import { useTheme } from '@/composables/useTheme'
import { formatOrderId } from '@/utils/format'

const orderId = ref('')
const { currentOrder } = useOrder()
const { initTheme } = useTheme()

initTheme()

// 显示用的订单编号（截取）
const displayOrderId = computed(() => {
  const id = orderId.value || currentOrder.value?.id || ''
  return formatOrderId(id)
})

// 页面加载
onLoad((options) => {
  orderId.value = options.orderId || ''
})

// 返回首页
function handleGoHome() {
  uni.reLaunch({ url: '/pages/index/index' })
}
</script>

<style lang="scss" scoped>
.page-order-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--bg-primary);
  padding: var(--spacing-lg);
  box-sizing: border-box;
}

.collage-paper-bg {
  background-image: radial-gradient(
    circle at 30% 70%,
    var(--bg-highlight) 1px,
    transparent 1px
  );
  background-size: 40rpx 40rpx;
}

.success-content {
  position: relative;
  width: 100%;
  max-width: 600rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

// 成功图标弹跳动画
.success-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-lg);
}

.success-icon {
  font-size: 120rpx;
  animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

// 成功标题
.success-title {
  display: block;
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-title);
  color: var(--text-primary);
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fade-up 0.5s ease-out 0.2s both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 订单信息
.order-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  animation: fade-up 0.5s ease-out 0.4s both;
}

.order-id-box {
  display: flex;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--bg-highlight);
  border: 2rpx dashed var(--border-color);
  border-radius: var(--radius-sm);

  .order-id {
    font-family: var(--font-body);
    font-size: var(--font-size-lg);
    color: var(--text-primary);
    font-weight: 600;
    letter-spacing: 2rpx;
  }
}

.order-hint {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-family: var(--font-handwrite);
}

// 返回首页按钮
.home-btn {
  width: 100%;
  max-width: 400rpx;
  height: 88rpx;
  line-height: 88rpx;
  margin-top: var(--spacing-xl);
  background: var(--color-primary);
  color: #fff;
  font-size: var(--font-size-md);
  font-family: var(--font-handwrite-bold);
  border: none;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  animation: fade-up 0.5s ease-out 0.6s both;

  &:active {
    opacity: 0.85;
    transform: scale(0.98);
  }
}

// 底部安全区
.page-order-success {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
