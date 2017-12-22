import * as React from "react"
import glamorous from "glamorous"
import { Button, ButtonGroup, Breakdown } from "@operational/components"

import ProcessFlowDemo from "./ProcessFlowDemo"

interface IProps {}

interface IState {
  step: number
}

const Container = glamorous.div({
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  padding: 40,
  position: "absolute",
  pointerEvents: "none",
  opacity: 0.25
})

class Demo extends React.Component<IProps, IState> {
  state = {
    step: 0
  }

  interval?: {}

  constructor(props: IProps) {
    super(props)
    this.shiftStep = this.shiftStep.bind(this)
  }

  shiftStep() {
    this.setState(prevState => ({
      step: (this.state.step + 1) % 3
    }))
  }

  componentDidMount() {
    this.interval = setInterval(this.shiftStep, 2500)
  }

  componentWillUnmount() {
    clearInterval(this.interval as any)
  }

  render() {
    return (
      <Container>
        <ProcessFlowDemo step={this.state.step} />
      </Container>
    )
  }
}

export default Demo
