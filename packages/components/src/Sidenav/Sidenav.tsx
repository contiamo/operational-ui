import * as React from "react"
import glamorous from "glamorous"
import { lighten, readableTextColor } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

import { sidenavExpandedWidth } from "../constants"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
  expanded?: boolean
  expandOnHover?: boolean
}

export interface State {
  isHovered: boolean
}

const Container = glamorous.div(
  ({
    theme,
    fix,
    expanded,
    expandOnHover,
  }: {
    theme: Theme
    fix?: boolean
    expandOnHover?: boolean
    expanded?: boolean
  }): CssStatic => {
    const backgroundColor = theme.colors.white
    const lighterBackgroundColor = lighten(theme.colors.navBackground, 8)
    const color = readableTextColor(backgroundColor, [theme.colors.text, theme.colors.white])
    const expandOnHoverStyles = expandOnHover
      ? {
          transition: ".3s width cubic-bezier(.8, 0, 0, 1)",
          willChange: "width",
          overflow: "hidden",
          ":hover": {
            width: sidenavExpandedWidth,
            overflow: "auto",
          },
        }
      : {}

    return {
      color,
      background: theme.colors.white,
      label: "sidenav",
      width: expanded ? sidenavExpandedWidth : theme.box,
      borderRight: "1px solid",
      borderRightColor: theme.colors.separator,
      zIndex: theme.baseZIndex + 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      height: "100%",
      ...expandOnHoverStyles,
      "& a:focus": {
        outline: 0,
      },
      "& > a:link, & > a:visited": {
        width: "100%",
        display: "block",
        textDecoration: "none",
        color: "inherit",
      },
    }
  }
)

class Sidenav extends React.Component<Props, State> {
  state = {
    isHovered: false,
  }

  render() {
    return (
      <Container
        id={this.props.id}
        css={this.props.css}
        className={this.props.className}
        expandOnHover={this.props.expandOnHover}
        expanded={this.props.expanded}
        onMouseEnter={() => {
          this.setState(prevState => ({
            isHovered: true,
          }))
        }}
        onMouseLeave={() => {
          this.setState(prevState => ({
            isHovered: false,
          }))
        }}
      >
        {this.props.children}
      </Container>
    )
  }
}

export default Sidenav
