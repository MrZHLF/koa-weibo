/**
 * @description test 
 * @author 小周
 */

function sum(a, b) {
    return a + b
}

test('10+20等于30', () => {
    const res = sum(10, 20)
    expect(res).toBe(30)
})