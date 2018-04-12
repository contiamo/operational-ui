import * as React from "react"
import { InfoTile } from "@operational/components"

export const title = "Info Tiles"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/info-tile.md"

export const Component = () => (
  <React.Fragment>
    <InfoTile label="Label">Value</InfoTile>
  </React.Fragment>
)
