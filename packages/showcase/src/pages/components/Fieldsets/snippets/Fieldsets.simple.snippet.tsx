import * as React from "react"
import { Fieldset } from "contiamo-ui-components"

// Run any code inside the IIFE, as long as a React element is returned
// (you do not need the IIFE, but it is useful to define simple state containers for stateless components)
export default (() => {
  const value = "Hello"

  return (
    <div>
      <Fieldset value={value} />
    </div>
  )
})()
