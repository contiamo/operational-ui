import * as React from "react"
import styled, { keyframes } from "react-emotion"
import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** Color as color key or a custom CSS color string */
  color?: string
  /**
   * Spinner size
   *
   * @default 18px
   */
  size?: number
  /** Renders a bouncing animation as opposed to a regular spinning one. */
  bounce?: boolean
}

const spinKeyframes = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const bounceKeyframes = keyframes({
  "0%": {
    transform: "translate3d(0, 0, 0)",
  },
  "50%": {
    transform: "translate3d(0, -6px, 0)",
  },
  "100%": {
    transform: "translate3d(0, 0, 0)",
  },
})

const defaultSize = 18

const Container = styled("div")(
  ({
    size,
    color,
    bounce,
    theme,
  }: {
    size?: number
    color?: string
    bounce?: boolean
    theme?: OperationalStyleConstants
  }) => ({
    label: "spinner",
    display: "inline-block",
    width: size || defaultSize,
    height: size || defaultSize,
    ...(bounce
      ? {
          "& g:nth-child(1)": {
            animation: `${bounceKeyframes} 1.5s infinite linear`,
          },
          "& g:nth-child(2)": {
            animation: `${bounceKeyframes} 1.5s infinite linear`,
          },
          "& g:nth-child(3)": {
            animation: `${bounceKeyframes} 1.5s infinite linear`,
          },
        }
      : { animation: `${spinKeyframes} 1.5s infinite linear` }),
    fill: expandColor(theme, color) || "currentColor",
  }),
)

const RegularSpinner = () => (
  <svg viewBox="0 0 360 360">
    <path d="M160,0 L160,100 L200,100 L200,0Z" />
    <path d="M321.396,67.075l-70.697,70.697l-28.284,-28.284l70.697,-70.697c9.428,9.428 18.856,18.856 28.284,28.284Z" />
    <path d="M260,160 L360,160 L360,200 L260,200Z" />
    <path d="M321.853,292.842l-28.285,28.284l-69.71,-69.711l28.284,-28.284c23.237,23.237 46.474,46.474 69.711,69.711Z" />
    <path d="M160,260 L160,360 L200,360 L200,260Z" />
    <path d="M136.142,251.415l-69.71,69.711l-28.285,-28.284l69.711,-69.711c9.428,9.428 18.856,18.856 28.284,28.284Z" />
    <path d="M0,160 L100,160 L100,200 L0,200Z" />
    <path d="M137.592,109.495l-28.299,28.269l-70.659,-70.734l28.3,-28.269c23.553,23.578 47.105,47.156 70.658,70.734Z" />
  </svg>
)

const BouncingSpinner = (props: Props) => (
  <svg viewBox="0 0 360 360">
    <rect x="0" y="140" width="80" height="80" />
    <rect x="140" y="140" width="80" height="80" />
    <rect x="280" y="140" width="80" height="80" />
  </svg>
)

const Spinner = (props: Props) => (
  <Container {...props}>{props.bounce ? <BouncingSpinner /> : <RegularSpinner />}</Container>
)

export default Spinner
