import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

import SideNavigationHeader from "./Header/SideNavigationHeader"
import SideNavigationItem from "./Item/SideNavigationItem"
import SideNavigationLink from "./Link/SideNavigationLink"

import { hexOrColor, readableTextColor } from "contiamo-ui-utils"

export interface IProps {
  key?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: string
  expandOnHover?: boolean
  expandedWidth?: number
  width?: number
  fix?: boolean
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
    const backgroundColor = color
      ? hexOrColor(color)(theme.colors.palette[color])
      : theme.colors.usage.sideNavigationBackground
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
        outline: 0,
        backgroundColor: "rgba(255, 255, 255, 0.07)"
      }
    }
  }
)

const SideNavigation: React.SFC<IProps> = ({
  css,
  className,
  key,
  children,
  color,
  fix,
  expandOnHover,
  expandedWidth,
  width
}: IProps) => (
  <Container
    key={key}
    css={css}
    className={className}
    color={color}
    fix={fix}
    expandOnHover={expandOnHover}
    expandedWidth={expandedWidth || 240}
    width={width || 60}
  >
    {children}
  </Container>
)

export default SideNavigation
export { SideNavigationHeader, SideNavigationItem, SideNavigationLink }
