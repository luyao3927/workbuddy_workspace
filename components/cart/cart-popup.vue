<template>
  <!--
    cart-popup.vue - 购物车详情弹窗
    底部滑入动画 + 半透明遮罩 + 可滚动菜品列表
  -->
  <view class="cart-popup" v-if="store.showPopup" @tap.self="handleClose">
    <!-- 遮罩层 -->
    <view class="cart-popup__mask" @tap="handleClose" />

    <!-- 弹窗主体 -->
    <view class="cart-popup__body" :class="{ 'cart-popup__body--visible': store.showPopup }">
      <!-- 顶部标题栏 -->
      <view class="cart-popup__header">
        <text class="cart-popup__title">已选菜品</text>
        <view class="cart-popup__clear" @tap="handleClear">
          <text class="cart-popup__clear-text">清空</text>
        </view>
      </view>

      <!-- 购物车列表 -->
      <scroll-view
        class="cart-popup__list"
        scroll-y
        :show-scrollbar="false"
      >
        <view v-if="store.isEmpty" class="cart-popup__empty">
          <app-empty description="购物车暂无菜品" />
        </view>

        <view v-else class="cart-popup__items">
          <cart-item
            v-for="item in store.items"
            :key="`${item.dishId}_${item.specId || 'default'}`"
            :item="item"
            @toggle-select="handleToggleSelect"
            @update-quantity="handleUpdateQuantity"
            @remove="handleRemove"
          />
        </view>
      </scroll-view>

      <!-- 底部操作栏 -->
      <view class="cart-popup__footer" v-if="!store.isEmpty">
        <view class="cart-popup__total">
          <text class="cart-popup__total-label">合计</text>
          <text class="cart-popup__total-price">{{ formatPriceYuan(store.totalPrice / 100) }}</text>
        </view>
        <view class="cart-popup__order-btn" @tap="handleOrder">
          <text class="cart-popup__order-text">去下单</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 购物车详情弹窗
 * 从底部滑入，包含菜品列表和操作按钮
 * 点击遮罩关闭
 */
import { useCartStore } from '@/stores/useCartStore'
import { formatPriceYuan } from '@/utils/format'

defineOptions({ name: 'CartPopup' })

const store = useCartStore()

/** 关闭弹窗 */
function handleClose() {
  store.togglePopup(false)
}

/** 清空购物车 */
function handleClear() {
  store.clearCart()
  store.togglePopup(false)
}

/** 切换选中状态 */
function handleToggleSelect(dishId, specId) {
  store.toggleItemSelect(dishId, specId)
}

/** 更新数量 */
function handleUpdateQuantity(dishId, specId, quantity) {
  store.updateQuantity(dishId, specId, quantity)
}

/** 移除菜品 */
function handleRemove(dishId, specId) {
  store.removeItem(dishId, specId)
}

/** 去下单 */
function handleOrder() {
  store.togglePopup(false)
  uni.navigateTo({ url: '/pages/order/confirm' })
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 购物车详情弹窗 - 底部滑入
 * 半透明遮罩 + 圆角弹窗 + 可滚动列表
 * ============================================================ */

.cart-popup {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* ---- 遮罩层 ---- */
.cart-popup__mask {
  position: absolute;
  inset: 0;
  background-color: var(--bg-overlay);
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ---- 弹窗主体 ---- */
.cart-popup__body {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 70vh;
  background-color: var(--bg-card);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  animation: slideUp 0.3s ease;
}

.cart-popup__body--visible {
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* ---- 顶部标题栏 ---- */
.cart-popup__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1rpx solid var(--divider-color);
  flex-shrink: 0;
}

.cart-popup__title {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}

.cart-popup__clear {
  cursor: pointer;
}

.cart-popup__clear-text {
  font-size: var(--font-size-sm);
  color: var(--color-highlight);
}

/* ---- 菜品列表 ---- */
.cart-popup__list {
  flex: 1;
  overflow-y: auto;
}

.cart-popup__empty {
  padding: var(--spacing-xl) 0;
}

.cart-popup__items {
  padding: 0 var(--spacing-md);
}

/* ---- 底部操作栏 ---- */
.cart-popup__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-top: 1rpx solid var(--divider-color);
  flex-shrink: 0;
}

.cart-popup__total {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.cart-popup__total-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.cart-popup__total-price {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-lg);
  color: var(--text-price);
}

.cart-popup__order-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--spacing-xl);
  height: 64rpx;
  border-radius: var(--radius-xl);
  background-color: var(--color-primary);
  cursor: pointer;
  transition: transform var(--transition-fast);

  &:active {
    transform: scale(0.95);
  }
}

.cart-popup__order-text {
  font-size: var(--font-size-md);
  color: var(--text-on-primary);
  font-weight: 500;
}
</style>
