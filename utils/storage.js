/**
 * storage.js - 本地存储封装
 * 基于 uni.storage API，提供类型安全的读写操作
 * 统一管理 storage key，避免散落各处
 */

/** 存储键名常量 - 统一管理，避免冲突 */
export const STORAGE_KEYS = {
  CART: 'RECIPE_CART',
  THEME: 'RECIPE_THEME',
  ORDER_HISTORY: 'RECIPE_ORDER_HISTORY',
  USER_PREF: 'RECIPE_USER_PREF'
}

/**
 * 同步读取存储
 * @param {string} key - 存储键名
 * @param {*} [defaultValue=null] - 默认值
 * @returns {*}
 */
export function getStorageSync(key, defaultValue = null) {
  try {
    const value = uni.getStorageSync(key)
    return value !== '' && value !== undefined ? value : defaultValue
  } catch (e) {
    console.error(`[Storage] 读取失败 (${key}):`, e)
    return defaultValue
  }
}

/**
 * 同步写入存储
 * @param {string} key - 存储键名
 * @param {*} data - 要存储的数据
 * @returns {boolean} 是否成功
 */
export function setStorageSync(key, data) {
  try {
    uni.setStorageSync(key, data)
    return true
  } catch (e) {
    console.error(`[Storage] 写入失败 (${key}):`, e)
    return false
  }
}

/**
 * 同步删除存储
 * @param {string} key - 存储键名
 * @returns {boolean}
 */
export function removeStorageSync(key) {
  try {
    uni.removeStorageSync(key)
    return true
  } catch (e) {
    console.error(`[Storage] 删除失败 (${key}):`, e)
    return false
  }
}

/**
 * JSON 格式读取存储（自动序列化/反序列化）
 * @param {string} key
 * @param {*} [defaultValue=null]
 * @returns {*}
 */
export function getJSONSync(key, defaultValue = null) {
  try {
    const raw = uni.getStorageSync(key)
    if (!raw || raw === '') return defaultValue
    return JSON.parse(raw)
  } catch (e) {
    console.error(`[Storage] JSON 解析失败 (${key}):`, e)
    return defaultValue
  }
}

/**
 * JSON 格式写入存储
 * @param {string} key
 * @param {*} data
 * @returns {boolean}
 */
export function setJSONSync(key, data) {
  try {
    uni.setStorageSync(key, JSON.stringify(data))
    return true
  } catch (e) {
    console.error(`[Storage] JSON 写入失败 (${key}):`, e)
    return false
  }
}
