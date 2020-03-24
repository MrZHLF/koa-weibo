/** 
 * @description 封装sequelizze数据类型
 * @author 小周
 */

const Sequelize = require('sequelize')
module.exports = {
    STRING: Sequelize.STRING,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    INTEGER: Sequelize.INTEGER,
    BOOLEAN: Sequelize.BOOLEAN
}