<template>
  <!--
    category-nav.vue - 横向滚动分类导航
    手帐风格：手写字体分类名 + 主题色下划线指示器
    支持暗黑模式，点击项平滑滚动到可见区域
  -->
  <view class="category-nav">
    <!-- 加载骨架 -->
    <view v-if="loading" class="category-nav__loading">
      <view v-for="i in 4" :key="i" class="category-nav__skeleton" />
    </view>

    <!-- 分类列表 -->
    <scroll-view
      v-else
      class="category-nav__scroll"
      scroll-x
      :show-scrollbar="false"
      :scroll-into-view="scrollIntoId"
      :scroll-with-animation="true"
    >
      <view class="category-nav__list">
        <view
          v-for="item in categories"
          :key="item.id"
          :id="`cat-nav-${item.id}`"
          class="category-nav__item"
          :class="{ 'category-nav__item--active': activeId === item.id }"
          @tap="handleSelect(item.id)"
        >
          <!-- 图标 -->
          <text class="category-nav__icon">{{ item.icon || '📋' }}</text>
          <!-- 分类名 -->
          <text class="category-nav__name">{{ item.name }}</text>
          <!-- 下划线指示器 -->
          <view
            v-if="activeId === item.id"
            class="category-nav__indicator"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
/**
 * 横向滚动分类导航
 * 使用 scroll-view 实现横向滚动，选中项高亮并显示下划线指示器
 * 点击分类项时自动滚动到可见区域
 */
import { ref } from 'vue'

defineOptions({ name: 'CategoryNav' })

const props = defineProps({
  /** 分类列表 [{id, name, icon, sort}] */
  categories: {
    type: Array,
    default: () => []
  },
  /** 当前选中的分类 ID */
  activeId: {
    type: String,
    default: ''
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

/** scroll-into-view 目标 ID */
const scrollIntoId = ref('')

/** 点击分类项 */
function handleSelect(categoryId) {
  scrollIntoId.value = `cat-nav-${categoryId}`
  emit('select', categoryId)
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 横向滚动分类导航 - 手帐风格
 * 手写字体 + 主题色下划线指示器
 * ============================================================ */

.category-nav {
  width: 100%;
  padding: var(--spacing-sm) 0;
  background-color: var(--bg-card);
  border-bottom: 1rpx solid var(--divider-color);
}

/* ---- 横向滚动容器 ---- */
.category-nav__scroll {
  width: 100%;
  white-space: nowrap;
}

/* ---- 分类列表 ---- */
.category-nav__list {
  display: inline-flex;
  gap: var(--spacing-sm);
  padding: 0 var(--spacing-md);
}

/* ---- 分类项 ---- */
.category-nav__item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  position: relative;
  cursor: pointer;
  transition: transform var(--transition-fast);
  min-width: 120rpx;

  &:active {
    transform: scale(0.95);
  }
}

/* 选中态 */
.category-nav__item--active {
  .category-nav__name {
    font-weight: bold;
    color: var(--color-primary);
  }
}

/* ---- 图标 ---- */
.category-nav__icon {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
  line-height: 1;
}

/* ---- 分类名称 ---- */
.category-nav__name {
  font-family: var(--font-handwrite);
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  transition: color var(--transition-normal);
  white-space: nowrap;
}

/* ---- 下划线指示器 ---- */
.category-nav__indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 6rpx;
  border-radius: 3rpx;
  background-color: var(--color-primary);
  transition: width var(--transition-normal);
}

/* ---- 加载骨架 ---- */
.category-nav__loading {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
}

.category-nav__skeleton {
  width: 120rpx;
  height: 64rpx;
  border-radius: var(--radius-sm);
  background-color: var(--bg-overlay);
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>
