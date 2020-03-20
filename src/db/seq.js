const Sequelize = require('sequelize')
const {
  isProd,
  isTest
} = require('../utils/env')

const {
  MYSQL_CONF
} = require('./../conf/db')

const {
  host,
  user,
  password,
  database,
  port
} = MYSQL_CONF
const conf = {
  host,
  port,
  dialect: 'mysql'
}

// 不打印日志
if (isTest) {
  conf.logging = () => {}
}

if (isProd) {
  conf.pool = {
    max: 5, //连接池最大的链接数量
    min: 10, //最小
    idle: 10000 //如果一个连接池10s之内没有被使用,测释放
  }
}

const seq = new Sequelize(database, user, password, conf)
module.exports = seq