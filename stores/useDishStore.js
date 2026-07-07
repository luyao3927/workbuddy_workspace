/**
 * useDishStore.js - 菜品数据状态
 * 管理：菜品列表、当前菜品详情、推荐菜品
 * 数据直接内嵌，无需网络请求（微信小程序最佳实践）
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockDishes } from '@/api/mock-data'

export const useDishStore = defineStore('dish', () => {
  // ========== 状态 ==========

  /** 全量菜品（本地数据） */
  const allDishes = [...mockDishes]

  /** 当前分类下的菜品列表 */
  const dishes = ref([])

  /** 当前查看的菜品详情 */
  const currentDish = ref(null)

  /** 推荐菜品列表（初始化即计算） */
  const recommendedDishes = ref(
    allDishes.filter(d => d.isRecommended && d.isOnSale !== false).sort((a, b) => a.sort - b.sort).slice(0, 6)
  )

  /** 加载状态 */
  const loading = ref(false)

  /** 错误信息 */
  const error = ref(null)

  /** 当前页码 */
  const page = ref(1)

  /** 是否有更多数据 */
  const hasMore = ref(true)

  // ========== Getters ==========

  /** 过滤上架的菜品 */
  const availableDishes = computed(() => {
    return dishes.value.filter(d => d.isOnSale !== false)
  })

  // ========== Actions ==========

  /**
   * 按分类获取菜品（同步，无需网络请求）
   * @param {string} [categoryId] - 分类 ID
   */
  const fetchDishes = (categoryId) => {
    let list = [...allDishes].filter(d => d.isOnSale !== false)

    if (categoryId) {
      list = list.filter(d => d.categoryId === categoryId)
    }

    list.sort((a, b) => a.sort - b.sort)
    dishes.value = list
    hasMore.value = false // 本地数据不分页，全部加载
  }

  /**
   * 获取推荐菜品
   */
  const fetchRecommended = () => {
    recommendedDishes.value = allDishes
      .filter(d => d.isRecommended && d.isOnSale !== false)
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 6)
  }

  /**
   * 获取菜品详情（同步）
   * @param {string} id - 菜品 ID
   */
  const fetchDishDetail = (id) => {
    const dish = allDishes.find(d => d.id === id)
    if (dish) {
      currentDish.value = dish
    } else {
      error.value = '菜品不存在'
    }
  }

  /**
   * 加载更多（本地数据无需分页，保留接口兼容）
   */
  const loadMore = () => {
    hasMore.value = false
  }

  return {
    dishes,
    currentDish,
    recommendedDishes,
    loading,
    error,
    page,
    hasMore,
    availableDishes,
    fetchDishes,
    fetchRecommended,
    fetchDishDetail,
    loadMore
  }
})
