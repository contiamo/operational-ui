import * as React from "react"
import { Message, Messages, Button } from "@operational/components"
import * as constants from "../../constants"

import { Subsection } from "../../components"

export const title = "Messages"

export const docsUrl = `${constants.docsBaseUrl}/#message`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Messages.tsx`

export interface State {
  messages: string[]
}

export class Component extends React.Component<{}, State> {
  state = {
    messages: [],
  }

  render() {
    return (
      <>
        <Subsection>
          <p>This is a single message component:</p>
          <Message>Keep your belongings in sight at all times.</Message>
        </Subsection>
        <Subsection>
          <p>
            You can manage a stacking list of notifications by adding to the stack and dismissing them individually:
          </p>
          <Button
            color="info"
            onClick={() => {
              this.setState(prevState => ({
                messages: [...prevState.messages, "This happened at " + new Date().getTime()],
              }))
            }}
          >
            Add message
          </Button>
          <Messages>
            {this.state.messages.map((message, index) => (
              <Message
                onClose={() => {
                  this.setState(prevState => ({
                    messages: prevState.messages.filter((_message, currentIndex) => currentIndex !== index),
                  }))
                }}
                key={index}
              >
                {message}
              </Message>
            ))}
          </Messages>
        </Subsection>
      </>
    )
  }
}
