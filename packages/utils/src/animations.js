// @flow
import { css } from "glamor"

const fadeIn: string = css.keyframes({
  to: {
    opacity: 1
  }
}),
  resetTransform: string = css.keyframes({
    to: {
      transform: "none"
    }
  }),
  spin: string = css.keyframes({
    from: {
      transform: "rotate(0deg)"
    },
    to: {
      transform: "rotate(359deg)"
    }
  })

export { fadeIn, resetTransform, spin }
