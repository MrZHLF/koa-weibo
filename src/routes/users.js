const router = require('koa-router')()

router.prefix('/users')

router.get('/', async (ctx, next) => {
    ctx.body = {
        title: "这是user页面"
    }
})

router.post('/login', async (ctx, next) => {
    const {
        userName,
        password
    } = ctx.request.body
    ctx.body = {
        userName,
        password
    }
})


module.exports = router