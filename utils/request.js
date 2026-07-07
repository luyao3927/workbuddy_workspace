/**
 * request.js - HTTP 请求封装
 * 基于 uni.request，提供统一的请求拦截、响应拦截、错误处理
 * 零第三方依赖，极致轻量
 */

import { API_BASE_URL, API_TIMEOUT } from '@/config/api.config'

/**
 * 请求拦截器 - 添加通用请求头、Token 等
 * @param {Object} options - 请求配置
 * @returns {Object} 处理后的请求配置
 */
function requestInterceptor(options) {
  // 拼接完整 URL（如果 baseUrl 已包含 /api 前缀则直接拼接）
  if (!options.url.startsWith('http')) {
    const baseUrl = API_BASE_URL.replace(/\/$/, '')
    const path = options.url.startsWith('/') ? options.url : '/' + options.url
    options.url = baseUrl + path
  }

  // 设置默认请求头
  options.header = {
    'Content-Type': 'application/json',
    ...options.header
  }

  // 【可配置】预留 Token 注入位置
  // const token = uni.getStorageSync('token')
  // if (token) {
  //   options.header['Authorization'] = `Bearer ${token}`
  // }

  return options
}

/**
 * 响应拦截器 - 统一处理响应数据、错误码
 * @param {Object} response - 响应数据
 * @param {Object} config - 原始请求配置
 * @returns {Promise} 处理后的数据或错误
 */
function responseInterceptor(response, config) {
  const { statusCode, data } = response

  // HTTP 状态码判断
  if (statusCode >= 200 && statusCode < 300) {
    // 业务状态码判断（可根据实际 API 调整）
    if (data && data.code === 0) {
      return Promise.resolve(data.data)
    }
    // 直接返回数据（兼容不同 API 格式）
    return Promise.resolve(data)
  }

  // 401 未授权（预留）
  if (statusCode === 401) {
    uni.showToast({ title: '登录已过期', icon: 'none' })
    return Promise.reject(new Error('UNAUTHORIZED'))
  }

  // 其他错误
  const message = (data && data.message) || `请求失败 (${statusCode})`
  return Promise.reject(new Error(message))
}

/**
 * 发起 HTTP 请求
 * @param {Object} options - 请求配置
 * @param {string} options.url - 请求地址
 * @param {string} [options.method='GET'] - 请求方法
 * @param {Object} [options.data] - 请求数据
 * @param {Object} [options.header] - 请求头
 * @param {boolean} [options.showLoading=false] - 是否显示 loading
 * @param {string} [options.loadingText='加载中...'] - loading 文案
 * @param {number} [options.timeout] - 超时时间（ms）
 * @returns {Promise}
 */
export function request(options = {}) {
  // 请求前拦截
  const config = requestInterceptor({
    method: 'GET',
    timeout: API_TIMEOUT,
    ...options
  })

  // 显示 loading
  if (config.showLoading) {
    uni.showLoading({
      title: config.loadingText || '加载中...',
      mask: true
    })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success: (res) => {
        responseInterceptor(res, config)
          .then(resolve)
          .catch(reject)
      },
      fail: (err) => {
        console.error('[Request] 网络请求失败:', err)
        uni.showToast({
          title: '网络异常，请稍后重试',
          icon: 'none',
          duration: 2000
        })
        reject(err)
      },
      complete: () => {
        if (config.showLoading) {
          uni.hideLoading()
        }
      }
    })
  })
}

/**
 * GET 请求快捷方法
 */
export function get(url, data = {}, options = {}) {
  return request({ ...options, url, method: 'GET', data })
}

/**
 * POST 请求快捷方法
 */
export function post(url, data = {}, options = {}) {
  return request({ ...options, url, method: 'POST', data })
}
