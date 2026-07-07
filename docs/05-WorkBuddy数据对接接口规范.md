# 私房菜馆电子菜谱自助点餐模板 — WorkBuddy 数据对接接口规范

## 文档信息

| 项目       | 内容                          |
| ---------- | ----------------------------- |
| 项目名称   | 私房菜馆电子菜谱自��点餐模板    |
| 文档版本   | v1.0.0                        |
| 编制日期   | 2026-07-06                    |
| 编制单位   | WorkBuddy 交付团队            |
| 文档密级   | 内部                          |

---

## 一、接口概述

### 1.1 基础信息

| 项目           | 说明                                         |
| -------------- | -------------------------------------------- |
| Base URL       | `https://api.workbuddy.cn/v1` (示例)          |
| 协议           | HTTPS                                        |
| 请求格式       | JSON                                         |
| 响应格式       | JSON                                         |
| 字符编码       | UTF-8                                        |
| 认证方式       | 无认证（小程序端，通过门店标识区分）         |

### 1.2 请求头规范

```http
POST /v1/orders HTTP/1.1
Host: api.workbuddy.cn
Content-Type: application/json; charset=utf-8
X-Store-Id: store_001        // 门店标识（用于区分不同门店）
X-Table-No: A12              // 桌号（选填，扫码点餐时传入）
```

### 1.3 通用响应格式

#### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": { /* 具体数据 */ },
  "timestamp": 1750262400000
}
```

#### 列表响应（含分页）

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [ /* 数据列表 */ ],
    "total": 100,
    "page": 1,
    "pageSize": 20
  },
  "timestamp": 1750262400000
}
```

#### 错误响应

```json
{
  "code": 10001,
  "message": "参数错误：缺少必填字段 categoryId",
  "data": null,
  "timestamp": 1750262400000
}
```

### 1.4 响应字段说明

| 字段      | 类型             | 说明                               |
| --------- | ---------------- | ---------------------------------- |
| code      | number           | 业务状态码，0 表示成功             |
| message   | string           | 状态描述信息                       |
| data      | object / array / null | 响应数据，根据接口不同而变化   |
| timestamp | number           | 服务器响应时间戳（毫秒）           |

---

## 二、数据模型完整定义

### 2.1 分类 (Category)

```typescript
interface Category {
  id: string;          // 分类唯一标识，如 "cat_001"
  name: string;        // 分类名称，如 "招牌推荐"
  icon: string;        // 分类图标 URL
  sort: number;        // 排序序号，数值越小越靠前
  dishCount: number;   // 该分类下的菜品数量
}
```

### 2.2 菜品 (Dish)

```typescript
interface Dish {
  id: string;           // 菜品唯一标识，如 "dish_001"
  name: string;         // 菜品名称
  categoryId: string;   // 所属分类 ID
  image: string;        // 菜品主图 URL（列表展示用）
  images: string[];     // 菜品多图 URL 数组（详情页轮播用）
  price: number;        // 当前价格（单位：分），如 8800 表示 88.00 元
  originalPrice: number; // 原价（单位：分），用于展示折扣
  description: string;  // 菜品描述文案
  specs: DishSpec[];    // 规格列表
  tags: DishTag[];      // 标签列表
  isRecommended: boolean; // 是否为推荐菜品
  isOnSale: boolean;    // 是否在售
  sort: number;         // 排序序号
}

interface DishSpec {
  id: string;           // 规格唯一标识，如 "spec_001"
  name: string;         // 规格名称，如 "大份"、"微辣"
  priceDelta: number;   // 价格变动（单位：分），可为正、负或 0
}

interface DishTag {
  type: 'recommend' | 'new' | 'hot' | 'sale'; // 标签类型
  text: string;         // 标签显示文本，如 "店长推荐"
}
```

### 2.3 购物车项 (CartItem)

```typescript
interface CartItem {
  dishId: string;       // 菜品 ID
  name: string;         // 菜品名称（冗余，便于展示）
  image: string;        // 菜品图片（冗余，便于展示）
  specId: string;       // 选中的规格 ID
  specName: string;     // 选中的规格名称（冗余，便于展示）
  price: number;        // 最终单价（单位：分），已包含规格价格变动
  quantity: number;     // 数量
  selected: boolean;    // 是否选中（预留，当前默认全选）
}
```

### 2.4 订单 (Order)

