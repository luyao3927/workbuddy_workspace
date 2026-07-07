<!--
  确认订单页 — pages/order/index.vue
  功能：订单汇总 + 备注输入 + 提交订单 + 手帐风格
-->
<template>
  <view class="page-order">
    <!-- 导航栏 -->
    <app-nav-bar title="确认订单" show-back @back="handleBack" />

    <!-- 空购物车 -->
    <app-empty
      v-if="isEmpty"
      icon="empty-cart"
      text="菜篮是空的，先去逛逛吧~"
      show-btn
      btn-text="返回首页"
      @action="handleGoHome"
    />

    <!-- 正常内容 -->
    <template v-else>
      <scroll-view scroll-y class="order-scroll">
        <collage-paper variant="plain" :rotation="-0.5" padding="var(--spacing-lg)">
          <!-- 订单汇总 -->
          <view class="order-summary-section">
            <collage-label text="📋 订单详情" color="var(--color-primary)" size="md" :rotation="-2" />
            <order-summary
              :items="selectedItems"
              :total-price="totalPrice"
            />
          </view>

          <!-- 备注输入区 -->
          <view class="remark-section">
            <collage-label text="✏️ 备注" color="var(--color-accent)" size="sm" :rotation="1" />
            <view class="remark-box">
              <textarea
                v-model="remark"
                class="remark-input"
                placeholder="添加备注…"
                placeholder-style="color: var(--text-muted); font-family: var(--font-handwrite);"
                :maxlength="200"
              />
              <text class="remark-count">{{ remark.length }}/200</text>
            </view>
          </view>

          <!-- 装饰元素 -->
          <collage-sticker
            type="heart"
            color="var(--color-highlight)"
            size="36rpx"
            top="-10rpx"
            right="-5rpx"
          />
        </collage-paper>

        <!-- 底部安全区占位 -->
        <view class="safe-bottom" />
      </scroll-view>

      <!-- 底部提交栏 -->
      <view class="bottom-bar">
        <view class="total-info">
          <text class="total-label">合计</text>
          <text class="total-price">{{ formatPriceYuan(totalPrice / 100) }}</text>
        </view>
        <button
          class="submit-btn"
          :disabled="submitting"
          @click="handleSubmitOrder"
        >
          {{ submitting ? '提交中…' : '提交订单' }}
        </button>
      </view>
    </template>

    <!-- 错误提示 -->
    <view v-if="orderError" class="error-toast">
      <text>{{ orderError }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCart } from '@/composables/useCart'
import { useOrder } from '@/composables/useOrder'
import { useTheme } from '@/composables/useTheme'
import { formatPriceYuan } from '@/utils/format'

const { selectedItems, totalPrice, isEmpty, loadFromStorage } = useCart()
const { submitting, error: orderError, remark, handleSubmit, goToSuccess } = useOrder()
const { initTheme } = useTheme()

initTheme()
loadFromStorage()

// 包装提交逻辑：成功后跳转
async function handleSubmitOrder() {
  const result = await handleSubmit()
  if (result) {
    goToSuccess(result.id)
  }
}

// 返回首页
function handleGoHome() {
  uni.reLaunch({ url: '/pages/index/index' })
}

// 返回上一页
function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.page-order {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
  background-image: radial-gradient(
    circle at 80% 50%,
    var(--bg-highlight) 1px,
    transparent 1px
  );
  background-size: 40rpx 40rpx;
}

.order-scroll {
  flex: 1;
  overflow: hidden;
  padding: var(--spacing-md);
}

// 订单汇总区
.order-summary-section {
  margin-bottom: var(--spacing-lg);
}

// 备注输入区
.remark-section {
  margin-top: var(--spacing-lg);
}

.remark-box {
  position: relative;
  margin-top: var(--spacing-sm);

  .remark-input {
    width: 100%;
    min-height: 160rpx;
    padding: var(--spacing-md);
    font-size: var(--font-size-sm);
    font-family: var(--font-handwrite);
    color: var(--text-primary);
    background: var(--bg-highlight);
    border: 2rpx dashed var(--border-color);
    border-radius: var(--radius-md);
    box-sizing: border-box;
    line-height: 1.6;
    resize: none;

    &:focus {
      border-color: var(--color-primary);
      border-style: solid;
    }
  }

  .remark-count {
    position: absolute;
    bottom: var(--spacing-xs);
    right: var(--spacing-sm);
    font-size: var(--font-size-xs);
    color: var(--text-muted);
  }
}

// 底部提交栏
.bottom-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  padding-bottom: calc(var(--spacing-sm) + env(safe-area-inset-bottom));
  background: var(--bg-card);
  border-top: 1rpx solid var(--divider-color);
  box-shadow: var(--shadow-md);

  .total-info {
    display: flex;
    align-items: baseline;
    gap: var(--spacing-xs);

    .total-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .total-price {
      font-family: var(--font-handwrite-bold);
      font-size: var(--font-size-xxl);
      color: var(--text-price);
    }
  }

  .submit-btn {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    background: var(--color-primary);
    color: #fff;
    font-size: var(--font-size-md);
    font-family: var(--font-handwrite-bold);
    border: none;
    border-radius: var(--radius-lg);
    transition: opacity var(--transition-normal);

    &:active {
      opacity: 0.85;
    }

    &[disabled] {
      opacity: 0.6;
    }
  }
}

// 底部安全区
.safe-bottom {
  height: calc(var(--spacing-xxl) + 100rpx);
}

// 错误提示
.error-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-overlay);
  border-radius: var(--radius-md);
  z-index: 999;

  text {
    color: #fff;
    font-size: var(--font-size-sm);
  }
}
</style>
