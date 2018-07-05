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
  "30%": {
    transform: "translate3d(0, -4px, 0)",
  },
  "60%": {
    transform: "translate3d(0, 0, 0)",
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
    ...(bounce ? {} : { animation: `${spinKeyframes} 1.5s infinite linear` }),
    color: expandColor(theme, color) || "currentColor",
    "& svg": {
      fill: "currentColor",
    },
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

const BouncingSpinnerContainer = styled("div")({
  width: "100%",
  height: "100%",
  position: "relative",
})

/**
 * The bouncing spinner is constructed out of 3 80x80 boxes spaced out horizontally on a 360x360 grid (these units don't refer to pixels, they simply mimic the grid of the icons.
 * The math used in here lays these boxes out so they're vertically centered and spaced equally on the horizontal axis without any gutter.
 */
const BouncingSpinnerBox = styled("div")(({ no }: { no: number }) => ({
  width: `${(80 / 360) * 100}%`,
  height: `${(80 / 360) * 100}%`,
  position: "absolute",
  top: `${(140 / 360) * 100}%`,
  left: `${((no * 140) / 360) * 100}%`,
  backgroundColor: "currentColor",
  animation: `${bounceKeyframes} 1s infinite ease-in-out`,
  /*
   * Achieve the wave effect through incremental animation delays on the individual elements.
   */
  animationDelay: `${no * 0.16}s`,
}))

const BouncingSpinner = () => (
  <BouncingSpinnerContainer>
    <BouncingSpinnerBox no={0} />
    <BouncingSpinnerBox no={1} />
    <BouncingSpinnerBox no={2} />
  </BouncingSpinnerContainer>
)

const Spinner = (props: Props) => (
  <Container {...props}>{props.bounce ? <BouncingSpinner /> : <RegularSpinner />}</Container>
)

export default Spinner
