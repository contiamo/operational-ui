import * as React from "react"
import { DefaultProps } from "../../types"
import styled from "../../utils/styled"

export interface MessagesProps extends DefaultProps {
  children?: React.ReactNode
}

const Container = styled("div")(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.messages,
  bottom: theme.space.element,
  right: theme.space.element,
  "& > *": {
    width: 400,
    height: "auto",
    marginTop: theme.space.small,
  },
}))

const Messages: React.SFC<MessagesProps> = ({ children, ...props }) => <Container {...props}>{children}</Container>

export default Messages
