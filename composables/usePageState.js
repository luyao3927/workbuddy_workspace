/**
 * usePageState.js - 页面状态管理（loading / empty / error）
 * 为页面提供统一的三态切换逻辑
 */
import { ref, computed } from 'vue'
import { PAGE_STATUS } from '@/config/constants'

export function usePageState() {
  /** 当前页面状态 */
  const pageStatus = ref(PAGE_STATUS.LOADING)

  /** 错误信息 */
  const errorMessage = ref('')

  /** 是否正在加载 */
  const isLoading = computed(() => pageStatus.value === PAGE_STATUS.LOADING)

  /** 是否为空 */
  const isEmpty = computed(() => pageStatus.value === PAGE_STATUS.EMPTY)

  /** 是否出错 */
  const isError = computed(() => pageStatus.value === PAGE_STATUS.ERROR)

  /** 是否正常 */
  const isNormal = computed(() => pageStatus.value === PAGE_STATUS.NORMAL)

  /**
   * 设置为加载状态
   */
  const setLoading = () => {
    pageStatus.value = PAGE_STATUS.LOADING
    errorMessage.value = ''
  }

  /**
   * 设置为正常状态
   */
  const setNormal = () => {
    pageStatus.value = PAGE_STATUS.NORMAL
    errorMessage.value = ''
  }

  /**
   * 设置为空状态
   * @param {string} [msg='暂无数据'] - 空状态提示文案
   */
  const setEmpty = (msg = '暂无数据') => {
    pageStatus.value = PAGE_STATUS.EMPTY
    errorMessage.value = msg
  }

  /**
   * 设置为错误状态
   * @param {string} msg - 错误信息
   */
  const setError = (msg = '加载失败，请重试') => {
    pageStatus.value = PAGE_STATUS.ERROR
    errorMessage.value = msg
  }

  /**
   * 根据数据自动判断状态
   * @param {Array|Object|null} data - 数据
   * @param {boolean} isError - 是否出错
   */
  const resolveStatus = (data, isError = false) => {
    if (isError) {
      setError()
      return
    }
    if (!data || (Array.isArray(data) && data.length === 0)) {
      setEmpty()
      return
    }
    setNormal()
  }

  return {
    pageStatus,
    errorMessage,
    isLoading,
    isEmpty,
    isError,
    isNormal,
    setLoading,
    setNormal,
    setEmpty,
    setError,
    resolveStatus
  }
}
