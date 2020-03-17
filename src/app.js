const koa = require('koa')
const app = new koa()
const logger = require('koa-logger')
const json = require('koa-json')
const views = require('koa-views')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const render = require('koa-ejs')
const path = require('path')
// 引入路由
const index = require('./routes/index')

// 错误警告
onerror(app)
// 初始化ejs，设置后缀为html，文件目录为`views`
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
// 定义路由
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
