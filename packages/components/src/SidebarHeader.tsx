import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { spin } from "@operational/utils"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  open?: boolean
  onClick?: () => void
  label?: string
  children?: any
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "sidebaritem",
  position: "relative",
  color: theme.colors.emphasizedText
}))

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  paddingLeft: theme.spacing
}))

const Header = glamorous.div(({ theme, isOpen }: { theme: Theme; isOpen: boolean }): {} => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  padding: `${theme.spacing * 2 / 3}px ${theme.spacing}px`,
  borderTop: "1px solid",
  borderTopColor: theme.colors.gray10,
  cursor: "pointer",
  outline: "none",
  backgroundColor: theme.colors.white,
  ...isOpen
    ? {
        borderBottom: "1px solid",
        borderBottomColor: theme.colors.separator,
        fontWeight: 600,
        backgroundColor: theme.colors.gray10
      }
    : {},
  "&:hover": {
    backgroundColor: theme.colors.gray10
  },
  "&::after": {
    content: '""',
    display: "block",
    width: 0,
    height: 0,
    marginLeft: "auto",
    border: "4px solid transparent",
    borderLeftColor: theme.colors.gray20,
    transition: ".15s transform ease",
    transform: isOpen ? "translate3d(-2px, 2px, 0) rotate(90deg)" : null
  }
}))

export default (props: IProps) => (
  <Container
    css={props.css}
    key={props.id}
    onClick={props.onClick}
    className={`${props.className} ${props.open ? "open" : ""}`}
  >
    <Header isOpen={!!props.open} className={`header ${props.open ? "open" : ""}`}>
      {props.label}
    </Header>
    {props.open ? <Content>{props.children}</Content> : null}
  </Container>
)