```typescript
interface Order {
  id: string;            // 订单唯一标识
  items: OrderItem[];    // 订单商品列表
  totalPrice: number;    // 订单总金额（单位：分）
  remark: string;        // 订单备注
  status: OrderStatus;   // 订单状态
  createTime: string;    // 创建时间，ISO 8601 格式
}

interface OrderItem {
  dishId: string;        // 菜品 ID
  name: string;          // 菜品名称
  image: string;         // 菜品图片
  specId: string;        // 规格 ID
  specName: string;      // 规格名称
  price: number;         // 单价（单位：分）
  quantity: number;      // 数量
}

type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
```

### 2.5 提交订单请求体

```typescript
interface CreateOrderRequest {
  items: CreateOrderItem[]; // 订单商品列表
  remark: string;           // 订单备注
  storeId: string;          // 门店标识
  tableNo?: string;         // 桌号（选填）
}

interface CreateOrderItem {
  dishId: string;           // 菜品 ID
  specId: string;           // 规格 ID
  quantity: number;         // 数量
}
```

---

## 三、接口详细定义

### 3.1 获取分类列表

获取门店所有菜品分类。

| 项目       | 说明                                   |
| ---------- | -------------------------------------- |
| 请求方法   | GET                                    |
| 请求路径   | `/categories`                          |
| 请求头     | `X-Store-Id: {storeId}`               |

#### 请求参数

无

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "cat_001",
      "name": "招牌推荐",
      "icon": "https://cdn.workbuddy.cn/icons/star.png",
      "sort": 1,
      "dishCount": 12
    },
    {
      "id": "cat_002",
      "name": "经典热菜",
      "icon": "https://cdn.workbuddy.cn/icons/fire.png",
      "sort": 2,
      "dishCount": 25
    },
    {
      "id": "cat_003",
      "name": "时令凉菜",
      "icon": "https://cdn.workbuddy.cn/icons/leaf.png",
      "sort": 3,
      "dishCount": 8
    },
    {
      "id": "cat_004",
      "name": "汤羹主食",
      "icon": "https://cdn.workbuddy.cn/icons/bowl.png",
      "sort": 4,
      "dishCount": 10
    },
    {
      "id": "cat_005",
      "name": "饮品甜点",
      "icon": "https://cdn.workbuddy.cn/icons/cup.png",
      "sort": 5,
      "dishCount": 6
    }
  ],
  "timestamp": 1750262400000
}
```

---

### 3.2 获取菜品列表

根据分类、分页等条件获取菜品列表。

| 项目       | 说明                                   |
| ---------- | -------------------------------------- |
| 请求方法   | GET                                    |
| 请求路径   | `/dishes`                              |
| 请求头     | `X-Store-Id: {storeId}`               |

#### 请求参数

| 参数名     | 类型   | 必填 | 默认值 | 说明                           |
| ---------- | ------ | ---- | ------ | ------------------------------ |
| categoryId | string | 否   | -      | 分类 ID，不传则返回全部        |
| page       | number | 否   | 1      | 页码，从 1 开始                |
| pageSize   | number | 否   | 20     | 每页数量                       |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [
      {
        "id": "dish_001",
        "name": "秘制红烧肉",
        "categoryId": "cat_002",
        "image": "https://cdn.workbuddy.cn/dishes/001_main.jpg",
        "images": [
          "https://cdn.workbuddy.cn/dishes/001_main.jpg",
          "https://cdn.workbuddy.cn/dishes/001_01.jpg",
          "https://cdn.workbuddy.cn/dishes/001_02.jpg"
        ],
        "price": 8800,
        "originalPrice": 10800,
        "description": "选用优质五花肉，文火慢炖两小时，肥而不腻，入口即化。搭配秘制酱料，咸甜适口。",
        "specs": [
          { "id": "spec_001", "name": "小份", "priceDelta": 0 },
          { "id": "spec_002", "name": "大份", "priceDelta": 3200 }
        ],
        "tags": [
          { "type": "recommend", "text": "店长推荐" },
          { "type": "hot", "text": "人气TOP1" }
        ],
        "isRecommended": true,
        "isOnSale": true,
        "sort": 1
      },
      {
        "id": "dish_002",
        "name": "清蒸鲈鱼",
        "categoryId": "cat_002",
        "image": "https://cdn.workbuddy.cn/dishes/002_main.jpg",
        "images": [
          "https://cdn.workbuddy.cn/dishes/002_main.jpg"
        ],
        "price": 12800,
        "originalPrice": 12800,
        "description": "新鲜鲈鱼清蒸，保留原汁原味，鱼肉鲜嫩滑口。",
        "specs": [
          { "id": "spec_003", "name": "标准", "priceDelta": 0 }
        ],
        "tags": [
          { "type": "new", "text": "时令新品" }
        ],
        "isRecommended": false,
        "isOnSale": true,
        "sort": 2
      }
    ],
    "total": 25,
    "page": 1,
    "pageSize": 20
  },
  "timestamp": 1750262400000
}
```

