import * as React from "react"
import glamorous from "glamorous"
import { readableTextColor } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

import { sidenavWidth, sidenavExpandedWidth } from "./constants"

export interface Props {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: string
  expanded?: boolean
  expandOnHover?: boolean
  expandedWidth?: number
}

export interface State {
  isHovered: boolean
}

const Container = glamorous.div(
  ({
    theme,
    color,
    fix,
    expanded,
    expandOnHover,
    expandedWidth
  }: {
    theme: Theme
    color?: string
    fix?: boolean
    expandOnHover?: boolean
    expandedWidth: number
    expanded?: boolean
  }): {} => {
    const backgroundColor = expandColor(theme, color) || theme.colors.sidenavBackground
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
      backgroundColor,
      label: "sidenav",
      width: expanded ? expandedWidth : sidenavWidth,
      zIndex: theme.baseZIndex + 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      height: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
      boxShadow: "1px 0 2px rgba(0, 0, 0, 0.2)",
      color: readableTextColor(backgroundColor, ["black", "white"]),
      ...hoverWidth,
      "& a:focus": {
        outline: 0
      }
    }
  }
)

class Sidenav extends React.Component<Props, State> {
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
        expandOnHover={this.props.expandOnHover}
        expandedWidth={this.props.expandedWidth || sidenavExpandedWidth}
        expanded={this.props.expanded}
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
      >
        {this.props.children}
      </Container>
    )
  }
}

export default Sidenav
