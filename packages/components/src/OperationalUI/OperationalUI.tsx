import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"

import constants, { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"
import { MessageType, Context } from "../types"

import Messages from "../Messages/Messages"
import Message from "../Message/Message"

export interface Props {
  /** Children */
  children?: React.ReactNode
  /** Custom push state method expecting a single string */
  pushState?: (path: string) => void
  /** Custom replace state method expecting a single string */
  replaceState?: (path: string) => void
  /**
   * A time interval after which a non-error message is automatically cleared, measured in milliseconds. If the value set is `0`, no message will disappear.
   *
   * @default 10000 (10s)
   */
  hideMessageAfter?: number
}

export interface State {
  messages: {
    message: {
      body: string
      type: MessageType
    }
    addedAt: number
  }[]
}

const colorByMessageType = (type: MessageType): string => {
  switch (type) {
    case "info":
      return "primary"
    case "success":
      return "success"
    case "error":
      return "error"
  }
}

// Defining a default context value here, used below when instantiating
// the context consumer and provider below in order for context to be
// correctly detected throughout the application.
const defaultContext: Context = {
  pushState: undefined,
  replaceState: undefined,
  pushMessage: (message: { body: string; type: MessageType }) => {},
}

const { Provider, Consumer } = React.createContext(defaultContext)

const baseStylesheet = (theme: OperationalStyleConstants): string => `
* {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: ${theme.deprecated.fontFamily};
  font-size: 13px;
  height: 100%;
}

body {
  background-color: ${theme.deprecated.colors.background};
}

a:link,
a:visited {
  color: ${theme.deprecated.colors.info};
  text-decoration: none;
}

a:hover: {
  color: ${darken(theme.deprecated.colors.info, 5)};
}
`

// Use this flag to prevent global styles injected multiple times
let globalStylesInjected = false

class OperationalUI extends React.Component<Props, State> {
  state: State = {
    messages: [],
  }

  timer: number | null = null

  removeOutdatedMessages() {
    if (this.props.hideMessageAfter === 0) {
      return
    }
    this.setState(prevState => {
      const now = new Date().getTime()
      const filteredMessages = prevState.messages.filter(
        ({ message, addedAt }) => message.type === "error" || now - addedAt < (this.props.hideMessageAfter || 10000),
      )
      if (prevState.messages.length > filteredMessages.length) {
        return {
          messages: filteredMessages,
        }
      }
    })
  }

  componentDidMount() {
    if (!globalStylesInjected) {
      injectGlobal(baseStylesheet(constants))
      globalStylesInjected = true
    }
  }

  startMessagesTimer() {
    this.timer = window.setInterval(() => {
      this.removeOutdatedMessages()
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  render() {
    const { pushState, replaceState, children } = this.props
    return (
      <ThemeProvider theme={constants}>
        <Provider
          value={{
            pushState,
            replaceState,
            pushMessage: (message: { body: string; type: MessageType }) => {
              if (this.timer === null) {
                this.startMessagesTimer()
              }
              this.setState(prevState => ({
                messages: [...prevState.messages, { message, addedAt: new Date().getTime() }],
              }))
            },
          }}
        >
          <>
            <Messages>
              {this.state.messages.map(({ message }, index) => (
                <Message
                  key={index}
                  color={colorByMessageType(message.type)}
                  onClose={() => {
                    this.setState(prevState => ({
                      messages: prevState.messages.filter((_, filteredMessageIndex) => filteredMessageIndex !== index),
                    }))
                  }}
                >
                  {message.body}
                </Message>
              ))}
            </Messages>
            {children}
          </>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default OperationalUI

export { Consumer }
