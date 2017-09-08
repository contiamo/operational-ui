import * as React from "react"
import { Chip } from "contiamo-ui-components"

export default
<div style={{ display: "flex" }}>
  {/* These work well in a flex-ed parent */}
  <Chip color="#006847">Hola</Chip>
  <Chip color="#fff">Compadre</Chip>

  <Chip color="#CE1126" symbol="!" onClick={() => window.alert("Muy bien!")}>
      Como estas?
  </Chip>
  {/* onClick can do literally anything you want it to */}
</div>
