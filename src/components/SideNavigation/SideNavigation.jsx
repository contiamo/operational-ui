// @flow
import React from 'react';
import glamorous from 'glamorous';

import SideNavigationItem from './Item/SideNavigationItem';
import SideNavigationLink from './Link/SideNavigationLink';
import SideNavigationTooltip from './Tooltip/SideNavigationTooltip';

type props = {
  className: string,
  children: mixed,
  theme: THEME,
};

const SideNavigation = ({ className, children }: props): React$Element<*> =>
  (<div className={className}>
    {children}
  </div>);

const style = ({ theme }: { theme: THEME }): {} => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 60,
  height: '100vh',
  paddingBottom: theme.spacing,
  backgroundColor: theme.greys && theme.greys['100'],
});

export default glamorous(SideNavigation)(style);
export { SideNavigationItem, SideNavigationLink, SideNavigationTooltip };
