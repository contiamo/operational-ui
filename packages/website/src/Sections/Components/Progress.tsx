import * as React from "react"
import { Progress } from "@operational/components"
import * as constants from "../../constants"

export const title = "Progress"

export const docsUrl = `${constants.docsBaseUrl}/#progress`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Progress.tsx`

export const Component = () => (
  <>
    <div style={{ position: "relative" }}>
      <Progress />
    </div>
  </>
)
