export const roundedUpWidth = (el: any): number => {
  return Math.ceil(el.getBoundingClientRect().width)
}

export const roundedUpHeight = (el: any): number => {
  return Math.ceil(el.getBoundingClientRect().height)
}

export const widthMargin = (el: any): number => {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el)
  return parseFloat(style.marginLeft) + parseFloat(style.marginRight)
}

export const widthPadding = (el: any): number => {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el)
  return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
}

export const heightMargin = (el: any): number => {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el)
  return parseFloat(style.marginTop) + parseFloat(style.marginBottom)
}

export const totalWidth = (el: any): number => {
  if (!el) {
    return 0
  }
  const style: any = window.getComputedStyle(el),
    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
  return roundedUpWidth(el) + widthMargin(el) - widthPadding(el) + border
}

export const totalHeight = (el: any): number => {
  if (!el) {
    return 0
  }
  const style = window.getComputedStyle(el),
    padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
    border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  return roundedUpHeight(el) + heightMargin(el) - padding + border
}
