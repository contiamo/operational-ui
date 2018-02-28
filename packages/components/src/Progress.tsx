import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string | number
  css?: any
  className?: string
  fadeParent?: boolean
}

const width: number = 120
const height: number = 45
const padding: number = 15

const Container = glamorous.div(
  {
    label: "progress",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    top: 0,
    left: 0,
    position: "absolute"
  },
  ({ theme, fadeParent }: { theme: Theme; fadeParent: boolean }) => ({
    zIndex: theme.baseZIndex + 300,
    backgroundColor: fadeParent ? "rgba(255, 255, 255, 0.8)" : "transparent"
  })
)

const fillProgress = css.keyframes({
  from: {
    transform: "translate3d(-100%, 0, 0)"
  },
  to: {
    transform: "translate3d(0, 0, 0)"
  }
})

const Bar = glamorous.div(
  {
    width: "100%",
    height: 3
  },
  ({ theme }: { theme?: Theme }) => ({
    animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 30s`,
    backgroundColor: theme.colors.info
  })
)

export default (props: Props) => (
  <Container key={props.id} css={props.css} className={props.className} fadeParent={!!props.fadeParent}>
    <Bar />
  </Container>
)
