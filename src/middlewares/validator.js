/** 
 * @description json schema 中间件
 * @author 小周
 */

const {
    ErrorModel
} = require('../model/ResModel')
const {
    jsonSchemaFileInfo
} = require('../model/Errorinfo')

/**
 *  生成json schema验证的中间件 
 * @param {function} userValidate 验证函数
 */
function genValidator(validateFn) {
    // 定义中间件
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // 失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        // 验证成功
        await next()
    }
    // 返回中间件
    return validator
}

module.exports = {
    genValidator
}