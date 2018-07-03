import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"

import constants, { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"
import { MessageType } from "../types"

import Messages from "../Messages/Messages"
import Message from "../Message/Message"

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

export interface State {
  messages: {
    message: {
      body: string
      type: MessageType
    }
    addedAt: number
  }[]
}

export interface Context {
  pushState: (url: string) => void
  replaceState: (url: string) => void
  pushMessage: (
    message: {
      body: string
      type: MessageType
    },
  ) => void
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

const { Provider, Consumer } = React.createContext({})

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

  timer: number

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
    this.props.withBaseStyles && injectGlobal(baseStylesheet(constants))
    this.timer = window.setInterval(() => {
      this.removeOutdatedMessages()
    }, 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  render() {
    const { withBaseStyles, pushState, replaceState, children } = this.props
    return (
      <ThemeProvider theme={constants}>
        <Provider
          value={{
            pushState,
            replaceState,
            pushMessage: (message: { body: string; type: MessageType }) => {
              this.setState(prevState => ({
                messages: [...prevState.messages, { message, addedAt: new Date().getTime() }],
              }))
            },
          }}
        >
          <>
            <Messages>
              {this.state.messages.map(({ message, addedAt }, index) => (
                <Message
                  key={index}
                  color={colorByMessageType(message.type)}
                  onClose={() => {
                    this.setState(prevState => ({
                      messages: prevState.messages.filter(
                        (message, filteredMessageIndex) => filteredMessageIndex !== index,
                      ),
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
