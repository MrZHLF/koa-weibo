/**
 * @description json 
 * @author 小周
 */

const server = require('./server')

test('json 接口返回数据格式正确', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title: "koa json"
    })
    expect(res.body.title).toBe('koa json')
})