import * as React from "react"
import { withTooltip, Tooltip } from "contiamo-ui-components"

export default (function() {
  const MyDiv = (props: any) => <div style={{position: 'relative', width: 60, height: 60}} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>Hover for Spanish!</div>
  const MyDivWithTooltip = withTooltip(MyDiv)

  return <MyDivWithTooltip tooltip="Hola, compadre!" tooltipColor="#f00" tooltipAnchor="bottom" />
})()
