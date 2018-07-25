import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"

import constants, { OperationalStyleConstants } from "../utils/constants"
import { darken } from "../utils"
import { MessageType } from "../types"
import Messages from "../Messages/Messages"
import MessageComponent from "../Message/Message"
import Confirm, { ConfirmOptions } from "../Confirm/Confirm"
import Modal, { ModalOptions } from "../Modal/Modal"

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

export interface Context {
  pushState?: (url: string) => void
  replaceState?: (url: string) => void
  pushMessage: (message: Message) => void
  confirm: (confirm: ConfirmOptions) => void
  modal: (modal: ModalOptions) => void
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
  confirm: (confirm: ConfirmOptions) => {},
  modal: (modal: ModalOptions) => {},
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

  /**
   *  The interval responsible for periodically checking
   *  whether any messages need to be removed from state
   */

  messageTimerInterval: number | null = null

  removeOutdatedMessages() {
    if (this.props.hideMessageAfter === 0) {
      return
    }
    const now = new Date().getTime()
    const filteredMessages = this.state.messages.filter(
      ({ message, addedAt }) => message.type === "error" || now - addedAt < (this.props.hideMessageAfter || 10000),
    )

    // If we're out of messages, clear the interval.
    if (!filteredMessages.length) {
      window.clearInterval(this.messageTimerInterval)
      this.messageTimerInterval = null
    }
    // Only run a setState if any message(s) were removed.
    if (this.state.messages.length > filteredMessages.length) {
      this.setState(() => ({ messages: filteredMessages }))
    }
  }

  componentDidMount() {
    this.props.withBaseStyles && injectGlobal(baseStylesheet(constants))
  }

  componentWillUnmount() {
    window.clearInterval(this.messageTimerInterval)
  }

  render() {
    const { pushState, replaceState, children } = this.props
    return (
      <ThemeProvider theme={constants}>
        <Modal>
          {modal => (
            <Confirm>
              {confirm => (
                <Provider
                  value={{
                    pushState,
                    replaceState,
                    confirm,
                    modal,
                    pushMessage: (message: Message) => {
                      this.setState(prevState => ({
                        messages: [{ message, addedAt: new Date().getTime() }, ...prevState.messages],
                      }))

                      // If we don't yet have an interval, start one.
                      if (!this.messageTimerInterval) {
                        this.messageTimerInterval = window.setInterval(() => this.removeOutdatedMessages(), 2000)
                      }
                    },
                  }}
                >
                  <>
                    <Messages>
                      {this.state.messages.map(({ message }, index) => (
                        <MessageComponent
                          key={index}
                          color={colorByMessageType(message.type)}
                          onClose={() =>
                            this.setState(prevState => ({
                              messages: prevState.messages.filter(
                                (_, filteredMessageIndex) => filteredMessageIndex !== index,
                              ),
                            }))
                          }
                        >
                          {message.body}
                        </MessageComponent>
                      ))}
                    </Messages>
                    {children}
                  </>
                </Provider>
              )}
            </Confirm>
          )}
        </Modal>
      </ThemeProvider>
    )
  }
}

export default OperationalUI

export { Consumer, ConfirmOptions, ModalOptions }
