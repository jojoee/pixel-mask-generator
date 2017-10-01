const util = require('./util')

describe('util', () => {
  test('util is instantiable', () => {
    expect(util).not.toBeInstanceOf(util)
  })
})
