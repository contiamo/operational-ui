import * as React from "react"
import glamorous, { Div, GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor, readableTextColor, darken } from "@operational/utils"

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
    label: "sidebarlink",
    backgroundColor: theme.colors.white,
    ...theme.typography.body,
    fontWeight: isActive ? 600 : 400,
    position: "relative",
    display: "flex",
    padding: `${theme.spacing / 3}px ${theme.spacing}px`,
    cursor: "pointer",
    textDecoration: "none",
    color: isActive ? theme.colors.linkText : theme.colors.gray80,
    opacity: isDisabled ? 0.25 : 1,
    "&:not(:first-child)": {
      borderTop: "1px solid",
      borderColor: theme.colors.secondarySeparator
    },
    ":hover": {
      backgroundColor: darken(theme.colors.white)(2)
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
