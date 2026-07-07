/**
 * theme.js - 主题切换工具
 * 提供暗黑模式检测、手动切换等能力
 */

/**
 * 检测当前系统主题
 * @returns {'light'|'dark'}
 */
export function getSystemTheme() {
  try {
    const sysInfo = uni.getSystemInfoSync()
    return sysInfo.theme || 'light'
  } catch (e) {
    return 'light'
  }
}

/**
 * 检测是否为暗黑模式
 * @returns {boolean}
 */
export function isDarkMode() {
  return getSystemTheme() === 'dark'
}

/**
 * 获取状态栏高度
 * @returns {number}
 */
export function getStatusBarHeight() {
  try {
    const sysInfo = uni.getSystemInfoSync()
    return sysInfo.statusBarHeight || 44
  } catch (e) {
    return 44
  }
}

/**
 * 获取导航栏内容高度（状态栏以下区域）
 * @returns {number}
 */
export function getNavContentHeight() {
  // 微信小程序胶囊按钮信息
  // #ifdef MP-WEIXIN
  try {
    const menuInfo = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = getStatusBarHeight()
    const navHeight = (menuInfo.top - statusBarHeight) * 2 + menuInfo.height
    return navHeight
  } catch (e) {
    return 44
  }
  // #endif
  return 44
}
