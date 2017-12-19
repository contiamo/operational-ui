import * as React from "react"
import { Tooltip } from "@operational/components"

export default (
  <div
    style={{
      width: 120,
      height: 120,
      position: "relative",
      backgroundColor: "black",
      padding: 20,
      boxSizing: "border-box"
    }}
  >
    <p style={{ color: "white" }}>I am a box full of mysteries.</p>
    <Tooltip active color="#00f">
      I uncover them all.
    </Tooltip>
  </div>
)
