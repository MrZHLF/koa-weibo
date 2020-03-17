const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '我是首页',
    body: '内容'
  })
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: '这个是首页内容',
    userName
  }
})

module.exports = router
