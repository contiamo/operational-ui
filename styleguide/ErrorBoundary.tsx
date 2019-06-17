import React from "react"
import { Message } from "../src/Message/Message"

interface ErrorBoundaryState {
  error?: Error
}

class OperationalDocsErrorBoundary extends React.Component<{}, Readonly<ErrorBoundaryState>> {
  public readonly state: ErrorBoundaryState = {}

  public componentDidCatch(e: Error) {
    this.setState({ error: e })
  }

  public render() {
    return this.state.error ? <Message type="error" body={this.state.error.message} /> : this.props.children
  }
}

export default OperationalDocsErrorBoundary
