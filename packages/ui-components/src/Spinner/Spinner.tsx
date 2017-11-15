import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { Theme } from "contiamo-ui-theme"

import { hexOrColor, readableTextColor, darken, transparentize } from "contiamo-ui-utils"

export interface IProps {
  key?: string | number
  css?: any
  className?: string
  color?: string
  size?: number | string
  spinDuration?: number
}

const spin = css.keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
})

const Container = glamorous.div(
  ({
    theme,
    color = "info",
    spinnerSize = 40,
    spinDuration = 2
  }: {
    theme: Theme
    color?: string
    spinnerSize?: string | number
    spinDuration?: number
  }): any => {
    const spinnerColor: string = hexOrColor(color)(theme.colors.palette[color] || "white") as string

    return {
      fontSize: "10px",
      margin: "auto",
      top: 50,
      textIndent: "-9999em",
      width: spinnerSize + (typeof spinnerSize === "string" ? "" : "px"),
      height: spinnerSize + (typeof spinnerSize === "string" ? "" : "px"),
      borderRadius: "50%",
      background: `linear-gradient(to right, ${spinnerColor} 10%, ${transparentize(spinnerColor)(100)} 42%)`,
      position: "relative",
      animation: `${spin} ${spinDuration}s infinite linear`,
      transform: "translateZ(0)",
      "&::before": {
        width: "50%",
        height: "50%",
        background: spinnerColor,
        borderRadius: "100% 0 0 0",
        position: "absolute",
        top: "0",
        left: "0",
        content: "''"
      },
      "&::after": {
        background: "white",
        width: "75%",
        height: "75%",
        borderRadius: "50%",
        content: "''",
        margin: "auto",
        position: "absolute",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0"
      }
    }
  }
)

const Spinner = ({ key, css, className, color, size, spinDuration }: IProps) => (
  <Container key={key} css={css} className={className} color={color} spinnerSize={size} spinDuration={spinDuration} />
)

export default Spinner
