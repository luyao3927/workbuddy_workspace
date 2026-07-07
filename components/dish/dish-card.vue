<template>
  <!--
    dish-card.vue ★核心组件 - 手帐风格菜品卡片
    手帐拼贴风格：纸质背景 + 胶带装饰 + 贴纸 + 相框图片 + 手写字体
    使用 collage-paper / collage-tape / collage-sticker / collage-frame 组合
  -->
  <view
    class="dish-card"
    :class="{ 'dish-card--active': isPressed }"
    :style="cardRotationStyle"
    @tap="handleClick"
    @touchstart="isPressed = true"
    @touchend="isPressed = false"
    @touchcancel="isPressed = false"
  >
    <!-- 纸质纹理背景容器 -->
    <collage-paper variant="plain" padding="sm">
      <!-- 顶部胶带装饰，根据 index % 4 循环颜色 -->
      <collage-tape
        :color="tapeColor"
        :width="100"
        :angle="tapeAngle"
        top="-8rpx"
        left="50%"
        position="absolute"
      />

      <!-- 菜品图片区域 -->
      <view class="dish-card__image-wrap">
        <collage-frame variant="photo" :rotation="imageRotation">
          <app-image
            class="dish-card__image"
            :src="dish.image"
            mode="aspectFill"
            :lazy-load="true"
          />
        </collage-frame>

        <!-- 图片右下角贴纸装饰 -->
        <collage-sticker
          :type="stickerType"
          :color="stickerColor"
          :size="36"
          top="auto"
          left="auto"
        />
      </view>

      <!-- 菜品信息区域 -->
      <view class="dish-card__info">
        <!-- 菜品名称：手写字体，可能轻微旋转 -->
        <text class="dish-card__name" :style="nameStyle">
          {{ dish.name }}
        </text>

        <!-- 描述文字（如有） -->
        <text v-if="dish.description" class="dish-card__desc">
          {{ dish.description }}
        </text>

        <!-- 标签区域 -->
        <view v-if="dish.tags && dish.tags.length" class="dish-card__tags">
          <dish-tag
            v-for="tag in dish.tags"
            :key="tag"
            :type="tag"
          />
        </view>

        <!-- 价格区域 -->
        <view class="dish-card__price-row">
          <dish-price
            :price="dish.price"
            :original-price="dish.originalPrice || 0"
            size="md"
          />
          <!-- 特价标识 -->
          <text v-if="dish.isOnSale" class="dish-card__sale-badge">特价</text>
        </view>
      </view>
    </collage-paper>
  </view>
</template>

<script setup>
/**
 * 手帐风格菜品卡片 - 核心视觉组件
 *
 * 设计要点：
 * - 外层使用 collage-paper 提供纸质纹理背景
 * - 顶部 collage-tape 胶带模拟手工粘贴
 * - 图片区域 collage-frame(photo) + 不规则圆角
 * - 右下角 collage-sticker 趣味贴纸
 * - 菜品名称手写字体，轻微旋转
 * - 整体卡片根据 index 奇偶做微小旋转（-0.8deg / 1.2deg）
 * - 暗黑模式自适应
 */
import { computed, ref } from 'vue'
import { TAG_TYPES } from '@/config/constants'

defineOptions({ name: 'DishCard' })

const props = defineProps({
  /** 菜品数据对象 */
  dish: {
    type: Object,
    required: true
  },
  /** 列表索引，用于交替旋转和装饰颜色 */
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['click'])

/** 按压状态，用于点击反馈 */
const isPressed = ref(false)

/** 胶带颜色：根据 index % 4 循环使用 cream/mint/pink/blue */
const tapeColors = ['cream', 'mint', 'pink', 'blue']
const tapeColor = computed(() => tapeColors[props.index % 4])

/** 胶带旋转角度：根据 index 微调，模拟手工粘贴的随意感 */
const tapeAngle = computed(() => {
  const angles = [-5, 3, -4, 6]
  return angles[props.index % 4]
})

/** 卡片整体旋转：奇数 -0.8deg，偶数 1.2deg */
const cardRotationStyle = computed(() => {
  const angle = props.index % 2 === 0 ? 1.2 : -0.8
  return { transform: `rotate(${angle}deg)` }
})

/** 图片区域微旋转 */
const imageRotation = computed(() => {
  return props.index % 3 === 0 ? -1 : props.index % 3 === 1 ? 1.5 : -2
})

/** 贴纸类型：根据 index % 3 循环 */
const stickerTypes = ['circle', 'star', 'heart']
const stickerType = computed(() => stickerTypes[props.index % 3])

/** 贴纸颜色：循环使用 accent / primary / highlight */
const stickerColors = ['accent', 'primary', 'highlight']
const stickerColor = computed(() => stickerColors[props.index % 3])

/** 名称轻微旋转样式 */
const nameStyle = computed(() => {
  const angles = [-1, 0.5, -0.5, 1]
  return { transform: `rotate(${angles[props.index % 4]}deg)` }
})

/** 点击事件 */
function handleClick() {
  emit('click', props.dish)
}
</script>

<style lang="scss" scoped>
/* ============================================================
 * 菜品卡片 - 手帐拼贴风格样式
 * ============================================================ */

.dish-card {
  position: relative;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);

  /* 点击反馈 */
  &:active,
  &.dish-card--active {
    transform: scale(0.97) !important;
  }
}

/* ---- 图片区域 ---- */
.dish-card__image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  margin-bottom: var(--spacing-sm);

  /* 让 collage-frame 填满容器 */
  :deep(.collage-frame) {
    width: 100%;
    height: 100%;
  }

  /* 贴纸定位到右下角 */
  :deep(.collage-sticker) {
    position: absolute;
    bottom: -8rpx;
    right: -8rpx;
    z-index: 2;
  }
}

.dish-card__image {
  width: 100%;
  height: 100%;
}

/* ---- 胶带居中 ---- */
:deep(.collage-tape) {
  transform: translateX(-50%) !important;
}

/* ---- 菜品信息 ---- */
.dish-card__info {
  padding: var(--spacing-xs) 0;
}

/* 菜品名称：手写字体 */
.dish-card__name {
  display: block;
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-md);
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: var(--spacing-xs);

  /* 单行截断 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 描述文字 */
.dish-card__desc {
  display: block;
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  line-height: 1.4;
  margin-bottom: var(--spacing-xs);

  /* 最多两行 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 标签区域 */
.dish-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

/* 价格行 */
.dish-card__price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 特价徽章 */
.dish-card__sale-badge {
  font-family: var(--font-handwrite);
  font-size: var(--font-size-xs);
  color: var(--text-price);
  background-color: var(--tag-recommend-bg);
  padding: 2rpx 10rpx;
  border-radius: var(--radius-sm);
  border: 1rpx dashed var(--text-price);
}
</style>
