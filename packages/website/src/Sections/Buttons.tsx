import * as React from "react"
import { Button } from "@operational/components"

export const title = "Buttons"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/button.md"

export const Component = () => (
  <React.Fragment>
    <Button>Simple</Button>
    <Button color="info">Standard Colors!</Button>
    <Button color="#4281A4">Custom Colors!</Button>
    <Button disabled>Disabled!</Button>
    <Button condensed>Condensed!</Button>
  </React.Fragment>
)
