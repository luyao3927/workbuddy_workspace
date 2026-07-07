<template>
  <!--
    cart-item.vue - 购物车单项
    手帐风格：虚线边框勾选框 + 缩略图 + 菜品信息 + 数量控制器
  -->
  <view class="cart-item">
    <!-- 左侧：选中勾选框 -->
    <view
      class="cart-item__checkbox"
      :class="{ 'cart-item__checkbox--checked': item.selected }"
      @tap="handleToggleSelect"
    >
      <text v-if="item.selected" class="cart-item__check-icon">✓</text>
    </view>

    <!-- 菜品缩略图 -->
    <view class="cart-item__image">
      <app-image :src="item.image" mode="aspectFill" />
    </view>

    <!-- 中间：菜品信息 -->
    <view class="cart-item__info">
      <text class="cart-item__name">{{ item.name }}</text>
      <text v-if="item.specName" class="cart-item__spec">{{ item.specName }}</text>
      <text class="cart-item__unit-price">
        {{ formatPriceYuan(item.price / 100) }}
      </text>
    </view>

    <!-- 右侧：数量控制器 -->
    <view class="cart-item__quantity">
      <dish-quantity
        :model-value="item.quantity"
        :min="1"
        :max="99"
        size="sm"
        @update:model-value="handleUpdateQuantity"
      />
      <!-- 删除按钮 -->
      <view class="cart-item__remove" @tap="handleRemove">
        <text class="cart-item__remove-icon">🗑</text>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 购物车单项组件
 * 展示菜品缩略图、名称、规格、单价及数量控制器
 * 支持选中切换、数量更新、移除操作
 */
import { formatPriceYuan } from '@/utils/format'

defineOptions({ name: 'CartItem' })

const props = defineProps({
  /** 购物车项 {dishId, name, image, specName, price, quantity, selected} */
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-select', 'update-quantity', 'remove'])

/** 切换选中 */
function handleToggleSelect() {
  emit('toggle-select', props.item.dishId, props.item.specId)
}

/** 更新数量 */
function handleUpdateQuantity(quantity) {
  emit('update-quantity', props.item.dishId, props.item.specId, quantity)
}

/** 移除 */
function handleRemove() {
  emit('remove', props.item.dishId, props.item.specId)
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 购物车单项 - 手帐风格
 * 虚线边框勾选框 + 紧凑布局
 * ============================================================ */

.cart-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) 0;
  border-bottom: 1rpx solid var(--divider-color);

  &:last-child {
    border-bottom: none;
  }
}

/* ---- 勾选框 ---- */
.cart-item__checkbox {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44rpx;
  height: 44rpx;
  border: 2rpx dashed var(--border-color);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.cart-item__checkbox--checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  border-style: solid;
}

.cart-item__check-icon {
  font-size: var(--font-size-sm);
  color: var(--text-on-primary);
  font-weight: bold;
}

/* ---- 缩略图 ---- */
.cart-item__image {
  flex-shrink: 0;
  width: 100rpx;
  height: 100rpx;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

/* ---- 菜品信息 ---- */
.cart-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  min-width: 0;
}

.cart-item__name {
  font-size: var(--font-size-md);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item__spec {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.cart-item__unit-price {
  font-size: var(--font-size-sm);
  color: var(--text-price);
  font-family: var(--font-handwrite);
}

/* ---- 右侧操作区 ---- */
.cart-item__quantity {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-xs);
}

.cart-item__remove {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity var(--transition-fast);

  &:active {
    opacity: 1;
  }
}

.cart-item__remove-icon {
  font-size: var(--font-size-sm);
}
</style>
