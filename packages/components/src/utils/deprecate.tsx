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
 * Typing caveats may arise. For functional components, the easiest fix is
 * to type them explicitly as React.SFC.
 */

function deprecate<P>(createWarning: (props: P) => string[]) {
  return (Component: React.ComponentType<P>): React.ComponentType<P> => {
    return class DeprecatedComponent extends React.Component<P> {
      componentDidMount() {
        const warnings = createWarning(this.props)

        if (process.env.NODE_ENV !== "production" && warnings.length > 0) {
          console.warn(`Operational UI deprecation warnings:\n  * ${warnings.join("\n  * ")}`)
        }
      }

      render() {
        return <Component {...this.props} />
      }
    }
  }
}

export default deprecate
