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
  opacity: 0.4,
  "&:hover": {
    opacity: 1
  }
})

class Demo extends React.Component {
  state = {
    step: 0
  }

  render() {
    return (
      <Container>
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ProcessFlowDemo />
        <div>
          <Breakdown number={1} label="Metric" fill={0.2}>
            Good!
          </Breakdown>
          <Breakdown number={2} label="Metric 2" fill={0.4}>
            Better!
          </Breakdown>
        </div>
      </Container>
    )
  }
}

export default Demo
