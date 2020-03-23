const koa = require('koa')
const app = new koa()
const logger = require('koa-logger')
const json = require('koa-json')
const views = require('koa-views')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const path = require('path')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const {
  REDIS_CONF
} = require('./conf/db')
const {
  isProd
} = require('./utils/env')
// 引入路由

const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')
// 错误警告
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}

onerror(app, onerrorConf)
// 初始化ejs，设置后缀为html，文件目录为`views`
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

// session 配置
app.keys = ['UIsdf5151515&$#']
app.use(
  session({
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 单位 ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
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
// 定义路由  注册

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由注册最下面
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app