/**
 * useDish.js - 菜品逻辑复用
 * 封装菜品数据获取、分类切换等常用逻辑
 */
import { ref } from 'vue'
import { useDishStore } from '@/stores/useDishStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { storeToRefs } from 'pinia'

export function useDish() {
  const dishStore = useDishStore()
  const categoryStore = useCategoryStore()
  const { dishes, recommendedDishes, loading, error, hasMore, currentDish } = storeToRefs(dishStore)
  const { categories, activeCategoryId } = storeToRefs(categoryStore)

  /** 是否正在刷新 */
  const refreshing = ref(false)

  /**
   * 初始化首页数据
   * 拉取分类、推荐菜品、默认分类菜品
   */
  const initHomeData = async () => {
    await Promise.all([
      categoryStore.fetchCategories(),
      dishStore.fetchRecommended()
    ])
    // 拉取默认分类的菜品
    if (categoryStore.activeCategoryId) {
      await dishStore.fetchDishes(categoryStore.activeCategoryId)
    }
  }

  /**
   * 切换分类
   * @param {string} categoryId
   */
  const switchCategory = async (categoryId) => {
    categoryStore.setActiveCategory(categoryId)
    await dishStore.fetchDishes(categoryId)
  }

  /**
   * 下拉刷新
   */
  const onRefresh = async () => {
    refreshing.value = true
    try {
      await initHomeData()
    } finally {
      refreshing.value = false
    }
  }

  /**
   * 加载更多
   */
  const onLoadMore = async () => {
    if (!hasMore.value || loading.value) return
    await dishStore.loadMore(categoryStore.activeCategoryId)
  }

  return {
    dishes,
    recommendedDishes,
    currentDish,
    categories,
    activeCategoryId,
    loading,
    error,
    hasMore,
    refreshing,
    initHomeData,
    switchCategory,
    onRefresh,
    onLoadMore,
    fetchDishDetail: dishStore.fetchDishDetail
  }
}
