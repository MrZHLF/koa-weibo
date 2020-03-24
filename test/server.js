/**
 * @description jest server 
 * @author 小周
 */


const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)