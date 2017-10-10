// Shims requestAnimationFrame for Jest tests (required since React@16)
global.requestAnimationFrame = next => {
  setTimeout(next, 0)
}
