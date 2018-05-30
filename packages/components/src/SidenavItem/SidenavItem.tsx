import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "../types"
import { Icon, IconName } from "../"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  onClick?: () => void
  active?: boolean
  icon?: IconName | React.ReactNode
  label: string
}

const size: number = 36

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
    fontSize: 12,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
  ({ theme, isActive }: { theme: Theme; isActive: boolean }): CssStatic => ({
    // Readable text color is calculated in the <Sidenav> component,
    // and cascades down to both sidenav headers and items.
    padding: `0 ${theme.spacing * 0.5}px`,
    color: isActive ? theme.colors.linkText : "inherit",
    "& > div:first-child::after": {
      // Connector strip circle color
      backgroundColor: isActive ? theme.colors.linkText : null,
    },
  })
)

const IconContainer = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  width: size,
  height: size,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: `0 0 ${size}px`,
}))

const SidenavItem = (props: Props) => (
  <Container
    id={props.id}
    css={props.css}
    className={["op_sidenavitem", props.className].filter(a => !!a).join(" ")}
    onClick={props.onClick}
    isActive={!!props.active}
  >
    <IconContainer>
      {props.icon === String(props.icon) ? <Icon name={props.icon as IconName} size={18} /> : props.icon}
    </IconContainer>
    {props.label}
  </Container>
)

export default SidenavItem
