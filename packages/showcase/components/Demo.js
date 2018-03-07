import * as React from "react"
import glamorous from "glamorous"
import { Button, ButtonGroup, Breakdown } from "@operational/components"

import ProcessFlowDemo from "./ProcessFlowDemo"

const Container = glamorous.div({
  label: "showcasedemo",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  padding: 40,
  position: "absolute",
  pointerEvents: "none",
  opacity: 0.25
})

class Demo extends React.Component {
  render() {
    return (
      <Container>
        <ProcessFlowDemo />
      </Container>
    )
  }
}

export default Demo
