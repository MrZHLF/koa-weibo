/** 
 * @description 微博 view路由
 * @author 小周
 */

const {
    loginRedirect
} = require('../../middlewares/loginChecks')
const router = require('koa-router')()

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})


module.exports = router