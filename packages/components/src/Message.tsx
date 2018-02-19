import * as React from "react"
import glamorous from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"
import Icon from "./Icon"

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: string
  onClose?: () => void
}

const Container = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): {} => {
  const backgroundColor = expandColor(theme, color) || theme.colors.white
  const textColor = readableTextColor(backgroundColor, [theme.colors.black, "white"])

  return {
    backgroundColor,
    overflow: "hidden",
    color: textColor,
    padding: `${theme.spacing * 1 / 2}px ${theme.spacing}px`,
    borderRadius: 2,
    position: "relative",
    maxWidth: 400,
    border: `1px solid rgba(0, 0, 0, 0.2)`
  }
})

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  paddingRight: theme.spacing * 2.5
}))

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
    height: "100%"
  },
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
}))

export default (props: IProps) => (
  <Container css={props.css} className={props.className} color={props.color}>
    <IconContainer onClick={props.onClose}>
      <Icon name="X" />
    </IconContainer>
    <Content>{props.children}</Content>
  </Container>
)
