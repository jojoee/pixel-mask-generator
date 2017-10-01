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
}

module.exports = Square
