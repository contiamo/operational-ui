import * as React from "react"

import OperationalContext, { Context, IMessage, MessageType, WindowSize } from "./OperationalContext.init"

OperationalContext.displayName = "OperationalContext"

export interface Props {
  children: (operationalContext: Context) => undefined | React.ReactNode
}

/**
 * This component simply wraps OperationalContext in order to allow styleguidist to pick up on
 * it and display it in the documentation page.
 */
const OperationalContextWrapper: React.SFC<Props> = props => <OperationalContext>{props.children}</OperationalContext>

export default OperationalContextWrapper

export { Context, WindowSize, IMessage, MessageType }
