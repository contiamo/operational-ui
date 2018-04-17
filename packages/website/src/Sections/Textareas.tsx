import * as React from "react"
import { Textarea } from "@operational/components"

import { Subsection } from "../components"

export const title = "Textareas"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/textarea.md"

export const Component = () => (
  <React.Fragment>
    <Textarea value="Input field" label="Label" id="1234" hint="Hinty hint" error="Errory error" />
  </React.Fragment>
)
