import * as React from "react"
import { Chip } from "@operational/components"
import * as constants from "../../constants"

export const title = "Chips"

export const docsUrl = `${constants.docsBaseUrl}/components/chip.md`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Chips.tsx`

export const Component = () => (
  <>
    <Chip icon="X" onIconClick={() => {}}>
      Simple
    </Chip>
    <Chip icon="X" color="white" onIconClick={() => {}}>
      Lighter
    </Chip>
    <Chip icon="X" color="#454545" onIconClick={() => {}}>
      Darker
    </Chip>
  </>
)
