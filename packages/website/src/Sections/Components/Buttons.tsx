import * as React from "react"
import { Button } from "@operational/components"
import * as constants from "../../constants"

export const title = "Buttons"

export const docsUrl = `${constants.docsBaseUrl}/components/button.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Buttons.tsx`

export const Component = () => (
  <>
    <Button>Simple</Button>
    <Button color="info">Standard Colors!</Button>
    <Button color="#4281A4">Custom Colors!</Button>
    <Button disabled>Disabled!</Button>
    <Button condensed>Condensed!</Button>
  </>
)
