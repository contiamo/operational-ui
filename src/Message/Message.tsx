import * as React from "react"

import styled from "../utils/styled"

export interface MessageProps {
  title?: React.ReactNode
  body: React.ReactNode
  type: "warning" | "info" | "error"
}

const Container = styled("div")<{ type: MessageProps["type"] }>`
  padding: ${props => props.theme.space.content}px;
  margin-bottom: ${props => props.theme.space.big}px;

  ${props => {
    switch (props.type) {
      case "warning":
        return `
          background-color: rgba(255, 196, 0, 0.08);
          border: 1px solid rgba(186, 129, 0, 0.2);
        `
      case "info":
        return `
          background-color: rgba(20, 153, 206, 0.05);
          border: 1px solid rgba(20, 153, 206, 0.1);
        `
      case "error":
        return `
          background-color: rgba(154, 0, 0, 0.05);
          border: 1px solid rgba(154, 0, 0, 0.1);
        `
    }
  }} h3 {
    font-size: ${props => props.theme.font.size.small}px;
    margin: 0;
    margin-bottom: ${props => props.theme.space.small}px;
    color: ${props => (props.type === "error" ? props.theme.color.error : props.theme.color.text.default)};
  }

  p {
    font-size: ${props => props.theme.font.size.small}px;
    margin: 0;
    color: ${props => props.theme.color.text.default};
    word-break: break-word;
    line-height: 1.46;
  }
`

export const Message: React.SFC<MessageProps> = ({ title, body, ...props }) => (
  <Container {...props}>
    {title && <h3>{title}</h3>}
    <p>{body}</p>
  </Container>
)

export default Message
