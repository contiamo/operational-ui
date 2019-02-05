import * as React from "react"

import { Context, IMessage, MessageType, useOperationalContext, WindowSize } from "./OperationalContext.init"

export interface Props {
  children: (operationalContext: Context) => undefined | React.ReactNode
}

/**
 * This component simply wraps OperationalContext in order to allow styleguidist to pick up on
 * it and display it in the documentation page.
 */
const OperationalContext: React.SFC<Props> = props => {
  const ctx = useOperationalContext()
  return <React.Fragment>{props.children({ ...ctx })}</React.Fragment>
}

export default OperationalContext

export { Context, WindowSize, IMessage, MessageType, useOperationalContext }
