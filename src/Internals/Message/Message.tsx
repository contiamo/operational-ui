import * as React from "react"
import tinycolor from "tinycolor2"
import { DefaultProps } from "../../types"
import styled from "../../utils/styled"

import { expandColor } from "../../utils/constants"
import { NoIcon } from "../../Icon"

export interface MessageProps extends DefaultProps {
  className?: string
  /** Message contents, can be any html element/React fragment. */
  children?: React.ReactNode
  /** Background message color */
  color?: string
  /** Called when close icon is clicked. Icon is not rendered at all if this prop is not specified. */
  onClose?: () => void
  /** Called when message is clicked. */
  onClick?: () => void
}

const Container = styled("div")<{ color_?: string }>(({ theme, color_ }) => {
  const backgroundColor = tinycolor(expandColor(theme, color_) || theme.color.primary)
    .setAlpha(0.9)
    .toString()
  return {
    backgroundColor,
    color: theme.color.white,
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0, 0, 0, .15)",
    padding: "8px 52px 8px 16px",
    borderRadius: theme.borderRadius,
    minHeight: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    maxWidth: 400,
  }
})

const IconContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  cursor: "pointer",
  width: 36,
  height: 36,
  borderBottomLeftRadius: theme.borderRadius,
  borderTopRightRadius: theme.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}))

export const Message: React.SFC<MessageProps> = ({ color, onClose, children, ...props }) => (
  <Container {...props} color_={color}>
    <IconContainer
      onClick={e => {
        e.stopPropagation()
        if (onClose) {
          onClose()
        }
      }}
    >
      <NoIcon />
    </IconContainer>
    {children}
  </Container>
)

export default Message
