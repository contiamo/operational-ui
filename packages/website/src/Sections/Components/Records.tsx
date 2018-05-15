import * as React from "react"
import { Record, Button } from "@operational/components"
import * as constants from "../../constants"

export const title = "Records"

export const docsUrl = `${constants.docsBaseUrl}/components/record.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Records.tsx`

export const Component = () => (
  <>
    <Record
      title="My Record"
      controls={
        <>
          <Button color="info" condensed>
            Details
          </Button>
          <Button condensed>Dismiss</Button>
        </>
      }
    >
      The record component is a compact and generic way to offer details about a resource, and to give it some controls.
    </Record>
  </>
)
