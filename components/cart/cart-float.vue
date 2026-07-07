<template>
  <!--
    cart-float.vue - 底部悬浮购物车栏
    毛玻璃背景 + 购物车图标 + 数量角标 + 合计金额 + 下单按钮
    购物车有商品时按钮有弹跳动画提示
  -->
  <view class="cart-float">
    <!-- 左侧：购物车图标 + 角标 -->
    <view class="cart-float__left" @tap="handleClickCart">
      <view class="cart-float__icon-wrap">
        <text class="cart-float__icon">🛒</text>
        <cart-badge :count="store.totalCount" />
      </view>
    </view>

    <!-- 中间：合计金额 -->
    <view class="cart-float__center" @tap="handleClickCart">
      <text v-if="store.isEmpty" class="cart-float__empty-text">购物车空空如也</text>
      <template v-else>
        <text class="cart-float__price-label">合计</text>
        <text class="cart-float__price-value">{{ formatPriceYuan(store.totalPrice / 100) }}</text>
      </template>
    </view>

    <!-- 右侧：去下单按钮 -->
    <view
      class="cart-float__right"
      :class="{ 'cart-float__right--disabled': store.isEmpty, 'cart-float__right--bounce': !store.isEmpty }"
      @tap="handleClickOrder"
    >
      <text class="cart-float__order-text">去下单</text>
    </view>
  </view>
</template>

<script setup>
/**
 * 底部悬浮购物车栏 - 核心交互入口
 * 毛玻璃背景 + 购物车状态展示
 * 点击左侧/中间弹出购物车详情弹窗
 * 点击右侧跳转确认订单页
 * 注意：totalPrice 单位是"分"，需要除以 100 转为元
 */
import { useCartStore } from '@/stores/useCartStore'
import { formatPriceYuan } from '@/utils/format'

defineOptions({ name: 'CartFloat' })

const emit = defineEmits(['click-cart', 'click-order'])

const store = useCartStore()

/** 点击购物车区域 -> 弹出弹窗 */
function handleClickCart() {
  emit('click-cart')
  store.togglePopup(true)
}

/** 点击去下单 */
function handleClickOrder() {
  if (store.isEmpty) return
  emit('click-order')
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 底部悬浮购物车栏 - 毛玻璃风格
 * 固定在页面底部，适配安全区域
 * 购物车有商品时按钮弹跳动画提示
 * ============================================================ */

.cart-float {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  height: var(--cart-float-height);
  padding: 0 var(--spacing-md);
  padding-bottom: env(safe-area-inset-bottom, 0);
  background-color: rgba(250, 247, 242, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 -2px 12px rgba(139, 115, 85, 0.08);
  z-index: 100;
  box-sizing: content-box;
}

/* ---- 左侧：购物车图标区域 ---- */
.cart-float__left {
  flex-shrink: 0;
  cursor: pointer;
}

.cart-float__icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: var(--bg-highlight);
  box-shadow: var(--shadow-sm);
}

.cart-float__icon {
  font-size: 40rpx;
  line-height: 1;
}

/* ---- 中间：合计金额 ---- */
.cart-float__center {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  padding: 0 var(--spacing-md);
  cursor: pointer;
}

.cart-float__empty-text {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

.cart-float__price-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.cart-float__price-value {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-lg);
  color: var(--text-price);
}

/* ---- 右侧：去下单按钮 ---- */
.cart-float__right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-lg);
  height: 64rpx;
  border-radius: var(--radius-xl);
  background-color: var(--color-primary);
  cursor: pointer;
  transition: opacity var(--transition-fast), transform var(--transition-fast);

  &:active {
    transform: scale(0.95);
  }
}

.cart-float__order-text {
  font-size: var(--font-size-md);
  color: var(--text-on-primary);
  font-weight: 500;
}

/* 购物车为空时按钮禁用 */
.cart-float__right--disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* 购物车有商品时弹跳动画 */
.cart-float__right--bounce {
  animation: cartBounce 0.6s ease;
}

@keyframes cartBounce {
  0%, 100% { transform: scale(1); }
  30% { transform: scale(1.08); }
  60% { transform: scale(0.95); }
}

/* ---- 暗黑模式适配 ---- */
@media (prefers-color-scheme: dark) {
  .cart-float {
    background-color: rgba(37, 37, 64, 0.85);
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.2);
  }

  .cart-float__icon-wrap {
    background-color: var(--bg-card);
  }
}
</style>
