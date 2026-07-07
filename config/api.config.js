/**
 * api.config.js - API 基础配置
 * 【可配置】切换门店或环境时修改此文件即可
 */

/**
 * 【可配置】API 基础地址
 * 开发环境：本地后端服务地址
 * 生产环境：替换为实际服务器地址（需 HTTPS）
 */
export const API_BASE_URL = 'http://localhost:3001/api'

/** API 版本前缀（预留） */
export const API_PREFIX = ''

/** 请求超时时间（毫秒） */
export const API_TIMEOUT = 15000

/**
 * 【可配置】是否启用 Mock 数据
 * false = 使用后端 API 服务（需先启动 server/）
 * true  = 使用本地 mock 数据（无需后端）
 */
export const USE_MOCK = true

/** 接口路径常量 */
export const API_PATHS = {
  // 分类
  CATEGORIES: '/categories',
  // 菜品
  DISHES: '/dishes',
  DISH_RECOMMENDED: '/dishes/recommended',
  DISH_DETAIL: '/dishes/{id}',
  // 订单
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/{id}'
}
