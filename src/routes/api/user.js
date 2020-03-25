/** 
 * @description user API路由
 * @author 小周
 */
const router = require('koa-router')()
const {
    isExist,
    register,
    login
} = require('../../controller/user')
router.prefix('/api/user')
const userValidate = require('./../../validator/user')

// 引入中间件
const {
    genValidator
} = require('./../../middlewares/validator')

//注册接口
router.post('/register', genValidator(userValidate), async (ctx, next) => {
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

// 登录
router.post('/login', async (ctx, next) => {
    const {
        userName,
        password
    } = ctx.request.body

    ctx.body = await login(ctx, userName, password)
})


module.exports = router