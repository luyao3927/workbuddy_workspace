<template>
  <!--
    order-summary.vue - 订单汇总卡片
    卡片风格 + 菜品列表 + 合计金额（手写字体大号价格色）
  -->
  <view class="order-summary">
    <!-- 标题 -->
    <view class="order-summary__header">
      <view class="order-summary__decorator" />
      <text class="order-summary__title">订单详情</text>
    </view>

    <!-- 菜品列表 -->
    <view class="order-summary__list">
      <order-item
        v-for="(item, index) in items"
        :key="`${item.dishId}_${item.specId || 'default'}_${index}`"
        :item="item"
      />
    </view>

    <!-- 空状态 -->
    <view v-if="!items || items.length === 0" class="order-summary__empty">
      <app-empty text="暂无菜品" />
    </view>

    <!-- 底部合计金额 -->
    <view class="order-summary__footer">
      <text class="order-summary__total-label">合计</text>
      <text class="order-summary__total-price">{{ formatPriceYuan(totalPriceYuan) }}</text>
    </view>
  </view>
</template>

<script setup>
/**
 * 订单汇总卡片组件
 * 展示订单中的所有菜品和合计金额
 * 卡片样式 + 手写字体价格
 * 注意：totalPrice 单位是"分"，需除以 100 转为元
 */
import { computed } from 'vue'
import { formatPriceYuan } from '@/utils/format'

defineOptions({ name: 'OrderSummary' })

const props = defineProps({
  /** 订单菜品列表 */
  items: {
    type: Array,
    default: () => []
  },
  /** 总金额（单位：分） */
  totalPrice: {
    type: Number,
    default: 0
  }
})

/** 转换为元 */
const totalPriceYuan = computed(() => props.totalPrice / 100)
</script>

<style lang="scss" scoped>
/* ============================================================
 * 订单汇总卡片 - 卡片风格
 * 装饰线 + 手写字体价格
 * ============================================================ */

.order-summary {
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

/* ---- 标题区域 ---- */
.order-summary__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-bottom: 1rpx solid var(--divider-color);
}

.order-summary__decorator {
  width: 6rpx;
  height: 28rpx;
  border-radius: 3rpx;
  background-color: var(--color-accent);
}

.order-summary__title {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}

/* ---- 菜品列表 ---- */
.order-summary__list {
  padding: 0 var(--spacing-md);
}

/* ---- 空状态 ---- */
.order-summary__empty {
  padding: var(--spacing-xl) 0;
}

/* ---- 底部合计 ---- */
.order-summary__footer {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1rpx solid var(--divider-color);
  background-color: var(--bg-highlight);
}

.order-summary__total-label {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

.order-summary__total-price {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-xl);
  color: var(--text-price);
}
</style>
