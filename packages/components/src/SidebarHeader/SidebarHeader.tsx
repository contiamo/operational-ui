import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { spin } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Is it open? */
  open?: boolean
  /** Toggle callback */
  onToggle?: () => void
  /** Header label */
  label?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  label: "sidebarheader",
  position: "relative",
}))

const Content = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  position: "relative",
  paddingLeft: theme.spacing * 1,
  "::after": {
    content: "' '",
    position: "absolute",
    width: 1,
    height: "100%",
    top: 0,
    left: theme.spacing * 1,
    borderLeft: "1px solid",
    borderColor: theme.colors.separator,
  },
}))

const Header = glamorous.div(({ theme, isOpen }: { theme: Theme; isOpen: boolean }): CssStatic => ({
  position: "relative",
  display: "flex",
  height: 30,
  alignItems: "center",
  padding: `0px ${theme.spacing}px`,
  borderBottom: "1px solid",
  borderBottomColor: theme.colors.separator,
  cursor: "pointer",
  outline: "none",
  backgroundColor: theme.colors.white,
  ...isOpen
    ? {
        borderBottom: "1px solid",
        borderBottomColor: theme.colors.separator,
      }
    : {},
  "&:hover": {
    backgroundColor: theme.colors.lighterBackground,
  },
  "&::after": {
    content: "' '",
    display: "block",
    width: 0,
    height: 0,
    marginLeft: "auto",
    border: "4px solid transparent",
    borderLeftColor: theme.colors.lightGray,
    transition: ".15s transform ease",
    transform: isOpen ? "translate3d(-2px, 1px, 0) rotate(90deg)" : null,
  },
}))

const SidebarHeader = (props: Props) => (
  <Container css={props.css} id={props.id} className={props.className}>
    <Header isOpen={!!props.open} onClick={props.onToggle}>
      {props.label}
    </Header>
    {props.open ? <Content>{props.children}</Content> : null}
  </Container>
)

export default SidebarHeader
