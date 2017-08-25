// @flow
import React from "react"
import propTypes from "prop-types"
import glamorous from "glamorous"

import SideNavigationItem from "./Item/SideNavigationItem"
import SideNavigationLink from "./Link/SideNavigationLink"

import { hexOrColor, readableTextColor } from "../../utils/color"

type Props = {
  className: string,
  children: mixed,
  color?: string,
  expandOnHover: boolean,
  expandedWidth: number,
  width: number,
  fix: boolean,
  theme: THEME,
}

const SideNavigation = ({ className, children }: Props): React$Element<*> =>
  <div className={className}>
    {children}
  </div>

SideNavigation.defaultProps = {
  expandOnHover: false,
  expandedWidth: 280,
  width: 64,
  fix: false
}

const style = ({
  theme,
  color,
  fix,
  expandOnHover,

  // for some reason, glamorous doesn't get the defaultProps...
  expandedWidth = 280,
  width = 64
}: Props): {} => {
  const backgroundColor = color
      ? hexOrColor(color)(theme.colors ? theme.colors[color] : "white")
      : theme.colors && theme.colors.primary,
    hoverWidth = expandOnHover
      ? {
        transition: ".3s width ease",
        willChange: "width",
        "&:hover": {
          width: expandedWidth
        },
        "&:hover .Tooltip": {
          display: "none"
        }
      }
      : {}

  return {
    position: fix ? "fixed" : "relative",
    zIndex: (theme.baseZIndex || 0) + 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width,
    height: "100vh",
    overflow: "hidden",
    padding: theme.spacing * 1.3 || 0,
    backgroundColor,
    color: readableTextColor(backgroundColor)(["black", "white"]),
    ...hoverWidth
  }
}

export default glamorous(SideNavigation)(style)
export { SideNavigationItem, SideNavigationLink }
