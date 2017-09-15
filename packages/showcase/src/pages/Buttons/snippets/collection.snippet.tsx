import * as React from "react"
import { Button } from "contiamo-ui-components"

export default (
  <div>
    <div style={{ display: "flex" }}>
      <Button color="#5F8E2C">Button 1</Button>
      <Button modifiers={["space"]}>Button 2</Button>
    </div>
    <div style={{ display: "flex", marginTop: 16 }}>
      <Button>Group 1</Button>
      <Button active modifiers={["group"]}>
        Group 2
      </Button>
      <Button modifiers={["group"]}>Group 3</Button>
    </div>
  </div>
)
