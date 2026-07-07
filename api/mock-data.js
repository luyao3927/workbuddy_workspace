/**
 * mock-data.js - Mock 数据
 * 开发阶段使用的模拟数据，对接真实 API 后切换 USE_MOCK=false 即可
 * 数据结构与 WorkBuddy 接口规范完全对齐
 * 【可配置】替换为真实数据时删除此文件即可
 */

/** Mock 分类数据 */
export const mockCategories = [
  {
    id: 'cat_01',
    name: '推荐',
    icon: 'star',
    sort: 1,
    dishCount: 6
  },
  {
    id: 'cat_02',
    name: '招牌炖菜',
    icon: 'pot',
    sort: 2,
    dishCount: 4
  },
  {
    id: 'cat_03',
    name: '时令小炒',
    icon: 'fire',
    sort: 3,
    dishCount: 5
  },
  {
    id: 'cat_04',
    name: '凉菜',
    icon: 'leaf',
    sort: 4,
    dishCount: 3
  },
  {
    id: 'cat_05',
    name: '汤羹',
    icon: 'soup',
    sort: 5,
    dishCount: 3
  },
  {
    id: 'cat_06',
    name: '主食',
    icon: 'rice',
    sort: 6,
    dishCount: 3
  },
  {
    id: 'cat_07',
    name: '饮品',
    icon: 'drink',
    sort: 7,
    dishCount: 4
  }
]

