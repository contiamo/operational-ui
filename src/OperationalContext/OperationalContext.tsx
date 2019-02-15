import * as React from "react"

export type MessageType = "info" | "success" | "error"

export interface IMessage {
  body: string
  type: MessageType
  onClick?: () => void
}

export interface Context {
  pushState?: (url: string) => void
  replaceState?: (url: string) => void
  pushMessage: (message: IMessage) => void
  loading: boolean
  setLoading: (isLoading: boolean) => void
}

/**
 * Defining a default context value here, used below when instantiating
 * the context consumer and provider below in order for context to be
 * correctly detected throughout the application.
 */
const defaultContext: Context = {
  pushState: undefined,
  replaceState: undefined,
  pushMessage: (_: IMessage) => void 0,
  loading: false,
  setLoading: (_: boolean) => void 0,
}

const ctx = React.createContext(defaultContext)

export const { Consumer: OperationalContext, Provider } = ctx

export const useOperationalContext = () => React.useContext(ctx)

export default OperationalContext
