/** 
 * @description 首页 controller
 * @author 小周
 */
const xss = require('xss')
const {
    createBlog,
    getFollowersBlogList
} = require('../services/blog')
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResModel')
const {
    createBlogFailInfo
} = require('./../model/Errorinfo')

const {
    PAGE_SIZE,
    REG_FOR_AT_WHO
} = require('../conf/constant')



/**
 * 创建微博
 * @param {Object} param0 创建所需微博数据 {userId,content,image}
 */
async function create({
    userId,
    content,
    image
}) {
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}


/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const {
        count,
        blogList
    } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}