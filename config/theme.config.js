/**
 * theme.config.js - 主题色板配置
 * 【可配置】修改品牌色、手帐配色等视觉风格
 * 色值与 styles/variables.scss 和 theme-dark.scss 保持同步
 */

/** 亮色主题色板 */
export const LIGHT_THEME = {
  // 背景
  bgPrimary: '#F5F0E8',
  bgCard: '#FAF7F2',

  // 主色调（对标喜茶绿）
  primary: '#5B8C5A',
  primaryLight: '#A8D5A8',
  primaryBg: '#E8F5E8',

  // 辅助色
  accent: '#E8A87C',      // 蜜桃橙
  highlight: '#D4A5A5',   // 樱花粉

  // 文字
  textPrimary: '#3D3D3D',
  textSecondary: '#8C8C8C',
  textPrice: '#E87461',

  // 标签
  tagRecommendBg: '#FDE8E0',
  tagRecommendText: '#D4785C',
  tagNewBg: '#E0F0E8',
  tagNewText: '#5B8C5A',

  // 胶带颜色
  tapeCream: 'rgba(255, 235, 190, 0.70)',
  tapeMint: 'rgba(180, 220, 200, 0.65)',
  tapePink: 'rgba(255, 200, 210, 0.65)',
  tapeBlue: 'rgba(190, 210, 235, 0.65)'
}

/** 暗黑主题色板 */
export const DARK_THEME = {
  bgPrimary: '#1A1A2E',
  bgCard: '#252540',

  primary: '#7ECB7E',
  primaryLight: '#4A7A4A',
  primaryBg: '#2A3A2A',

  accent: '#F0A878',
  highlight: '#C49090',

  textPrimary: '#E8E8E8',
  textSecondary: '#9A9A9A',
  textPrice: '#FF8A80',

  tagRecommendBg: '#4A3030',
  tagRecommendText: '#F0A090',
  tagNewBg: '#2A4030',
  tagNewText: '#80C080',

  tapeCream: 'rgba(100, 85, 65, 0.40)',
  tapeMint: 'rgba(70, 90, 80, 0.40)',
  tapePink: 'rgba(90, 70, 75, 0.40)',
  tapeBlue: 'rgba(65, 75, 95, 0.40)'
}

/** 胶带颜色列表（用于随机选择） */
export const TAPE_COLORS = ['cream', 'mint', 'pink', 'blue']

/** 标签类型映射 */
export const TAG_TYPE_MAP = {
  recommend: { label: '推荐', color: 'recommend' },
  new: { label: '新品', color: 'new' },
  spicy: { label: '辣', color: 'spicy' },
  signature: { label: '招牌', color: 'signature' },
  seasonal: { label: '时令', color: 'seasonal' }
}
