/**
 * useCategoryStore.js - 菜品分类数据状态
 * 管理：分类列表、当前选中分类
 * 数据直接内嵌，无需网络请求（微信小程序最佳实践）
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockCategories } from '@/api/mock-data'

export const useCategoryStore = defineStore('category', () => {
  // ========== 状态 ==========

  /** 分类列表（直接从本地数据初始化） */
  const categories = ref([...mockCategories])

  /** 当前选中分类 ID */
  const activeCategoryId = ref(categories.value.length > 0 ? categories.value[0].id : '')

  /** 加载状态（同步数据，始终 false） */
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
   * 初始化分类（同步，无需网络请求）
   */
  const fetchCategories = () => {
    // 数据已在初始化时加载，这里保留接口兼容
    if (categories.value.length === 0) {
      categories.value = [...mockCategories]
    }
    if (!activeCategoryId.value && categories.value.length > 0) {
      activeCategoryId.value = categories.value[0].id
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
