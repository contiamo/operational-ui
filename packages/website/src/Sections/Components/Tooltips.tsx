import * as React from "react"
import { Tooltip } from "@operational/components"
import { Div } from "glamorous"

export const title = "Tooltips"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/tooltip.md"

export const Component = () => (
  <React.Fragment>
    <Div css={{ position: "relative", width: "fit-content" }}>
      <span>Difficult to understand</span>
      <Tooltip right>Helping</Tooltip>
    </Div>
  </React.Fragment>
)
