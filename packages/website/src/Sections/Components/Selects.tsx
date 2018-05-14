import * as React from "react"
import { Select } from "@operational/components"
import * as constants from "../../constants"

export const title = "Selects"

export const docsUrl = `${constants.docsBaseUrl}/components/select.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Selects.tsx`

export const Component = () => (
  <>
    <Select label="Select Label" options={[{ value: "Option 1" }, { value: "Option 2" }]} value="Option 1" />
  </>
)
