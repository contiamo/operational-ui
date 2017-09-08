import { css } from "glamor"

// @todo -> type this better
const x = css as any

const fadeIn = x.keyframes({
    to: {
      opacity: 1,
    },
  }),
  resetTransform = x.keyframes({
    to: {
      transform: "none",
    },
  }),
  spin = x.keyframes({
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(359deg)",
    },
  })

export { fadeIn, resetTransform, spin }
