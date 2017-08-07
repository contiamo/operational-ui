// @flow
import React from 'react';
import glamorous from 'glamorous';
import style from './SideNavigationTooltip.style';

const SideNavigationTooltip = ({
  className,
  children,
  position,
  }: {
  className: string,
  children: mixed,
  position?: string,
}): React$Element<*> =>
  (<div className={`${className} tooltip`}>
    {children}
  </div>);

export default glamorous(SideNavigationTooltip)(style);
