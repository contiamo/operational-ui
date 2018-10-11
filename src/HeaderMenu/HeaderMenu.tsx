import * as React from "react"
import ContextMenu, { ContextMenuProps } from "../ContextMenu/ContextMenu"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface HeaderMenuProps extends DefaultProps {
  /** Clickable component(s) from which menu appears  */
  children: React.ReactNode | React.ReactNode[]
  /** Action when item in dropdown is selected - if specified here, it is applied to all dropdown items */
  onClick?: ContextMenuProps["onClick"]
  /** Items to display in dropdown */
  items: ContextMenuProps["items"]
  /** Display caret on opposite side to align prop */
  withCaret?: boolean
  /** Alignment */
  align?: ContextMenuProps["align"]
}

const backgroundColor = "hsla(0, 0%, 100%, 0.1)"
const boxShadow = "0 3px 6px rgba(0, 0%, 0%, 0.3)"

const Container = styled("div")<{
  align: HeaderMenuProps["align"]
  isOpen: boolean
  withCaret: HeaderMenuProps["withCaret"]
}>(({ theme, align, isOpen, withCaret }) => ({
  width: 250,
  lineHeight: "50px",
  padding: `0 ${theme.space.content}px`,
  color: isOpen ? theme.color.white : "#ffffffcc",
  backgroundColor: isOpen ? backgroundColor : "transparent",
  boxShadow: isOpen ? boxShadow : "none",
  fontWeight: theme.font.weight.medium,
  display: "flex",
  alignItems: "center",
  justifyContent: align === "left" ? "flex-start" : "flex-end",
  "& > div": {
    marginLeft: theme.space.small,
  },
  "&:hover": {
    boxShadow,
    backgroundColor,
    color: theme.color.white,
  },
  ...(withCaret
    ? {
        "&::after": {
          content: "''",
          position: "absolute",
          top: "50%",
          [align === "left" ? "right" : "left"]: theme.space.content + theme.space.small,
          width: 0,
          height: 0,
          border: "4px solid transparent",
          borderTopColor: "#ffffff80",
          transform: "translateY(calc(-50% + 2px))",
        },
        "&:hover": {
          boxShadow,
          backgroundColor,
          color: theme.color.white,
          "&::after": {
            borderTopColor: theme.color.white,
          },
        },
      }
    : {}),
}))

const HeaderMenu: React.SFC<HeaderMenuProps> = props => {
  return (
    <ContextMenu {...props}>
      {isOpen => (
        <Container isOpen={isOpen} align={props.align} withCaret={Boolean(props.withCaret)}>
          {props.children}
        </Container>
      )}
    </ContextMenu>
  )
}

HeaderMenu.defaultProps = {
  align: "left",
  withCaret: false,
}

export default HeaderMenu
