import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

type Props = {
  paused?: boolean
  complete?: boolean
}

type State = {
  fillRatio: number
}

type StyleProps = {
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
  ({ theme }: { theme: Theme }) => ({
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
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.colors.grey50,
    border: `1px solid ${theme.colors.grey20}`
  })
)

const Bar = glamorous.div(
  {
    height: "100%"
  },
  ({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.colors.success
  })
)

class Progress extends React.Component<Props, State> {
  state = {
    fillRatio: 0
  }

  tick(): void {
    this.setState(prevState => ({
      fillRatio: prevState.fillRatio + 0.01
    }))
  }

  shouldTick(): boolean {
    const maxFillRatio = this.props.complete ? 1 : 0.8
    return !this.props.paused && this.state.fillRatio <= maxFillRatio
  }

  componentDidMount() {
    if (this.shouldTick()) {
      window.requestAnimationFrame(this.tick.bind(this))
    }
  }

  componentDidUpdate() {
    if (this.shouldTick()) {
      window.requestAnimationFrame(this.tick.bind(this))
    }
  }

  render() {
    return (
      <Container>
        <Box>
          <BarContainer>
            <Bar style={{ transform: `translateX(${-100 * (1 - this.state.fillRatio)}%)` }} />
          </BarContainer>
        </Box>
      </Container>
    )
  }
}

export default Progress
