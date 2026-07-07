<template>
  <!--
    order-item.vue - 订单中单个菜品行（只读）
    展示缩略图 + 菜品信息 + 数量×单价=小计
    简洁风格，分隔线
  -->
  <view class="order-item">
    <!-- 菜品缩略图 -->
    <view class="order-item__image">
      <app-image :src="item.image" mode="aspectFill" />
    </view>

    <!-- 菜品信息 -->
    <view class="order-item__info">
      <text class="order-item__name">{{ item.name }}</text>
      <text v-if="item.specName" class="order-item__spec">{{ item.specName }}</text>
    </view>

    <!-- 右侧：数量 × 单价 = 小计 -->
    <view class="order-item__price">
      <text class="order-item__calc">
        {{ item.quantity }} × {{ formatPriceYuan(item.price / 100) }}
      </text>
      <text class="order-item__subtotal">
        = {{ formatPriceYuan((item.price * item.quantity) / 100) }}
      </text>
    </view>
  </view>
</template>

<script setup>
/**
 * 订单菜品行组件（只读）
 * 用于订单详情和确认页展示已选菜品
 * 不包含编辑操作
 */
import { formatPriceYuan } from '@/utils/format'

defineOptions({ name: 'OrderItem' })

defineProps({
  /** 订单项 {dishId, name, image, specName, price, quantity} */
  item: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
/* ============================================================
 * 订单菜品行 - 简洁只读风格
 * 缩略图 + 名称规格 + 数量×单价=小计
 * ============================================================ */

.order-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) 0;
  border-bottom: 1rpx solid var(--divider-color);

  &:last-child {
    border-bottom: none;
  }
}

/* ---- 缩略图 ---- */
.order-item__image {
  flex-shrink: 0;
  width: 96rpx;
  height: 96rpx;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

/* ---- 菜品信息 ---- */
.order-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  min-width: 0;
}

.order-item__name {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.order-item__spec {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

/* ---- 价格计算 ---- */
.order-item__price {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rpx;
}

.order-item__calc {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.order-item__subtotal {
  font-size: var(--font-size-md);
  font-family: var(--font-handwrite-bold);
  color: var(--text-price);
}
</style>
