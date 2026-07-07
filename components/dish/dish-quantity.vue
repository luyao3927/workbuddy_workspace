<template>
  <!--
    dish-quantity.vue - 数量增减控制器
    圆形减号按钮 - 数字 - 圆形加号按钮
    手帐风格：虚线边框圆形 + 点击缩放动画
    达到边界时按钮变灰禁用
  -->
  <view class="dish-quantity" :class="`dish-quantity--${size}`">
    <!-- 减号按钮 -->
    <view
      class="quantity-btn"
      :class="{ 'quantity-btn--disabled': modelValue <= min }"
      @tap="handleDecrease"
    >
      <text class="quantity-btn__icon">−</text>
    </view>

    <!-- 当前数量 -->
    <text class="quantity-value">{{ modelValue }}</text>

    <!-- 加号按钮 -->
    <view
      class="quantity-btn"
      :class="{ 'quantity-btn--disabled': modelValue >= max }"
      @tap="handleIncrease"
    >
      <text class="quantity-btn__icon">+</text>
    </view>
  </view>
</template>

<script setup>
/**
 * 数量增减控制器
 * 圆形按钮 + 虚线边框，手帐手工风格
 * 减到 min 时减号变灰禁用，加到 max 时加号变灰禁用
 * 点击有轻微缩放动画反馈
 */
defineOptions({ name: 'DishQuantity' })

const props = defineProps({
  /** 当前数量 */
  modelValue: {
    type: Number,
    default: 1
  },
  /** 最小值 */
  min: {
    type: Number,
    default: 1
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 99
  },
  /** 尺寸：sm / md */
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md'].includes(v)
  }
})

const emit = defineEmits(['update:modelValue'])

/** 减少数量 */
function handleDecrease() {
  if (props.modelValue <= props.min) return
  emit('update:modelValue', props.modelValue - 1)
}

/** 增加数量 */
function handleIncrease() {
  if (props.modelValue >= props.max) return
  emit('update:modelValue', props.modelValue + 1)
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 数量控制器 - 样式
 * 虚线边框圆形按钮 + 手写字体数字
 * 缩放动画 + 禁用态
 * ============================================================ */

.dish-quantity {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* ---- 按钮通用样式 ---- */
.quantity-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2rpx dashed var(--border-color);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: transform var(--transition-fast), border-color var(--transition-fast), opacity var(--transition-fast);
  cursor: pointer;

  /* 点击缩放动画 */
  &:active:not(.quantity-btn--disabled) {
    transform: scale(0.85);
  }
}

.quantity-btn__icon {
  font-family: var(--font-handwrite-bold);
  line-height: 1;
  user-select: none;
}

/* ---- 禁用态 ---- */
.quantity-btn--disabled {
  opacity: 0.3;
  border-color: var(--divider-color);
  pointer-events: none;
}

/* ---- 数量文字 ---- */
.quantity-value {
  font-family: var(--font-handwrite-bold);
  color: var(--text-primary);
  text-align: center;
  min-width: 48rpx;
  user-select: none;
}

/* ---- 尺寸变体 ---- */

/* sm: 小尺寸 */
.dish-quantity--sm {
  .quantity-btn {
    width: 48rpx;
    height: 48rpx;
  }
  .quantity-btn__icon {
    font-size: var(--font-size-sm);
  }
  .quantity-value {
    font-size: var(--font-size-sm);
  }
}

/* md: 中尺寸 */
.dish-quantity--md {
  .quantity-btn {
    width: 60rpx;
    height: 60rpx;
  }
  .quantity-btn__icon {
    font-size: var(--font-size-md);
  }
  .quantity-value {
    font-size: var(--font-size-md);
  }
}

/* ---- 暗黑模式适配 ---- */
@media (prefers-color-scheme: dark) {
  .quantity-btn {
    border-color: var(--border-color);
    background-color: var(--bg-card);
  }

  .quantity-btn--disabled {
    border-color: var(--divider-color);
  }
}
</style>
