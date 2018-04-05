import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { spin } from "@operational/utils"

export interface Props {
  id?: string
  css?: {}
  className?: string
  open?: boolean
  onToggle?: () => void
  label?: string
  children?: any
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "sidebarheader",
  position: "relative",
  color: theme.colors.emphasizedText
}))

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
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
    borderColor: theme.colors.separator
  }
}))

const Header = glamorous.div(({ theme, isOpen }: { theme: Theme; isOpen: boolean }): {} => ({
  position: "relative",
  display: "flex",
  height: 30,
  color: theme.colors.gray80,
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
        borderBottomColor: theme.colors.separator
      }
    : {},
  "&:hover": {
    backgroundColor: theme.colors.gray10
  },
  "&::after": {
    content: "' '",
    display: "block",
    width: 0,
    height: 0,
    marginLeft: "auto",
    border: "4px solid transparent",
    borderLeftColor: theme.colors.gray40,
    transition: ".15s transform ease",
    transform: isOpen ? "translate3d(-2px, 1px, 0) rotate(90deg)" : null
  }
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
