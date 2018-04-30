import * as React from "react"
import glamorous from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"
import Icon from "./Icon"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: string
  onClose?: () => void
}

const Container = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): {} => {
  const backgroundColor = expandColor(theme, color) || theme.colors.info
  const textColor = readableTextColor(backgroundColor, [theme.colors.black, "white"])
  return {
    backgroundColor,
    overflow: "hidden",
    color: textColor,
    padding: `${theme.spacing * 1 / 2}px ${theme.spacing}px`,
    borderRadius: 4,
    height: theme.spacing * 2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    maxWidth: 400,
  }
})

const IconContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "absolute",
  top: 0,
  right: 0,
  cursor: "pointer",
  width: theme.spacing * 2.5,
  height: theme.spacing * 2.5,
  padding: theme.spacing * 0.5,
  "& svg": {
    width: "100%",
    height: "100%",
  },
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}))

const Message = (props: Props) => (
  <Container css={props.css} className={props.className} color={props.color}>
    <IconContainer onClick={props.onClose}>
      <Icon name="X" />
    </IconContainer>
    {props.children}
  </Container>
)

export default Message
