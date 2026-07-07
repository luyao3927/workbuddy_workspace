<template>
  <!--
    dish-spec-selector.vue - 规格选择弹层
    底部弹出式选择器，每个规格显示为可选标签按钮
    选中高亮（主题色边框+背景），显示价格差异
  -->
  <!-- 遮罩层 -->
  <view
    v-if="visible"
    class="spec-selector-overlay"
    @tap="handleClose"
    @touchmove.stop.prevent
  >
    <!-- 底部弹出面板 -->
    <view class="spec-selector" @tap.stop>
      <!-- 标题栏 -->
      <view class="spec-selector__header">
        <text class="spec-selector__title">选择规格</text>
        <view class="spec-selector__close" @tap="handleClose">
          <text class="spec-selector__close-icon">✕</text>
        </view>
      </view>

      <!-- 规格列表 -->
      <view class="spec-selector__body">
        <view
          v-for="spec in specs"
          :key="spec.id"
          class="spec-item"
          :class="{
            'spec-item--active': modelValue === spec.id,
            'spec-item--delta-positive': spec.priceDelta > 0,
            'spec-item--delta-negative': spec.priceDelta < 0
          }"
          @tap="handleSelect(spec.id)"
        >
          <text class="spec-item__name">{{ spec.name }}</text>
          <!-- 价格差异显示 -->
          <text
            v-if="spec.priceDelta !== 0"
            class="spec-item__delta"
          >
            {{ spec.priceDelta > 0 ? '+' : '' }}¥{{ (spec.priceDelta / 100).toFixed(spec.priceDelta % 100 === 0 ? 0 : 2) }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 规格选择弹层组件
 * 底部弹出式面板，遮罩点击关闭
 * 规格选中高亮，价格差异 color-coded（加价红色 / 降价绿色）
 * priceDelta 以"分"为单位
 */
import { computed } from 'vue'

defineOptions({ name: 'DishSpecSelector' })

const props = defineProps({
  /** 规格列表：[{ id, name, priceDelta }] */
  specs: {
    type: Array,
    default: () => []
  },
  /** 当前选中的规格 id */
  modelValue: {
    type: String,
    default: ''
  },
  /** 弹层是否可见 */
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

/** 选择规格 */
function handleSelect(specId) {
  emit('update:modelValue', specId)
}

/** 关闭弹层 */
function handleClose() {
  emit('close')
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 规格选择弹层 - 样式
 * 底部弹出面板 + 半透明遮罩 + 标签式规格按钮
 * 暗黑模式适配
 * ============================================================ */

/* ---- 遮罩层 ---- */
.spec-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;
  animation: overlay-fade-in 0.25s ease;
}

/* ---- 底部弹出面板 ---- */
.spec-selector {
  width: 100%;
  background-color: var(--bg-card);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  animation: panel-slide-up 0.3s ease;
}

/* ---- 标题栏 ---- */
.spec-selector__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1rpx solid var(--divider-color);
}

.spec-selector__title {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-md);
  color: var(--text-primary);
}

.spec-selector__close {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--bg-primary);
  transition: background-color var(--transition-fast);
}

.spec-selector__close-icon {
  font-size: var(--font-size-md);
  color: var(--text-muted);
  line-height: 1;
}

/* ---- 规格列表 ---- */
.spec-selector__body {
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  max-height: 400rpx;
  overflow-y: auto;
}

/* ---- 规格项 ---- */
.spec-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  border: 2rpx solid var(--border-color);
  background-color: var(--bg-primary);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:active {
    transform: scale(0.96);
  }
}

.spec-item__name {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

/* 价格差异文字 */
.spec-item__delta {
  font-family: var(--font-handwrite);
  font-size: var(--font-size-xs);
}

/* 加价：红色 */
.spec-item--delta-positive .spec-item__delta {
  color: var(--text-price);
}

/* 降价：绿色 */
.spec-item--delta-negative .spec-item__delta {
  color: var(--color-primary);
}

/* ---- 选中高亮 ---- */
.spec-item--active {
  border-color: var(--color-primary);
  background-color: var(--bg-highlight);

  .spec-item__name {
    color: var(--color-primary);
  }
}

/* ---- 动画 ---- */
@keyframes overlay-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes panel-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* ---- 暗黑模式适配 ---- */
@media (prefers-color-scheme: dark) {
  .spec-selector-overlay {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .spec-selector {
    background-color: var(--bg-card);
  }

  .spec-item--active {
    border-color: var(--color-accent);
    background-color: rgba(var(--color-accent-rgb, 255, 180, 100), 0.12);

    .spec-item__name {
      color: var(--color-accent);
    }
  }
}
</style>
