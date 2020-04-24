/** 
 * @description 数据模型入口文件
 * @author 小周
 */
const User = require('./Usre')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

// 建立表之间关系
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog,
    UserRelation
}