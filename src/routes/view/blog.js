/** 
 * @description 微博 view路由
 * @author 小周
 */

const {
    loginRedirect
} = require('../../middlewares/loginChecks')


const router = require('koa-router')()
const {
    getProfileBlogList
} = require('../../controller/blog-profile')
const {
    getSquareBlogList
} = require('./../../controller/blog-square')
// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})



// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const {
        userName
    } = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const {
        userName: curUserName
    } = ctx.params

    //获取微博第一页数据
    let result = await getProfileBlogList(curUserName, 0);
    console.log(ctx.params, '555')
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router