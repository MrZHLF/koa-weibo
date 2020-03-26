const router = require('koa-router')()
const {
    loginRedirect
} = require('../middlewares/loginChecks')
router.get('/', loginRedirect, async (ctx, next) => {
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

router.get('/json', async (ctx, next) => {
    // const session = ctx.session
    // if (session.viewNum == null) {
    //     session.viewNum = 0
    // }
    // session.viewNum++
    ctx.body = {
        title: 'koa json'
        // viewNum: session.viewNum
    }
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