import * as React from "react"
import { Breakdown } from "@operational/components"

export default (
  <div>
    <Breakdown number={1} label="50 (20%)" fill={0.2}>
      Stat 1
    </Breakdown>
    <Breakdown number={2} label="20 (40%)" fill={0.4}>
      Stat 2
    </Breakdown>
    <Breakdown number={3} label="40 (80%)" fill={0.8}>
      Stat 3
    </Breakdown>
  </div>
)
