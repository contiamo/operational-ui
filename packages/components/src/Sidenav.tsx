import * as React from "react"
import glamorous from "glamorous"
import { readableTextColor } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: string
  expanded?: boolean
  expandOnHover?: boolean
  expandedWidth?: number
  width?: number
}

export interface IState {
  isHovered: boolean
}

const Container = glamorous.div(
  ({
    theme,
    color,
    fix,
    expanded,
    expandOnHover,
    expandedWidth,
    width
  }: {
    theme: Theme
    color?: string
    fix?: boolean
    expandOnHover?: boolean
    expandedWidth: number
    expanded?: boolean
    width: number
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
      width: expanded ? expandedWidth : width,
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

export default class Sidenav extends React.Component<IProps, IState> {
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
        expandedWidth={this.props.expandedWidth || 240}
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
        width={this.props.width || 52}
      >
        {this.props.children}
      </Container>
    )
  }
}
