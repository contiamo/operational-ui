import * as React from "react"

export interface WindowSize {
  width: number
  height: number
}

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
  windowSize: WindowSize
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
  windowSize: {
    width: 1080,
    height: 640,
  },
  loading: false,
  setLoading: (_: boolean) => void 0,
}

const { Provider, Consumer: OperationalContext } = React.createContext(defaultContext)

export default OperationalContext

export { Provider }
