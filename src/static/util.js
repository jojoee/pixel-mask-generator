const Square = require('./../module/Square')

/**
 * Utility function that's used in this project
 */
class Util {
  /**
   * Returns result Image or Canvas element
   * using nearest-neighbor interpolation
   *
   * @see http://phoboslab.org/log/2012/09/drawing-pixels-is-hard
   * @see https://en.wikipedia.org/wiki/Image_scaling
   * @see https://en.wikipedia.org/wiki/Comparison_gallery_of_image_scaling_algorithms
   * @param {HTMLCanvasElement} canvas
   * @param {number} scale positive number
   * @returns {HTMLCanvasElement}
   */
  static resize (canvas, scale) {
    const resultWidth = canvas.width * scale
    const resultHeight = canvas.height * scale

    const oriCanvas = document.createElement('canvas')
    const oriCtx = oriCanvas.getContext('2d')
    oriCanvas.width = canvas.width
    oriCanvas.height = canvas.height
    oriCtx.drawImage(canvas, 0, 0)
    let oriPixels = oriCtx.getImageData(0, 0, canvas.width, canvas.height)

    const resultCanvas = document.createElement('canvas')
    const resultCtx = resultCanvas.getContext('2d')
    resultCanvas.width = resultWidth
    resultCanvas.height = resultHeight
    let resultPixels = resultCtx.getImageData(0, 0, resultWidth, resultHeight)

    // proceed
    for (let j = 0; j < resultHeight; j++) {
      for (let i = 0; i < resultWidth; i++) {
        const x = Math.floor(i / scale)
        const y = Math.floor(j / scale)
        const index = (y * canvas.width + x) * 4
        const resultIndex = (j * resultWidth + i) * 4

        resultPixels.data[resultIndex] = oriPixels.data[index]
        resultPixels.data[resultIndex + 1] = oriPixels.data[index + 1]
        resultPixels.data[resultIndex + 2] = oriPixels.data[index + 2]
        resultPixels.data[resultIndex + 3] = oriPixels.data[index + 3]
      }
    }

    // place
    resultCtx.putImageData(resultPixels, 0, 0)

    return resultCanvas
  }

  /**
   * Return "data" prop also adding "newLine" item
   *
   * @todo improve algorithm
   * @param {Square} obj
   * @param {number} [newLine=9]
   * @return {number[]}
   */
  static square2Array (obj, newLine = 9) {
    let result = []

    for (let j = 0; j < obj.height; j++) {
      for (let i = 0; i < obj.width; i++) {
        const idx = obj.width * j + i
        const val = obj.data[idx]
        result.push(val)
      }
      result.push(newLine)
    }

    return result
  }

  /**
   * @param {Mask} mask
   * @param {number} [val=-1]
   * @returns {Square}
   */
  static mask2Square (mask, val = -1) {
    const width = mask.width * (mask.mirrorX ? 2 : 1)
    const height = mask.height * (mask.mirrorY ? 2 : 1)
    const data = new Array(width * height)
    const square = new Square(data, width)

    // set default data value
    square.data.fill(val)

    // apply mask to this.data
    for (let j = 0; j < mask.height; j++) {
      for (let i = 0; i < mask.width; i++) {
        const idx = j * mask.width + i
        square.set(i, j, mask.data[idx])
      }
    }

    return square
  }

  /**
   * @param {Mask} mask
   * @param {number} [val=-1]
   * @returns {number[]}
   */
  static mask2SquareData (mask, val = -1) {
    return this.mask2Square(mask, val).data
  }

  /**
   * Count number of element in array
   *
   * @see https://stackoverflow.com/questions/6120931/how-to-count-the-number-of-certain-element-in-an-array
   * @param {any[]} arr
   * @param {any} ele
   */
  static count (arr, val) {
    return arr.filter((x) => {
      return x === val
    }).length
  }
}

module.exports = Util
