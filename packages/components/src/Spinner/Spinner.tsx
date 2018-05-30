import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken, transparentize } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  color?: string
}

const spin = css.keyframes({
  "0%": {
    transform: "scale(1)",
  },
  "100%": {
    transform: "scale(0.75)",
  },
})

const size = 20

const animationTimeUnit: number = 0.6
const f: number = 0.25

const Container = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  label: "spinner",
  width: size,
  height: size,
}))

const PulsingCube = glamorous.div(({ color, theme }: { theme: Theme; color?: string }): CssStatic => {
  const backgroundColor: string = expandColor(theme, color) || theme.colors.info
  return {
    backgroundColor,
    fontSize: 0,
    letterSpacing: 0,
    float: "left",
    wordSpacing: 0,
    width: size / 2 - 2,
    height: size / 2 - 2,
    margin: 1,
    animationName: spin,
    animationDuration: `${animationTimeUnit}s`,
    animationTimingFunction: "ease-in-out",
    animationDirection: "alternate",
    animationIterationCount: "infinite",
    // Increasing the negative animation delay clockwise
    "&:nth-child(1)": {
      animationDelay: "0s",
    },
    "&:nth-child(2)": {
      animationDelay: `${-1 * f * animationTimeUnit}s`,
    },
    "&:nth-child(4)": {
      animationDelay: `${-2 * f * animationTimeUnit}s`,
    },
    "&:nth-child(3)": {
      animationDelay: `${-3 * f * animationTimeUnit}s`,
    },
  }
})

const Spinner = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className} color={props.color}>
    {[0, 1, 2, 3].map(index => <PulsingCube key={index} color={props.color} />)}
  </Container>
)

export default Spinner
