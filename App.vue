<script>
/**
 * App.vue - 应用根组件
 * 负责：全局主题初始化、系统信息获取、网络状态监听
 */
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useAppStore } from '@/stores/useAppStore'
import { useCartStore } from '@/stores/useCartStore'

export default {
  setup() {
    const appStore = useAppStore()
    const cartStore = useCartStore()

    onLaunch(() => {
      console.log('[App] 应用启动')
      appStore.initApp()
      // 应用启动时从本地存储恢复购物车数据
      cartStore.loadFromStorage()
    })

    onShow(() => {
      console.log('[App] 应用显示')
      // 更新网络状态
      appStore.updateOnlineStatus()
    })

    onHide(() => {
      console.log('[App] 应用隐藏')
    })
  }
}
</script>

<style lang="scss">
/* 引入全局样式 */
@import '@/styles/variables.scss';
@import '@/styles/theme-dark.scss';
@import '@/styles/reset.scss';
@import '@/styles/fonts.scss';
@import '@/styles/collage.scss';
@import '@/styles/mixins.scss';
@import '@/styles/global.scss';
</style>
