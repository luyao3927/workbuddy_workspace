/**
 * useCart.js - 购物车逻辑复用
 * 封装购物车常用操作，方便页面和组件调用
 */
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'

export function useCart() {
  const cartStore = useCartStore()
  const { items, totalCount, totalPrice, selectedItems, isEmpty, showPopup } = storeToRefs(cartStore)

  /**
   * 获取某道菜在购物车中的数量
   * @param {string} dishId
   * @param {string} [specId]
   * @returns {number}
   */
  const getDishQuantity = (dishId, specId) => {
    const key = `${dishId}_${specId || 'default'}`
    const item = cartStore.cartItemMap[key]
    return item ? item.quantity : 0
  }

  /**
   * 添加菜品（带 Toast 反馈）
   */
  const addToCart = (dish, spec, quantity) => {
    cartStore.addItem(dish, spec, quantity)
  }

  /**
   * 去下单
   * @returns {boolean} 是否可以下单
   */
  const goToOrder = () => {
    if (cartStore.selectedItems.length === 0) {
      uni.showToast({ title: '请先选择菜品', icon: 'none' })
      return false
    }
    cartStore.togglePopup(false)
    uni.navigateTo({ url: '/pages/order/index' })
    return true
  }

  return {
    items,
    totalCount,
    totalPrice,
    selectedItems,
    isEmpty,
    showPopup,
    getDishQuantity,
    addToCart,
    goToOrder,
    // 直接暴露 store 方法
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
    toggleItemSelect: cartStore.toggleItemSelect,
    toggleSelectAll: cartStore.toggleSelectAll,
    togglePopup: cartStore.togglePopup,
    loadFromStorage: cartStore.loadFromStorage
  }
}
