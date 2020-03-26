/**
 * @description 用户登录单元测试 
 * @author 小周
 */

const server = require('../server')

//  用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`

const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

// 存储 cookie
let COOKIE = ''

// 注册
test('注册一个用户,应该成功 ', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册用户,应该失败 ', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名，应该存在 ', async () => {
    const res = await server.post('/api/user/isExist').send({
        userName
    })
    expect(res.body.errno).toBe(0)
})

// json schema 检测
test('should json scheame 检测,非法格式，注册应该失败', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123', //用户名不是字母(或者下划线)开头
        password: '2', //最小长度不是3
        // nickName
        gender: 'mall', //不是数字
    })
    expect(res.body.errno).not.toBe(0)
})

// 登录
test('登录，成功', async () => {
    const res = await server.post('/api/user/login').send({
        userName,
        password
    })
    expect(res.body.errno).toBe(0)
    // 获取cookie
    COOKIE = res.headers['set-cookie'].join(';')
});

// 删除
test('删除用户，成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
});

// 再次查询用户，应该是否存在
test('删除之后，再次查询用户，应该不存在 ', async () => {
    const res = await server.post('/api/user/isExist').send({
        userName
    })
    expect(res.body.errno).not.toBe(0)
})