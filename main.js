/**
 * main.js - 应用入口文件
 * 负责：创建 Vue 应用、注册 Pinia、注册全局组件
 */
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 创建 Pinia 实例
const pinia = createPinia()

/**
 * 导出 createApp 函数（uni-app 约定）
 * 返回 app 实例供 uni-app 框架使用
 */
export function createApp() {
  const app = createSSRApp(App)

  // 注册 Pinia 状态管理
  app.use(pinia)

  // ========== 全局注册通用基础组件 ==========
  // 组件通过 easycom 自动按需引入（pages.json 中配置）
  // 无需手动 import，以下仅注册需要全局使用的组件

  return {
    app
  }
}
