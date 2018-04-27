import * as React from "react"
import { Chip } from "@operational/components"

export const title = "Chips"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/chip.md"

export const Component = () => (
  <React.Fragment>
    <Chip icon="X" onIconClick={() => {}}>
      Simple
    </Chip>
    <Chip icon="X" color="white" onIconClick={() => {}}>
      Lighter
    </Chip>
    <Chip icon="X" color="#454545" onIconClick={() => {}}>
      Darker
    </Chip>
  </React.Fragment>
)
