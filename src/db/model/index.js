/** 
 * @description 数据模型入口文件
 * @author 小周
 */
const User = require('./Usre')
const Blog = require('./Blog')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}