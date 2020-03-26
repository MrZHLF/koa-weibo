/** 
 * @description 登录验证的中间件
 * @author 小周
 */

const {
    ErrorModel
} = require('../model/ResModel')
const {
    loginCheckFailInfo
} = require('../model/Errorinfo')


/**
 *  API登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登陆
        await next()
        return
    }
    // 没有登录
    ctx.body = new ErrorModel(loginCheckFailInfo)
}


/**
 *  页面登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登陆
        await next()
        return
    }
    // 没有登录
    const curUrl = ctx.url;
    ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}