import * as React from "react"
import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"

import constants, { OperationalStyleConstants } from "../utils/constants"
import { darken } from "@operational/utils"

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
   * A time interval after which a non-error message should be automatically dismissed, measured in milliseconds.
   *
   * @default 10000 (10s)
   */
  hideMessageAfter?: number
}

type MessageType = "info" | "success" | "error"

export interface State {
  messages: {
    message: {
      body: string
      type: MessageType
    }
    addedAt: number
  }[]
  now: number
}

const colorByMessageType = (type: MessageType): string => {
  switch (type) {
    case "info":
      return "rgba(20, 153, 206, 0.9)"
    case "success":
      return "rgba(13, 170, 31, 0.9)"
    case "error":
      return "rgba(154, 0, 0, 0.9)"
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
    now: new Date().getTime(),
  }

  timer: number

  componentDidMount() {
    this.props.withBaseStyles && injectGlobal(baseStylesheet(constants))
    this.timer = window.setInterval(() => {
      this.setState(prevState => ({
        now: new Date().getTime(),
      }))
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
              {this.state.messages.map(
                ({ message, addedAt }, index) =>
                  this.state.now - addedAt < (this.props.hideMessageAfter || 10000) && (
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
                  ),
              )}
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
