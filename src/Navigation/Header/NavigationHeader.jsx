import React from 'react';
import glamorous from 'glamorous';

import { APP_SPACING, APP_GREYS } from '../../App.settings';

const NavigationHeader = ({ className }: { className: string }) =>
  <div className={className}>Contiamo</div>;

const style = {
  padding: APP_SPACING,
  fontSize: 32,
  fontWeight: 'bold',
  color: APP_GREYS[80],
};

export default glamorous(NavigationHeader)(style);
