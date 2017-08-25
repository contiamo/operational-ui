// @flow
import React, { Component } from "react"
import glamorous, { Img } from "glamorous"

import withTooltip from "../../Tooltip/withTooltip"

type Props = {
  className: string,
  children: mixed,
  size?: number,
  onClick?: void,
  theme: THEME,
}

const SideNavigationItem = ({
  className,
  children,
  onClick
}: Props): React$Element<*> =>
  <div className={`${className} SideNavigationItem`} onClick={onClick}>
    {children}
  </div>

const style = ({ theme, size }: Props): {} => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 2,
  cursor: "pointer",

  "&_has-tooltip + &_has-tooltip ": {
    marginTop: theme.spacing ? theme.spacing * 2 : 16
  },

  ":first-child": {
    marginTop: 0,
    marginBottom: theme.spacing ? theme.spacing * 2 : 16
  }
})

export default glamorous(withTooltip(SideNavigationItem))(style)
