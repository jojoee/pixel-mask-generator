const Square = require('./Square')

const square = new Square([
  0, 1, 1, 1,
  0, 1, 2, 2,
  0, 0, 1, 2,
  1, 1, 1, 2,
  0, 1, 1, 2,
  1, 1, 0, 0
], 4)

describe('Square', () => {
  it('Square is instantiable', () => {
    expect(square).toBeInstanceOf(Square)
  })
})
