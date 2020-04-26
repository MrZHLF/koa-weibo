/**
 * @description 首页 test
 * @author 小周
 */
const server = require('../server')

const {
    Z_COOKIE
} = require('./../testUserinfo')

//存储微博id
let BLOG_ID = ''

test('创建一个微博,成功 ', async () => {
    // 定义测试内容
    const content = '单元测试自动创建微博' + new Date()
    const image = '/xxx.png'

    // 开始测试
    const res = await server.post('/api/blog/create').send({
        content,
        image
    }).set('cookie', Z_COOKIE)
    expect(res.body.errno).toBe(0)
    expect(res.body.data.content).toBe(content)
    expect(res.body.data.image).toBe(image)
    //记录微博id
    BLOG_ID = res.body.data.id
})