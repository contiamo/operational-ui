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
}

export interface IState {
  isExpanded: boolean
}

const size: number = 60

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  overflow: "hidden",
  height: size,
  flex: `0 0 ${size}px`,
  backgroundColor: "inherit",
  "&:first-child": {
    borderBottom: "1px solid rgba(255, 255, 255, .1)"
  }
}))

const Label = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: "fit-content",
  whiteSpace: "pre"
}))

const IconContainer = glamorous.div({
  width: size,
  height: size,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: `0 0 ${size}px`
})

class SidenavHeader extends React.Component<IProps, IState> {
  state = {
    isExpanded: false
  }

  render() {
    return (
      <Container key={this.props.id} css={this.props.css} className={this.props.className}>
        <IconContainer>
          <Icon name={this.props.icon} size={28} color="#FFF" />
        </IconContainer>
        <Label>{this.props.label}</Label>
      </Container>
    )
  }
}

export default SidenavHeader
