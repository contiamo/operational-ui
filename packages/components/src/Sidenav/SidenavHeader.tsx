import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import Icon from "../Icon/Icon"
import { ReactFeatherIconName } from "../Icon/ReactFeather"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  label: string
  icon: ReactFeatherIconName
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

const SidenavHeader = (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    <Content isActive={!!props.active} isExpanded={!!props.expanded}>
      <IconContainer>
        <Icon name={props.icon} size={24} />
      </IconContainer>
      <Label>{props.label}</Label>
    </Content>
    {props.expanded ? props.children : null}
  </Container>
)

export default SidenavHeader
