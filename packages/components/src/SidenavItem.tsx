import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

import { sidenavWidth } from "./constants"

export interface Props {
  id?: string | number
  className?: string
  onClick?: () => void
  active?: boolean
  css?: {}
  label: string
}

const size: number = 32

const Container = glamorous.div(
  {
    label: "sidenavitem",
    height: size,
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: `0 16px 0 ${sidenavWidth}px`,
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.25)"
    }
  },
  ({ theme, isActive }: { theme: Theme; isActive: boolean }): {} => ({
    color: isActive ? theme.colors.linkText : theme.colors.white,
    "& > div:first-child::after": {
      // Connector strip circle color
      backgroundColor: isActive ? theme.colors.linkText : null
    }
  })
)

const ConnectorStrip = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  width: 1,
  height: size,
  backgroundColor: lighten(theme.colors.sidenavBackground, 10),
  position: "absolute",
  top: 0,
  left: 24,
  "&::after": {
    content: "' '",
    width: 7,
    height: 7,
    backgroundColor: lighten(theme.colors.sidenavBackground, 10),
    position: "absolute",
    borderRadius: "50%",
    left: -3,
    top: size / 2 - 4
  },
  // Only half-height for last element - selectors cover both the case
  // when the side nav item is wrapped inside a <Link/> element (e.g. react-router)
  // and when it isn't. This is also why the class names are necessary.
  ".op_sidenavheader > .op_sidenavitem:last-child > &, .op_sidenavheader > *:last-child > .op_sidenavitem > &": {
    height: size / 2
  }
}))

const SidenavItem = (props: Props) => (
  <Container
    key={props.id}
    css={props.css}
    className={["op_sidenavitem", props.className].filter(a => !!a).join(" ")}
    onClick={props.onClick}
    isActive={!!props.active}
  >
    <ConnectorStrip />
    {props.label}
  </Container>
)

export default SidenavItem
