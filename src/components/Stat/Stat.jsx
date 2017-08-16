import React from 'react';
import glamorous from 'glamorous';

import { hexOrColor, readableTextColor, darken } from '../../utils/color';

const Stat = ({
  className,
  label,
  children,
}: {
  className?: string,
  label: string,
  children: mixed,
}) =>
  (<div className={className}>
    <small className="label">
      {label}
    </small>
    <span className="value">
      {children}
    </span>
  </div>);

const style = ({ theme, color }: { theme: THEME, color?: string }) => {
  const backgroundColor = color
    ? hexOrColor(color)((theme.colors && theme.colors[color]) || 'white')
    : 'white';

  return {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    padding: theme.spacing && theme.spacing / 2,
    backgroundColor,
    color: readableTextColor(backgroundColor)(['black', 'white']),

    '& + &': {
      borderLeft: '1px solid',
      borderLeftColor: darken(backgroundColor)(10),
    },

    '& .label': {
      fontSize: '.8rem',
      color: readableTextColor(backgroundColor)([
        theme.greys && theme.greys['60'],
        theme.greys && theme.greys['10'],
      ]),
    },
  };
};

export default glamorous(Stat)(style);
export { Stat };
