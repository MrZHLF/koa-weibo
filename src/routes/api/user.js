/** 
 * @description user API路由
 * @author 小周
 */
const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
} = require('../../controller/user')
router.prefix('/api/user')
const userValidate = require('./../../validator/user')

// 引入中间件
const {
    genValidator
} = require('./../../middlewares/validator')

const {
    isTest
} = require('./../../utils/env')

const {
    loginCheck
} = require('../../middlewares/loginChecks')
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

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
    if (isTest) {
        //测试环境，
        const {
            userName
        } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

//修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {
        nickName,
        city,
        picture
    } = ctx.request.body;
    ctx.body = await changeInfo(ctx, {
        nickName,
        city,
        picture
    })
})


// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {
        password,
        newPassword
    } = ctx.request.body;
    const {
        userName
    } = ctx.session.userInfo

    ctx.body = await changePassword(userName, password, newPassword)
})


//退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports = router