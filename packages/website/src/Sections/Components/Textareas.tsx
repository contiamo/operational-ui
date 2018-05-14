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
    <Subsection>
      <Textarea value="This text area has content" label="A simple text area" id="1234" hint="I am a hint" />
    </Subsection>
    <Subsection>
      <Textarea
        value="const a: string = 3;"
        code
        label="Text area for code"
        id="1234"
        hint="Add some typescript"
        error="Strings are more fun than numbers"
        css={({ theme }: { theme: Theme }): {} => ({ width: "100%", height: theme.spacing * 10 })}
      />
    </Subsection>
  </>
)
