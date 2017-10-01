const Mask = require('./Mask')

const mask = new Mask([
  0, 1, 1, 1,
  0, 1, 2, 2,
  0, 0, 1, 2,
  1, 1, 1, 2,
  0, 1, 1, 2,
  1, 1, 0, 0
], 4, true, false)

describe('Mask', () => {
  it('Mask is instantiable', () => {
    expect(mask).toBeInstanceOf(Mask)
  })
})