---

### 3.3 获取推荐菜品

获取门店推荐菜品列表（不分页，通常返回 6-10 条）。

| 项目       | 说明                                   |
| ---------- | -------------------------------------- |
| 请求方法   | GET                                    |
| 请求路径   | `/dishes/recommended`                  |
| 请求头     | `X-Store-Id: {storeId}`               |

#### 请求参数

| 参数名 | 类型   | 必填 | 默认值 | 说明               |
| ------ | ------ | ---- | ------ | ------------------ |
| limit  | number | 否   | 10     | 返回数量上限       |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "dish_001",
      "name": "秘制红烧肉",
      "categoryId": "cat_002",
      "image": "https://cdn.workbuddy.cn/dishes/001_main.jpg",
      "price": 8800,
      "originalPrice": 10800,
      "tags": [
        { "type": "recommend", "text": "店长推荐" }
      ],
      "isRecommended": true,
      "isOnSale": true,
      "sort": 1
    }
  ],
  "timestamp": 1750262400000
}
```

> **注意**：推荐菜品接口返回的字段为精简版，仅包含列表展示所需的字段。完整信息需通过菜品详情接口获取。

---

### 3.4 获取菜品详情

获取单个菜品的完整信息。

| 项目       | 说明                                   |
| ---------- | -------------------------------------- |
| 请求方法   | GET                                    |
| 请求路径   | `/dishes/{dishId}`                     |
| 请求头     | `X-Store-Id: {storeId}`               |

#### 请求参数

| 参数名 | 类型   | 必填 | 说明                   |
| ------ | ------ | ---- | ---------------------- |
| dishId | string | 是   | 菜品 ID，通过 URL 路径传递 |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "dish_001",
    "name": "秘制红烧肉",
    "categoryId": "cat_002",
    "image": "https://cdn.workbuddy.cn/dishes/001_main.jpg",
    "images": [
      "https://cdn.workbuddy.cn/dishes/001_main.jpg",
      "https://cdn.workbuddy.cn/dishes/001_01.jpg",
      "https://cdn.workbuddy.cn/dishes/001_02.jpg"
    ],
    "price": 8800,
    "originalPrice": 10800,
    "description": "选用优质五花肉，文火慢炖两小时，肥而不腻，入口即化。搭配秘制酱料，咸甜适口。",
    "specs": [
      { "id": "spec_001", "name": "小份", "priceDelta": 0 },
      { "id": "spec_002", "name": "大份", "priceDelta": 3200 }
    ],
    "tags": [
      { "type": "recommend", "text": "店长推荐" },
      { "type": "hot", "text": "人气TOP1" }
    ],
    "isRecommended": true,
    "isOnSale": true,
    "sort": 1
  },
  "timestamp": 1750262400000
}
```

---

### 3.5 提交订单

顾客确认后提交订单。

| 项目       | 说明                                   |
| ---------- | -------------------------------------- |
| 请求方法   | POST                                   |
| 请求路径   | `/orders`                              |
| 请求头     | `Content-Type: application/json`       |
| 请求头     | `X-Store-Id: {storeId}`               |

#### 请求体

```json
{
  "items": [
    {
      "dishId": "dish_001",
      "specId": "spec_002",
      "quantity": 2
    },
    {
      "dishId": "dish_002",
      "specId": "spec_003",
      "quantity": 1
    }
  ],
  "remark": "少放盐，谢谢",
  "storeId": "store_001",
  "tableNo": "A12"
}
```

#### 请求体字段说明

| 字段     | 类型   | 必填 | 说明                               |
| -------- | ------ | ---- | ---------------------------------- |
| items    | array  | 是   | 订单商品列表                       |
| items[].dishId | string | 是 | 菜品 ID                        |
| items[].specId | string | 是 | 规格 ID                        |
| items[].quantity | number | 是 | 数量，最小为 1                |
| remark   | string | 否   | 订单备注，最长 200 字              |
| storeId  | string | 是   | 门店标识                           |
| tableNo  | string | 否   | 桌号（扫码点餐时传入）             |

