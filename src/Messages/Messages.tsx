import * as React from "react"
import styled from "../utils/styled"

export interface Props {
  className?: string
  children?: React.ReactNode
}

const Container = styled("div")(({ theme }) => ({
  label: "Messages",
  position: "fixed",
  zIndex: theme.deprecated.baseZIndex + 500,
  bottom: 2 * theme.deprecated.spacing,
  right: 2 * theme.deprecated.spacing,
  "& > *": {
    width: 400,
    height: "auto",
    marginTop: theme.deprecated.spacing / 2,
  },
}))

const Messages = (props: Props) => <Container className={props.className}>{props.children}</Container>

export default Messages
