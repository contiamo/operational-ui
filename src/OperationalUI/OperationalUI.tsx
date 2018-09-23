import { injectGlobal } from "emotion"
import { ThemeProvider } from "emotion-theming"
import { Cancelable } from "lodash"
import debounce from "lodash/debounce"
import merge from "lodash/merge"
import * as React from "react"

import ErrorBoundary from "../Internals/ErrorBoundary"
import Message from "../Internals/Message/Message"
import Messages from "../Internals/Messages/Messages"
import { IMessage, MessageType, WindowSize } from "../OperationalContext/OperationalContext"
import { Provider } from "../OperationalContext/OperationalContext.init"
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
  windowSize: WindowSize
  messages: Array<{
    message: IMessage
    addedAt: number
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

const Container = styled("div")`
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
    windowSize: {
      width: 0,
      height: 0,
    },
    messages: [],
    isLoading: false,
  }

  /**
   *  The interval responsible for periodically checking
   *  whether any messages need to be removed from state
   */

  public messageTimerInterval: ReturnType<typeof setTimeout> | null = null

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

  /**
   * Explicit typing is required here in order to give the typescript compiler access to typings
   * used to work out type definitions for the debounce method.
   * @todo look into making this unnecessary.
   */
  public handleResize: (() => void) & Cancelable = debounce(() => {
    this.onSetWindowSize()
  }, 200)

  public setLoading = (isLoading: boolean) => {
    this.setState(() => ({ isLoading }))
  }

  public onSetWindowSize = () => {
    this.setState(() => ({
      windowSize: { width: window.innerWidth, height: window.innerHeight },
    }))
  }

  public componentDidCatch(error: Error) {
    this.setState({ error })
    if (this.props.onError) {
      this.props.onError(error)
    }
  }

  public componentDidMount() {
    if (!this.props.noBaseStyles) {
      injectGlobal(baseStylesheet(constants))
    }
    this.onSetWindowSize()
    document.body.addEventListener("resize", this.handleResize)
  }

  public componentWillUnmount() {
    if (this.messageTimerInterval) {
      clearInterval(this.messageTimerInterval)
    }
    document.body.removeEventListener("resize", this.handleResize)
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
              pushMessage: (message: IMessage) => {
                this.setState(prevState => ({
                  messages: [{ message, addedAt: new Date().getTime() }, ...prevState.messages],
                }))

                // If we don't yet have an interval, start one.
                if (!this.messageTimerInterval) {
                  this.messageTimerInterval = setInterval(() => this.removeOutdatedMessages(), 2000)
                }
              },
              loading: this.state.isLoading,
              setLoading: this.setLoading,
              windowSize: this.state.windowSize,
            }}
          >
            <Container>
              {this.state.isLoading && <Progress />}
              <Messages>
                {this.state.messages.map(({ message }, index) => (
                  <Message
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
}

export default OperationalUI
