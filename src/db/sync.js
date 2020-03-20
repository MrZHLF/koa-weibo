/* 
    @descriptions 描述
*/

const seq = require('./seq')
// require('./model')


// 测试连接
seq
    .authenticate()
    .then(() => {
        console.log('连接成功')
    })
    .catch(err => {
        console.log(err, '连接失败')
    })

// 执行同步
seq.sync({
    force: true
}).then(() => {
    console.log('sync 成功');
    process.exit()

})