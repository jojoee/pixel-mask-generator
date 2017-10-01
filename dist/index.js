(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pmg"] = factory();
	else
		root["pmg"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(2)
const Mask = __webpack_require__(8)
const maskKey = __webpack_require__(4)
const util = __webpack_require__(9)

module.exports = {
  Sprite,
  Mask,
  maskKey,
  util
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const dataKey = __webpack_require__(3)
const maskKey = __webpack_require__(4)
const Square = __webpack_require__(0)
const random = __webpack_require__(5)
const util = __webpack_require__(9)
const objectAssign = __webpack_require__(6)
const hsl2Rgb = __webpack_require__(7)

class Sprite extends Square {
  /**
   * @param {Mask} mask
   * @param {Option} [options={}]
   */
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
    // reset
    this.data = util.mask2SquareData(this.mask, -1)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // generate
    this.generateSeed()
    if (this.mask.mirrorX) this.mirrorX()
    if (this.mask.mirrorY) this.mirrorY()
    this.generateEdge()

    // render
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
}

module.exports = Sprite


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const dataKey = {
  border: -1,
  empty: 0,
  body: 1
}

module.exports = dataKey


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const maskKey = {
  border: -1,
  empty: 0,
  bodyOrEmpty: 1,
  bodyOrBorder: 2
}

module.exports = maskKey


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// expected hue range: [0, 360)
// expected saturation range: [0, 1]
// expected lightness range: [0, 1]
var hslToRgb = function(hue, saturation, lightness){
  // based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
  if( hue == undefined ){
    return [0, 0, 0];
  }

  var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
  var huePrime = hue / 60;
  var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  huePrime = Math.floor(huePrime);
  var red;
  var green;
  var blue;

  if( huePrime === 0 ){
    red = chroma;
    green = secondComponent;
    blue = 0;
  }else if( huePrime === 1 ){
    red = secondComponent;
    green = chroma;
    blue = 0;
  }else if( huePrime === 2 ){
    red = 0;
    green = chroma;
    blue = secondComponent;
  }else if( huePrime === 3 ){
    red = 0;
    green = secondComponent;
    blue = chroma;
  }else if( huePrime === 4 ){
    red = secondComponent;
    green = 0;
    blue = chroma;
  }else if( huePrime === 5 ){
    red = chroma;
    green = 0;
    blue = secondComponent;
  }

  var lightnessAdjustment = lightness - (chroma / 2);
  red += lightnessAdjustment;
  green += lightnessAdjustment;
  blue += lightnessAdjustment;

  return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];

};

module.exports = hslToRgb;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Square = __webpack_require__(0)

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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Square = __webpack_require__(0)

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


/***/ })
/******/ ]);
});