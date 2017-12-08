import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
}

const width: number = 120
const height: number = 45
const padding: number = 15

const Container = glamorous.div(
  {
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.8)"
  },
  ({ theme }: { theme?: Theme }) => ({
    zIndex: theme.baseZIndex + 300
  })
)

const Box = glamorous.div({
  width,
  height,
  padding,
  margin: "auto",
  boxShadow: "0px 1px 2px #d3d1d1",
  backgroundColor: "#FFFFFF"
})

const BarContainer = glamorous.div(
  {
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.colors.palette.grey30,
    border: `1px solid ${theme.colors.palette.grey20}`
  })
)

const fillProgress = css.keyframes({
  from: {
    transform: "translateX(-100%)"
  },
  to: {
    transform: "none"
  }
})

const Bar = glamorous.div(
  {
    height: "100%"
  },
  ({ theme }: { theme?: Theme }) => ({
    animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 30s`,
    backgroundColor: theme.colors.palette.success
  })
)

const Progress = (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    <Box>
      <BarContainer>
        <Bar />
      </BarContainer>
    </Box>
  </Container>
)

export default Progress
