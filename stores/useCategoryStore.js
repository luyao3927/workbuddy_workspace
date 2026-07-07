/**
 * useCategoryStore.js - 菜品分类数据状态
 * 管理：分类列表、当前选中分类、加载/错误状态
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCategories } from '@/api/category'

export const useCategoryStore = defineStore('category', () => {
  // ========== 状态 ==========

  /** 分类列表 */
  const categories = ref([])

  /** 当前选中分类 ID */
  const activeCategoryId = ref('')

  /** 加载状态 */
  const loading = ref(false)

  /** 错误信息 */
  const error = ref(null)

  // ========== Getters ==========

  /** 按 sort 排序的分类列表 */
  const sortedCategories = computed(() => {
    return [...categories.value].sort((a, b) => a.sort - b.sort)
  })

  /** 当前选中的分类对象 */
  const activeCategory = computed(() => {
    return categories.value.find(c => c.id === activeCategoryId.value) || null
  })

  // ========== Actions ==========

  /**
   * 拉取分类列表
   */
  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await getCategories()
      categories.value = data || []
      // 默认选中第一个分类
      if (categories.value.length > 0 && !activeCategoryId.value) {
        activeCategoryId.value = categories.value[0].id
      }
    } catch (e) {
      console.error('[CategoryStore] 拉取分类失败:', e)
      error.value = e.message || '加载分类失败'
    } finally {
      loading.value = false
    }
  }

  /**
   * 设置当前选中分类
   * @param {string} id - 分类 ID
   */
  const setActiveCategory = (id) => {
    activeCategoryId.value = id
  }

  return {
    categories,
    activeCategoryId,
    loading,
    error,
    sortedCategories,
    activeCategory,
    fetchCategories,
    setActiveCategory
  }
})
