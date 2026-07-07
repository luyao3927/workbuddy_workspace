/**
 * useOrder.js - 下单逻辑复用
 * 封装订单提交、校验等逻辑
 */
import { ref } from 'vue'
import { useOrderStore } from '@/stores/useOrderStore'
import { useCartStore } from '@/stores/useCartStore'
import { storeToRefs } from 'pinia'

export function useOrder() {
  const orderStore = useOrderStore()
  const cartStore = useCartStore()
  const { submitting, error, currentOrder } = storeToRefs(orderStore)

  /** 备注 */
  const remark = ref('')

  /**
   * 提交订单
   * @returns {Promise<Object|null>}
   */
  const handleSubmit = async () => {
    // 校验购物车不为空
    if (cartStore.selectedItems.length === 0) {
      uni.showToast({ title: '购物车为空', icon: 'none' })
      return null
    }

    try {
      const result = await orderStore.submit({
        items: cartStore.selectedItems,
        totalPrice: cartStore.totalPrice,
        remark: remark.value
      })

      // 下单成功后清空购物车
      cartStore.clearCart()
      return result
    } catch (e) {
      uni.showToast({ title: e.message || '提交失败', icon: 'none' })
      return null
    }
  }

  /**
   * 跳转到下单成功页
   * @param {string} orderId
   */
  const goToSuccess = (orderId) => {
    uni.redirectTo({
      url: `/pages/order-success/index?orderId=${orderId}`
    })
  }

  return {
    submitting,
    error,
    currentOrder,
    remark,
    handleSubmit,
    goToSuccess,
    clearCurrentOrder: orderStore.clearCurrentOrder
  }
}
