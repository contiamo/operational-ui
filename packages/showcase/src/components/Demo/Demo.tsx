import * as React from "react"
import glamorous from "glamorous"
import { Button, ButtonGroup, Breakdown } from "@operational/components"

import ProcessFlowDemo from "./ProcessFlowDemo"

interface IProps {}

interface IState {
  step: number
}

const Container = glamorous.div({
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  padding: 40,
  position: "absolute",
  opacity: 0.4
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
    let breakdownData: number[] = []
    if (this.state.step === 0) {
      breakdownData = [0.2, 0.4, 0.8]
    } else if (this.state.step === 1) {
      breakdownData = [0.4, 0.3, 0.1]
    } else {
      breakdownData = [0.7, 0.6, 0.3]
    }
    return (
      <Container>
        <ButtonGroup>
          {[0, 1, 2].map((no, index) => <Button active={this.state.step === index}>{`Dataset ${no + 1}`}</Button>)}
        </ButtonGroup>
        <ProcessFlowDemo step={this.state.step} />
        <div>
          {breakdownData.map((datum, index) => (
            <Breakdown key={index} color={datum < 0.3 ? "warning" : "info"} number={index + 1} label={""} fill={datum}>
              {`Metric ${index + 1}`}
            </Breakdown>
          ))}
        </div>
      </Container>
    )
  }
}

export default Demo
