# pixel-mask-generator

[![Travis](https://img.shields.io/travis/jojoee/pixel-mask-generator.svg)](https://travis-ci.org/jojoee/pixel-mask-generator)
[![Codecov](https://img.shields.io/codecov/c/github/jojoee/pixel-mask-generator.svg)](https://codecov.io/github/jojoee/pixel-mask-generator)
[![Version - npm](https://img.shields.io/npm/v/pixel-mask-generator.svg)](https://www.npmjs.com/package/pixel-mask-generator)
[![License - npm](https://img.shields.io/npm/l/pixel-mask-generator.svg)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Very inspired and copy some code from [zfedoran/pixel-sprite-generator](https://github.com/zfedoran/pixel-sprite-generator)

[![pixel-mask-generator - screenshot](https://raw.githubusercontent.com/jojoee/pixel-mask-generator/master/screenshot.jpg "pixel-mask-generator - screenshot")](https://jojoee.github.io/pixel-mask-generator/)

## Installation

```
// npm
npm install pixel-mask-generator --save
const pmg = require('pixel-mask-generator')

// Bower
bower install pixel-mask-generator --save
<script src="bower_components/pixel-mask-generator/dist/index.js"></script>
```

## Example usage

```javascript
const mask = new pmg.Mask([
  0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1,
  0, 0, 0, 0, 1, -1,
  0, 0, 0, 1, 1, -1,
  0, 0, 0, 1, 1, -1,
  0, 0, 1, 1, 1, -1,
  0, 1, 1, 1, 2, 2,
  0, 1, 1, 1, 2, 2,
  0, 1, 1, 1, 2, 2,
  0, 1, 1, 1, 1, -1,
  0, 0, 0, 1, 1, 1,
  0, 0, 0, 0, 0, 0
], 6, true, false)
const sprite = new pmg.Sprite(mask)
sprite.generate()

// resize and append
const resizedSpriteCanvasEle = pmg.util.resize(sprite.canvas, 10)
const body = document.body
body.appendChild(resizedSpriteCanvasEle)
```

## Note
- [x] Compatible with all browsers
- [ ] Unit test: add more tests
- [ ] Automated scripts: browser compatibility test
- [ ] Automated scripts: deploy to `gh-pages`
- [ ] Branch: split code from `master` and `gh-pages`
- [ ] Dependency: split `static/random.js` to another repository
- [ ] Dependency: split `resize` function to another repository
- [ ] Mask: add more masks
- [ ] Demo: update demo page
- [ ] Coverage: increase coverage threshold
- [ ] Article: copy original article into the repo, in case the site and mirror are down
- [ ] Algorithm: change algorithm toward to the original, should be symmetrical

## Contribute for owner

```
$ npm install -g semantic-release-cli
$ semantic-release-cli setup

Using above command to setup "semantic-release"
```

## Contribute
1. Fork the repo
2. Install `Node.js` and dependencies
3. Make a branch for your change and make your changes
4. Run `git add -A` to add your changes
5. Run `npm run commit` (don't use `git commit`)
6. Push your changes with `git push` then create Pull Request

## Reference
- [zfedoran/pixel-sprite-generator](https://github.com/zfedoran/pixel-sprite-generator)
- [blipn/pixel-sprite-generator-nodejs](https://github.com/blipn/pixel-sprite-generator-nodejs)
- [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
