const random = require('./random')

describe('random', () => {
  test('random is instantiable', () => {
    expect(random).not.toBeInstanceOf(random)
  })
})
