const dataKey = require('./../key/dataKey')
const maskKey = require('./../key/maskKey')
const Square = require('./../module/Square')
const random = require('./../static/random')
const objectAssign = require('object-assign')
const hsl2Rgb = require('hsl-to-rgb-for-reals')

class Sprite extends Square {
  constructor (mask, options = {}) {
    const width = mask.width * (mask.mirrorX ? 2 : 1)
    const height = mask.height * (mask.mirrorY ? 2 : 1)
    const data = new Array(width * height)
    super(data, width)

    // unchanged
    /** @type {Mask} */
    this.mask = mask
    this.options = objectAssign({
      colored: true,
      // 0 - 1
      colorVariations: 0.2,
      saturation: 0.5,

      edgeBrightness: 0.3,
      brightnessNoise: 0.3
    }, options)

    // others
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.ctx = this.canvas.getContext('2d')
  }

  reset () {
    this.data.fill(-1)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
   * Mirror the mask data horizontally
   *
   * @todo improve
   */
  mirrorX () {
    const h = this.height
    const w = Math.floor(this.width / 2)
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const x = this.width - i - 1
        const y = j
        const val = this.get(i, j)
        this.set(x, y, val)
      }
    }
  }

  /**
   * Mirror the mask data vertically
   *
   * @todo improve
   */
  mirrorY () {
    const h = Math.floor(this.height / 2)
    const w = this.width
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const x = i
        const y = this.height - j - 1
        const val = this.get(i, j)
        this.set(x, y, val)
      }
    }
  }

  /**
   * Using Mask to generate data,
   * if position value is
   * - maskKey.bodyOrEmpty  >> it can be "body" or "empty"
   * - maskKey.bodyOrBorder >> it can be "body" or "border"
   */
  generateSeed () {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        let val = this.get(i, j)

        switch (val) {
          case maskKey.bodyOrEmpty:
            val = random.pick([dataKey.body, dataKey.empty])
            break
          case maskKey.bodyOrBorder:
            val = random.pick([dataKey.body, dataKey.border])
            break
          default:
            break
        }

        this.set(i, j, val)
      }
    }
  }

  /**
   * Generate edge
   * if the position value is "body"
   * and nearby (top, left, right, bottom) is "empty"
   * then change it to "border"
   *
   * @todo improve
   */
  generateEdge () {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        const val = this.get(i, j)
        if (val === dataKey.body) {
          // top
          if (j - 1 >= 0 &&
            this.get(i, j - 1) === dataKey.empty) {
            this.set(i, j - 1, dataKey.border)
          }

          // bottom
          if (j + 1 < this.height &&
            this.get(i, j + 1) === dataKey.empty) {
            this.set(i, j + 1, dataKey.border)
          }

          // left
          if (i - 1 >= 0 &&
            this.get(i - 1, j) === dataKey.empty) {
            this.set(i - 1, j, dataKey.border)
          }

          // right
          if (i + 1 < this.width &&
            this.get(i + 1, j) === dataKey.empty) {
            this.set(i + 1, j, dataKey.border)
          }
        }
      }
    }
  }

  renderBlack () {
    let pixels = this.ctx.createImageData(this.width, this.height)
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        const val = this.get(i, j)
        if (val === dataKey.border) {
          const idx = (j * this.width + i) * 4
          pixels.data[idx + 0] = 0
          pixels.data[idx + 1] = 0
          pixels.data[idx + 2] = 0
          pixels.data[idx + 3] = 255
        }
      }
    }

    this.ctx.putImageData(pixels, 0, 0)
  }

  /**
   * Render color
   *
   * @todo improve
   */
  renderPixelData () {
    let pixels = this.ctx.createImageData(this.width, this.height)
    let hue = random.float()
    const isVerticalGradient = random.bool()
    const saturation = random.float() * this.options.saturation
    const ulen = (isVerticalGradient) ? this.height : this.width
    const vlen = (isVerticalGradient) ? this.width : this.height

    for (let u = 0; u < ulen; u++) {
      // new color
      const isNewColor = random.bool(this.options.colorVariations)
      if (isNewColor) hue = random.float()

      for (let v = 0; v < vlen; v++) {
        const val = (isVerticalGradient) ? this.get(v, u) : this.get(u, v)
        const idx = (isVerticalGradient) ? (u * vlen + v) * 4 : (v * ulen + u) * 4
        let rgb = [255, 255, 255]

        if (val !== dataKey.empty) {
          // fade lightness away towards the edges
          const lightness = Math.sin((u / ulen) * Math.PI) *
            (1 - this.options.brightnessNoise) +
            random.float(0, this.options.brightnessNoise)

          rgb = hsl2Rgb(hue * 255, saturation, lightness)

          if (val === dataKey.border) {
            rgb[0] *= this.options.edgeBrightness
            rgb[1] *= this.options.edgeBrightness
            rgb[2] *= this.options.edgeBrightness
          }
        }

        pixels.data[idx + 0] = rgb[0]
        pixels.data[idx + 1] = rgb[1]
        pixels.data[idx + 2] = rgb[2]
        pixels.data[idx + 3] = 255
      }
    }

    this.ctx.putImageData(pixels, 0, 0)
  }

  // ================================================================ public

  generate () {
    this.reset()

    // apply mask to this.data
    for (let j = 0; j < this.mask.height; j++) {
      for (let i = 0; i < this.mask.width; i++) {
        const idx = j * this.mask.width + i
        this.set(i, j, this.mask.data[idx])
      }
    }

    this.generateSeed()
    if (this.mask.mirrorX) this.mirrorX()
    if (this.mask.mirrorY) this.mirrorY()
    this.generateEdge()

    if (this.options.colored) {
      this.renderPixelData()
    } else {
      this.renderBlack()
    }
  }

  /**
   * @returns {Object}
   */
  getOption () {
    return this.options
  }

  /**
   * @returns {number[]}
   */
  getData () {
    return this.data
  }
}

module.exports = Sprite
