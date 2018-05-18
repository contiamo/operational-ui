import * as React from "react"
import glamorous, { Div, GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  css?: Css
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  /** Disabled */
  disabled?: boolean
  /** Active */
  active?: boolean
}

const Container = glamorous.div(
  ({ theme, isDisabled, isActive }: { theme: Theme; isDisabled: boolean; isActive: boolean }): CssStatic => ({
    label: "sidebaritem",
    backgroundColor: theme.colors.white,
    height: 30,
    ...theme.typography.body,
    fontWeight: isActive ? 600 : 400,
    position: "relative",
    borderBottom: "1px solid",
    borderColor: theme.colors.separator,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0px ${theme.spacing}px`,
    cursor: "pointer",
    textDecoration: "none",
    color: isActive ? theme.colors.linkText : theme.colors.text,
    ...isDisabled ? { opacity: 0.25, pointerEvents: "none" } : {},
    ":hover": {
      backgroundColor: theme.colors.lighterBackground,
    },
    ":focus": {
      outline: 0,
    },
  })
)

const SidebarItem = (props: Props) => (
  <Container
    id={props.id}
    css={props.css}
    onClick={props.onClick}
    className={props.className}
    isActive={!!props.active}
    isDisabled={!!props.disabled}
  >
    {props.children}
  </Container>
)

export default SidebarItem
