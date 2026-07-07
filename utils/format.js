/**
 * format.js - 格式化工具函数
 * 提供价格、日期、数量等格式化能力
 */

/**
 * 格式化价格（分 → 元）
 * @param {number} priceInCents - 价格（分）
 * @param {boolean} [showSymbol=true] - 是否显示 ¥ 符号
 * @returns {string} 格式化后的价格字符串
 */
export function formatPrice(priceInCents, showSymbol = true) {
  if (priceInCents == null || isNaN(priceInCents)) return '--'
  const yuan = (priceInCents / 100).toFixed(priceInCents % 100 === 0 ? 0 : 2)
  return showSymbol ? `¥${yuan}` : yuan
}

/**
 * 格式化价格（元 → 元），直接传入元
 * @param {number} priceInYuan
 * @param {boolean} [showSymbol=true]
 * @returns {string}
 */
export function formatPriceYuan(priceInYuan, showSymbol = true) {
  if (priceInYuan == null || isNaN(priceInYuan)) return '--'
  const fixed = Number(priceInYuan).toFixed(Number.isInteger(priceInYuan) ? 0 : 2)
  return showSymbol ? `¥${fixed}` : fixed
}

/**
 * 格式化日期
 * @param {string|number|Date} date - 日期
 * @param {string} [format='YYYY-MM-DD HH:mm'] - 格式
 * @returns {string}
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm') {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const map = {
    YYYY: d.getFullYear(),
    MM: String(d.getMonth() + 1).padStart(2, '0'),
    DD: String(d.getDate()).padStart(2, '0'),
    HH: String(d.getHours()).padStart(2, '0'),
    mm: String(d.getMinutes()).padStart(2, '0'),
    ss: String(d.getSeconds()).padStart(2, '0')
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => map[match])
}

/**
 * 格式化订单编号（截取显示）
 * @param {string} orderId - 完整订单编号
 * @param {number} [len=8] - 显示长度
 * @returns {string}
 */
export function formatOrderId(orderId, len = 8) {
  if (!orderId) return ''
  return orderId.length > len ? orderId.slice(-len) : orderId
}

/**
 * 格式化数量显示（购物车角标）
 * @param {number} count
 * @returns {string}
 */
export function formatCount(count) {
  if (count <= 0) return '0'
  if (count > 99) return '99+'
  return String(count)
}
