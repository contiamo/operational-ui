// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import glamorous, { Div } from 'glamorous';

import { TOOLTIP_CONTAINER_STYLE } from '../../Tooltip/Tooltip';

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
  let Component = Div; // By default, use a standard div.

  // if this is expected to work with react-router,
  if (to) {
    Component = Link; // use a <Link /> since it supports props.to.
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
  const backgroundColor = color
    ? hexOrColor(color)(theme.colors && theme.colors[color])
    : theme.colors && theme.colors.primary;
  const textColor = readableTextColor(backgroundColor)(['black', 'white']);

  return {
    display: 'flex',
    padding: theme.spacing / 2,
    transition: 'background-color .1s ease',
    cursor: 'pointer',

    // react-router <Link /> wraps an <a> which can be underlined by default so
    textDecoration: 'none',

    backgroundColor,
    color: textColor,

    ':hover': {
      backgroundColor: darken(backgroundColor)(5),

      // The text color needs to change too if it gets too dark 😁
      // Also, here's a prime benefit of functional JS: function composition!
      color: readableTextColor(darken(backgroundColor)(5))(['black', 'white']),
    },
    '& > .symbol': {
      marginLeft: 'auto',
    },
    ':hover > .tooltip': {
      ...TOOLTIP_CONTAINER_STYLE,
    },
  };
};

export default glamorous(SidebarLink)(style);
