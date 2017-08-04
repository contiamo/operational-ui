// @flow
import React from 'react';
import glamorous from 'glamorous';

import SideNavigationItem from './Item/SideNavigationItem';
import SideNavigationLink from './Link/SideNavigationLink';
import SideNavigationTooltip from './Tooltip/SideNavigationTooltip';

const SideNavigation = ({
  className,
  children,
  }: {
  className: string,
  children: mixed,
}): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>);

const style = (props: void, theme: THEME): {} => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 60,
  height: '100vh',
  paddingBottom: theme.spacing,
  backgroundColor: theme.greys['100'],
});

export default glamorous(SideNavigation)(style);
export { SideNavigationItem, SideNavigationLink, SideNavigationTooltip };
