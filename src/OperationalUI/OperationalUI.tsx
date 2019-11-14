import { Global } from "@emotion/core"
import { ThemeProvider } from "emotion-theming"
import merge from "lodash/merge"
import * as React from "react"

import ErrorBoundary from "../Internals/ErrorBoundary"
import Message from "../Internals/Message/Message"
import Messages from "../Internals/Messages/Messages"
import { IMessage, MessageType, Provider } from "../OperationalContext/OperationalContext"
import Progress from "../Progress/Progress"
import { darken, DeepPartial } from "../utils"
import constants, { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface OperationalUIProps {
  /** Children */
  children?: React.ReactNode
  /** Omit setting a set of base styles */
  noBaseStyles?: boolean
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
  /**
   * Dangerous: Disable the error boundary if explicitly set to false
   */
  errorBoundary?: boolean

  /**
   * Custom error handler on `componentDidCatch`
   */
  onError?: (error: Error) => void
  /**
   * Custom theme
   */
  theme?: DeepPartial<OperationalStyleConstants>
}

export interface State {
  messages: Array<{
    message: IMessage
    addedAt: number
    count: number
  }>
  isLoading: boolean
  error?: Error
}

const baseStylesheet = (theme: OperationalStyleConstants) => `
* {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

*:focus:not(:focus-visible) {
  outline: none;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: ${theme.font.family.main};
  font-size: 13px;
  height: 100%;
}

body {
  background-color: white;
}

a:link,
a:visited {
  color: ${theme.color.primary};
  text-decoration: none;
}

a:hover: {
  color: ${darken(theme.color.primary, 5)};
}

ul, ol {
  margin: 0 0 0 ${theme.space.content}px;
  padding: 0;
}
`

const Container = styled.div`
  position: relative;
  min-height: 60px;
  height: 100%;
`

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

class OperationalUI extends React.Component<OperationalUIProps, State> {
  public static defaultProps: Partial<OperationalUIProps> = {
    theme: {},
    errorBoundary: true,
  }

  public state: State = {
    messages: [],
    isLoading: false,
  }

  constructor(props: OperationalUIProps) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  /**
   *  The interval responsible for periodically checking
   *  whether any messages need to be removed from state
   */

  public messageTimerInterval: ReturnType<typeof setInterval> | null = null

  public removeOutdatedMessages() {
    if (this.props.hideMessageAfter === 0) {
      return
    }
    const now = new Date().getTime()
    const filteredMessages = this.state.messages.filter(
      ({ message, addedAt }) => message.type === "error" || now - addedAt < (this.props.hideMessageAfter || 10000),
    )

    // If we're out of messages, clear the interval.
    if (!filteredMessages.length && this.messageTimerInterval) {
      clearInterval(this.messageTimerInterval)
      this.messageTimerInterval = null
    }
    // Only run a setState if any message(s) were removed.
    if (this.state.messages.length > filteredMessages.length) {
      this.setState(() => ({ messages: filteredMessages }))
    }
  }

  public setLoading = (isLoading: boolean) => {
    this.setState(() => ({ isLoading }))
  }

  public componentDidCatch(error: Error) {
    this.setState({ error })
    if (this.props.onError) {
      this.props.onError(error)
    }
  }

  public componentWillUnmount() {
    if (this.messageTimerInterval) {
      clearInterval(this.messageTimerInterval)
    }
    document.removeEventListener("keydown", this.onKeyDown)
    document.removeEventListener("click", this.onClick)
  }

  public componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown)
    document.addEventListener("click", this.onClick)
  }

  // We tried to use state instead of directly accessing DOM but it breaks
  private onClick() {
    document.body.classList.add("no-focus")
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === "Tab") {
      document.body.classList.remove("no-focus")
    }
  }

  public render() {
    const { pushState, replaceState, children, theme, errorBoundary } = this.props
    return (
      <ThemeProvider theme={merge(constants, theme)}>
        {this.state.error && errorBoundary !== false ? (
          <ErrorBoundary error={this.state.error} />
        ) : (
          <Provider
            value={{
              pushState,
              replaceState,
              pushMessage: this.pushMessage,
              clearMessages: this.clearMessages,
              loading: this.state.isLoading,
              setLoading: this.setLoading,
            }}
          >
            {!this.props.noBaseStyles && <Global styles={baseStylesheet(merge(constants, theme))} />}
            <Container>
              {this.state.isLoading && <Progress />}
              <Messages>
                {this.state.messages.map(({ message, count }, index) => (
                  <Message
                    key={index}
                    color={colorByMessageType(message.type)}
                    onClick={message.onClick}
                    onClose={() =>
                      this.setState(prevState => ({
                        messages: prevState.messages.filter(
                          (_, filteredMessageIndex) => filteredMessageIndex !== index,
                        ),
                      }))
                    }
                  >
                    {count > 1 ? `(${count}) ` : ""}
                    {message.body}
                  </Message>
                ))}
              </Messages>
              {children}
            </Container>
          </Provider>
        )}
      </ThemeProvider>
    )
  }

  private pushMessage = (message: IMessage) => {
    const hasSamePayload = (m: { message: IMessage }) =>
      m.message.body === message.body && m.message.type === message.type

    this.setState(prevState => {
      const hasPreviousMessageWithSamePayload = Boolean(prevState.messages.find(hasSamePayload))

      if (hasPreviousMessageWithSamePayload) {
        return {
          messages: prevState.messages.map(m => {
            if (hasSamePayload(m)) {
              return { ...m, addedAt: new Date().getTime(), count: m.count + 1 }
            } else {
              return m
            }
          }),
        }
      }

      return {
        messages: [{ message, addedAt: new Date().getTime(), count: 1 }, ...prevState.messages],
      }
    })

    // If we don't yet have an interval, start one.
    if (!this.messageTimerInterval) {
      this.messageTimerInterval = setInterval(() => this.removeOutdatedMessages(), 2000)
    }
  }

  private clearMessages = () => {
    this.setState({
      messages: [],
    })
  }
}

export default OperationalUI