#### 响应示例

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "order_20260706_001",
    "items": [
      {
        "dishId": "dish_001",
        "name": "秘制红烧肉",
        "image": "https://cdn.workbuddy.cn/dishes/001_main.jpg",
        "specId": "spec_002",
        "specName": "大份",
        "price": 12000,
        "quantity": 2
      },
      {
        "dishId": "dish_002",
        "name": "清蒸鲈鱼",
        "image": "https://cdn.workbuddy.cn/dishes/002_main.jpg",
        "specId": "spec_003",
        "specName": "标准",
        "price": 12800,
        "quantity": 1
      }
    ],
    "totalPrice": 36800,
    "remark": "少放盐，谢谢",
    "status": "pending",
    "createTime": "2026-07-06T12:00:00+08:00"
  },
  "timestamp": 1750262400000
}
```

---

## 四、错误码说明

### 4.1 通用错误码

| 错误码 | HTTP 状态码 | 说明                               |
| ------ | ----------- | ---------------------------------- |
| 0      | 200         | 请求成功                           |
| 10001  | 400         | 参数错误                           |
| 10002  | 400         | 缺少必填参数                       |
| 10003  | 400         | 参数格式不正确                     |
| 10004  | 400         | 参数值超出允许范围                 |
| 20001  | 404         | 资源不存在                         |
| 20002  | 404         | 菜品不存在或已下架                 |
| 20003  | 404         | 分类不存在                         |
| 20004  | 404         | 订单不存在                         |
| 30001  | 422         | 业务规则校验失败                   |
| 30002  | 422         | 菜品已下架，无法下单               |
| 30003  | 422         | 订单金额校验失败                   |
| 50001  | 500         | 服务器内部错误                     |
| 50002  | 503         | 服务暂时不可用                     |

### 4.2 错误响应示例

```json
// 参数错误
{
  "code": 10002,
  "message": "缺少必填参数：items",
  "data": null,
  "timestamp": 1750262400000
}

// 资源不存在
{
  "code": 20002,
  "message": "菜品 dish_999 不存在或已下架",
  "data": null,
  "timestamp": 1750262400000
}

// 业务校验失败
{
  "code": 30002,
  "message": "菜品「秘制红烧肉」已下架，请重新选择",
  "data": {
    "dishId": "dish_001"
  },
  "timestamp": 1750262400000
}
```

---

## 五、Mock 数据切换说明

### 5.1 切换开关

在 `config/api.config.js` 中控制：

```javascript
export default {
  // 设置为 true 使用本地 Mock 数据
  // 设置为 false 使用 WorkBuddy 远程接口
  USE_MOCK: true,

  // WorkBuddy 接口基础地址
  BASE_URL: 'https://api.workbuddy.cn/v1',

  // 请求超时时间（毫秒）
  TIMEOUT: 10000,

  // 当前门店标识
  STORE_ID: 'store_001',
}
```

### 5.2 Mock 数据文件

Mock 数据定义在 `api/mock-data.js`，包含：

- `mockCategories` — 分类列表 Mock 数据
- `mockDishes` — 菜品列表 Mock 数据
- `mockRecommendedDishes` — 推荐菜品 Mock 数据

### 5.3 Mock 数据与真实数据切换原理

```javascript
// api/dish.js
import { USE_MOCK } from '@/config/api.config'
import { mockDishes, mockRecommendedDishes } from './mock-data'
import { request } from '@/utils/request'

export function getDishes(params) {
  if (USE_MOCK) {
    // 本地 Mock 逻辑
    let list = [...mockDishes]
    if (params.categoryId) {
      list = list.filter(d => d.categoryId === params.categoryId)
    }
    const page = params.page || 1
    const pageSize = params.pageSize || 20
    const start = (page - 1) * pageSize
    return Promise.resolve({
      code: 0,
      message: 'success',
      data: {
        list: list.slice(start, start + pageSize),
        total: list.length,
        page,
        pageSize,
      },
      timestamp: Date.now(),
    })
  }
  // 真实接口调用
  return request.get('/dishes', params)
}
```

### 5.4 Mock 数据格式要求

Mock 数据必须与接口规范中的数据模型保持一致，确保切换到真实接口时无需修改业务代码。

---

## 六、对接检查清单

### 6.1 部署前检查

- [ ] `config/api.config.js` 中 `USE_MOCK` 设置为 `false`
- [ ] `BASE_URL` 配置为正确的 WorkBuddy 生产环境地址
- [ ] `STORE_ID` 配置为正确的门店标识
- [ ] 微信小程序后台已配置 request 合法域名为 `https://api.workbuddy.cn`
- [ ] 已在测试环境完成接口联调验证

### 6.2 接口联调检查

