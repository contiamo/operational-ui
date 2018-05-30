import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import deprecate from "../utils/deprecate"
import { Icon, IconName } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  label: string | React.ReactNode
  /**
   * Side nav icons are no longer rendered.
   *
   * @deprecated
   */
  icon?: IconName | React.ReactNode
  /** Color used in highlights and the side strip (hex or named color from `theme.colors`) */
  color?: string
  active?: boolean
  expanded?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Container = glamorous.div(
  ({ theme, color, active }: { theme: Theme; color?: string; active?: boolean }): CssStatic => {
    const stripColor: string = expandColor(theme, color) || theme.colors.info
    return {
      label: "sidenavheader",
      width: "100%",
      borderBottom: "1px solid",
      borderLeft: "4px solid",
      borderLeftColor: active ? stripColor : "transparent",
      borderBottomColor: theme.colors.separator,
    }
  }
)

const Content = glamorous.div(
  ({ theme, isActive, isExpanded }: { theme: Theme; isActive: boolean; isExpanded: boolean }): CssStatic => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    width: "100%",
    height: theme.box,
    padding: `0 ${theme.spacing}px`,
    // Readable text color is calculated in the <Sidenav> component,
    // and cascades down to both sidenav headers and items.
    color: isActive ? theme.colors.linkText : "#333333",
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: isActive ? "transparent" : "rgba(0, 0, 0, 0.05)",
    },
  })
)

const ItemsContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  top: -theme.spacing / 2,
}))

const SidenavHeader = (props: Props) => (
  // See ./SidenavItem.tsx for reason why class name is set.
  // Note that the click listener is set on `<Content>` so it doesn't interfere
  // with click listeners set on the children.
  <Container
    id={props.id}
    css={props.css}
    color={props.color}
    active={props.active}
    className={["op_sidenavheader", props.className].filter(a => !!a).join(" ")}
  >
    <Content isActive={!!props.active} isExpanded={!!props.expanded} onClick={props.onClick}>
      {props.label}
    </Content>
    <ItemsContainer>{props.children}</ItemsContainer>
  </Container>
)

export default deprecate<Props>(
  props =>
    props.icon ? ["By design, this component doesn't render the icon you specify in the `icon` prop anymore."] : []
)(SidenavHeader)
