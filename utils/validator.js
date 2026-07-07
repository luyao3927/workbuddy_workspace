/**
 * validator.js - 校验工具
 * 提供表单验证、数据合法性检查
 */

/**
 * 校验手机号
 * @param {string} phone
 * @returns {boolean}
 */
export function isPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 校验是否为空
 * @param {*} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}

/**
 * 校验是否为有效数字
 * @param {*} value
 * @returns {boolean}
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * 校验购物车数据完整性
 * @param {Object} item - 购物车项
 * @returns {{ valid: boolean, message: string }}
 */
export function validateCartItem(item) {
  if (!item) return { valid: false, message: '数据为空' }
  if (!item.dishId) return { valid: false, message: '菜品 ID 缺失' }
  if (!item.name) return { valid: false, message: '菜品名称缺失' }
  if (!isNumber(item.price) || item.price < 0) return { valid: false, message: '价格异常' }
  if (!isNumber(item.quantity) || item.quantity < 1) return { valid: false, message: '数量异常' }
  return { valid: true, message: '' }
}
