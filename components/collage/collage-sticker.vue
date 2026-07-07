<template>
  <!--
    collage-sticker.vue - 贴纸装饰组件
    模拟贴纸贴在手帐上的效果：圆形、星形、心形
    每种形状都有内圈装饰，打造趣味手工感
    父级容器需要 position: relative
  -->
  <view
    class="collage-sticker"
    :class="[
      `collage-sticker--${type}`,
      `collage-sticker--color-${colorKey}`
    ]"
    :style="stickerStyle"
  >
    <!-- 星形内部内容插槽 -->
    <view v-if="type === 'star'" class="sticker-inner">
      <slot />
    </view>
    <!-- 圆形和心形的内容 -->
    <view v-else class="sticker-inner">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
/**
 * 贴纸装饰组件
 * 支持三种形状：圆形（circle）、星形（star）、心形（heart）
 * 颜色使用 --color-accent / --color-primary / --color-highlight 或自定义
 */
defineOptions({ name: 'CollageSticker' })

const props = defineProps({
  /** 贴纸形状 */
  type: {
    type: String,
    default: 'circle',
    validator: v => ['circle', 'star', 'heart'].includes(v)
  },
  /** 贴纸颜色：accent 蜜桃橙 | primary 鼠尾草绿 | highlight 樱花粉 | 或其他自定义颜色值 */
  color: {
    type: String,
    default: 'accent'
  },
  /** 贴纸大小（rpx） */
  size: {
    type: Number,
    default: 40
  },
  /** 顶部偏移 */
  top: {
    type: String,
    default: '0'
  },
  /** 左侧偏移 */
  left: {
    type: String,
    default: '0'
  }
})

/**
 * 将颜色 prop 映射到 CSS 变量名或直接使用颜色值
 * 'accent' -> 'accent' 映射到 --color-accent
 * 'primary' -> 'primary' 映射到 --color-primary
 * 'highlight' -> 'highlight' 映射到 --color-highlight
 */
const colorKey = computed(() => {
  const presetColors = ['accent', 'primary', 'highlight']
  return presetColors.includes(props.color) ? props.color : 'custom'
})

/**
 * 计算贴纸背景色
 * 预定义颜色使用 CSS 变量，自定义颜色直接使用值
 */
const stickerBgColor = computed(() => {
  const colorMap = {
    accent: 'var(--color-accent)',
    primary: 'var(--color-primary)',
    highlight: 'var(--color-highlight)'
  }
  return colorMap[props.color] || props.color
})

const stickerStyle = computed(() => ({
  width: `${props.size}rpx`,
  height: `${props.size}rpx`,
  top: props.top,
  left: props.left,
  backgroundColor: stickerBgColor.value,
  '--sticker-color': stickerBgColor.value
}))
</script>

<style lang="scss" scoped>
/* ============================================================
 * 贴纸装饰 - 核心样式
 * 三种形状各有独立的伪元素实现
 * 内置微旋转 + 轻微阴影模拟立体贴纸感
 * ============================================================ */

.collage-sticker {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 贴纸阴影 - 模拟贴纸边缘微微翘起 */
  box-shadow:
    0 2px 4px rgba(139, 115, 85, 0.15),
    0 1px 2px rgba(139, 115, 85, 0.1);

  /* 随机微旋转 */
  transform: rotate(-2deg);

  transition: transform var(--transition-normal);

  .sticker-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xs);
    color: #fff;
    text-align: center;
  }
}

/* ---- 圆形贴纸 ---- */
.collage-sticker--circle {
  border-radius: 50%;

  /* 内圈虚线边框 - 模拟贴纸的内圈装饰 */
  &::after {
    content: '';
    position: absolute;
    top: 15%;
    left: 15%;
    right: 15%;
    bottom: 15%;
    border-radius: 50%;
    border: 2rpx dashed rgba(255, 255, 255, 0.5);
    pointer-events: none;
  }
}

/* ---- 星形贴纸 - 使用 clip-path 做五角星 ---- */
.collage-sticker--star {
  /* 五角星 polygon */
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );

  /* 星形不需要内圈装饰，移除 after */
  &::after {
    display: none;
  }

  .sticker-inner {
    /* 星形内部文字居中微调 */
    margin-top: 10%;
  }
}

/* ---- 心形贴纸 - 使用伪元素做爱心 ---- */
.collage-sticker--heart {
  /* 隐藏自身形状 */
  background-color: transparent !important;
  box-shadow: none;
  transform: rotate(-3deg);

  /* 使用两个伪元素构建心形上半部分的两个圆 + 下半部分的三角 */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: inherit;
    border-radius: 50% 50% 0 0;
  }

  &::before {
    top: 0;
    left: 0;
    transform: rotate(-45deg) translate(15%, 15%);
  }

  &::after {
    top: 0;
    right: 0;
    transform: rotate(45deg) translate(-15%, 15%);
  }

  /* 实际背景色通过 inline style 传入 --sticker-color 变量 */
  /* 伪元素通过 var(--sticker-color) 获取颜色 */

  &::before,
  &::after {
    background-color: var(--sticker-color);
  }

  /* 心形下半三角用主元素自身 */
  /* 由于 uniapp 使用 view 组件，用 clip-path 辅助 */
  /* 实际心形通过旋转两个半圆 + 底部三角构成 */
  /* 这里采用简化方案：用主元素做底部 */
}

/* ---- 颜色变体 - 使用 CSS 变量 ---- */
.collage-sticker--color-accent {
  background-color: var(--color-accent);
}
.collage-sticker--color-primary {
  background-color: var(--color-primary);
}
.collage-sticker--color-highlight {
  background-color: var(--color-highlight);
}
/* custom 颜色通过 inline style 传入，无需额外样式 */

/* ---- 暗黑模式适配 ---- */
@media (prefers-color-scheme: dark) {
  .collage-sticker {
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.25),
      0 1px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
