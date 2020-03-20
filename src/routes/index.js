const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: '我是首页',
        body: '内容',
        isMe: true,
        blogList: [{
                id: 1,
                title: "这是标题1"
            },
            {
                id: 2,
                title: "这是标题2"
            },
            {
                id: 3,
                title: "这是标题3"
            }
        ]
    })
})

router.get('/profile/:userName', async (ctx, next) => {
    const {
        userName
    } = ctx.params
    ctx.body = {
        title: '这个是首页内容',
        userName
    }
})

router.get('/loadMoer/:userName/:pageIndex', async (ctx, next) => {
    const {
        userName,
        pageIndex
    } = ctx.params
    ctx.body = {
        title: 'this is pages content',
        userName,
        pageIndex
    }
})

module.exports = router