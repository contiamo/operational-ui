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
    height: 45,
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 16px 0 60px",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  ({ theme, isActive }: { theme: Theme; isActive: boolean }): {} => ({
    color: isActive ? theme.colors.linkText : theme.colors.white
  })
)

const ConnectorStrip = glamorous.div({
  width: 1,
  height: 45,
  backgroundColor: "#515151",
  position: "absolute",
  top: 0,
  left: 29,
  "&::after": {
    content: "' '",
    width: 8,
    height: 8,
    backgroundColor: "#515151",
    position: "absolute",
    borderRadius: "50%",
    left: -4,
    top: 19
  },
  // Only half-height for last element - selectors cover both the case
  // when the side nav item is wrapped inside a <Link/> element (e.g. react-router)
  // and when it isn't. This is also why the class names are necessary.
  ".op_sidenavheader > .op_sidenavitem:last-child > &, .op_sidenavheader > *:last-child > .op_sidenavitem > &": {
    height: 22.5
  }
})

export default (props: IProps) => (
  <Container
    key={props.id}
    css={props.css}
    className={"op_sidenavitem " + props.className}
    onClick={props.onClick}
    isActive={!!props.active}
  >
    <ConnectorStrip />
    {props.label}
  </Container>
)
