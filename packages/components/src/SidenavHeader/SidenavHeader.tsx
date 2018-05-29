import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import { Icon, IconName } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  label: string | React.ReactNode
  icon: IconName | React.ReactNode
  active?: boolean
  expanded?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Container = glamorous.div({
  label: "sidenavheader",
  width: "100%",
})

const Content = glamorous.div(
  ({ theme, isActive, isExpanded }: { theme: Theme; isActive: boolean; isExpanded: boolean }): CssStatic => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    height: theme.box,
    flex: `0 0 ${theme.box}px`,
    // Readable text color is calculated in the <Sidenav> component,
    // and cascades down to both sidenav headers and items.
    color: isActive ? theme.colors.linkText : "inherit",
    borderBottom: isExpanded ? `1px solid #395568` : "none",
    backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)",
    ":hover": {
      backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)",
    },
  })
)

const Label = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.heading1,
  color: theme.colors.black,
  fontSize: 14,
  width: "fit-content",
  whiteSpace: "nowrap",
}))

const IconContainer = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  width: theme.box,
  height: theme.box,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: `0 0 ${theme.box}px`,
}))

const SidenavHeader = (props: Props) => (
  // See ./SidenavItem.tsx for reason why class name is set.
  // Note that the click listener is set on `<Content>` so it doesn't interfere
  // with click listeners set on the children.
  <Container id={props.id} css={props.css} className={["op_sidenavheader", props.className].filter(a => !!a).join(" ")}>
    <Content isActive={!!props.active} isExpanded={!!props.expanded} onClick={props.onClick}>
      <IconContainer>
        {props.icon === String(props.icon) ? <Icon name={props.icon as IconName} size={24} /> : props.icon}
      </IconContainer>
      <Label>{props.label}</Label>
    </Content>
    {props.children}
  </Container>
)

export default SidenavHeader
