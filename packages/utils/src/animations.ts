import { css } from "glamor"

const fadeIn = css.keyframes({
    to: {
      opacity: 1
    }
  }),
  resetTransform = css.keyframes({
    to: {
      transform: "none"
    }
  }),
  spin = css.keyframes({
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(359deg)"
    }
  })

export { fadeIn, resetTransform, spin }
