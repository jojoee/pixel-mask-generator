const Square = require('./Square')

class Mask extends Square {
  /**
   * @param {number[]} data
   * @param {number} width
   * @param {boolean} [mirrorY=true]
   * @param {boolean} [mirrorY=true]
   */
  constructor (data, width, mirrorX = true, mirrorY = true) {
    super(data, width)
    this.mirrorX = mirrorX
    this.mirrorY = mirrorY
  }
}

module.exports = Mask
