// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import glamorous, { Div } from 'glamorous';

import { hexOrColor, readableTextColor, darken } from '../../../utils/color';

const SidebarLink = ({
  className,
  children,
  to,
  onClick,
  symbol,
}: {
  className: string,
  children: mixed,
  to: string,
  onClick: void,
  symbol: string,
}) => {
  let Component = Div;
  if (to) {
    Component = Link;
  }

  return (
    <Component to={to} onClick={onClick} className={className}>
      {children}
      {symbol
        ? <div className="symbol">
          {symbol}
        </div>
        : ''}
    </Component>
  );
};

const style = ({ theme, color }: { theme: THEME, color: string }) => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors[color]) : theme.colors.primary;
  const textColor = readableTextColor(backgroundColor)(['black', 'white']);
  return {
    display: 'flex',
    padding: theme.spacing / 2,
    transition: 'background-color .1s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    backgroundColor,
    color: textColor,

    ':hover': {
      backgroundColor: darken(backgroundColor)(5),

      // The text color needs to change too if it gets too dark 😁
      color: readableTextColor(darken(backgroundColor)(5))(['black', 'white']),
    },
    '& > .symbol': {
      marginLeft: 'auto',
    },
  };
};

export default glamorous(SidebarLink)(style);
