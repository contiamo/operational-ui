import * as React from "react"
import { Tile } from "@operational/components"

export const title = "Tiles"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/tile.md"

export const Component = () => (
  <React.Fragment>
    <Tile label="Label">Value</Tile>
  </React.Fragment>
)
