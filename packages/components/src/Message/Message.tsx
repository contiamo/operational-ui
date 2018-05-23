import * as React from "react"
import glamorous from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"
import { Icon } from "../"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  css?: Css
  className?: string
  /** Message contents, can be any html element/React fragment. */
  children?: React.ReactNode
  /** Background message color */
  color?: string
  /** Called when close icon is clicked. Icon is not rendered at all if this prop is not specified. */
  onClose?: () => void
}

const Container = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): CssStatic => {
  const backgroundColor = expandColor(theme, color) || theme.colors.info
  const textColor = readableTextColor(backgroundColor, [theme.colors.black, "white"])
  return {
    backgroundColor,
    overflow: "hidden",
    color: textColor,
    padding: `${theme.spacing * 1 / 2}px ${theme.spacing}px`,
    paddingRight: theme.spacing * 2.5, // Icon space
    borderRadius: 4,
    minHeight: theme.spacing * 2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    maxWidth: 400,
  }
})

const IconContainer = glamorous.div(({ theme }: WithTheme): CssStatic => ({
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
