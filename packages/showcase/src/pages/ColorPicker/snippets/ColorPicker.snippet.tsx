import * as React from "react"
import { ColorPicker } from "contiamo-ui-components"

export default (
  <div>
    <ColorPicker
      color="#222"
      onChange={
          color => {
            window.dispatchEvent(
              new CustomEvent(
                "colorChange",
                { detail: color }
              )
            )
          }
        }
    />
    <br />
    Click above for fun times!
  </div>
)
