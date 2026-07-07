/**
 * useAppStore.js - 应用全局状态
 * 管理：主题、系统信息、网络状态、应用就绪标志
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSystemTheme } from '@/utils/theme'

export const useAppStore = defineStore('app', () => {
  // ========== 状态 ==========

  /** 当前主题 */
  const theme = ref('light')

  /** 系统信息 */
  const systemInfo = ref(null)

  /** 网络是否在线 */
  const isOnline = ref(true)

  /** 应用是否初始化完成 */
  const appReady = ref(false)

  // ========== Actions ==========

  /**
   * 初始化应用
   * 获取系统信息、检测主题、监听网络
   */
  const initApp = () => {
    // 获取系统信息
    try {
      systemInfo.value = uni.getSystemInfoSync()
    } catch (e) {
      console.error('[AppStore] 获取系统信息失败:', e)
    }

    // 检测系统主题
    theme.value = getSystemTheme()

    // 监听网络状态变化
    uni.onNetworkStatusChange((res) => {
      isOnline.value = res.isConnected
    })

    appReady.value = true
    console.log('[AppStore] 应用初始化完成, 主题:', theme.value)
  }

  /**
   * 设置主题
   * @param {'light'|'dark'} value
   */
  const setTheme = (value) => {
    theme.value = value
  }

  /**
   * 更新网络状态
   */
  const updateOnlineStatus = () => {
    try {
      uni.getNetworkType({
        success: (res) => {
          isOnline.value = res.networkType !== 'none'
        }
      })
    } catch (e) {
      // 忽略
    }
  }

  return {
    theme,
    systemInfo,
    isOnline,
    appReady,
    initApp,
    setTheme,
    updateOnlineStatus
  }
})
