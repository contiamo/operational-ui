// @flow
import React from 'react'
import propTypes from 'prop-types'
import glamorous from 'glamorous'

import SideNavigationItem from './Item/SideNavigationItem'
import SideNavigationLink from './Link/SideNavigationLink'

import { hexOrColor, readableTextColor } from '../../utils/color'

type props = {
  className: string,
  children: mixed,
  color?: string,
  theme: THEME,
}

const SideNavigation = ({ className, children }: props): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>)

const style = ({ theme, color }: { theme: THEME, color?: string }): {} => {
  const backgroundColor = color
    ? hexOrColor(color)(theme.colors ? theme.colors[color] : 'white')
    : theme.colors && theme.colors.primary
  return {
    '--SideNavigationColor': backgroundColor,
    position: 'relative',
    zIndex: (theme.baseZIndex || 0) + 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 60,
    height: '100vh',
    paddingBottom: theme.spacing,
    backgroundColor,
    color: readableTextColor(backgroundColor)(['black', 'white']),
  }
}

export default glamorous(SideNavigation)(style)
export { SideNavigationItem, SideNavigationLink }
