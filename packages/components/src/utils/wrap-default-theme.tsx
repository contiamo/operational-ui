import * as React from "react"
import OperationalUI from "../OperationalUI/OperationalUI" // Wrap each ui component in its own theme provider to make sure the default
// Contiamo theme is always available. Props are passed along unaltered.

function wrapDefaultTheme<T>(Comp: React.ComponentType<T>): React.SFC<T> {
  return (props: T) => (
    <OperationalUI>
      <Comp {...props} />
    </OperationalUI>
  )
}

export default wrapDefaultTheme
