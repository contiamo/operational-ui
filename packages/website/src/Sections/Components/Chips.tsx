import * as React from "react"
import { Chip } from "@operational/components"
import * as constants from "../../constants"

export const title = "Chips"

export const docsUrl = `${constants.docsBaseUrl}/#chip`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Chips.tsx`

export const Component = () => (
  <>
    <Chip icon="X" onIconClick={() => {}}>
      Default color
    </Chip>
    <Chip icon="X" colorIndex="1" onIconClick={() => {}}>
      2nd default color
    </Chip>
    <Chip icon="X" color="#454545" onIconClick={() => {}}>
      Custom color
    </Chip>
  </>
)
