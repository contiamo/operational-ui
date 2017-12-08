import * as React from "react"
import { InfoTile } from "@operational/components"

export default (
  <div>
    <InfoTile
      color="info"
      label="Use Cases"
      icon="AlertCircle"
      onAction={() => {
        alert("Oh hello!")
      }}
    >
      Infinite
    </InfoTile>
    <InfoTile label="Potential">Unlimited</InfoTile>
    <InfoTile color="info" label="Cool Factor">
      > 10
    </InfoTile>
  </div>
)
