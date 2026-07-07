/**
 * useCartStore.js - 购物车状态管理（核心 Store）
 * 管理：购物车列表、增删改查、本地持久化、弹窗状态
 * 注意：价格以"分"为单位存储，避免浮点数精度问题
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CART_STORAGE_KEY } from '@/config/constants'
import { MAX_CART_ITEMS } from '@/config/app.config'

export const useCartStore = defineStore('cart', () => {
  // ========== 状态 ==========

  /** 购物车列表 */
  const items = ref([])

  /** 是否显示购物车弹窗 */
  const showPopup = ref(false)

  // ========== Getters ==========

  /** 购物车总数量 */
  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  /** 合计金额（分） */
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.selected ? item.price * item.quantity : 0)
    }, 0)
  })

  /** 已选中的菜品列表 */
  const selectedItems = computed(() => {
    return items.value.filter(item => item.selected)
  })

  /** 购物车是否为空 */
  const isEmpty = computed(() => items.value.length === 0)

  /** 已选中数量 */
  const selectedCount = computed(() => {
    return selectedItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  /** 购物车映射表（dishId + specId → item） */
  const cartItemMap = computed(() => {
    const map = {}
    items.value.forEach(item => {
      const key = `${item.dishId}_${item.specId || 'default'}`
      map[key] = item
    })
    return map
  })

  // ========== Actions ==========

  /**
   * 生成购物车项唯一键
   */
  const getItemKey = (dishId, specId) => {
    return `${dishId}_${specId || 'default'}`
  }

  /**
   * 添加菜品到购物车
   * @param {Object} dish - 菜品信息
   * @param {Object} [spec] - 规格信息（可选）
   * @param {number} [quantity=1] - 数量
   */
  const addItem = (dish, spec = null, quantity = 1) => {
    const key = getItemKey(dish.id, spec?.id)
    const existingItem = cartItemMap.value[key]

    if (existingItem) {
      // 已存在，增加数量
      const newQty = existingItem.quantity + quantity
      if (newQty > MAX_CART_ITEMS) {
        uni.showToast({ title: `每道菜最多点${MAX_CART_ITEMS}份`, icon: 'none' })
        return
      }
      existingItem.quantity = newQty
    } else {
      // 新增
      const price = spec?.priceDelta != null
        ? dish.price + spec.priceDelta
        : dish.price

      items.value.push({
        dishId: dish.id,
        name: dish.name,
        image: dish.image,
        specId: spec?.id || null,
        specName: spec?.name || null,
        price: Math.max(0, price), // 确保价格不为负
        quantity,
        selected: true
      })
    }

    saveToStorage()

    // 加购动画反馈
    uni.showToast({
      title: '已加入菜篮',
      icon: 'success',
      duration: 1000
    })
  }

  /**
   * 移除菜品
   * @param {string} dishId
   * @param {string} [specId]
   */
  const removeItem = (dishId, specId) => {
    const key = getItemKey(dishId, specId)
    const index = items.value.findIndex(
      item => getItemKey(item.dishId, item.specId) === key
    )
    if (index > -1) {
      items.value.splice(index, 1)
      saveToStorage()
    }
  }

  /**
   * 更新菜品数量
   * @param {string} dishId
   * @param {string} [specId]
   * @param {number} quantity - 新数量
   */
  const updateQuantity = (dishId, specId, quantity) => {
    if (quantity < 1) {
      removeItem(dishId, specId)
      return
    }
    if (quantity > MAX_CART_ITEMS) {
      uni.showToast({ title: `每道菜最多点${MAX_CART_ITEMS}份`, icon: 'none' })
      return
    }

    const key = getItemKey(dishId, specId)
    const item = items.value.find(
      item => getItemKey(item.dishId, item.specId) === key
    )
    if (item) {
      item.quantity = quantity
      saveToStorage()
    }
  }

  /**
   * 清空购物车
   */
  const clearCart = () => {
    items.value = []
    saveToStorage()
  }

  /**
   * 切换菜品选中状态
   */
  const toggleItemSelect = (dishId, specId) => {
    const key = getItemKey(dishId, specId)
    const item = items.value.find(
      item => getItemKey(item.dishId, item.specId) === key
    )
    if (item) {
      item.selected = !item.selected
      saveToStorage()
    }
  }

  /**
   * 全选/取消全选
   */
  const toggleSelectAll = () => {
    const allSelected = items.value.every(item => item.selected)
    items.value.forEach(item => {
      item.selected = !allSelected
    })
    saveToStorage()
  }

  /**
   * 切换购物车弹窗
   * @param {boolean} [visible] - 不传则切换
   */
  const togglePopup = (visible) => {
    if (visible !== undefined) {
      showPopup.value = visible
    } else {
      showPopup.value = !showPopup.value
    }
  }

  /**
   * 从本地存储恢复购物车数据
   */
  const loadFromStorage = () => {
    try {
      const data = uni.getStorageSync(CART_STORAGE_KEY)
      if (data) {
        items.value = JSON.parse(data)
      }
    } catch (e) {
      console.error('[CartStore] 读取本地购物车失败:', e)
      items.value = []
    }
  }

  /**
   * 持久化购物车数据到本地存储
   */
  const saveToStorage = () => {
    try {
      uni.setStorageSync(CART_STORAGE_KEY, JSON.stringify(items.value))
    } catch (e) {
      console.error('[CartStore] 保存购物车失败:', e)
    }
  }

  return {
    items,
    showPopup,
    totalCount,
    totalPrice,
    selectedItems,
    isEmpty,
    selectedCount,
    cartItemMap,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleItemSelect,
    toggleSelectAll,
    togglePopup,
    loadFromStorage,
    saveToStorage
  }
})
