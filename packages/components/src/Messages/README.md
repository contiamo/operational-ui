The messages component gives opinionated layout and positioning to a list of message components.

### Usage

```jsx
class MessagesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        {
          body: "Success message",
          isError: false
        },
        {
          body: "Error message",
          isError: true
        }
      ]
    }
  }
  
  render() {
    return (
      <Messages>
        {this.state.messages.map((message, currentIndex) => (
          <Message key={currentIndex} color={message.isError ? "error" : "info"} onClose={() => {
            this.setState(prevState => ({
              messages: prevState.messages.filter((message, messageIndex) => messageIndex !== currentIndex)
            }))
          }}>{message.body}</Message>
        ))}
      </Messages>
    )
  }
}

<MessagesContainer />
```
