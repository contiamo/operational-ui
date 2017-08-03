import React from 'react';
import glamorous from 'glamorous';

import Icon from './Icon/CoreNavigationIcon';
import Link from './Link/CoreNavigationLink';

const CoreNavigation: React$Element<*> = ({
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
  backgroundColor: theme.greys[100],
});

export default glamorous(CoreNavigation)(style);
export const CoreNavigationIcon = Icon;
export const CoreNavigationLink = Link;
