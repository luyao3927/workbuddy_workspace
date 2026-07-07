/**
 * useOrderStore.js - 订单状态管理
 * 管理：当前订单、订单提交、订单详情
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { submitOrder, getOrderDetail } from '@/api/order'

export const useOrderStore = defineStore('order', () => {
  // ========== 状态 ==========

  /** 当前订单信息 */
  const currentOrder = ref(null)

  /** 历史订单列表 */
  const orderList = ref([])

  /** 提交中 */
  const submitting = ref(false)

  /** 错误信息 */
  const error = ref(null)

  // ========== Actions ==========

  /**
   * 提交订单
   * @param {Object} orderData - 订单数据
   * @param {Array} orderData.items - 菜品列表
   * @param {number} orderData.totalPrice - 总金额（分）
   * @param {string} [orderData.remark] - 备注
   * @returns {Promise<Object>} 订单结果
   */
  const submit = async (orderData) => {
    submitting.value = true
    error.value = null

    try {
      const result = await submitOrder({
        items: orderData.items.map(item => ({
          dishId: item.dishId,
          specId: item.specId,
          specName: item.specName,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice: orderData.totalPrice,
        remark: orderData.remark || ''
      })

      currentOrder.value = result
      return result
    } catch (e) {
      console.error('[OrderStore] 提交订单失败:', e)
      error.value = e.message || '提交订单失败'
      throw e
    } finally {
      submitting.value = false
    }
  }

  /**
   * 获取订单详情
   * @param {string} orderId
   */
  const fetchOrderDetail = async (orderId) => {
    error.value = null

    try {
      const data = await getOrderDetail(orderId)
      currentOrder.value = data
      return data
    } catch (e) {
      console.error('[OrderStore] 获取订单详情失败:', e)
      error.value = e.message || '获取订单详情失败'
      throw e
    }
  }

  /**
   * 清空当前订单
   */
  const clearCurrentOrder = () => {
    currentOrder.value = null
  }

  return {
    currentOrder,
    orderList,
    submitting,
    error,
    submit,
    fetchOrderDetail,
    clearCurrentOrder
  }
})
