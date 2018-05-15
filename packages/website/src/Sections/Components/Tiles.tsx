import * as React from "react"
import { Tile } from "@operational/components"
import * as constants from "../../constants"

export const title = "Tiles"

export const docsUrl = `${constants.docsBaseUrl}/components/tile.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Tiles.tsx`

export const Component = () => (
  <>
    <Tile label="Label">Value</Tile>
  </>
)
