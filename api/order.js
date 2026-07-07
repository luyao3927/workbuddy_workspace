/**
 * order.js - 订单接口
 * 对接 WorkBuddy 数据源，提交订单和查询订单
 */
import { post, get } from '@/utils/request'
import { API_PATHS, USE_MOCK } from '@/config/api.config'

/**
 * 提交订单
 * @param {Object} data - 订单数据
 * @param {Array} data.items - 菜品列表 [{ dishId, specId, specName, quantity, price }]
 * @param {number} data.totalPrice - 总金额（分）
 * @param {string} [data.remark] - 备注
 * @returns {Promise<Object>} 订单结果
 */
export function submitOrder(data) {
  if (USE_MOCK) {
    // 模拟提交订单
    const orderId = `ORD${Date.now()}${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    const result = {
      id: orderId,
      items: data.items,
      totalPrice: data.totalPrice,
      remark: data.remark || '',
      status: 'pending',
      createTime: new Date().toISOString()
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(result), 500) // 模拟网络延迟
    })
  }
  return post(API_PATHS.ORDERS, data)
}

/**
 * 获取订单详情
 * @param {string} orderId
 * @returns {Promise<Object>}
 */
export function getOrderDetail(orderId) {
  if (USE_MOCK) {
    return Promise.resolve({
      id: orderId,
      items: [],
      totalPrice: 0,
      status: 'pending',
      createTime: new Date().toISOString()
    })
  }
  return get(API_PATHS.ORDER_DETAIL.replace('{id}', orderId))
}
