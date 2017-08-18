// @flow
import React, { Component } from 'react'
import glamorous, { Img } from 'glamorous'

import withTooltip from '../../Tooltip/withTooltip'

type props = {
  className: string,
  children: mixed,
  size?: number,
  onClick?: void,
  theme: THEME,
}

const SideNavigationItem = ({ className, children, onClick }: props): React$Element<*> =>
  (<div className={className} onClick={onClick}>
    {children}
  </div>)

const style = ({ theme, size }: { theme: THEME, size: number }): {} => ({
  position: 'relative',
  width: size || 20,
  height: size || 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
  cursor: 'pointer',

  ':first-child': {
    marginBottom: theme.spacing,
  },
})

export default glamorous(withTooltip(SideNavigationItem))(style)
