class Square {
  /**
   * @param {number[]} data
   * @param {number} width
   */
  constructor (data, width) {
    this.data = data
    this.width = width
    this.height = data.length / width
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {number}
   */
  get (x, y) {
    const idx = y * this.width + x
    return this.data[idx]
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {value}
   */
  set (x, y, value) {
    const idx = y * this.width + x
    this.data[idx] = value
  }

  /**
   * @returns {number[]}
   */
  getData () {
    return this.data
  }
}

module.exports = Square
