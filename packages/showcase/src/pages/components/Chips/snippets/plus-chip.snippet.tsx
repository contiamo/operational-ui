import * as React from "react"
import { PlusChip } from "contiamo-ui-components"

export default
<div style={{ display: "flex" }}>
  <PlusChip color="#f0f" size={31} onClick={() => window.alert("Ouch!")} />

  <PlusChip color="#f00" size={31} onClick={() => window.alert("Smiling is healthy!")}>
      😁
  </PlusChip>
</div>
