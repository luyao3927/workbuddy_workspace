/**
 * useTheme.js - 暗黑模式主题管理
 * 自动检测系统主题、支持主题切换、提供主题相关计算
 */
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/useAppStore'
import { getSystemTheme, getStatusBarHeight } from '@/utils/theme'

export function useTheme() {
  const appStore = useAppStore()
  const theme = ref('light')
  const statusBarHeight = ref(44)

  /**
   * 初始化主题
   * 检测系统主题并同步到 Store
   */
  const initTheme = () => {
    const sysTheme = getSystemTheme()
    theme.value = sysTheme
    appStore.setTheme(sysTheme)

    // 获取状态栏高度
    statusBarHeight.value = getStatusBarHeight()

    // #ifdef MP-WEIXIN
    // 监听系统主题切换
    if (wx.onThemeChange) {
      wx.onThemeChange((res) => {
        theme.value = res.theme
        appStore.setTheme(res.theme)
      })
    }
    // #endif
  }

  /** 是否为暗黑模式 */
  const isDark = computed(() => theme.value === 'dark')

  /** 导航栏总高度（状态栏 + 导航栏内容） */
  const navBarHeight = computed(() => statusBarHeight.value + 44)

  /** 安全区域顶部间距 */
  const safeAreaTop = computed(() => statusBarHeight.value)

  return {
    theme,
    isDark,
    statusBarHeight,
    navBarHeight,
    safeAreaTop,
    initTheme
  }
}
