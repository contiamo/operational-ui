import * as React from "react"

/*
 * Deprecate a component.
 *
 * Usage:
 *
 * const Comp: React.SFC<Props> = props => (
 *   <div />
 * )
 * 
 * export default deprecate<Props>(props => [ 
 *   ...[ "Your component is deprecated" ],
 *   ...(props.oldProp ? [ "oldProp is deprecated, use newProp instead" ] : [])
 * ])(Comp)
 *
 */
function deprecate<P>(createWarning: (props: P) => string[]) {
  return (Component: React.ComponentType<P>): React.ComponentType<P> => {
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
}

export default deprecate
