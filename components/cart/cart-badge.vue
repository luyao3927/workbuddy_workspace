<template>
  <!--
    cart-badge.vue - 购物车数量角标
    红色圆点角标，> 99 显示 99+，为 0 时隐藏
    商品变化时触发弹跳动画
  -->
  <view v-if="displayCount > 0" class="cart-badge" :class="{ 'cart-badge--bounce': isBouncing }">
    <text class="cart-badge__text">{{ displayText }}</text>
  </view>
</template>

<script setup>
/**
 * 购物车数量角标组件
 * 显示在购物车图标右上角
 * count 变化时触发弹跳动画
 */
import { computed, ref, watch } from 'vue'
import { formatCount } from '@/utils/format'

defineOptions({ name: 'CartBadge' })

const props = defineProps({
  /** 商品数量 */
  count: {
    type: Number,
    default: 0
  }
})

/** 是否正在弹跳动画 */
const isBouncing = ref(false)

/** 格式化后的数字 */
const displayCount = computed(() => {
  return props.count > 0 ? props.count : 0
})

/** 显示文本 */
const displayText = computed(() => {
  return formatCount(props.count)
})

/** count 变化时触发弹跳动画 */
watch(
  () => props.count,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isBouncing.value = true
      setTimeout(() => {
        isBouncing.value = false
      }, 300)
    }
  }
)
</script>

<style lang="scss" scoped>
/* ============================================================
 * 购物车数量角标 - 红色圆点
 * 弹跳动画 + 最小值 16rpx 直径
 * ============================================================ */

.cart-badge {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32rpx;
  height: 32rpx;
  padding: 0 6rpx;
  border-radius: 16rpx;
  background-color: #E87461;
  box-shadow: 0 2rpx 4rpx rgba(232, 116, 97, 0.3);
}

.cart-badge__text {
  font-size: 20rpx;
  color: #FFFFFF;
  font-weight: bold;
  line-height: 1;
}

/* 弹跳动画 */
.cart-badge--bounce {
  animation: badgeBounce 0.3s ease;
}

@keyframes badgeBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* 暗黑模式角标颜色微调 */
@media (prefers-color-scheme: dark) {
  .cart-badge {
    background-color: #FF8A80;
    box-shadow: 0 2rpx 4rpx rgba(255, 138, 128, 0.3);
  }
}
</style>
