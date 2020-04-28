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
const koaStatic = require('koa-static')
const {
  REDIS_CONF
} = require('./conf/db')
const {
  isProd
} = require('./utils/env')
const {
  SESSION_SECRET_KEY
} = require('./conf/secretKeys')
// 引入路由
const atAPIRouter = require('./routes/api/blog-at')
const blogSquareAPIRouter = require('./routes/api/blog-square')
const profileAPIRouter = require('./routes/api/blog.profile')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utlils')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
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
app.keys = [SESSION_SECRET_KEY]
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
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))
// 定义路由  注册

app.use(atAPIRouter.routes(), atAPIRouter.allowedMethods()) //at Api
app.use(blogSquareAPIRouter.routes(), blogSquareAPIRouter.allowedMethods()) //博客路由
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods()) //博客路由
app.use(userViewRouter.routes(), userViewRouter.allowedMethods()) //用户登录注册路由
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods()) //博客首页API
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods()) //个人首页路由
app.use(userApiRouter.routes(), userApiRouter.allowedMethods()) //用户登录注册API
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods()) //图片上传API
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404路由注册最下面
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app