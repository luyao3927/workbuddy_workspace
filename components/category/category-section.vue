<template>
  <!--
    category-section.vue - 分类区块
    手帐风格：左侧装饰短横线 + 手写字体标题 + 菜品网格
  -->
  <view class="category-section">
    <!-- 分类标题区域 -->
    <view class="category-section__header">
      <view class="category-section__decorator" />
      <text class="category-section__title">{{ category.name }}</text>
    </view>

    <!-- 菜品列表 -->
    <dish-grid
      v-if="dishes && dishes.length > 0"
      :dishes="dishes"
      @item-click="handleItemClick"
    />

    <!-- 空状态 -->
    <app-empty
      v-else
      description="该分类暂无菜品"
    />
  </view>
</template>

<script setup>
/**
 * 分类区块组件
 * 包含分类标题（手写字体 + 装饰线）和菜品网格列表
 * 作为菜品列表页面的子区块使用
 */
defineOptions({ name: 'CategorySection' })

const props = defineProps({
  /** 分类对象 {id, name} */
  category: {
    type: Object,
    required: true
  },
  /** 该分类下的菜品数组 */
  dishes: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['item-click'])

/** 菜品点击 */
function handleItemClick(dish) {
  emit('item-click', dish)
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 分类区块 - 手帐风格
 * 装饰性短横线 + 手写字体标题
 * ============================================================ */

.category-section {
  margin-bottom: var(--spacing-lg);
}

/* ---- 标题区域 ---- */
.category-section__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
}

/* 左侧装饰短横线 */
.category-section__decorator {
  width: 32rpx;
  height: 6rpx;
  border-radius: 3rpx;
  background-color: var(--color-accent);
  flex-shrink: 0;
}

/* 分类名称 */
.category-section__title {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-lg);
  color: var(--text-primary);
}
</style>
