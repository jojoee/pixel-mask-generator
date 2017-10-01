const util = require('./util')

describe('util', () => {
  test('util is instantiable', () => {
    expect(util).not.toBeInstanceOf(util)
  })
})

describe('count', () => {
  test('general', () => {
    const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
    expect(util.count(arr, 0)).toBe(0)
    expect(util.count(arr, 1)).toBe(1)
    expect(util.count(arr, 2)).toBe(2)
    expect(util.count(arr, 3)).toBe(3)
    expect(util.count(arr, 4)).toBe(4)
    expect(util.count(arr, 5)).toBe(0)
  })
})
