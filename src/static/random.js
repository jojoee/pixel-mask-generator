class random {
  /**
   * @param {number} min
   * @param {number} max
   * @returns {number} integer number
   */
  static int (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * @param {number} [min=0]
   * @param {number} [max=1]
   * @returns {number} float number
   */
  static float (min = 0, max = 1) {
    return Math.random() * (max - min) + min
  }

  /**
   * Get random boolean with likelihood
   *
   * @param {number} [likelihood=0.5]
   * @returns {boolean}
   */
  static bool (likelihood = 0.5) {
    return Math.random() <= likelihood
  }

  /**
   * @param {any[]} items
   * @returns {any}
   */
  static pick (items) {
    return items[this.int(0, items.length - 1)]
  }
}

module.exports = random
