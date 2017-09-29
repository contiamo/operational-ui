import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"

interface Props {
  paused?: boolean
  complete?: boolean
}

interface State {
  fillRatio: number
}

interface StyleProps {
  on: boolean
  theme: Theme
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
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.14)",
  backgroundColor: "#FFFFFF"
})

const BarContainer = glamorous.div(
  {
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },
  ({ theme }: { theme?: Theme }) => ({
    backgroundColor: theme.colors.grey50,
    border: `1px solid ${theme.colors.grey20}`
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
    backgroundColor: theme.colors.success
  })
)

const Progress = () => (
  <Container>
    <Box>
      <BarContainer>
        <Bar />
      </BarContainer>
    </Box>
  </Container>
)

export default Progress
