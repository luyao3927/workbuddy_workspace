/**
 * useDish.js - 菜品逻辑复用
 * 数据已在 Store 初始化时同步加载，这里只做简单的转发
 */
import { useDishStore } from '@/stores/useDishStore'
import { useCategoryStore } from '@/stores/useCategoryStore'
import { storeToRefs } from 'pinia'

export function useDish() {
  const dishStore = useDishStore()
  const categoryStore = useCategoryStore()
  const { dishes, recommendedDishes, currentDish } = storeToRefs(dishStore)
  const { categories, activeCategoryId } = storeToRefs(categoryStore)

  /**
   * 切换分类（同步，无需网络请求）
   */
  const switchCategory = (categoryId) => {
    categoryStore.setActiveCategory(categoryId)
    dishStore.fetchDishes(categoryId)
  }

  return {
    dishes,
    recommendedDishes,
    currentDish,
    categories,
    activeCategoryId,
    switchCategory,
    fetchDishDetail: dishStore.fetchDishDetail
  }
}
