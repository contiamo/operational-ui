import * as React from "react"
import { Button, ButtonGroup } from "contiamo-ui-components"

export default (
  <div>
    <div style={{ display: "flex", marginTop: 16 }}>
      <Button color="info">Colored</Button>
      <Button modifiers={["space"]}>Spaced</Button>
      <Button modifiers={["space"]} disabled>
        Disabled
      </Button>
    </div>
    <div style={{ display: "flex", marginTop: 16 }}>
      <ButtonGroup>
        <Button>Group 1</Button>
        <Button active>Group 2</Button>
        <Button>Group 3</Button>
      </ButtonGroup>
    </div>
    <div style={{ display: "flex", marginTop: 16 }}>
      <ButtonGroup>
        <Button condensed>1</Button>
        <Button condensed color="#5F8E2C">
          2
        </Button>
        <Button condensed>3</Button>
      </ButtonGroup>
    </div>
  </div>
)
