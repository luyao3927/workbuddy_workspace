<template>
  <!--
    collage-tape.vue - 胶带装饰组件
    模拟和纸胶带（washi tape）贴在手帐上的效果
    半透明、微锯齿边缘、随意角度，打造手工粘贴感
    父级容器需要 position: relative（使用 position="absolute" 时）
  -->
  <view
    class="collage-tape"
    :class="`collage-tape--${color}`"
    :style="tapeStyle"
  >
    <!-- 胶带内容插槽，可用于在胶带上放置文字 -->
    <slot />
  </view>
</template>

<script setup>
/**
 * 胶带装饰组件
 * 通过 clip-path 模拟胶带撕扯后不规则的锯齿边缘
 * 颜色从 CSS 变量 --tape-color-* 读取，自动适配暗黑模式
 */
defineOptions({ name: 'CollageTape' })

const props = defineProps({
  /** 胶带颜色：cream 米黄 | mint 薄荷绿 | pink 樱花粉 | blue 浅蓝 */
  color: {
    type: String,
    default: 'cream',
    validator: v => ['cream', 'mint', 'pink', 'blue'].includes(v)
  },
  /** 胶带宽度（rpx） */
  width: {
    type: Number,
    default: 120
  },
  /** 旋转角度（deg），负值为逆时针 */
  angle: {
    type: Number,
    default: -3
  },
  /** 顶部偏移，仅在 position="absolute" 时有效 */
  top: {
    type: String,
    default: '0'
  },
  /** 左侧偏移，仅在 position="absolute" 时有效 */
  left: {
    type: String,
    default: '0'
  },
  /** 定位方式 */
  position: {
    type: String,
    default: 'absolute',
    validator: v => ['absolute', 'relative'].includes(v)
  }
})

const tapeStyle = computed(() => ({
  width: `${props.width}rpx`,
  transform: `rotate(${props.angle}deg)`,
  top: props.top,
  left: props.left,
  position: props.position
}))
</script>

<script>
import { computed } from 'vue'
</script>

<style lang="scss" scoped>
/* ============================================================
 * 胶带装饰 - 核心样式
 * 半透明矩形 + clip-path 锯齿边缘 + 阴影
 * 每种颜色使用对应的 CSS 变量
 * ============================================================ */

.collage-tape {
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 胶带锯齿边缘 - 使用 polygon clip-path 模拟撕扯效果 */
  clip-path: polygon(
    3% 2%,
    8% 0%,
    15% 3%,
    22% 0%,
    30% 2%,
    38% 1%,
    45% 3%,
    52% 0%,
    60% 2%,
    68% 1%,
    75% 3%,
    82% 0%,
    90% 2%,
    97% 1%,
    98% 3%,
    /* 下边缘 - 同样的锯齿 */
    98% 97%,
    90% 100%,
    82% 98%,
    75% 100%,
    68% 97%,
    60% 99%,
    52% 98%,
    45% 100%,
    38% 97%,
    30% 99%,
    22% 98%,
    15% 100%,
    8% 97%,
    3% 99%,
    2% 97%
  );

  /* 胶带轻微阴影 */
  filter: drop-shadow(1px 1px 1px var(--tape-shadow));

  /* 过渡 */
  transition: transform var(--transition-normal), filter var(--transition-normal);

  /* 胶带上的文字样式 */
  font-size: var(--font-size-xs);
  font-family: var(--font-handwrite);
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8rpx;
}

/* ---- 颜色变体 ---- */
.collage-tape--cream {
  background-color: var(--tape-color-cream);
}
.collage-tape--mint {
  background-color: var(--tape-color-mint);
}
.collage-tape--pink {
  background-color: var(--tape-color-pink);
}
.collage-tape--blue {
  background-color: var(--tape-color-blue);
}
</style>
