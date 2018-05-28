import * as React from "react"
import { Message } from "@operational/components"
import * as constants from "../../constants"

export const title = "Messages"

export const docsUrl = `${constants.docsBaseUrl}/#message`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Messages.tsx`

export const Component = () => (
  <>
    <Message>Keep your belongings in sight at all times.</Message>
  </>
)
