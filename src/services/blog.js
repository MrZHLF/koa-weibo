/** 
 * @description blog services
 * @author 小周
 */

const {
    Blog
} = require('../db/model/index')

/**
 *  创建微博数据
 * @param {Object} param0 创建微博数据 {userId,content,image}
 */
async function createBlog({
    userId,
    content,
    image
}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}