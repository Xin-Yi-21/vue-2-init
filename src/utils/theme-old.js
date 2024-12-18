// 处理主题样式
export function handleThemeColor(themeColor) {
  // document.documentElement.style.setProperty('--el-color-primary', themeColor)
  document.documentElement.style.setProperty('--tc', themeColor)
  document.documentElement.style.setProperty('--bg-hover', `${getLightColor(themeColor, 6 / 10)}`)
  for (let i = 1; i <= 9; i++) {
    // document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(themeColor, i / 10)}`)
    document.documentElement.style.setProperty(`--tca${i}`, `${getAlphaColor(themeColor, i / 10)}`)
    document.documentElement.style.setProperty(`--tcl${i}`, `${getLightColor(themeColor, i / 10)}`)
    document.documentElement.style.setProperty(`--tcd${i}`, `${getDarkColor(themeColor, i / 10)}`)
  }
  // for (let i = 1; i <= 9; i++) {
  //   document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, `${getDarkColor(themeColor, i / 10)}`)
  //   document.documentElement.style.setProperty(`--tcd${i}`, `${getDarkColor(themeColor, i / 10)}`)
  // }
}

// 处理主题样式
export function handleThemeStyle(themeStyle) {
  // let ts = {
  //   'light': {},
  //   'dark': {},
  // }
  document.body.setAttribute('theme-style', themeStyle)
  // document.documentElement.style.setProperty('--el-color-primary', theme)
  // document.documentElement.style.setProperty('--tc', theme)
}

// hex颜色转rgb颜色
export function hexToRgb(str) {
  str = str.replace('#', '')
  let hexs = str.match(/../g)
  for (let i = 0; i < 3; i++) {
    hexs[i] = parseInt(hexs[i], 16)
  }
  return hexs
}

// rgb颜色转Hex颜色
export function rgbToHex(r, g, b) {
  let hexs = [r.toString(16), g.toString(16), b.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) {
      hexs[i] = `0${hexs[i]}`
    }
  }
  return `#${hexs.join('')}`
}

export function getAlphaColor(color, level,) {
  let rgb = hexToRgb(color)
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${level})`;
}
// 变浅颜色值
export function getLightColor(color, level) {
  let rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// 变深颜色值
export function getDarkColor(color, level) {
  let rgb = hexToRgb(color)
  for (let i = 0; i < 3; i++) {
    rgb[i] = Math.floor(rgb[i] * (1 - level))
  }
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}
