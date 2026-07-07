<template>
  <!--
    dish-price.vue - 价格展示组件
    手写字体价格展示，支持现价/原价对比显示
    价格以"分"为单位传入，内部转换为"元"展示
  -->
  <view class="dish-price" :class="`dish-price--${size}`">
    <!-- 现价：暖红色，手写字体，¥ + 数字 -->
    <text class="price-current">{{ formatPriceYuan(currentYuan, true) }}</text>

    <!-- 原价：灰色删除线，仅在低于原价时显示 -->
    <text v-if="showOriginal" class="price-original">
      {{ formatPriceYuan(originalYuan, true) }}
    </text>
  </view>
</template>

<script setup>
/**
 * 价格展示组件
 * 现价使用 --text-price 暖红色 + 手写字体突出显示
 * 原价使用 --text-muted 灰色 + 删除线
 * 价格从分转换为元：price / 100
 */
import { computed } from 'vue'
import { formatPriceYuan } from '@/utils/format'

defineOptions({ name: 'DishPrice' })

const props = defineProps({
  /** 现价（单位：分） */
  price: {
    type: Number,
    required: true
  },
  /** 原价（单位：分），默认 0 表示无原价 */
  originalPrice: {
    type: Number,
    default: 0
  },
  /** 尺寸：sm / md / lg */
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

/** 将分转换为元 */
const currentYuan = computed(() => props.price / 100)
const originalYuan = computed(() => props.originalPrice / 100)

/** 是否显示原价：原价大于 0 且大于现价 */
const showOriginal = computed(() => {
  return props.originalPrice > 0 && props.originalPrice > props.price
})
</script>

<style lang="scss" scoped>
/* ============================================================
 * 价格展示 - 核心样式
 * 现价：暖红色手写字体突出
 * 原价：灰色删除线弱化
 * 三种尺寸控制字号
 * ============================================================ */

.dish-price {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  line-height: 1.4;
}

/* ---- 现价样式 ---- */
.price-current {
  font-family: var(--font-handwrite-bold);
  color: var(--text-price);
  white-space: nowrap;
}

/* ---- 原价样式 ---- */
.price-original {
  font-family: var(--font-handwrite);
  color: var(--text-muted);
  text-decoration: line-through;
  white-space: nowrap;
}

/* ---- 尺寸变体 ---- */
.dish-price--sm {
  .price-current {
    font-size: var(--font-size-md);
  }
  .price-original {
    font-size: var(--font-size-xs);
  }
}

.dish-price--md {
  .price-current {
    font-size: var(--font-size-lg);
  }
  .price-original {
    font-size: var(--font-size-sm);
  }
}

.dish-price--lg {
  .price-current {
    font-size: var(--font-size-xl);
  }
  .price-original {
    font-size: var(--font-size-md);
  }
}
</style>
