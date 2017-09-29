import * as React from "react"

import glamorous from "glamorous"

import SideNavigationHeader from "./Header/SideNavigationHeader"
import SideNavigationItem from "./Item/SideNavigationItem"
import SideNavigationLink from "./Link/SideNavigationLink"

import { hexOrColor, readableTextColor } from "@contiamo/ui-utils"

type Props = {
  className?: string
  css?: {}
  children: React.ReactNode
  color?: string
  expandOnHover?: boolean
  expandedWidth?: number
  width?: number
  fix?: boolean
  theme?: Theme
}

const style = ({
  theme,
  color,
  fix,
  expandOnHover,

  // for some reason, glamorous doesn't get the defaultProps...
  expandedWidth = 240,
  width = 60
}: Props): {} => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors[color]) : theme.colors.grey80,
    hoverWidth = expandOnHover
      ? {
          transition: ".3s width cubic-bezier(.8, 0, 0, 1)",
          willChange: "width",
          "&:hover": {
            width: expandedWidth
          },
          "& .Tooltip": {
            display: "none"
          },
          "&:not(:hover) .SideNavigationHeader::after": {
            content: "none"
          },
          "&:not(:hover) .SideNavigationHeader__options": {
            display: "none"
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
    ...hoverWidth
  }
}

const SideNavigation: React.SFC<Props> = ({ className, children }: Props) => <div className={className}>{children}</div>

SideNavigation.defaultProps = {
  expandOnHover: false,
  expandedWidth: 280,
  width: 64,
  fix: false
}

export default glamorous(SideNavigation)(style)
export { SideNavigationHeader, SideNavigationItem, SideNavigationLink }
