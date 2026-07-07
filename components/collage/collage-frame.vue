<template>
  <!--
    collage-frame.vue - 拼贴画框组件
    三种画框风格：photo（相框）、polaroid（拍立得）、simple（虚线框）
    用于包裹图片或其他内容，打造拼贴画的层次感
    父级无需 position: relative，使用默认定位即可
  -->
  <view
    class="collage-frame"
    :class="[
      `collage-frame--${variant}`,
      { 'collage-frame--rotated': rotation !== 0 }
    ]"
    :style="frameStyle"
  >
    <!-- 内容区域 -->
    <view class="frame-content">
      <slot />
    </view>

    <!-- 拍立得底部手写区域 -->
    <view v-if="variant === 'polaroid'" class="frame-caption">
      <slot name="caption">
        <!-- 默认留白区域，模拟拍立得底部可手写的空间 -->
      </slot>
    </view>
  </view>
</template>

<script setup>
/**
 * 拼贴画框组件
 * photo: 窄边框 + 阴影，模拟相纸边框
 * polaroid: 宽白边 + 底部留白区域，经典拍立得风格
 * simple: 虚线边框，轻量装饰
 */
defineOptions({ name: 'CollageFrame' })

const props = defineProps({
  /** 画框风格变体 */
  variant: {
    type: String,
    default: 'simple',
    validator: v => ['photo', 'polaroid', 'simple'].includes(v)
  },
  /** 旋转角度（deg） */
  rotation: {
    type: Number,
    default: 0
  }
})

const frameStyle = computed(() => ({
  transform: `rotate(${props.rotation}deg)`
}))
</script>

<script>
import { computed } from 'vue'
</script>

<style lang="scss" scoped>
/* ============================================================
 * 拼贴画框 - 核心样式
 * 三种风格通过不同边框、阴影和内边距组合实现
 * ============================================================ */

.collage-frame {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  transition: transform var(--transition-normal);

  .frame-content {
    overflow: hidden;
  }
}

/* ---- simple: 简单虚线边框 ---- */
.collage-frame--simple {
  border: 2rpx dashed var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs);
  background-color: transparent;

  .frame-content {
    border-radius: calc(var(--radius-md) - 4rpx);
  }
}

/* ---- photo: 窄边框相框风格 ---- */
.collage-frame--photo {
  /* 白色/卡片色宽边框 */
  border: 12rpx solid var(--bg-card);
  border-radius: var(--radius-sm);
  background-color: var(--bg-card);

  /* 相框立体阴影 */
  box-shadow:
    var(--shadow-md),
    inset 0 0 0 1px rgba(139, 115, 85, 0.08);

  .frame-content {
    border-radius: 2rpx;
  }
}

/* ---- polaroid: 拍立得风格 ---- */
.collage-frame--polaroid {
  background-color: var(--bg-card);
  border-radius: var(--radius-sm);
  padding: 16rpx 16rpx 48rpx 16rpx;

  /* 拍立得阴影 */
  box-shadow:
    var(--shadow-md),
    0 4px 8px rgba(139, 115, 85, 0.06);

  .frame-content {
    border-radius: 2rpx;
    /* 内容区域保持正方形/矩形比例 */
    aspect-ratio: 1;
  }

  .frame-caption {
    margin-top: 12rpx;
    min-height: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    /* 手写字体 - 模拟拍立得底部手写区域 */
    font-family: var(--font-handwrite);
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    text-align: center;
    line-height: 1.6;
  }
}

/* ---- 暗黑模式适配 ---- */
@media (prefers-color-scheme: dark) {
  .collage-frame--simple {
    border-color: var(--border-color);
  }

  .collage-frame--photo {
    border-color: var(--bg-card);
    box-shadow:
      var(--shadow-md),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .collage-frame--polaroid {
    box-shadow:
      var(--shadow-md),
      0 4px 8px rgba(0, 0, 0, 0.2);
  }
}
</style>
