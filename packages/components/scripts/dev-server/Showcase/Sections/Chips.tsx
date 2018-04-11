import * as React from "react"
import { Chip } from "@operational/components"

export default () => (
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
