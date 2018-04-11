import * as React from "react"
import { Tooltip } from "@operational/components"
import { Div } from "glamorous"

export default () => (
  <React.Fragment>
    <Div css={{ position: "relative", width: "fit-content" }}>
      <span>Difficult to understand</span>
      <Tooltip right>Helping</Tooltip>
    </Div>
  </React.Fragment>
)
