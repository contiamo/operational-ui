import React from 'react';
import glamorous from 'glamorous';

import { APP_SPACING, APP_COLORS, APP_GREYS } from '../../App.settings';

const NavigationSection = ({ className, children }: { className: string, children: string }) =>
  (<div className={className}>
    {children}
  </div>);

const style = {
  position: 'relative',
  zIndex: 2,
  padding: APP_SPACING,
  fontWeight: 'bold',
  cursor: 'pointer',
  background: `linear-gradient(135deg, ${APP_GREYS[30]} 0%, ${APP_GREYS[40]} 100%)`,
  color: APP_GREYS[100],

  '&::after': {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity .15s ease',
    background: `linear-gradient(135deg, ${APP_COLORS.green} 0%, ${APP_COLORS.yellow} 100%)`,
  },

  ':hover': {
    color: APP_GREYS[10],
  },

  ':hover::after': {
    opacity: 1,
  },

  ':not(:last-child)': {
    marginBottom: 1,
  },
};

export default glamorous(NavigationSection)(style);
