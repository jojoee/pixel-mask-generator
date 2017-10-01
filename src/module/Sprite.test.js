const Mask = require('./Mask')
const Sprite = require('./Sprite')

const mask = new Mask([
  0, 0, 1,
  0, 1, 0,
  1, 0, 0,
  1, 0, 0
], 3, true, true)
const sprite = new Sprite(mask)

describe('Sprite', () => {
  it('Sprite is instantiable', () => {
    expect(sprite).toBeInstanceOf(Sprite)
  })
})
