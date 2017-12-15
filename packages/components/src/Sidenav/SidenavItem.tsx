import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  className?: string
  onClick?: () => void
  active?: boolean
  css?: {}
  label: string
}

const Container = glamorous.div(
  {
    height: 30,
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  ({ theme, isActive }: { theme: Theme; isActive: boolean }): {} => ({
    color: isActive ? theme.colors.linkText : theme.colors.white
  })
)

const SidenavItem = (props: IProps) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    onClick={props.onClick}
    isActive={!!props.active}
  >
    {props.label}
  </Container>
)

export default SidenavItem
