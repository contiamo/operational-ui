The messages component gives opinionated layout and positioning to a list of message components.

### Usage

```jsx
class MessagesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }

    this.addError = this.addError.bind(this)
    this.addSuccess = this.addSuccess.bind(this)
    this.clear = this.clear.bind(this)
  }
  
  addError() {
    this.setState(({messages}) => ({
      messages: [...messages, {
          body: "Error message",
          isError: true
        }]
    }))
  }

  addSuccess() {
    this.setState(({messages}) => ({
      messages: [...messages, {
          body: "Success message",
          isError: false
        }]
    }))
  }

  clear() {
    this.setState({messages: []})
  }

  render() {
    return (
      <>
        <Button onClick={this.addError} color="info">Add a error</Button>
        <Button onClick={this.addSuccess} color="info">Add a success</Button>
        <Button onClick={this.clear} color="error">Clear the message stack</Button>
        <Messages>
          {this.state.messages.map((message, currentIndex) => (
            <Message key={currentIndex} color={message.isError ? "error" : "info"} onClose={() => {
              this.setState(prevState => ({
                messages: prevState.messages.filter((message, messageIndex) => messageIndex !== currentIndex)
              }))
            }}>{message.body}</Message>
          ))}
        </Messages>
      </>
    )
  }
}

<MessagesContainer />
```
