import * as React from "react"
import { Breakdown } from "contiamo-ui-components"

export default (
  <div>
    <Breakdown number={1} count={50} percentage="20%">
      Stat 1
    </Breakdown>
    <Breakdown number={2} count={200} percentage="40%">
      Stat 2
    </Breakdown>
    <Breakdown number={3} count={400} percentage="80%">
      Stat 3
    </Breakdown>
  </div>
)
