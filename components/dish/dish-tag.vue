<template>
  <!--
    dish-tag.vue - 菜品特色标签组件
    手写字体小圆角标签，不同菜品属性使用不同配色方案
    支持 recommend / new / spicy / signature / seasonal 五种类型
  -->
  <text class="dish-tag" :class="`dish-tag--${type}`">
    {{ displayText }}
  </text>
</template>

<script setup>
/**
 * 菜品特色标签组件
 * 根据 type 自动切换背景色和文字色，使用 CSS 变量适配暗黑模式
 * 默认文字由 type 决定，也可通过 text prop 自定义
 */
import { computed } from 'vue'
import { TAG_TYPES } from '@/config/constants'

defineOptions({ name: 'DishTag' })

const props = defineProps({
  /** 标签类型 */
  type: {
    type: String,
    default: TAG_TYPES.RECOMMEND,
    validator: v => Object.values(TAG_TYPES).includes(v)
  },
  /** 自定义文字，不传则使用默认映射 */
  text: {
    type: String,
    default: ''
  }
})

/** 默认文字映射 */
const defaultTextMap = {
  [TAG_TYPES.RECOMMEND]: '推荐',
  [TAG_TYPES.NEW]: '新品',
  [TAG_TYPES.SPICY]: '辣味',
  [TAG_TYPES.SIGNATURE]: '招牌',
  [TAG_TYPES.SEASONAL]: '时令'
}

/** 展示文字：优先 text prop，否则使用默认映射 */
const displayText = computed(() => {
  return props.text || defaultTextMap[props.type] || props.type
})
</script>

<style lang="scss" scoped>
/* ============================================================
 * 菜品标签 - 核心样式
 * 手写字体 + 小圆角 + 紧凑内边距
 * 五种类型使用对应的 CSS 变量配色
 * ============================================================ */

.dish-tag {
  display: inline-block;
  font-family: var(--font-handwrite);
  font-size: var(--font-size-xs);
  line-height: 1.5;
  padding: 2rpx 12rpx;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

/* ---- recommend: 暖橙背景 + 深橙文字 ---- */
.dish-tag--recommend {
  background-color: var(--tag-recommend-bg);
  color: var(--tag-recommend-text);
}

/* ---- new: 浅绿背景 + 深绿文字 ---- */
.dish-tag--new {
  background-color: var(--tag-new-bg);
  color: var(--tag-new-text);
}

/* ---- spicy: 红色系背景 + 红色文字 ---- */
.dish-tag--spicy {
  background-color: var(--tag-spicy-bg);
  color: var(--tag-spicy-text);
}

/* ---- signature: 主题色系 ---- */
.dish-tag--signature {
  background-color: var(--tag-bg);
  color: var(--tag-text);
}

/* ---- seasonal: 粉色系 ---- */
.dish-tag--seasonal {
  background-color: var(--color-highlight);
  color: #fff;
}
</style>
