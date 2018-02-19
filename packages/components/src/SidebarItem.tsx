import * as React from "react"
import glamorous, { Div, GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  active?: boolean
}

const Container = glamorous.div(
  ({ theme, isDisabled, isActive }: { theme: Theme; isDisabled: boolean; isActive: boolean }): {} => ({
    label: "sidebaritem",
    backgroundColor: theme.colors.white,
    height: 30,
    ...theme.typography.body,
    fontWeight: isActive ? 600 : 400,
    position: "relative",
    borderBottom: "1px solid",
    borderColor: theme.colors.secondarySeparator,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0px ${theme.spacing}px`,
    cursor: "pointer",
    textDecoration: "none",
    color: isActive ? theme.colors.linkText : theme.colors.gray80,
    ...isDisabled ? { opacity: 0.25, pointerEvents: "none" } : {},
    ":hover": {
      backgroundColor: theme.colors.gray10
    },
    ":focus": {
      outline: 0
    }
  })
)

export default (props: IProps) => (
  <Container
    key={props.id}
    css={props.css}
    onClick={props.onClick}
    className={props.className}
    isActive={!!props.active}
    isDisabled={!!props.disabled}
  >
    {props.children}
  </Container>
)
