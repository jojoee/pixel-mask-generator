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
   * @todo improve algorithm
   * @param {Square} obj
   * @param {string} [newLine=\n]
   * @return {string}
   */
  square2String (obj, newLine = '\n') {
    let result = ''

    for (let j = 0; j < obj.height; j++) {
      for (let i = 0; i < obj.width; i++) {
        const idx = obj.width * j + i
        const val = obj.data[idx]
        result += val
      }
      result += newLine
    }

    return result
  }

  /**
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
}

module.exports = Util
