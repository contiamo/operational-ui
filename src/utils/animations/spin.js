import { css } from "glamor"

const spin: string = css.keyframes({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(359deg)"
  }
})

export default spin
