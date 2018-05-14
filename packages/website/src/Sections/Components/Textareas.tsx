import * as React from "react"
import { Textarea } from "@operational/components"
import { Theme } from "@operational/theme"
import * as constants from "../../constants"
import { Subsection } from "../../components"

export const title = "Text Areas"

export const docsUrl = `${constants.docsBaseUrl}/components/textarea.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Textareas.tsx`

export const Component = () => (
  <>
    <Textarea
      value="Input field"
      label="Label"
      id="1234"
      hint="Hinty hint"
      error="Errory error"
      css={({ theme }: { theme: Theme }): {} => ({ width: "100%", height: theme.spacing * 15 })}
    />
  </>
)
