/**
 * server/index.js — 私房菜馆电子菜谱后端 API 服务
 * 基于 Express 框架，数据存储于 data.json 文件
 * 提供分类、菜品、订单的 CRUD 接口
 */
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 数据文件路径
const DATA_FILE = path.join(__dirname, 'data.json')

/**
 * 读取数据文件
 * @returns {Object} { categories, dishes, orders }
 */
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    console.error('[Server] 读取数据文件失败:', e.message)
    return { categories: [], dishes: [], orders: [] }
  }
}

/**
 * 写入数据文件
 * @param {Object} data
 */
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (e) {
    console.error('[Server] 写入数据文件失败:', e.message)
  }
}

/**
 * 统一成功响应
 */
function success(data, message = 'ok') {
  return { code: 0, message, data }
}

/**
 * 统一错误响应
 */
function error(message = '服务器内部错误', code = 500) {
  return { code, message, data: null }
}

// ============================================================
// 分类接口
// ============================================================

/**
 * GET /api/categories — 获取分类列表
 */
app.get('/api/categories', (req, res) => {
  const data = readData()
  const categories = (data.categories || []).sort((a, b) => a.sort - b.sort)
  res.json(success(categories))
})

// ============================================================
// 菜品接口
// ============================================================

/**
 * GET /api/dishes — 获取菜品列表
 * Query: categoryId, page(默认1), pageSize(默认20)
 */
app.get('/api/dishes', (req, res) => {
  const data = readData()
  const { categoryId, page = 1, pageSize = 20 } = req.query
  const pageNum = Math.max(1, parseInt(page))
  const size = Math.max(1, Math.min(100, parseInt(pageSize)))

  let dishes = (data.dishes || []).filter(d => d.isOnSale !== false)

  // 按分类筛选
  if (categoryId) {
    dishes = dishes.filter(d => d.categoryId === categoryId)
  }

  // 按 sort 排序
  dishes.sort((a, b) => a.sort - b.sort)

  // 分页
  const total = dishes.length
  const start = (pageNum - 1) * size
  const list = dishes.slice(start, start + size)

  res.json(success({
    list,
    total,
    page: pageNum,
    pageSize: size
  }))
})

/**
 * GET /api/dishes/recommended — 获取推荐菜品
 */
app.get('/api/dishes/recommended', (req, res) => {
  const data = readData()
  const recommended = (data.dishes || [])
    .filter(d => d.isRecommended && d.isOnSale !== false)
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 6)

  res.json(success(recommended))
})

/**
 * GET /api/dishes/:id — 获取菜品详情
 */
app.get('/api/dishes/:id', (req, res) => {
  const data = readData()
  const dish = (data.dishes || []).find(d => d.id === req.params.id)

  if (!dish) {
    return res.status(404).json(error('菜品不存在', 404))
  }

  res.json(success(dish))
})

// ============================================================
// 订单接口
// ============================================================

/**
 * POST /api/orders — 提交订单
 * Body: { items: [{ dishId, specId, specName, quantity, price }], totalPrice, remark }
 */
app.post('/api/orders', (req, res) => {
  const { items, totalPrice, remark } = req.body

  // 参数校验
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json(error('菜品列表不能为空', 400))
  }
  if (totalPrice == null || totalPrice < 0) {
    return res.status(400).json(error('订单金额异常', 400))
  }

  // 生成订单
  const orderId = 'ORD' + Date.now() + Math.random().toString(36).slice(2, 7).toUpperCase()
  const order = {
    id: orderId,
    items: items.map(item => ({
      dishId: item.dishId,
      specId: item.specId || null,
      specName: item.specName || null,
      quantity: item.quantity,
      price: item.price
    })),
    totalPrice,
    remark: remark || '',
    status: 'pending',
    createTime: new Date().toISOString()
  }

  // 持久化
  const data = readData()
  data.orders = data.orders || []
  data.orders.push(order)
  writeData(data)

  console.log(`[Server] 新订单: ${orderId}, 共 ${items.length} 道菜, ¥${(totalPrice / 100).toFixed(2)}`)
  res.json(success(order, '下单成功'))
})

/**
 * GET /api/orders/:id — 获取订单详情
 */
app.get('/api/orders/:id', (req, res) => {
  const data = readData()
  const order = (data.orders || []).find(o => o.id === req.params.id)

  if (!order) {
    return res.status(404).json(error('订单不存在', 404))
  }

  res.json(success(order))
})

// ============================================================
// 健康检查
// ============================================================

app.get('/api/health', (req, res) => {
  const data = readData()
  res.json(success({
    status: 'ok',
    uptime: process.uptime(),
    dishes: data.dishes?.length || 0,
    categories: data.categories?.length || 0,
    orders: data.orders?.length || 0
  }))
})

// ============================================================
// 启动服务
// ============================================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('')
  console.log('  🍳  私房菜馆电子菜谱 API 服务已启动')
  console.log('  ─────────────────────────────────')
  console.log(`  地址: http://localhost:${PORT}`)
  console.log(`  分类: http://localhost:${PORT}/api/categories`)
  console.log(`  菜品: http://localhost:${PORT}/api/dishes`)
  console.log(`  推荐: http://localhost:${PORT}/api/dishes/recommended`)
  console.log(`  订单: http://localhost:${PORT}/api/orders`)
  console.log(`  健康: http://localhost:${PORT}/api/health`)
  console.log('')
})
