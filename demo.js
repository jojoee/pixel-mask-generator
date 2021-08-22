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

const squareMask = new pmg.Mask([
  0, 0, 0, 0,
  0, 1, 1, 1,
  0, 1, 1, 1,
  0, 1, 1, 1
], 4, true, true)

const roundedMask = new pmg.Mask([
  0, 0, 0, 0,
  0, 0, 1, 1,
  0, 1, 1, 1,
  0, 1, 1, 1
], 4, true, true)

const saberMask = new pmg.Mask([
  0, 1, 0,
  1, -1, 0,
  1, -1, 1,
  1, -1, 1,
  1, -1, 1,
  1, -1, 1,
  1, -1, 1,
  0, -1, 0
], 3, false, true)

const demos = [{
  title: 'ship',
  desc: 'test non-colored',
  mask: spaceshipMask,
  spriteOpt: {
    colored: false
  }
}, {
  title: 'Colored ship',
  desc: 'test colored',
  mask: spaceshipMask
}, {
  title: 'Colored ship with seed',
  desc: 'test colored with seed',
  seed: 'test-colored-seedrandom',
  mask: spaceshipMask
}, {
  title: 'Low saturation colored ship',
  desc: 'test low saturation',
  mask: spaceshipMask,
  spriteOpt: {
    saturation: 0.1
  }
}, {
  title: 'Many color ship',
  desc: 'test colorVariations',
  mask: spaceshipMask,
  spriteOpt: {
    saturation: 1,
    colorVariations: 0.9
  }
}, {
  title: 'Noise ship',
  desc: 'test brightnessNoise',
  mask: spaceshipMask,
  spriteOpt: {
    brightnessNoise: 1
  }
}, {
  title: 'No-border ship',
  desc: 'test edgeBrightness',
  mask: spaceshipMask,
  spriteOpt: {
    edgeBrightness: 1
  }
}, {
  title: 'Dragon',
  desc: 'test mirrorX, mirrorY',
  mask: dragonMask
}, {
  title: 'Square',
  desc: 'test mirrorX, mirrorY',
  mask: squareMask
}, {
  title: 'Robot',
  desc: 'test mirrorX',
  mask: robotMask
}, {
  title: 'Saber',
  desc: 'test mirrorY',
  mask: saberMask
}, {
  title: 'Seed',
  desc: 'test seed (all must be the same)',
  seed: 'test-seedrandom',
  mask: squareMask
}, {
  title: 'Rounded',
  desc: 'test roundedMask',
  mask: roundedMask
}]

for (let i = 0; i < demos.length; i++) {
  const nSprites = 300
  const demo = demos[i]
  const boxEle = document.createElement('div')
  const spriteWrapperEle = document.createElement('div')
  const spritesEle = document.createElement('div')
  const lastSpriteEle = document.createElement('div')
  boxEle.classList = 'col-md-12 box'
  spriteWrapperEle.classList = 'col-md-9 sprite-wrapper'
  spritesEle.classList = 'sprites'
  lastSpriteEle.classList = 'last-sprite'

  // generate
  const sprite = new pmg.Sprite(demo.mask, demo.spriteOpt)
  let lastSprite = []
  for (let j = 0; j < nSprites; j++) {
    // hack, apply seed
    if (demo.seed) Math.seedrandom(demo.seed)

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
  const hdbSource = boxTemplateEle.innerHTML
  const hdbTemplate = Handlebars.compile(hdbSource)
  const nMaskBodyOrEmpty = pmg.util.count(demo.mask.data, pmg.maskKey.bodyOrEmpty)
  const nMaskBodyOrBorder = pmg.util.count(demo.mask.data, pmg.maskKey.bodyOrBorder)
  const nPossibility = Math.pow(2, nMaskBodyOrEmpty + nMaskBodyOrBorder)
  const hdbContext = {
    id: demo.title.replace(/ /g, '-').toLowerCase(),
    title: demo.title,
    desc: demo.desc,
    nPossibility: nPossibility.toLocaleString('en'),
    masks: pmg.util.square2Array(
      pmg.util.mask2Square(demo.mask, 8)
    ),
    data: pmg.util.square2Array(lastSprite),
    spriteOpt: JSON.stringify(sprite.getOption(), null, 2)
  }

  boxEle.innerHTML = hdbTemplate(hdbContext)
  spriteWrapperEle.appendChild(lastSpriteEle)
  spriteWrapperEle.appendChild(spritesEle)
  boxEle.appendChild(spriteWrapperEle)
  appEle.appendChild(boxEle)
}
