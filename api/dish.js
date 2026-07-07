/**
 * dish.js - 菜品接口
 * 对接后端 API 服务，获取菜品列表、详情、推荐
 * Mock 模式作为降级方案保留
 */
import { get } from '@/utils/request'
import { API_PATHS, USE_MOCK } from '@/config/api.config'
import { mockDishes } from './mock-data'

/**
 * 获取菜品列表
 * @param {Object} params - 查询参数
 * @param {string} [params.categoryId] - 分类 ID
 * @param {number} [params.page=1] - 页码
 * @param {number} [params.pageSize=20] - 每页数量
 * @returns {Promise<Array>} 菜品列表（Mock 返回数组，API 返回 { list, total, page, pageSize }）
 */
export function getDishes(params = {}) {
  if (USE_MOCK) {
    let result = [...mockDishes]
    if (params.categoryId) {
      result = result.filter(d => d.categoryId === params.categoryId)
    }
    result = result.filter(d => d.isOnSale !== false)
    const page = params.page || 1
    const pageSize = params.pageSize || 20
    const start = (page - 1) * pageSize
    return Promise.resolve(result.slice(start, start + pageSize))
  }

  // 真实 API：后端返回 { list, total, page, pageSize }，拦截器自动解包 data
  return get(API_PATHS.DISHES, params)
}

/**
 * 获取推荐菜品
 * @returns {Promise<Array>}
 */
export function getRecommended() {
  if (USE_MOCK) {
    const recommended = mockDishes
      .filter(d => d.isRecommended && d.isOnSale !== false)
      .slice(0, 6)
    return Promise.resolve(recommended)
  }
  return get(API_PATHS.DISH_RECOMMENDED)
}

/**
 * 获取菜品详情
 * @param {string} id - 菜品 ID
 * @returns {Promise<Object>}
 */
export function getDishDetail(id) {
  if (USE_MOCK) {
    const dish = mockDishes.find(d => d.id === id)
    if (dish) {
      return Promise.resolve(dish)
    }
    return Promise.reject(new Error('菜品不存在'))
  }
  return get(API_PATHS.DISH_DETAIL.replace('{id}', id))
}
