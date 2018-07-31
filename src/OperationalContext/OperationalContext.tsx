import * as React from "react"

import {
  Context,
  default as OperationalContextOriginal,
  IMessage,
  MessageType,
  WindowSize,
} from "./OperationalContext.init"

export interface Props {
  children: (operationalContext: Context) => undefined | React.ReactNode
}

/**
 * This component simply wraps OperationalContext in order to allow styleguidist to pick up on
 * it and display it in the documentation page.
 */
const OperationalContext: React.SFC<Props> = props => (
  <OperationalContextOriginal>{props.children}</OperationalContextOriginal>
)

export default OperationalContext

export { Context, WindowSize, IMessage, MessageType }
