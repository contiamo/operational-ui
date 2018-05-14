import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "./types"

export interface Props {
  id?: string
  className?: string
  onClick?: () => void
  active?: boolean
  css?: Css
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
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.25)",
    },
  },
  ({ theme, isActive }: { theme: Theme; isActive: boolean }): CssStatic => ({
    // Readable text color is calculated in the <Sidenav> component,
    // and cascades down to both sidenav headers and items.
    padding: `0 ${theme.spacing}px 0 ${theme.box}px`,
    color: isActive ? theme.colors.linkText : "inherit",
    "& > div:first-child::after": {
      // Connector strip circle color
      backgroundColor: isActive ? theme.colors.linkText : null,
    },
  })
)

const ConnectorStrip = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  width: 1,
  height: size,
  backgroundColor: lighten(theme.colors.navBackground, 10),
  position: "absolute",
  top: 0,
  left: 24,
  "&::after": {
    content: "' '",
    width: 7,
    height: 7,
    backgroundColor: lighten(theme.colors.navBackground, 10),
    position: "absolute",
    borderRadius: "50%",
    left: -3,
    top: size / 2 - 4,
  },
  // Only half-height for last element - selectors cover both the case
  // when the side nav item is wrapped inside a <Link/> element (e.g. react-router)
  // and when it isn't. This is also why the class names are necessary.
  ".op_sidenavheader > .op_sidenavitem:last-child > &, .op_sidenavheader > *:last-child > .op_sidenavitem > &": {
    height: size / 2,
  },
}))

const SidenavItem = (props: Props) => (
  <Container
    id={props.id}
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
