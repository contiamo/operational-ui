import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"

import constants, { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"
import { MessageType, Context } from "../types"

import Messages from "../Messages/Messages"
import MessageComponent from "../Message/Message"

export interface Props {
  /** Children */
  children?: React.ReactNode
  /** Use the base styles */
  withBaseStyles?: boolean
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

export interface Message {
  body: string
  type: MessageType
}

export interface State {
  messages: {
    message: Message
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
  pushMessage: (message: Message) => {},
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

class OperationalUI extends React.Component<Props, State> {
  state: State = {
    messages: [],
  }

  // The interval responsible for periodically checking whether any messages need to be removed from state
  messageTimerInterval: number | null = null

  removeOutdatedMessages() {
    if (this.props.hideMessageAfter === 0) {
      return
    }
    this.setState(prevState => {
      // Work out the new list of messages, filtering out the ones that are outdated
      // ( outdated = not of type `error`, and has been around longer than `this.props.hideMessageAfter`, defaulting to 10s )
      const now = new Date().getTime()
      const filteredMessages = prevState.messages.filter(
        ({ message, addedAt }) => message.type === "error" || now - addedAt < (this.props.hideMessageAfter || 10000),
      )
      // Only run a setState if any message(s) were removed. Otherwise, this method returns `undefined` and the component is not updated at all.
      if (prevState.messages.length > filteredMessages.length) {
        return {
          messages: filteredMessages,
        }
      }
    })
  }

  startMessagesTimer() {
    if (this.messageTimerInterval !== null) {
      return
    }
    // A broad interval of 2 seconds is chosen so messages created around the same time disappear at the same time, avoiding the disorienting effect of tiny time delays.
    this.messageTimerInterval = window.setInterval(() => {
      this.removeOutdatedMessages()
    }, 2000)
  }

  stopMessagesTimer() {
    window.clearInterval(this.messageTimerInterval)
    // Clear the message interval instance in order to prevent multiple timers being accidentally created. Do not remove this assignment.
    this.messageTimerInterval = null
  }

  componentDidMount() {
    this.props.withBaseStyles && injectGlobal(baseStylesheet(constants))
  }

  componentWillUnmount() {
    window.clearInterval(this.messageTimerInterval)
  }

  /*
   * Stop and start the messages timer depending on whether it's needed or not.
   * CAUTION: this logic may result in very rare edge cases with React's render loop if two messages are removed within the same frame, causing timers to occasionally not stop or restart.
   * Since the consequences of this are not catastrophic for UX, we have decided to leave this optimization in place. Simply forgo the optimization and keep the timer going throughout the lifecycle of this component if more safety is desired. 
   */
  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.messages.length === 0 && prevState.messages.length > 0) {
      this.stopMessagesTimer()
      return
    }
    if (prevState.messages.length === 0 && this.state.messages.length > 0) {
      this.startMessagesTimer()
    }
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
              this.setState(prevState => ({
                messages: [{ message, addedAt: new Date().getTime() }, ...prevState.messages],
              }))
            },
          }}
        >
          <>
            <Messages>
              {this.state.messages.map(({ message }, index) => (
                <MessageComponent
                  key={index}
                  color={colorByMessageType(message.type)}
                  onClose={() => {
                    this.setState(prevState => ({
                      messages: prevState.messages.filter((_, filteredMessageIndex) => filteredMessageIndex !== index),
                    }))
                  }}
                >
                  {message.body}
                </MessageComponent>
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
