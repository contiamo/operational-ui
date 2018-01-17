import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { Theme } from "@operational/theme"
import { hexOrColor, readableTextColor, darken, transparentize } from "@operational/utils"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
}

const spin = css.keyframes({
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.75)"
  }
})

const size = 30

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "spinner",
  margin: "auto",
  width: size,
  height: size,
  position: "relative",
  transform: "translateZ(0)"
}))

const animationTimeUnit: number = 0.6
const f: number = 0.25

const Element = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  fontSize: 0,
  width: size / 2 - 2,
  height: size / 2 - 2,
  display: "inline-block",
  lineHeight: 0,
  margin: 1,
  animationName: spin,
  animationDuration: `${animationTimeUnit}s`,
  animationTimingFunction: "ease-in-out",
  animationDirection: "alternate",
  animationIterationCount: "infinite",
  backgroundColor: theme.colors.info,
  // Increasing the negative animation delay clockwise
  "&:nth-child(1)": {
    animationDelay: "0s"
  },
  "&:nth-child(2)": {
    animationDelay: `${-1 * f * animationTimeUnit}s`
  },
  "&:nth-child(4)": {
    animationDelay: `${-2 * f * animationTimeUnit}s`
  },
  "&:nth-child(3)": {
    animationDelay: `${-3 * f * animationTimeUnit}s`
  }
}))

export default (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    <Element />
    <Element />
    <Element />
    <Element />
  </Container>
)
