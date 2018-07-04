import * as React from "react"
import styled, { keyframes } from "react-emotion"
import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  color?: string
  size?: number
}

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

const defaultSize = 18

const Container = styled("div")(
  ({ size, color, theme }: { size?: number; color?: string; theme?: OperationalStyleConstants }) => ({
    label: "spinner",
    display: "inline-block",
    width: size || defaultSize,
    height: size || defaultSize,
    animation: `${spin} 1.5s infinite linear`,
    fill: expandColor(theme, color) || "currentColor",
  }),
)

const Spinner = (props: Props) => (
  <Container {...props}>
    <svg viewBox="0 0 100 100">
      <path d="M50,5L50,5c2.2,0,3.9,2.5,3.9,5.6v11.2c0,3.1-1.8,5.6-3.9,5.6l0,0c-2.2,0-3.9-2.5-3.9-5.6V10.6  C46.1,7.5,47.8,5,50,5z M81.8,18.2L81.8,18.2c1.5,1.5,1,4.6-1.2,6.8l-8,8c-2.2,2.2-5.2,2.7-6.8,1.2l0,0c-1.5-1.5-1-4.6,1.2-6.8l8-8  C77.3,17.2,80.3,16.6,81.8,18.2z M95,50L95,50c0,2.2-2.5,3.9-5.6,3.9H78.1c-3.1,0-5.6-1.8-5.6-3.9l0,0c0-2.2,2.5-3.9,5.6-3.9h11.2  C92.5,46.1,95,47.8,95,50z M81.8,81.8L81.8,81.8c-1.5,1.5-4.6,1-6.8-1.2l-8-8c-2.2-2.2-2.7-5.2-1.2-6.8l0,0c1.5-1.5,4.6-1,6.8,1.2  l8,8C82.8,77.3,83.4,80.3,81.8,81.8z M50,95L50,95c-2.2,0-3.9-2.5-3.9-5.6V78.1c0-3.1,1.8-5.6,3.9-5.6l0,0c2.2,0,3.9,2.5,3.9,5.6  v11.2C53.9,92.5,52.2,95,50,95z M18.2,81.8L18.2,81.8c-1.5-1.5-1-4.6,1.2-6.8l8-8c2.2-2.2,5.2-2.7,6.8-1.2l0,0  c1.5,1.5,1,4.6-1.2,6.8l-8,8C22.7,82.8,19.7,83.4,18.2,81.8z M5,50L5,50c0-2.2,2.5-3.9,5.6-3.9h11.2c3.1,0,5.6,1.8,5.6,3.9l0,0  c0,2.2-2.5,3.9-5.6,3.9H10.6C7.5,53.9,5,52.2,5,50z M18.2,18.2L18.2,18.2c1.5-1.5,4.6-1,6.8,1.2l8,8c2.2,2.2,2.7,5.2,1.2,6.8l0,0  c-1.5,1.5-4.6,1-6.8-1.2l-8-8C17.2,22.7,16.6,19.7,18.2,18.2z" />
    </svg>
  </Container>
)

export default Spinner
