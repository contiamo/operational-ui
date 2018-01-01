import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import Icon from "./Icon"
import { ReactFeatherIconName } from "./ReactFeather"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  label: string
  icon: ReactFeatherIconName | React.ReactNode
  active?: boolean
  expanded?: boolean
  onClick?: () => void
}

const size: number = 60

const Container = glamorous.div({
  width: "100%"
})

const Content = glamorous.div(
  ({ theme, isActive, isExpanded }: { theme: Theme; isActive: boolean; isExpanded: boolean }): {} => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    height: size,
    flex: `0 0 ${size}px`,
    color: isActive ? theme.colors.linkText : theme.colors.white,
    borderBottom: isExpanded ? `2px solid #515151` : "none",
    backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)"
  })
)

const Label = glamorous.div({
  width: "fit-content",
  whiteSpace: "nowrap"
})

const IconContainer = glamorous.div({
  width: size,
  height: size,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: `0 0 ${size}px`
})

export default (props: IProps) => (
// See ./SidenavItem.tsx for reason why class name is set.
  <Container key={props.id} css={props.css} className={"op_sidenavheader " + props.className}>
    <Content isActive={!!props.active} isExpanded={!!props.expanded}>
      <IconContainer>
        {props.icon === String(props.icon) ? <Icon name={props.icon as ReactFeatherIconName} size={24} /> : props.icon}
      </IconContainer>
      <Label>{props.label}</Label>
    </Content>
    {props.expanded ? props.children : null}
  </Container>
)