| 序号 | 检查项                               | 验证方法                           | 结果 |
| ---- | ------------------------------------ | ---------------------------------- | ---- |
| 1    | 分类列表接口返回数据格式正确         | 首页正常展示分类导航               | ☐    |
| 2    | 菜品列表接口支持分类筛选             | 切换分类后菜品列表正确更新         | ☐    |
| 3    | 菜品列表接口支持分页                 | 滚动加载更多数据正常               | ☐    |
| 4    | 推荐菜品接口返回数据正确             | 首页推荐区正常展示                 | ☐    |
| 5    | 菜品详情接口返回完整数据             | 详情页正确展示所有字段             | ☐    |
| 6    | 菜品图片 URL 可正常访问              | 所有图片正常加载显示               | ☐    |
| 7    | 规格数据格式正确                     | 规格选择器正常展示和选择           | ☐    |
| 8    | 提交订单接口返回订单数据             | 下单成功后正确展示订单信息         | ☐    |
| 9    | 错误响应格式正确                     | 模拟错误场景，前端正常处理         | ☐    |
| 10   | 接口响应时间在可接受范围内           | 各接口响应时间 < 2s                | ☐    |

### 6.3 异常场景验证

| 序号 | 异常场景                             | 预期表现                           | 结果 |
| ---- | ------------------------------------ | ---------------------------------- | ---- |
| 1    | 网络异常（无网络）                   | 显示 AppError 组件，支持重试       | ☐    |
| 2    | 接口返回 500 错误                    | 显示错误提示，不崩溃               | ☐    |
| 3    | 接口超时                             | 显示超时提示，支持重试             | ☐    |
| 4    | 分类列表为空                         | 首页显示 AppEmpty 组件             | ☐    |
| 5    | 菜品列表为空                         | 显示空状态提示                     | ☐    |
| 6    | 菜品已下架（isOnSale = false）       | 菜品卡片显示下架状态，不可点       | ☐    |
| 7    | 菜品图片加载失败                     | 显示占位图，不影响功能             | ☐    |
| 8    | 提交订单时商品已下架                 | 提示用户，刷新菜品列表             | ☐    |

---

## 七、接口调用流程图

```
┌──────────────────────────────────────────────────────────┐
│                        小程序客户端                       │
│                                                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐              │
│  │ 菜谱首页 │    │ 菜品详情 │    │ 确认订单 │              │
│  └────┬────┘    └────┬────┘    └────┬────┘              │
│       │              │              │                     │
│       ▼              ▼              ▼                     │
│  GET /categories  GET /dishes/:id  POST /orders          │
│  GET /dishes                                        │
│  GET /dishes/recommended                              │
│                                                          │
└──────────────────────┬───────────────────────────────────┘
                       │
                       │ HTTPS
                       │
┌──────────────────────▼───────────────────────────────────┐
│                    WorkBuddy API 网关                      │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ 分类服务      │  │ 菜品服务      │  │ 订单服务      │   │
│  │ /categories  │  │ /dishes      │  │ /orders      │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 八、附录

### A. 价格单位说明

所有接口中的价格字段统一使用**分**作为单位，前端展示时需转换为元：

```javascript
// utils/format.js
export function formatPrice(priceInCents) {
  return (priceInCents / 100).toFixed(2)
}

// 使用示例
formatPrice(8800) // → "88.00"
formatPrice(12000) // → "120.00"
```

### B. 时间格式说明

所有时间字段统一使用 ISO 8601 格式：

```
2026-07-06T12:00:00+08:00
```

前端展示时根据需要格式化：

```javascript
// utils/format.js
export function formatTime(isoString) {
  const date = new Date(isoString)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}`
}
```

### C. 图片规范建议

| 类型       | 建议尺寸     | 建议格式 | 建议大小   |
| ---------- | ------------ | -------- | ---------- |
| 菜品主图   | 750 x 750px  | WebP/JPG | < 200KB    |
| 菜品详情图 | 750 x 1000px | WebP/JPG | < 300KB    |
| 分类图标   | 96 x 96px    | PNG/SVG  | < 10KB     |
| 菜品缩略图 | 300 x 300px  | WebP/JPG | < 50KB     |

> **建议**：使用 CDN 图片处理服务（如图片压缩、WebP 格式转换、裁剪）以优化小程序加载性能。

### D. 接口版本管理

当前接口版本为 `v1`，Base URL 中包含版本号。后续接口升级时，版本号递增（如 `v2`），旧版本保持兼容过渡期。

### E. 联系方式

如对接过程中遇到问题，请联系 WorkBuddy 技术支持团队。
