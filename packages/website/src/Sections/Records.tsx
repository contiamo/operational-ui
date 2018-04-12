import * as React from "react"
import { Record, RecordHeader, RecordBody } from "@operational/components"

export const title = "Records"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/record.md"

export const Component = () => (
  <React.Fragment>
    <Record>
      <RecordHeader>Header</RecordHeader>
      <RecordBody>Some body</RecordBody>
    </Record>
  </React.Fragment>
)
