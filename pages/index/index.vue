<!--
  菜谱首页 — pages/index/index.vue
  功能：推荐菜品 + 分类导航 + 菜品列表 + 购物车悬浮 + 下拉刷新/上拉加载
-->
<template>
  <view class="page-index collage-paper-bg">
    <!-- 导航栏 -->
    <app-nav-bar title="私房菜谱" />

    <scroll-view
      scroll-y
      class="page-scroll"
    >
      <!-- 推荐菜品区 -->
      <view class="section-recommend" v-if="recommendedDishes.length">
        <view class="section-header">
          <collage-label text="✨ 今日推荐" color="var(--color-accent)" size="lg" />
        </view>
        <scroll-view scroll-x class="recommend-scroll" :show-scrollbar="false">
          <view class="recommend-list">
            <view
              v-for="(dish, index) in recommendedDishes"
              :key="dish.id"
              class="recommend-item"
            >
              <dish-card
                :dish="dish"
                :index="index"
                @click="handleDishClick(dish)"
              />
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
      <dish-grid
        :dishes="dishes"
        :loading="false"
        @item-click="handleDishClick"
      />
    </scroll-view>

        <!-- 分类导航区 -->
        <view class="section-category">
          <category-nav
            :categories="categories"
            :active-id="activeCategoryId"
            :loading="loading"
            @select="switchCategory"
          />
          <!-- 装饰胶带 -->
          <collage-tape color="var(--color-accent)" :angle="2" top="-6rpx" right="5%" />
        </view>

        <!-- 菜品列表区 -->
        <view class="section-dishes">
          <dish-grid
            :dishes="dishes"
            :loading="loading"
            :columns="2"
            @item-click="handleDishClick"
          />

          <!-- 加载更多提示 -->
          <view v-if="hasMore && dishes.length > 0" class="load-more">
            <text class="load-more-text">上拉加载更多…</text>
          </view>
          <view v-else-if="!hasMore && dishes.length > 0" class="load-more">
            <text class="load-more-text">— 已经到底啦 —</text>
          </view>
        </view>

        <!-- 底部安全区占位 -->
        <view class="safe-bottom" />
      </scroll-view>

      <!-- 悬浮购物车 -->
      <cart-float
        @click-cart="togglePopup"
        @click-order="goToOrder"
      />
    </template>

    <!-- 购物车详情弹窗 -->
    <cart-popup />
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { useDish } from '@/composables/useDish'
import { useCart } from '@/composables/useCart'
import { useTheme } from '@/composables/useTheme'

const {
  dishes,
  recommendedDishes,
  categories,
  activeCategoryId,
  switchCategory,
  onRefresh
} = useDish()

const { togglePopup, goToOrder } = useCart()
const { initTheme } = useTheme()

// 页面加载——数据已在 Store 初始化时同步加载，无需等待
onLoad(() => {
  initTheme()
  switchCategory(activeCategoryId.value)
})

// 点击菜品跳转详情
function handleDishClick(dish) {
  uni.navigateTo({
    url: `/pages/dish-detail/index?dishId=${dish.id}`
  })
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
  background-image: radial-gradient(
    circle at 20% 50%,
    var(--bg-highlight) 1px,
    transparent 1px
  );
  background-size: 40rpx 40rpx;
}

.page-scroll {
  flex: 1;
  overflow: hidden;
}

// 推荐菜品区
.section-recommend {
  position: relative;
  padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);

  .section-header {
    margin-bottom: var(--spacing-sm);
  }

  .recommend-scroll {
    white-space: nowrap;
  }

  .recommend-list {
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs) 0;
  }

  .recommend-item {
    flex-shrink: 0;
    width: 280rpx;
  }
}

// 分类导航区
.section-category {
  position: relative;
  padding: var(--spacing-sm) 0;
}

// 菜品列表区
.section-dishes {
  flex: 1;
  padding: 0 var(--spacing-md);

  .load-more {
    display: flex;
    justify-content: center;
    padding: var(--spacing-lg) 0;

    .load-more-text {
      font-size: var(--font-size-sm);
      color: var(--text-muted);
      font-family: var(--font-handwrite);
    }
  }
}

// 底部安全区
.safe-bottom {
  height: calc(var(--cart-float-height) + var(--spacing-lg) + env(safe-area-inset-bottom));
}
</style>
