/**
 * useDishStore.js - 菜品数据状态
 * 管理：菜品列表、当前菜品详情、推荐菜品、分页
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getDishes, getRecommended, getDishDetail } from '@/api/dish'

export const useDishStore = defineStore('dish', () => {
  // ========== 状态 ==========

  /** 菜品列表 */
  const dishes = ref([])

  /** 当前查看的菜品详情 */
  const currentDish = ref(null)

  /** 推荐菜品列表 */
  const recommendedDishes = ref([])

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

  /** 按分类分组的菜品 */
  const dishesByCategory = computed(() => {
    const map = {}
    availableDishes.value.forEach(dish => {
      const cid = dish.categoryId || 'other'
      if (!map[cid]) map[cid] = []
      map[cid].push(dish)
    })
    return map
  })

  // ========== Actions ==========

  /**
   * 拉取菜品列表
   * @param {string} [categoryId] - 分类 ID（可选）
   * @param {boolean} [reset=false] - 是否重置列表
   */
  const fetchDishes = async (categoryId, reset = true) => {
    loading.value = true
    error.value = null

    if (reset) {
      page.value = 1
      dishes.value = []
    }

    try {
      const data = await getDishes({
        categoryId,
        page: page.value,
        pageSize: 20
      })

      // 兼容两种响应格式：Mock 返回数组，API 返回 { list, total, page, pageSize }
      const list = Array.isArray(data) ? data : (data?.list || [])

      if (reset) {
        dishes.value = list
      } else {
        dishes.value = [...dishes.value, ...list]
      }
      hasMore.value = list.length >= 20
    } catch (e) {
      console.error('[DishStore] 拉取菜品失败:', e)
      error.value = e.message || '加载菜品失败'
    } finally {
      loading.value = false
    }
  }

  /**
   * 拉取推荐菜品
   */
  const fetchRecommended = async () => {
    try {
      const data = await getRecommended()
      recommendedDishes.value = data || []
    } catch (e) {
      console.error('[DishStore] 拉取推荐菜品失败:', e)
    }
  }

  /**
   * 拉取菜品详情
   * @param {string} id - 菜品 ID
   */
  const fetchDishDetail = async (id) => {
    loading.value = true
    error.value = null
    currentDish.value = null

    try {
      const data = await getDishDetail(id)
      currentDish.value = data
    } catch (e) {
      console.error('[DishStore] 拉取菜品详情失败:', e)
      error.value = e.message || '加载菜品详情失败'
    } finally {
      loading.value = false
    }
  }

  /**
   * 加载更多菜品（分页）
   * @param {string} [categoryId]
   */
  const loadMore = async (categoryId) => {
    if (!hasMore.value || loading.value) return
    page.value += 1
    await fetchDishes(categoryId, false)
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
    dishesByCategory,
    fetchDishes,
    fetchRecommended,
    fetchDishDetail,
    loadMore
  }
})
