/**
 * constants.js - 全局常量定义
 * 项目级别常量，统一管理避免魔法值散落
 */

/** 购物车本地存储键名 */
export const CART_STORAGE_KEY = 'RECIPE_CART'

/** 订单历史本地存储键名 */
export const ORDER_STORAGE_KEY = 'RECIPE_ORDER_HISTORY'

/** 默认菜品图片（占位图） */
export const DEFAULT_DISH_IMAGE = '/assets/images/common/default-dish.png'

/** 页面状态枚举 */
export const PAGE_STATUS = {
  LOADING: 'loading',
  NORMAL: 'normal',
  EMPTY: 'empty',
  ERROR: 'error'
}

/** 订单状态枚举 */
export const ORDER_STATUS = {
  PENDING: 'pending',       // 待确认
  CONFIRMED: 'confirmed',   // 已确认
  PREPARING: 'preparing',   // 制作中
  COMPLETED: 'completed',   // 已完成
  CANCELLED: 'cancelled'    // 已取消
}

/** 订单状态文本映射 */
export const ORDER_STATUS_TEXT = {
  pending: '待确认',
  confirmed: '已确认',
  preparing: '制作中',
  completed: '已完成',
  cancelled: '已取消'
}

/** 标签类型常量 */
export const TAG_TYPES = {
  RECOMMEND: 'recommend',
  NEW: 'new',
  SPICY: 'spicy',
  SIGNATURE: 'signature',
  SEASONAL: 'seasonal'
}
