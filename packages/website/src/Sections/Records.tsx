import * as React from "react"
import { Record } from "@operational/components"

export const title = "Records"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/record.md"

export const Component = () => (
  <React.Fragment>
    <Record title="Some title">This is content</Record>
  </React.Fragment>
)
