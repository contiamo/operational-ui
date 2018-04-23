import * as React from "react"
import { Record, Button } from "@operational/components"

export const title = "Records"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/record.md"

export const Component = () => (
  <React.Fragment>
    <Record
      title="My Record"
      controls={
        <React.Fragment>
          <Button color="info" condensed>
            Details
          </Button>
          <Button condensed>Dismiss</Button>
        </React.Fragment>
      }
    >
      The record component is a compact and generic way to offer details about a resource, and to give it some controls.
    </Record>
  </React.Fragment>
)
