/** 
 * @description 首页 API路由
 * @author 小周
 */

const router = require('koa-router')()
router.prefix('/api/blog')

const {
    loginCheck
} = require('../../middlewares/loginChecks')
const {
    create
} = require('../../controller/blog-home')
const {
    genValidator
} = require('./../../middlewares/validator')

const blogValidate = require('../../validator/blog')
// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const {
        content,
        image
    } = ctx.request.body
    const {
        id: userId
    } = ctx.session.userInfo
    ctx.body = await create({
        userId,
        content,
        image
    })
})


module.exports = router