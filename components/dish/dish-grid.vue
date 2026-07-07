<template>
  <!--
    dish-grid.vue - 菜品网格列表容器
    两列网格布局，使用 dish-card 渲染每个菜品
    loading 状态显示骨架屏
  -->
  <view class="dish-grid">
    <!-- 加载状态：骨架屏 -->
    <view v-if="loading" class="dish-grid__loading">
      <view
        v-for="i in skeletonCount"
        :key="i"
        class="dish-grid__skeleton-item"
      >
        <app-loading type="skeleton" :rows="3" />
      </view>
    </view>

    <!-- 网格列表 -->
    <view v-else class="dish-grid__list" :class="`dish-grid__list--col-${columns}`">
      <view
        v-for="(dish, index) in dishes"
        :key="dish.id"
        class="dish-grid__item"
      >
        <dish-card
          :dish="dish"
          :index="index"
          @click="handleItemClick(dish, index)"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * 菜品网格列表容器
 * 两列网格布局（手机端最佳显示），响应式列数可配
 * loading 时渲染骨架屏占位，数据加载完成后展示 dish-card
 */
import { computed } from 'vue'

defineOptions({ name: 'DishGrid' })

const props = defineProps({
  /** 菜品数据数组 */
  dishes: {
    type: Array,
    default: () => []
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 列数，默认 2 列 */
  columns: {
    type: Number,
    default: 2
  }
})

const emit = defineEmits(['item-click'])

/** 骨架屏占位数量（loading 时展示 4 个占位项） */
const skeletonCount = computed(() => 4)

/** 子项点击事件 */
function handleItemClick(dish, index) {
  emit('item-click', dish, index)
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 菜品网格列表 - 样式
 * 两列等宽网格，间距统一使用 CSS 变量
 * ============================================================ */

.dish-grid {
  width: 100%;
  padding: var(--spacing-sm);
  box-sizing: border-box;
}

/* ---- 网格列表 ---- */
.dish-grid__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

/* 列数变体 */
.dish-grid__list--col-1 .dish-grid__item {
  width: 100%;
}

.dish-grid__list--col-2 .dish-grid__item {
  width: calc((100% - var(--spacing-md)) / 2);
}

.dish-grid__list--col-3 .dish-grid__item {
  width: calc((100% - var(--spacing-md) * 2) / 3);
}

/* ---- 骨架屏 ---- */
.dish-grid__loading {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.dish-grid__skeleton-item {
  width: calc((100% - var(--spacing-md)) / 2);
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  overflow: hidden;
}
</style>
