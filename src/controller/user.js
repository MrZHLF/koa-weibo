/** 
 * @description user controller
 * @author 小周
 */

const {
    getUserInfo,
    createUser
} = require('../services/user')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')

const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/Errorinfo')

const doCrypto = require('./../utils/cryp')

/**
 *
 *用户是否注册
 * @param {string} userName 用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}



/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别(1,男，2女，3保密)
 */
async function register({
    userName,
    password,
    gender
}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }

    // 注册 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.log(ex.message, ex.stack);
        return new ErrorModel(registerFailInfo)
    }
}




module.exports = {
    isExist,
    register
}