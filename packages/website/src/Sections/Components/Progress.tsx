import * as React from "react"
import { Progress } from "@operational/components"

export const title = "Progress"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/progress.md"

export const Component = () => (
  <React.Fragment>
    <div style={{ position: "relative" }}>
      <Progress />
    </div>
  </React.Fragment>
)
