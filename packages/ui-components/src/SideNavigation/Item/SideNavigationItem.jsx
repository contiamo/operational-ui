// @flow
import React, { Component } from "react"
import glamorous, { Img } from "glamorous"

import withTooltip from "../../Tooltip/withTooltip"

type Props = {
  className: string,
  children: mixed,
  size?: number,
  active?: boolean,
  onClick?: void,
  theme: THEME,
}

const SideNavigationItem = ({
  className,
  children,
  active,
  onClick
}: Props): React$Element<*> =>
  <div
    className={`${className}${active
      ? " SideNavigationItem_active"
      : ""} SideNavigationItem`}
    onClick={onClick}
  >
    {children}
  </div>

const style = ({ theme, size }: Props): {} => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: `${theme.spacing / 2}px ${theme.spacing * 1.3}px`,
  borderRadius: 2,
  width: "100%",
  minHeight: 40,
  cursor: "pointer",

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.07)"
  },

  "&.SideNavigationItem_active": {
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },

  ":first-child": {
    marginTop: 0,
    marginBottom: theme.spacing ? theme.spacing * 2 : 16
  }
})

export default glamorous(withTooltip(SideNavigationItem))(style)
