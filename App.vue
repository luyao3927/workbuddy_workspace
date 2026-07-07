<script>
/**
 * App.vue - 应用根组件
 * 负责：全局主题初始化、系统信息获取、网络状态监听
 */
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useAppStore } from '@/stores/useAppStore'

export default {
  setup() {
    const appStore = useAppStore()

    onLaunch(() => {
      console.log('[App] 应用启动')
      appStore.initApp()
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
