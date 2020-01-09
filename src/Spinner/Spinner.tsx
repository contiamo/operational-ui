import { keyframes } from "@emotion/react"
import * as React from "react"

import { DefaultProps } from "../types"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"

export interface SpinnerProps extends DefaultProps {
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
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
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

const Container = styled("div")<{
  size?: number
  color?: string
  bounce?: boolean
  left?: boolean
  right?: boolean
}>(({ size, color, theme, left, right }) => ({
  display: "inline-block",
  width: size || defaultSize,
  height: size || defaultSize,
  marginRight: left ? theme.space.small : 0,
  marginLeft: right ? theme.space.small : 0,
  "& svg": {
    fill: expandColor(theme, color) || "currentColor",
  },
}))

/**
 * This additional container is introduced to make transforms set on the main container from the outside
 * (e.g. `styled` helper) do not mess up the rotation origin.
 */
const AnimationContainer = styled("div")<{ bounce: SpinnerProps["bounce"]; size: SpinnerProps["size"] }>(
  ({ bounce, size }: { bounce?: boolean; size?: number }) => ({
    margin: 0,
    lineHeight: 0,
    width: size || defaultSize,
    height: size || defaultSize,
    transformOrigin: "center center",
    /*
     * When the bounce animation is used, animation properties are set on the individual bouncing squares,
     * therefore no animation is set on the container.
     */
    animation: bounce ? "none" : `${spinKeyframes} 1.5s infinite linear`,
  }),
)

const RegularSpinner = (_: { color?: SpinnerProps["color"] }) => (
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
 * The bouncing spinner is constructed out of 3 80x80 boxes spaced out horizontally on a 360x360 grid
 * (these units don't refer to pixels, they simply mimic the grid of the icons.
 * The math used in here lays these boxes out so they're vertically centered and spaced
 * equally on the horizontal axis without any gutter.
 */
const BouncingSpinnerBox = styled("div")<{ no: number; color?: SpinnerProps["color"] }>(({ no, theme, color }) => ({
  width: `${(80 / 360) * 100}%`,
  height: `${(80 / 360) * 100}%`,
  position: "absolute",
  top: `${(140 / 360) * 100}%`,
  left: `${((no * 140) / 360) * 100}%`,
  backgroundColor: expandColor(theme, color) || theme.color.text.lighter,
  animation: `${bounceKeyframes} 1s infinite ease-in-out`,
  /*
   * Achieve the wave effect through incremental animation delays on the individual elements.
   */
  animationDelay: `${no * 0.16}s`,
}))

const BouncingSpinner = (props: SpinnerProps) => (
  <BouncingSpinnerContainer>
    <BouncingSpinnerBox color={props.color} no={0} />
    <BouncingSpinnerBox color={props.color} no={1} />
    <BouncingSpinnerBox color={props.color} no={2} />
  </BouncingSpinnerContainer>
)

const Spinner: React.SFC<SpinnerProps> = props => (
  <Container {...props}>
    <AnimationContainer bounce={props.bounce} size={props.size}>
      {props.bounce ? <BouncingSpinner color={props.color} /> : <RegularSpinner color={props.color} />}
    </AnimationContainer>
  </Container>
)

export default Spinner
