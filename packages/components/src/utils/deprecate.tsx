import * as React from "react"

type P = any

const deprecate = (createWarning: (props: P) => string[]) => (
  Component: React.StatelessComponent<P>
): React.StatelessComponent<P> => {
  let logCount = 0
  return (props: P) => {
    const deprecation = createWarning(props)
    if (process.env.NODE_ENV === "development" && deprecation.length > 0 && logCount === 0) {
      console.log(`Operational UI warnings:\n\n  * ${deprecation.join("\n  * ")}`)
      logCount = logCount + 1
    }
    return <Component {...props} />
  }
}

export default deprecate
