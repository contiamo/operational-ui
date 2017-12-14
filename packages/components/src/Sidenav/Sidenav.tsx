import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { hexOrColor, readableTextColor } from "@operational/utils"
import { Theme } from "@operational/theme"

import SidenavHeader from "./SidenavHeader"
import SidenavItem from "./SidenavItem"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: string
  expandOnHover?: boolean
  expandedWidth?: number
  width?: number
  fix?: boolean
}

export interface IState {
  isHovered: boolean
}

const Container = glamorous.div(
  ({
    theme,
    color,
    fix,
    expandOnHover,
    expandedWidth,
    width
  }: {
    theme: Theme
    color?: string
    fix?: boolean
    expandOnHover?: boolean
    expandedWidth: number
    width: number
  }): any => {
    const backgroundColor = color ? hexOrColor(color)(theme.colors[color]) : theme.colors.sidenavBackground
    const hoverWidth = expandOnHover
      ? {
          transition: ".3s width cubic-bezier(.8, 0, 0, 1)",
          willChange: "width",
          "&:hover": {
            width: expandedWidth
          }
        }
      : {}

    return {
      width,
      backgroundColor,
      position: fix ? "fixed" : "relative",
      zIndex: theme.baseZIndex + 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      height: "100vh",
      overflow: "hidden",
      boxShadow: "1px 0 2px rgba(0, 0, 0, 0.2)",
      color: readableTextColor(backgroundColor)(["black", "white"]),
      ...hoverWidth,
      "& a:focus": {
        outline: 0
      }
    }
  }
)

class Sidenav extends React.Component<IProps, IState> {
  state = {
    isHovered: false
  }

  render() {
    return (
      <Container
        key={this.props.id}
        css={this.props.css}
        className={this.props.className}
        color={this.props.color}
        fix={this.props.fix}
        expandOnHover={this.props.expandOnHover}
        expandedWidth={this.props.expandedWidth || 240}
        onMouseEnter={() => {
          this.setState(prevState => ({
            isHovered: true
          }))
        }}
        onMouseLeave={() => {
          this.setState(prevState => ({
            isHovered: false
          }))
        }}
        width={this.props.width || 60}
      >
        {this.props.children}
      </Container>
    )
  }
}

export default Sidenav
export { SidenavHeader, SidenavItem }
