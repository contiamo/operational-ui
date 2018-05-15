import * as React from "react"
import { Tooltip } from "@operational/components"
import { Div } from "glamorous"
import * as constants from "../../constants"

export const title = "Tooltips"

export const docsUrl = `${constants.docsBaseUrl}/components/tooltip.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Tooltips.tsx`

export const Component = () => (
  <>
    <Div css={{ position: "relative", width: "fit-content" }}>
      <span>Difficult to understand</span>
      <Tooltip right>Helping</Tooltip>
    </Div>
  </>
)
