// @flow
import React from 'react';
import glamorous from 'glamorous';

import { hexOrColor, readableTextColor, darken } from '../../../utils/color';

type props = {
  className: string,
  children: mixed,
  onClick?: void,
  theme: THEME,
};

const SideNavigationLink = ({ className, children, onClick }: props): React$Element<*> =>
  (<div className={className} onClick={onClick}>
    {children}
  </div>);

const style = ({ theme, color }: { theme: THEME, color?: string }): {} => {
  const backgroundColor = color
    ? hexOrColor(color)(theme.colors[color])
    : theme.greys && theme.greys['100'];

  return {
    position: 'relative',
    zIndex: 2,
    margin: `0 ${theme.spacing * -0.5}px`,
    padding: `${theme.spacing}px`,
    minWidth: 200,
    borderRadius: 2,
    transition: '.1s background-color ease',
    backgroundColor,
    color: readableTextColor(backgroundColor)(['black', 'white']),

    '& + &': {
      borderTop: `1px solid ${theme.greys && theme.greys['100']}`,
    },

    ':hover': {
      backgroundColor: darken(backgroundColor)(10),
    },

    ':first-child': {
      marginTop: `${theme.spacing * -0.5}px`,
    },

    ':last-child': {
      marginBottom: `${theme.spacing * -0.5}px`,
    },
  };
};

export default glamorous(SideNavigationLink)(style);
