<!--
  菜品详情页 — pages/dish-detail/index.vue
  功能：大图展示 + 菜品信息 + 规格选择 + 加购操作 + 手帐风格装饰
-->
<template>
  <view class="page-dish-detail" :class="{ 'collage-paper-bg': true }">
    <!-- 导航栏 -->
    <app-nav-bar show-back @back="handleBack" />

    <!-- 加载状态 -->
    <app-loading v-if="loading" type="detail" :rows="5" />

    <!-- 错误状态 -->
    <app-error
      v-else-if="error"
      :message="error"
      show-retry
      @retry="fetchDishDetail(currentDish?.id || dishId)"
    />

    <!-- 正常内容 -->
    <template v-else-if="currentDish">
      <scroll-view scroll-y class="detail-scroll">
        <!-- 大图区 -->
        <view class="image-section">
          <collage-frame variant="photo" :rotation="0.5">
            <app-image
              :src="currentDish.image"
              mode="widthFix"
              class="dish-image"
            />
          </collage-frame>
          <!-- 装饰胶带 -->
          <collage-tape
            color="var(--color-highlight)"
            :angle="-5"
            width="60rpx"
            top="10rpx"
            left="8%"
          />
          <collage-tape
            color="var(--color-accent)"
            :angle="3"
            width="50rpx"
            top="15rpx"
            right="10%"
          />
        </view>

        <!-- 菜品信息区 -->
        <view class="info-section">
          <collage-paper variant="default" :rotation="-1" padding="var(--spacing-lg)">
            <!-- 名称 + 标签 -->
            <view class="dish-header">
              <text class="dish-name">{{ currentDish.name }}</text>
              <view class="dish-tags">
                <dish-tag
                  v-for="tag in currentDish.tags"
                  :key="tag"
                  :text="tag"
                  type="primary"
                />
              </view>
            </view>

            <!-- 标签装饰 -->
            <collage-label
              :text="currentDish.categoryName || '私房菜'"
              color="var(--color-primary)"
              size="sm"
              :rotation="-2"
            />

            <!-- 价格 -->
            <view class="dish-price-row">
              <dish-price
                :price="currentDish.price"
                :original-price="currentDish.originalPrice"
                size="lg"
              />
            </view>

            <!-- 描述 -->
            <view class="dish-desc">
              <text class="desc-text">{{ currentDish.description }}</text>
            </view>

            <!-- 装饰贴纸 -->
            <collage-sticker
              type="star"
              color="var(--color-accent)"
              size="40rpx"
              top="-15rpx"
              left="-10rpx"
            />
          </collage-paper>
        </view>

        <!-- 规格选择区 -->
        <view v-if="currentDish.specs && currentDish.specs.length > 0" class="spec-section">
          <view class="spec-label">选择规格</view>
          <view class="spec-trigger" @click="showSpecSelector = true">
            <text class="spec-value">{{ selectedSpecText }}</text>
            <text class="spec-arrow">›</text>
          </view>
        </view>

        <!-- 装饰贴纸散布 -->
        <collage-sticker
          type="heart"
          color="var(--color-highlight)"
          size="36rpx"
          top="60%"
          right="5%"
        />
        <collage-sticker
          type="star"
          color="var(--color-primary)"
          size="32rpx"
          top="30%"
          left="3%"
        />

        <!-- 底部安全区占位 -->
        <view class="safe-bottom" />
      </scroll-view>

      <!-- 底部操作栏 -->
      <view class="bottom-bar">
        <dish-quantity
          v-model="quantity"
          :min="1"
          :max="99"
          size="md"
        />
        <button class="add-btn" @click="handleAddToCart">
          加入菜篮
        </button>
      </view>
    </template>

    <!-- 规格选择弹窗 -->
    <dish-spec-selector
      v-if="currentDish?.specs?.length"
      v-model="selectedSpec"
      :specs="currentDish.specs"
      :visible="showSpecSelector"
      @update:model-value="showSpecSelector = false"
      @close="showSpecSelector = false"
    />
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useDish } from '@/composables/useDish'
import { useCart } from '@/composables/useCart'
import { useTheme } from '@/composables/useTheme'

const dishId = ref('')
const quantity = ref(1)
const showSpecSelector = ref(false)
const selectedSpec = ref('')

const { currentDish, loading, error, fetchDishDetail } = useDish()
const { addToCart } = useCart()
const { initTheme } = useTheme()

// 当前选中的规格文本
const selectedSpecText = computed(() => {
  if (!currentDish.value?.specs?.length) return '默认'
  if (!selectedSpec.value) return '请选择规格'
  const spec = currentDish.value.specs.find(s => s.id === selectedSpec.value)
  return spec ? spec.name : '请选择规格'
})

// 页面加载
onLoad((options) => {
  initTheme()
  dishId.value = options.dishId
  if (dishId.value) {
    fetchDishDetail(dishId.value)
  }
})

// 加入购物车
function handleAddToCart() {
  if (!currentDish.value) return

  if (currentDish.value.specs?.length && !selectedSpec.value) {
    showSpecSelector.value = true
    return
  }

  addToCart(currentDish.value.id, quantity.value, selectedSpec.value)
  uni.showToast({
    title: '已加入菜篮',
    icon: 'success',
    duration: 1500
  })
  quantity.value = 1
}

// 返回
function handleBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.page-dish-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-primary);
}

.collage-paper-bg {
  background-image: radial-gradient(
    circle at 80% 20%,
    var(--bg-highlight) 1px,
    transparent 1px
  );
  background-size: 40rpx 40rpx;
}

.detail-scroll {
  flex: 1;
  overflow: hidden;
}

// 大图区
.image-section {
  position: relative;
  padding: var(--spacing-md);
  display: flex;
  justify-content: center;

  .dish-image {
    width: 100%;
    border-radius: var(--radius-md);
  }
}

// 菜品信息区
.info-section {
  position: relative;
  padding: 0 var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.dish-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.dish-name {
  font-family: var(--font-handwrite-bold);
  font-size: var(--font-size-xxl);
  color: var(--text-primary);
  flex: 1;
}

.dish-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.dish-price-row {
  margin: var(--spacing-md) 0;
}

.dish-desc {
  padding: var(--spacing-sm) 0;

  .desc-text {
    font-family: var(--font-handwrite);
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    line-height: 1.8;
  }
}

// 规格选择区
.spec-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  margin: 0 var(--spacing-md) var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);

  .spec-label {
    font-size: var(--font-size-md);
    color: var(--text-primary);
    font-weight: 500;
  }

  .spec-trigger {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    .spec-value {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .spec-arrow {
      font-size: var(--font-size-lg);
      color: var(--text-muted);
    }
  }
}

// 底部操作栏
.bottom-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-md);
  padding-bottom: calc(var(--spacing-sm) + env(safe-area-inset-bottom));
  background: var(--bg-card);
  border-top: 1rpx solid var(--divider-color);
  box-shadow: var(--shadow-md);

  .add-btn {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    background: var(--color-primary);
    color: #fff;
    font-size: var(--font-size-md);
    font-family: var(--font-handwrite-bold);
    border: none;
    border-radius: var(--radius-lg);
    transition: opacity var(--transition-normal);

    &:active {
      opacity: 0.85;
    }
  }
}

// 底部安全区
.safe-bottom {
  height: calc(var(--spacing-xxl) + 100rpx);
}
</style>
