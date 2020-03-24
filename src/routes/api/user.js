/** 
 * @description user API路由
 * @author 小周
 */
const router = require('koa-router')()
const {
    isExist,
    register
} = require('../../controller/user')
router.prefix('/api/user')


//注册接口
router.post('/register', async (ctx, next) => {
    const {
        userName,
        password,
        gender
    } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

//判断用户是否存在
router.post('/isExist', async (ctx, next) => {
    const {
        userName
    } = ctx.request.body
    ctx.body = await isExist(userName)
})



module.exports = router