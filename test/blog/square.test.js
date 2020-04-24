/**
 * @description 广场页 test
 * @author 小周
 */

const server = require('../server')
const {
    COOKIE
} = require('../testUserinfo')

test('广场,加载第一页数据 ', async () => {
    const res = await server.get('/api/square/loadMore/0').set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
    const data = res.body.data;
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})