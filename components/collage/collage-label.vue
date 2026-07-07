<template>
  <!--
    collage-label.vue - 手写感标签组件
    手写字体 + 虚线边框 + 微旋转 + 可选背景色
    用于标记、分类、价格标签等场景
    父级无需 position: relative，使用默认 inline 定位即可
  -->
  <text
    class="collage-label"
    :class="[
      `collage-label--${size}`,
      { 'collage-label--has-bg': color }
    ]"
    :style="labelStyle"
  >
    {{ text }}
    <slot />
  </text>
</template>

<script setup>
/**
 * 手写感标签组件
 * 使用 var(--font-handwrite) 字体展现温暖手工风格
 * 虚线边框 + 微旋转 + 可选背景色
 */
defineOptions({ name: 'CollageLabel' })

const props = defineProps({
  /** 标签文字 */
  text: {
    type: String,
    default: ''
  },
  /** 背景色：accent | primary | highlight | ''（透明） */
  color: {
    type: String,
    default: ''
  },
  /** 标签大小 */
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  /** 旋转角度（deg） */
  rotation: {
    type: Number,
    default: -1
  }
})

/**
 * 根据 color prop 获取背景色值
 */
const bgColor = computed(() => {
  const colorMap = {
    accent: 'var(--color-accent)',
    primary: 'var(--color-primary)',
    highlight: 'var(--color-highlight)'
  }
  return colorMap[props.color] || props.color
})

/**
 * 背景色存在时，文字使用白色确保对比度
 */
const textColor = computed(() => {
  return props.color ? '#fff' : 'var(--text-primary)'
})

const labelStyle = computed(() => ({
  transform: `rotate(${props.rotation}deg)`,
  backgroundColor: props.color ? bgColor.value : 'transparent',
  color: textColor.value
}))
</script>

<style lang="scss" scoped>
/* ============================================================
 * 手写标签 - 核心样式
 * 手写字体 + 虚线边框 + 微阴影 + 微旋转
 * 三种尺寸通过不同的 padding 和 font-size 实现
 * ============================================================ */

.collage-label {
  /* 手写字体 - 温暖、手工感 */
  font-family: var(--font-handwrite);

  /* 虚线边框 */
  border: 2rpx dashed var(--border-color);
  border-radius: var(--radius-md);

  /* 微阴影 - 模拟标签微微翘起 */
  box-shadow: 0 1px 3px rgba(139, 115, 85, 0.08);

  /* 内联块级显示 */
  display: inline-block;

  /* 过渡 */
  transition: transform var(--transition-normal), background-color var(--transition-normal), color var(--transition-normal);

  /* 文字不换行 */
  white-space: nowrap;

  /* 基础字号和行高 */
  line-height: 1.5;
  letter-spacing: 1rpx;
}

/* ---- 尺寸变体 ---- */
.collage-label--sm {
  font-size: var(--font-size-xs);
  padding: 2rpx 12rpx;
}

.collage-label--md {
  font-size: var(--font-size-sm);
  padding: 4rpx 16rpx;
}

.collage-label--lg {
  font-size: var(--font-size-md);
  padding: 6rpx 20rpx;
}

/* ---- 有背景色时调整边框颜色 ---- */
.collage-label--has-bg {
  border-color: transparent;
  /* 有背景色时增加一点内边距补偿 */
}

/* ---- 暗黑模式适配 ---- */
@media (prefers-color-scheme: dark) {
  .collage-label {
    border-color: var(--border-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}
</style>
