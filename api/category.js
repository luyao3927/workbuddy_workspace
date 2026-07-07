/**
 * category.js - 分类接口
 * 对接 WorkBuddy 数据源，获取菜品分类列表
 */
import { get } from '@/utils/request'
import { API_PATHS, USE_MOCK } from '@/config/api.config'
import { mockCategories } from './mock-data'

/**
 * 获取分类列表
 * @returns {Promise<Array>} 分类列表
 */
export function getCategories() {
  if (USE_MOCK) {
    return Promise.resolve(mockCategories)
  }
  return get(API_PATHS.CATEGORIES)
}