/** Mock 菜品数据 */
export const mockDishes = [
  // ========== 推荐 ==========
  {
    id: 'dish_001',
    name: '全能杂杂锅',
    categoryId: 'cat_01',
    categoryName: '推荐',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop'
    ],
    price: 6800,
    originalPrice: 7800,
    description: '私房招牌炖锅，藕丸软糯、豆腐金黄、裙带菜鲜美，一锅炖出家的味道。可以放入一切你爱的食材——响铃卷、菇类、粉丝，随心搭配。',
    specs: [
      { id: 'spec_001', name: '小份（1-2人）', priceDelta: 0 },
      { id: 'spec_002', name: '大份（3-4人）', priceDelta: 2000 }
    ],
    tags: [
      { type: 'recommend', text: '必点' },
      { type: 'signature', text: '招牌' }
    ],
    isRecommended: true,
    isOnSale: true,
    sort: 1,
    salesCount: 328
  },
  {
    id: 'dish_002',
    name: '糖醋小排',
    categoryId: 'cat_01',
    categoryName: '推荐',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop'
    ],
    price: 5800,
    originalPrice: 6800,
    description: '精选猪小排，酸甜适中，肉质酥烂，老少皆宜的经典私房菜。',
    specs: [],
    tags: [
      { type: 'recommend', text: '人气' }
    ],
    isRecommended: true,
    isOnSale: true,
    sort: 2,
    salesCount: 256
  },
  {
    id: 'dish_003',
    name: '蒜蓉生菜',
    categoryId: 'cat_01',
    categoryName: '推荐',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop'
    ],
    price: 2200,
    originalPrice: 2800,
    description: '新鲜生菜配蒜蓉清炒，简单却不失风味，清爽解腻。',
    specs: [],
    tags: [
      { type: 'new', text: '时令' }
    ],
    isRecommended: true,
    isOnSale: true,
    sort: 3,
    salesCount: 189
  },
  {
    id: 'dish_004',
    name: '麻婆豆腐',
    categoryId: 'cat_01',
    categoryName: '推荐',
    image: 'https://images.unsplash.com/photo-1582452919408-aca2b1e8bc9e?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582452919408-aca2b1e8bc9e?w=600&h=400&fit=crop'
    ],
    price: 3200,
    originalPrice: 3800,
    description: '嫩豆腐搭配秘制麻辣酱料，麻辣鲜香，下饭神器。',
    specs: [
      { id: 'spec_003', name: '微辣', priceDelta: 0 },
      { id: 'spec_004', name: '中辣', priceDelta: 0 },
      { id: 'spec_005', name: '特辣', priceDelta: 0 }
    ],
    tags: [
      { type: 'spicy', text: '辣' },
      { type: 'signature', text: '招牌' }
    ],
    isRecommended: true,
    isOnSale: true,
    sort: 4,
    salesCount: 412
  },
  {
    id: 'dish_005',
    name: '裙带菜豆腐汤',
    categoryId: 'cat_01',
    categoryName: '推荐',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 2800,
    originalPrice: 3200,
    description: '裙带菜的鲜与嫩豆腐的滑完美融合，清淡鲜美，暖心暖胃。',
    specs: [],
    tags: [
      { type: 'recommend', text: '暖胃' }
    ],
    isRecommended: true,
    isOnSale: true,
    sort: 5,
    salesCount: 175
  },
  {
    id: 'dish_006',
    name: '手作藕丸子',
    categoryId: 'cat_01',
    categoryName: '推荐',
    image: 'https://images.unsplash.com/photo-1582452919408-aca2b1e8bc9e?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582452919408-aca2b1e8bc9e?w=600&h=400&fit=crop'
    ],
    price: 3800,
    originalPrice: 4200,
    description: '纯手工制作的藕丸子，外酥里嫩，藕香四溢，每日限量。',
    specs: [],
    tags: [
      { type: 'signature', text: '手工' },
      { type: 'seasonal', text: '限量' }
    ],
    isRecommended: true,
    isOnSale: true,
    sort: 6,
    salesCount: 203
  },

  // ========== 招牌炖菜 ==========
  {
    id: 'dish_007',
    name: '红烧牛腩煲',
    categoryId: 'cat_02',
    categoryName: '招牌炖菜',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
    ],
    price: 8800,
    originalPrice: 9800,
    description: '慢炖3小时的牛腩，软烂入味，搭配土豆胡萝卜，浓郁酱香。',
    specs: [
      { id: 'spec_006', name: '小份', priceDelta: 0 },
      { id: 'spec_007', name: '大份', priceDelta: 3000 }
    ],
    tags: [
      { type: 'signature', text: '慢炖' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 1,
    salesCount: 198
  },
  {
    id: 'dish_008',
    name: '番茄炖牛腩',
    categoryId: 'cat_02',
    categoryName: '招牌炖菜',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 7800,
    originalPrice: 8800,
    description: '酸甜番茄汤底配软烂牛腩，汤浓味美，拌饭一绝。',
    specs: [],
    tags: [
      { type: 'new', text: '新品' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 2,
    salesCount: 145
  },
  {
    id: 'dish_009',
    name: '菌菇杂菌煲',
    categoryId: 'cat_02',
    categoryName: '招牌炖菜',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 5800,
    originalPrice: 6500,
    description: '多种鲜菌菇慢炖，菌香浓郁，素食者的心头好。',
    specs: [],
    tags: [
      { type: 'recommend', text: '素' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 3,
    salesCount: 112
  },
  {
    id: 'dish_010',
    name: '酸菜鱼',
    categoryId: 'cat_02',
    categoryName: '招牌炖菜',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop'
    ],
    price: 8800,
    originalPrice: 9800,
    description: '鲜活鱼片配老坛酸菜，酸辣开胃，鱼片嫩滑。',
    specs: [],
    tags: [
      { type: 'spicy', text: '酸辣' },
      { type: 'signature', text: '招牌' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 4,
    salesCount: 267
  },

  // ========== 时令小炒 ==========
  {
    id: 'dish_011',
    name: '农家小炒肉',
    categoryId: 'cat_03',
    categoryName: '时令小炒',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop'
    ],
    price: 4200,
    originalPrice: 4800,
    description: '五花肉配青椒爆炒，酱香浓郁，锅气十足。',
    specs: [],
    tags: [
      { type: 'recommend', text: '下饭' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 1,
    salesCount: 320
  },
  {
    id: 'dish_012',
    name: '干煸四季豆',
    categoryId: 'cat_03',
    categoryName: '时令小炒',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop'
    ],
    price: 2800,
    originalPrice: 3200,
    description: '四季豆干煸至表皮微焦，蒜香四溢，简单好味。',
    specs: [],
    tags: [],
    isRecommended: false,
    isOnSale: true,
    sort: 2,
    salesCount: 156
  },
  {
    id: 'dish_013',
    name: '鱼香肉丝',
    categoryId: 'cat_03',
    categoryName: '时令小炒',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
    ],
    price: 3800,
    originalPrice: 4200,
    description: '经典川味鱼香汁，酸甜微辣，肉丝嫩滑，木耳脆爽。',
    specs: [],
    tags: [
      { type: 'spicy', text: '微辣' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 3,
    salesCount: 234
  },
  {
    id: 'dish_014',
    name: '宫保鸡丁',
    categoryId: 'cat_03',
    categoryName: '时令小炒',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop'
    ],
    price: 4200,
    originalPrice: 4800,
    description: '鸡丁滑嫩、花生酥脆，甜辣交织的经典名菜。',
    specs: [],
    tags: [
      { type: 'recommend', text: '经典' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 4,
    salesCount: 289
  },
  {
    id: 'dish_015',
    name: '蒜蓉西兰花',
    categoryId: 'cat_03',
    categoryName: '时令小炒',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop'
    ],
    price: 2200,
    originalPrice: 2600,
    description: '新鲜西兰花配蒜蓉清炒，翠绿爽口，健康之选。',
    specs: [],
    tags: [
      { type: 'new', text: '时令' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 5,
    salesCount: 98
  },

  // ========== 凉菜 ==========
  {
    id: 'dish_016',
    name: '凉拌黄瓜',
    categoryId: 'cat_04',
    categoryName: '凉菜',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&h=400&fit=crop'
    ],
    price: 1600,
    originalPrice: 1800,
    description: '拍黄瓜配蒜泥醋汁，清脆爽口，开胃首选。',
    specs: [],
    tags: [],
    isRecommended: false,
    isOnSale: true,
    sort: 1,
    salesCount: 445
  },
  {
    id: 'dish_017',
    name: '皮蛋豆腐',
    categoryId: 'cat_04',
    categoryName: '凉菜',
    image: 'https://images.unsplash.com/photo-1582452919408-aca2b1e8bc9e?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582452919408-aca2b1e8bc9e?w=600&h=400&fit=crop'
    ],
    price: 1800,
    originalPrice: 2200,
    description: '嫩豆腐配松花皮蛋，淋上香油生抽，经典凉菜。',
    specs: [],
    tags: [
      { type: 'recommend', text: '经典' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 2,
    salesCount: 312
  },
  {
    id: 'dish_018',
    name: '口水鸡',
    categoryId: 'cat_04',
    categoryName: '凉菜',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
    ],
    price: 3800,
    originalPrice: 4200,
    description: '麻辣鲜香的口水鸡，红油飘香，让人停不下筷子。',
    specs: [],
    tags: [
      { type: 'spicy', text: '麻辣' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 3,
    salesCount: 198
  },

  // ========== 汤羹 ==========
  {
    id: 'dish_019',
    name: '番茄蛋花汤',
    categoryId: 'cat_05',
    categoryName: '汤羹',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 1800,
    originalPrice: 2200,
    description: '家常番茄蛋花汤，酸甜可口，简单温暖。',
    specs: [],
    tags: [],
    isRecommended: false,
    isOnSale: true,
    sort: 1,
    salesCount: 378
  },
  {
    id: 'dish_020',
    name: '酸辣汤',
    categoryId: 'cat_05',
    categoryName: '汤羹',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 2200,
    originalPrice: 2600,
    description: '酸辣开胃，豆腐丝、木耳丝、蛋花满满一碗。',
    specs: [],
    tags: [
      { type: 'spicy', text: '酸辣' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 2,
    salesCount: 245
  },
  {
    id: 'dish_021',
    name: '排骨莲藕汤',
    categoryId: 'cat_05',
    categoryName: '汤羹',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 4800,
    originalPrice: 5500,
    description: '粉藕配排骨慢炖，汤色乳白，藕香肉烂。',
    specs: [],
    tags: [
      { type: 'recommend', text: '滋补' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 3,
    salesCount: 167
  },

  // ========== 主食 ==========
  {
    id: 'dish_022',
    name: '蛋炒饭',
    categoryId: 'cat_06',
    categoryName: '主食',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
    ],
    price: 1800,
    originalPrice: 2200,
    description: '粒粒分明的蛋炒饭，简单却考验功力。',
    specs: [],
    tags: [],
    isRecommended: false,
    isOnSale: true,
    sort: 1,
    salesCount: 534
  },
  {
    id: 'dish_023',
    name: '手工水饺',
    categoryId: 'cat_06',
    categoryName: '主食',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop'
    ],
    price: 2800,
    originalPrice: 3200,
    description: '每日现包手工水饺，皮薄馅大，猪肉白菜/韭菜鸡蛋可选。',
    specs: [
      { id: 'spec_008', name: '猪肉白菜', priceDelta: 0 },
      { id: 'spec_009', name: '韭菜鸡蛋', priceDelta: 0 }
    ],
    tags: [
      { type: 'signature', text: '手工' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 2,
    salesCount: 289
  },
  {
    id: 'dish_024',
    name: '阳春面',
    categoryId: 'cat_06',
    categoryName: '主食',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop'
    ],
    price: 1200,
    originalPrice: 1500,
    description: '一碗简单的阳春面，葱花猪油酱油，朴素的美味。',
    specs: [],
    tags: [],
    isRecommended: false,
    isOnSale: true,
    sort: 3,
    salesCount: 423
  },

  // ========== 饮品 ==========
  {
    id: 'dish_025',
    name: '自制酸梅汤',
    categoryId: 'cat_07',
    categoryName: '饮品',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 1200,
    originalPrice: 1500,
    description: '古法熬制酸梅汤，酸甜解腻，冰镇更佳。',
    specs: [
      { id: 'spec_010', name: '常温', priceDelta: 0 },
      { id: 'spec_011', name: '冰镇', priceDelta: 0 }
    ],
    tags: [
      { type: 'recommend', text: '解腻' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 1,
    salesCount: 456
  },
  {
    id: 'dish_026',
    name: '桂花酒酿圆子',
    categoryId: 'cat_07',
    categoryName: '饮品',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 1600,
    originalPrice: 1800,
    description: '桂花飘香，酒酿微甜，小圆子软糯Q弹。',
    specs: [],
    tags: [
      { type: 'new', text: '甜品' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 2,
    salesCount: 234
  },
  {
    id: 'dish_027',
    name: '柠檬薄荷水',
    categoryId: 'cat_07',
    categoryName: '饮品',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 800,
    originalPrice: 1000,
    description: '新鲜柠檬配薄荷叶，清爽解暑，免费续杯。',
    specs: [],
    tags: [
      { type: 'seasonal', text: '夏日' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 3,
    salesCount: 567
  },
  {
    id: 'dish_028',
    name: '茉莉花茶',
    categoryId: 'cat_07',
    categoryName: '饮品',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop'
    ],
    price: 800,
    originalPrice: 0,
    description: '清香茉莉花茶，免费提供，可续杯。',
    specs: [],
    tags: [
      { type: 'recommend', text: '免费' }
    ],
    isRecommended: false,
    isOnSale: true,
    sort: 4,
    salesCount: 890
  }
]
