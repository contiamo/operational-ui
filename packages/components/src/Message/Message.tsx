import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"
import { Icon } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  className?: string
  /** Message contents, can be any html element/React fragment. */

  children?: React.ReactNode
  /** Background message color */

  color?: string
  /** Called when close icon is clicked. Icon is not rendered at all if this prop is not specified. */

  onClose?: () => void
}

const Container = styled("div")(
  ({
    theme,
    color,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    color?: string
  }): CssStatic => {
    const backgroundColor = expandColor(theme.deprecated, color) || theme.deprecated.colors.info
    const textColor = readableTextColor(backgroundColor, [theme.deprecated.colors.black, "white"])
    return {
      backgroundColor,
      color: textColor,
      overflow: "hidden",
      padding: `${(theme.deprecated.spacing * 1) / 2}px ${theme.deprecated.spacing * 3.5}px ${theme.deprecated.spacing /
        2}px ${theme.deprecated.spacing}px`,
      paddingRight: theme.deprecated.spacing * 2.5,
      // Icon space
      borderRadius: 4,
      minHeight: theme.deprecated.spacing * 2.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      maxWidth: 400,
    }
  },
)

const IconContainer = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    width: theme.deprecated.spacing * 2.5,
    height: theme.deprecated.spacing * 2.5,
    padding: theme.deprecated.spacing * 0.5,
    borderBottomLeftRadius: theme.deprecated.borderRadius,
    borderTopRightRadius: theme.deprecated.borderRadius,
    "& svg": {
      width: "100%",
      height: "100%",
    },
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  }),
)

const Message = (props: Props) => (
  <Container className={props.className} color={props.color}>
    <IconContainer onClick={props.onClose}>
      <Icon name="X" />
    </IconContainer>
    {props.children}
  </Container>
)

export default Message
