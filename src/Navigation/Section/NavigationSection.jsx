import React from 'react';
import glamorous from 'glamorous';

import { APP_SPACING, APP_COLORS, APP_GREYS } from '../../App.settings';
import style from './NavigationSection.style';

const NavigationSection = ({ className, children }: { className: string, children: string }) =>
  (<div className={className}>
    {children}
  </div>);

export default glamorous(NavigationSection)(style);
