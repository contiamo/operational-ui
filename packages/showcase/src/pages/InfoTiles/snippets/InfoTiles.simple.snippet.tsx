import * as React from "react"
import { InfoTile } from "@contiamo/ui"

export default (
  <div style={{ display: "flex" }}>
    <InfoTile
      label="Use Cases"
      icon="ChevronLeft"
      onIconClick={() => {
        alert("Oh hello!")
      }}
    >
      Infinite
    </InfoTile>
    <InfoTile label="Potential">Unlimited</InfoTile>
    <InfoTile color="#009de8" label="Cool Factor">
      > 10
    </InfoTile>
  </div>
)
