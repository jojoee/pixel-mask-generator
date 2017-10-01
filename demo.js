const appEle = document.getElementById('app')
const boxTemplateEle = document.getElementById('box-template')
const spriteScale = 2
const spaceshipMask = new pmg.Mask([
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

const dragonMask = new pmg.Mask([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0,
  0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
  0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
], 12, false, false)

const robotMask = new pmg.Mask([
  0, 0, 0, 0,
  0, 1, 1, 1,
  0, 1, 2, 2,
  0, 0, 1, 2,
  0, 0, 0, 2,
  1, 1, 1, 2,
  0, 1, 1, 2,
  0, 0, 0, 2,
  0, 0, 0, 2,
  0, 1, 2, 2,
  1, 1, 0, 0
], 4, true, false)

/*
Test cases
1. back and white
2. color
3. color (low saturation)
4. color (high color variations)
5. mirror: no
6. mirror: mirror X
7. mirror: mirror Y
8. mirror: both
9. scale: 1
9. scale: 4
9. scale: 10
9. scale: 0.5

edgeBrightness ?
brightnessNoise ?
*/
const demos = [{
  title: 'ship',
  desc: '',
  mask: spaceshipMask,
  spriteOpt: {
    colored: false
  }
}, {
  title: 'Colored ship',
  desc: '',
  mask: spaceshipMask,
  spriteOpt: {}
}, {
  title: 'Colored ship + low saturation',
  desc: '',
  mask: spaceshipMask,
  spriteOpt: {
    saturation: 0.1
  }
}, {
  title: 'Colored ship + many color per ship',
  desc: '',
  mask: spaceshipMask,
  spriteOpt: {
    saturation: 1,
    colorVariations: 0.9 // // change color
  }
}, {
  title: 'Colored ship + brightnessNoise',
  desc: '',
  mask: spaceshipMask,
  spriteOpt: {
    brightnessNoise: 1,
    edgeBrightness: 0
  }
}, {
  title: 'Colored ship + edgeBrightness',
  desc: '',
  mask: spaceshipMask,
  spriteOpt: {
    edgeBrightness: 1
  }
}, {
  title: 'ship with hight edgeBrightness',
  desc: '',
  mask: spaceshipMask,
  spriteOpt: {
    colored: true,
    colorVariations: 0.9, // // change color
    saturation: 0.8, // color effect

    edgeBrightness: 0.3,
    brightnessNoise: 0.3
  }
}, {
  title: 'Colored dragon sprites',
  desc: '',
  mask: dragonMask,
  spriteOpt: {
    colored: true,
    colorVariations: 0.2,
    saturation: 0.5,

    edgeBrightness: 0.3,
    brightnessNoise: 0.3
  }
}, {
  title: 'Black & white robot sprites',
  desc: '',
  mask: robotMask,
  spriteOpt: {
    colored: false,
    edgeBrightness: 0.3,
    colorVariations: 0.2,
    brightnessNoise: 0.3,
    saturation: 0.5
  }
}]

for (let i = 0; i < demos.length; i++) {
  const nSprites = 10
  const demo = demos[i]
  const mask = demo.mask
  const spriteOpt = demo.spriteOpt
  const boxEle = document.createElement('div')
  const spritesEle = document.createElement('div')
  const lastSpriteEle = document.createElement('div')
  boxEle.classList = 'box'
  spritesEle.classList = 'sprites'
  lastSpriteEle.classList = 'last-sprite'

  // generate
  const sprite = new pmg.Sprite(mask, spriteOpt)
  let lastSprite = []
  for (let j = 0; j < nSprites; j++) {
    sprite.generate()
    /** @type {HTMLCanvasElement} */
    const resizedSpriteCanvasEle = pmg.util.resize(sprite.canvas, spriteScale)
    resizedSpriteCanvasEle.classList = 'sprite'
    spritesEle.appendChild(resizedSpriteCanvasEle)

    if (j === nSprites - 1) {
      lastSprite = sprite
      lastSpriteEle.appendChild(pmg.util.resize(sprite.canvas, 18))
    }
  }

  // template
  const source = boxTemplateEle.innerHTML
  const template = Handlebars.compile(source)
  const context = {
    title: demo.title,
    desc: demo.desc,
    // masks: mtil.square2Array(demo.mask),
    // masks: mtil.mask2DataArray(demo.mask),
    masks: pmg.util.square2Array(demo.mask),
    data: pmg.util.square2Array(lastSprite),
    spriteOpt: JSON.stringify(sprite.getOption(), null, 2)
  }

  const html = template(context)
  boxEle.innerHTML = html

  boxEle.appendChild(lastSpriteEle)
  boxEle.appendChild(spritesEle)
  appEle.appendChild(boxEle)
}
