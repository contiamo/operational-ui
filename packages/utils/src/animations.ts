import { css } from "glamor"
const fadeIn = css.keyframes({
  from: {
    opacity: 0,
    transform: "translate3d(0, -6px, 0)"
  },
  to: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)"
  }
})

const resetTransform = css.keyframes({
  to: {
    transform: "none"
  }
})
const spin = css.keyframes({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(359deg)"
  }
})

export { fadeIn, resetTransform, spin }
