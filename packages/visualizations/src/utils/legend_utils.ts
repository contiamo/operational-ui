// Width of legend, rounded up to nearest full pixel
export const roundedUpWidth = (el: Element): number => {
  return Math.ceil(el.getBoundingClientRect().width)
}

// Height of legend, rounded up to nearest full pixel
export const roundedUpHeight = (el: Element): number => {
  return Math.ceil(el.getBoundingClientRect().height)
}

// Total width of left and right margins
export const widthMargin = (el: Element): number => {
  if (!el) {
    return 0
  }
  const style: CSSStyleDeclaration = window.getComputedStyle(el)
  return parseFloat(style.marginLeft) + parseFloat(style.marginRight)
}

// Total width of left and right padding
export const widthPadding = (el: Element): number => {
  if (!el) {
    return 0
  }
  const style: CSSStyleDeclaration = window.getComputedStyle(el)
  return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
}

// Total height of top and bottom margins
export const heightMargin = (el: Element): number => {
  if (!el) {
    return 0
  }
  const style: CSSStyleDeclaration = window.getComputedStyle(el)
  return parseFloat(style.marginTop) + parseFloat(style.marginBottom)
}

// Total legend width
export const totalWidth = (el: Element): number => {
  if (!el) {
    return 0
  }
  const style: CSSStyleDeclaration = window.getComputedStyle(el),
    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
  return roundedUpWidth(el) + widthMargin(el) - widthPadding(el) + border
}

// Total legend height
export const totalHeight = (el: Element): number => {
  if (!el) {
    return 0
  }
  const style = window.getComputedStyle(el),
    padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
    border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
  return roundedUpHeight(el) + heightMargin(el) - padding + border
}
