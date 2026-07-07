<!--
  菜谱首页 — pages/index/index.vue
  功能：推荐菜品 + 分类导航 + 菜品列表 + 购物车悬浮 + 下拉刷新/上拉加载
-->
<template>
  <view class="page-index collage-paper-bg">
    <app-nav-bar title="私房菜谱" />

    <scroll-view scroll-y class="page-scroll">
      <!-- 推荐菜品区 -->
      <view class="section-recommend" v-if="recommendedDishes.length">
        <view class="section-header">
          <collage-label text="✨ 今日推荐" color="var(--color-accent)" size="lg" />
        </view>
        <scroll-view scroll-x class="recommend-scroll" :show-scrollbar="false">
          <view class="recommend-list">
            <view v-for="(dish, idx) in recommendedDishes" :key="dish.id" class="recommend-item">
              <dish-card :dish="dish" :index="idx" @click="handleDishClick(dish)" />
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 分类导航 -->
      <category-nav
        v-if="categories.length"
        :categories="categories"
        :active-id="activeCategoryId"
        @select="switchCategory"
      />

      <!-- 菜品列表 -->
      <dish-grid :dishes="dishes" :loading="false" @item-click="handleDishClick" />

      <!-- 底部安全区 -->
      <view class="safe-bottom" />
    </scroll-view>

    <!-- 悬浮购物车 -->
    <cart-float @click-cart="togglePopup" @click-order="goToOrder" />

    <!-- 购物车弹窗 -->
    <cart-popup />
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useDish } from '@/composables/useDish'
import { useCart } from '@/composables/useCart'
import { useTheme } from '@/composables/useTheme'

const { dishes, recommendedDishes, categories, activeCategoryId, switchCategory } = useDish()
const { togglePopup, goToOrder } = useCart()
const { initTheme } = useTheme()

onLoad(() => {
  initTheme()
  switchCategory(activeCategoryId.value)
})

function handleDishClick(dish) {
  uni.navigateTo({ url: `/pages/dish-detail/index?dishId=${dish.id}` })
}
</script>

<style lang="scss" scoped>
.page-index {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
}
.collage-paper-bg {
  background-image: radial-gradient(circle at 20% 50%, var(--bg-highlight) 1px, transparent 1px);
  background-size: 40rpx 40rpx;
}
.page-scroll { flex: 1; overflow: hidden; }
.section-recommend {
  position: relative;
  padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
}
.section-header { margin-bottom: var(--spacing-sm); }
.recommend-scroll { white-space: nowrap; }
.recommend-list { display: flex; gap: var(--spacing-sm); padding: var(--spacing-xs) 0; }
.recommend-item { flex-shrink: 0; width: 280rpx; }
.safe-bottom {
  height: calc(var(--cart-float-height) + var(--spacing-lg) + env(safe-area-inset-bottom));
}
</style>
