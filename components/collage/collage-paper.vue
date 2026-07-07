<template>
  <!--
    collage-paper.vue - 纸质纹理背景容器组件
    模拟真实纸张的纹理、折痕、不规则边缘和阴影效果
    适用于手帐/collage 风格的卡片容器
    父级无需 position: relative，使用默认定位即可
  -->
  <view
    class="collage-paper"
    :class="[
      `collage-paper--${variant}`,
      `collage-paper--padding-${padding}`
    ]"
    :style="paperStyle"
  >
    <slot />
  </view>
</template>

<script setup>
/**
 * 纸质纹理背景容器组件
 * 使用多层 CSS 背景叠加模拟纸张质感：
 * - 底层：基色背景
 * - 中层：SVG noise 纹理叠加
 * - 顶层：linear-gradient 模拟折痕
 */
defineOptions({ name: 'CollagePaper' })

const props = defineProps({
  /** 纸张纹理变体：plain 纯色 | lined 横线 | grid 网格 */
  variant: {
    type: String,
    default: 'plain',
    validator: v => ['plain', 'lined', 'grid'].includes(v)
  },
  /** 旋转角度（deg），模拟手工粘贴的随意感 */
  rotation: {
    type: Number,
    default: 0
  },
  /** 内边距等级 */
  padding: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  }
})

const paperStyle = computed(() => ({
  transform: `rotate(${props.rotation}deg)`
}))
</script>

<style lang="scss" scoped>
/* ============================================================
 * 纸质纹理背景 - 核心样式
 * 多层 background 叠加：
 *   Layer 1: base-color（底色）
 *   Layer 2: 折痕渐变（模拟对折折痕）
 *   Layer 3: SVG 内联 noise 纹理（模拟纸纤维）
 *   Layer 4: 横线/网格纹理（variant 控制）
 * ============================================================ */

/* -- SVG noise 纹理 Data URI -- */
/* 生成方式：<svg><filter><feTurbulence baseFrequency="0.65"/></filter></svg> */
/* 经过编码嵌入，模拟纸张纤维的不规则纹理 */

.collage-paper {
  position: relative;
  background-color: var(--bg-card);
  /* 折痕渐变 - 模拟纸张轻微对折过的痕迹 */
  background-image:
    /* Layer 3: 纸张纤维 noise 纹理 */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    /* Layer 2: 模拟纸张折痕 */
    linear-gradient(
      178deg,
      transparent 0%,
      transparent 48%,
      rgba(139, 115, 85, 0.04) 48.5%,
      rgba(139, 115, 85, 0.04) 51.5%,
      transparent 52%
    ),
    linear-gradient(
      92deg,
      transparent 0%,
      transparent 38%,
      rgba(139, 115, 85, 0.03) 38.5%,
      rgba(139, 115, 85, 0.03) 39.5%,
      transparent 40%
    );

  /* 不规则微圆角 - 手工感的关键 */
  border-radius: 58% 42% 55% 45% / 45% 55% 42% 58%;

  /* 轻微阴影 - 模拟纸张厚度 */
  box-shadow:
    0 2px 6px rgba(139, 115, 85, 0.08),
    0 1px 3px rgba(139, 115, 85, 0.04);

  /* 过渡动画 */
  transition: transform var(--transition-normal), background-color var(--transition-normal);
}

/* ---- 内边距变体 ---- */
.collage-paper--padding-sm {
  padding: var(--spacing-sm);
}
.collage-paper--padding-md {
  padding: var(--spacing-md);
}
.collage-paper--padding-lg {
  padding: var(--spacing-lg);
}

/* ---- variant: lined - 横线纹理 ---- */
.collage-paper--lined {
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    /* 横线纹理 - 使用 repeating-linear-gradient */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 27rpx,
      rgba(139, 115, 85, 0.08) 27rpx,
      rgba(139, 115, 85, 0.08) 28rpx
    ),
    linear-gradient(
      178deg,
      transparent 0%,
      transparent 48%,
      rgba(139, 115, 85, 0.04) 48.5%,
      rgba(139, 115, 85, 0.04) 51.5%,
      transparent 52%
    ),
    linear-gradient(
      92deg,
      transparent 0%,
      transparent 38%,
      rgba(139, 115, 85, 0.03) 38.5%,
      rgba(139, 115, 85, 0.03) 39.5%,
      transparent 40%
    );
}

/* ---- variant: grid - 网格纹理 ---- */
.collage-paper--grid {
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E"),
    /* 网格纹理 - 横线 + 竖线组合 */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 27rpx,
      rgba(139, 115, 85, 0.07) 27rpx,
      rgba(139, 115, 85, 0.07) 28rpx
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 27rpx,
      rgba(139, 115, 85, 0.07) 27rpx,
      rgba(139, 115, 85, 0.07) 28rpx
    ),
    linear-gradient(
      178deg,
      transparent 0%,
      transparent 48%,
      rgba(139, 115, 85, 0.04) 48.5%,
      rgba(139, 115, 85, 0.04) 51.5%,
      transparent 52%
    ),
    linear-gradient(
      92deg,
      transparent 0%,
      transparent 38%,
      rgba(139, 115, 85, 0.03) 38.5%,
      rgba(139, 115, 85, 0.03) 39.5%,
      transparent 40%
    );
}

/* ---- 暗黑模式适配 - 降低纹理透明度 ---- */
@media (prefers-color-scheme: dark) {
  .collage-paper {
    /* 暗黑模式下降低折痕和纹理的对比度 */
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"),
      linear-gradient(
        178deg,
        transparent 0%,
        transparent 48%,
        rgba(255, 255, 255, 0.03) 48.5%,
        rgba(255, 255, 255, 0.03) 51.5%,
        transparent 52%
      ),
      linear-gradient(
        92deg,
        transparent 0%,
        transparent 38%,
        rgba(255, 255, 255, 0.02) 38.5%,
        rgba(255, 255, 255, 0.02) 39.5%,
        transparent 40%
      );
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.2),
      0 1px 3px rgba(0, 0, 0, 0.15);
  }

  .collage-paper--lined {
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 27rpx,
        rgba(255, 255, 255, 0.04) 27rpx,
        rgba(255, 255, 255, 0.04) 28rpx
      ),
      linear-gradient(
        178deg,
        transparent 0%,
        transparent 48%,
        rgba(255, 255, 255, 0.03) 48.5%,
        rgba(255, 255, 255, 0.03) 51.5%,
        transparent 52%
      ),
      linear-gradient(
        92deg,
        transparent 0%,
        transparent 38%,
        rgba(255, 255, 255, 0.02) 38.5%,
        rgba(255, 255, 255, 0.02) 39.5%,
        transparent 40%
      );
  }

  .collage-paper--grid {
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 27rpx,
        rgba(255, 255, 255, 0.04) 27rpx,
        rgba(255, 255, 255, 0.04) 28rpx
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 27rpx,
        rgba(255, 255, 255, 0.04) 27rpx,
        rgba(255, 255, 255, 0.04) 28rpx
      ),
      linear-gradient(
        178deg,
        transparent 0%,
        transparent 48%,
        rgba(255, 255, 255, 0.03) 48.5%,
        rgba(255, 255, 255, 0.03) 51.5%,
        transparent 52%
      ),
      linear-gradient(
        92deg,
        transparent 0%,
        transparent 38%,
        rgba(255, 255, 255, 0.02) 38.5%,
        rgba(255, 255, 255, 0.02) 39.5%,
        transparent 40%
      );
  }
}
</style>
